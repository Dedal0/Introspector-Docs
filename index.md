---
layout: page
show_title: false
---

<video
  autoplay
  loop
  muted
  playsinline
  preload="auto"
  style="width:100%; border-radius:14px; display:block;"
>
  <source src="{{ '/assets/videos/intro.mp4' | relative_url }}" type="video/mp4">
  Tu navegador no soporta video HTML5.
</video>

<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(360px,1fr)); gap:22px; margin:16px 0 28px 0;">
  <style>
    .homecard { text-decoration:none !important; color:inherit !important; }
    .homecard * { color:inherit !important; }
  </style>

  <a class="homecard" href="{{ '/getting-started/quickstart/' | relative_url }}"
     style="display:flex; gap:18px; padding:22px; border:1px solid rgba(255,255,255,.14); border-radius:16px; background:rgba(255,255,255,.02);">
    <div style="width:56px;height:56px;border:1px solid rgba(255,255,255,.14);border-radius:12px;display:flex;align-items:center;justify-content:center;">🚀</div>
    <div>
      <div style="font-weight:700; font-size:20px; color:#e6edf3;">Quickstart</div>
      <div style="margin-top:6px; font-size:14px; color:#8b949e;">Run a session, open the log UI, and generate payloads in minutes</div>
    </div>
  </a>

  <a class="homecard" href="{{ '/reference/commands/' | relative_url }}"
     style="display:flex; gap:18px; padding:22px; border:1px solid rgba(255,255,255,.14); border-radius:16px; background:rgba(255,255,255,.02);">
    <div style="width:56px;height:56px;border:1px solid rgba(255,255,255,.14);border-radius:12px;display:flex;align-items:center;justify-content:center;">📚</div>
    <div>
      <div style="font-weight:700; font-size:20px; color:#e6edf3;">Commands</div>
      <div style="margin-top:6px; font-size:14px; color:#8b949e;">Complete command reference for framework control</div>
    </div>
  </a>

  <a class="homecard" href="{{ '/screenshots/ui/' | relative_url }}"
     style="display:flex; gap:18px; padding:22px; border:1px solid rgba(255,255,255,.14); border-radius:16px; background:rgba(255,255,255,.02);">
    <div style="width:56px;height:56px;border:1px solid rgba(255,255,255,.14);border-radius:12px;display:flex;align-items:center;justify-content:center;">🖼️</div>
    <div>
      <div style="font-weight:700; font-size:20px; color:#e6edf3;">Screenshots</div>
      <div style="margin-top:6px; font-size:14px; color:#8b949e;">See the UI and workflow in action</div>
    </div>
  </a>
</div>



## What It Is

Introspector is a modular offensive framework for observing and **weaponizing HTTP-based behavior** — including what happens *outside* the immediate response.

Instead of "I got a callback", you get **context**: what endpoint was hit, what chain happened next, what the client retried, whether it followed redirects, whether DNS was involved, and what payload was actually fetched.

<div class="alert alert-note">
This docs site is written to be usable during real assessments: short pages, copy/paste commands, and a clear sidebar.
</div>

## Core Capabilities

### Passive Traps
Set up HTTP listeners and DNS callbacks that capture detailed information about any client interactions.

### Payload Hosting
Generate ready-to-fetch endpoints with correct content types, or host custom files for testing.

### Redirect Intelligence  
Create tracking redirects and detect redirect-following behavior in real traffic patterns.

### Execution Tracing
Correlate HTTP + DNS activity to reconstruct the full execution path of vulnerability exploitation.

## Quick Installation

```bash
git clone https://github.com/deepsecurity-pe/Introspector.git
cd introspector-framework  
pip3 install -r requirements.txt
sudo python3 Introspector.py --persist session01
```

Then open the log UI printed in the console (e.g. `/logs-<id>`). You're ready to serve payloads and trace callbacks.

## Documentation Structure

- **Getting Started**: Installation and quickstart guide
- **Concepts**: Mental models and architectural understanding  
- **Usage**: Detailed feature documentation
- **Reference**: Commands, configuration, and payload types
- **Examples**: Real-world usage scenarios
- **Screenshots**: UI demonstration

Built for penetration testers, security researchers, and red team professionals who need visibility into what happens when their payloads execute.
