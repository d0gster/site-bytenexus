// ByteNexus - Main JavaScript Module
// Clean Code Architecture with ES6+ modules

class ByteNexusApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupCarousel();
        this.setupForms();
        this.setupAccessibility();
    }

    // Navigation Module
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const menuBtn = document.getElementById('menuBtn');
        const navMenuMobile = document.getElementById('navMenuMobile');

        // Scroll effect
        window.addEventListener('scroll', () => {
            navbar?.classList.toggle('nav-scrolled', window.scrollY > 50);
        });

        // Mobile menu
        menuBtn?.addEventListener('click', () => {
            const isOpen = navMenuMobile?.classList.contains('open');
            menuBtn.classList.toggle('active');
            navMenuMobile?.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', !isOpen);
            
            if (!isOpen) {
                navMenuMobile?.querySelector('a')?.focus();
            }
        });

        // Close mobile menu
        navMenuMobile?.querySelectorAll('a[data-close-menu]').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn?.classList.remove('active');
                navMenuMobile?.classList.remove('open');
                menuBtn?.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on outside click
        navMenuMobile?.addEventListener('click', (e) => {
            if (e.target === navMenuMobile) {
                menuBtn?.classList.remove('active');
                navMenuMobile?.classList.remove('open');
                menuBtn?.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Carousel Module
    setupCarousel() {
        const carouselContainer = document.getElementById('carouselContainer');
        if (!carouselContainer) return;

        const carouselData = [
            {
                image: 'https://placehold.co/600x400/1e293b/d1d5db?text=NOVO+Headset',
                title: 'Headset "Synapse" Lançamento!',
                description: 'Áudio imersivo 7.1 e microfone com cancelamento de ruído.',
                link: 'produtos.html'
            },
            {
                image: 'https://placehold.co/600x400/1e293b/d1d5db?text=Placa+de+Vídeo+Cyber',
                title: 'GPU "Arcade" Edição Limitada',
                description: 'Placa de vídeo com design futurista e performance 4K.',
                link: 'produtos.html'
            },
            {
                image: 'https://placehold.co/600x400/1e293b/d1d5db?text=Mesa+Gamer',
                title: 'Mesa Gamer Modular "Grid"',
                description: 'Mesa modular com iluminação LED e ajustes de altura.',
                link: 'produtos.html'
            }
        ];

        let currentIndex = 0;
        let autoPlayInterval;

        const renderCarousel = () => {
            carouselContainer.innerHTML = carouselData.map(item => `
                <div class="carousel-item p-4 md:p-8 flex-shrink-0">
                    <div class="relative rounded-xl overflow-hidden card-bg">
                        <img src="${item.image}" alt="${item.title}" 
                             class="w-full h-64 md:h-96 object-cover rounded-t-xl"
                             loading="lazy">
                        <div class="p-6">
                            <h4 class="text-xl md:text-2xl font-bold mb-2 text-white">${item.title}</h4>
                            <p class="text-gray-400 text-sm">${item.description}</p>
                            <a href="${item.link}" class="mt-4 inline-block text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                                Saiba Mais →
                            </a>
                        </div>
                    </div>
                </div>
            `).join('');
            this.updateCarousel(carouselContainer, currentIndex);
        };

        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        nextBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % carouselData.length;
            this.updateCarousel(carouselContainer, currentIndex);
            this.resetAutoPlay(() => nextBtn.click());
        });

        prevBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
            this.updateCarousel(carouselContainer, currentIndex);
            this.resetAutoPlay(() => nextBtn.click());
        });

        // Auto-play
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => nextBtn?.click(), 5000);
        };

        this.resetAutoPlay = (callback) => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };

        renderCarousel();
        startAutoPlay();
    }

    updateCarousel(container, index) {
        const item = container.querySelector('.carousel-item');
        if (item) {
            const itemWidth = item.offsetWidth;
            container.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth'
            });
        }
    }

    // Forms Module
    setupForms() {
        const contactForm = document.querySelector('form');
        contactForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e.target);
        });
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        form.reset();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg z-50 ${
            type === 'success' ? 'bg-green-600' : 'bg-blue-600'
        } text-white`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Accessibility Module
    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('navMenuMobile');
                const menuBtn = document.getElementById('menuBtn');
                
                if (mobileMenu?.classList.contains('open')) {
                    menuBtn?.classList.remove('active');
                    mobileMenu?.classList.remove('open');
                    menuBtn?.setAttribute('aria-expanded', 'false');
                    menuBtn?.focus();
                }
            }
        });

        // Image lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    imageObserver.unobserve(entry.target);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
        
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ByteNexusApp();
});



// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
    });
}