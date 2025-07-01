// Mobile Detection
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024;

        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all functions
            initMobileMenu();
            initNavbar();
            initScrollAnimations();
            initSmoothScrolling();
            initButtonInteractions();
            initVideoOptimization();
            initParallaxEffects();
            initPerformanceOptimizations();
            initAdvancedInteractions();
            
        });

        // Mobile Menu Functions
        function initMobileMenu() {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
            const mobileMenuClose = document.getElementById('mobileMenuClose');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

            if (mobileMenuBtn && mobileMenuOverlay) {
                mobileMenuBtn.addEventListener('click', function() {
                    mobileMenuOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }

            if (mobileMenuClose) {
                mobileMenuClose.addEventListener('click', function() {
                    mobileMenuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }

            // Close menu when clicking on overlay
            if (mobileMenuOverlay) {
                mobileMenuOverlay.addEventListener('click', function(e) {
                    if (e.target === mobileMenuOverlay) {
                        mobileMenuOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }

            // Close menu when clicking on nav links
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    mobileMenuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Navbar Functions
        function initNavbar() {
            const navbar = document.querySelector('.navbar');
            let lastScrollY = window.scrollY;
            let ticking = false;

            function updateNavbar() {
                const scrollY = window.scrollY;
                
                // Add/remove background based on scroll position
                if (scrollY > 50) {
                    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                    navbar.style.backdropFilter = 'blur(20px)';
                } else {
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                    navbar.style.backdropFilter = 'blur(10px)';
                }

                // Hide/show navbar on scroll (only on desktop)
                if (window.innerWidth > 768) {
                    if (scrollY > lastScrollY && scrollY > 100) {
                        navbar.style.transform = 'translateY(-100%)';
                    } else {
                        navbar.style.transform = 'translateY(0)';
                    }
                }

                lastScrollY = scrollY;
                ticking = false;
            }

            function requestTick() {
                if (!ticking) {
                    requestAnimationFrame(updateNavbar);
                    ticking = true;
                }
            }

            window.addEventListener('scroll', requestTick);

            // Active link highlighting
            const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
            const sections = document.querySelectorAll('section');

            function highlightActiveLink() {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (window.scrollY >= sectionTop - 200) {
                        current = section.getAttribute('id') || section.className.split('-')[0];
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href && href.includes(current)) {
                        link.classList.add('active');
                    }
                });
            }

            window.addEventListener('scroll', highlightActiveLink);
        }

        // Scroll Animations
        function initScrollAnimations() {
            const observerOptions = {
                threshold: isMobile ? 0.05 : 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        
                        // Add stagger animation for multiple elements
                        if (entry.target.classList.contains('stagger-children')) {
                            const children = entry.target.querySelectorAll('.stagger-item');
                            children.forEach((child, index) => {
                                setTimeout(() => {
                                    child.classList.add('animate');
                                }, index * 100);
                            });
                        }
                    }
                });
            }, observerOptions);

            // Add scroll-animation class to elements that should animate
            const animateElements = document.querySelectorAll(`
                .demo-content,
                .problem-main,
                .problem-secondary,
                .solution-header,
                .solution-feature,
                .solution-conclusion,
                .vision-content,
                .footer-column
            `);

            animateElements.forEach(el => {
                el.classList.add('scroll-animation');
                observer.observe(el);
            });
        }

        // Smooth Scrolling
        function initSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    
                    if (target) {
                        const offsetTop = target.offsetTop - (isMobile ? 60 : 80);
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // Button Interactions
        function initButtonInteractions() {
            
            // About Button
            const aboutBtn = document.querySelector('.about-btn');
            if (aboutBtn) {
                aboutBtn.addEventListener('click', function(e) {
                    addRippleEffect(this, e);
                    
                    // Scroll to problem section
                    const problemSection = document.querySelector('.problem-section');
                    if (problemSection) {
                        problemSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            }

            // Signup button hover effect (only on desktop)
            const signupBtn = document.querySelector('.signup-btn');
            if (signupBtn && !isMobile) {
                signupBtn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px) scale(1.05)';
                });
                
                signupBtn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(-2px) scale(1)';
                });
            }
        }

        // Ripple Effect Function
        function addRippleEffect(button, event) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }

        // Video Optimization
        function initVideoOptimization() {
            const videos = document.querySelectorAll('video');
            
            videos.forEach(video => {
                // Pause video when not in viewport
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.play().catch(e => console.log('Video play failed:', e));
                        } else {
                            video.pause();
                        }
                    });
                }, { threshold: 0.25 });
                
                observer.observe(video);

                // Add error handling
                video.addEventListener('error', function() {
                    console.log('Video failed to load:', video.src);
                });
            });
        }

        // Parallax Effects (disabled on mobile for better performance)
        function initParallaxEffects() {
            if (isMobile) return;

            const parallaxElements = document.querySelectorAll('.hero-background, .vision-background');
            
            function updateParallax() {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const rate = scrolled * -0.3;
                    element.style.transform = `translateY(${rate}px)`;
                });
            }
            
            // Throttle parallax updates
            let ticking = false;
            function requestTick() {
                if (!ticking) {
                    requestAnimationFrame(updateParallax);
                    ticking = true;
                    setTimeout(() => { ticking = false; }, 16);
                }
            }
            
            window.addEventListener('scroll', requestTick);
        }

        // Performance Optimization
        function initPerformanceOptimizations() {
            // Lazy load images
            const images = document.querySelectorAll('img[src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s ease';
                        
                        const tempImg = new Image();
                        tempImg.onload = () => {
                            img.style.opacity = '1';
                        };
                        tempImg.onerror = () => {
                            img.style.opacity = '1';
                        };
                        tempImg.src = img.src;
                        
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }

        // Advanced Interactions (disabled on mobile for better performance)
        function initAdvancedInteractions() {
            if (isMobile) return;

            // Magnetic effect for buttons
            const magneticElements = document.querySelectorAll('.try-demo-btn, .about-btn, .signup-btn');
            
            magneticElements.forEach(element => {
                element.addEventListener('mousemove', (e) => {
                    const rect = element.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    const moveX = x * 0.15;
                    const moveY = y * 0.15;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
                
                element.addEventListener('mouseleave', () => {
                    element.style.transform = '';
                });
            });
        }

        // Utility Functions
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        function throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        }

        // Error handling
        window.addEventListener('error', function(e) {
            console.error('JavaScript Error:', e.error);
        });

        // Touch events for mobile
        if (isMobile) {
            // Prevent zoom on double tap for buttons
            let lastTouchEnd = 0;
            document.addEventListener('touchend', function (event) {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        }

        // Initialize loading animation immediately
        

        // Console branding
        console.log(`
%c🚀 ResearchAI - The Future of Verifiable AI Research
%cBuilt with cutting-edge web technologies
%cInterested in joining our team? Contact us!
`, 
'color: #3b82f6; font-size: 16px; font-weight: bold;',
'color: #9ca3af; font-size: 12px;',
'color: #10b981; font-size: 12px;'
        );