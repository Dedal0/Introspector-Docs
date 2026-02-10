---
layout: page
title: Timeout Analysis
parent: Examples
nav_order: 3
---

In **blind** vulnerabilities (no visible feedback in the application response), **time becomes a signal**.  
**Timeout Analysis** is the practice of observing **delays**, **retries**, and **callback ordering** to infer what the backend is doing behind the scenes — even when the target response stays constant.

This applies to many **Out-of-Band (OOB)** scenarios, not just SSRF, for example:
- **Blind SSRF** (fetchers / preview bots / workers)
- **XXE / XML OOB** (external DTD fetch, DNS resolution)
- **OOB SQLi** (DNS/HTTP callbacks via DB functions or integrations)
- **Blind RCE / template injection** (callbacks to your listener)
- Any workflow where you “see nothing” in the UI, but the backend still performs actions

---

## What timing can tell you

Most systems have limits and repeatable behavior. By measuring *when* callbacks occur, you can infer:

- **Synchronous vs asynchronous execution:** does it happen inside the same request, or in a queue/worker?
- **Timeout type:** does it fail on **connect** (can’t reach host) or **read** (reached host, waiting for response)?
- **Retries and policies:** does it retry? how often? how many times?
- **Component fingerprinting:** timing + request order + headers can hint at the client type (parser, fetcher, worker, HTTP library, etc.)

Introspector helps by correlating callbacks with **timestamps**, **paths**, and evidence (headers/IP), so you can build a clean timeline.

---

## Common patterns

### 1) Immediate vs delayed execution
- **Immediate:** callback appears almost right after your trigger/input.
- **Delayed:** callback appears seconds/minutes later (queues, batch jobs, scheduled workers).

### 2) Retry behavior
Repeated callbacks with similar spacing often indicate automatic retries.

### 3) Fixed limits
Delays that consistently stop near a value (2s/5s/10s/30s) often suggest configured timeouts.

---

## Practical tips

- Use **unique identifiers** per test (distinct paths) for clean correlation.
- Repeat 2–3 times to confirm patterns (timing needs consistency).
- Separate evidence by type:
  - **DNS** = resolution/reachability signal
  - **HTTP** = real fetch with richer context (method, headers, paths)
- Bursty callbacks often point to queues/workers or batch processing.

---

## OOB Timeout Analysis Workflow

<div align="center">
  <pre><code>
┌──────────────────────────┐        Trigger / Input       ┌──────────────────────────┐
│         Tester           │  ───────────────────────▶   │     Target Feature        │
│ (payload / data / URL)   │                              │ (parser / fetcher / job) │
└──────────────────────────┘                              └──────────────┬───────────┘
                                                                         │
                                                                         │ backend processing
                                                                         ▼
                                                          ┌───────────────────────────┐
                                                          │    Backend Component      │
                                                          │ timeouts / retries / async│
                                                          └──────────────┬────────────┘
                                                                         │
                                                                         │ OOB callbacks + timing
                                                                         ▼
┌──────────────────────────┐      correlate timeline      ┌───────────────────────────┐
│   Introspector Listener  │  ◀───────────────────────── │   Evidence / Timeline     │
│    DNS + HTTP callbacks  │                              │ delays, retries, order    │
└──────────────────────────┘                              └───────────────────────────┘

  </code></pre>
</div>
