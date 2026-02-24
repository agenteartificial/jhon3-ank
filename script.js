document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================
       INTERSECTION OBSERVER - ANIMACIONES DE ENTRADA
       ==================================================== */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Seleccionar elementos a animar
    document.querySelectorAll('.zigzag-row, .social-proof, .cta-card, .step-card, .testimonial-card').forEach(el => {
        scrollObserver.observe(el);
    });

    /* ====================================================
       CONTADOR DE ESTADÍSTICAS ANIMADO
       ==================================================== */
    const statsObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElements = entry.target.querySelectorAll('.stat-number');
                numberElements.forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'));
                    animateCounter(el, target, 2000);
                });
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const socialProofSection = document.querySelector('.social-proof');
    if (socialProofSection) {
        statsObserver.observe(socialProofSection);
    }

    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                clearInterval(timer);
                element.innerText = target;
            } else {
                element.innerText = Math.round(start);
            }
        }, 16);
    }

    /* ====================================================
       SISTEMA DE PARTÍCULAS ORGÁNICAS
       ==================================================== */
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = window.innerWidth < 768 ? 20 : 50; // Menos partículas en movil
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            // Randomizar retrasos y duraciones para organic feel
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    /* ====================================================
        NAVBAR STICKY & MOBILE MENU
       ==================================================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cerrar al hacer clic en un link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});
