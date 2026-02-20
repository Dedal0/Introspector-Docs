---
layout: page
title: UI Demo
---

### HTTP and DNS callbacks
*Introspector starts HTTP and DNS callback servers to register target's interactions, a flag of the origin server's country is shown to help interaction tracking. Introspector also has a **whois** button to show full information of the target.*

<img style="width:100%; border-radius:14px; display:block;" src="{{ '/assets/img/microsoft1.png' | relative_url }}" alt="Introspector HTTP and DNS Callback server">


### Analysis and Detect SSRF Detection with controlled response delay
*If you want to be sure about a backend's interaction, you can use Introspector to set specific response time to a response.*

<img style="width:100%; border-radius:14px; display:block;" src="{{ '/assets/img/microsoft.png' | relative_url }}" alt="Introspector SSRF Analysis">


### Follow-Redirect Detection Redirect Chaining
*If you want to know whether a backend behaves like a ‘browser-like’ client, Introspector can flag FOLLOW REDIRECT events when the target automatically follows 3xx responses and performs the next request (for example, when hitting common paths like favicon). This helps you confirm the system isn’t just validating a URL—it’s continuing the flow by following redirects.*

<img style="width:100%; border-radius:14px; display:block;" src="{{ '/assets/img/ssrf.png' | relative_url }}" alt="Introspector SSRF redirect">


### Startup Screen CLI
*This image shows Introspector starting from the terminal: the run command, the framework banner, and a quick status summary with the Admin Panel URL, active ports, and the DNS listener status. The [Introspector]> prompt at the bottom indicates it’s ready to use.*

<img style="width:100%; border-radius:14px; display:block;" src="{{ '/assets/img/ID.png' | relative_url }}" alt="Introspector CLI">


### Hosted Files
*This image shows how Introspector can host a file using file upload <path>/<file.etc>. After the upload, Introspector generates an ID and prints the URL to access it (for example: /hostedfiles/<id>.xlsx), including the uploaded file’s name/extension.*

<img style="width:100%; border-radius:14px; display:block;" src="{{ '/assets/img/host-file.png' | relative_url }}" alt="Introspector Hosted files">

