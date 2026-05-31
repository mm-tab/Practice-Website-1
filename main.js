/* ═══════════════════════════════════════════════════
   Menlo Joe's Shoe Repair — Main JS
═══════════════════════════════════════════════════ */

// ── Nav scroll effect ─────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── Hamburger menu ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Scroll-reveal (IntersectionObserver) ──────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Process steps
document.querySelectorAll('.process-step').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
  revealObserver.observe(el);
});

// Service cards
document.querySelectorAll('.service-card').forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${i * 0.07}s`;
  revealObserver.observe(el);
});

// Review cards
document.querySelectorAll('.review-card').forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(el);
});

// Section headers
document.querySelectorAll('.section-header, .about-grid, .contact-grid').forEach(el => {
  el.classList.add('fade-up');
  revealObserver.observe(el);
});

// ── Smooth active-section highlight in nav ────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Animated number counters in hero stats ────────
function animateCounter(el, target, suffix = '') {
  const duration = 1600;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(eased * target);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = document.querySelectorAll('.stat-num');
      const targets = [30, 10, 5];
      const suffixes = ['+', 'k+', '★'];
      statNums.forEach((el, i) => animateCounter(el, targets[i], suffixes[i]));
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ── Parallax subtle effect on hero orbs ──────────
const orbs = document.querySelectorAll('.hero-orb');
window.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 8;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
}, { passive: true });
