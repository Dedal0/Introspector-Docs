---
layout: page
title: Commands
---

Introspector provides a command-line interface for framework management and interactive payload generation.

## Core Commands

### Session Management
```bash
# Start persisted session (data saved to disk)
sudo python3 Introspector.py --persist session01

# Start temporary session (data in memory only)
sudo python3 Introspector.py --temp

# Restore previous session
sudo python3 Introspector.py --restore session01
```

### Payload Generation
```text
[introspector]> run create <payload-type>
[introspector]> run list
[introspector]> run delete <payload-id>
```

### File Hosting
```text
[introspector]> file upload /path/to/file.ext
[introspector]> file list
[introspector]> file delete <file-id>
```

### Listeners
```text
[introspector]> listen <port>
[introspector]> listeners list
[introspector]> listeners stop <port>
```

### Redirects
```text
[introspector]> redirect create <target-url>
[introspector]> redirect list
[introspector]> redirect delete <redirect-id>
```

### Scan Modules
```text
[introspector]> introspect enable <module-name>
[introspector]> introspect disable <module-name>
[introspector]> introspect list
[introspector]> introspect info <module-name>
```

## Payload Types

- **svgbomb** - SVG with XXE/blind injection
- **html** - Custom HTML payloads
- **js** - JavaScript payloads
- **css** - CSS-based attacks
- **xml** - XML external entities
- **json** - JSON injection vectors

## Built-in Scan Modules

- **delayer** - Adds artificial delays for timing analysis
- **follow-redirect** - Tracks redirect chains
- **user-agent-logger** - Logs client identification
- **header-analyzer** - Captures request headers
- **dns-resolver** - DNS callback correlation

## Configuration Options

```text
[introspector]> config set <key> <value>
[introspector]> config get <key>
[introspector]> config list
```

Common settings:
- `dns.enabled` - Enable DNS callbacks
- `log.level` - Verbosity (debug, info, warn, error)
- `http.ports` - Default HTTP listener ports
- `session.timeout` - Auto-save interval