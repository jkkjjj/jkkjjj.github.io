/* ============================================================
   falling-heads.js
   Dynamically spawns ~28 background falling head images.

   IMAGE PATH (change here if you rename/move the file):
     assets/img/head.png
   ============================================================ */

(function () {
  // ── Config ──────────────────────────────────────────────────
  const HEAD_IMG_SRC = 'assets/img/head.png'; // <-- single source of truth
  const COUNT = 28;

  // ── Respect prefers-reduced-motion ──────────────────────────
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (prefersReduced) return;

  // ── Inject keyframe rule once ────────────────────────────────
  // The CSS already defines @keyframes fall using --rot custom property.
  // Nothing extra needed here.

  // ── Helpers ──────────────────────────────────────────────────
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  // ── Build heads ──────────────────────────────────────────────
  const container = document.getElementById('falling-heads');
  if (!container) return;

  for (let i = 0; i < COUNT; i++) {
    const img = document.createElement('img');

    // Suppress any load/error noise — broken image must not affect layout
    img.onerror = function () {
      this.style.display = 'none';
    };

    img.src = HEAD_IMG_SRC;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.className = 'falling-head';

    const size      = rand(24, 72);          // px
    const left      = rand(0, 98);           // vw %
    const opacity   = rand(0.04, 0.18);
    const duration  = rand(14, 38);          // seconds
    const delay     = rand(-duration, 0);    // start mid-fall so screen isn't empty
    const rotation  = rand(-40, 40);         // degrees, fixed per element

    img.style.cssText = [
      `width: ${size}px`,
      `left: ${left}vw`,
      `opacity: ${opacity}`,
      `--rot: ${rotation}deg`,
      `animation: fall ${duration}s ${delay}s linear infinite`,
    ].join('; ');

    container.appendChild(img);
  }
})();
