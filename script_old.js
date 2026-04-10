// DOM Elements
const exploreBtn = document.querySelector('.explore-btn');
const collectiveBtn = document.querySelector('.collective-btn');
const qaBtn = document.querySelector('.qa-btn');
const ticketBtn = document.querySelector('.ticket-btn');
const exploreModal = document.getElementById('explore-modal');
const exploreClose = document.querySelector('.explore-close');
const backBtn = document.querySelector('.back-btn');
const exploreItems = document.querySelectorAll('.explore-item');

// State Management
let isModalOpen = false;

// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupExploreModal();
    setupExploreItems();
    setupBackButton();
});

// Navigation Setup
function setupNavigation() {
    // Navigation button clicks
    exploreBtn.addEventListener('click', openExploreModal);
    collectiveBtn.addEventListener('click', () => scrollToSection('collective'));
    qaBtn.addEventListener('click', () => scrollToSection('qa'));
    ticketBtn.addEventListener('click', () => scrollToSection('ticket'));
}

// Explore Modal Functions
function setupExploreModal() {
    exploreClose.addEventListener('click', closeExploreModal);
    
    // Close modal when clicking outside
    exploreModal.addEventListener('click', function(e) {
        if (e.target === exploreModal) {
            closeExploreModal();
        }
    });
    
    // Prevent scrolling when modal is open
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalOpen) {
            closeExploreModal();
        }
    });
}

function openExploreModal() {
    exploreModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    isModalOpen = true;
}

function closeExploreModal() {
    exploreModal.classList.remove('active');
    document.body.style.overflow = '';
    isModalOpen = false;
}

// Explore Items Setup
function setupExploreItems() {
    exploreItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            if (target) {
                closeExploreModal();
                setTimeout(() => {
                    scrollToSection(target);
                }, 300);
            }
        });
    });
}

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Back Button Setup
function setupBackButton() {
    backBtn.addEventListener('click', function() {
        scrollToSection('description');
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic underline animation for navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        const text = this.textContent;
        this.style.width = `${this.offsetWidth}px`;
    });
});

// Enhanced hover effects for explore items
exploreItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const hoverImage = this.querySelector('.hover-image');
        if (hoverImage) {
            hoverImage.style.opacity = '1';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const hoverImage = this.querySelector('.hover-image');
        if (hoverImage) {
            hoverImage.style.opacity = '0';
        }
    });
});

// Ticket notification functionality
document.addEventListener('DOMContentLoaded', function() {
    const notifyBtn = document.querySelector('.notify-btn');
    if (notifyBtn) {
        notifyBtn.addEventListener('click', function() {
            // Create notification popup
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = 'You will be notified when tickets are available!';
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #ff0000;
                color: white;
                padding: 20px 40px;
                border-radius: 10px;
                z-index: 3000;
                font-size: 1.1rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            `;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && isModalOpen) {
        e.preventDefault();
        // Focus management for modal
        const focusableElements = exploreModal.querySelectorAll('button, [tabindex="0"]');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
            }
        }
    }
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScroll = debounce(function() {
    // Add any scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScroll);
