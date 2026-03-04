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
When the target resolves a subdomain under your base domain (e.g., `abc123.oob.introspector.sh`), Introspector:

- receives the DNS query
- extracts the subdomain/token
- logs the event in the Admin UI

---

## ⚙️ Using your own domain (VPS + DNS)

### Requirements

- A VPS with a public IP (example: `192.168.10.43`)
- Your own domain (example: `introspector.sh`)
- Access to your domain DNS panel (registrar/Cloudflare/etc.)

---

## ⚠️ Important (project config)

✅ **Introspector DNS configuration is changed in: `core_state.py`.**  
Inside that file you’ll find the `DNS_CONFIG` block. Update it with your **public IP** and your **base domain**:

```python
DNS_CONFIG = {
    "listen_ip": "0.0.0.0",
    "listen_port": 53,                    # use 53 on a real VPS (or 5353 locally)
    "mode": "A",                          # "A" or "NXDOMAIN"
    "reply_ip": "192.168.10.43",          # VPS public IP
    "domain_base": "oob.introspector.sh", # delegated base domain (NS method)
    "log_file": "dns_queries.log",
    "seen_file": "tokens_seen.json"
}
```
## Configure DNS in your provider (GoDaddy, etc.) — WITHOUT THIS, callbacks won’t arrive

Even if you already configured core_state.py, DNS callbacks will NOT arrive “by magic”.
To receive DNS queries on your VPS, you must make your VPS the authoritative DNS for a subdomain (example: oob.introspector.sh).

---

### **This guide uses these fixed examples**

- **VPS IP:** `192.168.10.43`
- **Domain:** `introspector.sh`
- **OOB base:** `oob.introspector.sh`
- **Custom nameserver** `ns1.oob7k3p.introspector.sh`

---

## Step 1 — Create the custom nameserver (GLUE / Hostname)

In your DNS provider, find a section like **Hostnames / Child Name Servers / Custom nameservers** and create:

- **Hostname:** `ns1.oob7k3p.introspector.sh`
- **IP Address:** `192.168.10.43`

Why this matters: it “binds” the nameserver hostname to your VPS IP, so delegation can work reliably.

---

## Step 2 — Add DNS records (DNS Records)

Now open the DNS zone for **introspector.sh** and create these two records:

### 1) NS delegation (delegate oob to your nameserver)

- **Type:** `NS`
- **Name/Host:** `oob`
- **Value/Target:** `ns1.oob7k3p.introspector.sh.`

Result:

- `NS oob ns1.oob7k3p.introspector.sh.`

### 2) A record for the nameserver

- **Type:** `A`
- **Name/Host:** `ns1.oob7k3p`
- **Value:** `192.168.10.43`

Result:

- `A ns1.oob7k3p 192.168.10.43`

✅ After this, any token under oob.introspector.sh will reach your VPS:

- `abc123.oob.introspector.sh`
- `ssrf-test.oob.introspector.sh`

---

## 🖥️ VPS notes (UDP/53 + normal DNS)

Stop systemd-resolved (why?)

systemd-resolved can occupy DNS locally and block port 53.
Stopping it frees UDP/53 so Introspector can bind to it:

```bash
sudo systemctl stop systemd-resolved
Update /etc/resolv.conf (why?)

After stopping systemd-resolved, your VPS may lose normal DNS resolution.
Set a public resolver so the VPS can still resolve domains:

File: /etc/resolv.conf

nameserver 8.8.8.8
options edns0 trust-ad
search .
✅ Ready-to-use examples

These should generate DNS queries and appear in Introspector:

abc123.oob.introspector.sh

ssrf-test.oob.introspector.sh

pingme-01.oob.introspector.sh
```
