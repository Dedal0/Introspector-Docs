---
layout: page
title: Redirects
---

# Redirects

The **Redirects** module allows you to work with controlled HTTP redirections inside Introspector.

It is mainly used to:

- Detect whether a backend/fetcher **follows redirects** (follow-redirect).
- Generate controlled **302 endpoints with `Location` headers**.
- Test internal paths, redirect chains, and HTTP client behavior.

---

## 🧠 Mental Model

There are **two ways** to use redirects in Introspector:

### 1) Manual Redirects (created via CLI)

You create a real endpoint:

```
/redirect/<id>
```

That endpoint always responds with:

```
HTTP/1.1 302 Found
Location: <target>
```

---

### 2) Automatic Redirects (Scan Module: follow-redirect)

When the `follow-redirect` scan module is enabled, Introspector activates “trap” routes that return 302 responses on common endpoints
(`robots.txt`, `favicon.ico`, etc.) to detect if the client **follows** the `Location` header.

---

## 🔄 Diagram (manual redirect)

```
Victim / Backend / Bot
        |
        | GET /redirect/abc123
        v
+---------------------------+
|      Introspector Node    |
|     Redirect (manual)     |
+---------------------------+
        |
        | 302 Location: https://target.site
        v
Destination (only if redirects are followed)
```

---

## ⚡ Commands (Manual Redirects)

### List active redirects
Shows all created redirects and their targets:

```bash
[Introspector]> redirect list
```

---

### Create a redirect
Creates an ID and registers the destination (URL or relative path):

```bash
[Introspector]> redirect create https://example.com
```

Short alias (compatibility mode):

```bash
[Introspector]> redirect https://example.com
```

Typical output:

```
[+] Created redirect: /redirect/abc123 -> https://example.com
```

---

### Create a relative redirect (same host)
Useful when you want the client to remain inside the same host:

```bash
[Introspector]> redirect create /logs-xxxxxxx
```

---

### Delete a redirect
Removes the ID and disables the endpoint:

```bash
[Introspector]> redirect delete abc123
```

Legacy command (deprecated but still supported):

```bash
[Introspector]> redirect kill abc123
```

---

## 🧪 Scan Module: follow-redirect (automatic)

This module does NOT create manual IDs; instead it enables “decoy” routes that respond with 302 redirects
to detect clients that automatically follow redirections.

### List available modules

```bash
[Introspector]> introspect list
```

### Check module status

```bash
[Introspector]> introspect status follow-redirect
```

### Enable / Disable

```bash
[Introspector]> introspect enable follow-redirect
[Introspector]> introspect disable follow-redirect
```

---

## 🧷 Decoy Routes (when follow-redirect is ON)

When enabled, Introspector uses common endpoints to trigger redirects:

- `/robots.txt` → 302 → `/absolute` → 302 → `/roboted.txt`
- `/favicon.ico` → 302 → `/favicon-followed` → 302 → `/index.ico`

If the client **follows** the `Location`, you will see multiple hits (a chain).
If it does NOT follow, only the first request will appear.

---

## ✅ Quick Checklist

- [ ] For manual redirects: `redirect create <url>` and test `/redirect/<id>`
- [ ] For automatic detection: `introspect enable follow-redirect`
- [ ] Review events inside the Admin UI logs
