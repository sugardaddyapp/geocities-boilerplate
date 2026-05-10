#!/usr/bin/env node
'use strict';

const path = require('path');
const { generate } = require('../src/generator');

const answers = {
  siteName: "GeoCities Boilerplate — Live Demo",
  authorName: "Webmaster",
  theme: "neon",
  pages: ["about", "gallery", "guestbook", "links"],
  cursorEffect: "sparkle",
  fallingEffect: "stars",
  welcomeAlert: false,
  playMusic: false,
  fakeHighCount: true,
};

const outputDir = path.join(__dirname, '..', 'demo');

generate(outputDir, answers).then(({ pagesGenerated }) => {
  console.log('Demo built successfully:');
  pagesGenerated.forEach(f => console.log('  demo/' + f));
}).catch(err => {
  console.error('Demo build failed:', err);
  process.exit(1);
});
