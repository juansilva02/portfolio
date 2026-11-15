# GlassSurface (React Bits, JS-CSS)

`GlassSurface.jsx` y `GlassSurface.css` se copiaron sin modificaciones del JSON oficial:
https://github.com/DavidHDev/react-bits/blob/main/public/r/GlassSurface-JS-CSS.json

El registro declara `dependencies: []` y `registryDependencies: []`.
La instalación con shadcn no pudo completarse por resolución DNS del registro npm.

```jsx
import { useRef } from 'react';
import GlassSurface from '@/components/GlassSurface';

<GlassSurface width={320} height={76} borderRadius={38}
  distortionScale={-180} displace={0.5} backgroundOpacity={0.1}>
  <span>Tu contenido</span>
</GlassSurface>

// SVG con transparencia, servido desde public/logo.svg.
<GlassSurface shape="/logo.svg" width={280} height={280} />

function PhotoGlass() {
  const photo = useRef(null);
  return <div style={{ position: 'relative' }}>
    <img ref={photo} src="/photo.jpg" alt="" />
    <GlassSurface backdrop={photo} width={320} height={76} borderRadius={38}
      style={{ position: 'absolute', top: 20, left: 20 }} />
  </div>;
}
```

Usar imágenes locales o con CORS para `shape` y `backdrop`. El componente oficial
selecciona SVG, WebGL o una alternativa CSS según el navegador; `renderer="webgl"`
permite solicitar explícitamente el renderizador de imagen.

La integración del sitio usa `GlassSurfaceLayer` como decoración de las superficies
existentes: conserva dimensiones, radios, contenido, eventos y semántica del panel.
La capa no recibe eventos ni participa del diseño y se monta solo mientras está
visible. Los contenedores de estructura y los controles mantienen sus elementos
originales. Para agregar otra superficie, añadir `has-glass-surface` al contenedor
e insertar `<GlassSurfaceLayer />` como primer hijo. Evitar capas anidadas.
