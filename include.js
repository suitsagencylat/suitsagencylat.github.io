// ============================================
// SUITS AGENCY — Header compartido
// Este script inyecta header.html en cada página
// y maneja el menú móvil + Dino automáticamente.
// Se agrega UNA sola vez en cada archivo HTML,
// justo después de <body>.
// ============================================

fetch('/header.html')
  .then(res => res.text())
  .then(html => {

    // Inyecta el header al principio del body
    document.body.insertAdjacentHTML('afterbegin', html);

    // Marca el link activo según la página actual
    const path = window.location.pathname;
    let current = 'inicio';
    if (path.includes('/academia')) current = 'academia';
    else if (path.includes('/pagos')) current = 'pagos';
    else if (path.includes('/registro')) current = 'registro';
    else if (path.includes('/soporte')) current = 'soporte';

    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.dataset.page === current) link.classList.add('active');
    });

    // Menú móvil
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const overlay = document.getElementById('overlay');

    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      overlay.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    });

    overlay.addEventListener('click', () => {
      mainNav.classList.remove('active');
      overlay.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
      });
    });

  })
  .catch(err => console.error('No se pudo cargar el header:', err));
