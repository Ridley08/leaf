/* ===========================================================
   個別指導塾 Leaf  -  script.js
=========================================================== */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const gnav = document.getElementById('gnav');
  if (hamburger && gnav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-open');
      gnav.classList.toggle('is-open');
    });
    gnav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        gnav.classList.remove('is-open');
      });
    });
  }

  /* ---------- Hero carousel (center mode, seamless slide) ---------- */
  const track = document.getElementById('heroTrack');
  const dotsWrap = document.getElementById('heroDots');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');

  if (track) {
    const reals = Array.from(track.children);
    const n = reals.length;
    const viewport = track.parentElement;
    let pos = 1;            // track index (1 = first real slide)
    let timer = null;

    // clone first & last so the loop wraps without a jump
    track.appendChild(reals[0].cloneNode(true));
    track.insertBefore(reals[n - 1].cloneNode(true), reals[0]);

    const slideW = () => reals[0].getBoundingClientRect().width;
    function place() {
      const offset = (viewport.clientWidth - slideW()) / 2 - pos * slideW();
      track.style.transform = 'translateX(' + offset + 'px)';
    }
    function move() { track.style.transition = ''; place(); updateDots(); }
    function jump() {
      track.style.transition = 'none';
      place();
      track.offsetHeight;                 // force reflow
      track.style.transition = '';
    }

    // dots
    for (let i = 0; i < n; i++) {
      const b = document.createElement('button');
      b.addEventListener('click', () => { pos = i + 1; move(); restart(); });
      dotsWrap.appendChild(b);
    }
    const dots = Array.from(dotsWrap.children);
    function updateDots() {
      const real = ((pos - 1) % n + n) % n;
      dots.forEach((d, i) => d.classList.toggle('is-active', i === real));
    }

    function go(dir) { pos += dir; move(); }

    track.addEventListener('transitionend', () => {
      if (pos === 0) { pos = n; jump(); updateDots(); }
      else if (pos === n + 1) { pos = 1; jump(); updateDots(); }
    });

    function restart() { clearInterval(timer); timer = setInterval(() => go(1), 5000); }

    if (nextBtn) nextBtn.addEventListener('click', () => { go(1); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { go(-1); restart(); });
    window.addEventListener('resize', jump);

    // center immediately (don't depend on rAF, which can be paused offscreen),
    // then re-center once images/fonts settle
    jump(); updateDots(); restart();
    window.addEventListener('load', jump);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq__q').forEach(q => {
    q.addEventListener('click', () => {
      q.parentElement.classList.toggle('is-open');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Page top + header shadow ---------- */
  const pagetop = document.getElementById('pagetop');
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (pagetop) pagetop.classList.toggle('is-visible', y > 500);
    if (header) header.style.boxShadow = y > 10
      ? '0 4px 14px rgba(0,0,0,.12)' : '0 2px 10px rgba(0,0,0,.06)';
  });
  if (pagetop) {
    pagetop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});
