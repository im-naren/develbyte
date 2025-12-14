---
slug: why-write-amplification-not-just-throughput-shapes-modern-databases
title: Why Write Amplification, Not Just Throughput, Shapes Modern Databases [50PaperChallenge]
authors: narendra
tags: [distributed-systems, architecture, database, 50PaperChallenge, storage-engines, lsm-trees]
---

# Why Write Amplification, Not Just Throughput, Shapes Modern Databases

*Lessons from LSM Trees and WiscKey — Paper #2 of #50PaperChallenge*

<!--truncate-->

## Introduction: Why This Paper, Why Now

In my **#50PaperChallenge** journey, I've been deliberately alternating between *foundational theory* and *systems papers that quietly changed the industry*. This pairing — **[LSM Tree (O’Neil et al., 1996)](https://dsf.berkeley.edu/cs286/papers/lsm-acta1996.pdf)** and **[WiscKey: Separating Keys from Values in SSD-Conscious Storage](https://pages.cs.wisc.edu/~ll/papers/wisckey_tos.pdf)** — sits squarely in that second category.

Almost every database we touch today — RocksDB, Cassandra, HBase, LevelDB, DynamoDB's storage engine — traces its lineage back to the LSM Tree. Yet, for something so pervasive, most engineers (including me, until a few years ago) carry around a fuzzy mental model:

> "LSM Trees are faster for writes, slower for reads, and compaction is expensive."

That's not wrong — but it's dangerously incomplete.

Reading O'Neil's original LSM paper alongside WiscKey felt like watching the **evolution of an idea across two decades of hardware change**. One was written when disks were slow, RAM was scarce, and SSDs didn't exist. The other assumes flash is the default and asks a deceptively simple question:

> *What if keys and values don't belong together?*

This post is my attempt to unpack **what LSM Trees actually optimize for**, why **write amplification is the real villain**, and how WiscKey reframes long-standing trade-offs in modern storage engines.

If you build databases, data platforms, or even just tune RocksDB configs in production, this is not academic history. This is operational reality.

---

## The Core Problem: Why B-Trees Started to Break

Before LSM Trees, the world ran on **B-Trees**.

They're elegant:

* Reads are predictable.
* Writes update data *in place*.
* Height is logarithmic.
* Everything feels neat and ordered.

But B-Trees have an ugly secret: **random writes are poison for disks**.

Every insert or update potentially triggers:

* A page read
* A page modification
* A page write
* Possibly a page split cascading upward

On spinning disks, random I/O is orders of magnitude slower than sequential writes. O'Neil summarizes the pain succinctly:

> "Conventional disk-based index structures are unable to support high-volume transaction processing because of the cost of random disk I/O."
> — *O'Neil et al., 1996*

The LSM Tree was not designed to be "cool."

It was designed to **survive write-heavy workloads**.

---

## LSM Trees in Plain Language

At a high level, an **LSM Tree trades read complexity for write efficiency**.

Instead of updating data in place, it:

1. Buffers writes in memory (the **memtable**).
2. Flushes them sequentially to disk as immutable files (**SSTables**).
3. Periodically merges and compacts these files in the background.

You don't overwrite data.

You *append* and *reconcile later*.

### A Mental Model That Finally Clicked for Me

Think of an LSM Tree like:

* A **git repository for data**
* Writes are commits (cheap, append-only)
* Reads must traverse history
* Compaction is `git rebase` on a very large repo

The brilliance is not the data structure itself — it's the **I/O pattern**:

* Sequential writes
* Batched reads
* Deferred cleanup

---

## My Takeaways from the LSM Paper

### 1. LSM Trees Optimize for Write *Bandwidth*, Not Latency

This is subtle and often misunderstood.

LSM Trees don't make individual writes magically fast.

They make **sustained write throughput** possible.

By batching, buffering, and deferring work, they:

* Turn random writes into sequential ones
* Push cost into background compaction
* Smooth out spikes under heavy ingestion

This explains why LSM-based systems often show:

* Stable p99 write latencies
* But unpredictable read latencies under compaction pressure

### 2. Compaction Is Not an Implementation Detail — It *Is* the Cost Model

The paper spends an unusual amount of time analyzing **merge costs**.

That's intentional.

Every write is paid for **multiple times**:

