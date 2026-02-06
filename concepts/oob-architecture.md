

# OOB Architecture

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
+------------+     DNS/HTTP      +-------------------+
| Target App | ----------------> | Introspector      |
+------------+                   | - DNS Listener    |
                                 | - HTTP Listener   |
                                 | - Payload Host    |
                                 | - Log Engine      |
                                 +-------------------+
                                           |
                                           v
                                 +-------------------+
                                 | Events / Evidence |
                                 | - timestamps      |
                                 | - source IP       |
                                 | - headers         |
                                 | - correlation ID  |
                                 +-------------------+
</code></pre>

---

## Why it matters

- Confirms execution even with static/unchanged responses
- Helps explain the behavior (DNS-only, HTTP fetch, redirects)
- Produces evidence you can export for reports
