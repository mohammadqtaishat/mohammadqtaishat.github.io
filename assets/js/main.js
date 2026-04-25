/* =====================================================
   STUDIO NULL — Interactions
===================================================== */

// ── Scroll reveal ──────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.project-card, .specialism-item, .pub-item, .edu-item'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings inside the same parent
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 60}ms`;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealTargets.forEach(el => revealObserver.observe(el));

// ── Header shrink on scroll ────────────────────────
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.style.setProperty(
    '--header-shrink',
    y > 80 ? '1' : '0'
  );
  lastScroll = y;
}, { passive: true });

// ── Cursor dot (desktop only) ─────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 6px; height: 6px; border-radius: 50%;
    background: #c8ff00;
    box-shadow: 0 0 10px #c8ff00;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s, transform 0.15s;
    top: 0; left: 0;
  `;
  document.body.appendChild(cursor);

  const ring = document.createElement('div');
  ring.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 28px; height: 28px; border-radius: 50%;
    border: 1px solid rgba(200,255,0,0.35);
    transform: translate(-50%, -50%);
    transition: top 0.18s ease, left 0.18s ease, width 0.3s, height 0.3s, border-color 0.3s;
    top: 0; left: 0;
  `;
  document.body.appendChild(ring);

  window.addEventListener('mousemove', e => {
    cursor.style.top  = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
    ring.style.top    = e.clientY + 'px';
    ring.style.left   = e.clientX + 'px';
  });

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      ring.style.width  = '60px';
      ring.style.height = '60px';
      ring.style.borderColor = 'rgba(200,255,0,0.6)';
    });
    card.addEventListener('mouseleave', () => {
      ring.style.width  = '28px';
      ring.style.height = '28px';
      ring.style.borderColor = 'rgba(200,255,0,0.35)';
    });
  });
}
