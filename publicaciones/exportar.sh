#!/usr/bin/env bash
# Convierte cada placa .html en un .png de 1080x1350 listo para Instagram.
#
#   ./exportar.sh
#
# Necesita Chrome o Chromium. Si esta en otra ruta, pasalo asi:
#   CHROME=/ruta/a/chrome ./exportar.sh
#
# El --virtual-time-budget es lo que evita que la captura se dispare antes
# de que terminen de cargar las tipografias: sin eso salen en Arial.

set -euo pipefail
cd "$(dirname "$0")"

if [ -z "${CHROME:-}" ]; then
    for c in /opt/pw-browsers/chromium-*/chrome-linux/chrome \
             "$(command -v chromium || true)" \
             "$(command -v chromium-browser || true)" \
             "$(command -v google-chrome || true)" \
             "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
        if [ -x "$c" ]; then CHROME="$c"; break; fi
    done
fi

if [ -z "${CHROME:-}" ] || [ ! -x "$CHROME" ]; then
    echo "No encontre Chrome/Chromium. Pasalo con CHROME=/ruta/a/chrome ./exportar.sh" >&2
    exit 1
fi

for f in post-*.html; do
    nombre="${f%.html}"
    "$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
        --force-device-scale-factor=1 --window-size=1080,1350 \
        --virtual-time-budget=8000 \
        --screenshot="$nombre.png" "file://$PWD/$f" 2>/dev/null
    echo "  $nombre.png"
done

echo "Listo."
