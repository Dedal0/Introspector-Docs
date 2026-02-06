---
layout: page
title: Redirect Following
parent: Examples
nav_order: 1
---

In SSRF (especially **blind SSRF**), one of the most important questions isn’t just *“Did I get a callback?”* — it’s **how the fetching client behaves**.  
If that client **follows redirects**, it can be the difference between a “limited” SSRF and an SSRF with **bypass potential** or **greater reach**.

Introspector detects this **passively** by leveraging a common real-world pattern: many clients (workers, headless browsers, link preview bots, document parsers) automatically request **`/favicon.ico`** when they touch a domain.

---

## Why redirect-following matters in SSRF

When a backend follows `301/302`:

- **Allowlist bypass potential:** some implementations validate only the **initial URL** (e.g., “only allow trusted domains”), but fail to enforce controls after a redirect.  
  If redirects are followed, you may “enter” via an allowed domain and end up at a different final destination.

- **Redirect chaining:** attacker-controlled intermediate endpoints can be used to:
  - measure client behavior,
  - dynamically adjust the final destination,
  - and steer requests based on what you observe (without relying on the target’s response).

- **Better fetcher fingerprinting:** whether redirects are followed strongly indicates if you’re dealing with:
  - a real headless browser,
  - a link preview bot,
  - a strict HTTP library / worker,
  - or a component that only resolves/validates.

In short: **redirect-following often increases what an SSRF can reach**.

---

## How Introspector validates it (passively)

When a client hits `introspector.sh/favicon.ico`, Introspector replies with a **302** to a verification endpoint:

- `GET /favicon.ico (302 → /favicon-followed)`

If the client **follows** the redirect, it will request `/favicon-followed`.  
At that moment Introspector marks the event with **FOLLOW REDIRECT** (clear evidence that the fetcher follows redirects).

Then, to avoid loops and keep the flow realistic, `/favicon-followed` redirects once more:

- `GET /favicon-followed (302 → /index.ico)`

---



## Passive Redirect Check


                          ┌───────────────────────────────┐
                          │   SSRF Client / Bot / Worker  │
                          │  (headless, preview, parser)  │
                          └───────────────┬───────────────┘
                                          │
                                          │ 1) GET /favicon.ico
                                          ▼
                ┌─────────────────────────────────────────────────┐
                │          Introspector (HTTP Listener)           │
                │ responds with: 302 Location → /favicon-followed │
                └───────────────────────┬─────────────────────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         │       follows redirect?     │
                         └──────────────┬──────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    │                                       │
                    ▼                                       ▼
     ┌──────────────────────────────────┐   ┌──────────────────────────────────┐
     │ 2) GET /favicon-followed         │   │ No second request observed       │
     │ Introspector flags:              │   │ → likely no redirect support     │
     │   ✅ FOLLOW REDIRECT             │   │ → use other SSRF techniques      │
     └───────────────────┬──────────────┘   └──────────────────────────────────┘
                         │
                         │ 2.5) 302 Location → /index.ico
                         ▼
            ┌──────────────────────────────────┐
            │ 3) GET /index.ico (final)        │
            │ Evidence remains in logs:        │
            │ timestamps, headers, IP, path    │
            └──────────────────────────────────┘

