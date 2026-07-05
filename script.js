/* ═══════════════════════════════════════════════════════════════════════
   CINEMATIC LUXURY WEDDING — SCRIPT.JS
   Couple  : Sathish Kumar & Pavithra · 7 June 2026
   Version : 3.0 (Complete Cinematic Redesign)
═══════════════════════════════════════════════════════════════════════ */
'use strict';

/* ─── IMAGE DATA ──────────────────────────────────────────────────── */
const IMAGES = {
  hero: [
    '1.Hero/IMG_6479.JPG','1.Hero/IMG_6500.JPG','1.Hero/IMG_6526.JPG',
    '1.Hero/IMG_7199.JPG','1.Hero/IMG_7211.JPG','1.Hero/IMG_7746.JPG',
    '1.Hero/IMG_7909.JPG'
  ],
  engagement: [
    '2.Engagement/IMG_6546.JPG','2.Engagement/IMG_6552.JPG','2.Engagement/IMG_6558.JPG',
    '2.Engagement/IMG_6565.JPG','2.Engagement/IMG_6568.JPG','2.Engagement/IMG_6571.JPG',
    '2.Engagement/IMG_6622.JPG','2.Engagement/IMG_6633.JPG','2.Engagement/IMG_6635.JPG',
    '2.Engagement/IMG_6654.JPG','2.Engagement/IMG_6655.JPG','2.Engagement/IMG_6665.JPG',
    '2.Engagement/IMG_6674.JPG','2.Engagement/IMG_6688.JPG','2.Engagement/IMG_6696.JPG',
    '2.Engagement/IMG_6727.JPG','2.Engagement/IMG_6735.JPG','2.Engagement/IMG_6741.JPG',
    '2.Engagement/IMG_6752.JPG','2.Engagement/IMG_6769.JPG','2.Engagement/IMG_6789.JPG'
  ],
  poojai: [
    '3.Poojai/IMG_6877.JPG','3.Poojai/IMG_6878.JPG','3.Poojai/IMG_6892.JPG',
    '3.Poojai/IMG_6900.JPG','3.Poojai/IMG_6902.JPG','3.Poojai/IMG_6904.JPG',
    '3.Poojai/IMG_6906.JPG','3.Poojai/IMG_6908.JPG','3.Poojai/IMG_6913.JPG',
    '3.Poojai/IMG_6914.JPG'
  ],
  wedding: [
    '4.Wedding/1.JPG','4.Wedding/2.JPG','4.Wedding/3.JPG','4.Wedding/4.JPG',
    '4.Wedding/5.JPG','4.Wedding/6.JPG','4.Wedding/7.JPG','4.Wedding/8.JPG',
    '4.Wedding/9.JPG','4.Wedding/10.JPG','4.Wedding/11.JPG','4.Wedding/12.JPG',
    '4.Wedding/13.JPG','4.Wedding/IMG_7332.JPG','4.Wedding/IMG_7334.JPG',
    '4.Wedding/IMG_7341.JPG','4.Wedding/IMG_7343.JPG','4.Wedding/IMG_7351.JPG',
    '4.Wedding/IMG_7361.JPG','4.Wedding/IMG_7402.JPG','4.Wedding/IMG_7405.JPG',
    '4.Wedding/IMG_7406.JPG','4.Wedding/IMG_7415.JPG','4.Wedding/IMG_7430.JPG',
    '4.Wedding/IMG_7432.JPG','4.Wedding/IMG_7434.JPG','4.Wedding/IMG_7445.JPG',
    '4.Wedding/IMG_7449.JPG','4.Wedding/IMG_7455.JPG','4.Wedding/IMG_7457.JPG',
    '4.Wedding/IMG_7494.JPG','4.Wedding/IMG_7496.JPG','4.Wedding/IMG_7500.JPG',
    '4.Wedding/IMG_7502.JPG','4.Wedding/IMG_7515.JPG','4.Wedding/IMG_7544.JPG',
    '4.Wedding/IMG_7546.JPG','4.Wedding/IMG_7550.JPG'
  ],
  reception: [
    '5.Reception/IMG_7848.JPG','5.Reception/IMG_7899.JPG','5.Reception/IMG_7903.JPG',
    '5.Reception/IMG_7912.JPG','5.Reception/IMG_7937.JPG','5.Reception/IMG_7939.JPG',
    '5.Reception/IMG_7945.JPG','5.Reception/IMG_7964.JPG','5.Reception/IMG_7978.JPG',
    '5.Reception/IMG_7991.JPG','5.Reception/IMG_7994.JPG','5.Reception/IMG_8004.JPG',
    '5.Reception/IMG_8033.JPG','5.Reception/IMG_8076.JPG','5.Reception/IMG_8171.JPG',
    '5.Reception/IMG_8186.JPG','5.Reception/IMG_8193.JPG'
  ]
};

