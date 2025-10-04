---
slug: speculative-execution-in-hadoop
title: Speculative Execution in Hadoop
authors: [narendra]
tags: [big-data, hadoop, optimization]
date: 2019-04-15
---

# Speculative Execution in Hadoop

Speculative execution is an optimization technique where a computer system tries to predict the slowness the task execution and run a backup task the slowness could be caused by reasons like hardware degradation or wrong configurations. since it's just a prediction and computer cant be sure that the task might take longer time than expected it is called speculative execution. If the prediction turns out to be wrong and the task completes before the backup task, the system reverts most changes made by the backup task and the results are ignored. if the backup task completes the fist the results from the first task is ignored.

The objective of speculative execution is to provide more concurrency if extra resources are available. This approach is employed in a variety of areas, including branch prediction in pipelined processors, value prediction for exploiting value locality, prefetching memory and files, and optimistic concurrency control in database systems.

In Hadoop, MapReduce breaks jobs into tasks and these tasks run parallel on multiple nodes, which reduces overall execution time. This model of execution can slow down the overall execution of a job if few of the task doesn't deliver the result at the expected time. It could be really tough to be able to detect causes since the tasks still complete successfully, although more time is taken than the expected time. 

Hadoop as a system doesn't try to fix slow running tasks, instead, it tries to detect them and runs backup tasks for them. These backup tasks are called Speculative tasks in Hadoop.

## How speculative execution works in Hadoop?

Firstly all the tasks for the job are launched in Hadoop MapReduce. The speculative tasks are launched for those tasks that have been running for some time (at least one minute) and have not made any much progress, on average, as compared with other tasks from the job. The speculative task is killed if the original task completes before the speculative task, on the other hand, the original task is killed if the speculative task finishes before it.

## Is speculative execution beneficial?

Hadoop MapReduce Speculative execution is beneficial in some cases because in a Hadoop cluster with 100s of nodes, problems like hardware failure or network congestion are common and running parallel or duplicate task would be better since we won't be waiting for the task in the problem to complete.

But if two duplicate tasks are launched at about same time, it will be a wastage of cluster resources

Here are the two properties to configure the use of this feature:

```
mapred.map.tasks.speculative.execution
mapred.reduce.tasks.speculative.execution
```

Or if you are using Hadoop 2.x:

```
mapreduce.map.speculative
mapreduce.reduce.speculative
```

Most time it is useful but in some scenarios disabling it will make a big difference.
