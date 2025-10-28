// Smooth page transitions: fade-in on load, fade-out on navigation
(() => {
  const FADE_DURATION_MS = 200;
  const OVERLAY_ID = 'page-transition-overlay';

  function ensureOverlay() {
    let overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = OVERLAY_ID;
      Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        background: getComputedStyle(document.documentElement).getPropertyValue('--page-bg')?.trim() || getComputedStyle(document.body).backgroundColor || '#e9ecef',
        opacity: '0',
        pointerEvents: 'none',
        transition: `opacity ${FADE_DURATION_MS}ms ease`,
        zIndex: '2000'
      });
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  // Mark current nav link as active based on location
  function setupActiveNavSync() {
    const tryMark = () => {
      const navLinks = document.querySelectorAll('.navbar .nav-link');
      if (!navLinks || navLinks.length === 0) return false;
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      navLinks.forEach(link => link.classList.remove('active'));
      let matched = Array.from(navLinks).find(a => {
        const href = a.getAttribute('href');
        if (!href) return false;
        const hrefPath = href.split('/').pop();
        if (hrefPath === currentPath) return true;
        // Treat root as index.html
        if ((currentPath === '' || currentPath === 'index.html') && (hrefPath === '' || hrefPath === './' || hrefPath === 'index.html')) return true;
        return false;
      });
      if (matched) matched.classList.add('active');
      // Ensure interactions are bound once header is present
      enhanceInternalLinks();
      setupBurgerMenu();
      return true;
    };

    // Immediate try (in case header is already in DOM)
    if (tryMark()) return;

    // Observe header container for when header.html is injected
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;
    const observer = new MutationObserver(() => {
      if (tryMark()) observer.disconnect();
    });
    observer.observe(headerContainer, { childList: true, subtree: true });
  }

  function handleLinkClick(event) {
    const anchor = event.currentTarget;

    // Respect new-tab/middle/modified clicks
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.button && event.button !== 0) return;
    const href = anchor.getAttribute('href');

    // Ignore if href is empty, hash, javascript, or external
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;

    // If same-page anchor, let default happen
    if (url.pathname === window.location.pathname && url.hash) return;

    event.preventDefault();
    const overlay = ensureOverlay();
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '1';
    setTimeout(() => {
      window.location.href = url.href;
    }, FADE_DURATION_MS);
  }

  function enhanceInternalLinks() {
    const links = document.querySelectorAll('.navbar .nav-link, a[data-transition="true"]');
    links.forEach((a) => {
      a.removeEventListener('click', handleLinkClick);
      a.addEventListener('click', handleLinkClick);
    });
  }

  // Mobile burger menu
  function setupBurgerMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.navbar .nav-menu');
    if (!navbar || !navMenu) return;

    // Create burger if missing
    let burger = navbar.querySelector('.burger');
    if (!burger) {
      burger = document.createElement('button');
      burger.className = 'burger';
      burger.setAttribute('aria-label', 'Меню');
      burger.setAttribute('aria-expanded', 'false');
      burger.innerHTML = '<span></span><span></span><span></span>';
      navbar.appendChild(burger);
    }

    const openMenu = () => {
      navbar.classList.add('open');
      document.body.classList.add('menu-open');
      burger.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      navbar.classList.remove('open');
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
      if (navbar.classList.contains('open')) closeMenu(); else openMenu();
    };

    // Handlers
    burger.removeEventListener('click', toggleMenu);
    burger.addEventListener('click', toggleMenu);

    // Close on link click (before navigation transition)
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => closeMenu(), { once: true });
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.classList.contains('open')) return;
      if (!navbar.contains(e.target)) closeMenu();
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    ensureOverlay();
    enhanceInternalLinks();
    setupBurgerMenu();
    // Ensure active nav link persists across pages after header is loaded
    setupActiveNavSync();
  });
})();


