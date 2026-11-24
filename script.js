/* ============================================
   CONFIG — Edit texts & names here
   ============================================ */
const CONFIG = {
  names: {
    me: '[Nama Aku]',
    you: '[Nama Kamu]',
  },

  opening: [
    'Hai Sayang.',
    'Aku bikin sesuatu buat kamu.',
    'Cuma butuh beberapa menit.',
    'Semoga kamu suka.',
  ],

  // Subtitle during video (before last 15 seconds)
  // `at` = position 0–1 within the main section
  subtitles: [
    { text: 'Hai cantik.', at: 0.00 },
    { text: 'Aku senang bisa kenal sama kamu.', at: 0.08 },
    { text: 'Terima kasih.', at: 0.16 },
    { text: 'Udah nemenin aku.', at: 0.22 },
    { text: 'Udah sabar sama sifat aku.', at: 0.28 },
    { text: 'Udah bikin hari-hari aku jauh lebih seru.', at: 0.36 },
    { text: 'Setiap momen sama kamu...', at: 0.44 },
    { text: 'Selalu punya cerita sendiri.', at: 0.50 },
    { text: 'Aku harap...', at: 0.58 },
    { text: 'Website sederhana ini bisa bikin kamu senyum.', at: 0.64 },
    { text: 'Karena senyum kamu...', at: 0.72 },
    { text: 'Itu salah satu hal favorit aku.', at: 0.78 },
    { text: 'Dan semoga...', at: 0.86 },
    { text: 'Kita selalu sama sama sabar biar selalu bersama.', at: 0.92 },
  ],

  // Closing subtitles — last 15 seconds of video
  closingSubtitles: [
    { text: 'Video ini memang akan selesai.', at: 0.00 },
    { text: 'Tapi semoga...', at: 0.10 },
    { text: 'Cerita kita jangan.', at: 0.20 },
    { text: 'Aku nggak tahu.', at: 0.30 },
    { text: 'Apa yang bakal terjadi nanti.', at: 0.38 },
    { text: 'Tapi...', at: 0.48 },
    { text: 'Selama masih ada kamu.', at: 0.55 },
    { text: 'Aku bakal terus berusaha.', at: 0.65 },
    { text: 'Terima kasih.', at: 0.78 },
    { text: 'Karena masih memilih aku.', at: 0.88 },
  ],

  closingSeconds: 15,

  postVideo: [
    'Masih ada sedikit lagi.',
    'Aku cuma mau bilang...',
    'Aku bersyukur.',
    'Bisa punya kamu.',
    'I love you.',
  ],

  photos: [
    { src: 'assets/image/foto1.jpeg', caption: 'Favorit aku.' },
    { src: 'assets/image/foto2.jpeg', caption: 'Gemes banget yang ini.' },
    { src: 'assets/image/foto3.jpeg', caption: 'Ini apalagi MAUUU AAKUU MAMM RASANYA.' },
    { src: 'assets/image/foto4.jpeg', caption: 'i always love you.' },
  ],

  photoDuration: 4000,

  ending: [
    'Terima kasih.',
    'Udah hadir di hidup aku.',
    'Udah jadi alasan.',
    'Aku senyum lebih sering.',
    'Semoga...',
    'Kita tetap sama.',
    'Hari ini.',
    'Besok.',
    'Dan seterusnya.',
  ],

  hug: [
    'Anggap aja ini peluk dari aku.',
    'Love you ❤️',
  ],

  timings: {
    typeSpeed: 55,
    pauseAfterType: 1800,
    fadeDuration: 900,
    countdownInterval: 900,
    textHold: 2200,
  },
};

/* ============================================
   DOM References
   ============================================ */
const $ = (sel) => document.querySelector(sel);

const scenes = {
  loader: $('#loader'),
  opening: $('#opening'),
  countdown: $('#countdown'),
  video: $('#video-scene'),
  postVideo: $('#post-video'),
  gallery: $('#gallery'),
  ending: $('#ending'),
};

