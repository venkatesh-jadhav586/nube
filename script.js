const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
    }
  });
});

/* Content sections are always visible by default now — no more
   scroll-triggered opacity/IntersectionObserver gating, which was
   the cause of products silently staying hidden on some mobile
   browsers. Cards still get a lightweight CSS entrance animation
   on load only (see style.css), which never depends on scroll
   position or observer timing. */

const mobileHashFix = window.matchMedia('(max-width:680px)').matches && window.location.hash === '#contact';
if (mobileHashFix) {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }, 120);
}

const stickyBanner = document.querySelector('.sticky-order-banner');
let lastScrollY = window.scrollY;
let isBannerHidden = false;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (!stickyBanner) return;

  if (currentScrollY > lastScrollY + 10 && currentScrollY > 120) {
    if (!isBannerHidden) {
      stickyBanner.classList.add('hidden');
      isBannerHidden = true;
    }
  } else if (currentScrollY < lastScrollY - 10) {
    if (isBannerHidden) {
      stickyBanner.classList.remove('hidden');
      isBannerHidden = false;
    }
  }

  lastScrollY = currentScrollY;
});
