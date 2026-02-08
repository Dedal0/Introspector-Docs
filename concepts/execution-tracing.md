---
layout: page
title: Execution Tracing
---

Execution tracing is the process of turning a *blind* test into a **timeline of evidence**.

When a target system processes your input (SSRF, blind XSS, URL previews, webhooks), Introspector captures the resulting **out-of-band events** and correlates them back to your test.

---

## How Introspector traces execution

1. You generate a **unique identifier (ID)**  
2. You embed the ID in a payload (URL / hostname / path)  
3. The target system triggers network activity  
4. Introspector records **events** (DNS/HTTP) with metadata  
5. You review the **timeline** to confirm what happened

---

## What you can confirm

- **If execution happened** (any event at all)
- **Which channel** was used (DNS only vs HTTP)
- **When** it happened (timestamps; delayed triggers)
- **Who/what called you** (source IP, user-agent, headers)
- **How it evolved** (redirect steps, repeated hits, retries)

---

## Minimal mental model

<pre><code>
Execution Tracing (turn blind behavior into a timeline)

+-----------+
| Attacker  |
+-----+-----+
      |
      | 1) inject payload with unique ID
      v
+---------------------------------+
|  Payload: https://x/&lt;id&gt;  |
|  or: &lt;id&gt;.oob.domain.tld  |
+-------------+-------------------+
              |
              v
+------------------------------+
|       Target Application     |
|------------------------------|
| - parses input               |
| - calls backend services     |
| - preview bot / headless     |
| - webhook handler            |
+---------------+--------------+
                |
                | 2) background action (minutes later sometimes)
                v
+------------------------------+
|    Internal fetcher/backend  |
|------------------------------|
| - resolves hostname (DNS)    |
| - fetches URL (HTTP)         |
| - follows redirects          |
| - retries / caches           |
+---------------+--------------+
                |
                | 3) OOB callbacks arrive
                v
+---------------------------------------------------------------------------------------+
|                                 INTROSPECTOR                                          |
|---------------------------------------------------------------------------------------|
|  [Event Capture]             [Correlation]                  [Evidence]                |
|  +-------------------+       +---------------------+       +----------------+         |
|  | DNS query         | ----> | match by &lt;id&gt; | ----> | Timeline       |         |
|  | A/AAAA/TXT/etc.   |       | session grouping    |       | timestamps     |         |
|  +-------------------+       +---------------------+       | source IP      |         |
|  +-------------------+                                     | headers / path |         |
|  | HTTP request      | ----------------------------------> | redirect chain |         |
|  | method/path/UA    |                                     +----------------+         |
|  +-------------------+                                                                |
|                                                                                       |
|  Output: "Proof that it executed" + "How it executed" (DNS-only vs HTTP vs redirects) |
+---------------------------------------------------------------------------------------+

Quick triage:
- no events  = no execution (or blocked before DNS)
- DNS only   = partial execution / egress restriction
- HTTP       = strong proof (best for reports)
</code></pre>


---

## Practical tips

- Use one ID per endpoint/parameter to keep evidence clean
- If you only see DNS, try a simpler URL/path and confirm consistency
- If you see HTTP, inspect headers/user-agent to identify the fetcher
