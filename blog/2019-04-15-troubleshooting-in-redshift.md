---
slug: troubleshooting-in-redshift
title: Troubleshooting in Redshift
authors: [narendra]
tags: [big-data, redshift, aws, database]
date: 2019-04-15
---

# Troubleshooting in Redshift

Redshift is a one of the most popular data warehousing solution, thousands of companies running millions of ETL jobs everyday. The problem with MPP systems is troubleshooting why the jobs are hung, which are the queries blocking others. 

To troubleshoot problems like this could be a real nightmare if you are new to Redshift, in this article I have tried to aggregate the tables and queries you should always keep handy if you work with redshift on daily basis of planning to start using  

## Table Overview

First of all lets familiarize our self  with some of the tables needed to troubleshoot a problem.

**[STV_RECENTS](https://docs.aws.amazon.com/redshift/latest/dg/r_STV_RECENTS.html)** - This table holds information about currently active and recently run queries against a database

```sql
select 
	user_name, 
	db_name, 
	pid, 
	query
from stv_recents
where status = 'Running';
```

`status = 'Running'` gives all the queries whose execution have not completed. it includes the queries which are currently executing and the queries currently waiting in the execution queue.

**[STV_INFLIGHT](https://docs.aws.amazon.com/redshift/latest/dg/r_STV_INFLIGHT.html)** - Check the `stv_inflight` table, To find which queries are currently in progress. 

```sql
select 
	userid, 
	query, 
	pid, 
	starttime, 
	left(text, 50) as text 
from stv_inflight;
```

**[STV_LOCKS](https://docs.aws.amazon.com/redshift/latest/dg/r_STV_LOCKS.html)** - Amazon Redshift locks tables to prevent two users from updating the same table at the same time, STV_LOCKS can be used to view any current updates on tables in the database, need superuser to view

```sql
select 
	table_id, 
	last_update, 
	last_commit, 
	lock_owner, 
	lock_owner_pid, 
	lock_status from stv_locks  
order by last_update asc;
```

**[STL_TR_CONFLICT](https://docs.aws.amazon.com/redshift/latest/dg/r_STL_TR_CONFLICT.html)** - A transaction conflict occurs when two or more users are querying and modifying data rows from tables such that their transactions cannot be serialized. Every time a transaction conflict occurs, Amazon Redshift writes a log about the aborted transaction to the STL_TR_CONFLICT table. 

```sql
select * from stl_tr_conflict 
where table_id=<Table Id from STV_LOCKS>
order by xact_start_ts;
```

**[SVV_TRANSACTIONS](https://docs.aws.amazon.com/redshift/latest/dg/r_SVV_TRANSACTIONS.html)** - Redshift uses this table to records information about transactions that currently hold locks on tables in the database

```sql
select * from svv_transactions;
```

## Important Queries

### Queries waiting in queue

If the query is running for more then expected the first thing you would like to do is figure out if the query actually executing or laying in the queue waiting for its turn.

To find out queries that are not truly "in flight" i.e waiting in the queue of blocked by some other query

```sql
select * from stv_recents 
where status<>'Done' and pid not in (select pid from stv_inflight)
```

### Long Running Queries

In case you are curious to know who else is delayed or running for long time, this query can help you find out list of all the queries running longer then 30 mints.

```sql
select 
	pid, 
	trim(user_name) AS user_name, 
	starttime, 
	query, 
	DATEDIFF(minutes, starttime, getdate()) as delay_in_mints, 
	status
from stv_recents 
where 
	status='Running' and  
	DATEDIFF(minutes, starttime, getdate()) > 30
order by starttime;
```

### Blocking Queries

To find out the cause you must verify the locks this query can be used to find out what are the queries which have been granted the lock for the resources and what are the queries blocked by it or waiting for the same lock

```sql
select 
	b.*, 
	w.pid as blocked_pid, 
	w.txn_owner as blocked_owner, 
	DATEDIFF(minutes, b.txn_start, getdate()) as blocked_for_mints
from SVV_TRANSACTIONS b inner join SVV_TRANSACTIONS w 
		on b.txn_db = w.txn_db and b.relation = w.relation
where b.granted='t' and w.granted = 'f' 
	and DATEDIFF(minutes, b.txn_start, getdate()) > 5
order by txn_start, b.pid;
```

`granted = t`  means lock has been granted

`granted = f`  means lock is pending

### DeadLocked

Redshift documentation recommends using **[STV_LOCKS](http://docs.aws.amazon.com/redshift/latest/dg/r_STV_LOCKS.html)** table to identify locks, this table works well until you hit a real deadlock, [PG_LOCKS](https://wiki.postgresql.org/wiki/Lock_Monitoring) could be the real life saving table that should be looked into.   

```sql
select 
  current_time, 
  c.relname, 
  l.database, 
  l.transaction, 
  l.pid, 
  a.usename, 
  l.mode, 
  l.granted
from pg_locks l 
join pg_catalog.pg_class c ON c.oid = l.relation
join pg_catalog.pg_stat_activity a ON a.procpid = l.pid
where l.pid <> pg_backend_pid();
```

## How to cancel a query?

`cancel` can be used to Kill a query with the query pid and an optional message which will be returned to the issuer of the query and logged. PG_CANCEL_BACKEND is functionally equivalent to the CANCEL command.

```sql
cancel <pid> 'Long-running query';
```

```sql
select pg_cancel_backend(<pid>);
```

If the query that you canceled is associated with a transaction, use the ABORT or ROLLBACK. command to cancel the transaction and discard any changes made to the data:

```sql
abort;
```

PG_TERMINATE_BACKEND can be used to Terminates a session.

```sql
select pg_terminate_backend(<pid>);
```

Unless you are signed on as a superuser, you can cancel only your own queries/session. A superuser can cancel all queries/session.

## Bonus

Some more Tables to for more informations

**[SVL_QLOG](https://docs.aws.amazon.com/redshift/latest/dg/r_SVL_QLOG.html)** - Redshift also stores the past few days of queries in `svl_qlog` if you need to go back further

```sql
select userid, query, pid, starttime, endtime, elapsed, left("substring", 50) as text from svl_qlog limit 10;
```

**[STL_QUERYTEXT](https://docs.aws.amazon.com/redshift/latest/dg/r_STL_QUERYTEXT.html)**  All of the above tables only store the first 200 characters of each query. The full query is stored in chunks in `stl_querytext`. Join this table in by `query`, and sort by `query_id` and `sequence` to get each 200 character chunk in order

```sql
select query, starttime, text, "sequence" 
from stl_query join stl_querytext using (query) 
order by query,sequence 
limit 5;
```

List of queries currently in-flight with user details 

```sql
select 
	a.userid, 
	cast(u.usename as varchar(100)), 
	a.query, 
	a.label, 
	a.pid, 
	a.starttime, 
	DATEDIFF(minutes, a.starttime, getdate()) as delay_in_mints, 
	b.query as querytext
from stv_inflight a, stv_recents b, pg_user u
where a.pid = b.pid and a.userid = u.usesysid;
```
