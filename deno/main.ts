#!/usr/bin/env -S deno run --allow-read --allow-write
import { join } from "jsr:@std/path";
import { generate } from "./src/generator.ts";
import { askQuestions, DEFAULT_ANSWERS } from "./src/prompts.ts";

const BANNER = `
\x1b[33m  ██████╗ ███████╗ ██████╗  ██████╗██╗████████╗██╗███████╗███████╗\x1b[0m
\x1b[33m ██╔════╝ ██╔════╝██╔═══██╗██╔════╝██║╚══██╔══╝██║██╔════╝██╔════╝\x1b[0m
\x1b[32m ██║  ███╗█████╗  ██║   ██║██║     ██║   ██║   ██║█████╗  ███████╗\x1b[0m
\x1b[32m ██║   ██║██╔══╝  ██║   ██║██║     ██║   ██║   ██║██╔══╝  ╚════██║\x1b[0m
\x1b[36m ╚██████╔╝███████╗╚██████╔╝╚██████╗██║   ██║   ██║███████╗███████║\x1b[0m
\x1b[36m  ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝\x1b[0m
\x1b[35m         create-geocities-app  ✨  Welcome to 1996  ✨\x1b[0m
`;

const args = Deno.args;
const skipPrompts = args.includes("--yes") || args.includes("-y");
const outputName  = args.find((a) => !a.startsWith("-")) ?? "my-geocities-site";
const outputDir   = join(Deno.cwd(), outputName);

console.log(BANNER);
console.log(`\x1b[36mCreating your site in: \x1b[1m${outputDir}\x1b[0m\n`);

const answers = skipPrompts ? DEFAULT_ANSWERS : await askQuestions();

console.log("\x1b[33m\n⚙️  Generating files...\n\x1b[0m");

const generated = await generate(outputDir, answers);

console.log("\x1b[32m✅ Done! Your Geocities site is ready.\n\x1b[0m");
console.log("\x1b[37m📁 Files created:\x1b[0m");
for (const f of generated) {
  console.log(`\x1b[36m   └─ ${outputName}/${f}\x1b[0m`);
}
console.log(`\x1b[36m   └─ ${outputName}/css/style.css\x1b[0m`);
console.log(`\x1b[36m   └─ ${outputName}/js/main.js\x1b[0m`);

console.log(`\x1b[33m
╔══════════════════════════════════════════════╗
║  🌐  Open ${outputName}/index.html in        ║
║       your browser to see your site!         ║
║                                              ║
║  Best viewed in Netscape Navigator 4.0       ║
║  at 800×600 resolution. 😉                   ║
╚══════════════════════════════════════════════╝
\x1b[0m`);
