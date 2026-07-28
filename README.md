# Suits Agency — Sitio web

Sitio oficial de **Suits Agency**, agencia oficial de Bigo Live en Latinoamérica.
Publicado con GitHub Pages en https://suitsagency.lat

---

## Estructura

```
/                    Inicio (hero, tips, navegación, países, redes)
/academia/           Guías en video para emisores
/pagos/              Tabla de remuneración + calculadora
/registro/           Pasos para postularse
/soporte/            Preguntas frecuentes y reglamento
/privacidad/         Política de privacidad (requisito para anunciar con pixel)
404.html             Página de error con marca
```

### Archivos compartidos

| Archivo | Para qué sirve |
|---|---|
| `styles.css` | Estilos comunes a todas las páginas (header, colores, tarjetas, footer) |
| `include.js` | Comportamiento del menú: abrir/cerrar y marcar la página activa |
| `CNAME` | Dominio personalizado (`suitsagency.lat`) |
| `robots.txt` / `sitemap.xml` | Indexación en buscadores |

---

## Cómo editar

**El header está escrito dentro de cada página**, no se inyecta por JavaScript.
Se hizo así para que el menú sea visible para Google y funcione aunque el JS falle.

> ⚠️ Si agregás o cambiás un link del menú, hay que editarlo en **las 6 páginas**
> (las 5 principales + `404.html`).

Cada página tiene además un `<style>` propio con lo específico de esa página.
Lo que se repite en varias vive en `styles.css`.

---

## Reglas de maquetación

Tres reglas que viven en `styles.css` y valen para todo el sitio. Si las
rompés, vuelven los desbordes y los tamaños desparejos.

### 1. `box-sizing` global

```css
*, *::before, *::after { box-sizing: border-box; }
```

Está en la primera línea de `styles.css`. Hace que el padding y el borde se
cuenten **dentro** del ancho de un elemento.

Sin esta regla, cualquier elemento con `width: 100%` más padding termina más
ancho que su contenedor y se desborda hacia la derecha. Era lo que hacía que
el botón del hero midiera 386 px dentro de una columna de 352.

**No la borres.** Si algo se ve más angosto de lo esperado, el problema es el
padding de ese elemento, no esta regla.

### 2. Un solo sistema de botones

Todos los CTA del sitio salen de un mismo bloque en `styles.css`. Comparten
ancho, alto, radio y tipografía. **Lo único que cambia entre uno y otro es el
color.**

```css
:root {
    --btn-radio: 50px;        /* píldora */
    --btn-padding: 15px 24px;
    --btn-ancho: 340px;       /* ancho máximo, centrado */
}
```

Cambiar `--btn-radio` a `8px` vuelve rectangulares **todos** los botones del
sitio de una sola vez. No hay que tocar página por página.

| Clase | Dónde | Color |
|---|---|---|
| `.cta-main` | cierre de inicio, academia, pagos y soporte | violeta sólido |
| `.cred-cta` | botón del hero, bajo la credencial | violeta sólido |
| `.support-cta .action-btn` | soporte, "Hablar con soporte" | contorno verde |

Si agregás un botón nuevo, ponele una de esas clases y **no le declares
`padding`, `width`, `border-radius` ni `font-size` propios**. Eso rompe la
unificación y es exactamente lo que había antes. Para una variante de color
nueva, agregá solo las propiedades de color y sumá el selector al bloque
compartido.

`.hero-accion` en `index.html` tiene `max-width: 348px`, o sea `--btn-ancho`
más los 4 px de padding de cada lado. Gracias a eso la credencial, el botón y
las tres pastillas del hero miden exactamente lo mismo. **Si cambiás
`--btn-ancho`, ajustá también ese valor** o el hero se desalinea.

### 3. La columna de contenido se define una sola vez

```css
.container {
    width: 100%;
    max-width: var(--ancho, 650px);
    margin: 0 auto;
    padding: 20px 16px;
}
```

Cada página declara únicamente su ancho máximo de escritorio, en su propio
`<style>`:

| Página | Ancho |
|---|---|
| Pagos | `--ancho: 900px` (la tabla necesita espacio) |
| Soporte | `--ancho: 650px` |
| Registro | `--ancho: 500px` |
| Academia | `--ancho: 450px` |

El margen lateral en celular es 16 px en todas, así el contenido no salta al
navegar. **No vuelvas a escribir `.container` entero en una página**: si
necesitás otro ancho, cambiá `--ancho` y nada más.

---

## Cómo se escribe

