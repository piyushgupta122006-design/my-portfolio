// Simple Reveal Animation
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.ios-card, .skill-pill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
});