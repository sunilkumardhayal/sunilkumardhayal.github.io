/* ============================================
   PORTFOLIO SCRIPTS - SUNIL KUMAR
   ============================================ */

// ============================================
// 1. DARK MODE TOGGLE
// ============================================

class DarkModeManager {
  constructor() {
    this.darkModeToggle = document.querySelector('.theme-toggle');
    this.init();
  }

  init() {
    // Check for saved preference or default to light mode
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode) {
      this.setMode(savedMode === 'true');
    } else if (prefersDark) {
      this.setMode(true);
    }

    this.darkModeToggle?.addEventListener('click', () => this.toggle());
  }

  toggle() {
    const isDark = document.body.classList.contains('dark-mode');
    this.setMode(!isDark);
  }

  setMode(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
      this.updateIcon(true);
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
      this.updateIcon(false);
    }
  }

  updateIcon(isDark) {
    const icon = this.darkModeToggle?.querySelector('svg');
    if (icon) {
      icon.innerHTML = isDark 
        ? '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m2.12-2.12l4.24-4.24"></path>'
        : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
  }
}

// ============================================
// 2. SMOOTH SCROLLING & NAVIGATION
// ============================================

class NavigationManager {
  constructor() {
    this.navLinks = document.querySelectorAll('a[href^="#"]');
    this.sections = document.querySelectorAll('section');
    this.mobileMenuButton = document.getElementById('mobile-menu-button');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.init();
  }

  init() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    this.mobileMenuButton?.addEventListener('click', () => this.toggleMobileMenu());
    window.addEventListener('scroll', () => this.updateActiveNav());
  }

  handleNavClick(e) {
    const href = e.currentTarget.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        this.closeMobileMenu();
      }
    }
  }

  toggleMobileMenu() {
    this.mobileMenu?.classList.toggle('hidden');
  }

  closeMobileMenu() {
    this.mobileMenu?.classList.add('hidden');
  }

  updateActiveNav() {
    let current = '';
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    this.navLinks.forEach(link => {
      link.classList.remove('nav-active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('nav-active');
      }
    });
  }
}

// ============================================
// 3. INTERSECTION OBSERVER - ANIMATIONS
// ============================================

class AnimationManager {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    this.init();
  }

  init() {
    const animatableElements = document.querySelectorAll(
      '.fade-in-element, .card, .project-card, .skill-card, .blog-card, .testimonial-card'
    );
    animatableElements.forEach(el => this.observer.observe(el));
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('fade-in-up');
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// ============================================
// 4. FLOATING ACTION BUTTONS
// ============================================

class FloatingActions {
  constructor() {
    this.floatingActions = document.getElementById('floating-actions');
    this.toTopButton = document.getElementById('to-top-button');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
    this.toTopButton?.addEventListener('click', () => this.scrollToTop());
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 300) {
      this.floatingActions?.classList.remove('opacity-0', 'pointer-events-none');
    } else {
      this.floatingActions?.classList.add('opacity-0', 'pointer-events-none');
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ============================================
// 5. PROJECT FILTERING
// ============================================

class ProjectFilter {
  constructor() {
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');
    this.init();
  }

  init() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleFilter(e));
    });
  }

  handleFilter(e) {
    const filter = e.target.getAttribute('data-filter');
    
    // Update active button
    this.filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Filter projects
    this.projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        setTimeout(() => {
          card.style.animation = 'fadeInUp 0.5s ease-out';
        }, 50);
      } else {
        card.classList.add('hidden');
      }
    });
  }
}

// ============================================
// 6. FORM HANDLING
// ============================================

class FormManager {
  constructor() {
    this.contactForm = document.getElementById('contact-form');
    this.contactFormModal = document.getElementById('contact-form-modal');
    this.init();
  }

  init() {
    this.contactForm?.addEventListener('submit', (e) => this.handleSubmit(e, 'success-message'));
    this.contactFormModal?.addEventListener('submit', (e) => this.handleSubmit(e, 'modal-success-message'));
  }

