// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    if (mainNav.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
      document.body.style.overflow = ""; // Restore scrolling
    }
  });

  // Close menu when clicking on a link
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains("active")) {
      mainNav.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
      document.body.style.overflow = "";
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992 && mainNav.classList.contains("active")) {
      mainNav.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
      document.body.style.overflow = "";
    }
  });
}

// CONTACT FORM
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent successfully!");
    contactForm.reset();
  });
}

// COLLABORATION FORM
const collaborationForm = document.getElementById("collaborationForm");
if (collaborationForm) {
  collaborationForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you! Our business team will contact you shortly.");
    collaborationForm.reset();
  });
}

// CART COUNT
const cartCount = document.querySelector(".cart-count");
document.querySelectorAll(".cta-button, .add-to-cart").forEach(btn => {
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("add-to-cart") || btn.closest?.('.product-card') || btn.href?.includes('add-to-cart')) {
      if (cartCount) {
        let currentCount = Number(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
        cartCount.classList.add("pulse");
        setTimeout(() => cartCount.classList.remove("pulse"), 300);
        
        // Flying animation
        const rect = btn.getBoundingClientRect();
        const cartBtn = document.querySelector('.cart-btn');
        
        if (cartBtn) {
          const flyingItem = document.createElement('div');
          flyingItem.style.cssText = `
            position: fixed;
            top: ${rect.top}px;
            left: ${rect.left}px;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          `;
          document.body.appendChild(flyingItem);
          
          setTimeout(() => {
            const cartRect = cartBtn.getBoundingClientRect();
            flyingItem.style.top = `${cartRect.top}px`;
            flyingItem.style.left = `${cartRect.left}px`;
            flyingItem.style.transform = 'scale(0.1)';
            flyingItem.style.opacity = '0';
          }, 10);
          
          setTimeout(() => flyingItem.remove(), 600);
        }
      }
    }
  });
});

// SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// NAV ACTIVE STATE
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-btn');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.remove('active');
    if (linkPage === currentPage || 
        (linkPage === 'index.html' && (currentPage === '' || currentPage === 'index.html'))) {
      link.classList.add('active');
    }
  });
});

// FORM VALIDATION ENHANCEMENT
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#ff4757';
        
        // Remove error styling after 3 seconds
        setTimeout(() => {
          field.style.borderColor = '';
        }, 3000);
      } else {
        field.style.borderColor = '';
      }
    });
    
    if (!isValid) {
      e.preventDefault();
      alert('Please fill in all required fields.');
    }
  });
});

// PRODUCT IMAGE LAZY LOADING
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });
  
  images.forEach(img => imageObserver.observe(img));
});

