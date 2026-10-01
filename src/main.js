const openMenuBtn = document.querySelector('.js-open-menu');
const closeMenuBtn = document.querySelector('.js-close-menu');
const menu = document.querySelector('.js-menu');
const menuLinks = document.querySelectorAll('.js-menu-link');

function openMenu() {
  menu.classList.add('is-open');
  document.body.classList.add('menu-open');
  openMenuBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  menu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  openMenuBtn.setAttribute('aria-expanded', 'false');
}

openMenuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

menu.addEventListener('click', event => {
  if (event.target === menu) {
    closeMenu();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

// Reviews slider

const reviewsList = document.querySelector('.reviews-list');
const reviewCards = document.querySelectorAll('.reviews-item');
const reviewsDots = document.querySelector('.reviews-dots');

function getVisibleReviews() {
  if (window.innerWidth >= 1280) {
    return 3;
  }

  if (window.innerWidth >= 768) {
    return 2;
  }

  return 1;
}

function createReviewDots() {
  if (!reviewsList || !reviewsDots || reviewCards.length === 0) {
    return;
  }

  reviewsDots.innerHTML = '';

  const visibleReviews = getVisibleReviews();
  const dotCount = reviewCards.length - visibleReviews + 1;

  if (window.innerWidth >= 1280) {
    return;
  }

  for (let i = 0; i < dotCount; i += 1) {
    const dot = document.createElement('button');

    dot.classList.add('reviews-dot');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show review ${i + 1}`);

    if (i === 0) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      const card = reviewCards[0];
      const gap = parseFloat(getComputedStyle(reviewsList).gap) || 0;
      const scrollAmount = card.offsetWidth + gap;

      reviewsList.scrollTo({
        left: scrollAmount * i,
        behavior: 'smooth',
      });
    });

    reviewsDots.appendChild(dot);
  }
}

function updateActiveReviewDot() {
  const dots = document.querySelectorAll('.reviews-dot');

  if (dots.length === 0 || reviewCards.length === 0) {
    return;
  }

  const gap = parseFloat(getComputedStyle(reviewsList).gap) || 0;
  const scrollAmount = reviewCards[0].offsetWidth + gap;

  const activeIndex = Math.round(reviewsList.scrollLeft / scrollAmount);

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });
}

reviewsList?.addEventListener('scroll', updateActiveReviewDot);

window.addEventListener('resize', () => {
  reviewsList?.scrollTo({
    left: 0,
    behavior: 'auto',
  });

  createReviewDots();
});

createReviewDots();