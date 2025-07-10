// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Login Modal Logic
const loginTriggers = document.querySelectorAll('.login-trigger');
const loginModal = document.getElementById('loginModal');
const loginOverlay = document.getElementById('loginOverlay');
const closeModalButton = document.getElementById('closeModalButton');
const mainWrapper = document.getElementById('main-wrapper');

function openModal(event) {
    event.preventDefault();
    if (mainWrapper && loginOverlay && loginModal) {
        mainWrapper.style.filter = 'blur(4px)';
        mainWrapper.style.opacity = '0.7';
        loginOverlay.classList.remove('hidden');
        loginModal.classList.remove('hidden');
        setTimeout(() => {
            loginModal.classList.remove('scale-95', 'opacity-0');
        }, 10); // Start transition
    }
}

function closeModal() {
    if (mainWrapper && loginOverlay && loginModal) {
        mainWrapper.style.filter = 'none';
        mainWrapper.style.opacity = '1';
        loginModal.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            loginOverlay.classList.add('hidden');
            loginModal.classList.add('hidden');
        }, 300); // Wait for CSS transition to finish
    }
}

if (loginTriggers.length > 0 && closeModalButton && loginOverlay) {
    loginTriggers.forEach(button => {
        button.addEventListener('click', openModal);
    });

    closeModalButton.addEventListener('click', closeModal);
    loginOverlay.addEventListener('click', closeModal);
}
