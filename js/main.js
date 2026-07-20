/* ============================================
   BOLD INTERNATIONAL — Premium Luxury JS
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     PAGE LOADER
     ========================================== */
  window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    document.documentElement.classList.remove('overflow-hidden');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => { loader.style.display = 'none'; }, 800);
      }, 600);
    }
  });

  /* NATIVE SCROLL — fast, no lag */
  if (typeof ScrollTrigger !== 'undefined') {
    window.addEventListener('scroll', () => ScrollTrigger.update(), { passive: true });
  }

  /* ==========================================
     HERO VIDEO SLIDER
     ========================================== */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroIndicators = document.querySelectorAll('.hero-indicator');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    if (index === currentSlide) return;
    heroSlides.forEach(s => s.classList.remove('active'));
    heroIndicators.forEach(i => {
      i.classList.remove('active');
      const fill = i.querySelector('.fill');
      if (fill) fill.style.width = '0%';
    });
    heroSlides[index].classList.add('active');
    heroIndicators[index].classList.add('active');
    // Force reflow then start fill animation
    const fill = heroIndicators[index].querySelector('.fill');
    if (fill) {
      void fill.offsetWidth;
      fill.style.width = '100%';
    }
    // Ensure video plays
    const videos = heroSlides[index].querySelectorAll('video');
    videos.forEach(v => { if (v.paused) v.play().catch(() => {}); });
    currentSlide = index;
  }

  function startSlideTimer() {
    stopSlideTimer();
    slideInterval = setInterval(() => {
      const next = (currentSlide + 1) % heroSlides.length;
      goToSlide(next);
    }, 6000);
  }

  function stopSlideTimer() {
    if (slideInterval) { clearInterval(slideInterval); slideInterval = null; }
  }

  if (heroSlides.length > 1 && heroIndicators.length) {
    heroIndicators.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.slide);
        if (idx !== currentSlide) {
          goToSlide(idx);
          startSlideTimer();
        }
      });
    });
    // Init first indicator fill
    const firstFill = heroIndicators[0]?.querySelector('.fill');
    if (firstFill) {
      setTimeout(() => { firstFill.style.width = '100%'; }, 300);
    }
    startSlideTimer();
  }

  /* ==========================================
     CUSTOM CURSOR — GPU Optimized
     ========================================== */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (cursorDot && cursorRing && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });

    function animCursor() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorDot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0) translate(-50%,-50%)';
      cursorRing.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)';
      requestAnimationFrame(animCursor);
    }
    animCursor();

    document.querySelectorAll('a, button, .category-card, .product-card, .testimonial-card, .blog-card, .instagram-item, .highlight-card, .sp-card, .pl-related-card, .bj-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
  }

  /* ==========================================
     NAVBAR SCROLL EFFECT
     ========================================== */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  if (navbar) {
    const updateNavbar = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    };

    window.addEventListener("scroll", updateNavbar, { passive: true })
    updateNavbar();
  }

  /* ==========================================
     SEARCH OVERLAY
     ========================================== */
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  if (searchToggle && searchOverlay && searchClose) {
    searchToggle.addEventListener('click', () => {
      searchOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput?.focus(), 400);
      
    });
    const closeSearch = () => {
      searchOverlay.classList.remove('open');
      document.body.style.overflow = '';
      
    };
    searchClose.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('open')) closeSearch();
    });
  }

  /* ==========================================
     MOBILE OVERLAY
     ========================================== */
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileOverlay.classList.toggle('open');
      document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
      if (lenis) {
        if (mobileOverlay.classList.contains('open')) lenis.stop();
        else lenis.start();
      }
    });

    mobileOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
        
      });
    });
  }

  /* WATER SPLASH — removed for performance */

  /* ==========================================
     KEYBOARD NAVIGATION
     ========================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cartDrawer?.classList.contains('open')) {
        drawerOverlay?.click();
      }
      hamburger?.classList.remove('active');
      mobileOverlay?.classList.remove('open');
      document.body.style.overflow = '';
      if (searchOverlay?.classList.contains('open')) searchClose?.click();
    }
  });

  /* ==========================================
     ENHANCED CART SYSTEM
     ========================================== */
  const cartToggle = document.getElementById('cartToggle');
  const cartDrawer = document.getElementById('cartDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const cartCount = document.getElementById('cartCount');
  const cartBadge = document.querySelector('.cart-badge');
  const drawerEmpty = document.getElementById('drawerEmpty');
  const drawerItems = document.getElementById('drawerItems');
  const drawerFooter = document.getElementById('drawerFooter');
  const drawerTotal = document.getElementById('drawerTotal');

  let cart = JSON.parse(localStorage.getItem('boldCart')) || [];

  function saveCart() {
    localStorage.setItem('boldCart', JSON.stringify(cart));
  }

  function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartBadge) cartBadge.textContent = count;
    if (cartCount) cartCount.textContent = count;

    if (cart.length === 0) {
      if (drawerEmpty) drawerEmpty.style.display = 'flex';
      if (drawerItems) drawerItems.style.display = 'none';
      if (drawerFooter) drawerFooter.style.display = 'none';
      return;
    }

    if (drawerEmpty) drawerEmpty.style.display = 'none';
    if (drawerItems) {
      drawerItems.style.display = 'block';
      drawerItems.innerHTML = cart.map((item, idx) => `
        <div class="cart-item" style="animation-delay:${idx * 0.05}s">
          <div class="cart-item-image">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
          </div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="cart-item-variant">${item.variant || 'Standard'}</div>
            <div class="cart-item-price">$${(item.price * item.qty).toLocaleString()}</div>
            <div class="cart-item-actions">
              <div class="cart-item-qty">
                <button data-cart-minus="${idx}">−</button>
                <span>${item.qty}</span>
                <button data-cart-plus="${idx}">+</button>
              </div>
              <button class="cart-item-remove" data-cart-remove="${idx}">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');

      drawerItems.querySelectorAll('[data-cart-minus]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.cartMinus);
          if (cart[idx].qty > 1) { cart[idx].qty--; } else { cart.splice(idx, 1); }
          saveCart(); updateCartUI();
        });
      });
      drawerItems.querySelectorAll('[data-cart-plus]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.cartPlus);
          if (cart[idx].qty < 99) cart[idx].qty++;
          saveCart(); updateCartUI();
        });
      });
      drawerItems.querySelectorAll('[data-cart-remove]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.cartRemove);
          const item = cart[idx];
          cart.splice(idx, 1);
          saveCart(); updateCartUI();
          showToast(`Removed ${item.name} from bag`);
        });
      });
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (drawerTotal) drawerTotal.textContent = `$${total.toLocaleString()}`;
    if (drawerFooter) drawerFooter.style.display = 'block';
  }

  function addToCart(name, price, img, variant = 'Standard') {
    const existing = cart.find(item => item.name === name && item.variant === variant);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, img, variant, qty: 1 });
    }
    saveCart();
    updateCartUI();

    if (cartBadge) {
      gsap.fromTo(cartBadge, { scale: 1.5 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
    }
    showToast(`Added ${name} to your bag`);
  }

  if (cartToggle && cartDrawer && drawerOverlay && drawerClose) {
    const openDrawer = () => {
      cartDrawer.classList.add('open');
      drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      
    };

    const closeDrawer = () => {
      cartDrawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
      
    };

    cartToggle.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  updateCartUI();

  /* ==========================================
     SCROLL REVEAL ANIMATIONS
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.transitionDelay || '0s';
        const delayMs = parseFloat(delay) * 1000 || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delayMs);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================
     GSAP ANIMATIONS
     ========================================== */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

    // Parallax on brand story image
    gsap.utils.toArray('.brand-story-image img').forEach(img => {
      gsap.fromTo(img, {
        y: '-15%',
        scale: 1.1
      }, {
        y: '15%',
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.brand-story-image'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    });

    // Parallax on about hero
    gsap.utils.toArray('.about-hero img').forEach(img => {
      gsap.fromTo(img, {
        y: '-10%',
        scale: 1.05
      }, {
        y: '10%',
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.about-hero'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    });

    // Counter animation for stats
    gsap.utils.toArray('.ab-phil-stat-num, .ph-metric-number').forEach(counter => {
      const target = parseFloat(counter.dataset.count) || 0;
      const isDecimal = (target % 1) !== 0;
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(counter, {
            textContent: isDecimal ? '0.0' : 0
          }, {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: isDecimal ? 0.1 : 1 },
            onUpdate: function () {
              counter.textContent = isDecimal ? target.toFixed(1) : Math.round(this.targets()[0].textContent);
              if (!isDecimal && target >= 50) counter.textContent += '+';
            }
          });
        },
        once: true
      });
    });

    // Hero overlay fade
    gsap.from('.hero-overlay', {
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.2
    });

    // Floating particles animation
    gsap.utils.toArray('.particle').forEach((particle, i) => {
      gsap.to(particle, {
        y: -(200 + Math.random() * 300),
        x: Math.random() * 200 - 100,
        opacity: 0,
        duration: 6 + Math.random() * 4,
        repeat: -1,
        delay: i * 0.5,
        ease: 'power1.out'
      });
    });

    // Section parallax backgrounds
    gsap.utils.toArray('.section-highlights').forEach(section => {
      gsap.fromTo(section, { backgroundPosition: '50% 0%' }, {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Blog journal animations
    gsap.utils.toArray('.bj-card, .bj-featured-card, .bj-cat-card, .bj-trending-item, .bj-insta-item').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(el,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
          );
        },
        once: true
      });
    });

    // Blog hero text reveal
    const bjHero = document.querySelector('.bj-hero-content');
    if (bjHero) {
      gsap.fromTo(bjHero.querySelector('.bj-hero-label'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(bjHero.querySelector('.bj-hero-title'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
      gsap.fromTo(bjHero.querySelector('.bj-hero-desc'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 }
      );
    }

    // Stagger fade-in for product grids (avoids double-animating)
    gsap.utils.toArray('.sp-grid, .bs-track, .lux-cards, .highlights-grid, .testimonials-grid, .ab-values-grid, .ab-team-grid, .bj-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.sp-card, .bs-card, .lux-card, .highlight-card, .testimonial-card, .ab-value-card, .ab-team-card, .bj-card');
      if (cards.length) {
        ScrollTrigger.create({
          trigger: grid,
          start: 'top 88%',
          onEnter: () => {
            gsap.fromTo(cards,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power2.out' }
            );
          },
          once: true
        });
      }
    });

    // Creative hero title character reveal
    const heroTitle = document.querySelector('.hero-content .display-heading');
    if (heroTitle && !heroTitle.hasAttribute('data-revealed')) {
      heroTitle.setAttribute('data-revealed', 'true');
      const text = heroTitle.textContent;
      heroTitle.innerHTML = '';
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(60px) rotateX(40deg)';
        setTimeout(() => {
          span.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
          span.style.opacity = '1';
          span.style.transform = 'translateY(0) rotateX(0deg)';
        }, 350 + i * 30);
        heroTitle.appendChild(span);
      });
    }

  } // end GSAP

  /* ==========================================
     FLOATING AMBIENT PARTICLES
     ========================================== */
  (function initFloatingParticles() {
    const container = document.getElementById('floatingParticles');
    if (!container) return;
    const count = 20;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'floating-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.setProperty('--duration', (6 + Math.random() * 8) + 's');
      p.style.setProperty('--delay', Math.random() * 10 + 's');
      p.style.setProperty('--drift', (Math.random() - 0.5) * 60 + 'px');
      p.style.setProperty('--drift-reverse', (Math.random() - 0.5) * 40 + 'px');
      p.style.width = (2 + Math.random() * 4) + 'px';
      p.style.height = p.style.width;
      container.appendChild(p);
    }
  })();

  /* ==========================================
     BACKGROUND DROPLETS (Ambient)
     ========================================== */
  (function initBgDroplets() {
    const sections = document.querySelectorAll('.section, .bs-section, .ph-section, .lux-categories');
    sections.forEach(section => {
      const container = document.createElement('div');
      container.className = 'bg-droplets';
      section.style.position = 'relative';
      section.prepend(container);
      for (let i = 0; i < 5; i++) {
        const d = document.createElement('div');
        d.className = 'bg-droplet';
        d.style.left = (10 + Math.random() * 80) + '%';
        d.style.setProperty('--duration', (10 + Math.random() * 10) + 's');
        d.style.setProperty('--delay', Math.random() * 8 + 's');
        container.appendChild(d);
      }
    });
  })();

  /* ==========================================
     RIPPLE CARD MOUSE TRACKING
     ========================================== */
  document.querySelectorAll('.ripple-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--ripple-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
      card.style.setProperty('--ripple-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
  });

  /* ==========================================
     BACK TO TOP
     ========================================== */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const toggleBackToTop = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };

    window.addEventListener("scroll", toggleBackToTop, { passive: true })

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    });
  }

  /* ==========================================
     TOAST NOTIFICATION
     ========================================== */
  window.showToast = (message, type = 'success') => {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 600);
    }, 3000);
  };

  /* ==========================================
     PRODUCT QUANTITY
     ========================================== */
  document.querySelectorAll('.product-quantity').forEach(container => {
    const minus = container.querySelector('.qty-btn:first-child');
    const plus = container.querySelector('.qty-btn:last-child');
    const value = container.querySelector('.qty-value');

    if (minus && plus && value) {
      minus.addEventListener('click', () => {
        let val = parseInt(value.textContent);
        if (val > 1) value.textContent = val - 1;
      });
      plus.addEventListener('click', () => {
        let val = parseInt(value.textContent);
        if (val < 99) value.textContent = val + 1;
      });
    }
  });

  /* ==========================================
     PRODUCT IMAGE GALLERY
     ========================================== */
  document.querySelectorAll('.product-gallery').forEach(gallery => {
    const mainImg = gallery.querySelector('.product-gallery-main img');
    const thumbs = gallery.querySelectorAll('.gallery-thumb');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const newSrc = thumb.querySelector('img').getAttribute('src');
        if (mainImg && newSrc) {
          mainImg.style.opacity = '0';
          setTimeout(() => {
            mainImg.setAttribute('src', newSrc);
            mainImg.style.opacity = '1';
          }, 200);
        }
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  });

  /* ==========================================
     ACTIVE NAV LINK
     ========================================== */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else if (currentPath === '' && href === 'index.html') {
      link.classList.add('active');
    }
  });

  /* ==========================================
     FILTER BUTTONS
     ========================================== */
  document.querySelectorAll('.filter-btn, .sp-filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const parent = this.closest('.shop-filters, .sp-filter-inner');
      if (parent) {
        parent.querySelectorAll('.filter-btn, .sp-filter-btn').forEach(b => b.classList.remove('active'));
      }
      this.classList.add('active');

      const filter = (this.dataset.cat || this.textContent.trim()).toLowerCase();
      const products = document.querySelectorAll('.product-card[data-category], .sp-card[data-category]');
      products.forEach(p => {
        const cat = (p.dataset.category || '').toLowerCase();
        p.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
      });
    });
  });

  /* ==========================================
     WISHLIST BUTTONS
     ========================================== */
  document.querySelectorAll('.product-card-actions button:first-child, .wishlist-btn, .sp-wishlist').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const icon = this.querySelector('i') || this;
      if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        icon.style.color = '#D4AF64';
        this.classList.add('active');
        showToast('Added to wishlist');
      } else {
        icon.classList.replace('fas', 'far');
        icon.style.color = '';
        this.classList.remove('active');
      }
    });
  });

  /* ==========================================
     QUICK VIEW MODAL
     ========================================== */
  const productData = [
    { name: 'Premium Filter System', price: 149, img: 'assets/images/prd-1.png', cat: 'Shower Filters', rating: 4.9, desc: 'Advanced multi-stage filtration removes chlorine, heavy metals, and impurities for healthier skin and hair.' },
    { name: 'Replacement Cartridge', price: 39, img: 'assets/images/prd-2.png', cat: 'Shower Filters', rating: 4.7, desc: 'High-capacity replacement cartridge compatible with all filter systems. Delivers 6 months of filtered water.' },
    { name: 'Vitamin C Filter', price: 89, img: 'assets/images/prd-3.png', cat: 'Shower Filters', rating: 4.8, desc: 'Infused with Vitamin C to neutralize chlorine and chloramines while promoting healthier, more radiant skin.' },
    { name: 'Hard Water Filter', price: 129, img: 'assets/images/shower1.png', cat: 'Shower Filters', rating: 4.6, desc: 'Designed for hard water areas. Reduces scale buildup and leaves skin feeling softer after every shower.' },
    { name: 'Filter Accessory Kit', price: 59, img: 'assets/images/cat-2.png', cat: 'Shower Filters', rating: 4.5, desc: 'Everything you need to maintain your filter system. Includes replacement washers, adapters, and a cleaning brush.' },
    { name: 'The Rainfall Elite', price: 289, img: 'assets/images/cat-3.png', cat: 'Showerheads', rating: 4.9, desc: 'Luxury 12-inch rainfall showerhead with self-cleaning silicone nozzles. Provides an immersive spa-like experience.' },
    { name: 'Artisan Hand Shower', price: 189, img: 'assets/images/prd-4.png', cat: 'Showerheads', rating: 4.8, desc: 'Ergonomic hand shower with premium braided hose and three spray modes. The flexible grip design makes rinsing effortless.' },
    { name: 'Mist & Rain Duo', price: 349, img: 'assets/images/washbasin.jpg', cat: 'Showerheads', rating: 4.9, desc: 'Innovative dual-mode showerhead combining gentle mist with invigorating rain. Features thermostatic control.' },
    { name: 'Cascade Waterfall', price: 269, img: 'assets/images/Gold_hand_shower_overlooking_pool_202607190034.jpeg', cat: 'Showerheads', rating: 4.7, desc: 'Wide 14-inch waterfall showerhead that delivers a gentle, even flow. The minimalist design complements any modern bathroom.' },
    { name: 'WallMount Pro', price: 219, img: 'assets/images/Washbasin_premium_level_image_2K_202607190117.jpeg', cat: 'Showerheads', rating: 4.6, desc: 'Adjustable wall-mounted showerhead with 360° rotation and six spray patterns. Precision-engineered brass construction.' },
    { name: 'Silk Protein Shampoo', price: 48, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=650&fit=crop', cat: 'Haircare', rating: 4.9, desc: 'Nourishing shampoo infused with silk proteins and argan oil. Gently cleanses while restoring shine and strength.' },
    { name: 'Silk Protein Conditioner', price: 44, img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=650&fit=crop', cat: 'Haircare', rating: 4.8, desc: 'Rich conditioner with silk amino acids and shea butter. Detangles, hydrates, and leaves hair silky smooth.' },
    { name: 'Argan Hair Elixir', price: 58, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=650&fit=crop', cat: 'Haircare', rating: 4.7, desc: 'Lightweight organic argan oil treatment that tames frizz, adds shine, and protects against heat damage.' },
    { name: 'Mineral Shower Gel', price: 42, img: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=500&h=650&fit=crop', cat: 'Skincare', rating: 4.8, desc: 'Luxurious shower gel enriched with Dead Sea minerals and aloe vera. Gently cleanses while replenishing essential nutrients.' },
    { name: 'HydraGlow Moisturizer', price: 72, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=650&fit=crop', cat: 'Skincare', rating: 4.9, desc: 'Lightweight fast-absorbing moisturizer with hyaluronic acid and vitamin B5. Provides 24-hour hydration.' },
  ];

  const qvModal = document.getElementById('quickViewModal');
  const qvClose = document.getElementById('quickViewClose');

  function openQuickView(product) {
    if (!qvModal) return;
    document.getElementById('qvImg').src = product.img;
    document.getElementById('qvImg').alt = product.name;
    document.getElementById('qvCat').textContent = product.cat;
    document.getElementById('qvName').textContent = product.name;
    document.getElementById('qvPrice').textContent = `$${product.price}`;
    document.getElementById('qvDesc').textContent = product.desc;
    document.getElementById('qvRating').innerHTML = `<i class="fas fa-star"></i> ${product.rating} <span>(${Math.floor(product.rating)}+ reviews)</span>`;
    qvModal.querySelector('.qty-value').textContent = '1';
    qvModal._product = product;
    qvModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    
  }

  function closeQuickView() {
    if (!qvModal) return;
    qvModal.classList.remove('open');
    document.body.style.overflow = '';
    
  }

  document.querySelectorAll('.sp-quickview').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const card = this.closest('.sp-card');
      if (!card) return;
      const name = card.querySelector('h3')?.textContent?.trim();
      const product = productData.find(p => p.name === name);
      if (product) { openQuickView(product); return; }
      openQuickView({
        name: name || 'Product',
        price: parseFloat((card.querySelector('.sp-price')?.textContent || '0').replace(/[^0-9.]/g, '')),
        img: card.querySelector('.sp-card-image img')?.getAttribute('src') || '',
        cat: card.querySelector('.sp-cat')?.textContent || '',
        rating: 4.5,
        desc: 'Premium quality product from our curated collection.',
      });
    });
  });

  if (qvClose) qvClose.addEventListener('click', closeQuickView);
  if (qvModal) qvModal.addEventListener('click', function (e) { if (e.target === this) closeQuickView(); });

  document.getElementById('qvAddToCart')?.addEventListener('click', function () {
    const product = qvModal?._product;
    if (!product) return;
    const qty = parseInt(qvModal.querySelector('.qty-value')?.textContent || '1');
    for (let i = 0; i < qty; i++) addToCart(product.name, product.price, product.img);
    closeQuickView();
    // Open cart drawer after adding
    const toggle = document.getElementById('cartToggle');
    if (toggle) toggle.click();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && qvModal?.classList.contains('open')) closeQuickView();
  });

  /* ==========================================
     PRODUCT DATA
     ========================================== */
  const shopProductData = [
    { name: 'Premium Filter System', price: 149, img: 'assets/images/prd-1.png', cat: 'Shower Filters', badge: 'Best Seller', desc: 'Advanced multi-stage filtration removes chlorine, heavy metals, and impurities for healthier skin and hair. Features a sleek brushed nickel finish with easy-install design.', material: 'Brass & polymer composite', tech: 'Multi-stage filtration reduces contaminants by 99%', spec: 'Fits standard 1/2" shower arms' },
    { name: 'Replacement Cartridge', price: 39, img: 'assets/images/prd-2.png', cat: 'Shower Filters', badge: 'New', desc: 'High-capacity replacement cartridge compatible with all filter systems. Delivers 6 months of filtered water with easy twist-and-lock installation.', material: 'Activated carbon & KDF', tech: '6-month filtration capacity', spec: 'Universal fit' },
    { name: 'Vitamin C Filter', price: 89, img: 'assets/images/prd-3.png', cat: 'Shower Filters', badge: '', desc: 'Infused with Vitamin C to neutralize chlorine and chloramines while promoting healthier, more radiant skin. Ideal for sensitive skin types.', material: 'Vitamin C-infused media', tech: 'Neutralizes chlorine & chloramines', spec: 'Fits standard 1/2" connections' },
    { name: 'Hard Water Filter', price: 129, img: 'assets/images/shower1.png', cat: 'Shower Filters', badge: '', desc: 'Designed specifically for hard water areas. Reduces scale buildup, extends appliance life, and leaves skin feeling softer after every shower.', material: 'Ion exchange resin', tech: 'Reduces calcium & magnesium', spec: 'Treats up to 30,000 gallons' },
    { name: 'Filter Accessory Kit', price: 59, img: 'assets/images/cat-2.png', cat: 'Shower Filters', badge: 'Popular', desc: 'Everything you need to maintain your filter system. Includes replacement washers, adapters, a cleaning brush, and installation tool.', material: 'Brass & silicone', tech: 'Complete maintenance set', spec: 'Universal compatibility' },
    { name: 'The Rainfall Elite', price: 289, img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=1000&fit=crop', cat: 'Rain Showerheads', badge: 'Best Seller', desc: 'Engineered to replicate the sensation of natural rainfall. Features 120 precision nozzles, innovative aeration technology, and a hand-finished surface.', material: 'Solid brass with chrome finish', tech: 'Aeration reduces water use by 30%', spec: '12" diameter, 1/2" connection' },
    { name: 'Artisan Hand Shower', price: 189, img: 'assets/images/prd-4.png', cat: 'Showerheads', badge: '', desc: 'Ergonomic hand shower with premium braided hose and three spray modes. The flexible grip design makes rinsing effortless.', material: 'Brass & silicone nozzles', tech: '3 spray modes', spec: '59" braided hose' },
    { name: 'Mist & Rain Duo', price: 349, img: 'assets/images/washbasin.jpg', cat: 'Showerheads', badge: '', desc: 'Innovative dual-mode showerhead combining gentle mist with invigorating rain. Features thermostatic control and LED temperature display.', material: 'Stainless steel & brass', tech: 'Dual-mode with thermostatic control', spec: '10" x 8" head' },
    { name: 'Cascade Waterfall', price: 269, img: 'assets/images/Gold_hand_shower_overlooking_pool_202607190034.jpeg', cat: 'Showerheads', badge: '', desc: 'Wide 14-inch waterfall showerhead that delivers a gentle, even flow. The minimalist design complements any modern bathroom.', material: 'Brass with matte finish', tech: 'Wide laminar flow', spec: '14" width' },
    { name: 'WallMount Pro', price: 219, img: 'assets/images/Washbasin_premium_level_image_2K_202607190117.jpeg', cat: 'Showerheads', badge: 'New', desc: 'Adjustable wall-mounted showerhead with 360° rotation and six spray patterns. Precision-engineered brass construction.', material: 'Solid brass', tech: '6 spray patterns, 360° rotation', spec: 'Universal mount' },
    { name: 'Silk Protein Shampoo', price: 48, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=650&fit=crop', cat: 'Haircare', badge: '', desc: 'Nourishing shampoo infused with silk proteins and argan oil. Gently cleanses while restoring shine and strength to damaged hair.', material: 'Natural botanicals', tech: 'Silk protein complex', spec: '8.4 fl oz' },
    { name: 'Silk Protein Conditioner', price: 44, img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=650&fit=crop', cat: 'Haircare', badge: '', desc: 'Rich conditioner with silk amino acids and shea butter. Detangles, hydrates, and leaves hair silky smooth without weighing it down.', material: 'Shea butter & silk amino acids', tech: 'Deep hydration formula', spec: '8.4 fl oz' },
    { name: 'Argan Hair Elixir', price: 58, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=650&fit=crop', cat: 'Haircare', badge: '', desc: 'Lightweight organic argan oil treatment that tames frizz, adds shine, and protects against heat damage. Suitable for all hair types.', material: 'Organic argan oil', tech: 'Heat protection up to 450°F', spec: '3.4 fl oz' },
    { name: 'Mineral Shower Gel', price: 42, img: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=500&h=650&fit=crop', cat: 'Skincare', badge: 'Popular', desc: 'Luxurious shower gel enriched with Dead Sea minerals and aloe vera. Gently cleanses while replenishing essential nutrients for radiant skin.', material: 'Dead Sea minerals & aloe', tech: 'pH-balanced formula', spec: '16.9 fl oz' },
    { name: 'HydraGlow Moisturizer', price: 72, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=650&fit=crop', cat: 'Skincare', badge: 'New', desc: 'Lightweight fast-absorbing moisturizer with hyaluronic acid and vitamin B5. Provides 24-hour hydration without clogging pores.', material: 'Hyaluronic acid & B5', tech: '24-hour hydration', spec: '1.7 fl oz' },
  ];

  /* ==========================================
     PRODUCT CARD CLICK → PRODUCT PAGE
     ========================================== */
  document.addEventListener('click', function (e) {
    const card = e.target.closest('.sp-card');
    if (!card) return;
    if (e.target.closest('.sp-quickview') || e.target.closest('.sp-atc') || e.target.closest('.sp-wishlist')) return;
    e.preventDefault();
    const name = card.querySelector('h3')?.textContent?.trim() || 'Product';
    localStorage.setItem('selectedProduct', name);
    window.location.href = 'product.html';
  });

  /* ==========================================
     DYNAMIC PRODUCT PAGE
     ========================================== */
  if (window.location.pathname.includes('product.html')) {
    const prodName = localStorage.getItem('selectedProduct') || 'The Rainfall Elite';
    const prod = shopProductData.find(p => p.name === prodName);
    if (prod) {
      document.querySelector('.pl-category').textContent = prod.cat;
      document.querySelector('.pl-title').textContent = prod.name;
      document.querySelector('.pl-price').textContent = `$${prod.price}`;
      document.querySelector('.pl-desc').textContent = prod.desc;
      const mainImg = document.getElementById('plMainImg');
      if (mainImg) { mainImg.src = prod.img; mainImg.alt = prod.name; }
      document.querySelector('.pl-breadcrumb span').textContent = prod.cat;

      document.getElementById('plSpec1').textContent = prod.material;
      document.getElementById('plSpec2').textContent = prod.tech;
      document.getElementById('plSpec3').textContent = prod.spec;
    }
  }

  /* ==========================================
     ADD TO CART
     ========================================== */
  function extractPrice(el) {
    if (!el) return 0;
    const sale = el.querySelector('.sale');
    if (sale) return parseFloat(sale.textContent.replace(/[^0-9.]/g, '')) || 0;
    const original = el.querySelector('.original');
    if (original) return parseFloat(original.textContent.replace(/[^0-9.]/g, '')) || 0;
    const match = el.textContent.match(/\$?([0-9,]+\.?\d*)/);
    return match ? parseFloat(match[1].replace(/,/g, '')) : 0;
  }

  document.querySelectorAll('.add-to-cart, .btn-primary:not([onclick]), .sp-atc').forEach(btn => {
    btn.addEventListener('click', function (e) {
      if (this.closest('.hero-cta') || this.closest('.featured-actions') || this.closest('.fc-cta')) return;
      const card = this.closest('.product-card, .sp-card');
      if (card) {
        const name = card.querySelector('h3')?.textContent || 'Product';
        const priceEl = card.querySelector('.product-price, .sp-price');
        const price = priceEl ? extractPrice(priceEl) : 0;
        const img = card.querySelector('.product-card-image img, .sp-card-image img')?.getAttribute('src') || '';
        addToCart(name, price, img);
      } else {
        showToast('Added to your bag');
      }
    });
  });

  // Also handle Add to Bag on product detail page
  document.querySelector('.product-actions-detail .btn-primary')?.addEventListener('click', function () {
    const name = document.querySelector('.product-info h1')?.textContent || 'Product';
    const priceText = document.querySelector('.product-price-lg')?.textContent || '0';
    const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
    const img = document.querySelector('.product-gallery-main img')?.getAttribute('src') || '';
    const variant = document.querySelector('.variant-btn.active')?.getAttribute('aria-label') || 'Standard';
    addToCart(name, price, img, variant);
  });

  /* ==========================================
     MAGNETIC BUTTON EFFECT
     ========================================== */
  document.querySelectorAll('.btn-premium, .btn-text').forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', function () {
      this.style.transform = 'translate(0, 0)';
    });
  });

  /* ==========================================
     IMAGE ZOOM ON HOVER (Product Gallery)
     ========================================== */
  document.querySelectorAll('.product-gallery-main').forEach(container => {
    const img = container.querySelector('img');
    if (!img) return;

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
    });
  });

  /* ==========================================
     LUXURY CARDS MOUSE PARALLAX
     ========================================== */
  document.querySelectorAll('.lux-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
      card.style.transform = card.classList.contains('lux-card-2')
        ? `translateY(28px) perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`
        : card.classList.contains('lux-card-3')
        ? `translateY(8px) perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`
        : `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
      const glass = card.querySelector('.lux-card-glass');
      if (glass) {
        const gx = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        glass.style.transform = `translateY(0) translateX(${gx}px)`;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      const glass = card.querySelector('.lux-card-glass');
      if (glass) glass.style.transform = '';
    });
  });

  /* ==========================================
     BEST SELLERS — MOUSE TRACKING LIGHT
     ========================================== */
  document.querySelectorAll('.bs-card').forEach(card => {
    const light = card.querySelector('.bs-card-light');
    if (!light) return;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      light.style.setProperty('--mx', x + '%');
      light.style.setProperty('--my', y + '%');
    });
  });

  /* Wishlist toggle */
  document.querySelectorAll('.bs-wishlist').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const icon = this.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        this.classList.add('active');
        showToast('Added to wishlist');
      } else {
        icon.classList.replace('fas', 'far');
        this.classList.remove('active');
      }
    });
  });

  /* Color variant selection */
  document.querySelectorAll('.bs-color-variants').forEach(group => {
    group.querySelectorAll('span').forEach(swatch => {
      swatch.addEventListener('click', function (e) {
        e.stopPropagation();
        group.querySelectorAll('span').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
      });
    });
  });

  /* ==========================================
     FC SECTION — MOUSE PARALLAX
     ========================================== */
  const fcFrame = document.querySelector('.fc-visual-frame');
  if (fcFrame && window.innerWidth > 768) {
    fcFrame.addEventListener('mousemove', (e) => {
      const rect = fcFrame.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      fcFrame.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    fcFrame.addEventListener('mouseleave', () => {
      fcFrame.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
    });
  }

  console.log('%c Bold International ', 'background: #1A1A1A; color: #D4AF64; font-size: 1.2rem; padding: 8px 16px; font-family: serif;');
  console.log('%c Pure Water. Pure Living. ', 'color: #8A8A8A; font-size: 0.85rem;');
});


