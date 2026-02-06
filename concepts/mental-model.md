Introspector provides **OOB (out-of-band) evidence** when the application response is not helpful (SSRF / Blind XSS / internal fetchers).
Simple idea: **you inject a payload with a unique ID**, the backend resolves/fetches it, and Introspector captures **real events** (DNS/HTTP, headers, timestamps) in your dashboard.

---

## 3-step flow

1) Generate a **unique ID** and embed it into your payload  
2) The target performs a network action (**DNS and/or HTTP**, sometimes redirects)  
3) Introspector records it and shows **callbacks/events** with context

---

## Quick meaning

- **DNS only** → hostname was resolved, but HTTP may be blocked (egress limits or partial validation)
- **HTTP** → real fetch (strong evidence: headers, path, timing)
- **Redirects** → confirms hop-following behavior and how requests evolve

---

## How It Works

```
                                    ┌─────────────────────────────────────┐
                                    │          INTROSPECTOR               │
                                    │  ┌─────────────────────────────┐    │
┌──────────┐      ┌─────────┐       │  │  • HTTP Listener (80, 443)  │    │
│          │      │         │       │  │  • DNS  Listener (53)       │    │
│ Attacker │─────▶│ Vuln    │───────│─▶│  • Payload Hosting          │    │
│          │      │ API     │       │  │  • Passive Scanners         │    │
└──────────┘      └─────────┘       │  │  • Response Designer        │    │
     │                 │            │  └─────────────────────────────┘    │
     │                 │            │                 │                   │
     │                 ▼            │                 ▼                   │
     │         ┌─────────────┐      │     ┌───────────────────┐           │
     │         │ Backend     │      │     │    Real-time      │           │
     │         │ • Headless  │──────│────▶│    Logging        │           │
     │         │ • RPA       │      │     │    • GeoIP        │           │
     │         │ • Scripts   │      │     │    • WHOIS        │           │
     │         └─────────────┘      │     │    • Full Req/Res │           │
     │                              │     └───────────────────┘           │
     │                              └─────────────────────────────────────┘
     │                                              │
     ▼                                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  SSRF Scenario:                                                         │
│                                                                         │
│  Original:  ?url=http://192.168.1.10:3389/internal    ← BLOCKED         │
│  Bypass:    ?url=http://legit-docs.com/file.xlsx      ← Introspector    │
│                        │                                redirects to    │
│                        └──────────────────────────────▶ 192.168.1.10    │
└─────────────────────────────────────────────────────────────────────────┘
```


---

## Diagram (similar style)

~~~
+------------------+      HTTP/DNS      +------------------------+
|    Target App    |  --------------->  |     Introspector       |
+------------------+                   +------------------------+
                                      | HTTP Listener           |
                                      | DNS Server              |
                                      | Payload Host            |
                                      | Log Engine              |
                                      +------------------------+
                                                |
                                                v
                                      +------------------------+
                                      |     Callbacks/Events   |
                                      |  time / ip / headers   |
                                      +------------------------+
                                                |
                                                v
                                      +------------------------+
                                      |  Web UI (Logs/Filters) |
                                      |  Evidence / Export     |
                                      +------------------------+
~~~

