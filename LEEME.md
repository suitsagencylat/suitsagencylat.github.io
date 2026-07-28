# Actualización — desbordes y tamaños unificados

Reemplazá estos seis archivos en el repo, respetando las carpetas.
No se agrega ningún archivo nuevo: los seis ya existen.

```
styles.css          → raíz
index.html          → raíz
academia/index.html → carpeta academia/
pagos/index.html    → carpeta pagos/
registro/index.html → carpeta registro/
soporte/index.html  → carpeta soporte/
```

Después del push, esperá uno o dos minutos y recargá con caché limpia:
`styles.css` suele quedar cacheado.

---

## 1. Regla base: `box-sizing`

Al principio de `styles.css`:

```css
*, *::before, *::after { box-sizing: border-box; }
```

Antes esta regla no existía. Sin ella, el padding y el borde se **suman**
al ancho, así que cualquier elemento con `width: 100%` más padding termina
más ancho que su contenedor y se desborda hacia la derecha.

Era la causa de que el botón del hero midiera 386 px dentro de una columna
de 352, y de que el botón violeta de la calculadora sobresaliera 26 px
de su tarjeta.

**No la borres.** Si algún día algo se ve más angosto de lo esperado,
el problema es el padding de ese elemento, no esta regla.

---

## 2. Sistema de botones

Todos los CTA del sitio salen de un solo bloque en `styles.css`. Comparten
ancho, alto, radio y tipografía. **Lo único que cambia entre uno y otro es
el color.**

Tres variables controlan la forma de todos a la vez:

```css
:root {
    --btn-radio: 50px;      /* píldora */
    --btn-padding: 15px 24px;
    --btn-ancho: 340px;     /* ancho máximo, centrado */
}
```

Cambiar `--btn-radio` a `8px` vuelve rectangulares todos los botones del
sitio de una sola vez. No hay que tocar página por página.

| Clase | Dónde | Color |
|---|---|---|
| `.cta-main` | cierre de inicio, pagos y soporte | violeta sólido |
| `.cred-cta` | botón del hero, bajo la credencial | violeta sólido |
| `.support-cta .action-btn` | soporte, "Hablar con soporte" | contorno verde |

### Regla de marca

**Un solo botón sólido por página.** Es el CTA principal, y siempre es el
violeta. Cualquier otro botón va en contorno.

Por eso "Hablar con soporte" pasó de verde sólido a contorno verde: estaba
compitiendo con el POSTULAR AHORA que tiene justo abajo.

### Si agregás un botón nuevo

Ponele una de las clases de la tabla. No le declares `padding`, `width`,
`border-radius` ni `font-size` propios: eso rompe la unificación y es
exactamente lo que había antes.

Si necesitás una variante de color nueva, agregá solo las propiedades de
color y sumá el selector al bloque compartido de `styles.css`.

---

## 3. Columna de contenido (`.container`)

`.container` está definido **una sola vez**, en `styles.css`:

```css
.container {
    width: 100%;
    max-width: var(--ancho, 650px);
    margin: 0 auto;
    padding: 20px 16px;
}
```

Cada página declara únicamente su ancho máximo de escritorio, en su
propio `<style>`:

```css
.container { --ancho: 900px; }   /* pagos: la tabla necesita ancho */
.container { --ancho: 650px; }   /* soporte */
.container { --ancho: 500px; }   /* registro */
.container { --ancho: 450px; }   /* academia */
```

Antes cada página traía su propia definición completa, con estrategias
distintas (`width: 100%`, `90%`, `92%`, sin width). El margen lateral en
celular saltaba entre 10 y 21 px según la página. Ahora es 16 px en todas.

**No vuelvas a escribir `.container` entero en una página.** Si necesitás
otro ancho, cambiá `--ancho` y nada más.

---

## 4. Ancho del hero

`.hero-accion` en `index.html` tiene `max-width: 348px` — o sea, 340 px de
contenido más 4 px de padding de cada lado.

Ese 340 es el mismo `--btn-ancho` de los botones. Gracias a eso, la
credencial, el botón POSTULAR AHORA y las tres pastillas de
Pagos / Academia / Soporte miden exactamente lo mismo.

Si cambiás `--btn-ancho`, ajustá también este valor (`--btn-ancho + 8`)
o el hero se desalinea.

---

## Pendientes conocidos

Estos no están resueltos en esta actualización:

1. **Formspree sin configurar.** En `registro/index.html`, la constante
   `FORMSPREE` sigue en `PONER_ID`. El formulario valida, muestra el
   mensaje de éxito y dispara el evento `lead_formulario` en GA4, pero
   no envía nada. Todo lead que entre hoy se pierde.
2. **Voseo en las meta descriptions.** El sitio es tuteo, pero quedaron
   formas voseantes en las etiquetas `description`, `og:description` y
   `twitter:description` de academia, pagos, registro y 404. También en
   el placeholder del campo Nombre de `registro/index.html`.
3. **Academia sin CTA.** Es la única página sin bloque de cierre ni link
   a WhatsApp.
4. **Soporte con un solo link de WhatsApp**, contra diez en la home.
5. **Clips del carrusel** todavía son los de ejemplo.
6. **Sin etiquetas `og:` ni `twitter:`** en academia ni en 404: al
   compartir esas URLs no se genera tarjeta con imagen.
