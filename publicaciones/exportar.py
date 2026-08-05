#!/usr/bin/env python3
"""Convierte cada placa .html en un .png listo para Instagram.

    python3 exportar.py

Necesita playwright:  pip install playwright && playwright install chromium

POR QUE NO ES UN SCRIPT DE SHELL
--------------------------------
La primera version usaba Chrome headless con --screenshot y --window-size.
Eso salia mal de una forma dificil de ver: la ventana headless reserva 87px
constantes para la barra del navegador, asi que con --window-size=1080,1350
el viewport real era de 1080x1263 y la imagen igual salia de 1350 de alto.
Los ultimos 87px no eran la placa: eran negro puro del fondo de la ventana.

En las placas con texto casi no se notaba —el pie termina en 1254, justo
arriba del corte—, pero al resplandor cian de abajo a la izquierda lo
cortaba con un filo recto. En el fondo sin texto se veia clarisimo.

Capturar el elemento y no la ventana evita todo eso: el recorte sale del
tamaño real de la caja, sin depender del viewport.
"""
import pathlib
import re
import sys

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    sys.exit("Falta playwright.  pip install playwright && playwright install chromium")

AQUI = pathlib.Path(__file__).parent.resolve()
MEDIDA = re.compile(r"-(\d+)x(\d+)$")
FEED = (1080, 1350)


def medida_de(nombre):
    """El tamaño sale del nombre del archivo; si no lo trae, es el del feed."""
    m = MEDIDA.search(nombre)
    return (int(m.group(1)), int(m.group(2))) if m else FEED


def navegador_local():
    """Chromium ya instalado, si lo hay.

    El paquete de pip pide una revision exacta y falla si en la maquina hay
    otra, aunque sirva perfectamente. Cuando encontramos un Chromium propio
    se lo pasamos a mano y nos ahorramos la descarga.
    """
    for patron in ("chromium-*/chrome-linux/chrome",
                   "chromium-*/chrome-linux64/chrome"):
        for base in (pathlib.Path("/opt/pw-browsers"),
                     pathlib.Path.home() / ".cache/ms-playwright"):
            encontrados = sorted(base.glob(patron)) if base.is_dir() else []
            if encontrados:
                return str(encontrados[-1])
    return None


def main():
    archivos = sorted(AQUI.glob("post-*.html")) + sorted(AQUI.glob("fondo-*.html"))
    if not archivos:
        sys.exit("No encontre ninguna placa (post-*.html o fondo-*.html)")

    fallos = []
    with sync_playwright() as p:
        local = navegador_local()
        navegador = p.chromium.launch(executable_path=local) if local else p.chromium.launch()
        for f in archivos:
            ancho, alto = medida_de(f.stem)
            pagina = navegador.new_page(viewport={"width": ancho, "height": alto})
            pagina.goto(f.as_uri())
            # Sin esto la captura puede dispararse antes de que las fuentes
            # esten listas y los titulares salen en la tipografia de reemplazo.
            pagina.wait_for_load_state("networkidle")
            pagina.evaluate("document.fonts.ready")

            salida = f.with_suffix(".png")
            pagina.locator(".placa").screenshot(path=str(salida))
            pagina.close()

            real = medir(salida)
            ok = real == (ancho, alto)
            print(f"  {salida.name}  {real[0]} x {real[1]}" + ("" if ok else f"  <-- esperaba {ancho} x {alto}"))
            if not ok:
                fallos.append(salida.name)
        navegador.close()

    if fallos:
        sys.exit(f"\nSalieron con el tamaño equivocado: {', '.join(fallos)}")
    print("Listo.")


def medir(png):
    """Ancho y alto de un PNG, leyendo el encabezado IHDR."""
    import struct
    with open(png, "rb") as fh:
        return struct.unpack(">II", fh.read(24)[16:24])


if __name__ == "__main__":
    main()
