# Auditoría de rendimiento — 12 de noviembre de 2026

## Alcance

Portfolio React 18 + Vite, rutas divididas en chunks y animaciones Framer Motion.
Repositorio indexado en Codebase Memory como `F-Proyectos-portfolio-portfolio`.
Se conservaron los cambios de contenido y componentes que ya estaban en curso.

## Problemas y correcciones

| Hallazgo | Corrección |
| --- | --- |
| Fondo fijo con 26 partículas, 18 grupos SVG, 37 conexiones y auroras con grandes desenfoques animados | Gradientes estáticos y grilla, sin animaciones permanentes del fondo |
| Logo con un callback JavaScript por cuadro | Logo estático con gradiente |
| ShinyText mantenía callbacks por cuadro incluso deshabilitado | Web Animations API; pausa fuera de pantalla, con pestaña oculta y al solicitarlo mediante hover; cancela al desmontar |
| Tarjetas promovidas permanentemente a capas GPU | Eliminación de `will-change`, `translateZ(0)` y promociones redundantes en utilidades de tarjetas |
| Brillos animados en todas las tarjetas | Brillo breve al pasar el cursor; glows grandes estáticos |
| Spotlight medía geometría y escribía estilos en cada mousemove | Agrupación en requestAnimationFrame, con cancelación al desmontar; desactivado para punteros táctiles y movimiento reducido |
| Nuevas superficies de vidrio agregadas durante la auditoría provocaron una regresión | En capas decorativas, reemplazo del filtro SVG de desplazamiento por blur nativo de 6 px; se mantienen bordes, tintes y estructura |
| Script de presupuestos de rendimiento usaba sintaxis Unix | Lanzador Node compatible con Windows |
| Prueba de navegación recargaba la aplicación completa y no detectaba acumulación dentro de la SPA | Navegación con History API, sin recargar el documento |
| El chequeo de acumulación confundía animaciones de entrada con trabajo permanente | Conteo de animaciones infinitas; las transiciones de entrada se verifican mediante las pruebas de navegación |

## Mediciones

Chrome instalado, headless, viewport de escritorio 1440 × 900; scroll controlado
de 4 segundos. Los archivos de producción se entregan mediante interceptación de
Playwright, porque el entorno bloquea sockets locales. Las fuentes externas no
se descargan. Estos datos miden renderizado, no red, backend ni Core Web Vitals
en producción. No equivalen a una prueba física en un celular.

La incorporación simultánea del vidrio SVG produjo 36,0 FPS en inicio y 33,7 FPS
en Proyectos. Tras limitar el filtro decorativo:

| Ruta | Chrome escritorio | CPU limitada 4× | p95 de cuadro |
| --- | ---: | ---: | ---: |
| Inicio | 95,4 FPS | 94,8 FPS | 10,1 ms |
| Proyectos | 97,6 FPS | 93,1 FPS | 10,1 ms |

Las cuatro pruebas pasaron con presupuestos exigidos: escritorio ≥55 FPS y
p95 ≤22 ms; CPU limitada ≥45 FPS y p95 ≤28 ms; cuadro máximo ≤100 ms.
Son comparaciones entre las versiones observadas durante esta sesión, no una
comparación contra el sitio público original.

## Reproducir

Validación final: build de producción y ESLint sin errores. La matriz Chrome
escritorio, móvil emulado y CPU limitada aprobó 50 comprobaciones y omitió dos
casos de menú que no corresponden al dispositivo. Los tres casos de acumulación
se corrigieron para distinguir animaciones transitorias de perpetuas y se
volvieron a ejecutar: 3/3 aprobados. Resultado consolidado: 53 comprobaciones
aprobadas y dos omitidas por diseño. Las 21 mediciones de scroll aprobaron los
presupuestos exigidos; la menor media observada fue 86,9 FPS en Skills con CPU 4×.

Validación normal, con navegadores Playwright instalados:

```powershell
npm run lint
npm run build
npm run test:e2e
npm run test:perf:enforce -- --project=chromium-desktop --project=chromium-low-end --workers=1
```

Validación de renderizado sin servidor local, usando Chrome instalado:

```powershell
npm run build
$env:PLAYWRIGHT_OFFLINE = '1'
$env:PLAYWRIGHT_CHANNEL = 'chrome'
$env:PERF_ENFORCE = '1'
npm run test:e2e -- --project=chromium-desktop --project=chromium-mobile --project=chromium-low-end --workers=1
```

El modo offline sirve solo el build existente. No valida formularios contra la
API, correo, conectividad, caché HTTP, compresión ni fuentes externas. Para medir
la experiencia real, completar una comprobación del despliegue público en Chrome.
