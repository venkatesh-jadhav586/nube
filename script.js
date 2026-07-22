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

/* ── FirstCry-style search + category filtering ── */
const productCards = document.querySelectorAll('.product-card');

function ageToMonths(text) {
  const n = parseInt(text, 10) || 0;
  return text.toLowerCase().includes('year') ? n * 12 : n;
}

function bucketMatches(bucket, months) {
  if (bucket === '0-12 months') return months <= 12;
  if (bucket === '1-3 years')   return months >= 12 && months <= 36;
  if (bucket === '4-7 years')   return months >= 36;
  return true;
}

function applyAgeFilter(bucket) {
  productCards.forEach((card) => {
    const ageText = card.querySelector('.prod-age')?.textContent || '';
    const months = ageToMonths(ageText);
    card.classList.toggle('hidden', bucket ? !bucketMatches(bucket, months) : false);
  });
}

document.querySelectorAll('.age-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.age-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    applyAgeFilter(btn.textContent.trim());
  });
});

document.querySelectorAll('.cat-pill[data-age]').forEach((pill) => {
  pill.addEventListener('click', () => {
    const bucket = pill.dataset.age;
    document.querySelectorAll('.age-btn').forEach((b) => {
      b.classList.toggle('active', b.textContent.trim() === bucket);
    });
    applyAgeFilter(bucket);
  });
});

const siteSearch = document.getElementById('siteSearch');
const siteSearchMobile = document.getElementById('siteSearchMobile');

function runSearch(value) {
  const q = value.trim().toLowerCase();
  productCards.forEach((card) => {
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
    const matches = !q || title.includes(q) || desc.includes(q);
    card.classList.toggle('hidden', !matches);
  });
  if (q) {
    document.querySelectorAll('.age-btn').forEach((b) => b.classList.remove('active'));
  }
}

if (siteSearch) {
  siteSearch.addEventListener('input', () => {
    if (siteSearchMobile) siteSearchMobile.value = siteSearch.value;
    runSearch(siteSearch.value);
  });
}
if (siteSearchMobile) {
  siteSearchMobile.addEventListener('input', () => {
    if (siteSearch) siteSearch.value = siteSearchMobile.value;
    runSearch(siteSearchMobile.value);
  });
}
