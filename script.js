// DOM Content Loaded - Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Mobile menu functionality
    initMobileMenu();
    
    // Intersection Observer for animations
    initScrollAnimations();
    
    // Login modal functionality
    initLoginModal();
    
    // Parallax effects
    initParallaxEffects();
    
    // Dynamic header
    initDynamicHeader();
    
    // Initialize booking form
    initBookingForm();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
}

// Mobile menu toggle functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
        
        // Close mobile menu when window is resized to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Login Modal functionality
function initLoginModal() {
    const loginTriggers = document.querySelectorAll('.login-trigger');
    const loginModal = document.getElementById('loginModal');
    const loginOverlay = document.getElementById('loginOverlay');
    const closeModalButton = document.getElementById('closeModalButton');
    const mainWrapper = document.getElementById('main-wrapper');

    function openModal(event) {
        event.preventDefault();
        if (mainWrapper && loginOverlay && loginModal) {
            // Add blur and opacity to main content
            mainWrapper.style.filter = 'blur(4px)';
            mainWrapper.style.opacity = '0.7';
            
            // Show modal elements
            loginOverlay.classList.remove('hidden');
            loginModal.classList.remove('hidden');
            
            // Trigger animation
            setTimeout(() => {
                loginModal.classList.remove('scale-95', 'opacity-0');
                loginModal.classList.add('scale-100', 'opacity-100');
            }, 10);
            
            // Focus on first input
            const firstInput = loginModal.querySelector('input[type="email"]');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 300);
            }
        }
    }

    function closeModal() {
        if (mainWrapper && loginOverlay && loginModal) {
            // Remove blur from main content
            mainWrapper.style.filter = 'none';
            mainWrapper.style.opacity = '1';
            
            // Start close animation
            loginModal.classList.remove('scale-100', 'opacity-100');
            loginModal.classList.add('scale-95', 'opacity-0');
            
            // Hide elements after animation
            setTimeout(() => {
                loginOverlay.classList.add('hidden');
                loginModal.classList.add('hidden');
            }, 300);
        }
    }

    // Event listeners
    if (loginTriggers.length > 0 && closeModalButton && loginOverlay) {
        loginTriggers.forEach(button => {
            button.addEventListener('click', openModal);
        });

        closeModalButton.addEventListener('click', closeModal);
        loginOverlay.addEventListener('click', closeModal);
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !loginModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }
    
    // Handle form submission
    const loginForm = loginModal?.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your login logic here
            console.log('Login form submitted');
            closeModal();
        });
    }
}

// Parallax effect for hero section
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroSection = document.getElementById('home');
        
        if (heroSection && scrolled < window.innerHeight) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Dynamic header background
