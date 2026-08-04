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

## Font Awesome: la versión y el hash van juntos

Los íconos vienen de Font Awesome por CDN. La etiqueta está escrita en
**las 7 páginas** (las 5 principales + `404.html` + `privacidad`) y lleva
un `integrity`, que es la huella del archivo:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css"
      integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer">
```

El navegador descarga el archivo, calcula su huella y la compara con esa.
Si no coinciden, **no lo carga a medias: lo descarta entero y desaparecen
todos los íconos del sitio**.

> ⚠️ **Nunca cambies el número de versión sin cambiar también el hash.**
> Son un par: el hash pertenece a esa versión exacta. Cambiar uno solo
> rompe los íconos de las 7 páginas de una.

Para actualizar: buscá `font-awesome` en **cdnjs.com**, copiá la etiqueta
completa que te da (ya viene con el hash correcto) y reemplazá la línea en
las 7 páginas. El `crossorigin="anonymous"` es obligatorio — sin él el
`integrity` no funciona.

Al subir de versión mayor conviene mirar los íconos después: pueden
renombrarse. Los que usa el sitio son todos de uso corriente
(`fa-house`, `fa-bars`, `fa-check`, `fa-chevron-down`, `fa-gem`,
`fa-whatsapp`…), así que el riesgo es bajo, pero se revisa igual.

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

## Carrusel de emisores (home)

La sección "Ellos ya dieron el primer paso". Coverflow de tarjetas que
**se dan vuelta**: al frente la imagen del emisor, al dorso su ficha.

**Ya no hay video.** Se quitó a propósito; abajo está cómo volver a
ponerlo el día que haya clips.

### Cómo está armada una tarjeta

```html
<article class="reel-card cy">      <!-- .cy = acento cian; sin clase = violeta -->
  <div class="reel-flip">           <!-- esto es lo que gira -->
    <div class="reel-cara reel-frente"> ... imagen, chapita, nombre ... </div>
    <div class="reel-cara reel-dorso">  ... la ficha ... </div>
  </div>
</article>
```

El acento **alterna** tarjeta por tarjeta con la clase `.cy`, y el dorso
usa siempre el color contrario al frente. Si agregás o quitás tarjetas,
mantené la alternancia.

### Reglas que no hay que romper

- **`transform-style: preserve-3d` va solo en `.reel-flip`**, nunca en
  `.reel-card` ni en `.reel-track`. Un contexto 3D ahí hace que las
  tarjetas ignoren el recorte de `.reel-stage` y la página se pueda
  arrastrar de costado. Ya pasó una vez.
- La `perspective` del volteo se le da **solo a la tarjeta centrada**
  (`.reel-card[data-pos="0"]`). Es la única que gira y la única que está
  entera dentro del recorte.
- Al cambiar de tarjeta, la que sale del centro **vuelve sola al frente**.
  Si no, la siguiente aparecería ya dada vuelta.

### Las imágenes

Van en `clips/`, como `poster-2.webp` a `poster-5.webp`.
(`poster-1.webp` quedó sin uso: la tarjeta 1 ya no es de un emisor.)

- **1080 × 1920** (9:16), que es la proporción de la tarjeta. Componer
  directo en esa medida: lo que armes es lo que se ve, casi sin recorte.
- **WebP**, entre 40 y 80 KB.
- Los colores de las piezas son los dos de la marca y nada más:
  `#00e8ff` y `#9e00ff`, invertidos entre una pieza y la siguiente.
- El velo de la tarjeta es negro al 92% en la franja de abajo, así que
  aplasta lo que haya debajo. El nombre se lee siempre, sea clara u
  oscura la foto.
- Mantener la misma escala del sujeto en todas: si una es plano de tres
  cuartos y otra es primerísimo plano, el conjunto se rompe.

### Nombres y países

**Son ficticios a propósito**, para resguardar la privacidad y la
seguridad de los emisores. No se usan sus datos reales en la tarjeta.

### Cómo se avisa que la tarjeta gira

Tres señales, porque sin botón de play no hay nada que sugiera que se
puede tocar:

1. La tarjeta centrada **se asoma una sola vez** cuando la sección entra
   en pantalla (clase `guino`, la pone el IntersectionObserver).
2. Una chapita **"Ver ficha"** abajo a la derecha, solo en la tarjeta
   centrada y solo cuando está de frente.
3. El **botón de girar** entre las flechas, que queda siempre.

El guiño respeta `prefers-reduced-motion`.

### Si algún día vuelve el video

Hay que reponer cuatro cosas dentro de `.reel-frente`: el `<video>`, el
botón de play, el de sonido y la chapita de duración; más el atributo
`data-src` en el `<article>` con la ruta del `.mp4`. Y hay que resolver
el choque de gestos: hoy tocar la tarjeta la voltea, así que el play
tiene que quedarse con el centro y el volteo pasar solo a la chapita y
al botón.

