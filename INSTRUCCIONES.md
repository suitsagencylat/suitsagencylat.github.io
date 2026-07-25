# Sección "Momentos en vivo" — carrusel con video inline

Carrusel coverflow **justo debajo del hero**, antes de las tres tarjetas.
El clip se reproduce **dentro de la tarjeta, en ese mismo tamaño**: no se abre
ninguna ventana ni se agranda nada.

Pensada para clips cortos de transmisión: regalos, PK, salas llenas.

---

## Qué contiene este zip

```
index.html          Tu index.html YA con el carrusel adentro (CSS + HTML + JS)
clips/              6 clips de ejemplo + 6 portadas — REEMPLAZAR
INSTRUCCIONES.md    Este archivo
```

---

## Pasos

1. Subí la carpeta `clips/` a la raíz del repo, al lado de `index.html`.
2. Reemplazá `index.html` por el de este zip.
3. Commit y push. Esperá 1–2 minutos.
4. Reemplazá los clips de ejemplo por los tuyos.

### La carpeta `emisores/` ya no se usa

Las portadas ahora viven en `clips/poster-N.webp`. Si la habías subido, podés
borrarla — salvo que quieras conservar la sección de tarjetas fijas del zip
anterior, pero tener las dos sería repetir lo mismo dos veces.

---

## ¿GitHub o YouTube? → **GitHub**, para este caso

| | GitHub (repo) | YouTube |
|---|---|---|
| Arranque | Instantáneo | 1–2 s de carga del reproductor |
| Peso extra en la página | Ninguno | ~1 MB de scripts |
| Marca ajena | No | Logo y videos sugeridos al final |
| Control del encuadre | Total | Mete barras negras si el clip no es 9:16 |

**Eso fue lo que viste mal antes:** los IDs de prueba apuntaban a videos de tu
Academia, algunos horizontales, metidos en un marco vertical.

### Los límites que sí importan

GitHub Pages recomienda mantener el sitio **por debajo de 1 GB** y tiene un tope
blando de **100 GB de tráfico al mes**. Un archivo no puede pasar de 100 MB.

Con clips de 8–15 segundos bien comprimidos (**1,5 a 3 MB cada uno**) estás
lejísimos. Y como el video usa `preload="none"`, solo se descarga cuando alguien
le da play: no pesa en la carga inicial.

**Pasate a YouTube o Cloudflare Stream** si algún clip supera el minuto, si
sumás más de ~40 clips, o si el tráfico crece mucho.

---

## Cómo preparar cada clip

Vertical 9:16, corto y liviano. Si grabás la pantalla del celular ya sale bien.

```
ffmpeg -i original.mp4 -vf "scale=540:960" -c:v libx264 -crf 28 \
       -preset slow -movflags +faststart -c:a aac -b:a 96k clip-1.mp4
```

`-movflags +faststart` hace que arranque antes de terminar de descargarse.

**Apuntá a 8–15 segundos y menos de 3 MB.** El momento del regalo o el final
del PK, nada más.

### La portada

```
ffmpeg -i clip-1.mp4 -ss 00:00:02 -vframes 1 -vf "scale=540:960" poster-1.webp
```

Las del zip son de ejemplo: reemplazalas por fotogramas reales.

### Nombres de archivo

Respetalos y no tenés que tocar el HTML:

```
clips/clip-1.mp4    clips/poster-1.webp
clips/clip-2.mp4    clips/poster-2.webp
...
```

---

## Editar el contenido de las tarjetas

```html
<article class="reel-card" data-src="https://suitsagency.lat/clips/clip-1.mp4">
    <img src="https://suitsagency.lat/clips/poster-1.webp" alt="..." class="reel-poster">
    <video class="reel-video" playsinline preload="none"></video>
    <div class="reel-shade"></div>
    <div class="reel-top">
        <span class="reel-badge"><span class="dot"></span> Emisor oficial</span>
        <span class="reel-dur"><i class="fa-solid fa-play"></i> 0:12</span>   <!-- duración -->
    </div>
    ...
    <div class="reel-info">
        <h3 class="reel-nombre">Mateo <span class="flag">🇦🇷</span></h3>       <!-- nombre y país -->
        <p class="reel-frase">Garland x300 en plena sala.</p>                 <!-- qué pasó -->
    </div>
</article>
```

Editable: **clip, portada, duración, nombre, bandera y descripción**.

**Sobre la duración:** escribila a mano como referencia. Apenas el clip carga,
el JS la corrige sola con el valor real, así que no importa si te equivocás.

**Sobre el diamante que estaba arriba a la derecha:** lo saqué. En su lugar va
la duración, que sí le sirve al visitante — le dice cuánto dura antes de tocar.

### Agregar o sacar tarjetas

Copiá o borrá un bloque `<article class="reel-card">` completo. Los puntitos de
navegación se generan solos. Alterná `reel-card` y `reel-card cy` para que el
resplandor cambie entre violeta y cian.

---

## El CTA del final

Debajo del carrusel hay un llamado a la acción:

```html
<div class="reel-cta">
    <p>Todo esto pasa desde un celular. El tuyo sirve igual.</p>
    <a href="https://suitsagency.lat/registro/" class="reel-cta-btn">...</a>
    <a href="https://wa.me/595982678695" class="reel-cta-alt">...</a>
</div>
```

**Va en contorno cian, no sólido, a propósito.** Tu regla de marca dice que el
CTA principal es el único botón sólido de cada página, y ese lugar lo ocupa
"POSTULAR AHORA" en el hero. Este acompaña sin robarle jerarquía.

Podés cambiar el texto, pero conservá el enlace a WhatsApp: es el canal que más
convierte en este rubro.

---

## Cómo se comporta

- Tocás una tarjeta lateral → viene al centro.
- Tocás la del centro → arranca el clip ahí mismo, con sonido.
- Tocás de nuevo → pausa.
- Botón de bocina → silencia.
- Si pasás a otro clip, el anterior se corta solo.
- Si la sección sale de pantalla al scrollear, el video se pausa.
- Si el navegador bloquea el audio, arranca en silencio en vez de fallar.

---

## Nota

El badge dice "Emisor oficial", no "EN VIVO": mantiene la estética de sala de
transmisión sin afirmar que hay un live corriendo.

Nombres, países y descripciones son de ejemplo. Cambialos antes de publicar.
