'use strict';

const prompts = require('prompts');

async function askQuestions(skipPrompts) {
  if (skipPrompts) {
    return {
      siteName: 'My Geocities Site',
      authorName: 'Webmaster',
      theme: 'neon',
      pages: ['about', 'gallery', 'guestbook', 'links'],
      cursorEffect: 'sparkle',
      fallingEffect: 'stars',
      welcomeAlert: true,
      playMusic: true,
      fakeHighCount: true,
    };
  }

  const answers = await prompts(
    [
      {
        type: 'text',
        name: 'siteName',
        message: 'What is your site name?',
        initial: "My Awesome Homepage",
        validate: v => v.trim().length > 0 || 'Site name cannot be empty',
      },
      {
        type: 'text',
        name: 'authorName',
        message: 'What is your name (or handle)?',
        initial: 'Webmaster',
        validate: v => v.trim().length > 0 || 'Name cannot be empty',
      },
      {
        type: 'select',
        name: 'theme',
        message: 'Pick a color theme:',
        choices: [
          { title: 'Neon       (black bg, green + yellow + magenta)', value: 'neon' },
          { title: 'Space      (dark blue, stars, gold + cyan)', value: 'space' },
          { title: 'Candy      (hot pink bg, cyan + yellow)', value: 'candy' },
          { title: 'Forest     (dark green, gold accents)', value: 'forest' },
          { title: 'Windows 95 (teal bg, grey panels)', value: 'windows' },
        ],
        initial: 0,
      },
      {
        type: 'multiselect',
        name: 'pages',
        message: 'Which extra pages do you want? (space to select)',
        choices: [
          { title: 'About Me', value: 'about', selected: true },
          { title: 'Gallery', value: 'gallery', selected: true },
          { title: 'Guestbook', value: 'guestbook', selected: true },
          { title: 'Cool Links', value: 'links', selected: true },
        ],
        hint: '- Space to select. Return to submit',
      },
      {
        type: 'select',
        name: 'cursorEffect',
        message: 'Pick a cursor effect:',
        choices: [
          { title: 'Sparkle  ✨ (glitter dots spawn at cursor)', value: 'sparkle' },
          { title: 'Star Trail ★ (stars follow and fade)', value: 'startrail' },
          { title: 'Comet    ☄️  (colored streak trail)', value: 'comet' },
          { title: 'Rainbow  🌈 (hue-cycling dot trail)', value: 'rainbow' },
          { title: 'None        (no cursor effect)', value: 'none' },
        ],
        initial: 0,
      },
      {
        type: 'select',
        name: 'fallingEffect',
        message: 'Pick a falling background effect:',
        choices: [
          { title: 'Stars  ⭐ (white dots fall from top)', value: 'stars' },
          { title: 'Snow   ❄️  (snowflakes drift down)', value: 'snow' },
          { title: 'None     (no falling effect)', value: 'none' },
        ],
        initial: 0,
      },
      {
        type: 'confirm',
        name: 'welcomeAlert',
        message: 'Show a welcome alert when the page loads?',
        initial: true,
      },
      {
        type: 'confirm',
        name: 'playMusic',
        message: 'Auto-play a retro 8-bit music jingle on load?',
        initial: false,
      },
      {
        type: 'confirm',
        name: 'fakeHighCount',
        message: 'Start visitor counter at a high number (looks popular!)?',
        initial: true,
      },
    ],
    {
      onCancel: () => {
        console.error('\nAborted.');
        process.exit(1);
      },
    }
  );

  return answers;
}

module.exports = { askQuestions };