Los `.mp4` van en `clips/`. Referencia de peso: unos 8 segundos en
720 × 1280 no deberían pasar de 1 MB.

---

## La credencial del hero

Las dos caras son **el mismo documento visto de los dos lados**, y ese es
el punto: cierra el triángulo agencia → plataforma → emisor.

| Cara | De quién es | Qué dice |
|---|---|---|
| Anverso | De la agencia | Sello **Verificada**, región, 0 % de comisión |
| Dorso | **Tuya**, todavía en blanco | Nombre, hueco de foto, estado **Por verificar** |

La palabra se repite a propósito: adelante la agencia ya está
*Verificada*, atrás vos estás *Por verificar*. Es el mismo sistema de
estados y la agencia es el puente. Se usa el vocabulario de Bigo
(*emisor oficial*, *emisor verificado*), no uno inventado.

> ⚠️ **El dorso promete una credencial real.** El hueco de la foto y el
> estado *Por verificar* dan a entender que, al verificarse, la persona
> recibe su credencial con su nombre y su foto. **Eso hay que cumplirlo**
> (se envía por WhatsApp al firmar). Si algún día se deja de emitir, hay
> que cambiar el dorso: prometer un documento que no llega hace
> exactamente lo contrario de lo que busca esa sección.

Se dice *Por verificar* y no *Sin verificar*: "sin" nombra una carencia y
en las apps suele leerse como advertencia; "por" nombra un paso que viene.

### Al editar

- El hueco de la foto (`.cred-foto`) va con **trazo cortado y el rótulo
  FOTO** para que se lea como casillero reservado y no como una imagen
  que no cargó. Si se le pone borde sólido, pasa a parecer un error.
- Va al **lateral derecho**, no arriba a la derecha: ahí, en el anverso,
  está el sello *Verificada*, y las dos piezas competirían.
- **El texto del botón vive en dos lugares**: en el HTML del
  `<button data-girar>` y otra vez dentro del script del volteo, al final
  de `index.html`. Si se cambia en uno solo, el botón vuelve al texto
  viejo apenas se gira la tarjeta una vez.

---

## Generador de credenciales (`/credencial/`)

Herramienta interna para emitir la credencial real: se carga nombre y foto
y descarga un PNG de 1080 × 681 listo para mandar por WhatsApp. Es lo que
cumple la promesa del dorso.

**No está enlazada desde ningún lado**: no aparece en el menú, no está en
`sitemap.xml` y lleva `noindex, nofollow`. Se llega solo escribiendo la
dirección.

> A propósito **no** se la agregó a `robots.txt`. Poner un `Disallow` ahí
> la publicaría: `robots.txt` es un archivo público y cualquiera lo lee.
> El `noindex` de la página alcanza para que no la indexen.

El encabezado es el mismo del **anverso** del sitio: logo, `SUITS AGENCY`
al lado, y debajo la bajada en cian. Allá esa bajada dice "Agencia oficial
de Bigo Live"; acá dice de quién es la credencial.

Otras diferencias con la credencial en blanco: el estado dice
**Verificado** (en cian, porque es el dato que cambió), el hueco de la
foto pasa a borde sólido, y el pie dice *Emisor verificado desde …*.

### El género se elige

Un desplegable cambia **tres textos a la vez**: la bajada en cian, el
estado y el pie.

| Opción | Bajada | Estado | Pie |
|---|---|---|---|
| Emisora | Credencial de emisora | Verificada | Emisora verificada |
| Emisor | Credencial de emisor | Verificado | Emisor verificado |
| Sin especificar | Credencial de emisor/a | Verificado/a | Emisor/a verificado/a |

Viene por defecto en **sin especificar**, para no dar por sentado nada
hasta que alguien lo elija. Está en línea con el criterio del sitio, que
por eso dice "SER QUIEN ERES" y no "ser tú mismo".

Como el rol ya lo dice la bajada, el campo del nombre se rotula solo
`NOMBRE`, sin repetirlo.

### Por qué se dibuja en canvas

La credencial se dibuja pixel por pixel con la API de canvas en vez de
fotografiar el HTML con alguna librería. Es más código, pero no suma
dependencias externas y el PNG sale igual siempre.

**Las medidas están duplicadas, y así se decidió que quede.** Los
porcentajes del script son los mismos del CSS del dorso en `index.html`,
pero las dos piezas son independientes: no comparten nada más que el
logo y las tipografías.

Es a propósito. Permite que la credencial que se emite evolucione por su
lado —agregarle datos, sellos o lo que haga falta— sin tocar la plantilla
en blanco del sitio, que cumple otra función.

> Se evaluó unificar los valores en un archivo compartido y **se
> descartó**. No hace falta volver a proponerlo.

