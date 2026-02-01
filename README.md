# Introspector Documentation

**Professional web hacking tool documentation built with minimal Jekyll and custom security-themed styling.**

## Features

- 🌙 **Dark terminal theme** - Hacker-inspired design with green accent colors
- ⚡ **Search functionality** - Ctrl+K quick search across all docs
- 📱 **Responsive design** - Mobile-friendly documentation
- 🎯 **Security-focused UI** - Terminal aesthetics for offensive tools
- 🔍 **Copy code blocks** - One-click copy for commands
- 🌊 **Smooth animations** - Glitch effects and transitions

## Technology Stack

- **Jekyll** - Static site generator (GitHub Pages compatible)
- **Custom CSS** - No external theme dependencies
- **Vanilla JavaScript** - Search and interactive features
- **Kramdown** - Markdown processing with syntax highlighting

## Directory Structure

```
├── _config.yml          # Jekyll configuration
├── _layouts/           # Page templates
├── _includes/          # Reusable components
├── assets/
│   ├── css/           # Custom security-themed styles
│   └── js/           # Search and interactions
├── concepts/          # Framework concepts
├── getting-started/   # Installation and quickstart
├── usage/           # Feature documentation
├── reference/       # Commands and configuration
├── examples/        # Real-world scenarios
└── screenshots/     # UI demonstrations
```

## Deployment

This site is optimized for GitHub Pages deployment:

1. Push to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Select "Deploy from a branch" → "main" → "/ (root)"
4. Automatic deployment via GitHub Actions

## Customization

The design is easily customizable via CSS variables in `assets/css/introspector.css`:

```css
:root {
  --accent-green: #00ff41;    /* Primary accent */
  --accent-blue: #00d4ff;     /* Secondary accent */
  --bg-primary: #0a0a0a;      /* Main background */
  --text-primary: #e0e0e0;    /* Main text */
}
```

## Performance

- **Fast loading** - Minimal dependencies, optimized CSS
- **SEO optimized** - Meta tags and structured data
- **Accessibility** - Semantic HTML and ARIA labels
- **Mobile ready** - Responsive breakpoints

Built for penetration testers, security researchers, and offensive security professionals who need professional documentation with hacker aesthetics.