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

  document.addEventListener('DOMContentLoaded', () => {
    ensureOverlay();
    enhanceInternalLinks();
  });
})();