const els = {
  typewriter: $('#typewriter'),
  btnStart: $('#btn-start'),
  countdownNum: $('#countdown-num'),
  video: $('#main-video'),
  subtitle: $('#subtitle'),
  subtitleText: $('#subtitle-text'),
  postVideoText: $('#post-video-text'),
  galleryImg: $('#gallery-img'),
  galleryCaption: $('#gallery-caption'),
  endingText: $('#ending-text'),
  endingNames: $('#ending-names'),
  endingButtons: $('#ending-buttons'),
  nameMe: $('.name-me'),
  nameYou: $('.name-you'),
  btnReplay: $('#btn-replay'),
  btnHug: $('#btn-hug'),
  hugOverlay: $('#hug-overlay'),
  hugText: $('#hug-text'),
  cursorDot: $('#cursor-dot'),
  cursorRing: $('#cursor-ring'),
  starsCanvas: $('#stars-canvas'),
  heartsCanvas: $('#hearts-canvas'),
};

/* ============================================
   Utilities
   ============================================ */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function switchScene(from, to) {
  if (from) {
    from.classList.remove('active');
    from.classList.add('blur-out');
    setTimeout(() => from.classList.remove('blur-out'), 1400);
  }
  if (to) {
    to.classList.add('active');
  }
}

function typeText(el, text, speed) {
  return new Promise((resolve) => {
    el.textContent = '';
    el.classList.add('visible');
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(tick, speed);
      } else {
        resolve();
      }
    };
    tick();
  });
}

async function showFadeText(el, text, hold = CONFIG.timings.textHold) {
  el.textContent = text;
  el.classList.remove('hide');
  el.classList.add('show');
  await wait(hold);
  el.classList.remove('show');
  el.classList.add('hide');
  await wait(CONFIG.timings.fadeDuration);
}

