/* ════════════════════════════════════════════════════════════
   RODRÍGUEZ & ASOCIADOS — script.js
════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Inicializar Feather Icons ──────────────────────── */
  if (typeof feather !== 'undefined') {
    feather.replace();
  }


  /* ── 2. Navbar — scroll shadow + active highlight ──────── */
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active section in navbar
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    let currentId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active-nav');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });


  /* ── 3. Hamburger menu ─────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Cerrar menú al hacer clic en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });


  /* ── 4. Smooth scroll para enlaces anchor ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 70; // altura del navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── 5. Animación de tarjetas al entrar en viewport ────── */
  const animatedCards = document.querySelectorAll('.area-card');

  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = parseInt(card.getAttribute('data-delay') || 0, 10);
          setTimeout(() => {
            card.classList.add('visible');
          }, delay);
          cardObserver.unobserve(card);
        }
      });
    }, { threshold: 0.12 });

    animatedCards.forEach(card => cardObserver.observe(card));
  } else {
    // Fallback sin IntersectionObserver
    animatedCards.forEach(card => card.classList.add('visible'));
  }


  /* ── 6. Animación de entrada para secciones ────────────── */
  const fadeEls = document.querySelectorAll(
    '.section-header, .porque-item, .abogado-card, .contacto-card, .trust-item'
  );

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = `opacity 0.55s ease ${i * 40}ms, transform 0.55s ease ${i * 40}ms`;
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      fadeObserver.observe(el);
    });
  }


  /* ── 7. Año dinámico en footer ─────────────────────────── */
  const yearSpans = document.querySelectorAll('.footer-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(s => s.textContent = currentYear);

  // Reemplaza también texto literal si se usa © dinámico
  const footerCopy = document.querySelector('.footer-bottom p');
  if (footerCopy && footerCopy.textContent.includes('2025')) {
    footerCopy.textContent = footerCopy.textContent.replace('2025', currentYear);
  }


  /* ── 8. Resaltar enlace activo en nav con CSS ──────────── */
  // Agregar estilo activo dinámicamente
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .nav-links a.active-nav {
      color: var(--gold) !important;
    }
  `;
  document.head.appendChild(styleTag);

});
