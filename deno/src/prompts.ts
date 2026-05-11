import { Answers } from "./generator.ts";

const DEFAULT: Answers = {
  siteName:     "My Geocities Site",
  authorName:   "Webmaster",
  theme:        "neon",
  pages:        ["about", "gallery", "guestbook", "links"],
  cursorEffect: "sparkle",
  fallingEffect:"stars",
  welcomeAlert: true,
  playMusic:    true,
  fakeHighCount:true,
};

export { DEFAULT as DEFAULT_ANSWERS };

async function readLine(prompt: string): Promise<string> {
  await Deno.stdout.write(new TextEncoder().encode(prompt));
  const buf = new Uint8Array(1024);
  const n   = await Deno.stdin.read(buf);
  return new TextDecoder().decode(buf.subarray(0, n ?? 0)).trim();
}

async function select(prompt: string, choices: { label: string; value: string }[], defaultIdx = 0): Promise<string> {
  console.log(`\n${prompt}`);
  choices.forEach((c, i) => console.log(`  ${i + 1}) ${c.label}`));
  const raw = await readLine(`Choice [${defaultIdx + 1}]: `);
  const idx = parseInt(raw || String(defaultIdx + 1), 10) - 1;
  return choices[Math.max(0, Math.min(idx, choices.length - 1))].value;
}

async function multiSelect(prompt: string, choices: { label: string; value: string }[]): Promise<string[]> {
  console.log(`\n${prompt}`);
  choices.forEach((c, i) => console.log(`  ${i + 1}) ${c.label}`));
  const raw = await readLine(`Numbers (comma-separated, Enter for all): `);
  if (!raw.trim()) return choices.map((c) => c.value);
  return raw.split(",").map((s) => {
    const i = parseInt(s.trim(), 10) - 1;
    return choices[i]?.value;
  }).filter(Boolean);
}

async function confirm(prompt: string, defaultVal: boolean): Promise<boolean> {
  const hint = defaultVal ? "Y/n" : "y/N";
  const raw  = await readLine(`${prompt} [${hint}]: `);
  if (!raw.trim()) return defaultVal;
  return raw.toLowerCase().startsWith("y");
}

async function text(prompt: string, defaultVal: string): Promise<string> {
  const raw = await readLine(`${prompt} [${defaultVal}]: `);
  return raw.trim() || defaultVal;
}

export async function askQuestions(): Promise<Answers> {
  const siteName   = await text("What is your site name?", "My Awesome Homepage");
  const authorName = await text("What is your name (or handle)?", "Webmaster");

  const theme = await select("Pick a color theme:", [
    { label: "Neon       (black bg, green + yellow + magenta)", value: "neon" },
    { label: "Space      (dark blue, stars, gold + cyan)",       value: "space" },
    { label: "Candy      (hot pink bg, cyan + yellow)",          value: "candy" },
    { label: "Forest     (dark green, gold accents)",            value: "forest" },
    { label: "Windows 95 (teal bg, grey panels)",               value: "windows" },
  ]);

  const pages = await multiSelect("Which extra pages do you want?", [
    { label: "About Me",   value: "about" },
    { label: "Gallery",    value: "gallery" },
    { label: "Guestbook",  value: "guestbook" },
    { label: "Cool Links", value: "links" },
  ]);

  const cursorEffect = await select("Pick a cursor effect:", [
    { label: "Sparkle  ✨ (glitter dots)", value: "sparkle" },
    { label: "Star Trail ★",               value: "startrail" },
    { label: "Comet    ☄️",                value: "comet" },
    { label: "Rainbow  🌈",               value: "rainbow" },
    { label: "None",                       value: "none" },
  ]);

  const fallingEffect = await select("Pick a falling background effect:", [
    { label: "Stars  ⭐", value: "stars" },
    { label: "Snow   ❄️", value: "snow" },
    { label: "None",      value: "none" },
  ]);

  const welcomeAlert  = await confirm("Show a welcome alert when the page loads?", true);
  const playMusic     = await confirm("Auto-play a retro 8-bit music jingle on load?", false);
  const fakeHighCount = await confirm("Start visitor counter at a high number?", true);

  return { siteName, authorName, theme, pages, cursorEffect, fallingEffect, welcomeAlert, playMusic, fakeHighCount };
}
