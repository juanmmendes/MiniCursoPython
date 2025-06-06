document.addEventListener('DOMContentLoaded', function() {
    // Adiciona classe active ao link atual
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentLocation.includes(href)) {
            link.classList.add('active');
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (mobileToggle && navMenu && navOverlay) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle aria-expanded
            const expanded = mobileToggle.getAttribute('aria-expanded') === 'true' || false;
            mobileToggle.setAttribute('aria-expanded', !expanded);
        });
        
        // Close menu when clicking overlay
        navOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    }

    // Dropdown menus for mobile
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Toggle aria-expanded
                    const expanded = dropdownToggle.getAttribute('aria-expanded') === 'true' || false;
                    dropdownToggle.setAttribute('aria-expanded', !expanded);
                }
            });
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Scroll effect for sticky navigation
    const nav = document.querySelector('.nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past threshold
            nav.classList.add('nav-hidden');
        } else {
            // Scrolling up or at top
            nav.classList.remove('nav-hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});