  async handleSubmit(e, successMsgId) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    try {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        this.showSuccess(form, successMsgId);
        form.reset();
      } else {
        this.showError('Failed to send message. Please try again.');
      }
    } catch (error) {
      this.showError('Error sending message. Please try again later.');
      console.error('Form submission error:', error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  showSuccess(form, msgId) {
    const successMsg = document.getElementById(msgId);
    if (successMsg) {
      form.style.display = 'none';
      successMsg.style.display = 'block';
      
      setTimeout(() => {
        form.style.display = 'block';
        successMsg.style.display = 'none';
      }, 3000);
    }
  }

  showError(message) {
    alert(message);
  }
}

// ============================================
// 7. READING TIME CALCULATOR
// ============================================

class ReadingTime {
  constructor() {
    this.init();
  }

  init() {
    const articles = document.querySelectorAll('.blog-excerpt');
    articles.forEach(article => {
      const readTime = this.calculateReadTime(article.textContent);
      const readTimeEl = article.closest('.blog-card')?.querySelector('.read-time');
      if (readTimeEl) {
        readTimeEl.textContent = `${readTime} min read`;
      }
    });
  }

  calculateReadTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}

// ============================================
// 8. MODAL MANAGEMENT
// ============================================

class ModalManager {
  constructor() {
    this.openModalBtn = document.getElementById('open-contact-modal');
    this.closeModalBtn = document.getElementById('close-modal');
    this.contactModal = document.getElementById('contact-modal');
    this.init();
  }

  init() {
    this.openModalBtn?.addEventListener('click', () => this.openModal());
    this.closeModalBtn?.addEventListener('click', () => this.closeModal());
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
  }

  openModal() {
    this.contactModal?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.contactModal?.classList.add('hidden');
    document.body.style.overflow = '';
  }

  handleOutsideClick(e) {
    if (this.contactModal && !this.contactModal.classList.contains('hidden')) {
      if (!this.contactModal.contains(e.target) && !this.openModalBtn?.contains(e.target)) {
        this.closeModal();
      }
    }
  }
}

// ============================================
// 9. PARALLAX EFFECT
// ============================================

class ParallaxEffect {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleParallax());
  }

  handleParallax() {
    const scrollY = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-parallax') || 0.5;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }
}

// ============================================
// 10. DYNAMIC YEAR IN FOOTER
// ============================================

class FooterManager {
  constructor() {
    this.init();
  }

  init() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// ============================================
// 11. SEARCH FUNCTIONALITY
// ============================================

class SearchManager {
  constructor() {
    this.searchInput = document.getElementById('search-input');
    this.init();
  }

  init() {
    this.searchInput?.addEventListener('input', (e) => this.handleSearch(e));
  }

  handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const projectCards = document.querySelectorAll('.project-card');
    const blogCards = document.querySelectorAll('.blog-card');

    projectCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.classList.toggle('hidden', !text.includes(query));
    });

    blogCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.classList.toggle('hidden', !text.includes(query));
    });
  }
}

// ============================================
// 12. STATS COUNTER
// ============================================

class StatsCounter {
  constructor() {
    this.init();
  }

  init() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 50);
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(interval);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 50);
  }
}

// ============================================
// 13. KEYBOARD SHORTCUTS
// ============================================

class KeyboardShortcuts {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        searchInput?.focus();
      }

      // Escape to close modal
      if (e.key === 'Escape') {
        const modal = document.getElementById('contact-modal');
        modal?.classList.add('hidden');
      }
    });
  }
}

// ============================================
// 14. PERFORMANCE MONITORING
// ============================================

class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        this.logPerformanceMetrics();
      });
    }
  }

  logPerformanceMetrics() {
    const timing = window.performance.timing;
    const metrics = {
      pageLoadTime: timing.loadEventEnd - timing.navigationStart,
      connectTime: timing.responseEnd - timing.requestStart,
      renderTime: timing.domComplete - timing.domLoading,
      domReadyTime: timing.domContentLoadedEventEnd - timing.navigationStart
    };
    
    console.log('Performance Metrics:', metrics);
  }
}

// ============================================
// 15. INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all managers
  new DarkModeManager();
  new NavigationManager();
  new AnimationManager();
  new FloatingActions();
  new ProjectFilter();
  new FormManager();
  new ReadingTime();
  new ModalManager();
  new ParallaxEffect();
  new FooterManager();
  new SearchManager();
  new StatsCounter();
  new KeyboardShortcuts();
  new PerformanceMonitor();

  console.log('Portfolio initialized successfully!');
});

// ============================================
// 16. UTILITY FUNCTIONS
// ============================================

// Smooth scroll to element
function smoothScroll(element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Debounce function for performance
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

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
