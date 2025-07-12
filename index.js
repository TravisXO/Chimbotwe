// Chimbotwe Mattresses - Essential JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }
    });

    // Back to top functionality
    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Product filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter products with animation
            productItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || document.getElementById('name').value;
            const phone = formData.get('phone') || document.getElementById('phone').value;
            const product = formData.get('product') || document.getElementById('product').value;
            const message = formData.get('message') || document.getElementById('message').value;

            // Create WhatsApp message
            const whatsappMessage = `Hello! I'm interested in your products.
            
Name: ${name}
Phone: ${phone}
Product Interest: ${product}
Message: ${message}

Please contact me for more information.`;

            const whatsappURL = `https://wa.me/260966100125?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');

            // Show success message
            showNotification('Thank you! Your message has been sent via WhatsApp.', 'success');
            this.reset();
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.product-card, .testimonial-card, .benefit-card, .about-stats .stat-item');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Counter animation for stats
    const countElements = document.querySelectorAll('.stat-item h3');
    const countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    countElements.forEach(el => {
        countObserver.observe(el);
    });

    // Carousel touch support for mobile
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', function (e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                const carouselInstance = bootstrap.Carousel.getInstance(carousel);
                if (diff > 0) {
                    carouselInstance.next();
                } else {
                    carouselInstance.prev();
                }
            }
        }
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });

    // Mobile menu enhancements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function () {
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                    navbarToggler.classList.remove('active');
                }
            }
        });
    }
});

// Utility functions
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        const suffix = element.textContent.includes('%') ? '%' :
            element.textContent.includes('+') ? '+' : '';
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function viewProduct() {
    showNotification('Product details coming soon! Please contact us for more information.', 'info');
}

function requestQuote(productName) {
    const message = `Hello! I'm interested in getting a quote for: ${productName}. Please provide me with more details and pricing information.`;
    const whatsappURL = `https://wa.me/260966100125?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .navbar-toggler.active .toggler-icon:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .navbar-toggler.active .toggler-icon:nth-child(2) {
        opacity: 0;
    }
    
    .navbar-toggler.active .toggler-icon:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .product-item {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);