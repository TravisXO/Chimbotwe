/**
 * Enhanced Premium Animations for Chembotwe Mattresses
 * Version: 2.0.0
 * Description: Performance-optimized animation system with advanced features
 * Focus: GPU acceleration, accessibility, and sophisticated interactions
 */

class ChembotweAnimationEngine {
    constructor() {
        this.config = this.getOptimizedConfig();
        this.observer = null;
        this.animationQueue = new Map();
        this.performanceMetrics = {
            fps: 60,
            isLowEnd: this.detectLowEndDevice(),
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        };
        this.init();
    }

    // Device Performance Detection
    detectLowEndDevice() {
        return (
            navigator.hardwareConcurrency <= 2 ||
            navigator.deviceMemory <= 2 ||
            /Android.*Chrome\/[0-5]/.test(navigator.userAgent) ||
            window.screen.width <= 480
        );
    }

    // Optimized Configuration
    getOptimizedConfig() {
        const isMobile = window.innerWidth <= 768;
        const isLowEnd = this.detectLowEndDevice();

        return {
            // Hero Section
            '#home': {
                animation: 'fade-in',
                threshold: 0.5,
                priority: 'high'
            },

            // Banner Section
            '.banner-section .banner-image': {
                animation: isMobile ? 'fade-in' : 'fade-in-left',
                threshold: 0.4,
                parallax: !isMobile && !isLowEnd ? 0.3 : 0
            },
            '.banner-section .banner-content': {
                animation: isMobile ? 'fade-in' : 'fade-in-right',
                threshold: 0.4,
                delay: 200
            },

            // Products Section
            '.products-section .section-header': {
                animation: 'fade-in-down',
                threshold: 0.8,
                priority: 'high'
            },
            '.products-section .category-filter': {
                animation: 'fade-in-up',
                threshold: 1.0,
                stagger: isMobile ? 50 : 100,
                pattern: 'wave'
            },
            '.products-section .products-grid': {
                stagger: isMobile ? 100 : 150,
                threshold: 0.1,
                childSelector: '.product-card',
                childAnimation: isLowEnd ? 'fade-in' : 'zoom-in',
                pattern: 'spiral',
                maxConcurrent: isLowEnd ? 3 : 6
            },

            // About Section
            '#about .about-text': {
                animation: isMobile ? 'fade-in' : 'fade-in-right',
                threshold: 0.4,
                sequence: ['fade-in-right', 'elastic-scale']
            },
            '#about .about-stats': {
                stagger: isMobile ? 150 : 200,
                threshold: 0.5,
                childSelector: '.stat-item',
                childAnimation: 'bounce-cta',
                pattern: 'wave',
                counterAnimation: true
            },

            // Testimonials Section
            '#testimonials .section-header': {
                animation: 'fade-in-down',
                threshold: 0.8
            },
            '#testimonials .testimonials-grid': {
                stagger: isMobile ? 150 : 200,
                threshold: 0.3,
                childSelector: '.testimonial-card',
                childAnimation: 'fade-in-up',
                pattern: 'wave'
            },

            // Benefits Section
            '.benefits-section .section-header': {
                animation: 'fade-in-down',
                threshold: 0.8
            },
            '.benefits-section .benefits-grid': {
                stagger: isMobile ? 100 : 150,
                threshold: 0.2,
                childSelector: '.benefit-card',
                childAnimation: isLowEnd ? 'fade-in' : 'zoom-in',
                pattern: 'spiral'
            },

            // Contact Section
            '#contact .contact-info': {
                animation: isMobile ? 'fade-in' : 'fade-in-left',
                threshold: 0.3
            },
            '#contact .contact-form-container': {
                animation: isMobile ? 'fade-in' : 'fade-in-right',
                threshold: 0.3,
                delay: 300
            }
        };
    }

    // Initialize Animation System
    init() {
        if (this.performanceMetrics.prefersReducedMotion) {
            this.initReducedMotionMode();
            return;
        }

        this.setupIntersectionObserver();
        this.initializeAnimations();
        this.setupParallaxEffects();
        this.setupFormValidationAnimations();
        this.setupCarouselIntegration();
        this.setupPerformanceMonitoring();
    }