function initDynamicHeader() {
    let ticking = false;
    
    function updateHeader() {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;
        
        if (header) {
            if (scrollY > 100) {
                header.classList.add('bg-white/95');
                header.classList.remove('glass-effect');
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.classList.remove('bg-white/95');
                header.classList.add('glass-effect');
                header.style.boxShadow = 'none';
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Enhanced booking form with Flatpickr
function initBookingForm() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsSelect = document.getElementById('guests');
    const searchButton = document.querySelector('.booking-input ~ div button') || document.querySelector('button[class*="bg-terracotta"]');
    
    let checkinPicker, checkoutPicker;
    
    // Initialize Flatpickr for check-in
    if (checkinInput) {
        checkinPicker = flatpickr(checkinInput, {
            minDate: "today",
            dateFormat: "Y-m-d",
            theme: "light",
            position: "below center",
            animate: true,
            locale: {
                firstDayOfWeek: 1 // Start week on Monday
            },
            onChange: function(selectedDates, dateStr, instance) {
                // Update checkout minimum date
                if (checkoutPicker && selectedDates[0]) {
                    const nextDay = new Date(selectedDates[0]);
                    nextDay.setDate(nextDay.getDate() + 1);
                    checkoutPicker.set('minDate', nextDay);
                    
                    // Clear checkout if it's before the new checkin date
                    if (checkoutPicker.selectedDates[0] && checkoutPicker.selectedDates[0] <= selectedDates[0]) {
                        checkoutPicker.clear();
                    }
                }
            }
        });
    }
    
    // Initialize Flatpickr for check-out
    if (checkoutInput) {
        checkoutPicker = flatpickr(checkoutInput, {
            minDate: "today",
            dateFormat: "Y-m-d",
            theme: "light",
            position: "below center",
            animate: true,
            locale: {
                firstDayOfWeek: 1
            }
        });
    }
    
            // Guest Counter Functionality
        const guestCountElement = document.getElementById('guestCount');
        const guestLabelElement = document.querySelector('.guest-label');
        const guestIncrementBtn = document.getElementById('guestIncrement');
        const guestDecrementBtn = document.getElementById('guestDecrement');
        const guestsHiddenInput = document.getElementById('guests');

        let guestCount = 1;
        const minGuests = 1;
        const maxGuests = 20; // You can adjust this

        function updateGuestDisplay() {
            if (guestCountElement && guestLabelElement && guestsHiddenInput) {
                guestCountElement.textContent = guestCount;
                guestLabelElement.textContent = guestCount === 1 ? 'Guest' : 'Guests';
                guestsHiddenInput.value = guestCount;
                
                // Update button states
                if (guestDecrementBtn) {
                    guestDecrementBtn.disabled = guestCount <= minGuests;
                }
                if (guestIncrementBtn) {
                    guestIncrementBtn.disabled = guestCount >= maxGuests;
                }
                
                // Add pulse animation
                guestCountElement.classList.add('count-changed');
                setTimeout(() => {
                    guestCountElement.classList.remove('count-changed');
                }, 300);
            }
        }

        // Increment button
        if (guestIncrementBtn) {
            guestIncrementBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (guestCount < maxGuests) {
                    guestCount++;
                    updateGuestDisplay();
                    
                    // Button feedback animation
                    guestIncrementBtn.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        guestIncrementBtn.style.transform = '';
                    }, 100);
                }
            });
        }

        // Decrement button
        if (guestDecrementBtn) {
            guestDecrementBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (guestCount > minGuests) {
                    guestCount--;
                    updateGuestDisplay();
                    
                    // Button feedback animation
                    guestDecrementBtn.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        guestDecrementBtn.style.transform = '';
                    }, 100);
                }
            });
        }

        // Keyboard support
        const guestCounter = document.querySelector('.guest-counter');
        if (guestCounter) {
            guestCounter.setAttribute('tabindex', '0');
            
            guestCounter.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'ArrowUp':
                    case '+':
                        e.preventDefault();
                        if (guestCount < maxGuests) {
                            guestCount++;
                            updateGuestDisplay();
                        }
                        break;
                    case 'ArrowDown':
                    case '-':
                        e.preventDefault();
                        if (guestCount > minGuests) {
                            guestCount--;
                            updateGuestDisplay();
                        }
                        break;
                }
            });
        }

        // Initialize display
        updateGuestDisplay();

    // Handle search button
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const checkin = checkinInput?.value;
            const checkout = checkoutInput?.value;
            const guests = guestsSelect?.value;
            
            if (!checkin || !checkout) {
                // Show elegant error
                showBookingError('Please select both check-in and check-out dates.');
                return;
            }
            
            if (new Date(checkout) <= new Date(checkin)) {
                showBookingError('Check-out date must be after check-in date.');
                return;
            }
            
            // Success animation
            searchButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                searchButton.style.transform = 'scale(1)';
            }, 150);
            
            console.log('Search initiated:', { checkin, checkout, guests });
            alert(`Searching for villas from ${checkin} to ${checkout} for ${guests}`);
        });
    }
}

// Elegant error display
function showBookingError(message) {
    // Remove existing error if any
    const existingError = document.querySelector('.booking-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'booking-error glass-effect';
    errorDiv.style.cssText = `
        position: absolute;
        top: -60px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(220, 38, 38, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(220, 38, 38, 0.3);
        color: #dc2626;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        white-space: nowrap;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    errorDiv.textContent = message;
    
    // Add to booking bar
    const bookingBar = document.querySelector('.glass-effect.rounded-2xl');
    if (bookingBar) {
        bookingBar.style.position = 'relative';
        bookingBar.appendChild(errorDiv);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => errorDiv.remove(), 300);
            }
        }, 4000);
    }
}

// Utility function to debounce scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add some interactive enhancements
function addInteractiveEnhancements() {
    // Add hover effects to cards and buttons
    const interactiveElements = document.querySelectorAll('button, .property-card, a[href^="#"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize interactive enhancements after DOM is loaded
document.addEventListener('DOMContentLoaded', addInteractiveEnhancements);

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);