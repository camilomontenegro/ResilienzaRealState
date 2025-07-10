const heroImg = document.querySelector('.hero-img');
const checkBar = document.querySelector('.check-bar');
const hero = document.querySelector('.hero');

function handleScroll() {
  const scrollTop = window.scrollY;
  const heroHeight = hero.offsetHeight;
  const ratio = Math.min(1, scrollTop / heroHeight);
  heroImg.style.opacity = 1 - ratio;

  if (ratio > 0.5) {
    checkBar.classList.remove('hidden');
  } else {
    checkBar.classList.add('hidden');
  }
}

window.addEventListener('scroll', handleScroll);
