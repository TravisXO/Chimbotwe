/**
 * =================================================================================================
 * Premium Scroll Animations for Chembotwe Mattresses
 * Version: 2.0.0
 * Author: Gemini AI
 * Description: This script uses the Intersection Observer API to apply a suite of curated, elegant
 * animations to elements as they enter the viewport. It's designed to create a
 * "royal" user experience through controlled, non-random, and performant animations.
 * =================================================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * ---------------------------------------------------------------------------------------------
     * MASTER ANIMATION CONFIGURATION
     * ---------------------------------------------------------------------------------------------
     * This object defines the animation behavior for each major section and element group.
     * This centralized control ensures a deliberately curated, non-random experience.
     *
     * Properties:
     * - selector: The CSS selector for the target element(s).
     * - animation: The `data-animation` type to apply (from premium-animations.css).
     * - threshold: A value from 0.0 to 1.0. Determines how much of the element must be
     * visible before the animation triggers. 0.1 means 10% visible.
     * - stagger: (For parent containers) The delay in milliseconds between each child's animation.
     * - childSelector: The selector for the children to be staggered within the parent.
     * - childAnimation: The animation type to apply to each staggered child.
     * - repeat: (boolean) If true, the animation will re-trigger every time it enters the viewport.
     * - callback: A function to execute after the element becomes visible.
     * ---------------------------------------------------------------------------------------------
     */
    const animationConfig = [
        // --- Banner Section ---
        // The image slides in from the left, the content from the right.
        {
            selector: '.banner-section .banner-image',
            animation: 'reveal-from-left',
            threshold: 0.4
        }, {
            selector: '.banner-section .banner-content',
            animation: 'fade-in-right',
            threshold: 0.4
        },

        // --- Products Section ---
        // Header fades in from the top.
        {
            selector: '.products-section .section-header',
            animation: 'fade-in-down',
            threshold: 0.8
        },
        // Filter buttons stagger in from the bottom.
        {
            selector: '.products-section .category-filter',
            stagger: 80,
            threshold: 0.9,
            childSelector: '.filter-btn',
            childAnimation: 'fade-in-up'
        },
        // Product cards have a staggered zoom-in effect.
        {
            selector: '.products-section .products-grid',
            stagger: 100,
            threshold: 0.1,
            childSelector: '.product-card',
            childAnimation: 'zoom-in'
        },

        // --- About Section ---
        // Text content reveals from the right.
        {
            selector: '#about .about-text',
            animation: 'reveal-from-right',
            threshold: 0.4,
            duration: 'slow'
        },
        // Stat items punch in with a staggered effect and trigger a number count.
        {
            selector: '#about .about-stats',
            stagger: 150,
            threshold: 0.4,
            childSelector: '.stat-item',
            childAnimation: 'fade-in-up',
            callback: (element) => {
                const numberEl = element.querySelector('.stat-number');
                if (numberEl) animateCounter(numberEl);
            }
        },

        // --- Testimonials Section ---
        {
            selector: '#testimonials .section-header',
            animation: 'fade-in-down',
            threshold: 0.8
        },
        // Testimonial cards slide up with an elegant stagger.
        {
            selector: '#testimonials .testimonials-grid',
            stagger: 200,
            threshold: 0.2,
            childSelector: '.testimonial-card',
            childAnimation: 'fade-in-up'
        },

        // --- Benefits Section ---
        {
            selector: '.benefits-section .section-header',
            animation: 'fade-in-down',
            threshold: 0.8
        },
        // Benefit cards use a unique rotation effect.
        {
            selector: '.benefits-section .benefits-grid',
            stagger: 150,
            threshold: 0.2,
            childSelector: '.benefit-card',
            childAnimation: 'rotate-in-left'
        },

        // --- Contact Section ---
        // The two columns slide in from opposite sides.
        {
            selector: '#contact .contact-info',
            animation: 'fade-in-left',
            threshold: 0.2
        }, {
            selector: '#contact .contact-form-container',
            animation: 'fade-in-right',
            threshold: 0.2
        },
    ];


    /**
     * ---------------------------------------------------------------------------------------------
     * INTERSECTION OBSERVER INITIALIZATION
     * ---------------------------------------------------------------------------------------------
     * A single IntersectionObserver is used for performance. It watches all elements
     * that are configured for animation.
     * ---------------------------------------------------------------------------------------------
     */
    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const config = findConfigForElement(target);

                // Apply the 'is-visible' class to trigger the CSS animation.
                target.classList.add('is-visible');

                // Execute a callback function if one is defined in the config.
                if (config && config.callback && typeof config.callback === 'function') {
                    config.callback(target);
                }

                // If the animation is not set to repeat, unobserve the element
                // to prevent re-animation and save resources.
                if (!config || !config.repeat) {
                    observerInstance.unobserve(target);
                }
            } else {
                // Optional: If repeating is enabled, remove the class when out of view.
                const target = entry.target;
                const config = findConfigForElement(target);
                if (config && config.repeat) {
                    target.classList.remove('is-visible');
                }
            }
        });
    });


    /**
     * ---------------------------------------------------------------------------------------------
     * ANIMATION SETUP & INITIALIZATION
     * ---------------------------------------------------------------------------------------------
     * This function iterates through the master configuration object and prepares
     * each element for animation by setting its data attributes and adding it to the
     * Intersection Observer's watch list.
     * ---------------------------------------------------------------------------------------------
     */
    const initializeAnimations = () => {
        // A map to quickly find the config for an observed element.
        const elementConfigMap = new WeakMap();

        animationConfig.forEach(config => {
            const elements = document.querySelectorAll(config.selector);

            elements.forEach(element => {
                // Handle staggered animations for child elements.
                if (config.stagger) {
                    const children = element.querySelectorAll(config.childSelector);
                    if (children.length > 0) {
                        element.setAttribute('data-stagger', '');
                        children.forEach((child, index) => {
                            // Prepare child element for animation.
                            const childConfig = {
                                ...config,
                                animation: config.childAnimation || 'fade-in-up'
                            };
                            child.setAttribute('data-animation', childConfig.animation);
                            child.style.transitionDelay = `${index * config.stagger}ms`;

                            // Store config and observe.
                            elementConfigMap.set(child, childConfig);
                            observer.observe(child);
                        });
                    }
                }
                // Handle single element animations.
                else if (config.animation) {
                    element.setAttribute('data-animation', config.animation);

                    // Store config and observe.
                    elementConfigMap.set(element, config);
                    observer.observe(element);
                }
            });
        });

        // Attach the map to the observer instance for easy access in the callback.
        observer.elementConfigMap = elementConfigMap;
    };

    /**
     * Helper function to retrieve the configuration for a given element.
     * @param {Element} element - The DOM element to find the config for.
     * @returns {object|null} The configuration object or null if not found.
     */
    const findConfigForElement = (element) => {
        return observer.elementConfigMap ? observer.elementConfigMap.get(element) : null;
    };


    /**
     * ---------------------------------------------------------------------------------------------
     * STATS COUNTER ANIMATION
     * ---------------------------------------------------------------------------------------------
     * Animates a number from 0 to a target value.
     * @param {HTMLElement} element - The element containing the number to animate.
     * ---------------------------------------------------------------------------------------------
     */
    const animateCounter = (element) => {
        const targetValue = parseInt(element.getAttribute('data-count'), 10);
        const suffix = element.textContent.replace(/[0-9]/g, '').trim(); // Gets '+', '%' etc.

        if (isNaN(targetValue)) {
            console.error("Invalid data-count value on element:", element);
            return;
        }

        let currentValue = 0;
        const duration = 2500; // Animation duration in milliseconds
        const startTime = performance.now();

        const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

        const step = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeOutExpo(progress);

            currentValue = Math.floor(easedProgress * targetValue);

            element.textContent = currentValue.toLocaleString('en-US') + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = targetValue.toLocaleString('en-US') + suffix;
            }
        };

        requestAnimationFrame(step);
    };


    /**
     * ---------------------------------------------------------------------------------------------
     * SCRIPT EXECUTION
     * ---------------------------------------------------------------------------------------------
     * Run the main initialization function once the DOM is ready.
     * ---------------------------------------------------------------------------------------------
     */
    initializeAnimations();

});
