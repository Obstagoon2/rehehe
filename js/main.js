// Initialize ScrollReveal for scroll animations
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    delay: 200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: false
});

// Apply animations to elements with animate-on-scroll class
sr.reveal('.animate-on-scroll', {
    interval: 200
});

// Function to reset hero animations
function resetHeroAnimations() {
    const heroLogo = document.querySelector('.hero-logo');
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    
    if (heroLogo) {
        heroLogo.style.animation = 'none';
        heroLogo.offsetHeight; // Trigger reflow
        heroLogo.style.animation = 'heroLogoAnimation 1.2s ease-out 0.3s forwards';
    }
    
    if (heroTitle) {
        heroTitle.style.animation = 'none';
        heroTitle.offsetHeight; // Trigger reflow
        heroTitle.style.animation = 'heroTextAnimation 1.2s ease-out 0.6s forwards';
    }
    
    if (heroText) {
        heroText.style.animation = 'none';
        heroText.offsetHeight; // Trigger reflow
        heroText.style.animation = 'heroTextAnimation 1.2s ease-out 0.9s forwards';
    }
}

// Reset animations when navigating back to the page
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        resetHeroAnimations();
    }
});

// Reset animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    resetHeroAnimations();
});

// Smooth scroll for navigation links
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

// Add click handlers for navigation links to reset animations
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (link.getAttribute('href') === 'index.html') {
            setTimeout(resetHeroAnimations, 100);
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove background color based on scroll position
    if (scrollTop > 50) {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar based on scroll direction
    if (scrollTop > lastScrollTop) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Add loading animation when needed
function showLoading(element) {
    const loader = document.createElement('div');
    loader.className = 'loading';
    element.appendChild(loader);
}

function hideLoading(element) {
    const loader = element.querySelector('.loading');
    if (loader) {
        loader.remove();
    }
}

// Example of dynamic content loading
function loadContent(section) {
    showLoading(section);
    // Simulate content loading
    setTimeout(() => {
        hideLoading(section);
        // Add your content loading logic here
    }, 1000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
}); 