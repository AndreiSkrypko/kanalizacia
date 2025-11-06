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
      // Ensure interactions are bound once header is present and navbar title updated
      enhanceInternalLinks();
      setupBurgerMenu();
      setupNavbarTitle();
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

  // Create or update navbar title and CTA button for mobile
  function setupNavbarTitle() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Название слева
    let titleEl = navbar.querySelector('.navbar-title');
    if (!titleEl) {
      titleEl = document.createElement('div');
      titleEl.className = 'navbar-title';
      navbar.appendChild(titleEl);
    }
    const sourceTitle = document.querySelector('.header .logo-title');
    const titleHtml = (sourceTitle?.innerHTML || 'AquaForge').trim();
    titleEl.innerHTML = titleHtml;

    // Иконки соцсетей и кнопка "Расчет стоимости" справа (только на мобильных)
    if (window.innerWidth <= 768) {
      // Создаем контейнер справа
      let rightContainer = navbar.querySelector('.navbar-right-container');
      if (!rightContainer) {
        rightContainer = document.createElement('div');
        rightContainer.className = 'navbar-right-container';
        navbar.appendChild(rightContainer);
      }

      // Иконки соцсетей
      let socialIcons = rightContainer.querySelector('.navbar-social-icons');
      if (!socialIcons) {
        socialIcons = document.createElement('div');
        socialIcons.className = 'navbar-social-icons';
        rightContainer.appendChild(socialIcons);

        // Создаем иконки соцсетей
        const socialLinks = [
          {
            href: 'https://wa.me/375291234567',
            title: 'WhatsApp',
            svg: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>'
          },
          {
            href: 'https://t.me/aquaforge_by',
            title: 'Telegram',
            svg: '<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>'
          },
          {
            href: 'https://instagram.com/aquaforge_by',
            title: 'Instagram',
            svg: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>'
          }
        ];

        socialLinks.forEach(link => {
          const icon = document.createElement('a');
          icon.className = 'navbar-social-icon';
          icon.href = link.href;
          icon.title = link.title;
          icon.target = '_blank';
          icon.rel = 'noopener noreferrer';
          icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">${link.svg}</svg>`;
          socialIcons.appendChild(icon);
        });
      }

      // Кнопка "Расчет стоимости"
      let ctaButton = rightContainer.querySelector('.navbar-cta-button');
      if (!ctaButton) {
        const headerCta = document.querySelector('.header .cta-button');
        if (headerCta) {
          ctaButton = document.createElement('a');
          ctaButton.className = 'navbar-cta-button';
          ctaButton.href = headerCta.href;
          ctaButton.textContent = headerCta.textContent.trim();
          rightContainer.appendChild(ctaButton);
        }
      } else {
        // Обновляем href и текст, если кнопка уже существует
        const headerCta = document.querySelector('.header .cta-button');
        if (headerCta) {
          ctaButton.href = headerCta.href;
          ctaButton.textContent = headerCta.textContent.trim();
        }
      }

      // Перемещаем бургер в контейнер справа, если он еще не там
      const burger = navbar.querySelector('.burger');
      if (burger && !rightContainer.contains(burger)) {
        rightContainer.appendChild(burger);
      }
    } else {
      // На десктопе удаляем мобильные элементы из navbar
      const rightContainer = navbar.querySelector('.navbar-right-container');
      if (rightContainer) rightContainer.remove();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    ensureOverlay();
    enhanceInternalLinks();
    setupBurgerMenu();
    setupNavbarTitle();
    // Ensure active nav link persists across pages after header is loaded
    setupActiveNavSync();
  });

  // Обновляем элементы navbar при изменении размера окна
  window.addEventListener('resize', () => {
    setupNavbarTitle();
  });
})();