function createRipple(e, btn) {
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

function buildTimeline(items, sectionDuration) {
  return items.map((item, i, arr) => {
    const next = arr[i + 1];
    const start = item.at * sectionDuration;
    const end = next ? next.at * sectionDuration - 0.4 : sectionDuration;
    return { text: item.text, start, end: Math.max(start + 1.5, end) };
  });
}

let mainTimeline = [];
let closingTimeline = [];
let currentSubtitleIndex = -1;
let starsAnimId = null;
let heartsAnimId = null;

/* ============================================
   Custom Cursor
   ============================================ */
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  els.cursorDot.style.left = `${mouseX}px`;
  els.cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  els.cursorRing.style.left = `${ringX}px`;
  els.cursorRing.style.top = `${ringY}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('button').forEach((btn) => {
  btn.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  btn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ============================================
   Loading
   ============================================ */
async function preloadAssets() {
  const promises = [];

  promises.push(new Promise((resolve) => {
    if (els.video.readyState >= 3) return resolve();
    els.video.addEventListener('canplaythrough', resolve, { once: true });
    els.video.addEventListener('error', resolve, { once: true });
    els.video.load();
  }));

  CONFIG.photos.forEach((p) => {
    promises.push(new Promise((resolve) => {
      const img = new Image();
      img.onload = img.onerror = resolve;
      img.src = p.src;
    }));
  });

  await Promise.all(promises);
  await wait(800);
}

/* ============================================
   Opening Sequence
   ============================================ */
async function runOpening() {
  switchScene(scenes.loader, scenes.opening);
  await wait(1200);

  const { typeSpeed, pauseAfterType, fadeDuration } = CONFIG.timings;

  for (const line of CONFIG.opening) {
    await typeText(els.typewriter, line, typeSpeed);
    await wait(pauseAfterType);
    els.typewriter.classList.add('fade-out');
    await wait(fadeDuration);
    els.typewriter.classList.remove('visible', 'fade-out');
    await wait(400);
  }

  els.btnStart.classList.remove('hidden');
  els.btnStart.classList.add('visible');
}

/* ============================================
   Countdown
   ============================================ */
async function runCountdown() {
  switchScene(scenes.opening, scenes.countdown);

  for (const num of ['3', '2', '1']) {
    els.countdownNum.textContent = num;
    els.countdownNum.classList.remove('hide');
    els.countdownNum.classList.add('show');
    await wait(CONFIG.timings.countdownInterval);
    els.countdownNum.classList.remove('show');
    els.countdownNum.classList.add('hide');
    await wait(300);
  }

  await runVideo();
}

/* ============================================
   Video Scene
   ============================================ */
async function runVideo() {
  switchScene(scenes.countdown, scenes.video);

  const video = els.video;
  video.currentTime = 0;
  currentSubtitleIndex = -1;

  await new Promise((resolve) => {
    if (video.readyState >= 1) resolve();
    else video.addEventListener('loadedmetadata', resolve, { once: true });
  });

  const duration = video.duration || 60;
  const mainDuration = Math.max(duration - CONFIG.closingSeconds, duration * 0.5);
  const closingStart = duration - CONFIG.closingSeconds;

  mainTimeline = buildTimeline(CONFIG.subtitles, mainDuration);
  closingTimeline = buildTimeline(CONFIG.closingSubtitles, CONFIG.closingSeconds);

  video.classList.add('playing');

  try {
    await video.play();
  } catch {
    await video.play();
  }

  video.addEventListener('timeupdate', onVideoTimeUpdate);
  video.addEventListener('ended', onVideoEnded, { once: true });
}

function onVideoTimeUpdate() {
  const t = els.video.currentTime;
  const duration = els.video.duration;
  const closingStart = duration - CONFIG.closingSeconds;

  let active = null;
  let index = -1;
  const timeline = t >= closingStart ? closingTimeline : mainTimeline;
  const offset = t >= closingStart ? closingStart : 0;
  const localTime = t - offset;

  for (let i = 0; i < timeline.length; i++) {
    if (localTime >= timeline[i].start && localTime < timeline[i].end) {
      active = timeline[i];
      index = i;
      break;
    }
  }

  if (index !== currentSubtitleIndex) {
    currentSubtitleIndex = index;
    if (active) {
      showSubtitle(active.text);
    } else {
      hideSubtitle();
    }
  }
}

function showSubtitle(text) {
  els.subtitleText.textContent = text;
  els.subtitle.classList.remove('hidden');
  els.subtitle.classList.remove('show');
  void els.subtitle.offsetWidth;
  els.subtitle.classList.add('show');
}

function hideSubtitle() {
  els.subtitle.classList.remove('show');
}

async function onVideoEnded() {
  els.video.removeEventListener('timeupdate', onVideoTimeUpdate);
  hideSubtitle();
  els.subtitle.classList.add('hidden');
  els.video.classList.add('fade-out');
  await wait(2000);
  await runPostVideo();
}

/* ============================================
   Post Video
   ============================================ */
async function runPostVideo() {
  switchScene(scenes.video, scenes.postVideo);
  els.postVideoText.classList.remove('show', 'hide');

  for (const line of CONFIG.postVideo) {
    await showFadeText(els.postVideoText, line);
  }

  await runGallery();
}

/* ============================================
   Gallery
   ============================================ */
async function runGallery() {
  switchScene(scenes.postVideo, scenes.gallery);

  for (const photo of CONFIG.photos) {
    const zoomLayer = els.galleryImg.parentElement;
    els.galleryImg.classList.remove('show', 'hide');
    els.galleryCaption.classList.remove('show');
    zoomLayer.style.animation = 'none';
    void zoomLayer.offsetWidth;
    zoomLayer.style.animation = '';
    els.galleryImg.src = photo.src;

    await wait(200);
    els.galleryImg.classList.add('show');
    await wait(600);

    els.galleryCaption.textContent = photo.caption;
    els.galleryCaption.classList.add('show');

    await wait(CONFIG.photoDuration);

    els.galleryCaption.classList.remove('show');
    els.galleryImg.classList.add('hide');
    await wait(800);
  }

  await runEnding();
}

/* ============================================
   Ending
   ============================================ */
async function runEnding() {
  switchScene(scenes.gallery, scenes.ending);
  startStars();

  els.nameMe.textContent = CONFIG.names.me;
  els.nameYou.textContent = CONFIG.names.you;

  for (const line of CONFIG.ending) {
    await showFadeText(els.endingText, line);
  }

  els.endingText.classList.remove('show', 'hide');
  els.endingNames.classList.remove('hidden');
  els.endingNames.classList.add('visible');

  await wait(2000);

  els.endingButtons.classList.remove('hidden');
  els.endingButtons.querySelectorAll('.btn-secondary').forEach((b) => b.classList.add('visible'));
}

/* ============================================
   Stars Animation
   ============================================ */
function startStars() {
  const canvas = els.starsCanvas;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.08 + 0.02,
      twinkle: Math.random() * Math.PI * 2,
    }));
  }

  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = Date.now() * 0.001;

    stars.forEach((s) => {
      s.y -= s.speed;
      if (s.y < 0) {
        s.y = canvas.height;
        s.x = Math.random() * canvas.width;
      }
      const flicker = Math.sin(time + s.twinkle) * 0.15 + 0.85;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * flicker})`;
      ctx.fill();
    });

    starsAnimId = requestAnimationFrame(draw);
  }

  draw();
}

