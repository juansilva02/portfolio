# Portfolio zuzudev

Portfolio personal de Juan Silva (`zuzudev`), desarrollador web freelance en Argentina. Construido como un monorepo simple con una app web en React + Vite y un pequeño backend en Node para el formulario de contacto.

Sitio en producción: **https://zuzudev.pro**

## Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Node.js (endpoint local de contacto + envío de email vía SMTP)

## Estructura

```text
portfolio/
  apps/
    web/
      public/        # assets públicos, imágenes, sitemap, robots
      src/
        components/  # componentes reutilizables (UI, tarjetas, secciones)
        pages/       # páginas (Home, Proyectos, Contacto, Artículos, etc.)
        data/        # datos de contenido (artículos, etc.)
        lib/         # utilidades compartidas (presets de animación)
      server/        # servidor local para el formulario de contacto
```

## Scripts

Desde la raíz del repo:

```bash
npm install
npm run dev
```

`npm run dev` levanta:

- frontend Vite en `http://localhost:3000`
- backend local de contacto en `http://localhost:3001`

Si solo querés el frontend con recarga en caliente (HMR):

```bash
npm run dev --prefix apps/web
```

Otros scripts:

```bash
npm run build     # build de producción
npm run start     # sirve el build con el servidor Node
```

En `apps/web`:

```bash
npm run dev       # solo Vite (frontend)
npm run server    # solo backend de contacto
npm run build     # build de producción
```

## Animaciones y experiencia

- Intro tipo terminal en el hero que escribe un comando y dispara la aparición escalonada de los elementos (una vez por sesión).
- Animación 3D en CSS que muestra el "armado" de una página web en el hero.
- Reveals al hacer scroll y micro-interacciones consistentes en todo el sitio mediante presets compartidos en `apps/web/src/lib/motion.js`.
- Estética glass / liquid glass en tarjetas y secciones.
- Respeta `prefers-reduced-motion` para accesibilidad.

## Secciones principales

- Home con propuesta de valor, servicios, proyectos destacados, stack y artículos.
- Página de proyectos unificada con casos reales y servicios.
- Sección de artículos / blog.
- Página de contacto con formulario.
- CTA flotante de contacto.

## Formulario de contacto

La página de contacto envía los datos a:

```text
POST /api/contact
```

El backend valida los campos, aplica un rate limit por IP y guarda cada envío en:

```text
apps/web/data/contact-submissions.json
```

Campos almacenados: `id`, `createdAt`, `name`, `email`, `subject`, `message`.

> Nota: la carpeta `apps/web/data/` está ignorada por git (datos de runtime, no se versionan).

### Envío de email (opcional)

El backend además puede reenviar cada mensaje por email si se definen variables de entorno SMTP. Tomá como referencia `apps/web/.env.example`:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

## SEO

El proyecto incluye `sitemap.xml`, `robots.txt`, metadatos por página (vía `react-helmet`) y URLs canónicas hacia `https://zuzudev.pro`.

## Deploy

El sitio se despliega en Vercel y se actualiza automáticamente con cada push a la rama `main`.

## Notas

- La ruta antigua `/certifications` redirige a `/projects`.
