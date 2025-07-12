// Chembotwe Mattresses - Production JavaScript
// Version: 2.1.0 (Fixed preloader logic)

(function () {
    'use strict';

    // Application State
    const AppState = {
        currentCategory: 'all',
        isMenuOpen: false,
        isScrolled: false,
        products: [],
        filteredProducts: [],
        currentSlide: 1,
        totalSlides: 3
    };

    // Product Data
    const ProductData = {
        'manal-quilted-king': {
            name: 'Manal Quilted Bases King Size',
            price: 'ZMW 12,500',
            category: 'mattresses',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/manallady.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/manal-m1.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/manal-m2.jpeg'],
            description: 'Premium quilted king size mattress with superior comfort and durability. Features high-density foam and quilted top for optimal sleep experience.',
            features: ['King Size (6ft x 6ft)', 'Quilted Top Layer', 'High-Density Foam', 'Anti-Bacterial Treatment', '10-Year Warranty'],
            specifications: {
                'Size': 'King (180cm x 200cm)',
                'Thickness': '10 inches',
                'Material': 'High-Density Foam',
                'Firmness': 'Medium-Firm',
                'Weight': '45kg'
            }
        },
        'manal-dunlop-queen': {
            name: 'Manal Dunlop Queen Size',
            price: 'ZMW 2,740',
            category: 'mattresses',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Optmattress.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Optbed2.jpeg'],
            description: 'Quality queen size mattress with Dunlop latex for natural comfort and excellent support.',
            features: ['Queen Size (5ft x 6ft)', 'Dunlop Latex', 'Natural Materials', 'Breathable Design', '7-Year Warranty'],
            specifications: {
                'Size': 'Queen (150cm x 200cm)',
                'Thickness': '8 inches',
                'Material': 'Dunlop Latex',
                'Firmness': 'Medium',
                'Weight': '35kg'
            }
        },
        'spring-mattress-bd': {
            name: 'Spring Mattress BD',
            price: 'ZMW 13,000',
            category: 'beds',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/ManalPromo.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/whitebed.jpeg'],
            description: 'Complete bed set with spring mattress for ultimate comfort and style.',
            features: ['Complete Bed Set', 'Pocket Spring System', 'Wooden Frame', 'Modern Design', '8-Year Warranty'],
            specifications: {
                'Size': 'Double (120cm x 200cm)',
                'Thickness': '12 inches',
                'Material': 'Pocket Springs + Foam',
                'Firmness': 'Firm',
                'Weight': '60kg'
            }
        },
        'manal-king': {
            name: 'Manal King Size',
            price: 'ZMW 15,000',
            category: 'mattresses',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/mattress3.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/ManalKSB.jpeg'],
            description: 'Premium king size mattress with advanced comfort technology.',
            features: ['King Size', 'Memory Foam Top', 'Cooling Technology', 'Edge Support', '12-Year Warranty'],
            specifications: {
                'Size': 'King (180cm x 200cm)',
                'Thickness': '14 inches',
                'Material': 'Memory Foam + Springs',
                'Firmness': 'Medium-Soft',
                'Weight': '55kg'
            }
        },
        'urest-8inch': {
            name: 'Urest 8inch Set',
            price: 'ZMW 3,100',
            category: 'beds',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/RedMattress1.1.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Greenmattress1.2.jpeg'],
            description: 'Complete 8-inch mattress and bed set for comfortable sleep.',
            features: ['8-inch Thickness', 'Complete Set', 'Multiple Colors', 'Affordable Quality', '5-Year Warranty'],
            specifications: {
                'Size': 'Double (120cm x 200cm)',
                'Thickness': '8 inches',
                'Material': 'High-Density Foam',
                'Firmness': 'Medium',
                'Weight': '30kg'
            }
        },
        'urest-6inch': {
            name: 'Urest 6 inch Set',
            price: 'ZMW 2,850',
            category: 'beds',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Urest6inch.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Greenmattress1.2.jpeg'],
            description: 'Compact 6-inch mattress set perfect for smaller spaces and budget-conscious buyers.',
            features: ['6-inch Thickness', 'Space Saving', 'Lightweight', 'Easy Setup', '3-Year Warranty'],
            specifications: {
                'Size': 'Double (120cm x 200cm)',
                'Thickness': '6 inches',
                'Material': 'High-Density Foam',
                'Firmness': 'Firm',
                'Weight': '25kg'
            }
        },
        'manal-continental-pillow': {
            name: 'Manal Continental Pillow',
            price: 'ZMW 250',
            category: 'pillows',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Pillow2.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Pillow4.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Pillow3.jpeg'],
            description: 'High-quality continental pillow for superior neck and head support.',
            features: ['Continental Size', 'High-Density Fill', 'Hypoallergenic', 'Machine Washable', '2-Year Warranty'],
            specifications: {
                'Size': '50cm x 70cm',
                'Fill': 'Polyester Fiber',
                'Cover': '100% Cotton',
                'Weight': '1.2kg',
                'Care': 'Machine Washable'
            }
        },
        '6inch-cushions': {
            name: '6 inch Cushions',
            price: 'ZMW 85',
            category: 'accessories',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/3cushion.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/1cushion.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/cushion4.jpeg'],
            description: 'Comfortable 6-inch cushions available in various colors for your seating needs.',
            features: ['6-inch Thickness', 'Multiple Colors', 'Durable Cover', 'Comfortable Fill', '1-Year Warranty'],
            specifications: {
                'Size': '45cm x 45cm',
                'Thickness': '6 inches',
                'Material': 'Foam + Fabric Cover',
                'Colors': 'Multiple Options',
                'Weight': '0.8kg'
            }
        },
        'classic-comfort-double': {
            name: 'Classic Comfort Double Bed',
            price: 'ZMW 7,500',
            category: 'beds',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Urestm-2.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/GreyBed.jpeg'],
            description: 'Classic comfort mattress and bed in double size for excellent value and comfort.',
            features: ['Double Bed Set', 'Classic Design', 'Comfortable Mattress', 'Sturdy Frame', '5-Year Warranty'],
            specifications: {
                'Size': 'Double (120cm x 200cm)',
                'Thickness': '8 inches',
                'Material': 'Foam + Spring',
                'Firmness': 'Medium',
                'Weight': '50kg'
            }
        },
        'urest-quilted': {
            name: 'Urest Quilted Mattress & Bed',
            price: 'ZMW 6,500',
            category: 'beds',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/UrestKS.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/kingsize.jpeg'],
            description: 'Urest quilted mattress with matching bed frame for comfortable sleep.',
            features: ['Quilted Design', 'Complete Set', 'King Size', 'Quality Construction', '6-Year Warranty'],
            specifications: {
                'Size': 'King (180cm x 200cm)',
                'Thickness': '10 inches',
                'Material': 'Quilted Foam',
                'Firmness': 'Medium-Firm',
                'Weight': '45kg'
            }
        },
        'urest-king-set': {
            name: 'Urest King Set',
            price: 'ZMW 6,500',
            category: 'beds',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/URestBlue.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/UrestGreen.jpeg'],
            description: 'Complete king size bed set in multiple color options.',
            features: ['King Size Set', 'Multiple Colors', 'Complete Package', 'Modern Design', '5-Year Warranty'],
            specifications: {
                'Size': 'King (180cm x 200cm)',
                'Thickness': '8 inches',
                'Material': 'High-Density Foam',
                'Colors': 'Blue, Green',
                'Weight': '40kg'
            }
        },
        'manal-8inch-hd': {
            name: 'Manal 8 inch High Density',
            price: 'ZMW 3,100',
            category: 'beds',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Floral.jpeg'],
            description: 'Manal 8 inch high density bed and mattress set with floral design.',
            features: ['8-inch High Density', 'Floral Design', 'Complete Set', 'Quality Materials', '4-Year Warranty'],
            specifications: {
                'Size': 'Double (120cm x 200cm)',
                'Thickness': '8 inches',
                'Material': 'High-Density Foam',
                'Pattern': 'Floral',
                'Weight': '35kg'
            }
        },
        'urest-camping': {
            name: 'Urest 2inch Camping Mattress',
            price: 'ZMW 550',
            category: 'mattresses',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/FoldMattress.jpeg'],
            description: 'Portable 2-inch camping mattress, perfect for outdoor adventures and travel.',
            features: ['Portable Design', 'Foldable', 'Lightweight', 'Easy Storage', '2-Year Warranty'],
            specifications: {
                'Size': 'Single (90cm x 190cm)',
                'Thickness': '2 inches',
                'Material': 'Foam',
                'Weight': '3kg',
                'Use': 'Camping/Travel'
            }
        },
        'sofa-cum-bed': {
            name: '2in1 Sofa Cum Bed',
            price: 'ZMW 3,100',
            category: 'beds',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/SofaCum.jpeg'],
            description: 'Versatile 2-in-1 sofa that converts to a double bed, perfect for small spaces.',
            features: ['2-in-1 Design', 'Space Saving', 'Easy Conversion', 'Modern Style', '3-Year Warranty'],
            specifications: {
                'Size': 'Double when extended',
                'Thickness': '6 inches',
                'Material': 'Foam + Fabric',
                'Function': 'Sofa + Bed',
                'Weight': '25kg'
            }
        },
        'tusha-8inch': {
            name: 'Tusha High Density 8inch',
            price: 'ZMW 1,250',
            category: 'mattresses',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/mattress1.jpeg'],
            description: 'Affordable Tusha high density 8-inch mattress for comfortable sleep.',
            features: ['High Density Foam', '8-inch Thickness', 'Affordable Quality', 'Durable', '3-Year Warranty'],
            specifications: {
                'Size': 'Double (120cm x 200cm)',
                'Thickness': '8 inches',
                'Material': 'High-Density Foam',
                'Firmness': 'Firm',
                'Weight': '20kg'
            }
        },
        'tusha-3quarter': {
            name: 'Tusha 3/4 Mattress',
            price: 'ZMW 1,050',
            category: 'mattresses',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/LimeMattress.jpeg'],
            description: 'Compact 3/4 size Tusha mattress perfect for smaller beds and rooms.',
            features: ['3/4 Size', 'High Density', 'Space Efficient', 'Quality Foam', '3-Year Warranty'],
            specifications: {
                'Size': '3/4 (100cm x 200cm)',
                'Thickness': '8 inches',
                'Material': 'High-Density Foam',
                'Color': 'Lime Green',
                'Weight': '18kg'
            }
        },
        'manal-pillow-deluxe': {
            name: 'Manal Continental Pillow Deluxe',
            price: 'ZMW 250',
            category: 'pillows',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Pillow4.jpeg'],
            description: 'Deluxe continental pillow from Manal with premium comfort and support.',
            features: ['Continental Size', 'Premium Fill', 'Deluxe Quality', 'Soft Cover', '2-Year Warranty'],
            specifications: {
                'Size': '50cm x 70cm',
                'Fill': 'Premium Polyester',
                'Cover': 'Cotton Blend',
                'Type': 'Continental',
                'Weight': '1.3kg'
            }
        },
        'medium-quality-pillows': {
            name: 'Medium Quality Pillows',
            price: 'ZMW 85',
            category: 'pillows',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Redbluepillow.jpeg'],
            description: 'Medium quality pillows in red and blue colors for comfortable sleep.',
            features: ['Medium Quality', 'Multiple Colors', 'Standard Size', 'Affordable', '1-Year Warranty'],
            specifications: {
                'Size': '45cm x 65cm',
                'Fill': 'Polyester Fiber',
                'Colors': 'Red, Blue',
                'Type': 'Standard',
                'Weight': '0.8kg'
            }
        },
        'pet-bed-small': {
            name: 'Pet Bed',
            price: 'ZMW 250',
            category: 'accessories',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Petbed1.jpeg'],
            description: 'Comfortable pet bed for small to medium sized pets.',
            features: ['Pet Friendly', 'Comfortable Padding', 'Easy to Clean', 'Durable', '1-Year Warranty'],
            specifications: {
                'Size': 'Small/Medium pets',
                'Material': 'Foam + Fabric',
                'Washable': 'Yes',
                'Shape': 'Round',
                'Weight': '1kg'
            }
        },
        'pet-bed-large': {
            name: 'Pet Bed Large',
            price: 'ZMW 275',
            category: 'accessories',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Petbed2.jpeg'],
            description: 'Large pet bed suitable for bigger dogs and multiple pets.',
            features: ['Large Size', 'Extra Comfort', 'Durable Construction', 'Easy Maintenance', '1-Year Warranty'],
            specifications: {
                'Size': 'Large pets',
                'Material': 'Foam + Durable Fabric',
                'Washable': 'Yes',
                'Shape': 'Rectangular',
                'Weight': '1.5kg'
            }
        },
        'side-table': {
            name: 'Pillow Top Side Table',
            price: 'ZMW 580',
            category: 'accessories',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/basket.jpeg', 'https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Corneertable.jpeg'],
            description: 'Stylish pillow top side table with storage basket functionality.',
            features: ['Storage Function', 'Pillow Top', 'Multi-Purpose', 'Space Saving', '2-Year Warranty'],
            specifications: {
                'Type': 'Side Table',
                'Material': 'Wood + Cushion',
                'Storage': 'Yes',
                'Color': 'Natural',
                'Weight': '8kg'
            }
        },
        'pillow-top-spring': {
            name: 'Pillow Top Spring Set',
            price: 'ZMW 21,500',
            category: 'beds',
            images: ['https://chimbotwe-matresses.github.io/ChimbotweMattresses-GeneralDealers/Bigbed.jpeg'],
            description: 'Premium pillow top spring set - our flagship luxury bed for ultimate comfort.',
            features: ['Luxury Pillow Top', 'Premium Springs', 'King Size', 'Ultimate Comfort', '15-Year Warranty'],
            specifications: {
                'Size': 'King (200cm x 200cm)',
                'Thickness': '16 inches',
                'Material': 'Premium Springs + Pillow Top',
                'Firmness': 'Luxury Soft',
                'Weight': '80kg'
            }
        }
    };

    // DOM Elements
    const DOMElements = {
        preloader: null,
        navbar: null,
        navToggle: null,
        navMenu: null,
        filterButtons: null,
        productsGrid: null,
        loadMoreBtn: null,
        contactForm: null,
        modal: null,
        modalClose: null,
        modalBody: null,
        whatsappFloat: null,
        backToTopBtn: null
    };

    // Initialize Application
    function init() {
        cacheDOMElements();
        managePreloader();
        bindEvents();
        initializeComponents();
        handleInitialLoad();
    }

    // Cache DOM Elements
    function cacheDOMElements() {
        DOMElements.preloader = document.getElementById('preloader');
        DOMElements.navbar = document.getElementById('navbar');
        DOMElements.navToggle = document.getElementById('nav-toggle');
        DOMElements.navMenu = document.getElementById('nav-menu');
        DOMElements.filterButtons = document.querySelectorAll('.filter-btn');
        DOMElements.productsGrid = document.getElementById('products-grid');
        DOMElements.loadMoreBtn = document.getElementById('load-more-btn');
        DOMElements.contactForm = document.getElementById('contact-form');
        DOMElements.modal = document.getElementById('product-modal');
        DOMElements.modalClose = document.querySelector('.modal-close');
        DOMElements.modalBody = document.getElementById('modal-body');
        DOMElements.whatsappFloat = document.querySelector('.whatsapp-float');
        DOMElements.backToTopBtn = document.getElementById('back-to-top');
    }

    // Bind Event Listeners
    function bindEvents() {
        if (DOMElements.navToggle) DOMElements.navToggle.addEventListener('click', toggleMobileMenu);
        window.addEventListener('scroll', handleScroll);
        DOMElements.filterButtons.forEach(button => button.addEventListener('click', handleCategoryFilter));
        if (DOMElements.loadMoreBtn) DOMElements.loadMoreBtn.addEventListener('click', loadMoreProducts);
        if (DOMElements.contactForm) DOMElements.contactForm.addEventListener('submit', handleContactForm);
        if (DOMElements.modalClose) DOMElements.modalClose.addEventListener('click', closeModal);
        if (DOMElements.modal) DOMElements.modal.addEventListener('click', (e) => {
            if (e.target === DOMElements.modal.querySelector('.modal-backdrop')) closeModal();
        });
        document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', handleSmoothScroll));
        window.addEventListener('resize', debounce(handleResize, 250));
        document.addEventListener('keydown', handleKeyboardEvents);
    }

    // Initialize Components
    function initializeComponents() {
        initializeAnimations();
        initializeIntersectionObserver();
        initializeCarousel();
    }

    // Preloader Management
    function managePreloader() {
        window.addEventListener('load', () => {
            if (DOMElements.preloader) {
                DOMElements.preloader.classList.add('hidden');
            }
        });

        // Fallback to hide preloader after a timeout
        setTimeout(() => {
            if (DOMElements.preloader && !DOMElements.preloader.classList.contains('hidden')) {
                DOMElements.preloader.classList.add('hidden');
            }
        }, 4000);
    }

    // Handle Initial Load Animations
    function handleInitialLoad() {
        setTimeout(() => {
            document.querySelector('.hero-content')?.classList.add('fade-in');
        }, 100);
        initializeLazyLoading();
    }

    // Navigation Functions
    function toggleMobileMenu() {
        AppState.isMenuOpen = !AppState.isMenuOpen;
        DOMElements.navMenu.classList.toggle('active');
        DOMElements.navToggle.classList.toggle('active');
        document.body.style.overflow = AppState.isMenuOpen ? 'hidden' : '';
    }

    function closeMobileMenu() {
        if (!AppState.isMenuOpen) return;
        AppState.isMenuOpen = false;
        DOMElements.navMenu.classList.remove('active');
        DOMElements.navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Scroll Handling
    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const shouldShowScrolled = scrollTop > 50;

        if (shouldShowScrolled !== AppState.isScrolled) {
            AppState.isScrolled = shouldShowScrolled;
            DOMElements.navbar.classList.toggle('scrolled', AppState.isScrolled);
        }

        if (DOMElements.backToTopBtn) {
            DOMElements.backToTopBtn.classList.toggle('visible', scrollTop > 300);
        }

        if (AppState.isMenuOpen) closeMobileMenu();
    }

    // Back to Top Function
    window.scrollToTop = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Smooth Scrolling
    function handleSmoothScroll(e) {
        const targetId = this.getAttribute('href');
        if (targetId.length <= 1) return;

        e.preventDefault();
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - (DOMElements.navbar.offsetHeight || 70);
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
        closeMobileMenu();
    }

    // Product Filtering
    function handleCategoryFilter(e) {
        const category = e.currentTarget.getAttribute('data-category');
        if (category === AppState.currentCategory) return;

        DOMElements.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');

        AppState.currentCategory = category;
        filterProducts(category);
    }

    function filterProducts(category) {
        const productCards = DOMElements.productsGrid.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = category === 'all' || cardCategory === category;
            card.style.display = shouldShow ? 'flex' : 'none';
        });
    }

    // Carousel Functions
    function initializeCarousel() {
        setInterval(() => changeSlide(1), 5000);
    }

    window.changeSlide = function (direction) {
        const slides = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');
        if (slides.length === 0) return;

        slides[AppState.currentSlide - 1].classList.remove('active');
        indicators[AppState.currentSlide - 1].classList.remove('active');

        AppState.currentSlide = (AppState.currentSlide - 1 + direction + AppState.totalSlides) % AppState.totalSlides + 1;

        slides[AppState.currentSlide - 1].classList.add('active');
        indicators[AppState.currentSlide - 1].classList.add('active');
    }

    window.currentSlide = function (slideNumber) {
        const slides = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');
        if (slides.length === 0) return;

        slides[AppState.currentSlide - 1].classList.remove('active');
        indicators[AppState.currentSlide - 1].classList.remove('active');

        AppState.currentSlide = slideNumber;

        slides[AppState.currentSlide - 1].classList.add('active');
        indicators[AppState.currentSlide - 1].classList.add('active');
    }

    // Load More Products
    function loadMoreProducts() {
        DOMElements.loadMoreBtn.classList.add('loading');
        DOMElements.loadMoreBtn.firstElementChild.textContent = 'Loading...';

        setTimeout(() => {
            DOMElements.loadMoreBtn.classList.remove('loading');
            DOMElements.loadMoreBtn.firstElementChild.textContent = 'No More Products';
            DOMElements.loadMoreBtn.disabled = true;
        }, 1500);
    }

    // Product Modal Functions
    window.openProductModal = function (productId) {
        const product = ProductData[productId];
        if (!product) return;

        const modalContent = generateModalContent(product);
        DOMElements.modalBody.innerHTML = modalContent;
        DOMElements.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        DOMElements.modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function generateModalContent(product) {
        return `
            <div class="modal-product">
                <div class="modal-gallery">
                    <div class="main-image">
                        <img id="modal-main-image" src="${product.images[0]}" alt="${product.name}">
                    </div>
                    <div class="thumbnail-images">
                        ${product.images.map((img, index) => `
                            <img src="${img}" alt="${product.name} ${index + 1}" 
                                 class="thumbnail ${index === 0 ? 'active' : ''}"
                                 onclick="changeModalImage('${img}', this)">
                        `).join('')}
                    </div>
                </div>
                <div class="modal-info">
                    <h2>${product.name}</h2>
                    <div class="modal-price">${product.price}</div>
                    <p class="modal-description">${product.description}</p>
                    <div class="modal-features">
                        <h3>Key Features</h3>
                        <ul>${product.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
                    </div>
                    <div class="modal-specifications">
                        <h3>Specifications</h3>
                        <div class="spec-grid">
                            ${Object.entries(product.specifications).map(([key, value]) => `
                                <div class="spec-item">
                                    <span class="spec-label">${key}:</span>
                                    <span class="spec-value">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="requestQuote('${product.name}')">Request Quote</button>
                        <a href="https://wa.me/260966100125?text=I'm interested in ${encodeURIComponent(product.name)}" class="btn btn-secondary" target="_blank">WhatsApp Now</a>
                    </div>
                </div>
            </div>`;
    }

    window.changeModalImage = function (imageSrc, thumbnail) {
        document.getElementById('modal-main-image').src = imageSrc;
        document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    };

    // Contact Form Handling
    function handleContactForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (!validateFormData(data)) return;

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.firstElementChild.textContent;
        submitBtn.firstElementChild.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            const message = createWhatsAppMessage(data);
            const whatsappUrl = `https://wa.me/260966100125?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            e.target.reset();
            showNotification('Your quote request will be sent via WhatsApp!', 'success');
            submitBtn.firstElementChild.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    }

    function validateFormData(data) {
        if (!data.name || !data.phone || !data.product) {
            showNotification('Please fill in all required fields.', 'error');
            return false;
        }
        if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(data.phone)) {
            showNotification('Please enter a valid phone number.', 'error');
            return false;
        }
        return true;
    }

    function createWhatsAppMessage(data) {
        return `Hello! I would like to request a quote.\n\nName: ${data.name}\nPhone: ${data.phone}\nProduct Interest: ${data.product}${data.budget ? `\nBudget: ${data.budget}` : ''}${data.message ? `\nMessage: ${data.message}` : ''}\n\nThank you!`;
    }

    window.requestQuote = function (productName) {
        const message = `Hello! I'm interested in the ${productName}. Could you please provide me with more information?`;
        window.open(`https://wa.me/260966100125?text=${encodeURIComponent(message)}`, '_blank');
    };

    // Animation Functions
    function initializeAnimations() {
        const elementsToAnimate = document.querySelectorAll('.product-card, .benefit-card, .about-feature, .testimonial-card, .stat-item');
        elementsToAnimate.forEach(el => el.classList.add('fade-in'));
    }

    function initializeIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }

    // Lazy Loading for Images
    function initializeLazyLoading() {
        if (!('IntersectionObserver' in window)) return;

        const imageObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    obs.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => imageObserver.observe(img));
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

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    // Resize Handler
    function handleResize() {
        if (window.innerWidth > 768 && AppState.isMenuOpen) closeMobileMenu();
    }

    // Keyboard Event Handler
    function handleKeyboardEvents(e) {
        if (e.key === 'Escape') {
            if (DOMElements.modal.style.display === 'block') closeModal();
            if (AppState.isMenuOpen) closeMobileMenu();
        }
    }

    // Inject Notification Styles
    function injectNotificationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem; border-radius: 0.5rem;
                color: white; font-weight: 600; z-index: 9999; opacity: 0;
                transform: translateX(100px); transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            }
            .notification.show { opacity: 1; transform: translateX(0); }
            .notification-success { background-color: var(--success-color); }
            .notification-error { background-color: var(--error-color); }
            .notification-info { background-color: var(--primary-color); }
        `;
        document.head.appendChild(style);
    }

    // Initialize on DOM Content Loaded
    document.addEventListener('DOMContentLoaded', () => {
        init();
        injectNotificationStyles();
    });

})();
