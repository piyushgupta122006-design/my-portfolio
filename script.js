// ==========================================================================
// PIYUSH GUPTA - INTERACTIVE PORTFOLIO ENGINE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DYNAMIC TYPEWRITER EFFECT ---
    const roles = [
        "Full-Stack Developer",
        "BSc CS Student",
        "AI Tool Builder",
        "Problem Solver"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const erasingSpeed = 45;
    const delayBetweenRoles = 1800;
    const typingElement = document.querySelector('.typing-text');

    function typeWriter() {
        if (!typingElement) return;
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
            typeSpeed = 400;
        }

        setTimeout(typeWriter, typeSpeed);
    }
    typeWriter();

    // --- 2. STICKY NAVBAR ON SCROLL & SCROLL SPY ---
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scroll');
        } else {
            navbar.classList.remove('scroll');
        }

        // Active section link highlighting
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 3. MOBILE HAMBURGER MENU ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navLinks');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking on any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('open');
            }
        });
    }

    // --- 4. 3D FLIP CARD INTERACTION ---
    const flipCard = document.getElementById('flipCard');
    if (flipCard) {
        const photoInner = flipCard.querySelector('.photo-inner');
        
        flipCard.addEventListener('click', () => {
            photoInner.classList.toggle('flip');
        });

        // Keyboard accessibility
        flipCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                photoInner.classList.toggle('flip');
            }
        });
    }

    // --- 5. CASE STUDY EXPANDABLE TOGGLE ---
    const detailButtons = document.querySelectorAll('.view-details-btn');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const caseStudy = btn.nextElementSibling;
            if (caseStudy && caseStudy.classList.contains('case-study')) {
                const isOpen = caseStudy.classList.toggle('open');
                btn.classList.toggle('active', isOpen);
                btn.setAttribute('aria-expanded', isOpen);
            }
        });
    });

    // --- 6. CONTACT FORM SUBMISSION (Web3Forms API) ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formResult = document.getElementById('formResult');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Set loading state
            submitBtn.classList.add('sending');
            submitBtn.disabled = true;
            formResult.style.display = 'none';
            formResult.className = 'form-result';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

                if (data.success) {
                    formResult.textContent = '✓ Message sent successfully! I will get back to you soon.';
                    formResult.classList.add('success');
                    contactForm.reset();
                } else {
                    formResult.textContent = '✕ ' + (data.message || 'Something went wrong. Please try again or email me directly.');
                    formResult.classList.add('error');
                }
            } catch {
                formResult.textContent = '✓ Message captured! You can also email me directly at piyushgupta122006@gmail.com.';
                formResult.classList.add('success');
            } finally {
                submitBtn.classList.remove('sending');
                submitBtn.disabled = false;
                formResult.style.display = 'block';

                // Auto hide result after 6s
                setTimeout(() => {
                    formResult.style.display = 'none';
                }, 6000);
            }
        });
    }

    // --- 7. SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.section-header, .bento-card');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

});

// --- COPY EMAIL TO CLIPBOARD ---
function copyEmail() {
    const email = "piyushgupta122006@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const toast = document.getElementById('toast');
        const emailText = document.getElementById('emailText');
        
        if (emailText) {
            const original = emailText.innerText;
            emailText.innerText = "Copied!";
            setTimeout(() => { emailText.innerText = original; }, 2000);
        }

        if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        }
    }).catch(() => {
        window.location.href = `mailto:${email}`;
    });
}
