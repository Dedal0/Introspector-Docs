---
layout: page
title: DNS Callbacks
---


The **DNS Callbacks** module helps you confirm OOB (out-of-band) interactions when a target performs **DNS lookups** to your infrastructure.

This is useful for scenarios such as:

- Blind SSRF (DNS-only)
- XXE
- Command Injection
- Backends that do “silent” fetches
- Clients that don’t return anything over HTTP

---

## 🧠 How it works (quick overview)

Introspector starts a **DNS listener** on **UDP/53**.  
When the target resolves a subdomain under your domain (e.g., `abc123.yourdomain.com`), Introspector:

- receives the DNS query
- extracts the subdomain/token
- logs the event in the Admin UI

---

## ⚙️ Using your own domain (VPS + DNS)

### Requirements

- A VPS with a public IP (e.g., `X.X.X.X`)
- Your own domain (e.g., `example.com`)
- Access to your domain DNS panel (registrar/Cloudflare/etc.)
- Open ports:
  - **UDP 53** (DNS)
  - **TCP 80/443** (HTTP callbacks / Admin UI if applicable)

---

## ⚠️ Important (project config)

✅ **Introspector DNS configuration is changed in: `core_state.py`.**  
Inside that file you’ll find the `DNS_CONFIG` block. Update it with your **public IP** and your **base domain**:

```python
DNS_CONFIG = {
    "listen_ip": "0.0.0.0",
    "listen_port": 53,                    # use 53 on a real VPS (or 5353 locally)
    "mode": "A",                          # "A" or "NXDOMAIN"
    "reply_ip": "138.197.112.130",        # VPS public IP
    "domain_base": "introspector.d3.lu",  # e.g., "xx.domain.com"
    "log_file": "dns_queries.log",
    "seen_file": "tokens_seen.json"
}
```
## Configure DNS in your provider (GoDaddy, etc.) — WITHOUT THIS, callbacks won’t arrive

Even if you already configured `core_state.py`, **DNS callbacks will NOT arrive “by magic”**:  
your domain must point to the VPS public IP in your DNS provider panel (GoDaddy, etc).

**Wildcard A record (tokens)**
- **Type:** `A`
- **Name:** `*.introspector`
- **Value:** `X.X.X.X`

> This is exactly the style shown in your screenshot: `*.introspector -> IP`

✅ If you use this option, set in `core_state.py`:

```text
domain_base = "introspector.tudominio.com"
```