// Enhanced glass effect with mouse interaction
document.addEventListener('DOMContentLoaded', function() {
  
  // Add glass-premium class to existing elements
  document.querySelectorAll('.content-box, .feature-card, .product-card, .card, .glass').forEach(el => {
    el.classList.add('glass-premium', 'hover-lift');
  });
  
  // Add glass effect to forms
  document.querySelectorAll('.form-control').forEach(el => {
    el.classList.add('glass-premium');
  });
  
  // Add glass effect to buttons
  document.querySelectorAll('.cta-button, .btn').forEach(el => {
    el.classList.add('glass-premium');
  });
  
  // Add mouse position tracking for dynamic glass effects
  document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    document.querySelectorAll('.glass-premium').forEach(el => {
      const rect = el.getBoundingClientRect();
      const x = mouseX - rect.left;
      const y = mouseY - rect.top;
      
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
  });
  
  // Add floating particles background to hero sections
  if (document.querySelector('.hero, .futuristic-hero')) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'background-particles';
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 10 + 15;
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        background: ${i % 3 === 0 ? 'var(--primary)' : i % 3 === 1 ? 'var(--secondary)' : 'var(--accent)'};
      `;
      
      particlesContainer.appendChild(particle);
    }
    
    document.querySelector('.hero, .futuristic-hero').appendChild(particlesContainer);
  }
  
  // Add glow animation to important elements
  setTimeout(() => {
    document.querySelectorAll('.cta-button, .logo, .btn-primary').forEach(el => {
      el.classList.add('glow-animation');
    });
  }, 1000);
});

// Create tech background effects
function createTechBackground() {
  // Create tech grid
  let grid = document.querySelector('.tech-grid');
  if (!grid) {
    grid = document.createElement('div');
    grid.className = 'tech-grid';
    document.body.appendChild(grid);
  }
  
  // Create data streams
  let dataStream = document.querySelector('.data-stream');
  if (!dataStream) {
    dataStream = document.createElement('div');
    dataStream.className = 'data-stream';
    
    for (let i = 0; i < 10; i++) {
      const streamLine = document.createElement('div');
      streamLine.className = 'stream-line';
      streamLine.style.left = `${Math.random() * 100}%`;
      streamLine.style.animationDelay = `${Math.random() * 10}s`;
      dataStream.appendChild(streamLine);
    }
    
    document.body.appendChild(dataStream);
  }
  
  // Create circuit lines in hero
  const hero = document.querySelector('.futuristic-hero, .hero');
  if (hero) {
    for (let i = 0; i < 5; i++) {
      const line = document.createElement('div');
      line.className = 'circuit-line';
      
      const types = ['horizontal', 'vertical', 'diagonal'];
      const type = types[Math.floor(Math.random() * types.length)];
      line.classList.add(type);
      
      line.style.top = `${Math.random() * 100}%`;
      line.style.left = `${Math.random() * 100}%`;
      line.style.opacity = Math.random() * 0.1 + 0.05;
      
      hero.appendChild(line);
    }
  }
}

// Add tech text effects
function enhanceTechText() {
  document.querySelectorAll('h1, h2, h3').forEach(el => {
    if (!el.classList.contains('tech-text')) {
      el.classList.add('tech-text');
    }
  });
  
  // Add pulse effect to important elements
  document.querySelectorAll('.logo, .cta-button, .feature-card i, .card i').forEach(el => {
    el.classList.add('pulse-tech');
  });
}

// Initialize tech effects when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Add tech background
  createTechBackground();
  
  // Enhance text
  enhanceTechText();
  
  // Add tech glow to interactive elements
  document.querySelectorAll('a, button, .nav-btn, .btn').forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.classList.add('glow-primary');
    });
    
    el.addEventListener('mouseleave', function() {
      this.classList.remove('glow-primary');
    });
  });
  
  // Add loading animation (optional)
  if (!document.querySelector('.tech-loader')) {
    const loader = document.createElement('div');
    loader.className = 'tech-loader';
    loader.innerHTML = `
      <div class="loader-ring"></div>
      <div class="loader-dot"></div>
    `;
    document.body.appendChild(loader);
    
    // Remove loader after page load
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }, 1000);
  }
});

// ================= ENHANCED ANIMATIONS JS =================

// Smooth page loader
function initPageLoader() {
  if (!document.querySelector('.page-loader')) {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-spinner"></div>
        <p style="color: var(--primary); margin-top: 10px;">Axion Mobility</p>
      </div>
    `;
    document.body.appendChild(loader);
    
    // Hide loader when page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }, 500);
    });
  }
}

// Scroll progress indicator
function initScrollProgress() {
  if (!document.querySelector('.scroll-progress')) {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
}

// Reveal on scroll animation
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.visible)');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  // Add class to existing elements
  document.querySelectorAll('.feature-card, .product-card, .content-box, .card, .team-card, .advisor-card').forEach(el => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll');
    }
  });
}

// Animate stats counter
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.textContent.replace(/[^0-9]/g, ''));
        if (!isNaN(finalValue) && !target.hasAttribute('data-counted')) {
          target.setAttribute('data-counted', 'true');
          const duration = 2000;
          const increment = finalValue / (duration / 16);
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
              target.textContent = target.textContent.replace(/[0-9,]+/, finalValue.toLocaleString());
              clearInterval(timer);
            } else {
              target.textContent = target.textContent.replace(/[0-9,]+/, Math.floor(current).toLocaleString());
            }
          }, 16);
        }
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => statObserver.observe(stat));
}

