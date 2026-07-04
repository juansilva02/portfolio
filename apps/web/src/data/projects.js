// Fuente única de proyectos. La usan la home (FeaturedWork, solo los que tienen
// showInFeatured) y la página /projects (todos, incluidos los servicios sin imagen).
// Antes esta lista estaba duplicada en FeaturedWork.jsx y ProjectsPage.jsx.

export const projects = [
  {
    title: 'Stutt Ingenieria',
    category: 'Caso real',
    year: '2026',
    description:
      'Sitio corporativo desarrollado para comunicar servicios, reforzar la presencia digital de la marca y ofrecer una experiencia clara tanto en desktop como en mobile.',
    tech: ['Astro', 'TypeScript', 'Tailwind', 'Responsive UI'],
    image: '/images/stutt-ingenieria.webp',
    demoUrl: 'https://www.stuttingenieria.com/',
    repoUrl: 'https://github.com/juansilva02/stuttgart',
    demoLabel: 'Ver sitio real',
    repoLabel: 'Repositorio',
    featured: true,
    showInFeatured: true,
  },
  {
    title: 'MauroFranArt',
    category: 'Marca personal',
    year: '2026',
    description:
      'Portfolio comercial para un tatuador argentino orientado a presencia de marca, galeria de trabajos y consultas directas.',
    tech: ['Next.js 16', 'React 19', 'Tailwind 4', 'Framer Motion'],
    image: '/images/maurofranart-web.webp',
    demoUrl: 'https://maurofranart.zuzudev.pro/',
    repoUrl: 'https://github.com/juansilva02/maurofranart-portfolio',
    demoLabel: 'Ver sitio online',
    repoLabel: 'Repositorio',
    showInFeatured: true,
  },
  {
    title: 'Growers And Friends',
    category: 'Ecommerce',
    year: '2026',
    description:
      'Tienda online moderna para growshop con carrito, checkout, blog basico y una experiencia pensada para conversion y comunidad.',
    tech: ['React 19', 'Vite 8', 'Tailwind', 'MercadoPago'],
    image: '/images/growersandfriends.webp',
    demoUrl: 'https://growersandgrowshop.zuzudev.pro/',
    repoUrl: 'https://github.com/juansilva02/growersandgrowshop',
    demoLabel: 'Ver demo',
    repoLabel: 'Repositorio',
    showInFeatured: true,
  },
  {
    title: 'Los Eucaliptus Corralon',
    category: 'Storefront comercial',
    year: '2026',
    description:
      'Storefront publicitario y de venta para corralon, preparado para escalar a carrito, pedidos y backend de ordenes.',
    tech: ['React 19', 'Vite 8', 'CSS custom', 'Node.js'],
    image: '/images/corralon-losecualiptus-web.webp',
    repoUrl: 'https://github.com/juansilva02/web_loseucaliptos',
    repoLabel: 'Ver repositorio',
    showInFeatured: true,
  },
  {
    title: 'MM Seguros',
    category: 'Sitio institucional',
    year: '2026',
    description:
      'Sitio institucional multi pagina para empresa de seguros, con rutas comerciales, secciones de cotizacion y estructura preparada para escalar contenidos.',
    tech: ['Astro 6', 'Tailwind 4', 'TypeScript', 'Multi-page'],
    image: '/images/mmseguros-web.webp',
    repoUrl: 'https://github.com/juansilva02/mmseguros',
    repoLabel: 'Ver repositorio',
    showInFeatured: true,
  },
  {
    title: 'Landing page express',
    category: 'Oferta directa',
    year: '48 hs',
    description:
      'Landing page base desde 200 USD para negocios que necesitan salir rapido con una propuesta clara, responsive y orientada a consultas.',
    tech: ['200 USD', 'SEO base', 'Responsive', 'CTA directa'],
    demoUrl: '/contact?service=landing-48h',
    demoLabel: 'Pedir esta landing',
    showInFeatured: false,
  },
  {
    title: 'Software interno y paneles',
    category: 'Servicio',
    year: 'Empresas',
    description:
      'Desarrollo de sistemas internos, dashboards y flujos de gestion para ordenar procesos, operaciones y seguimiento.',
    tech: ['React', 'Node.js', 'APIs', 'Base de datos'],
    demoUrl: '/contact?service=software-empresa',
    demoLabel: 'Quiero este servicio',
    showInFeatured: false,
  },
  {
    title: 'Servidor local y red de datos',
    category: 'Infraestructura',
    year: 'On-premise',
    description:
      'Armado de red de servidores local para almacenamiento de bases de datos y operacion interna con acceso controlado.',
    tech: ['Servidor local', 'Red', 'Base de datos', 'Acceso interno'],
    demoUrl: '/contact?service=infra-local',
    demoLabel: 'Consultar infraestructura',
    showInFeatured: false,
  },
];

// Solo los que se muestran en la home (los 5 casos reales con imagen).
export const featuredProjects = projects.filter((p) => p.showInFeatured);
