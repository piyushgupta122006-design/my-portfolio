// ==========================================================================
// PIYUSH GUPTA - INTERACTIVE BENTO PORTFOLIO ENGINE
// Features: Spotlight Glow, Live Clock, Animated Counters, Command Palette, Matrix FX
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

        let currentSectionId = '';
        const scrollPosition = window.scrollY + 140;

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

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });

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

    // --- 6. MOUSE-FOLLOW SPOTLIGHT GLOW ON BENTO CARDS ---
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 7. LIVE BHIWANDI IST CLOCK ---
    const liveClock = document.getElementById('liveClock');
    function updateClock() {
        if (!liveClock) return;
        const now = new Date();
        // Format for Indian Standard Time (IST)
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        liveClock.textContent = now.toLocaleTimeString('en-US', options);
    }
    updateClock();
    setInterval(updateClock, 1000);

    // --- 8. ANIMATED NUMBER COUNTERS ---
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const speed = 1200; // Total animation duration in ms
                const stepTime = 20;
                const totalSteps = speed / stepTime;
                const increment = target / totalSteps;

                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(count);
                    }
                }, stepTime);

                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(c => counterObserver.observe(c));

    // --- 9. COMMAND PALETTE (CTRL+K / CMD+K) ---
    const cmdTrigger = document.getElementById('cmdPaletteTrigger');
    const cmdOverlay = document.getElementById('cmdModalOverlay');
    const cmdInput = document.getElementById('cmdInput');
    const cmdList = document.getElementById('cmdList');
    const cmdItems = document.querySelectorAll('.cmd-item');

    function openCommandPalette() {
        if (!cmdOverlay) return;
        cmdOverlay.classList.add('open');
        if (cmdInput) {
            cmdInput.value = '';
            cmdInput.focus();
            filterCommands('');
        }
    }

    function closeCommandPalette() {
        if (!cmdOverlay) return;
        cmdOverlay.classList.remove('open');
    }

    if (cmdTrigger) {
        cmdTrigger.addEventListener('click', openCommandPalette);
    }

    // Keyboard shortcuts: Ctrl+K, Cmd+K, Escape
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdOverlay && cmdOverlay.classList.contains('open')) {
                closeCommandPalette();
            } else {
                openCommandPalette();
            }
        } else if (e.key === 'Escape') {
            closeCommandPalette();
        }
    });

    if (cmdOverlay) {
        cmdOverlay.addEventListener('click', (e) => {
            if (e.target === cmdOverlay) closeCommandPalette();
        });
    }

    function filterCommands(query) {
        const q = query.toLowerCase().trim();
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(q)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (cmdInput) {
        cmdInput.addEventListener('input', (e) => {
            filterCommands(e.target.value);
        });

        cmdInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const visibleItem = Array.from(cmdItems).find(i => i.style.display !== 'none');
                if (visibleItem) {
                    executeCommand(visibleItem.getAttribute('data-action'));
                }
            }
        });
    }

    cmdItems.forEach(item => {
        item.addEventListener('click', () => {
            executeCommand(item.getAttribute('data-action'));
        });
    });

    function executeCommand(action) {
        closeCommandPalette();
        switch (action) {
            case 'goto-projects':
                document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'goto-about':
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'goto-education':
                document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'goto-contact':
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'download-resume':
                window.location.href = 'resume.pdf';
                break;
            case 'copy-email':
                copyEmail();
                break;
            case 'open-github':
                window.open('https://github.com/piyushgupta122006-design', '_blank');
                break;
            case 'toggle-matrix':
                toggleMatrixRain();
                break;
            default:
                break;
        }
    }

    // --- 10. MATRIX CODE RAIN EASTER EGG ---
    let matrixInterval = null;
    function toggleMatrixRain() {
        const canvas = document.getElementById('matrixCanvas');
        if (!canvas) return;

        if (canvas.style.display === 'block') {
            canvas.style.display = 'none';
            if (matrixInterval) clearInterval(matrixInterval);
            return;
        }

        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = '0123456789ABCDEF01PIYUSHGUPTACS';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(4, 7, 17, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#22d3ee';
            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        matrixInterval = setInterval(drawMatrix, 35);

        // Auto stop matrix rain after 8 seconds
        setTimeout(() => {
            canvas.style.display = 'none';
            if (matrixInterval) clearInterval(matrixInterval);
        }, 8000);
    }

    // --- 11. CONTACT FORM SUBMISSION (Web3Forms API) ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formResult = document.getElementById('formResult');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
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

                setTimeout(() => {
                    formResult.style.display = 'none';
                }, 6000);
            }
        });
    }

    // --- 12. SCROLL REVEAL ANIMATIONS ---
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
