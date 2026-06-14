document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // HEADER SCROLL STYLING
    // ==========================================================================
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load

    // ==========================================================================
    // LANGUAGE SWITCHER
    // ==========================================================================
    const langBtns = document.querySelectorAll('.lang-btn');
    
    const setLanguage = (lang) => {
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('preferred-lang', lang);
        
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Dynamically update form placeholders based on language
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        if (lang === 'th') {
            if (nameInput) nameInput.placeholder = 'สมชาย รักดี';
            if (emailInput) emailInput.placeholder = 'somchai@example.com';
            if (messageInput) messageInput.placeholder = 'สวัสดีคุณปกรณ์ ฉันต้องการปรึกษาเกี่ยวกับโปรเจกต์วิเคราะห์ข้อมูล...';
        } else {
            if (nameInput) nameInput.placeholder = 'John Doe';
            if (emailInput) emailInput.placeholder = 'john@example.com';
            if (messageInput) messageInput.placeholder = 'Hi Phakorn, I\'d love to chat about a commercial project...';
        }
    };

    // Initialize language from localStorage or default to English
    const savedLang = localStorage.getItem('preferred-lang') || 'en';
    setLanguage(savedLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // ==========================================================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly delay reveal for better feel
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // CONTACT FORM HANDLING
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const statusMsg = document.getElementById('form-status-message');

    if (contactForm && submitBtn && statusMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous messages
            statusMsg.className = 'form-message';
            statusMsg.textContent = '';

            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const currentLang = document.documentElement.getAttribute('lang') || 'en';

            // Simple validation
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                const errorMsg = currentLang === 'th' ? 'กรุณากรอกข้อมูลให้ครบทุกช่อง' : 'Please fill in all fields.';
                showStatus(errorMsg, 'error');
                return;
            }

            const formData = new FormData(contactForm);

            // Start Loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            nameInput.disabled = true;
            emailInput.disabled = true;
            messageInput.disabled = true;

            // Submit to Web3Forms API
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status === 200) {
                    const successMsg = currentLang === 'th' ? 'ขอบคุณ! ข้อความของคุณถูกส่งเรียบร้อยแล้ว' : 'Thank you! Your message has been sent successfully.';
                    showStatus(successMsg, 'success');
                    contactForm.reset();
                } else {
                    const errorMsg = currentLang === 'th' ? `เกิดข้อผิดพลาด: ${json.message}` : `Error: ${json.message}`;
                    showStatus(errorMsg, 'error');
                }
            })
            .catch(error => {
                const connErrorMsg = currentLang === 'th' ? 'เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย' : 'Network error occurred. Please try again.';
                showStatus(connErrorMsg, 'error');
            })
            .finally(() => {
                // End loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                nameInput.disabled = false;
                emailInput.disabled = false;
                messageInput.disabled = false;
            });
        });

        function showStatus(message, type) {
            statusMsg.textContent = message;
            statusMsg.classList.add(type);
            
            // Auto-hide success message after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    statusMsg.classList.remove('success');
                    statusMsg.textContent = '';
                }, 5000);
            }
        }
    }

    // ==========================================================================
    // PROJECTS CAROUSEL TRACK SCROLLING
    // ==========================================================================
    const track = document.querySelector('.projects-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = track.querySelector('.project-card');
            if (!card) return 300;
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap) || 0;
            return card.offsetWidth + gap;
        };

        prevBtn.addEventListener('click', () => {
            track.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            track.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        const toggleButtons = () => {
            const isAtStart = track.scrollLeft <= 5;
            const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
            
            prevBtn.style.opacity = isAtStart ? '0.3' : '1';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
            
            nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        };

        track.addEventListener('scroll', toggleButtons);
        window.addEventListener('resize', toggleButtons);
        
        // Initial button check
        setTimeout(toggleButtons, 300);
    }
});
