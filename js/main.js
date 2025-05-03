document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelector('.nav-links');
    
    hamburgerMenu.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50 && this.window.innerWidth > 768) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
      });
    }
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  
    // About Us Slider Functionality
    const aboutSlider = document.querySelector('.slider-track');
    if (aboutSlider) {
      const slides = document.querySelectorAll('.slide');
      const prevBtn = document.querySelector('.slider-prev');
      const nextBtn = document.querySelector('.slider-next');
      const dotsContainer = document.querySelector('.slider-dots');
      let currentIndex = 0;
      let autoSlideInterval;
      
      // Create dots
      slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
      
      const dots = document.querySelectorAll('.dot');
      
      function updateSlider() {
        aboutSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      }
      
      function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
      }
      
      function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
        resetAutoSlide();
      }
      
      function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
        resetAutoSlide();
      }
      
      function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
      }
      
      function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
      }
      
      // Event listeners
      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);
      
      // Start auto-slide
      startAutoSlide();
      
      // Pause on hover
      aboutSlider.parentElement.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
      });
      
      aboutSlider.parentElement.addEventListener('mouseleave', () => {
        startAutoSlide();
      });
      
      // Touch support for mobile
      let touchStartX = 0;
      let touchEndX = 0;
      
      aboutSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, {passive: true});
      
      aboutSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, {passive: true});
      
      function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) {
          nextSlide(); // Swipe left
        } else if (difference < -50) {
          prevSlide(); // Swipe right
        }
      }
    }
  });