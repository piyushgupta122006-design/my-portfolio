// 1. Typing Effect Logic
const roles = ["BSc CS Student", "Problem Solver", "Web Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenRoles = 2000;

const typingElement = document.querySelector('.typing-text');

function typeWriter() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? erasingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = delayBetweenRoles;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start Typing on Load
document.addEventListener('DOMContentLoaded', typeWriter);

// 2. Email Copy Function
function copyEmail() {
    const email = "piyushgupta122006@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        // Change Button Text Temporary
        const btnText = document.getElementById('emailText');
        const originalText = btnText.innerText;
        btnText.innerText = "Copied!";
        
        // Show Toast
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            btnText.innerText = originalText;
        }, 2000);
    });
}

// 3. Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.ios-card, .skill-pill').forEach((el, index) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.05}s`;
    observer.observe(el);
});
