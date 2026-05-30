// Scroll reveal animations
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { 
        if (e.isIntersecting) {
            e.target.classList.add('in'); 
        }
    });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// Nav scroll shadow adjustments
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) {
        nav.style.boxShadow = window.scrollY > 50
            ? '0 4px 30px rgba(27,94,32,0.12)'
            : '0 2px 24px rgba(27,94,32,0.07)';
    }
});

// Accessibility widget
const a11yToggle = document.getElementById('a11y-toggle');
const a11yPanel = document.getElementById('a11y-panel');

if (a11yToggle && a11yPanel) {
    a11yToggle.addEventListener('click', () => {
        const hidden = a11yPanel.hidden;
        a11yPanel.hidden = !hidden;
        a11yToggle.setAttribute('aria-expanded', hidden ? 'true' : 'false');
        if (!hidden === false) {
            a11yToggle.focus();
        }
    });

    // Handle space and enter with preventDefault to prevent spacebar page-scroll
    a11yToggle.addEventListener('keydown', e => { 
        if (e.key === 'Enter' || e.key === ' ') { 
            e.preventDefault(); 
            a11yToggle.click(); 
        } 
    });

    // Close on outside click
    document.addEventListener('click', e => {
        if (!a11yPanel.hidden && !a11yPanel.contains(e.target) && !a11yToggle.contains(e.target)) {
            a11yPanel.hidden = true;
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !a11yPanel.hidden) {
            a11yPanel.hidden = true;
            a11yToggle.focus();
        }
    });
}

// Toggle accessibility feature (with persistence)
function toggleA11y(cls, event) {
    if (event) {
        event.stopPropagation();
    }
    
    // Toggle class on HTML element
    document.documentElement.classList.toggle(cls);
    
    // Find associated button and update active styles / aria attribute
    const btn = document.querySelector(`[onclick^="toggleA11y('${cls}')"]`);
    const isActive = document.documentElement.classList.contains(cls);
    
    if (btn) {
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }
    
    // Save to localStorage
    if (isActive) {
        localStorage.setItem('a11y-' + cls, 'true');
    } else {
        localStorage.removeItem('a11y-' + cls);
    }
}

// Reset all accessibility choices
function resetA11y() {
    const classes = ['font-large', 'high-contrast', 'grayscale', 'links-highlight', 'no-animations', 'readable-font'];
    
    classes.forEach(cls => {
        document.documentElement.classList.remove(cls);
        const btn = document.querySelector(`[onclick^="toggleA11y('${cls}')"]`);
        if (btn) { 
            btn.classList.remove('active'); 
            btn.setAttribute('aria-pressed', 'false'); 
        }
        localStorage.removeItem('a11y-' + cls);
    });
}

// Bind functions to window so they are globally accessible for HTML inline onclick handlers
window.toggleA11y = toggleA11y;
window.resetA11y = resetA11y;

// Load saved accessibility configurations
document.addEventListener('DOMContentLoaded', () => {
    const classes = ['font-large', 'high-contrast', 'grayscale', 'links-highlight', 'no-animations', 'readable-font'];
    
    classes.forEach(cls => {
        if (localStorage.getItem('a11y-' + cls) === 'true') {
            document.documentElement.classList.add(cls);
            const btn = document.querySelector(`[onclick^="toggleA11y('${cls}')"]`);
            if (btn) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            }
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { 
            e.preventDefault(); 
            target.scrollIntoView({ behavior: 'smooth' }); 
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if(navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Mobile Nav Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

