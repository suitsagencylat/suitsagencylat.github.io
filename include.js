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
  // Deja todas las direcciones en la misma forma para poder compararlas:
  // sin 'index.html' y siempre terminadas en barra.
  function ruta(p) {
    return p.replace(/index\.html$/, '').replace(/\/*$/, '/');
  }

  function init() {
    // Marca el link activo comparando cada link con la dirección actual.
    //
    // Antes esto era una lista de rutas escrita a mano con 'inicio' como
    // valor por defecto: cualquier pagina que no estuviera en la lista
    // (/privacidad/, el 404) terminaba marcando "Inicio" como pagina
    // actual, y eso le miente al lector de pantalla via aria-current.
    // Comparando contra el href de cada link, el menu se describe solo:
    // una pagina nueva no necesita tocar este archivo, y donde ningun
    // link corresponde no se marca nada, que es lo correcto.
    const aqui = ruta(window.location.pathname);

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (ruta(new URL(link.href, window.location.href).pathname) === aqui) {
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
      // El header se vuelve vidrio para que no quede la costura
      const cab = document.querySelector('.main-header');
      if (cab) cab.classList.add('nav-abierta');
      menuToggle.setAttribute('aria-expanded', 'true');
      const icon = menuToggle.querySelector('i');
      if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-xmark'); }
    }

    function cerrar() {
      mainNav.classList.remove('active');
      overlay.classList.remove('active');
      const cab = document.querySelector('.main-header');
      if (cab) cab.classList.remove('nav-abierta');
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

    botonWhatsapp();
  }

  // ============================================
  // Boton flotante de WhatsApp
  //
  // Se inyecta por JS para no repetirlo en las 6 paginas. No es
  // contenido indexable (el numero ya esta en el HTML de /registro/
  // y en las redes de la home), asi que no perdemos nada en SEO.
  // El clic lo mide tracking.js solo: la regla de wa.me ya existe.
  //
  // Para cambiar el numero o el texto, tocar aca abajo.
  // ============================================
  const WHATSAPP_NUM  = '595982678695';
  const WHATSAPP_MSG  = 'Hola! Quiero informacion para ser emisor de Bigo Live con Suits Agency.';

  function botonWhatsapp() {
    if (document.querySelector('.wa-float')) return;

    const a = document.createElement('a');
    a.className = 'wa-float';
    a.href = 'https://wa.me/' + WHATSAPP_NUM + '?text=' + encodeURIComponent(WHATSAPP_MSG);
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Escríbenos por WhatsApp');
    a.innerHTML = '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span>Escríbenos</span>';
    document.body.appendChild(a);
    apartarSiEstorba(a);
  }

  // El flotante y el CTA principal del hero se pisan en pantallas
  // chicas. Mientras el CTA se ve, el flotante se aparta; apenas
  // sale de pantalla, vuelve. Si la pagina no tiene ese CTA
  // (todas menos la home), el flotante queda fijo como siempre.
  function apartarSiEstorba(flotante) {
    const cta = document.querySelector('.cred-cta');
    if (!cta || !('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        flotante.classList.toggle('a-un-lado', e.isIntersecting);
      });
    }, { rootMargin: '-100px 0px -40px 0px' });

    obs.observe(cta);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