**El sitio entero va en tuteo (tú), nunca en voseo.** "Puedes", "tienes",
"escríbenos".

Al escribir texto nuevo, revisá también las etiquetas del `<head>`:
`description`, `og:description` y `twitter:description` llevan el mismo texto
repetido tres veces. Es donde se escapa el voseo, porque no se ve al mirar la
página pero sí aparece en Google y en la vista previa al compartir por
WhatsApp.

Otras reglas de vocabulario:

- La **meta** son las semillas. Las **horas** son un requisito, nunca una meta.
- Se dice "meta mínima", no "meta más baja".
- No se usa la palabra "nivel" en textos visibles: confunde.
- En el hero no se dice "vía", se dice "formas de cobrar".

---

## Identidad visual

| Color | Hex | Uso |
|---|---|---|
| Negro | `#050505` | Fondo de toda la página |
| Cian | `#00e8ff` | Color de marca en reposo: bordes, íconos, acentos |
| Violeta | `#9e00ff` | Color de acción: CTA, hover, badges activos |
| Plata | `#e0e0e0` | Texto secundario |

**Tipografías:** Bebas Neue (títulos) e Inter (cuerpo).

**Regla:** el CTA principal es el único botón sólido de cada página.

---

## Reglas de negocio en la calculadora (`/pagos/`)

- **Metas por escalón:** si no se alcanza exactamente la meta de un nivel, se cobra
  el nivel inmediato inferior. No hay valores intermedios.
- **Horas:** 44h o más paga 100%; entre 20 y 43h paga 50%; menos de 20h paga $0.
- **Primer mes:** pago proporcional (horas ÷ 44), sin el mínimo de 20h.
- **Monedero:** se calcula como `semillas ÷ 210`, independiente del nivel alcanzado.

La tabla de niveles y remuneraciones sale del documento oficial de Bigo Live LATAM.

---

## Imágenes

Están optimizadas al tamaño real en que se muestran. Antes de subir una imagen
nueva, redimensionala: no subas originales de cámara o de 1000px+ para elementos
que se ven a 100px.

---

## Elementos de conversión

| Elemento | Dónde vive | Aparece en |
|---|---|---|
| Botón flotante de WhatsApp | `include.js` (`botonWhatsapp`) | Las 6 páginas |
| Bloque anti-objeción "¿Esto es real?" | `index.html` | Inicio |
| CTA de cierre (`.cta-cierre`) | HTML de cada página | Inicio, Academia, Pagos, Soporte |
| Línea de fricción cero (`.cta-nota`) | HTML de cada página | Inicio, Academia, Pagos, Registro, Soporte |
| Link secundario a WhatsApp (`.cta-alt`) | HTML de cada página | Inicio, Academia, Soporte |
| Atajo a WhatsApp arriba del FAQ (`.soporte-atajo`) | `soporte/index.html` | Soporte |
| Estilos de todo lo anterior | `styles.css` (bloque final) | Compartido |

**Ningún botón de WhatsApp va sólido.** Siempre contorno o texto: el único
botón lleno de cada página es el violeta del CTA principal.

**Para cambiar el número de WhatsApp** hay que tocarlo en `include.js` (constante
`WHATSAPP_NUM`) **y** en los links que están escritos dentro del HTML.

Los clics a WhatsApp, a `/registro/` y a Bigo ya los mide `tracking.js` solo:
detecta la conversión por el destino del link, no hace falta marcar cada botón.


---

## Formulario de captación

Vive en `/registro/`. Los envíos los procesa **Formspree** y llegan por email a
`suitsagencylat@gmail.com`.

**Está activo.** La constante `FORMSPREE`, en el script del final de
`registro/index.html`, ya tiene el ID real.

El plan gratis acepta **50 envíos por mes** y guarda el historial **30 días**.
Conviene exportar los contactos a una planilla propia cada tres o cuatro
semanas, antes de que se borren. Si se llena el cupo mensual, Formspree deja
de aceptar envíos hasta el mes siguiente.

Para cambiar de casilla o de formulario, se crea uno nuevo en formspree.io y se
reemplaza el ID de esa línea. Si alguna vez vuelve a decir `PONER_ID`, el
formulario valida y muestra el mensaje de éxito pero **no envía nada** — sirve
para probar el diseño sin gastar el cupo.

El envío exitoso dispara el evento `lead_formulario` (GA4) / `Lead` (Meta).

---

## Pendiente

**Clips del carrusel** (`clips/`): siguen siendo los de ejemplo. Van
grabaciones de emisores reales en vivo, en momentos emocionantes —
regalos, PK, salas llenas.
