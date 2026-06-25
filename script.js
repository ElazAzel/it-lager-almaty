// ============================================
// Jedai Creative Academy — Wow Effects
// Skills: gsap-scrolltrigger (inspired), taste-skill
// ============================================

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

// ========== NAVBAR ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const sy = window.pageYOffset;
  navbar.classList.toggle('scrolled', sy > 80);
  lastScroll = sy;
}, { passive: true });

// ========== BURGER MENU ==========
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
// Set aria-controls
burger.setAttribute('aria-controls', 'navLinks');
let overlay = document.querySelector('.nav-overlay');
if (!overlay) {
  overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);
}

function closeMenu() {
  navLinks.classList.remove('open');
  burger.classList.remove('active');
  overlay.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
function openMenu() {
  navLinks.classList.add('open');
  burger.classList.add('active');
  overlay.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
burger.addEventListener('click', () => navLinks.classList.contains('open') ? closeMenu() : openMenu());
overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.nav-links a').forEach(l => l.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu(); });

// ========== HERO 3D PARALLAX (desktop only) ==========
const heroObj = document.querySelector('.hero-object-inner');
const heroGlow = document.querySelector('.hero-glow');
const heroBg = document.querySelector('.hero-bg');

if (!isTouch && !isReduced && heroObj) {
  document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * 12;
    const rotX = (0.5 - y) * 8;
    heroObj.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    if (heroGlow) heroGlow.style.transform = `translate(${(x - 0.5) * 30}px, ${(y - 0.5) * 30}px)`;
    if (heroBg) heroBg.style.transform = `translate(${(x - 0.5) * -20}px, ${(y - 0.5) * -20}px)`;
  });
}

// ========== 3D TILT ON TRACK CARDS (desktop) ==========
if (!isTouch && !isReduced) {
  document.querySelectorAll('.track-card').forEach(card => {
    card.classList.add('tilt-card');
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(600px) rotateY(${(x - 0.5) * 8}deg) rotateX(${(0.5 - y) * 6}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ========== PARALLAX SCROLL ==========
if (!isTouch && !isReduced) {
  const parallaxEls = document.querySelectorAll('.problem-image, .demo-image, .team-image');
  window.addEventListener('scroll', () => {
    const sy = window.pageYOffset;
    parallaxEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        const speed = 0.15;
        const offset = (r.top - window.innerHeight) * speed;
        el.style.transform = `translateY(${offset}px)`;
      }
    });
}, { passive: true });

// ========== CONTACT WIDGET ==========
var cwOpen = true;
var cwPanel = document.getElementById('cw-panel');
var cwBubble = document.getElementById('cw-bubble');

function toggleWidget() {
  cwOpen = !cwOpen;
  if (cwOpen) {
    cwPanel.classList.remove('hidden');
    cwPanel.classList.add('visible');
    cwBubble.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    cwBubble.setAttribute('aria-label', 'Закрыть чат');
  } else {
    cwPanel.classList.remove('visible');
    cwPanel.classList.add('hidden');
    cwBubble.innerHTML = '<svg viewBox="0 0 24 24" fill="white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    cwBubble.setAttribute('aria-label', 'Открыть чат');
  }
}

function sendCwMessage() {
  var input = document.getElementById('cw-msg');
  var text = input.value.trim();
  if (!text) return;
  window.open('https://wa.me/77470701495?text=' + encodeURIComponent(text), '_blank');
  input.value = '';
  input.placeholder = 'Отправлено!';
  setTimeout(function () { input.placeholder = 'Ваш вопрос...'; }, 2500);
}
}

// ========== STAGGERED REVEAL (IntersectionObserver) ==========
if (!isReduced) {
  const revealConfig = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

  const observeReveal = (selector, cls = 'reveal') => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          obs.unobserve(e.target);
        }
      });
    }, revealConfig);
    els.forEach(el => { el.classList.add(cls); obs.observe(el); });
  };

  observeReveal('.result-card', 'reveal');
  observeReveal('.track-card', 'reveal-scale');
  observeReveal('.safety-item', 'reveal');
  observeReveal('.testimonial-grid blockquote', 'reveal');
  observeReveal('.company-logo', 'reveal');
  observeReveal('.report-card', 'reveal-left');
  observeReveal('.demo-image', 'reveal-right');
  observeReveal('.team-image', 'reveal-left');
  observeReveal('.team-content', 'reveal-right');
}

// ========== ANIMATED COUNTER (metric-grid inspired) ==========
if (!isReduced) {
  const counterEls = document.querySelectorAll('.stat-num');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const isDecimal = text.includes('.');
        const target = parseFloat(text) || 0;
        const duration = 1500;
        const start = performance.now();

        function update(now) {
          const t = Math.min((now - start) / duration, 1);
          const current = t * target;
          el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
          if (t < 1) requestAnimationFrame(update);
          else el.textContent = text;
        }
        requestAnimationFrame(update);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObs.observe(el));
}

// ========== ANIMATED PROGRESS BARS ==========
if (!isReduced) {
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const w = fill.getAttribute('data-width') || fill.style.width || '0%';
        fill.style.width = '0%';
        requestAnimationFrame(() => {
          fill.style.width = w;
        });
        barObs.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.bar-fill').forEach(el => {
    const w = el.style.width || el.getAttribute('data-width');
    if (w) {
      el.setAttribute('data-width', w);
      el.style.width = '0%';
      barObs.observe(el);
    }
  });
}

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!wasActive) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      const offset = (navbar?.offsetHeight || 64) + 20;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: 'smooth'
      });
    }
  });
});

// ========== RESIZE HANDLER (hero parallax reset) ==========
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (heroObj) heroObj.style.transform = '';
    if (heroGlow) heroGlow.style.transform = '';
    if (heroBg) heroBg.style.transform = '';
  }, 200);
}, { passive: true });