La contrapartida a tener presente: si se mueve algo en el dorso de la
home, hay que moverlo acá también, o la credencial que recibe la persona
deja de coincidir con la que vio antes de postular.

### La trampa de las tipografías

Si Bebas Neue y Roboto Mono no llegaron a cargar, el canvas dibuja con la
de respaldo **sin avisar** y la credencial sale con otra letra. Por eso la
página lo detecta y muestra una alerta.

> ⚠️ No sirve `document.fonts.check()`. Si la hoja de Google Fonts no
> cargó, no existe ningún `FontFace` de esa familia y el método devuelve
> `true` igual — "no falta ninguno" —, que es un falso positivo justo en
> el caso que hay que detectar. La página compara **anchos de texto**
> contra dos fuentes de referencia, que sí funciona.

### Sobre publicarla

Estando online, cualquiera que dé con la dirección puede fabricarse una
credencial con la marca. Falsificar una imagen así ya es fácil con
cualquier editor, así que la herramienta no habilita nada nuevo, pero
conviene tenerlo presente. Si algún día molesta, se borra la carpeta y se
usa el archivo en local: funciona igual abierto desde la computadora.

---

## `/prueba/` — copia temporal para revisar cambios

Copia de la home con el racimo de salidas del hero reubicado, para poder
comparar antes de tocar `index.html`. Lleva `noindex, nofollow`, no está
en el sitemap y no la enlaza nada.

**La página abre igual que el sitio real.** Cada control aplica su
propuesta, y al hacerlo lleva la vista hasta lo que cambió y lo hace
destellar.

> Antes abría con todo lo propuesto ya aplicado, así que los botones de
> "propuesto" no hacían nada visible al tocarlos y parecían rotos. Y los
> cambios que ocurrían lejos —los países están a miles de píxeles del
> hero— pasaban desapercibidos.

Trae un **panel flotante** (abajo a la izquierda, arranca plegado) que
alterna en vivo entre lo que hay hoy y lo propuesto:

- Los tres accesos: en el hero / debajo del cierre / ocultos
- El WhatsApp del hero: visible / oculto
- Presencia latinoamericana: antes del cierre / al final
- Texto del carrusel: el actual / el corregido
- Dino del pie: centrado / a la izquierda / en fila con el texto

Sobre el texto del carrusel: *"Todo esto pasa desde un celular"* es un
resto de cuando la sección tenía **videos**. Señalaba los clips de gente
transmitiendo. Al quitarlos, "todo esto" se quedó sin referente.

Sobre el dino: `.dino-mascot` vive en `styles.css` y aparece en **las 7
páginas**. Moverlo de verdad las cambia todas — en la prueba se simula
con clases en el `body` para no tocar el estilo compartido.

> **No carga `tracking.js`.** Si lo cargara, cada visita de prueba
> ensuciaría GA4 y el Pixel con eventos que no son de gente real.

La cinta no se tocó.

**Es temporal.** Cuando se decida, se aplica el cambio en `index.html` y
se borra la carpeta. Se genera con `armar_prueba.py`, que no vive en el
repo: si hay que rehacerla, se copia `index.html` y se repiten los pasos
de arriba.

Al llevar el cambio a `index.html` hay que acordarse del contenedor:
`.accesos` tiene `width: 100%` y dentro del hero lo limitaba
`.hero-accion` (348 px). Fuera de ahí necesita `.accesos-pie` o se
estira hasta cortarse contra los bordes de la pantalla.

---

## `/publicaciones/` — placas para Instagram

Las imágenes que se suben a Instagram, hechas en HTML en vez de en un
editor gráfico. Se editan como texto y salen siempre con la marca exacta
del sitio, porque usan los mismos colores y tipografías.

```
index.html              Las tres juntas, para mirarlas de un vistazo
post-1-oficial.html     Agencia oficial de Bigo Live
post-2-pagos.html       Cuánto se gana
post-3-pasos.html       Los tres pasos del registro
posts.css               Estilo compartido de las tres
fuentes.css             Bebas Neue, Inter y Roboto Mono incrustadas
exportar.sh             Genera los .png de 1080x1350
```

**Para cambiar un texto:** se abre el `.html` y se edita. Nada del
contenido sale del CSS.

**Para volver a generar las imágenes:** `./exportar.sh`. Necesita Chrome o
Chromium; si está en otra ruta, `CHROME=/ruta/a/chrome ./exportar.sh`.

### Por qué las tipografías van incrustadas

`fuentes.css` pesa 360 KB porque lleva las tres familias en base64 en vez
de pedirlas a Google Fonts. Son dos problemas que resuelve de una:

1. La captura se disparaba antes de que la CDN respondiera y los PNG
   salían en Arial. Con las fuentes incrustadas no hay carrera que perder.
