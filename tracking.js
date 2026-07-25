/* ============================================================
   SUITS AGENCY — MEDICION
   Google Analytics 4 + Pixel de Meta.

   PASO UNICO: pone tus dos IDs aca abajo y listo.
   Mientras digan "PONER_...", no se carga nada y los eventos
   se muestran en la consola del navegador para que puedas probar.
   ============================================================ */

var SUITS_GA4   = 'G-9FBFBXCFFH';    // se ve asi: G-XXXXXXXXXX
var SUITS_META  = 'PONER_ID_META';   // se ve asi: 1234567890123456

/* ------------------------------------------------------------
   De aca para abajo no hace falta tocar nada.
   ------------------------------------------------------------ */
(function () {
    'use strict';

    var hayGA4  = SUITS_GA4.indexOf('PONER_') !== 0;
    var hayMeta = SUITS_META.indexOf('PONER_') !== 0;

    // ---------- Google Analytics 4 ----------
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }

    if (hayGA4) {
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + SUITS_GA4;
        document.head.appendChild(s);
        gtag('js', new Date());
        gtag('config', SUITS_GA4);
    }

    // ---------- Pixel de Meta ----------
    if (hayMeta) {
        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
            n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
            s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', SUITS_META);
        fbq('track', 'PageView');
    }

    // ---------- Registrar un evento ----------
    // nombre : como se va a ver en GA4
    // meta   : evento de Meta (los estandar sirven para optimizar campanas)
    // datos  : contexto extra
    function registrar(nombre, meta, datos) {
        datos = datos || {};

        if (hayGA4) gtag('event', nombre, datos);
        if (hayMeta && meta) fbq('track', meta, datos);

        if (!hayGA4 && !hayMeta) {
            console.log('[medicion] ' + nombre + (meta ? ' / ' + meta : ''), datos);
        }
    }

    window.suitsEvento = registrar;   // por si queres disparar uno a mano

    // ---------- Que cuenta como conversion ----------
    // Se detecta por el destino del enlace: no hay que marcar cada boton.
    var reglas = [
        {
            test:  function (h) { return /wa\.me|api\.whatsapp|chat\.whatsapp/.test(h); },
            ga4:   'contacto_whatsapp',
            meta:  'Contact'
        },
        {
            // Pedir la firma dentro de Bigo: la conversion mas profunda
            test:  function (h) { return /bigo\.tv\/user/.test(h); },
            ga4:   'solicitud_firma',
            meta:  'Lead'
        },
        {
            test:  function (h) { return /play\.google\.com|apps\.apple\.com/.test(h); },
            ga4:   'descarga_app',
            meta:  'AddToCart'
        },
        {
            test:  function (h) { return /\/registro\/?$/.test(h); },
            ga4:   'abrir_registro',
            meta:  'InitiateCheckout'
        },
        {
            test:  function (h) { return /instagram\.com|tiktok\.com/.test(h); },
            ga4:   'clic_red_social',
            meta:  null
        }
    ];

    document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href]');
        if (!a) return;

        var href = a.getAttribute('href') || '';

        for (var i = 0; i < reglas.length; i++) {
            if (reglas[i].test(href)) {
                registrar(reglas[i].ga4, reglas[i].meta, {
                    destino: href,
                    texto:   (a.innerText || '').trim().slice(0, 60),
                    pagina:  location.pathname
                });
                break;
            }
        }
    }, true);

    // ---------- Senales de interes alto ----------
    document.addEventListener('DOMContentLoaded', function () {

        // Calcular remuneracion en /pagos/: quien hace esto esta evaluando en serio
        var calc = document.getElementById('calcBtn');
        if (calc) calc.addEventListener('click', function () {
            registrar('uso_calculadora', 'ViewContent', { pagina: location.pathname });
        });

        // Reproducir un clip del carrusel de la home
        var track = document.getElementById('reelTrack');
        if (track) track.addEventListener('click', function (e) {
            var card = e.target.closest && e.target.closest('.reel-card');
            if (!card || card.dataset.pos !== '0' || card.classList.contains('playing')) return;
            var nom = card.querySelector('.reel-nombre');
            registrar('ver_clip', null, { clip: nom ? nom.innerText.trim() : '' });
        }, true);

        // Abrir una pregunta del FAQ en /soporte/
        document.querySelectorAll('.faq-question').forEach(function (q) {
            q.addEventListener('click', function () {
                registrar('abrir_faq', null, {
                    pregunta: (q.innerText || '').trim().slice(0, 80)
                });
            });
        });
    });

})();
