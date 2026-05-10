# 🌐 create-geocities-app

> Scaffold a complete 1990s Geocities-themed static website in seconds.

[![npm version](https://img.shields.io/npm/v/create-geocities-app.svg)](https://www.npmjs.com/package/create-geocities-app)
[![npm downloads](https://img.shields.io/npm/dm/create-geocities-app.svg)](https://www.npmjs.com/package/create-geocities-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-blueviolet)](https://sugardaddyapp.github.io/create-geocities-app/)

```
  ██████╗ ███████╗ ██████╗  ██████╗██╗████████╗██╗███████╗███████╗
 ██╔════╝ ██╔════╝██╔═══██╗██╔════╝██║╚══██╔══╝██║██╔════╝██╔════╝
 ██║  ███╗█████╗  ██║   ██║██║     ██║   ██║   ██║█████╗  ███████╗
 ██║   ██║██╔══╝  ██║   ██║██║     ██║   ██║   ██║██╔══╝  ╚════██║
 ╚██████╔╝███████╗╚██████╔╝╚██████╗██║   ██║   ██║███████╗███████║
  ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝

         create-geocities-app  ✨  Welcome to 1996  ✨
```

**[🌐 View Live Demo](https://sugardaddyapp.github.io/create-geocities-app/)**

---

## What is this?

`create-geocities-app` is a CLI tool that generates a fully self-contained, retro 1990s Geocities-style personal website. Think neon colors, blinking text, animated star trails, marquee banners, visitor counters, and guestbooks — all of it, generated instantly with a single command.

The generated site is **pure static HTML, CSS, and vanilla JavaScript**. No build tools, no frameworks, no dependencies. Just open `index.html` in any browser and relive the golden age of the web.

---

## Quick Start

```bash
npx create-geocities-app my-site
```

Then open `my-site/index.html` in your browser. That's it!

---

## Demo

**Live demo:** [https://sugardaddyapp.github.io/create-geocities-app/](https://sugardaddyapp.github.io/create-geocities-app/)

The demo is generated with all options enabled (neon theme, sparkle cursor, falling stars, all 5 pages). It is automatically rebuilt and deployed to GitHub Pages on every push to `main`.

---

## Interactive Setup

When you run `npx create-geocities-app my-site`, you'll be walked through a series of prompts:

| # | Prompt | Type | Description |
|---|--------|------|-------------|
| 1 | **Site name** | text | Your homepage title, e.g. `CoolDude's Homepage` |
| 2 | **Your name** | text | Displayed in headers, footers, and contact sections |
| 3 | **Color theme** | select | Choose from 5 retro color palettes (see below) |
| 4 | **Extra pages** | multi | About, Gallery, Guestbook, Cool Links |
| 5 | **Cursor effect** | select | Sparkle, Star Trail, Comet, Rainbow, or None |
| 6 | **Falling effect** | select | Stars, Snow, or None |
| 7 | **Welcome alert** | yes/no | Show a `alert()` greeting when the page loads |
| 8 | **Auto-play music** | yes/no | Play a Web Audio API 8-bit jingle on load |
| 9 | **Fake high count** | yes/no | Start visitor counter at ~10,000 (looks popular!) |

### Skip prompts (use all defaults)

```bash
npx create-geocities-app my-site --yes
```

---

## Generated Output

```
my-site/
├── index.html        ← Homepage
├── about.html        ← About Me (if selected)
├── gallery.html      ← Photo Gallery with lightbox (if selected)
├── guestbook.html    ← Guestbook (if selected)
├── links.html        ← Cool Links (if selected)
├── css/
│   └── style.css     ← Full retro stylesheet (theme-specific)
└── js/
    └── main.js       ← All JS effects (counter, cursor, music, etc.)
```

**Zero runtime dependencies** in the generated output. Every file is self-contained and works offline.

---

## Color Themes

Choose a theme during setup. Each theme controls background, text, link, and accent colors throughout the entire site.

| Theme | Background | Primary Text | Headings | Links | Feel |
|-------|-----------|--------------|----------|-------|------|
| `neon` | `#000000` | `#00FF00` | `#FFFF00` | `#FF00FF` | Hacker/Matrix vibes |
| `space` | `#000033` | `#CCCCFF` | `#FFDD00` | `#00FFFF` | Deep space explorer |
| `candy` | `#FF69B4` | `#FFFFFF` | `#FFFF00` | `#00FFFF` | Sweet and electric |
| `forest` | `#003300` | `#CCFFCC` | `#FFDD00` | `#99FF99` | Dark enchanted forest |
| `windows` | `#008080` | `#000000` | `#000080` | `#000080` | Classic Windows 95 |

---

## Pages

### 🏠 index.html — Homepage
Every generated site includes a homepage with:
- **Marquee banner** — scrolling welcome text (CSS animation, no deprecated `<marquee>` tag)
- **Rainbow animated site title** — CSS `hue-rotate` animation cycles through all colors
- **Neon-pulsing headings** — `text-shadow` breathes in and out
- **"What's New" section** — with blinking NEW badges
- **Under Construction section** — animated yellow/black caution tape
- **Sidebar** — navigation, live clock, spinning globe, visitor counter, web ring
- **Web ring widget** — retro navigation to prev/home/next sites
- **Footer** — "Best viewed in Netscape Navigator" badge, copyright

### 👤 about.html — About Me
- **Fun Facts list** — blinking star bullet points
- **Interests grid** — styled badge chips for hobbies
- **Favorites table** — a retro-styled table of favorite things (music, movies, games, etc.)
- **Contact section** — email and guestbook links

### 🖼️ gallery.html — Photo Gallery
- **Photo of the Month** spotlight at the top
- **3-column image grid** — each item has thick beveled Windows-95-style borders
- **Captions** in Comic Sans below each image
- **Lightbox viewer** — click any photo to open it full-size in an overlay; press ESC or click outside to close
- Placeholder images pre-filled — replace with your own

### 📖 guestbook.html — Guestbook
- **Sign form** — fields for name, email, website, location, and message
- **Fake previous entries** — pre-populated with period-authentic guestbook posts (fully editable)
- **Client-side submit** — shows a thank-you alert and resets the form
- Note explaining how to add a real backend (Formspree, Netlify Forms, etc.)

### 🔗 links.html — Cool Links
- Links organized into categories: Friends, Games, Web & Tech, Art, News
- **Blinking animated bullets** before each link
- Description text below each link
- "Request Link Exchange" email button

---

## Effects Reference

### Cursor Effects

| Effect | What it does |
|--------|-------------|
| **Sparkle** ✨ | Random glitter glyphs (`✦`, `✧`, `★`, `·`) spawn at your cursor and float upward |
| **Star Trail** ★ | Yellow ★ characters follow the cursor and fade out with a scale-down animation |
| **Comet** ☄️ | An orange-to-white horizontal streak trails behind cursor movement |
| **Rainbow** 🌈 | Colored dots cycle through the full hue spectrum as you move the cursor |
| **None** | No cursor effect |

### Falling Background Effects

| Effect | What it does |
|--------|-------------|
| **Stars** ⭐ | 60 colored star characters (`★`) fall from top of screen with random sizes, speeds, and drift |
| **Snow** ❄️ | 40 white circular snowflakes drift downward with random horizontal drift |
| **None** | No falling effect |

### Other Effects

| Effect | Details |
|--------|---------|
| **Visitor counter** | Odometer-style LCD digit boxes, animates on load, persists via `localStorage` |
| **Live clock** | `HH:MM:SS` display in the sidebar, updated every second |
| **Marquee banner** | CSS `@keyframes` scroll animation — pauses on hover |
| **Blinking text** | CSS `@keyframes blink` — used on NEW badges, bullet points, and decorations |
| **Rainbow headings** | CSS `filter: hue-rotate()` animation cycles through all colors |
| **Neon glow pulse** | `text-shadow` breathes in/out on all major headings |
| **Spinning globe** | 🌍 emoji spins continuously via CSS `rotate` animation |
| **Under construction** | Yellow/black diagonal-stripe caution tape with a spinning 🚧 icon |
| **Page entry animation** | Content fades and slides up on load |
| **8-bit music jingle** | Square-wave melody via Web Audio API — plays on first interaction; toggle with the PLAY/STOP button |
| **Matrix rain** | Press **M** on any page to toggle a green Matrix-style canvas rain effect |
| **Custom scrollbar** | Themed scrollbar matching the color palette (Chrome/Edge/Safari) |
| **Gallery lightbox** | Click-to-expand image viewer with caption, close button, and ESC key support |

---

## GitHub Pages Setup (for your generated site)

To host your generated site on GitHub Pages:

1. Create a new GitHub repository
2. Copy the contents of your generated folder into it
3. Push to `main`
4. Go to **Settings → Pages → Source → Deploy from a branch → main → / (root)**
5. Your site is live at `https://<username>.github.io/<repo-name>/`

---

## Project Structure (for contributors)

```
geocities-boilerplate/
├── .github/workflows/
│   └── deploy-demo.yml    # Auto-deploys demo/ to GitHub Pages
├── bin/
│   └── cli.js             # CLI entry point with ASCII banner
├── src/
│   ├── generator.js       # Core: reads templates, interpolates vars, writes files
│   ├── prompts.js         # Interactive prompts using `prompts` package
│   └── themes.js          # 5 color palette definitions
├── templates/             # Source templates (included in npm bundle)
│   ├── index.html
│   ├── about.html
│   ├── gallery.html
│   ├── guestbook.html
│   ├── links.html
│   ├── css/style.css
│   └── js/main.js
├── demo/                  # Pre-generated demo (not in npm bundle)
├── scripts/
│   └── build-demo.js      # Regenerates demo/ with all options enabled
├── package.json
├── PLAN.md                # Full project plan and design decisions
└── README.md
```

### Template Variables

Templates use `{{VARIABLE_NAME}}` placeholders that are replaced by the generator. Key variables:

| Variable | Description |
|----------|-------------|
| `{{SITE_NAME}}` | Site title from user prompt |
| `{{AUTHOR_NAME}}` | Author name from user prompt |
| `{{THEME_NAME}}` | Human-readable theme name |
| `{{BG}}`, `{{TEXT_COLOR}}`, etc. | Theme color values (CSS hex) |
| `{{CURSOR_EFFECT}}` | Selected cursor effect key |
| `{{FALLING_EFFECT}}` | Selected falling effect key |
| `{{WELCOME_ALERT}}` | `"true"` or `"false"` |
| `{{PLAY_MUSIC}}` | `"true"` or `"false"` |
| `{{FAKE_HIGH_COUNT}}` | `"true"` or `"false"` |
| `{{NAV_LINKS}}` | Generated navigation `<a>` tags based on selected pages |
| `{{YEAR}}` | Current year |

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-awesome-feature`
3. Make changes in `templates/`, `src/`, or `bin/`
4. Test locally: `node bin/cli.js test-site --yes && open test-site/index.html`
5. Rebuild the demo: `npm run build:demo`
6. Open a pull request

### Ideas for contributions
- New color themes
- Additional page types (music page, art gallery, blog page)
- More cursor effects (pixel trail, fire cursor)
- Web component versions of the decorative elements
- A `--theme <name>` CLI flag to skip the theme prompt

---

## Local Development

```bash
# Clone
git clone https://github.com/sugardaddyapp/geocities-boilerplate.git
cd geocities-boilerplate

# Install
npm install

# Test the CLI
node bin/cli.js my-test-site

# Rebuild demo
npm run build:demo

# Open demo
open demo/index.html
```

---

## License

MIT © James Baldwin

---

## Acknowledgements

- Inspired by the preserved [GeoCities archive](https://geocities.restorativland.org/) and [GifCities](https://gifcities.org/)
- Color palette ideas from the original GeoCities neighborhood aesthetics
- Built with ❤️ and an unhealthy amount of nostalgia for 1996

---

*Best viewed in Netscape Navigator 4.0 at 800×600 resolution.*
