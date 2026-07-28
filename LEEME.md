# Actualización 2 — tuteo, CTA en Academia, WhatsApp en Soporte y Formspree

Cinco archivos, todos reemplazo de archivos que ya existen.

```
404.html            → raíz
academia/index.html → carpeta academia/
pagos/index.html    → carpeta pagos/
registro/index.html → carpeta registro/
soporte/index.html  → carpeta soporte/
```

`styles.css` e `index.html` **no** cambian en esta tanda. Si ya subiste
la actualización anterior, dejalos como están.

Subí los cinco en un solo commit. Si vas de a uno desde el celular,
esperá que cada despliegue termine en verde antes del siguiente.

---

## 1. Tuteo

El sitio entero va en tuteo (tú), nunca en voseo. Quedaban formas
voseantes en las etiquetas del `<head>`, que no se ven en pantalla pero
sí aparecen en Google y en la vista previa al compartir por WhatsApp.

| Archivo | Antes | Ahora |
|---|---|---|
| `academia` | Aprendé | Aprende |
| `pagos` | Calculá | Calcula |
| `registro` | Sumate, descargá, pedí, firmá | Súmate, descarga, pide, firma |
| `404` | buscás, Volvé | buscas, Vuelve |

En `pagos` y `registro` el texto estaba repetido en tres etiquetas
(`description`, `og:description` y `twitter:description`). Se corrigieron
las tres.

También el placeholder del campo Nombre en `registro`: era "Como querés
que te llamemos", ahora "Como quieres que te llamemos".

**Al escribir texto nuevo**, revisá siempre las tres etiquetas del
`<head>`, no solo la primera. Es donde se escapa el voseo porque no se ve
al mirar la página.

---

## 2. CTA de cierre en Academia

Academia era la única página sin salida: cero botones, cero links a
WhatsApp. Alguien que miraba las guías y se convencía no tenía dónde
tocar.

Se agregó el mismo bloque `.cta-cierre` que ya usan inicio, pagos y
soporte, justo después de los Mandamientos y antes del pie.

No trae estilos propios: usa el sistema de botones de `styles.css`.

---

## 3. Más WhatsApp en Soporte

Soporte tenía un solo link de WhatsApp contra diez de la home, y es
justamente la página donde se resuelven las dudas de estafa. Ahora tiene
tres, en tres momentos distintos de la lectura:

1. **Arriba, antes del FAQ** (`.soporte-atajo`) — para quien no quiere
   leer treinta preguntas y prefiere preguntar directo.
2. **Después del FAQ** (`.support-cta`) — el que ya existía, en contorno
   verde.
3. **Dentro del cierre** (`.cta-alt`) — debajo del POSTULAR AHORA, como
   alternativa para el que todavía duda.

Los tres respetan la regla: **ningún botón de WhatsApp va sólido.** El
único botón lleno de la página sigue siendo el violeta de POSTULAR AHORA.

`tracking.js` mide estos clics solo: detecta la conversión por el destino
del link, no hace falta marcar cada botón.

---

## Corrección a la nota anterior

En el LEEME de la actualización 1 puse que faltaban etiquetas `og:` en
Academia. **Es falso**: Academia ya las tenía completas. La única página
sin etiquetas `og:` es `404.html`, y ahí está bien que no las tenga,
porque lleva `noindex` y nadie comparte una URL rota.

---

## 4. Formulario de captación activo

En `registro/index.html`, la constante `FORMSPREE` ya tiene el ID real.
Los envíos llegan a `suitsagencylat@gmail.com`.

Un envío exitoso dispara el evento `lead_formulario` en GA4 y `Lead` en
el píxel de Meta.

**Límites del plan gratis:** 50 envíos por mes, historial de 30 días.
Conviene exportar los contactos a una planilla propia cada tres o cuatro
semanas, antes de que se borren. Si se llena el cupo mensual, Formspree
deja de aceptar envíos hasta el mes siguiente.

Para cambiar de casilla o de formulario, se crea uno nuevo en formspree.io
y se reemplaza el ID de esa línea. Si alguna vez vuelve a decir `PONER_ID`,
el formulario valida y muestra el mensaje de éxito pero no envía nada.

---

## Pendientes que siguen abiertos

**Clips del carrusel.** Siguen siendo los de ejemplo. Van grabaciones de
emisores reales en vivo, en momentos emocionantes.
