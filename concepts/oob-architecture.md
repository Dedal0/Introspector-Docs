---
layout: page
title: OOB architecture
---

Introspector works by receiving **out-of-band (OOB)** interactions from systems that you cannot observe directly.

Instead of relying on the application response, you validate behavior by watching **real callbacks** hitting your controlled infrastructure.

---

## Components (conceptual)

- **DNS Listener**  
  Captures hostname resolutions. Useful when HTTP is blocked.

- **HTTP Listener**  
  Captures full requests (method/path/headers/body when present).

- **Payload Host**  
  Hosts endpoints and files used for verification (redirect tests, hosted files).

- **Log Engine + UI**  
  Normalizes everything into **events**, grouped and searchable.

---

## Data flow

<pre><code>
How it works (OOB Architecture)

+-----------+        +------------------+        +-------------------------------------------+
| Attacker  | -----> | Payload / URL ID | -----> |                TARGET SYSTEM              |
+-----------+        +------------------+        | (Web App / API / Parser / Preview / Bot)  |
                                                 +-------------------+-----------------------+
                                                                     |
                                                                     | OOB traffic (DNS / HTTP)
                                                                     v
                  +--------------------------------------------------------------------------------+
                  |                                 INTROSPECTOR                                   |
                  |--------------------------------------------------------------------------------|
                  |  +------------------+   +------------------+   +----------------------------+  |
                  |  |  DNS Listener    |   |  HTTP Listener   |   |       Payload Host         |  |
                  |  |  :53 (queries)   |   |  :80/:443 (reqs) |   |    files:  xml, html, etc  |  |
                  |  +--------+---------+   +--------+---------+   +--------------+-------------+  |
                  |           |                      |                            |                |
                  |           +----------------------+----------------------------+                |
                  |                                  v                                             |
                  |                       +---------------------+                                  |
                  |                       |    Log Engine       |                                  |
                  |                       | - normalize events  |                                  |
                  |                       | - correlate by ID   |                                  |
                  |                       +----------+----------+                                  |
                  |                                  |                                             |
                  |                                  v                                             |
                  |                       +---------------------+                                  |
                  |                       |  Web UI / API       |                                  |
                  |                       | - filters (DNS/HTTP)|                                  |
                  |                       | - timeline          |                                  |
                  |                       | - export evidence   |                                  |
                  |                       +---------------------+                                  |
                  +--------------------------------------------------------------------------------+

Notes:
- DNS-only = resolution happened (possible egress limits)
- HTTP = real fetch (headers/path/timing)
- Redirect chains = confirm follow behavior and hop limits
</code></pre>


---

## Why it matters

- Confirms execution even with static/unchanged responses
- Helps explain the behavior (DNS-only, HTTP fetch, redirects)
- Produces evidence you can export for reports
