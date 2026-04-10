// DOM Elements
const exploreBtn = document.getElementById('exploreBtn');
const exploreOverlay = document.getElementById('exploreOverlay');
const backBtn = document.getElementById('backBtn');
const exploreItems = document.querySelectorAll('.explore-item');
const hiddenSections = document.querySelectorAll('.hidden-section');
const heroButtons = document.querySelectorAll('.hero-buttons button');

// State Management
let isOverlayOpen = false;

// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    setupExploreOverlay();
    setupExploreItems();
    setupHeroButtons();
    setupScrollReveal();
    setupPosterExpansion();
});

// Poster Expansion Functionality - DISABLED
function setupPosterExpansion() {
    // Poster expansion functionality removed as requested
    // Posters now display at full size without clicking
}

// Explore Overlay Functions
function setupExploreOverlay() {
    exploreBtn.addEventListener('click', openExploreOverlay);
    backBtn.addEventListener('click', closeExploreOverlay);
    
    // Close overlay when clicking outside
    exploreOverlay.addEventListener('click', function(e) {
        if (e.target === exploreOverlay) {
            closeExploreOverlay();
        }
    });
    
    // Close overlay with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOverlayOpen) {
            closeExploreOverlay();
        }
    });
}

function openExploreOverlay() {
    exploreOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    isOverlayOpen = true;
    
    // Add entrance animation and scroll to top
    setTimeout(() => {
        exploreOverlay.querySelector('.explore-content').style.animation = 'slideInUp 0.5s ease';
        exploreOverlay.scrollTop = 0;
    }, 100);
}

function openExploreOverlay() {
    exploreOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    isOverlayOpen = true;
    
    // Add entrance animation
    setTimeout(() => {
        exploreOverlay.querySelector('.explore-content').style.animation = 'slideInUp 0.5s ease';
    }, 100);
}

function closeExploreOverlay() {
    exploreOverlay.classList.remove('active');
    document.body.style.overflow = '';
    isOverlayOpen = false;
    
    // Hide any active sections
    hiddenSections.forEach(section => {
        section.classList.remove('active');
    });
}

// Explore Items Setup
function setupExploreItems() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });
    
    // Hover effects for old explore items (if any remain)
    const oldExploreItems = document.querySelectorAll('.explore-item');
    oldExploreItems.forEach(item => {
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
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showHiddenSection(sectionId) {
    // Hide all hidden sections first
    hiddenSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Hero Buttons Setup
function setupHeroButtons() {
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-primary')) {
                // Get Tickets Now functionality
                showNotification('Tickets coming soon!');
            } else if (this.classList.contains('btn-secondary')) {
                // Watch Trailer Now functionality - opens trailer in new tab
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
            }
        });
    });
}

// Notification System
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.1);
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        z-index: 3000;
        font-size: 1.1rem;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: notificationFadeIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'notificationFadeOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Scroll Reveal Animation
function setupScrollReveal() {
    const sections = document.querySelectorAll('.content-section');
    
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
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const videoBackground = document.querySelector('.video-background');
    
    if (hero && videoBackground) {
        videoBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes notificationFadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes notificationFadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    .notification {
        animation: notificationFadeIn 0.3s ease;
    }
`;
document.head.appendChild(style);

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

// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
