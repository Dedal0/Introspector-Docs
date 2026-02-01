---
layout: page
title: Quickstart
---

This quickstart gets you from "installed" to "callbacks + payload endpoints + logs UI" fast.

## 1) Start a persisted session

```bash
sudo python3 Introspector.py --persist session01
```

After startup, Introspector prints:

- a **Log UI** path (e.g. `/logs-<id>`)
- active **HTTP ports**
- **DNS** status (if enabled)
- where hosted payloads/files will appear

Open the Log UI in your browser. This becomes your "single pane of glass" for HTTP + DNS activity.

## 2) Create a payload endpoint

From the REPL:

```
[introspector]> run create svgbomb
[+] Created /run/<id>.svg (Content-Type: image/svg+xml)
```

Copy that `/run/...` URL into your payload vector (SSRF, preview bot, parser, etc.).

## 3) Host a custom file

```
[introspector]> file upload /path/to/iframe.html
[+] Hosted file -> [ ID: <id> ]
    URL: /hostedfiles/<id>.html
```

## 4) Start another listener port (optional)

```
[introspector]> listen 8888
[+] HTTP listener started on port 8888
```

## 5) Redirect intel (optional)

```
[introspector]> redirect create https://example.com/admin
[+] Created redirect: /redirect/<id> -> https://example.com/admin
```

## 6) Enable scan modules (optional)

```
[introspector]> introspect enable delayer
[introspector]> introspect enable follow-redirect
[introspector]> introspect list
```

<div class="alert alert-tip">
If you're debugging timeouts, try <code>/delayresponse?t=20</code> to learn client's patience threshold.
</div>

Next: read the <a href="{{ '/concepts/mental-model/' | relative_url }}">Mental model</a> so you can interpret callbacks like an execution trace.