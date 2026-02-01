---
layout: page
show_title: false
hero:
  buttons:
    - url: /quickstart/
      text: Quickstart
      icon: 🚀
      description: Run a session, open the log UI, and generate payloads in minutes
    - url: /mental-model/
      text: Mental Model
      icon: 🧠
      description: Understand how to interpret callbacks like execution traces
    - url: /commands/
      text: Commands
      icon: 📚
      description: Complete command reference for framework control
    - url: /ui/
      text: Screenshots
      icon: 🖼️
      description: See the UI and workflow in action
---

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