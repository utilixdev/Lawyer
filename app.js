document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        duration: 1200,
        once: true,
        mirror: false,
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-section');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPositionY = -scrollPosition * 0.3 + 'px';
        
        const maxScroll = 500;
        const opacityChange = Math.min(scrollPosition / maxScroll, 1);
        heroOverlay.style.backgroundColor = `linear-gradient(to right, rgba(44, 62, 80, ${0.8 + opacityChange * 0.1}), rgba(52, 73, 94, ${0.7 + opacityChange * 0.1}))`;
        heroSection.classList.toggle('scrolled', scrollPosition > 100);
    });

    // Mouse Trail Effect
    const mouseTrailContainer = document.getElementById('mouse-trail-container');
    if (mouseTrailContainer) {
        document.addEventListener('mousemove', (e) => {
            const dot = document.createElement('div');
            dot.className = 'trail-dot';
            dot.style.left = e.clientX + 'px';
            dot.style.top = e.clientY + 'px';
            mouseTrailContainer.appendChild(dot);

            const size = Math.random() * 10 + 5;
            dot.style.width = size + 'px';
            dot.style.height = size + 'px';

            dot.addEventListener('animationend', () => {
                dot.remove();
            });
        });
    }


    // Form submission handling (using Formspree)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.textContent = 'Enviando...';
            formStatus.style.color = 'var(--text-color)';

            const formAction = contactForm.getAttribute('action');
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.style.color = 'green';
                    formStatus.textContent = '✅ ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
                    contactForm.reset();
                } else {
                    throw new Error('Server error');
                }
            } catch (error) {
                formStatus.style.color = 'red';
                formStatus.textContent = '❌ Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.';
                console.error('Error submitting form:', error);
            }
        });
    }

    // Cookie Consent Modal Logic
    const cookieModal = document.getElementById('cookie-consent-modal');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const rejectCookiesBtn = document.getElementById('reject-cookies');
    const hasAcceptedCookies = localStorage.getItem('cookies-accepted');

    if (!hasAcceptedCookies) {
        // Show the modal after a short delay to allow page to load
        setTimeout(() => {
            cookieModal.classList.add('show');
        }, 1000);
    }

    function hideCookieModal() {
        cookieModal.classList.remove('show');
        // Add a class to make it fade out
        cookieModal.style.opacity = '0';
        cookieModal.style.transform = 'translateY(20px) translateX(-50%)';
        setTimeout(() => {
            cookieModal.style.display = 'none';
        }, 500);
    }

    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'true');
        hideCookieModal();
    });

    rejectCookiesBtn.addEventListener('click', () => {
        // Here you would add logic to disable certain cookies if needed
        localStorage.setItem('cookies-accepted', 'false');
        hideCookieModal();
    });

});