#!/usr/bin/env node
'use strict';

const path = require('path');
const kleur = require('kleur');
const { askQuestions } = require('../src/prompts');
const { generate } = require('../src/generator');

const ASCII_BANNER = `
${kleur.yellow('  ██████╗ ███████╗ ██████╗  ██████╗██╗████████╗██╗███████╗███████╗')}
${kleur.yellow(' ██╔════╝ ██╔════╝██╔═══██╗██╔════╝██║╚══██╔══╝██║██╔════╝██╔════╝')}
${kleur.green(' ██║  ███╗█████╗  ██║   ██║██║     ██║   ██║   ██║█████╗  ███████╗')}
${kleur.green(' ██║   ██║██╔══╝  ██║   ██║██║     ██║   ██║   ██║██╔══╝  ╚════██║')}
${kleur.cyan(' ╚██████╔╝███████╗╚██████╔╝╚██████╗██║   ██║   ██║███████╗███████║')}
${kleur.cyan('  ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝')}
${kleur.magenta('         create-geocities-app  ✨  Welcome to 1996  ✨')}
`;

async function main() {
  console.log(ASCII_BANNER);

  const args = process.argv.slice(2);
  const skipPrompts = args.includes('--yes') || args.includes('-y');

  // Determine output directory name
  const dirArg = args.find(a => !a.startsWith('-'));
  const outputName = dirArg || 'my-geocities-site';
  const outputDir = path.resolve(process.cwd(), outputName);

  console.log(kleur.cyan(`\nCreating your site in: ${kleur.white().bold(outputDir)}\n`));

  const answers = await askQuestions(skipPrompts);

  console.log(kleur.yellow('\n⚙️  Generating files...\n'));

  const { pagesGenerated } = await generate(outputDir, answers);

  console.log(kleur.green('✅ Done! Your Geocities site is ready.\n'));
  console.log(kleur.white('📁 Files created:'));
  pagesGenerated.forEach(f => console.log(kleur.cyan(`   └─ ${outputName}/${f}`)));
  console.log(kleur.cyan(`   └─ ${outputName}/css/style.css`));
  console.log(kleur.cyan(`   └─ ${outputName}/js/main.js`));

  console.log(kleur.yellow(`
╔══════════════════════════════════════════════╗
║  🌐  Open ${outputName}/index.html in        ║
║       your browser to see your site!         ║
║                                              ║
║  Best viewed in Netscape Navigator 4.0       ║
║  at 800×600 resolution. 😉                   ║
╚══════════════════════════════════════════════╝
`));
}

main().catch(err => {
  console.error(kleur.red('\n❌ Error: ' + err.message));
  process.exit(1);
});
