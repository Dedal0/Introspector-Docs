---
layout: page
title: Hosted Files
---

The **Hosted Files** module allows you to upload local files and expose them through public HTTP endpoints inside Introspector.

This module is useful for:

- Serving custom payloads (XLSX, XML, SVG, images, etc.).
- SSRF, XXE, OOB and remote download testing.
- Simulating file servers during security assessments.
- Delivering controlled content to backend clients.

---

## 🧠 Mental Model

When you upload a file, Introspector:

1. Generates a unique ID.
2. Automatically detects the file extension.
3. Exposes a public URL under:

```
/hostedfiles/<id>.<ext>
```

Example:

```
/hostedfiles/tw7trndx.xlsx
```

The file is served directly by Introspector.

---

## 🔄 Hosted Files Flow

```
                ┌──────────────────────────┐
                │        Auditor / Bot     │
                │   Backend / Target App   │
                └─────────────┬────────────┘
                              │
                              │ GET /hostedfiles/<id>.<ext>
                              ▼
                ┌──────────────────────────┐
                │        Introspector      │
                │   Hosted Files Endpoint  │
                │                          │
                │  - Validates ID          │
                │  - Resolves extension    │
                │  - Streams file content  │
                └─────────────┬────────────┘
                              │
                              │ 200 OK + File Content
                              ▼
                ┌──────────────────────────┐
                │        Client / Backend  │
                │    Downloads Hosted File │
                └──────────────────────────┘
```

---

## ⚡ Commands

### Upload a file

Uploads a local file and exposes it publicly:

```bash
[Introspector]> file upload templates/pruebas.xlsx
```

Typical output:

```
[+] Hosted file -> [ ID: tw7trndx ]
 URL: /hostedfiles/tw7trndx.xlsx
```

---

### List hosted files

```bash
[Introspector]> file list
```

---

### Delete a hosted file

```bash
[Introspector]> file delete tw7trndx
```

---

## 🧪 Practical Pentest Use Cases

### Payload Hosting

Upload testing payloads such as:

- XLSX with formulas
- XML XXE payloads
- SVG files
- CSV Injection payloads
- Controlled download files

---

### OOB Confirmation

If a backend automatically downloads the file:

- The request will appear in the logs.
- You can confirm indirect execution behavior.

---

## ✅ Quick Checklist

- [ ] File uploaded successfully
- [ ] URL `/hostedfiles/<id>.<ext>` copied
- [ ] Tested via browser or curl
- [ ] Events verified in Admin UI