/* ============================================
   Virtual Hug
   ============================================ */
function startHearts() {
  const canvas = els.heartsCanvas;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hearts = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 200,
    size: Math.random() * 14 + 6,
    speed: Math.random() * 1.5 + 0.5,
    drift: (Math.random() - 0.5) * 0.6,
    alpha: Math.random() * 0.4 + 0.3,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.02,
  }));

  function drawHeart(x, y, size, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#c0392b';
    ctx.beginPath();
    const s = size / 16;
    ctx.moveTo(0, s * 4);
    ctx.bezierCurveTo(-s * 8, -s * 4, -s * 8, s * 6, 0, s * 14);
    ctx.bezierCurveTo(s * 8, s * 6, s * 8, -s * 4, 0, s * 4);
    ctx.fill();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((h) => {
      h.y -= h.speed;
      h.x += h.drift;
      h.rotation += h.rotSpeed;
      if (h.y < -30) {
        h.y = canvas.height + 20;
        h.x = Math.random() * canvas.width;
      }
      drawHeart(h.x, h.y, h.size, h.alpha, h.rotation);
    });
    heartsAnimId = requestAnimationFrame(draw);
  }

  draw();
}

function stopHearts() {
  if (heartsAnimId) {
    cancelAnimationFrame(heartsAnimId);
    heartsAnimId = null;
  }
}

async function runVirtualHug() {
  els.hugOverlay.classList.remove('hidden');
  els.hugText.classList.remove('show');
  void els.hugOverlay.offsetWidth;
  els.hugOverlay.classList.add('active', 'shake');

  startHearts();

  await wait(600);

  for (const line of CONFIG.hug) {
    els.hugText.textContent = line;
    els.hugText.classList.add('show');
    await wait(2800);
    els.hugText.classList.remove('show');
    await wait(800);
  }

  await wait(1500);
  els.hugOverlay.classList.remove('active', 'shake');
  stopHearts();
  await wait(1000);
  els.hugOverlay.classList.add('hidden');
}

/* ============================================
   Replay
   ============================================ */
async function replayAll() {
  if (starsAnimId) cancelAnimationFrame(starsAnimId);
  stopHearts();

  els.video.pause();
  els.video.currentTime = 0;
  els.video.classList.remove('playing', 'fade-out');
  els.subtitle.classList.add('hidden');
  els.subtitle.classList.remove('show');
  els.postVideoText.classList.remove('show', 'hide');
  els.endingText.classList.remove('show', 'hide');
  els.endingNames.classList.add('hidden');
  els.endingNames.classList.remove('visible');
  els.endingButtons.classList.add('hidden');
  els.endingButtons.querySelectorAll('.btn-secondary').forEach((b) => b.classList.remove('visible'));
  els.btnStart.classList.add('hidden');
  els.btnStart.classList.remove('visible');
  els.typewriter.classList.remove('visible', 'fade-out');
  els.typewriter.textContent = '';
  els.hugOverlay.classList.add('hidden');
  els.hugOverlay.classList.remove('active', 'shake');

  Object.values(scenes).forEach((s) => s.classList.remove('active', 'blur-out'));
  scenes.opening.classList.add('active');

  currentSubtitleIndex = -1;
  await wait(400);
  runOpening();
}

/* ============================================
   Event Listeners
   ============================================ */
els.btnStart.addEventListener('click', (e) => {
  createRipple(e, els.btnStart);
  els.btnStart.classList.add('hidden');
  setTimeout(() => runCountdown(), 600);
});

els.btnReplay.addEventListener('click', (e) => {
  createRipple(e, els.btnReplay);
  replayAll();
});

els.btnHug.addEventListener('click', (e) => {
  createRipple(e, els.btnHug);
  runVirtualHug();
});

document.querySelectorAll('.btn-primary, .btn-secondary').forEach((btn) => {
  btn.addEventListener('click', (e) => createRipple(e, btn));
});

/* ============================================
   Init
   ============================================ */
(async function init() {
  await preloadAssets();
  switchScene(scenes.loader, null);
  scenes.opening.classList.add('active');
  await wait(600);
  runOpening();
})();
