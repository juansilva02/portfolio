// Datos del cotizador. Rangos en USD, alineados al mercado freelance
// LATAM (Workana / Upwork / comunidades n8n) y coherentes con la oferta
// publicada del sitio (landing base desde 200 USD).

export const categorias = [
  {
    id: 'landing',
    nombre: 'Landing page',
    icono: 'LayoutTemplate',
    descripcion: 'Una página enfocada en convertir visitas en consultas.',
    niveles: [
      {
        id: 'express',
        nombre: 'Express',
        rango: [200, 300],
        incluye: ['1 página con secciones clave', 'Responsive + SEO base', 'CTA a WhatsApp o formulario', 'Entrega en 48 hs'],
      },
      {
        id: 'completa',
        nombre: 'Completa',
        rango: [300, 500],
        incluye: ['Hasta 6 secciones a medida', 'Animaciones y micro-interacciones', 'Analytics + eventos de conversión', 'Copy asistido'],
      },
      {
        id: 'premium',
        nombre: 'Premium',
        rango: [500, 800],
        incluye: ['Diseño 100% a medida', 'Integraciones (CRM, email, pagos)', 'Performance y SEO técnico fino', 'Multi-idioma opcional'],
      },
    ],
  },
  {
    id: 'institucional',
    nombre: 'Sitio institucional',
    icono: 'Building2',
    descripcion: 'Presencia profesional multi-página para tu empresa.',
    niveles: [
      {
        id: 'basico',
        nombre: 'Básico',
        rango: [400, 700],
        incluye: ['3 a 5 páginas', 'Servicios + empresa + contacto', 'Responsive + SEO base', 'Formulario de consultas'],
      },
      {
        id: 'completo',
        nombre: 'Completo',
        rango: [700, 1200],
        incluye: ['Hasta 10 páginas', 'Blog o novedades autogestionable', 'SEO técnico + sitemap', 'Integraciones a medida'],
      },
    ],
  },
  {
    id: 'ecommerce',
    nombre: 'Tienda online',
    icono: 'ShoppingCart',
    descripcion: 'Vendé online con catálogo, carrito y pasarela de pago.',
    niveles: [
      {
        id: 'catalogo',
        nombre: 'Catálogo',
        rango: [800, 1200],
        incluye: ['Catálogo de productos', 'Pedidos por WhatsApp', 'Buscador y categorías', 'Panel simple de carga'],
      },
      {
        id: 'pasarela',
        nombre: 'Con pasarela',
        rango: [1200, 2500],
        incluye: ['Carrito + checkout', 'MercadoPago u otra pasarela', 'Gestión de pedidos', 'Emails transaccionales'],
      },
      {
        id: 'avanzada',
        nombre: 'Avanzada',
        rango: [2500, 4000],
        incluye: ['Stock y variantes', 'Cuentas de cliente', 'Reportes de venta', 'Integraciones logísticas'],
      },
    ],
  },
  {
    id: 'saas',
    nombre: 'Web app / SaaS',
    icono: 'Database',
    descripcion: 'Software a medida: paneles, plataformas y productos web.',
    niveles: [
      {
        id: 'mvp',
        nombre: 'MVP',
        rango: [1500, 3000],
        incluye: ['Auth + roles', 'Panel y CRUD principales', 'Base de datos', 'Deploy productivo'],
      },
      {
        id: 'producto',
        nombre: 'Producto',
        rango: [3000, 6000],
        incluye: ['Arquitectura escalable', 'Pagos y suscripciones', 'Integraciones y API propia', 'Métricas y soporte inicial'],
      },
    ],
  },
  {
    id: 'automatizacion',
    nombre: 'Automatización',
    icono: 'Workflow',
    descripcion: 'Flujos con n8n que ahorran horas de trabajo manual.',
    niveles: [
      {
        id: 'flujo',
        nombre: 'Flujo simple',
        rango: [150, 300],
        incluye: ['1 flujo (ej: form → CRM → email)', 'Hasta 3 integraciones', 'Testeo y documentación', 'Video de uso'],
      },
      {
        id: 'proceso',
        nombre: 'Proceso completo',
        rango: [300, 800],
        incluye: ['Varios flujos conectados', 'Lógica condicional y errores', 'Integraciones con tus sistemas', 'Monitoreo básico'],
      },
      {
        id: 'ecosistema',
        nombre: 'Ecosistema',
        rango: [800, 2000],
        incluye: ['Automatización end-to-end del negocio', 'Servidor n8n propio', 'Dashboards de control', 'Capacitación al equipo'],
      },
    ],
  },
  {
    id: 'ia',
    nombre: 'IA aplicada',
    icono: 'Bot',
    descripcion: 'Chatbots y asistentes con IA entrenados en tu negocio.',
    niveles: [
      {
        id: 'chatbot',
        nombre: 'Chatbot FAQ',
        rango: [400, 800],
        incluye: ['Bot para web o WhatsApp', 'Respuestas sobre tu negocio', 'Derivación a humano', 'Panel de conversaciones'],
      },
      {
        id: 'rag',
        nombre: 'Asistente con tus datos',
        rango: [800, 1800],
        incluye: ['IA que responde con tus documentos', 'Base de conocimiento propia', 'Actualizable por vos', 'Control de calidad de respuestas'],
      },
      {
        id: 'agentes',
        nombre: 'Agentes a medida',
        rango: [1500, 3500],
        incluye: ['Agentes que ejecutan tareas', 'Integración con tus sistemas', 'Flujos multi-paso con IA', 'Evaluación y ajuste continuo'],
      },
    ],
  },
];

export const extras = [
  { id: 'mantenimiento', nombre: 'Mantenimiento mensual', precio: '50–150 USD/mes', suma: [0, 0] },
  { id: 'contenido', nombre: 'Contenido y copywriting', precio: '+80–200 USD', suma: [80, 200] },
  { id: 'urgencia', nombre: 'Entrega urgente (48–72 hs)', precio: '+30%', multiplicador: 1.3 },
  { id: 'hosting', nombre: 'Setup dominio + hosting', precio: '+40–80 USD', suma: [40, 80] },
];

export const calcularRango = (nivel, extrasSeleccionados) => {
  if (!nivel) return null;
  let [min, max] = nivel.rango;
  extrasSeleccionados.forEach((e) => {
    if (e.suma) { min += e.suma[0]; max += e.suma[1]; }
    if (e.multiplicador) { min = Math.round(min * e.multiplicador); max = Math.round(max * e.multiplicador); }
  });
  return [Math.round(min / 10) * 10, Math.round(max / 10) * 10];
};