// Smooth hover animations
function initSmoothHover() {
  document.querySelectorAll('.card, .feature-card, .product-card, .team-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Add background particles
function initBackgroundParticles() {
  if (!document.querySelector('.background-particles')) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'background-particles';
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 6 + 2;
      const left = Math.random() * 100;
      const delay = Math.random() * 20;
      const duration = Math.random() * 15 + 20;
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        background: ${i % 3 === 0 ? 'var(--primary)' : i % 3 === 1 ? 'var(--secondary)' : 'var(--accent)'};
      `;
      
      particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
  }
}

// Enhanced navigation hover effect
function initNavHoverEffect() {
  const navBtns = document.querySelectorAll('.nav-btn');
  
  navBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-4px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Smooth page transitions
function initSmoothPageTransitions() {
  const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="index.html"], a[href^="products.html"], a[href^="about.html"], a[href^="contact.html"], a[href^="subscription.html"], a[href^="business-collaboration.html"], a[href^="product-detail.html"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // Skip if it's an anchor link or external link
      if (link.getAttribute('href').startsWith('#') || 
          link.getAttribute('target') === '_blank' ||
          link.getAttribute('href').startsWith('http')) {
        return;
      }
      
      e.preventDefault();
      const href = link.getAttribute('href');
      
      // Don't animate if it's the same page
      if (href === window.location.pathname.split('/').pop()) {
        return;
      }
      
      const transition = document.createElement('div');
      transition.className = 'page-transition';
      document.body.appendChild(transition);
      
      setTimeout(() => {
        transition.classList.add('active');
      }, 10);
      
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
}

// Enhanced form animations
function initFormAnimations() {
  const formControls = document.querySelectorAll('.form-control');
  
  formControls.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'translateY(-5px)';
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'translateY(0)';
    });
  });
}

// Parallax effect for hero
function initParallaxEffect() {
  const hero = document.querySelector('.futuristic-hero, .hero');
  if (!hero) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    hero.style.transform = `translateY(${rate}px)`;
  });
}

// Team card hover effects
function initTeamCardEffects() {
  const teamCards = document.querySelectorAll('.team-card, .team-member');
  
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Team social icons animation
  const socialIcons = document.querySelectorAll('.team-social a');
  socialIcons.forEach((icon, index) => {
    icon.style.transitionDelay = `${index * 0.1}s`;
  });
}

// Initialize all animations when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Initialize enhanced animations
  initPageLoader();
  initScrollProgress();
  initRevealOnScroll();
  initStatsCounter();
  initSmoothHover();
  initBackgroundParticles();
  initNavHoverEffect();
  initSmoothPageTransitions();
  initFormAnimations();
  initParallaxEffect();
  initTeamCardEffects();
  
  // Add typing animation to hero tagline
  const tagline = document.querySelector('.hero-tagline');
  if (tagline && !tagline.classList.contains('typing-text')) {
    tagline.classList.add('typing-text');
  }
  
  // Add smooth appear to sections
  document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('smooth-appear')) {
      section.classList.add('smooth-appear');
    }
  });
  
  // Add hover card effect
  document.querySelectorAll('.glass-card, .content-box, .card').forEach(card => {
    if (!card.classList.contains('hover-card')) {
      card.classList.add('hover-card');
    }
  });
  
  // Add ripple effect to buttons
  document.querySelectorAll('.cta-button, .btn').forEach(btn => {
    if (!btn.classList.contains('btn-ripple')) {
      btn.classList.add('btn-ripple');
    }
  });
  
  // Add section entrance effect
  document.querySelectorAll('section').forEach((section, index) => {
    if (!section.classList.contains('section-entrance')) {
      section.classList.add('section-entrance');
      section.style.transitionDelay = `${index * 0.1}s`;
    }
  });
  
  // Intersection Observer for section entrance
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.section-entrance, .smooth-appear, .reveal-on-scroll').forEach(el => {
    sectionObserver.observe(el);
  });
  
  // Handle window resize for mobile menu
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      document.body.style.overflow = '';
    }
  });
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initPageLoader,
    initScrollProgress,
    initRevealOnScroll,
    initStatsCounter,
    initSmoothHover,
    initBackgroundParticles,
    initNavHoverEffect,
    initSmoothPageTransitions,
    initFormAnimations,
    initParallaxEffect,
    initTeamCardEffects
  };
}