    // Reduced Motion Support
    initReducedMotionMode() {
        document.documentElement.classList.add('reduced-motion');

        // Simple fade-in only for critical elements
        const criticalElements = document.querySelectorAll('.section-header, .hero-content');
        criticalElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                el.style.opacity = '1';
            }, 100);
        });
    }

    // Performance-Optimized Intersection Observer
    setupIntersectionObserver() {
        const options = {
            threshold: [0.1, 0.3, 0.5, 0.8],
            rootMargin: this.performanceMetrics.isLowEnd ? '50px' : '100px'
        };

        this.observer = new IntersectionObserver((entries) => {
            this.handleIntersections(entries);
        }, options);
    }

    // Handle Intersection Events with Queue Management
    handleIntersections(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const config = this.getElementConfig(target);

                if (config) {
                    this.queueAnimation(target, config);
                }

                this.observer.unobserve(target);
            }
        });
    }

    // Animation Queue Management
    queueAnimation(element, config) {
        const priority = config.priority || 'normal';
        const delay = config.delay || 0;

        setTimeout(() => {
            if (this.canAnimateNow(config)) {
                this.executeAnimation(element, config);
            } else {
                this.animationQueue.set(element, config);
                this.processQueue();
            }
        }, delay);
    }

    // Check if animation can execute based on performance
    canAnimateNow(config) {
        const activeAnimations = document.querySelectorAll('[data-animation].animating').length;
        const maxConcurrent = config.maxConcurrent || (this.performanceMetrics.isLowEnd ? 2 : 4);

        return activeAnimations < maxConcurrent;
    }

    // Execute Animation with Performance Monitoring
    executeAnimation(element, config) {
        element.classList.add('animating');

        if (config.sequence && config.sequence.length > 1) {
            this.executeSequence(element, config.sequence);
        } else {
            this.executeSingleAnimation(element, config);
        }

        // Cleanup after animation
        setTimeout(() => {
            element.classList.remove('animating');
            element.classList.add('animation-complete');
            this.cleanupElement(element);
        }, 1200);
    }

    // Execute Animation Sequence
    executeSequence(element, sequence) {
        sequence.forEach((animation, index) => {
            setTimeout(() => {
                element.setAttribute('data-animation', animation);
                element.classList.add('is-visible');
            }, index * 300);
        });
    }

    // Execute Single Animation
    executeSingleAnimation(element, config) {
        if (config.counterAnimation && element.matches('.stat-item')) {
            this.animateCounter(element);
        }

        element.classList.add('is-visible');
    }

    // Process Animation Queue
    processQueue() {
        if (this.animationQueue.size === 0) return;

        const [element, config] = this.animationQueue.entries().next().value;

        if (this.canAnimateNow(config)) {
            this.animationQueue.delete(element);
            this.executeAnimation(element, config);

            // Process next in queue
            setTimeout(() => this.processQueue(), 100);
        }
    }

    // Get Element Configuration
    getElementConfig(element) {
        for (const selector in this.config) {
            if (element.matches(selector) || element.closest(selector)) {
                return this.config[selector];
            }
        }
        return null;
    }

    // Initialize All Animations
    initializeAnimations() {
        for (const selector in this.config) {
            const elements = document.querySelectorAll(selector);
            const config = this.config[selector];

            elements.forEach(element => {
                this.setupElement(element, config);
            });
        }
    }

    // Setup Individual Element
    setupElement(element, config) {
        if (config.stagger && config.childSelector) {
            this.setupStaggeredAnimation(element, config);
        } else if (config.animation) {
            element.setAttribute('data-animation', config.animation);
            this.observer.observe(element);
        }
    }

    // Setup Staggered Animations with Patterns
    setupStaggeredAnimation(element, config) {
        const children = element.querySelectorAll(config.childSelector);
        if (children.length === 0) return;

        element.setAttribute('data-stagger', config.pattern || '');

        children.forEach((child, index) => {
            const delay = this.calculateStaggerDelay(index, config, children.length);
            child.setAttribute('data-animation', config.childAnimation || 'fade-in-up');
            child.style.setProperty('--stagger-delay', `${delay}ms`);
            this.observer.observe(child);
        });
    }

    // Calculate Stagger Delay with Patterns
    calculateStaggerDelay(index, config, totalItems) {
        const baseDelay = config.stagger || 100;

        switch (config.pattern) {
            case 'wave':
                return Math.sin(index / totalItems * Math.PI) * baseDelay + (index * baseDelay * 0.3);
            case 'spiral':
                return Math.pow(index / totalItems, 0.7) * baseDelay * 2;
            default:
                return index * baseDelay;
        }
    }

    // Enhanced Counter Animation
    animateCounter(element) {
        const numberEl = element.querySelector('.stat-number');
        if (!numberEl) return;

        const targetValue = parseInt(numberEl.getAttribute('data-count'), 10);
        if (isNaN(targetValue)) return;

        let currentValue = 0;
        const duration = this.performanceMetrics.isLowEnd ? 1500 : 2000;
        const steps = this.performanceMetrics.isLowEnd ? 30 : 60;
        const increment = targetValue / steps;
        const stepDuration = duration / steps;

        const updateCount = () => {
            currentValue += increment;
            if (currentValue < targetValue) {
                const suffix = numberEl.textContent.includes('%') ? '%' : '';
                numberEl.textContent = Math.ceil(currentValue) + suffix;
                setTimeout(updateCount, stepDuration);
            } else {
                const suffix = numberEl.textContent.includes('%') ? '%' : '';
                numberEl.textContent = targetValue + suffix;
            }
        };

        setTimeout(updateCount, 300);
    }

    // Parallax Effects
    setupParallaxEffects() {
        if (this.performanceMetrics.isLowEnd || window.innerWidth <= 768) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');
        let ticking = false;

        const updateParallax = () => {
            const scrollTop = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // Form Validation Animations
    setupFormValidationAnimations() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');

            inputs.forEach(input => {
                input.addEventListener('invalid', () => {
                    const formGroup = input.closest('.form-group');
                    if (formGroup) {
                        formGroup.classList.add('error');
                        setTimeout(() => formGroup.classList.remove('error'), 500);
                    }
                });

                input.addEventListener('input', () => {
                    const formGroup = input.closest('.form-group');
                    if (formGroup && input.validity.valid && input.value) {
                        formGroup.classList.add('success');
                        setTimeout(() => formGroup.classList.remove('success'), 600);
                    }
                });
            });
        });
    }

    // Carousel Integration
    setupCarouselIntegration() {
        const carousel = document.querySelector('.hero-carousel');
        if (!carousel) return;

        // Enhance carousel transitions
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        carouselItems.forEach(item => {
            item.style.transition = 'opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1)';
        });

        // Add intersection observer for carousel content
        const carouselContent = carousel.querySelectorAll('.carousel-content');
        carouselContent.forEach(content => {
            content.setAttribute('data-animation', 'fade-in-up');
            this.observer.observe(content);
        });
    }

    // Performance Monitoring
    setupPerformanceMonitoring() {
        let frameCount = 0;
        let lastTime = performance.now();

        const monitorPerformance = () => {
            frameCount++;
            const currentTime = performance.now();

            if (currentTime >= lastTime + 1000) {
                this.performanceMetrics.fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

                // Adjust animation complexity based on FPS
                if (this.performanceMetrics.fps < 30) {
                    this.degradePerformance();
                }

                frameCount = 0;
                lastTime = currentTime;
            }

            requestAnimationFrame(monitorPerformance);
        };

        requestAnimationFrame(monitorPerformance);
    }

    // Degrade Performance for Low FPS
    degradePerformance() {
        document.documentElement.classList.add('performance-mode');

        // Reduce concurrent animations
        this.config = Object.fromEntries(
            Object.entries(this.config).map(([key, value]) => [
                key,
                { ...value, maxConcurrent: 1, stagger: value.stagger * 2 }
            ])
        );
    }

    // Memory Cleanup
    cleanupElement(element) {
        // Remove will-change and other performance hints
        element.style.willChange = 'auto';
        element.style.backfaceVisibility = 'visible';
        element.style.perspective = 'none';
        element.style.transformStyle = 'flat';

        // Clear transition delays
        element.style.removeProperty('--stagger-delay');
    }

    // Public API for External Integration
    animateElement(element, animation, options = {}) {
        if (this.performanceMetrics.prefersReducedMotion) return;

        const config = { animation, ...options };
        this.queueAnimation(element, config);
    }

    // Destroy and Cleanup
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }

        this.animationQueue.clear();

        // Cleanup all animated elements
        document.querySelectorAll('[data-animation]').forEach(element => {
            this.cleanupElement(element);
        });
    }
}

// Initialize Animation Engine
document.addEventListener('DOMContentLoaded', () => {
    window.chembotweAnimations = new ChembotweAnimationEngine();
});

// Handle Dynamic Content
const handleDynamicContent = (mutations) => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.querySelector('[data-animation]')) {
                window.chembotweAnimations.initializeAnimations();
            }
        });
    });
};

// Observe for dynamic content
const contentObserver = new MutationObserver(handleDynamicContent);
contentObserver.observe(document.body, { childList: true, subtree: true });

// Export for global access
window.ChembotweAnimationEngine = ChembotweAnimationEngine;