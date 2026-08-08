/* ==========================================================
   script.js
   Simple, readable JavaScript for the portfolio.
   Sections:
     1. Mobile navigation
     2. Dark / light mode
     3. Smooth scrolling (closes mobile menu on click)
     4. Section reveal animation
     5. Current year in footer
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------
     1. MOBILE NAVIGATION
     Toggles the nav menu open/closed on small screens.
     ------------------------------------------------------ */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  function closeMenu() {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleMenu);
  }

  /* ------------------------------------------------------
     2. DARK / LIGHT MODE
     Reads saved preference (or system preference) on load,
     and lets the user toggle + saves the choice.
     ------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const STORAGE_KEY = 'portfolio-theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    // Fall back to the user's system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
      localStorage.setItem(STORAGE_KEY, currentTheme);
    });
  }

  /* ------------------------------------------------------
     3. SMOOTH SCROLLING + close mobile menu after clicking
     a nav link (CSS "scroll-behavior: smooth" handles the
     actual scrolling; this just tidies up the mobile menu).
     ------------------------------------------------------ */
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  /* ------------------------------------------------------
     4. SECTION REVEAL ANIMATION
     Fades/slides elements with the "reveal" class into view
     as the user scrolls down the page.
     ------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Skip the animation entirely and just show everything.
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for very old browsers without IntersectionObserver
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ------------------------------------------------------
     5. CURRENT YEAR IN FOOTER
     ------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
