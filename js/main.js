// Initialize ScrollReveal with optimized settings
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '50px',
    duration: 800,
    delay: 100,
    easing: 'ease-out',
    reset: false,
    useDelay: 'once',
    viewFactor: 0.2
});

// Apply animations to elements with animate-on-scroll class
sr.reveal('.animate-on-scroll', {
    interval: 100
});

// Function to reset hero animations with optimized performance
function resetHeroAnimations() {
    const heroElements = {
        logo: document.querySelector('.hero-logo'),
        title: document.querySelector('.hero h1'),
        text: document.querySelector('.hero p')
    };
    
    // Batch DOM operations
    requestAnimationFrame(() => {
        for (const [key, element] of Object.entries(heroElements)) {
            if (element) {
                element.style.animation = 'none';
                element.offsetHeight; // Single reflow
                element.style.animation = `hero${key.charAt(0).toUpperCase() + key.slice(1)}Animation 1s ease-out ${key === 'logo' ? '0.2s' : key === 'title' ? '0.4s' : '0.6s'} forwards`;
            }
        }
    });
}

// Reset animations when navigating back to the page
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        resetHeroAnimations();
    }
});

// Reset animations when the page loads
document.addEventListener('DOMContentLoaded', resetHeroAnimations);

// Smooth scroll with optimized performance
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

// Optimize scroll handlers using requestAnimationFrame
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
let ticking = false;

function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Use CSS classes instead of inline styles
    if (scrollTop > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    if (scrollTop > lastScrollTop) {
        navbar?.classList.add('nav-hidden');
    } else {
        navbar?.classList.remove('nav-hidden');
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

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