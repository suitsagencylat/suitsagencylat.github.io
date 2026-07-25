// ============================================
// SUITS AGENCY — Comportamiento del menú
//
// El header ahora está escrito directamente en el HTML de cada
// página (no se inyecta por fetch), así el menú es visible para
// Google y funciona aunque este script falle o tarde en cargar.
// Este archivo solo maneja: abrir/cerrar el menú y marcar el
// link de la página actual.
// ============================================

(function () {
  function init() {
    // Marca el link activo según la página actual
    const path = window.location.pathname;
    let current = 'inicio';
    if (path.includes('/academia')) current = 'academia';
    else if (path.includes('/pagos')) current = 'pagos';
    else if (path.includes('/registro')) current = 'registro';
    else if (path.includes('/soporte')) current = 'soporte';

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.dataset.page === current) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const overlay = document.getElementById('overlay');
    if (!menuToggle || !mainNav || !overlay) return;

    function abrir() {
      mainNav.classList.add('active');
      overlay.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
      const icon = menuToggle.querySelector('i');
      if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-xmark'); }
    }

    function cerrar() {
      mainNav.classList.remove('active');
      overlay.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      const icon = menuToggle.querySelector('i');
      if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-xmark'); }
    }

    menuToggle.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) cerrar(); else abrir();
    });

    // Permite abrir/cerrar el menú con Enter o Espacio (accesibilidad)
    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (mainNav.classList.contains('active')) cerrar(); else abrir();
      }
    });

    overlay.addEventListener('click', cerrar);

    // Cierra el menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cerrar();
    });

    navLinks.forEach(link => link.addEventListener('click', cerrar));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
