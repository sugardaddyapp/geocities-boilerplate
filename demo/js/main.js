/* ================================================
   create-geocities-app — main.js
   Generated site script — NO external dependencies
   ================================================ */

(function () {
  'use strict';

  /* ── Config (injected by generator) ── */
  var CONFIG = {
    siteName:     'GeoCities Boilerplate — Live Demo',
    authorName:   'Webmaster',
    cursorEffect: 'sparkle',
    fallingEffect:'stars',
    welcomeAlert: 'false' === 'true',
    playMusic:    'false' === 'true',
    fakeHighCount:'true' === 'true',
  };

  /* ── Visitor Counter ── */
  function initCounter() {
    var el = document.getElementById('counter-display');
    if (!el) return;

    var storageKey = 'gc_visits_' + location.hostname + location.pathname;
    var stored = parseInt(localStorage.getItem(storageKey), 10);
    var start  = CONFIG.fakeHighCount ? 10247 : 1;
    var count  = isNaN(stored) ? start : stored + 1;
    localStorage.setItem(storageKey, count);

    var digits = String(count).padStart(7, '0').split('');
    el.innerHTML = '';
    digits.forEach(function (d) {
      var box = document.createElement('span');
      box.className = 'digit-box';
      box.textContent = d;
      el.appendChild(box);
    });

    // Animate digits rolling in one by one
    var boxes = el.querySelectorAll('.digit-box');
    boxes.forEach(function (box, i) {
      setTimeout(function () {
        box.classList.add('rolling');
        setTimeout(function () { box.classList.remove('rolling'); }, 160);
      }, i * 80);
    });
  }

  /* ── Page Clock ── */
  function initClock() {
    var el = document.getElementById('page-clock');
    if (!el) return;
    function tick() {
      var now = new Date();
      var h = String(now.getHours()).padStart(2, '0');
      var m = String(now.getMinutes()).padStart(2, '0');
      var s = String(now.getSeconds()).padStart(2, '0');
      el.textContent = h + ':' + m + ':' + s;
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ── Welcome Alert ── */
  function initWelcomeAlert() {
    if (!CONFIG.welcomeAlert) return;
    setTimeout(function () {
      alert('✨ Welcome to ' + CONFIG.siteName + '! ✨\n\nMake yourself at home.\n\n– ' + CONFIG.authorName);
    }, 400);
  }

  /* ── 8-bit Music (Web Audio API) ── */
  var audioCtx = null;
  var musicPlaying = false;
  var musicInterval = null;

  var MELODY = [
    523, 587, 659, 698, 784, 698, 659, 587,
    523, 523, 587, 659, 523, 0,  523, 0
  ];

  function playNote(freq, startTime, duration) {
    if (!audioCtx || freq === 0) return;
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0.08, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.9);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  function playMelody() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var now = audioCtx.currentTime;
    var noteLen = 0.18;
    MELODY.forEach(function (freq, i) {
      playNote(freq, now + i * noteLen, noteLen);
    });
  }

  function initMusic() {
    var btn = document.getElementById('music-btn');

    function startMusic() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      musicPlaying = true;
      playMelody();
      musicInterval = setInterval(playMelody, MELODY.length * 180 + 400);
      if (btn) btn.textContent = '🔇 STOP MUSIC';
    }

    function stopMusic() {
      musicPlaying = false;
      clearInterval(musicInterval);
      if (btn) btn.textContent = '🎵 PLAY MUSIC';
    }

    if (btn) {
      btn.addEventListener('click', function () {
        if (musicPlaying) stopMusic(); else startMusic();
      });
    }

    if (CONFIG.playMusic) {
      // Browsers require user gesture — attach to first click anywhere
      function onFirstInteraction() {
        startMusic();
        document.removeEventListener('click', onFirstInteraction);
        document.removeEventListener('keydown', onFirstInteraction);
      }
      document.addEventListener('click', onFirstInteraction);
      document.addEventListener('keydown', onFirstInteraction);
    }
  }

  /* ── Falling Effects ── */
  function initFalling() {
    var effect = CONFIG.fallingEffect;
    if (effect === 'none') return;

    var count = effect === 'snow' ? 40 : 60;

    for (var i = 0; i < count; i++) {
      spawnFallingElement(effect, i * 200);
    }
  }

  function spawnFallingElement(type, delay) {
    var el = document.createElement('div');
    el.className = 'falling-element';

    var left = Math.random() * 100;
    var duration = 4 + Math.random() * 8;
    var size = type === 'snow' ? (6 + Math.random() * 10) : (4 + Math.random() * 6);
    var drift = (Math.random() - 0.5) * 60;

    el.style.left = left + 'vw';
    el.style.setProperty('--drift', drift + 'px');
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = delay + 'ms';

    if (type === 'snow') {
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.borderRadius = '50%';
      el.style.background = 'rgba(255,255,255,0.85)';
      el.style.boxShadow = '0 0 4px rgba(255,255,255,0.5)';
    } else {
      el.textContent = '★';
      el.style.fontSize = size + 'px';
      el.style.color = ['#FFFFFF', '#FFFF00', '#00FFFF', '#FF00FF'][Math.floor(Math.random() * 4)];
      el.style.textShadow = '0 0 4px currentColor';
    }

    document.body.appendChild(el);

    // Loop forever
    el.addEventListener('animationend', function () {
      el.style.top = '-20px';
      el.style.animationDelay = '0ms';
      el.style.left = (Math.random() * 100) + 'vw';
      el.style.setProperty('--drift', ((Math.random() - 0.5) * 60) + 'px');
      el.style.animation = 'none';
      void el.offsetHeight; // reflow
      el.style.animation = '';
    });
  }

  /* ── Cursor Effects ── */
  var hue = 0;
  var trailPool = [];

  function initCursor() {
    var effect = CONFIG.cursorEffect;
    if (effect === 'none') return;

    document.addEventListener('mousemove', function (e) {
      switch (effect) {
        case 'sparkle':   spawnSparkle(e.clientX, e.clientY); break;
        case 'startrail': spawnStarTrail(e.clientX, e.clientY); break;
        case 'comet':     spawnComet(e.clientX, e.clientY); break;
        case 'rainbow':   spawnRainbow(e.clientX, e.clientY); break;
      }
    });
  }

  function makeTrailEl(text, x, y, color, size) {
    var el = document.createElement('div');
    el.className = 'cursor-trail';
    el.textContent = text;
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    el.style.color = color;
    el.style.fontSize = (size || 14) + 'px';
    el.style.opacity = '1';
    document.body.appendChild(el);
    return el;
  }

  function spawnSparkle(x, y) {
    if (Math.random() > 0.4) return;
    var glyphs = ['✦', '✧', '✨', '⋆', '·', '★', '✺', '✼'];
    var glyph  = glyphs[Math.floor(Math.random() * glyphs.length)];
    var colors = ['#FFD700', '#FF69B4', '#00FFFF', '#ADFF2F', '#FF6347', '#FFF'];
    var color  = colors[Math.floor(Math.random() * colors.length)];
    var ox = (Math.random() - 0.5) * 24;
    var oy = (Math.random() - 0.5) * 24;
    var el = makeTrailEl(glyph, x + ox - 8, y + oy - 8, color, 12 + Math.random() * 10);
    el.style.transition = 'none';
    el.style.animation = 'sparkleFloat ' + (0.5 + Math.random() * 0.5) + 's ease-out forwards';
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1000);
  }

  function spawnStarTrail(x, y) {
    if (Math.random() > 0.5) return;
    var el = makeTrailEl('★', x - 8, y - 8, '#FFFF00', 14);
    el.style.textShadow = '0 0 6px #FFFF00';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    setTimeout(function () {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-12px) scale(0.5)';
    }, 50);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 600);
  }

  function spawnComet(x, y) {
    if (Math.random() > 0.6) return;
    var el = document.createElement('div');
    el.className = 'cursor-trail';
    el.style.left = (x - 6) + 'px';
    el.style.top  = (y - 2) + 'px';
    el.style.width  = '12px';
    el.style.height = '4px';
    el.style.borderRadius = '50%';
    el.style.background = 'linear-gradient(to left, #FFFFFF, #FF6600, transparent)';
    el.style.transition = 'opacity 0.4s';
    document.body.appendChild(el);
    setTimeout(function () { el.style.opacity = '0'; }, 50);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 500);
  }

  function spawnRainbow(x, y) {
    if (Math.random() > 0.5) return;
    hue = (hue + 15) % 360;
    var el = document.createElement('div');
    el.className = 'cursor-trail';
    el.style.left = (x - 4) + 'px';
    el.style.top  = (y - 4) + 'px';
    el.style.width  = '8px';
    el.style.height = '8px';
    el.style.borderRadius = '50%';
    el.style.background = 'hsl(' + hue + ',100%,60%)';
    el.style.boxShadow = '0 0 4px hsl(' + hue + ',100%,60%)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    document.body.appendChild(el);
    setTimeout(function () {
      el.style.opacity = '0';
      el.style.transform = 'scale(0.2)';
    }, 50);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 600);
  }

  /* ── Matrix Rain Easter Egg ── */
  function initMatrix() {
    var canvas = document.getElementById('matrix-canvas');
    var hint   = document.getElementById('matrix-hint');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var running = false;
    var raf;
    var cols, drops;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols  = Math.floor(canvas.width / 16);
      drops = Array(cols).fill(1);
    }

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00FF41';
      ctx.font = '14px "Courier New"';
      drops.forEach(function (y, i) {
        var char = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(char, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      raf = requestAnimationFrame(draw);
    }

    function toggle() {
      running = !running;
      canvas.classList.toggle('active', running);
      if (running) { resize(); draw(); }
      else { cancelAnimationFrame(raf); ctx.clearRect(0, 0, canvas.width, canvas.height); }
    }

    document.addEventListener('keydown', function (e) {
      if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.metaKey) toggle();
    });

    window.addEventListener('resize', function () { if (running) resize(); });
  }

  /* ── Gallery Lightbox ── */
  function initLightbox() {
    var lb      = document.getElementById('lightbox');
    var lbImg   = document.getElementById('lightbox-img');
    var lbCap   = document.getElementById('lightbox-caption');
    var lbClose = document.getElementById('lightbox-close');
    if (!lb) return;

    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        var cap = item.querySelector('.gallery-caption');
        if (img) lbImg.src = img.src;
        if (cap) lbCap.textContent = cap.textContent;
        lb.classList.add('active');
      });
    });

    function closeLb() { lb.classList.remove('active'); }
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    if (lbClose) lbClose.addEventListener('click', closeLb);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }

  /* ── Guestbook form ── */
  function initGuestbook() {
    var form = document.getElementById('guestbook-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thanks for signing the guestbook! 📖\n\n(This is a static site — no backend yet.\nAdd a form service like Formspree to save entries!)');
      form.reset();
    });
  }

  /* ── Init all ── */
  document.addEventListener('DOMContentLoaded', function () {
    initCounter();
    initClock();
    initWelcomeAlert();
    initMusic();
    initFalling();
    initCursor();
    initMatrix();
    initLightbox();
    initGuestbook();
  });

})();
