#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs-extra');
const { generate } = require('../src/generator');
const { themes } = require('../src/themes');

const DEMO_DIR = path.join(__dirname, '..', 'demo');

const baseAnswers = {
  siteName: "GeoCities Boilerplate — Live Demo",
  authorName: "Webmaster",
  pages: ["about", "gallery", "guestbook", "links"],
  cursorEffect: "sparkle",
  fallingEffect: "stars",
  welcomeAlert: false,
  playMusic: false,
  fakeHighCount: true,
};

const THEME_CURSORS = {
  neon:    'sparkle',
  space:   'startrail',
  candy:   'rainbow',
  forest:  'comet',
  windows: 'sparkle',
};

const THEME_FALLING = {
  neon:    'stars',
  space:   'stars',
  candy:   'snow',
  forest:  'snow',
  windows: 'none',
};

async function buildAll() {
  await fs.ensureDir(DEMO_DIR);

  // Build one sub-site per theme
  for (const [key, theme] of Object.entries(themes)) {
    const answers = {
      ...baseAnswers,
      theme: key,
      siteName: `GeoCities Boilerplate — ${theme.name} Theme`,
      cursorEffect: THEME_CURSORS[key],
      fallingEffect: THEME_FALLING[key],
    };
    const outDir = path.join(DEMO_DIR, key);
    await generate(outDir, answers);
    console.log(`  Built theme: ${key} → demo/${key}/`);
  }

  // Build landing page
  await buildLandingPage();
  console.log('  Built landing page → demo/index.html');
}

async function buildLandingPage() {
  const themeList = Object.entries(themes).map(([key, t]) => `
    <a href="${key}/index.html" class="theme-card" style="
      background:${t.bg};
      border:4px outset ${t.borderLight};
      color:${t.textColor};
      text-decoration:none;
      display:block;
      padding:16px;
      text-align:center;
    ">
      <div style="font-size:1.6rem;font-weight:bold;color:${t.headingColor};
        text-shadow:0 0 10px ${t.glowColor};
        font-family:'Comic Sans MS',cursive;
        text-transform:uppercase;
        letter-spacing:2px;
        margin-bottom:8px;">
        ${t.name}
      </div>
      <div style="display:flex;justify-content:center;gap:6px;margin:8px 0;">
        ${[t.bg, t.textColor, t.headingColor, t.linkColor, t.accentColor]
          .map(c => `<span style="width:22px;height:22px;border-radius:50%;background:${c};border:2px solid ${t.borderLight};display:inline-block;"></span>`)
          .join('')}
      </div>
      <div style="font-size:0.8rem;color:${t.accentColor};margin-top:6px;font-family:'Courier New',monospace;">
        Click to preview →
      </div>
    </a>`).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GeoCities Boilerplate — Theme Showcase</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #000;
      color: #00FF00;
      font-family: 'Comic Sans MS', 'Courier New', monospace;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 16px;
    }
    h1 {
      font-size: clamp(1.4rem, 4vw, 2.2rem);
      color: #FFFF00;
      text-transform: uppercase;
      letter-spacing: 3px;
      text-shadow: 0 0 16px #00FF00, 2px 2px 0 #003300;
      animation: pulse 2s ease-in-out infinite;
      text-align: center;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #00FFFF;
      font-size: 0.9rem;
      margin-bottom: 4px;
      text-align: center;
    }
    .command {
      background: #001100;
      border: 2px inset #00FF00;
      color: #00FF00;
      font-family: 'Courier New', monospace;
      font-size: 1rem;
      padding: 8px 20px;
      margin: 16px 0 28px;
      letter-spacing: 1px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      width: 100%;
      max-width: 900px;
    }
    .theme-card {
      transition: transform 0.1s, box-shadow 0.1s;
    }
    .theme-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 24px rgba(0,255,0,0.3);
    }
    footer {
      margin-top: 36px;
      font-size: 0.7rem;
      color: #006600;
      text-align: center;
    }
    footer a { color: #00FF00; }
    @keyframes pulse {
      0%,100% { text-shadow: 0 0 16px #00FF00, 2px 2px 0 #003300; }
      50%      { text-shadow: 0 0 4px #00FF00,  2px 2px 0 #003300; }
    }
    @keyframes blink {
      0%,100% { opacity:1; } 50% { opacity:0; }
    }
    .blink { animation: blink 1s step-start infinite; }
  </style>
</head>
<body>
  <h1>🌐 GeoCities Boilerplate</h1>
  <p class="subtitle">Scaffold a 1990s Geocities-style website in seconds</p>
  <code class="command">npx create-geocities-app my-site</code>

  <p style="margin-bottom:20px;font-size:0.85rem;color:#00FFFF;text-align:center;">
    <span class="blink">★</span>
    Pick a theme below to see a live preview
    <span class="blink">★</span>
  </p>

  <div class="grid">
    ${themeList}
  </div>

  <footer>
    <p>Each theme demo has all effects enabled: cursor sparkles, falling stars, visitor counter, gallery lightbox, and more.</p>
    <p style="margin-top:6px;">Press <strong style="color:#FFFF00;">[M]</strong> on any theme page for a secret Matrix rain effect.</p>
    <p style="margin-top:12px;">
      <a href="https://github.com/sugardaddyapp/geocities-boilerplate">GitHub</a>
      &nbsp;·&nbsp;
      <a href="https://www.npmjs.com/package/create-geocities-app">npm</a>
    </p>
  </footer>
</body>
</html>`;

  await fs.writeFile(path.join(DEMO_DIR, 'index.html'), html);
}

buildAll().catch(err => {
  console.error('Demo build failed:', err);
  process.exit(1);
});
