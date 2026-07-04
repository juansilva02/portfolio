# Portfolio zuzudev

Portfolio personal de Juan Silva (`zuzudev`), desarrollador web freelance en Argentina (estudiante de Ingeniería Informática; trabaja con IA y automatizaciones de negocio). Monorepo con app web React + Vite y backend serverless para el formulario de contacto.

Sitio en producción: **https://zuzudev.pro**

## Stack

- React 18 + Vite 7
- Tailwind CSS 3 (paleta slate/sky oscura, clases `liquid-glass-*`)
- Framer Motion (animaciones) + presets compartidos en `src/lib/motion.js`
- React Router 7 (con code-splitting por ruta vía `React.lazy`)
- Backend: función serverless de Vercel (`apps/web/api/contact.js`) + servidor Node local para dev (`apps/web/server/index.mjs`)
- Email: nodemailer (SMTP). Automatización opcional: webhook a n8n

## Estructura

```text
portfolio/
  apps/
    web/
      api/           # funciones serverless de Vercel (contact.js = backend real en prod)
      public/        # imágenes, sitemap, robots, .htaccess
      server/        # servidor Node SOLO para desarrollo local (puerto 3001)
      src/
        components/  # UI, tarjetas, secciones, fondos y efectos
        pages/       # Home, Proyectos, Cotizar, Contacto, Artículos, etc.
        data/        # contenido: articles.js, cotizador.js
        lib/         # motion.js (presets de animación)
      vercel.json    # security headers + rewrite SPA
```

## Desarrollo local

```bash
npm install
npm run dev --prefix apps/web    # SOLO frontend Vite en http://localhost:3000 (con HMR)
```

> Importante: `npm run dev` desde la raíz levanta frontend + backend con `concurrently`, pero el
> preview/entornos que inyectan `PORT=3000` hacen que el backend tome el 3000 y tape a Vite (se
> ve un build viejo, sin HMR). Para desarrollo con recarga usar el comando `--prefix apps/web`.
> El backend local se levanta aparte cuando se necesita probar el form: `npm run server --prefix apps/web`.

Build de producción: `npm run build`.

## Formulario de contacto

- En **producción** lo maneja la función serverless `apps/web/api/contact.js` (Vercel solo sirve estáticos, no corre el servidor Node).
- Valida campos, tiene honeypot (`companyWebsite`), rate limit por IP y **escapa el HTML** del email.
- Vías de salida (al menos una debe estar configurada o el form devuelve error):
  1. Email vía SMTP.
  2. Webhook a n8n (`N8N_WEBHOOK_URL`) para automatizar notificaciones, CRM y agenda.
- El servidor local (`server/index.mjs`) replica la lógica para dev y además guarda en `apps/web/data/contact-submissions.json` (ignorado por git).

Variables de entorno (ver `apps/web/.env.example`) — en producción se cargan en **Vercel → Settings → Environment Variables**:

```text
SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL   # destino: administracion@zuzudev.pro
N8N_WEBHOOK_URL                        # opcional
```

## Cotizador

Página `/cotizar` ([CotizarPage.jsx](apps/web/src/pages/CotizarPage.jsx), datos en [cotizador.js](apps/web/src/data/cotizador.js)): estimador por tipo de proyecto + nivel de complejidad + extras, con rangos en USD de mercado freelance LATAM. Panel de resultado estilo terminal con CTA a WhatsApp y al formulario prellenado (`/contact?service=cotizacion&detalle=...`).

## Experiencia / frontend

- Intro tipo terminal en el hero (`HeroBootLine`) que dispara la aparición escalonada del contenido (1 vez por sesión, `sessionStorage.zuzudev_intro`).
- Animación 3D en CSS del armado de una página web (`WebPageAssembly3D`).
- **Fondo global** (`SiteBackground`, montado 1 vez en `App.jsx`): base oscura + aurora sky/cyan/indigo que deriva + grilla terminal + red de hexágonos + partículas. Las páginas tienen fondo transparente para que se vea.
- Spotlight que sigue el cursor sobre las tarjetas glass (`SpotlightEffect` + CSS `::before`).
- Barra de progreso de scroll (`ScrollProgress`).
- Página 404 con estética terminal (`NotFoundPage`) que muestra la ruta pedida.
- Easter egg de consola para devs (en `main.jsx`).
- Respeta `prefers-reduced-motion`.

## SEO y compartido en redes

- **Open Graph + Twitter Cards** en `index.html` (estáticos: los scrapers de WhatsApp/Facebook no ejecutan JS) con imagen `public/og-image.png` (1200×630, estética terminal).
- **JSON-LD** `ProfessionalService` para Google (servicios, área, oferta).
- `sitemap.xml` completo (incluye `/cotizar`) + `robots.txt`.
- Cada página define `title`/`description`/`canonical` propios vía `react-helmet`.

## Rendimiento (mobile)

- Fuente DM Sans cargada desde el HTML con `preconnect` (no `@import` bloqueante).
- Fondo global aligerado en mobile: menos blur, hexágonos y 2/3 de las partículas solo en desktop.
- Imágenes de proyectos en webp, con `loading="lazy"` + `decoding="async"`.
- Bundle partido en chunks (`react` / `framer-motion` / app) para descarga paralela y mejor cache entre deploys.
- Fuente única de proyectos en `src/data/projects.js` (consumida por la home y `/projects`).

## Seguridad

- `npm audit` en 0 vulnerabilidades (react-router y nodemailer actualizados).
- `vercel.json`: HSTS, X-Frame-Options: DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- El endpoint de contacto NO expone los mensajes guardados (se eliminó el GET público).

## Deploy

Vercel (proyecto `portfolio-web`), autodeploy desde `main`.

## Pendientes / próximos pasos

- [ ] **Vercel → Settings → Environment Variables**: cargar SMTP_* y `CONTACT_TO_EMAIL` (o `N8N_WEBHOOK_URL`). Sin esto el formulario en producción devuelve error.
- [ ] **Vercel → Settings → General → Root Directory**: confirmar que sea `apps/web`. Si fuera la raíz del repo, mover `api/` y `vercel.json` a la raíz.
- [ ] Armar el flujo de n8n para las consultas (notificación + registro + agenda según horarios).
- [ ] **Testimonios reales de clientes** (Stutt, MauroFranArt, etc.): falta el texto de cada cliente para armar la sección de prueba social.
- [ ] (Opcional) Analytics (Vercel Analytics o Plausible) para medir tráfico y conversión del cotizador.
- [x] ~~Unificar la lista de proyectos duplicada en `src/data/projects.js`~~ (hecho).

## Notas

- Ruta antigua `/certifications` → redirige a `/projects`.