2. Las placas se ven igual sin internet y en cualquier máquina.

Solo se incrusta el subconjunto **latin**. Ese rango ya cubre los acentos
del español (`á é í ó ú ñ ü ¿ ¡`); agregar `latin-ext`, cirílico y griego
subía el archivo a 895 KB para caracteres que no se usan.

> Se regeneran con un script que no vive en el repo. Si hay que rehacerlo:
> se pide el CSS a `fonts.googleapis.com` **con User-Agent de navegador**
> (sin eso devuelve `.ttf` en vez de `.woff2`), se filtran los bloques
> `/* latin */` y se reemplaza cada URL por su `data:font/woff2;base64,…`.

### La placa de pagos no lleva cifras, y es a propósito

`post-2-pagos.html` dice que se cobra en dólares y manda la tabla a
`/pagos/`. **No muestra ningún monto.**

La primera versión sí traía una tabla con cuatro escalones sacados del
array `tiers` de `pagos/index.html`. Se descartó por dos motivos:

1. Lo que gana cada emisor **varía muchísimo** —algunos cobran unos pocos
   dólares y otros miles—, así que cualquier cifra suelta es engañosa
   para alguien que recién llega.
2. Un número grande en el feed se lee como **promesa de ingresos**, que es
   justo lo que dispara la sospecha de estafa que el resto de la grilla
   intenta desarmar.

Lo único numérico que quedó es la regla de horas (44 h = pago completo).
Esa no promete plata: ordena expectativas.

> Si alguna vez se vuelve a poner una tabla, tener presente que **no está
> atada a `/pagos/`**: hay que actualizarla a mano cuando cambie el sitio.
> Los estilos de la tabla vieja están en el historial de git.

La carpeta lleva `noindex, nofollow` y no está en el sitemap, igual que
`/prueba/` y `/credencial/`.

---

## Cambios de julio 2026

Anotados acá para no tener que releer todo el archivo.

### Header — tres valores atados

En `styles.css` conviven tres números que dependen entre sí. Si se
mueve uno hay que mover los tres o el contenido se mete abajo del
header:

| Qué | Valor |
|---|---|
| `header { height }` | 64px |
| `.news-ticker { top }` | 64px |
| `body { padding-top }` | 69px |

La leyenda del header va en `position: absolute` colgando del título.
Es a propósito: así se puede achicar, separar o atenuar **sin mover
"SUITS AGENCY"**. Si se la devuelve al flujo normal, cualquier cambio
de tamaño vuelve a empujar el título hacia arriba.

### Cinta

Nueve frases. Dos valores la controlan:

- `.ticker-content { animation: ticker 73s }` — más alto, más lenta
- `.ticker-content span { margin-right: 70px }` — más alto, más aire

La duración es fija y no depende de cuánto texto haya. O sea que
**agregar frases acelera la cinta**: si se suman o quitan, hay que
recalcular los 73s.

### Botón flotante de WhatsApp

`include.js` le pone la clase `.a-un-lado` mientras `.cred-cta` está
en pantalla, para que no tape el CTA principal. Usa un
IntersectionObserver y solo actúa en la home, que es la única página
con ese CTA. Si se renombra `.cred-cta`, el flotante deja de
esconderse.

### Carrusel — cinco tarjetas

La primera **no es un emisor**: es el remate de la sección, con texto
en tres niveles y sin imagen. Su dorso está marcado con
`<!-- PROVISORIO -->` esperando un collage.

`let index = 0` hace que arranque en esa tarjeta. El carrusel es
circular, así que las últimas dos aparecen a la izquierda.

**Cuidado al editar las tarjetas.** Los controles del carrusel
(`reelPrev`, `reelTurn`, `reelNext`, `reelDots`) están **fuera** de
`.reel-track`, después de cerrar `.reel-stage`. Si al reemplazar los
`<article>` se los borra, el script se corta en la primera línea y el
carrusel entero deja de funcionar. Reemplazar solo los `<article>`.

El `<h2>` de la sección lleva `padding: 0 16px`. Sin eso, en celular
la línea mide más que la pantalla y `overflow: hidden` la recorta en
los dos bordes en vez de dejarla bajar de renglón.

### Textos

- El h1 dice **"SER QUIEN ERES"**, no "ser tú mismo". Es por género:
  buena parte de los emisores son mujeres. Está también en el
  `slogan` del JSON-LD; si se cambia uno hay que cambiar el otro.
- **No usar "dos formas de cobrar" ni "dos vías".** Los regalos y la
  remuneración por metas caen en el mismo monedero, como semillas, y
  se retiran de una sola manera.
- Las **metas** son los escalones de semillas; las horas van
  implícitas dentro de cada meta.
- El badge del hero se eliminó junto con su CSS: repetía la leyenda
  del header.
