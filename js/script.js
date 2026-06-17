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

  /* ---------- Hero slider ---------- */
  const slides = document.querySelectorAll('.hero__slide');
  const dotsWrap = document.getElementById('heroDots');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  let current = 0;
  let timer = null;

  if (slides.length) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll('button');

    function goTo(i) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
      restart();
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function restart() { clearInterval(timer); timer = setInterval(next, 5000); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);
    restart();
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
