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

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));
