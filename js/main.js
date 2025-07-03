// Initialize ScrollReveal with optimized settings (if available)
let sr = null;
if (typeof ScrollReveal !== 'undefined') {
    sr = ScrollReveal({
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
}

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
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

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
    
    // Initialize CAPTCHA if on contact page
    if (window.location.pathname.includes('contact.html') || 
        window.location.href.includes('contact.html') ||
        document.querySelector('.contact-form')) {
        console.log('Contact page detected, initializing CAPTCHA...');
        initCaptcha();
    }
});

// Also try to initialize CAPTCHA when window loads (fallback)
window.addEventListener('load', () => {
    if (document.querySelector('.contact-form') && !document.getElementById('captcha-question').textContent) {
        console.log('CAPTCHA not initialized, trying again on window load...');
        initCaptcha();
    }
});

// CAPTCHA functionality
let captchaAnswer = null;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let answer;
    let question;
    
    switch (operator) {
        case '+':
            answer = num1 + num2;
            question = `${num1} + ${num2}`;
            break;
        case '-':
            answer = num1 - num2;
            question = `${num1} - ${num2}`;
            break;
        case '×':
            answer = num1 * num2;
            question = `${num1} × ${num2}`;
            break;
    }
    
    return { question, answer };
}

function initCaptcha() {
    const captchaQuestion = document.getElementById('captcha-question');
    const captchaInput = document.getElementById('captcha');
    const contactForm = document.querySelector('.contact-form');
    
    if (!captchaQuestion || !captchaInput || !contactForm) {
        console.log('CAPTCHA elements not found, retrying...');
        // Retry after a short delay in case DOM isn't ready
        setTimeout(initCaptcha, 100);
        return;
    }
    
    console.log('Initializing CAPTCHA...');
    
    // Generate initial CAPTCHA
    const { question, answer } = generateCaptcha();
    captchaQuestion.textContent = question;
    captchaAnswer = answer;
    
    console.log('CAPTCHA question:', question, 'Answer:', answer);
    
    // Add refresh CAPTCHA functionality
    captchaQuestion.style.cursor = 'pointer';
    captchaQuestion.title = 'Click to get a new question';
    captchaQuestion.addEventListener('click', refreshCaptcha);
    
    // Handle form submission
    contactForm.addEventListener('submit', handleFormSubmission);
    
    console.log('CAPTCHA initialized successfully');
}

function refreshCaptcha() {
    const captchaQuestion = document.getElementById('captcha-question');
    const captchaInput = document.getElementById('captcha');
    
    if (!captchaQuestion || !captchaInput) return;
    
    const { question, answer } = generateCaptcha();
    captchaQuestion.textContent = question;
    captchaAnswer = answer;
    captchaInput.value = '';
    captchaInput.focus();
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    const captchaInput = document.getElementById('captcha');
    const userAnswer = parseInt(captchaInput.value);
    
    if (userAnswer !== captchaAnswer) {
        alert('Incorrect answer. Please try again.');
        captchaInput.value = '';
        captchaInput.focus();
        refreshCaptcha();
        return;
    }
    
    // If CAPTCHA is correct, you can proceed with form submission
    // For now, we'll just show a success message
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    event.target.reset();
    refreshCaptcha();
} 