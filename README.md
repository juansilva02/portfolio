# zuzudev portfolio

Portfolio personal de Juan Silva (`zuzudev`) construido como monorepo simple con una app web en React + Vite.

## Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Node.js para el endpoint local de contacto

## Estructura

```text
portfolio/
  apps/
    web/
      public/        # assets publicos
      src/           # paginas, componentes y estilos
      server/        # servidor local para contacto
      data/          # almacenamiento JSON de mensajes
```

## Scripts

Desde la raiz del repo:

```bash
npm install
npm run dev
```

Esto levanta:

- frontend Vite en `http://localhost:3000`
- backend local de contacto en `http://localhost:3001`

Otros scripts:

```bash
npm run build
npm run start
```

En `apps/web`:

```bash
npm run dev
npm run server
npm run build
```

## Formulario de contacto

La pagina de contacto envia los datos a:

```text
POST /api/contact
```

El backend guarda cada envio en:

```text
apps/web/data/contact-submissions.json
```

Campos almacenados:

- `id`
- `createdAt`
- `name`
- `email`
- `subject`
- `message`

## Estado actual del portfolio

El proyecto fue adaptado a la marca `zuzudev` y actualmente incluye:

- contenido principal en espanol
- pagina de proyectos unificada con sitios web
- fondos animados sutiles
- tarjetas glass/liquid glass en varias secciones
- CTA flotante de contacto
- seccion de skills con brillo por tecnologia
- formulario de contacto persistido en JSON
- envio opcional de emails via SMTP cuando hay variables de entorno configuradas

## Notas

- La ruta antigua `/certifications` redirige a `/projects`.
- `npm run lint` existe, pero el repo no tiene una configuracion de ESLint activa en este estado.

## Email del formulario

El backend de contacto siempre guarda los mensajes en:

```text
apps/web/data/contact-submissions.json
```

Ademas puede reenviar cada submit por email si defines las variables de entorno de SMTP.
Toma como referencia:

```text
apps/web/.env.example
```

Variables:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
