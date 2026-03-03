document.addEventListener('DOMContentLoaded', function () {
  var track = document.querySelector('.cards-track');
  var prev = document.querySelector('.carousel-prev');
  var next = document.querySelector('.carousel-next');

  if (track && prev && next) {
    function getScrollAmount() {
      var card = track.querySelector('.account-card');
      if (!card) return 200;
      var style = window.getComputedStyle(track);
      var gap = parseFloat(style.gap) || 0;
      return card.offsetWidth + gap;
    }

    prev.addEventListener('click', function () {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
  }
});

// Sticky burger nav that appears after main nav is scrolled out of view
document.addEventListener('DOMContentLoaded', function () {
  var mainNav = document.querySelector('.main-nav');
  var scrollNav = document.querySelector('.scroll-nav');
  var scrollBurger = document.querySelector('.scroll-nav-burger');
  var scrollMenu = document.querySelector('.scroll-nav-menu');
  var scrollClose = document.querySelector('.scroll-nav-close');

  if (!mainNav || !scrollNav) return;

  function handleScroll() {
    var y = window.scrollY || window.pageYOffset;

    var mobile = window.innerWidth <= 768;

    // On mobile, always keep the sticky nav visible
    if (mobile) {
      scrollNav.classList.add('scroll-nav--visible');
      return;
    }

    // Desktop/tablet: show once we've scrolled past the main nav
    var desktopThreshold = mainNav.offsetTop + mainNav.offsetHeight;
    var shouldShow = y >= desktopThreshold;

    scrollNav.classList.toggle('scroll-nav--visible', shouldShow);

    if (!shouldShow && scrollMenu) {
      scrollMenu.classList.remove('open');
      if (scrollBurger) scrollBurger.setAttribute('aria-expanded', 'false');
    }
  }

  handleScroll();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);

  if (scrollBurger && scrollMenu) {
    scrollBurger.addEventListener('click', function () {
      var isOpen = scrollMenu.classList.toggle('open');
      scrollBurger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    scrollMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        scrollMenu.classList.remove('open');
        scrollBurger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (scrollClose && scrollMenu && scrollBurger) {
    scrollClose.addEventListener('click', function () {
      scrollMenu.classList.remove('open');
      scrollBurger.setAttribute('aria-expanded', 'false');
    });
  }
});

// Reset zoom to default when zoom gesture is released
function resetZoom() {
  document.body.style.zoom = '1';
  if (window.visualViewport) {
    // Use meta viewport reset for better cross-browser support
  }
  var metaViewport = document.querySelector('meta[name="viewport"]');
  if (metaViewport) {
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0');
    setTimeout(function () {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }, 300);
  }
}

// Mouse wheel zoom: reset on wheel end
var wheelZoomTimeout;
document.addEventListener('wheel', function (e) {
  if (e.ctrlKey) {
    clearTimeout(wheelZoomTimeout);
    wheelZoomTimeout = setTimeout(function () {
      resetZoom();
    }, 200);
  }
}, { passive: true });

// Keyboard zoom: reset on key release
document.addEventListener('keyup', function (e) {
  if (e.ctrlKey || ['Control'].includes(e.key)) {
    // Check if a zoom key was previously pressed
  }
});

var zoomKeyPressed = false;
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '_' || e.key === '0')) {
    zoomKeyPressed = true;
  }
});

document.addEventListener('keyup', function (e) {
  if (zoomKeyPressed) {
    zoomKeyPressed = false;
    resetZoom();
  }
});

// Touch pinch zoom: reset when fingers lift
document.addEventListener('touchend', function (e) {
  if (e.touches.length === 0) {
    // Small delay to let the browser apply the zoom first
    setTimeout(function () {
      resetZoom();
    }, 100);
  }
}, { passive: true });

document.addEventListener('gestureend', function (e) {
  setTimeout(function () {
    resetZoom();
  }, 100);
});