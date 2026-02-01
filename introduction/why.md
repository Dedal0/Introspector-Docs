---
title: Why Introspector
parent: Introduction
nav_order: 2
permalink: /introduction/why/
---

Most OOB tooling answers one question:

> “Did the target call back?”

Introspector is built to answer the next 5 questions you *immediately* ask in a real engagement:

1. **What input** caused the callback?
2. **What exact endpoint** fetched it (path, headers, method, body)?
3. Did it **follow redirects**? How many hops?
4. Did it **retry**? With what timing?
5. Was **DNS involved** (and can we correlate it)?

This turns callbacks into **usable signal** you can write a report and a reliable PoC around.

{: .note }
If your workflow includes blind SSRF, bot/sandbox detection, redirect abuse, timeouts, or payload delivery (XXE/CSV/SVG), Introspector compresses the “setup + trace + confirm” loop into one place.
