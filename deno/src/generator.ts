import { join, dirname, fromFileUrl } from "jsr:@std/path";
import { ensureDir } from "jsr:@std/fs";
import { getTheme } from "./themes.ts";

interface Answers {
  siteName: string;
  authorName: string;
  theme: string;
  pages: string[];
  cursorEffect: string;
  fallingEffect: string;
  welcomeAlert: boolean;
  playMusic: boolean;
  fakeHighCount: boolean;
}

const ALL_PAGES = [
  { key: "index",     label: "🏠 Home",      file: "index.html" },
  { key: "about",     label: "👤 About Me",   file: "about.html" },
  { key: "gallery",   label: "🖼️ Gallery",    file: "gallery.html" },
  { key: "guestbook", label: "📖 Guestbook",  file: "guestbook.html" },
  { key: "links",     label: "🔗 Cool Links", file: "links.html" },
];

function interpolate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`);
}

function buildNavLinks(pages: string[], currentPage: string): string {
  const active = new Set(["index", ...pages]);
  return ALL_PAGES
    .filter((p) => active.has(p.key))
    .map((p) => {
      const cls = p.key === currentPage ? "nav-link nav-active" : "nav-link";
      return `<a href="${p.file}" class="${cls}">${p.label}</a>`;
    })
    .join("\n        ");
}

function templateDir(): string {
  try {
    return join(dirname(fromFileUrl(import.meta.url)), "..", "templates");
  } catch {
    return join(Deno.cwd(), "templates");
  }
}

export async function generate(outputDir: string, answers: Answers): Promise<string[]> {
  const theme = getTheme(answers.theme);
  const { pages } = answers;

  await ensureDir(join(outputDir, "css"));
  await ensureDir(join(outputDir, "js"));

  const baseVars: Record<string, string> = {
    SITE_NAME:       answers.siteName,
    AUTHOR_NAME:     answers.authorName,
    THEME_NAME:      theme.name,
    BG:              theme.bg,
    BG_PATTERN:      theme.bgPattern,
    BG_SIZE:         theme.bgSize,
    TEXT_COLOR:      theme.textColor,
    HEADING_COLOR:   theme.headingColor,
    LINK_COLOR:      theme.linkColor,
    LINK_HOVER:      theme.linkHover,
    ACCENT_COLOR:    theme.accentColor,
    BORDER_LIGHT:    theme.borderLight,
    BORDER_DARK:     theme.borderDark,
    PANEL_BG:        theme.panelBg,
    PANEL_BORDER:    theme.panelBorder,
    COUNTER_BG:      theme.counterBg,
    COUNTER_TEXT:    theme.counterText,
    TABLE_BORDER:    theme.tableBorderColor,
    TABLE_HEADER_BG: theme.tableHeaderBg,
    GLOW_COLOR:      theme.glowColor,
    NAV_ACTIVE_BG:   theme.navActiveBg,
    NAV_ACTIVE_TEXT: theme.navActiveText,
    CURSOR_EFFECT:   answers.cursorEffect,
    FALLING_EFFECT:  answers.fallingEffect,
    WELCOME_ALERT:   answers.welcomeAlert  ? "true" : "false",
    PLAY_MUSIC:      answers.playMusic     ? "true" : "false",
    FAKE_HIGH_COUNT: answers.fakeHighCount ? "true" : "false",
    YEAR:            String(new Date().getFullYear()),
  };

  const tdir = templateDir();

  const css = await Deno.readTextFile(join(tdir, "css", "style.css"));
  await Deno.writeTextFile(join(outputDir, "css", "style.css"), interpolate(css, baseVars));

  const js = await Deno.readTextFile(join(tdir, "js", "main.js"));
  await Deno.writeTextFile(join(outputDir, "js", "main.js"), interpolate(js, baseVars));

  const pagesToGenerate = [
    { key: "index", file: "index.html" },
    ...pages.map((p) => ({ key: p, file: `${p}.html` })),
  ];

  const generated: string[] = [];
  for (const page of pagesToGenerate) {
    const tmplPath = join(tdir, page.file);
    try {
      const tmpl = await Deno.readTextFile(tmplPath);
      const nav  = buildNavLinks(pages, page.key);
      const html = interpolate(tmpl, { ...baseVars, NAV_LINKS: nav });
      await Deno.writeTextFile(join(outputDir, page.file), html);
      generated.push(page.file);
    } catch {
      // template file not found, skip
    }
  }

  return generated;
}

export type { Answers };