* Written to memtable
* Flushed to disk
* Rewritten during compaction (possibly multiple levels)

This is where **write amplification** is born.

And this is where WiscKey enters the story.

---

## Enter WiscKey: Separating Keys from Values

WiscKey starts with an uncomfortable observation:

> In LSM Trees, **large values dominate compaction cost** — but provide little benefit during sorting.

In classic LSM designs:

* Keys and values are stored together
* Compaction rewrites *everything*
* Even if values are large blobs rarely read

### WiscKey's Core Idea

**Separate keys from values.**

* LSM Tree indexes:
  * Keys
  * Value pointers
* Values live in an append-only **value log**
* Compaction rewrites keys, not values

This simple separation produces dramatic results:

* **Lower write amplification**
* **Faster compaction**
* **Better SSD endurance**

The authors show reductions in write amplification by **an order of magnitude** for value-heavy workloads.

---

## The Technical Deep Dive (Without the Math Overdose)

### Write Amplification, Quantified

In an LSM Tree:

```
Write Amplification ≈ (Total bytes written to disk) / (Logical bytes written by user)
```

Compaction across levels means the same data may be rewritten:

* 5–10× in typical configurations
* Higher for skewed workloads

WiscKey reduces this by:

* Only rewriting keys (small, fixed-size)
* Leaving values untouched unless garbage collected

### The Trade-off WiscKey Accepts

Nothing comes for free.

WiscKey introduces:

* **Garbage collection in the value log**
* Potential **read amplification** (extra pointer chase)
* More complex crash recovery

This is the recurring theme across storage systems:

> You don't eliminate costs — you *move* them.

---

## Connecting This to Real Systems

Once you see it, you can't unsee it.

* **RocksDB**: Offers *BlobDB* and *separate value logs*
* **Cassandra**: SSTables + compaction strategies tuned for write amplification
* **DynamoDB**: Heavily inspired by LSM principles
* **TiKV / Pebble**: Explicit engineering around compaction debt

WiscKey isn't just a paper — it's a design lens.

---

## Common Misconceptions This Paper Corrected for Me

### Misconception 1: "LSM Trees Are Bad at Reads"

Reality:

* They're bad at *uncached point reads under compaction*
* With Bloom filters, block caches, and tiered storage, reads are often fine

### Misconception 2: "Compaction Is Background Work"

No.

Compaction is **deferred foreground cost**.

If you don't budget for it:

* Latencies spike
* SSDs wear out
* Throughput collapses under load

### Misconception 3: "SSD Fixes Everything"

WiscKey exists *because* SSDs exposed new bottlenecks:

* Write endurance
* Internal flash amplification
* Garbage collection interference

---

## Practical Design Guidelines

If you're designing or operating an LSM-based system:

### 1. Treat Compaction as a First-Class SLO

* Monitor write amplification
* Track compaction debt
* Budget I/O explicitly

### 2. Separate Hot Keys from Cold Values

* Especially for large blobs
* Logs, payloads, JSON documents

### 3. Choose Compaction Strategy Intentionally

* Size-tiered vs leveled is not cosmetic
* It's a cost model decision

### 4. Optimize for Your Dominant Workload

* Write-heavy ingestion → LSM shines
* Read-heavy OLTP → hybrid or B-Tree may win

---

## Where Do We Go from Here?

One thing this reading reinforced for me is that storage engine design is never about winning — it's about choosing which costs you're willing to pay, and when. LSM Trees pay upfront in complexity to buy write throughput. WiscKey pushes that idea further, questioning assumptions that had gone largely unchallenged for years.

What I find most interesting is not whether LSM Trees or WiscKey-style designs are "better," but where each of these ideas quietly breaks down in real systems — under skewed workloads, under operational pressure, under imperfect hardware, and under human mistakes.

So I'll end this entry in the #50PaperChallenge journey with a question for you:

If you were designing a storage engine today — knowing everything we know about compaction, write amplification, SSD behavior, and real-world workloads — what would you choose to optimize for, and what costs would you deliberately accept?

If you've wrestled with compaction storms, tuned RocksDB at 2 a.m., or discovered the hard way that "background work" is never really background, I'd love to hear your perspective.

That conversation, more than any paper, is where the real learning happens.
