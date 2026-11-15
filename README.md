# Portfolio zuzudev

Portfolio personal de Juan Silva (`zuzudev`), desarrollador web freelance en Argentina (estudiante de Ingeniería Informática; trabaja con IA y automatizaciones de negocio). Monorepo con app web React + Vite y backend serverless para el formulario de contacto.

La home presenta el sistema de gestión comercial con una preview de Ventas, Stock y Caja y el CTA **Solicitá tu demo**. El ensayo local integra Google y crea un entorno exclusivo por empresa mediante Docker.

Documentación actualizada el **12 de noviembre de 2026**. La puesta en producción del aprovisionamiento usa Docker local con Cloudflare Tunnel y requiere completar DNS, certificados y validación pública.

Sitio en producción: **https://zuzudev.pro**

## Stack

- React 18 + Vite 7
- Tailwind CSS 3 (paleta slate/sky oscura, clases `liquid-glass-*`)
- Framer Motion (animaciones) + presets compartidos en `src/lib/motion.js`
- React Router 7 (con code-splitting por ruta vía `React.lazy`)
- Backend: función serverless de Vercel (`apps/web/api/contact.js`) + servidor Node local para dev (`apps/web/server/index.mjs`)
- Email: nodemailer (SMTP). Automatización opcional: webhook a n8n
- Demos locales: Nginx HTTPS, broker Flask y worker Docker. Cada empresa usa su propia API NestJS, frontend Next.js y PostgreSQL del repositorio `zuzudev-erp`.

## Estructura

```text
portfolio/
  demo-local/        # Compose, proxy HTTPS, worker, preparación y pruebas de demos
  apps/
    web/
      api/           # funciones serverless de Vercel (contact.js = backend real en prod)
      lib/           # validación compartida de solicitudes de demo
      public/        # imágenes, sitemap, robots, .htaccess
      server/        # servidor Node SOLO para desarrollo local (puerto 3001)
      src/
        components/  # UI, tarjetas, secciones, fondos y efectos
        pages/       # Home, Demo, Proyectos, Cotizar, Contacto, Artículos, etc.
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

- Hero comercial (`CommercialSaas`) con preview navegable de Ventas, Stock y Caja, usando datos de ejemplo.
- Beneficios del sistema y CTA principal hacia `/demo`. El encabezado mantiene esa misma acción en la home y la página de demo.
- Las secciones de servicios, estadísticas, proyectos, stack y artículos están ocultas en la home. Sus componentes y páginas dedicadas permanecen disponibles en el repositorio.
- El cierre conserva el CTA de oferta original, con propuesta y WhatsApp.
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
- Fuente única de proyectos en `src/data/projects.js`, utilizada por `/projects` y el componente de proyectos destacados.

## Seguridad

- El estado de dependencias se revisa ejecutando `npm audit` sobre el lockfile vigente.
- `vercel.json`: HSTS, X-Frame-Options: DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- El endpoint de contacto NO expone los mensajes guardados (se eliminó el GET público).

## Deploy

Vercel (proyecto `portfolio-web`), autodeploy desde `main`.

## Pendientes / próximos pasos

- [ ] Publicar el circuito de creación de demos mediante Docker local y Cloudflare Tunnel y configurar DNS y TLS wildcard para `*.demo.zuzudev.pro`.
- [ ] Definir capacidad productiva, respaldos y política de eliminación de datos al finalizar las demos.
- [ ] Implementar invitaciones de empleados a la misma empresa y vincular sus identidades a usuarios de esa base.
- [ ] Conectar la automatización de campañas y la baja de novedades al consentimiento registrado.
- [ ] **Vercel → Settings → Environment Variables**: cargar SMTP_* y `CONTACT_TO_EMAIL` (o `N8N_WEBHOOK_URL`). Sin esto el formulario en producción devuelve error.
- [ ] **Vercel → Settings → General → Root Directory**: confirmar que sea `apps/web`. Si fuera la raíz del repo, mover `api/` y `vercel.json` a la raíz.
- [ ] Armar el flujo de n8n para las consultas (notificación + registro + agenda según horarios).
- [ ] **Testimonios reales de clientes** (Stutt, MauroFranArt, etc.): falta el texto de cada cliente para armar la sección de prueba social.
- [ ] (Opcional) Analytics (Vercel Analytics o Plausible) para medir tráfico y conversión del cotizador.
- [x] ~~Unificar la lista de proyectos duplicada en `src/data/projects.js`~~ (hecho).

## Notas

- Ruta antigua `/certifications` → redirige a `/projects`.


## Solicitudes de demo

El CTA del hero abre `/demo`. La página consulta `/api/demo/config` para habilitar el registro automático cuando el servicio de control está disponible.

### Ensayo HTTPS con Google y Docker

Portal local en **https://localhost:8443/demo**. Los pasos completos de instalación, credenciales, certificados, imágenes y pruebas están en [demo-local/README.md](demo-local/README.md).

1. La persona completa nombre, teléfono con código de país, empresa y rubro. La casilla de novedades es opcional y comienza desmarcada.
2. **Crear mi demo con Google** inicia OAuth. El correo se obtiene de la identidad verificada por Google.
3. El broker guarda la solicitud en el registro de control y encola el aprovisionamiento. El worker crea PostgreSQL, API, frontend, volúmenes y secretos exclusivos de la empresa.
4. Se aplican migraciones, datos de ejemplo y la vinculación del primer usuario con Google. La demo se publica después de aprobar los chequeos de salud.
5. **Entrar a mi demo** abre el subdominio de la empresa. Los ingresos posteriores con la misma identidad recuperan esa empresa y sus cambios. El seed se ejecuta durante la creación inicial.

El acceso **Ya tengo una demo** permite volver a identificar al propietario. Una cuenta diferente debe crear su propia empresa o estar vinculada a un usuario habilitado de la empresa a la que intenta entrar.

### Direcciones y aislamiento

- Una empresa llamada `Mi Empresa` recibe una dirección como `https://mi-empresa.demo.localhost:8443/login`. Los acentos se transliteran y los espacios pasan a guiones.
- Si el nombre está ocupado, se asigna un sufijo como `mi-empresa-2`. La reserva es única y transaccional.
- El formato previsto para producción es `https://miempresa.demo.zuzudev.pro/login`, mediante `DEMO_ORIGIN_TEMPLATE=https://{subdomain}.demo.zuzudev.pro` y el proxy, DNS y HTTPS correspondientes.
- El enlace comercial mantiene el formato `/demo/d-empresa/d-identificador` y abre el origen exclusivo de la empresa. Las direcciones locales antiguas con identificador largo redirigen al subdominio legible.
- Las bases, archivos, redes y secretos se separan por empresa. La API emite una cookie limitada a su host y comprueba sus propias sesiones. Los archivos subidos de las demos requieren una sesión válida.
- El cambio de host requiere iniciar sesión nuevamente. La migración del nombre conserva los volúmenes, la fecha de disponibilidad y el vencimiento.

