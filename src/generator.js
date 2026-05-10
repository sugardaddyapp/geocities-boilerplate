'use strict';

const path = require('path');
const fs = require('fs-extra');
const { getTheme } = require('./themes');

const TEMPLATE_DIR = path.join(__dirname, '..', 'templates');

function interpolate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    key in vars ? vars[key] : `{{${key}}}`
  );
}

function buildNavLinks(pages, currentPage, vars) {
  const allPages = [
    { key: 'index', label: '🏠 Home', file: 'index.html' },
    { key: 'about', label: '👤 About Me', file: 'about.html' },
    { key: 'gallery', label: '🖼️ Gallery', file: 'gallery.html' },
    { key: 'guestbook', label: '📖 Guestbook', file: 'guestbook.html' },
    { key: 'links', label: '🔗 Cool Links', file: 'links.html' },
  ];

  const activePages = ['index', ...pages];
  return allPages
    .filter(p => activePages.includes(p.key))
    .map(p => {
      const isActive = p.key === currentPage;
      return `<a href="${p.file}" class="nav-link${isActive ? ' nav-active' : ''}">${p.label}</a>`;
    })
    .join('\n        ');
}

function buildEffectFlags(answers) {
  return {
    CURSOR_EFFECT: answers.cursorEffect || 'none',
    FALLING_EFFECT: answers.fallingEffect || 'none',
    WELCOME_ALERT: answers.welcomeAlert ? 'true' : 'false',
    PLAY_MUSIC: answers.playMusic ? 'true' : 'false',
    FAKE_HIGH_COUNT: answers.fakeHighCount ? 'true' : 'false',
  };
}

async function generate(outputDir, answers) {
  const theme = getTheme(answers.theme);
  const { pages = [] } = answers;

  await fs.ensureDir(outputDir);
  await fs.ensureDir(path.join(outputDir, 'css'));
  await fs.ensureDir(path.join(outputDir, 'js'));

  // Build shared template vars
  const baseVars = {
    SITE_NAME: answers.siteName,
    AUTHOR_NAME: answers.authorName,
    THEME_NAME: theme.name,
    BG: theme.bg,
    BG_PATTERN: theme.bgPattern,
    BG_SIZE: theme.bgSize,
    TEXT_COLOR: theme.textColor,
    HEADING_COLOR: theme.headingColor,
    LINK_COLOR: theme.linkColor,
    LINK_HOVER: theme.linkHover,
    ACCENT_COLOR: theme.accentColor,
    BORDER_LIGHT: theme.borderLight,
    BORDER_DARK: theme.borderDark,
    PANEL_BG: theme.panelBg,
    PANEL_BORDER: theme.panelBorder,
    COUNTER_BG: theme.counterBg,
    COUNTER_TEXT: theme.counterText,
    TABLE_BORDER: theme.tableBorderColor,
    TABLE_HEADER_BG: theme.tableHeaderBg,
    GLOW_COLOR: theme.glowColor,
    ...buildEffectFlags(answers),
    YEAR: new Date().getFullYear(),
  };

  // Copy and interpolate CSS
  const cssTemplate = await fs.readFile(path.join(TEMPLATE_DIR, 'css', 'style.css'), 'utf8');
  await fs.writeFile(path.join(outputDir, 'css', 'style.css'), interpolate(cssTemplate, baseVars));

  // Copy and interpolate JS
  const jsTemplate = await fs.readFile(path.join(TEMPLATE_DIR, 'js', 'main.js'), 'utf8');
  await fs.writeFile(path.join(outputDir, 'js', 'main.js'), interpolate(jsTemplate, baseVars));

  // Generate each selected page
  const pagesToGenerate = [
    { key: 'index', file: 'index.html' },
    ...pages.map(p => ({ key: p, file: `${p}.html` })),
  ];

  for (const page of pagesToGenerate) {
    const templatePath = path.join(TEMPLATE_DIR, page.file);
    if (!await fs.pathExists(templatePath)) continue;

    const htmlTemplate = await fs.readFile(templatePath, 'utf8');
    const navLinks = buildNavLinks(pages, page.key, baseVars);
    const rendered = interpolate(htmlTemplate, { ...baseVars, NAV_LINKS: navLinks });
    await fs.writeFile(path.join(outputDir, page.file), rendered);
  }

  return { pagesGenerated: pagesToGenerate.map(p => p.file) };
}

module.exports = { generate };