const GALLERY_LABELS = {
  engagement:'Engagement', poojai:'Poojai Ceremony',
  wedding:'The Wedding', reception:'Reception'
};

/* ─── STATE ───────────────────────────────────────────────────────── */
let lightboxImages = [], lightboxIndex = 0;
let heroIndex = 0, heroTimer = null;
let musicPlaying = false, audioCtx = null, gainNode = null, oscillators = [];


/* ═══════════════════════════════════════════════════════════════════════
   1. CINEMATIC LOADER
═══════════════════════════════════════════════════════════════════════ */
function initLoader() {
  const loader    = document.getElementById('cinematic-loader');
  const bar       = document.getElementById('loaderBar');
  const pctEl     = document.getElementById('loaderPercent');
  const envelope  = document.getElementById('envelope-screen');
  let pct = 0;

  // Spawn floating particles in loader
  const pWrap = document.getElementById('loaderParticles');
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      position:absolute;border-radius:50%;
      background:radial-gradient(circle,rgba(212,175,55,${(Math.random()*.5+.2).toFixed(2)}),transparent);
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;top:${Math.random()*100}%;
      animation:floatParticle ${Math.random()*8+5}s ease-in-out infinite alternate;
      animation-delay:${(Math.random()*3).toFixed(1)}s;opacity:0;
    `;
    pWrap.appendChild(p);
    requestAnimationFrame(() => p.style.opacity = '1');
  }

  // Add float animation
  if (!document.getElementById('float-style')) {
    const s = document.createElement('style');
    s.id = 'float-style';
    s.textContent = `@keyframes floatParticle{
      0%{transform:translate(0,0) scale(1)}
      100%{transform:translate(${Math.random()>0.5?'':'-'}${Math.random()*40+10}px,${Math.random()>0.5?'':'-'}${Math.random()*40+10}px) scale(${(Math.random()*0.5+0.8).toFixed(1)})}
    }`;
    document.head.appendChild(s);
  }

  // Animate progress
  const tick = setInterval(() => {
    pct += Math.random() * 3 + 1;
    if (pct >= 100) { pct = 100; clearInterval(tick); }
    bar.style.width = pct + '%';
    pctEl.textContent = Math.floor(pct) + '%';
    if (pct >= 100) {
      setTimeout(() => {
        loader.classList.add('hidden');
        envelope.classList.add('visible');
        setTimeout(() => {
          document.getElementById('envelope').classList.add('open');
        }, 600);
      }, 600);
    }
  }, 50);
}


/* ═══════════════════════════════════════════════════════════════════════
   2. ENVELOPE → ENTER SITE
═══════════════════════════════════════════════════════════════════════ */
function initEnvelope() {
  const enterBtn  = document.getElementById('enterBtn');
  const envelope  = document.getElementById('envelope-screen');
  const mainSite  = document.getElementById('main-site');
  const player    = document.getElementById('musicPlayer');

  enterBtn.addEventListener('click', () => {
    envelope.classList.add('hidden');
    setTimeout(() => {
      envelope.remove();
      mainSite.classList.add('visible');
      // Show music player
      setTimeout(() => player.classList.add('visible'), 1200);
      // Launch confetti
      launchConfetti();
      // Start ambient music
      startAmbientMusic();
    }, 900);
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   3. CONFETTI BURST
═══════════════════════════════════════════════════════════════════════ */
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#D4AF37','#E8D48B','#F5E6A3','#B76E79','#D4949E','#FFF','#FAF8F2'];
  const pieces = Array.from({length:180}, () => ({
    x: Math.random() * canvas.width,
    y: (Math.random() - 1.3) * canvas.height,
    w: Math.random() * 8 + 3, h: Math.random() * 4 + 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - .5) * 2.5, vy: Math.random() * 3 + 1.5,
    rot: Math.random() * Math.PI * 2, rotV: (Math.random() - .5) * .12,
    opacity: Math.random() * .7 + .3
  }));

  let frame = 0;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.rotV; p.opacity -= .003;
      if (p.y < canvas.height && p.opacity > 0) alive = true;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });
    frame++;
    if (alive && frame < 500) requestAnimationFrame(draw);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.remove(); }
  };
  draw();
}


/* ═══════════════════════════════════════════════════════════════════════
   4. HERO SLIDER (Ken Burns)
═══════════════════════════════════════════════════════════════════════ */
function initHeroSlider() {
  const container = document.getElementById('heroSlider');
  const dotsWrap  = document.getElementById('heroDots');
  const imgs = IMAGES.hero;
  if (!container || !imgs.length) return;

  imgs.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
    slide.style.backgroundImage = `url('${encodeURI(src)}')`;
    container.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      clearInterval(heroTimer); goHero(i);
      heroTimer = setInterval(nextHero, 7000);
    });
    dotsWrap.appendChild(dot);
  });

  // Set ending background
  const endBg = document.getElementById('endingBg');
  if (endBg) endBg.style.backgroundImage = `url('${encodeURI(imgs[Math.floor(imgs.length / 2)])}')`;

  heroTimer = setInterval(nextHero, 7000);
}

function goHero(idx) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;
  slides[heroIndex].classList.remove('active');
  dots[heroIndex].classList.remove('active');
  heroIndex = ((idx % slides.length) + slides.length) % slides.length;
  slides[heroIndex].classList.add('active');
  dots[heroIndex].classList.add('active');
}
function nextHero() { goHero(heroIndex + 1); }

function initHeroSwipe() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  let sx = 0;
  hero.addEventListener('touchstart', e => { sx = e.changedTouches[0].clientX; }, {passive:true});
  hero.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 55) {
      clearInterval(heroTimer); goHero(dx < 0 ? heroIndex + 1 : heroIndex - 1);
      heroTimer = setInterval(nextHero, 7000);
    }
  }, {passive:true});
}


/* ═══════════════════════════════════════════════════════════════════════
   5. FLOATING PETALS
═══════════════════════════════════════════════════════════════════════ */
function initPetals() {
  const wrap = document.getElementById('petals');
  if (!wrap) return;
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const size = Math.random() * 10 + 5;
    p.style.cssText = `
      left:${Math.random()*100}%;width:${size}px;height:${size*1.3}px;
      animation-duration:${Math.random()*9+6}s;
      animation-delay:${Math.random()*12}s;
      opacity:${(Math.random()*.4+.2).toFixed(2)};
    `;
    wrap.appendChild(p);
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   6. GOLDEN PARTICLE CANVAS (background)
═══════════════════════════════════════════════════════════════════════ */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  // Create particles
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + .5,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
      alpha: Math.random() * .4 + .1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}


/* ═══════════════════════════════════════════════════════════════════════
   7. MASONRY GALLERY
═══════════════════════════════════════════════════════════════════════ */
function buildGallery(containerId, galleryKey) {
  const container = document.getElementById(containerId);
  const images = IMAGES[galleryKey];
  if (!container || !images) return;

  images.forEach((src, idx) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const img = document.createElement('img');
    img.dataset.src = src;
    img.alt = `${GALLERY_LABELS[galleryKey]} — Photo ${idx + 1}`;
    img.className = 'lazy-shimmer';

    const overlay = document.createElement('div');
    overlay.className = 'gallery-item-overlay';
    overlay.innerHTML = '<div class="gallery-item-zoom">+</div>';

    item.append(img, overlay);
    container.appendChild(item);
    item.addEventListener('click', () => openLightbox(galleryKey, idx));
  });

  // Lazy load + staggered reveal
  const items = container.querySelectorAll('.gallery-item');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const item = entry.target;
      const img = item.querySelector('img');
      const i = [...items].indexOf(item);
      if (img && img.dataset.src && !img.src) {
        img.src = img.dataset.src;
        img.onload = () => img.classList.remove('lazy-shimmer');
        img.onerror = () => { img.style.opacity = '0'; };
      }
      setTimeout(() => item.classList.add('visible'), (i % 8) * 60);
      obs.unobserve(item);
    });
  }, {rootMargin:'0px 0px 260px 0px', threshold:.03});
  items.forEach(el => obs.observe(el));
}


/* ═══════════════════════════════════════════════════════════════════════
   8. FULLSCREEN LIGHTBOX
═══════════════════════════════════════════════════════════════════════ */
function openLightbox(galleryKey, idx) {
  lightboxImages = IMAGES[galleryKey] || [];
  lightboxIndex = idx;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderLightboxImage(); buildLightboxThumbs();
}
function openLightboxGallery(key) { openLightbox(key, 0); }

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function renderLightboxImage() {
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  const caption = document.getElementById('lightboxCaption');
  const loader = document.querySelector('.lightbox-loader');
  const src = lightboxImages[lightboxIndex];
  if (!src) return;

  img.classList.add('loading');
  if (loader) loader.classList.add('show');

  const temp = new Image();
  temp.onload = () => { img.src = src; img.classList.remove('loading'); if (loader) loader.classList.remove('show'); };
  temp.onerror = () => { img.classList.remove('loading'); if (loader) loader.classList.remove('show'); };
  temp.src = src;

  counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  caption.textContent = src.split('/').pop().replace(/\.\w+$/, '');

  // Preload adjacent
  [lightboxIndex - 1, lightboxIndex + 1].forEach(i => {
    const s = lightboxImages[(i + lightboxImages.length) % lightboxImages.length];
    if (s) { const pre = new Image(); pre.src = s; }
  });

  // Sync thumbs
  document.querySelectorAll('.lightbox-thumb').forEach((t, i) => t.classList.toggle('active', i === lightboxIndex));
  const activeT = document.querySelector('.lightbox-thumb.active');
  if (activeT) activeT.scrollIntoView({inline:'center', behavior:'smooth'});
}

function buildLightboxThumbs() {
  const wrap = document.getElementById('lightboxThumbs');
  if (!wrap) return;
  wrap.innerHTML = '';
  lightboxImages.forEach((src, i) => {
    const t = document.createElement('img');
    t.src = src; t.alt = `Thumb ${i+1}`;
    t.className = 'lightbox-thumb' + (i === lightboxIndex ? ' active' : '');
    t.addEventListener('click', () => { lightboxIndex = i; renderLightboxImage(); });
    wrap.appendChild(t);
  });
}

function lightboxNext() { lightboxIndex = (lightboxIndex + 1) % lightboxImages.length; renderLightboxImage(); }
function lightboxPrev() { lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length; renderLightboxImage(); }

function initLightbox() {
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxNext').addEventListener('click', lightboxNext);
  document.getElementById('lightboxPrev').addEventListener('click', lightboxPrev);
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') lightboxNext();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') lightboxPrev();
    if (e.key === 'Escape') closeLightbox();
  });
  // Swipe
  let sx = 0;
  const lb = document.getElementById('lightbox');
  lb.addEventListener('touchstart', e => { sx = e.changedTouches[0].clientX; }, {passive:true});
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) { dx < 0 ? lightboxNext() : lightboxPrev(); }
  }, {passive:true});
}


/* ═══════════════════════════════════════════════════════════════════════
   9. BACKGROUND MUSIC (Web Audio API ambient fallback)
═══════════════════════════════════════════════════════════════════════ */
function startAmbientMusic() {
  const audio = document.getElementById('bgMusic');
  const hasSrc = audio.querySelector('source');
  if (hasSrc) {
    audio.volume = 0.3;
    audio.play().catch(() => {});
    musicPlaying = true;
    updateMusicUI();
    return;
  }
  // Ambient synthesis fallback
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.035, audioCtx.currentTime + 3);
    gainNode.connect(audioCtx.destination);
    [110, 130.81, 164.81, 196, 220, 261.63].forEach(f => {
      const osc = audioCtx.createOscillator();
      const og = audioCtx.createGain();
      osc.type = 'sine'; osc.frequency.value = f;
      og.gain.value = 0.22 / 6;
      osc.connect(og); og.connect(gainNode); osc.start();
      oscillators.push(osc);
    });
    musicPlaying = true;
    updateMusicUI();
  } catch (e) {}
}

function toggleMusic() {
  const audio = document.getElementById('bgMusic');
  const hasSrc = audio.querySelector('source');
  if (hasSrc) {
    musicPlaying ? audio.pause() : audio.play().catch(() => {});
    musicPlaying = !musicPlaying;
  } else {
    if (musicPlaying && gainNode) {
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
      setTimeout(() => { oscillators.forEach(o => { try { o.stop(); } catch(_){} }); oscillators = []; audioCtx.close(); audioCtx = null; gainNode = null; }, 1200);
      musicPlaying = false;
    } else {
      startAmbientMusic();
    }
  }
  updateMusicUI();
}

function updateMusicUI() {
  const btn = document.getElementById('musicPlayBtn');
  const status = document.getElementById('musicStatus');
  btn.textContent = musicPlaying ? '⏸' : '▶';
  status.textContent = musicPlaying ? 'Playing' : 'Paused';
}

function initMusicPlayer() {
  document.getElementById('musicPlayBtn').addEventListener('click', toggleMusic);
  document.getElementById('musicVolume').addEventListener('input', e => {
    const v = e.target.value / 100;
    const audio = document.getElementById('bgMusic');
    audio.volume = v;
    if (gainNode) gainNode.gain.setValueAtTime(v * 0.12, audioCtx.currentTime);
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   10. THEME TOGGLE (Dark/Light)
═══════════════════════════════════════════════════════════════════════ */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('wedding-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('wedding-theme', next);
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   11. NAVBAR
═══════════════════════════════════════════════════════════════════════ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', update, {passive:true});
  update();
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const closeBtn = document.getElementById('mobileNavClose');
  const open = () => { mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { mobileNav.classList.remove('open'); document.body.style.overflow = ''; };
  hamburger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  mobileNav.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', close));
}


/* ═══════════════════════════════════════════════════════════════════════
   12. SMOOTH SCROLL
═══════════════════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = (document.getElementById('navbar') || {}).offsetHeight || 72;
      window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY - navH, behavior:'smooth'});
    });
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   13. SCROLL REVEAL
═══════════════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.reveal-scale');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, {threshold:.1, rootMargin:'0px 0px -40px 0px'});
  els.forEach(el => obs.observe(el));
}


/* ═══════════════════════════════════════════════════════════════════════
   14. BACK TO TOP
═══════════════════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  const circle = document.getElementById('bttCircle');
  const circumference = 2 * Math.PI * 22; // r=22
  circle.style.strokeDasharray = circumference;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    circle.style.strokeDashoffset = circumference - (progress * circumference);
    btn.classList.toggle('visible', scrollTop > 400);
  }, {passive:true});

  btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}


/* ═══════════════════════════════════════════════════════════════════════
   15. SPARKLE CURSOR TRAIL
═══════════════════════════════════════════════════════════════════════ */
function initSparkleTrail() {
  if (!window.matchMedia('(hover:hover)').matches) return;
  let lastTime = 0;
  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastTime < 90) return;
    lastTime = now;
    const size = Math.random() * 5 + 2;
    const el = document.createElement('div');
    el.className = 'gold-sparkle';
    el.style.cssText = `
      left:${e.clientX - size/2}px;top:${e.clientY - size/2}px;
      width:${size}px;height:${size}px;z-index:9998;
      animation-duration:${(Math.random()*.6+.3).toFixed(2)}s;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   INIT ON DOM READY
═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Phase 1: Cinematic opening
  initLoader();
  initEnvelope();

  // Phase 2: Main site (these run but are hidden until Enter)
  initHeroSlider();
  initHeroSwipe();
  initPetals();
  initParticleCanvas();

  // Galleries
  buildGallery('engagementGallery', 'engagement');
  buildGallery('poojaiGallery', 'poojai');
  buildGallery('weddingGallery', 'wedding');
  buildGallery('receptionGallery', 'reception');

  // Lightbox
  initLightbox();

  // Navigation
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initThemeToggle();

  // Effects & UI
  initScrollReveal();
  initMusicPlayer();
  initBackToTop();
  initSparkleTrail();
});

/* ─── GLOBAL EXPORTS ──────────────────────────────────────────────── */
window.openLightboxGallery = openLightboxGallery;
