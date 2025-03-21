// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    themeIcon.textContent = newTheme === 'light' ? '🌞' : '🌙';
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'light' ? '🌞' : '🌙';
}

themeToggle.addEventListener('click', toggleTheme);

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

function handleIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}

const observer = new IntersectionObserver(handleIntersect, observerOptions);

// Wait for all content to load
window.addEventListener('load', () => {
    // Hide loading screen and show main content after a minimum time
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        const mainContent = document.querySelector('.main-content');
        
        loadingScreen.style.opacity = '0';
        mainContent.classList.remove('hidden');
        
        // Remove loading screen after fade out
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            
            // Start observing elements for animation
            const cards = document.querySelectorAll('.skill-card, .experience-card');
            cards.forEach(card => {
                observer.observe(card);
                // Add initial animation class if element is already in viewport
                if (card.getBoundingClientRect().top < window.innerHeight) {
                    card.classList.add('animate');
                }
            });
        }, 500);
    }, 1500);
});

// Add smooth scrolling for better user experience
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 