### Límites y operación local

El ensayo permite **dos demos simultáneas**. Las siguientes solicitudes quedan pendientes. El acceso dura **20 días desde que la demo está lista**. Al vencer, el worker detiene los contenedores y conserva sus volúmenes.

Las credenciales de Google se montan desde el JSON original en modo lectura. `.env`, certificados y claves locales están excluidos de Git. El certificado de desarrollo dura 90 días y su instalación en el almacén de confianza del usuario de Windows requiere autorización.

El alta y el login local usan `https://localhost:8443/auth/signup/callback/google` cuando el alta pública está habilitada. El broker distingue las operaciones por la transacción guardada y valida la cookie del navegador. La guía local también documenta el callback del login para instalaciones con el alta pública deshabilitada.

### Solicitud por contacto

Cuando el servicio de control está deshabilitado, el formulario utiliza `POST /api/contact` con `type=demo-request`, nombre, correo, teléfono, empresa, rubro y `marketingConsent` booleano. La validación compartida está en `apps/web/lib/demo-request.js`.

Este circuito registra `status=requested`, `emailVerified=false` y la elección de novedades con fecha, versión y origen. En Vercel entrega la consulta por SMTP o n8n. El servidor de desarrollo la guarda en el archivo local de consultas. La interfaz informa que la activación se coordinará por correo.

Las campañas deben comprobar el consentimiento vigente y ofrecer una baja antes de realizar envíos.

### Validación realizada

El ensayo con Google creó una empresa y permitió al propietario ingresar al ERP. Aprobaron las imágenes Docker, TypeScript, ESLint, 89 pruebas de API y 15 pruebas de broker y registro. La integración con dos empresas descartables comprobó sesiones y datos cruzados, protección de archivos, separación de redes y persistencia tras reiniciar la base y API. También se verificaron los subdominios legibles, la redirección de direcciones antiguas y la conservación del vencimiento.


## Entrada HTTPS en Docker para producción

La configuración y el estado de publicación mediante Cloudflare Tunnel están documentados en [demo-production/README.md](demo-production/README.md). Nginx sirve la web compilada en el puerto local 9444 con TLS, rechaza dominios desconocidos y resuelve cada empresa contra el registro de demos vigentes. El origen está levantado para validación local; la publicación, los certificados públicos y el acceso real con Google en producción siguen pendientes.


### Refuerzo de las demos del 13 de noviembre de 2026

La plantilla separa las redes de aplicación y PostgreSQL, usa redes internas con gateway aislado y una cuenta de base restringida para la API. Las migraciones se ejecutan como una tarea temporal administrativa. Las guías de demos documentan la actualización explícita de empresas existentes, sus respaldos y las pruebas de aislamiento. La publicación por Cloudflare y el login real entre dos empresas siguen pendientes.
## Levantar el portfolio con Docker

Desde la raíz, ejecutá `docker compose up -d --build --wait` y abrí [el portfolio local](http://localhost:3000). El contenedor sirve la web compilada y el formulario de contacto. Las consultas se guardan en un volumen persistente. Para enviarlas también por correo, configurá las variables SMTP del proyecto antes de arrancar. Podés detener el servicio con `docker compose down`.

El alta automática con Google se prueba desde el portal HTTPS de [demo-local](demo-local/README.md). Al entrar directamente por el puerto 3000, el formulario registra una solicitud de contacto.

