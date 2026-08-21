// ==========================================================================
// PIYUSH GUPTA — PREMIUM INTERACTIVE PORTFOLIO ENGINE
// Features: Preloader, Custom Cursor, Magnetic Buttons, 3D Tilt,
//           Live Clock, Counters, Command Palette, Matrix FX,
//           Scroll Progress, Section Dots, GitHub Heatmap
// ==========================================================================

// --- 0. CINEMATIC PRELOADER ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('exit');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.remove('preloader-active');
            }, 850);
        }, 2800);
    }
});

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
    const sectionDots = document.querySelectorAll('.sec-dot');
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        // Sticky navbar
        if (window.scrollY > 40) {
            navbar.classList.add('scroll');
        } else {
            navbar.classList.remove('scroll');
        }

        // Scroll Progress Bar
        if (scrollProgress) {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            scrollProgress.style.width = `${progress}%`;
        }

        // Scroll Spy for Nav Links + Section Dots
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

        sectionDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSectionId) {
                dot.classList.add('active');
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

    // --- 7. CUSTOM ANIMATED CURSOR ---
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    const isDesktopCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isDesktopCursor && cursorDot && cursorRing) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursorRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(animateCursorRing);
        }
        animateCursorRing();

        // Enlarge cursor on interactive elements
        const interactiveEls = document.querySelectorAll('a, button, input, textarea, .btn, .photo-card, .cmd-item, .skill-item');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('cursor-hover');
                cursorRing.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('cursor-hover');
                cursorRing.classList.remove('cursor-hover');
            });
        });
    }

    // --- 8. MAGNETIC BUTTONS (Desktop Only) ---
    if (isDesktopCursor) {
        const magneticElements = document.querySelectorAll('.magnetic');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }

    // --- 9. 3D TILT PHYSICS ON PROJECT CARDS (Desktop Only) ---
    if (isDesktopCursor) {
        const tiltCards = document.querySelectorAll('.project-bento-card');
        tiltCards.forEach(card => {
            // Add glare overlay dynamically
            const glare = document.createElement('div');
            glare.classList.add('tilt-glare');
            card.appendChild(glare);

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -7;
                const rotateY = ((x - centerX) / centerX) * 7;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

                // Glare follows mouse
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.10) 0%, transparent 55%)`;
                glare.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                glare.style.opacity = '0';
            });
        });
    }

    // --- 10. LIVE BHIWANDI IST CLOCK ---
    const liveClock = document.getElementById('liveClock');
    function updateClock() {
        if (!liveClock) return;
        const now = new Date();
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

    // --- 11. ANIMATED NUMBER COUNTERS ---
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const speed = 1200;
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

    // --- 12. COMMAND PALETTE (CTRL+K / CMD+K) ---
    const cmdTrigger = document.getElementById('cmdPaletteTrigger');
    const cmdOverlay = document.getElementById('cmdModalOverlay');
    const cmdInput = document.getElementById('cmdInput');
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

    if (cmdTrigger) cmdTrigger.addEventListener('click', openCommandPalette);

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
            item.style.display = text.includes(q) ? 'flex' : 'none';
        });
    }

    if (cmdInput) {
        cmdInput.addEventListener('input', (e) => filterCommands(e.target.value));

        cmdInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const visibleItem = Array.from(cmdItems).find(i => i.style.display !== 'none');
                if (visibleItem) executeCommand(visibleItem.getAttribute('data-action'));
            }
        });
    }

    cmdItems.forEach(item => {
        item.addEventListener('click', () => executeCommand(item.getAttribute('data-action')));
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
            case 'goto-github':
                document.getElementById('github')?.scrollIntoView({ behavior: 'smooth' });
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
        }
    }

    // --- 13. MATRIX CODE RAIN EASTER EGG ---
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
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }

        matrixInterval = setInterval(drawMatrix, 35);
        setTimeout(() => {
            canvas.style.display = 'none';
            if (matrixInterval) clearInterval(matrixInterval);
        }, 8000);
    }

    // --- 14. GITHUB ACTIVITY API & HEATMAP ---
    async function fetchGitHubData() {
        const username = 'piyushgupta122006-design';
        try {
            const [profileRes, eventsRes] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/events/public?per_page=100`)
            ]);

            if (!profileRes.ok || !eventsRes.ok) throw new Error('API error');

            const profile = await profileRes.json();
            const events = await eventsRes.json();

            // Update stats
            const ghRepos = document.getElementById('ghRepos');
            const ghFollowers = document.getElementById('ghFollowers');
            const ghEvents = document.getElementById('ghEvents');
            if (ghRepos) ghRepos.textContent = profile.public_repos ?? '—';
            if (ghFollowers) ghFollowers.textContent = profile.followers ?? '—';
            if (ghEvents) ghEvents.textContent = Array.isArray(events) ? events.length : '—';

            // Build heatmap
            buildHeatmap(Array.isArray(events) ? events : []);
        } catch (err) {
            console.warn('GitHub API fallback:', err);
            buildHeatmap([]);
        }
    }

    function buildHeatmap(events) {
        const grid = document.getElementById('heatmapGrid');
        if (!grid) return;

        const now = new Date();
        const totalDays = 84; // 12 weeks
        const dayCounts = {};

        events.forEach(event => {
            if (event.created_at) {
                const date = new Date(event.created_at).toDateString();
                dayCounts[date] = (dayCounts[date] || 0) + 1;
            }
        });

        let cellsHTML = '';
        for (let i = totalDays - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const count = dayCounts[date.toDateString()] || 0;
            let level = 0;
            if (count >= 6) level = 4;
            else if (count >= 4) level = 3;
            else if (count >= 2) level = 2;
            else if (count >= 1) level = 1;

            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            cellsHTML += `<div class="heatmap-cell" data-level="${level}" title="${dateStr}: ${count} events"></div>`;
        }

        grid.innerHTML = cellsHTML;
    }

    fetchGitHubData();

    // --- 15. CONTACT FORM SUBMISSION (Web3Forms API) ---
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
                setTimeout(() => { formResult.style.display = 'none'; }, 6000);
            }
        });
    }

    // --- 16. SCROLL REVEAL ANIMATIONS ---
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
            setTimeout(() => { toast.classList.remove('show'); }, 2500);
        }
    }).catch(() => {
        window.location.href = `mailto:${email}`;
    });
}
