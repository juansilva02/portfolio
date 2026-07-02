import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProjectCard from '@/components/ProjectCard.jsx';

const ProjectsPage = () => {
  const projects = [
    {
      title: 'Stutt Ingenieria',
      category: 'Caso real',
      year: '2026',
      description: 'Sitio corporativo desarrollado para comunicar servicios, reforzar la presencia digital de la marca y ofrecer una experiencia clara tanto en desktop como en mobile.',
      techStack: ['Astro', 'TypeScript', 'Tailwind', 'Responsive UI'],
      imageUrl: '/images/stutt-ingenieria.png',
      demoUrl: 'https://www.stuttingenieria.com/',
      repoUrl: 'https://github.com/juansilva02/stuttgart',
      demoLabel: 'Ver sitio real',
      repoLabel: 'Repositorio',
      featured: true,
    },
    {
      title: 'MauroFranArt',
      category: 'Marca personal',
      year: '2026',
      description: 'Portfolio comercial para un tatuador argentino orientado a presencia de marca, galeria de trabajos y consultas directas.',
      techStack: ['Next.js 16', 'React 19', 'Tailwind 4', 'Framer Motion'],
      imageUrl: '/images/maurofranart-web.webp',
      demoUrl: 'https://maurofranart.zuzudev.pro/',
      repoUrl: 'https://github.com/juansilva02/maurofranart-portfolio',
      demoLabel: 'Ver sitio online',
      repoLabel: 'Repositorio',
    },
    {
      title: 'Growers And Friends',
      category: 'Ecommerce',
      year: '2026',
      description: 'Tienda online moderna para growshop con carrito, checkout, blog basico y una experiencia pensada para conversion y comunidad.',
      techStack: ['React 19', 'Vite 8', 'Tailwind', 'MercadoPago'],
      imageUrl: '/images/growersandfriends.webp',
      demoUrl: 'https://growersandgrowshop.zuzudev.pro/',
      repoUrl: 'https://github.com/juansilva02/growersandgrowshop',
      demoLabel: 'Ver demo',
      repoLabel: 'Repositorio',
    },
    {
      title: 'Los Eucaliptus Corralon',
      category: 'Storefront comercial',
      year: '2026',
      description: 'Storefront publicitario y de venta para corralon, preparado para escalar a carrito, pedidos y backend de ordenes.',
      techStack: ['React 19', 'Vite 8', 'CSS custom', 'Node.js'],
      imageUrl: '/images/corralon-losecualiptus-web.webp',
      repoUrl: 'https://github.com/juansilva02/web_loseucaliptos',
      repoLabel: 'Ver repositorio',
    },
    {
      title: 'MM Seguros',
      category: 'Sitio institucional',
      year: '2026',
      description: 'Sitio institucional multi pagina para empresa de seguros, con rutas comerciales, secciones de cotizacion y estructura preparada para escalar contenidos.',
      techStack: ['Astro 6', 'Tailwind 4', 'TypeScript', 'Multi-page'],
      imageUrl: '/images/mmseguros-web.webp',
      repoUrl: 'https://github.com/juansilva02/mmseguros',
      repoLabel: 'Ver repositorio',
    },
    {
      title: 'Landing page express',
      category: 'Oferta directa',
      year: '48 hs',
      description: 'Landing page base desde 200 USD para negocios que necesitan salir rapido con una propuesta clara, responsive y orientada a consultas.',
      techStack: ['200 USD', 'SEO base', 'Responsive', 'CTA directa'],
      demoUrl: '/contact?service=landing-48h',
      demoLabel: 'Pedir esta landing',
    },
    {
      title: 'Software interno y paneles',
      category: 'Servicio',
      year: 'Empresas',
      description: 'Desarrollo de sistemas internos, dashboards y flujos de gestion para ordenar procesos, operaciones y seguimiento.',
      techStack: ['React', 'Node.js', 'APIs', 'Base de datos'],
      demoUrl: '/contact?service=software-empresa',
      demoLabel: 'Quiero este servicio',
    },
    {
      title: 'Servidor local y red de datos',
      category: 'Infraestructura',
      year: 'On-premise',
      description: 'Armado de red de servidores local para almacenamiento de bases de datos y operacion interna con acceso controlado.',
      techStack: ['Servidor local', 'Red', 'Base de datos', 'Acceso interno'],
      demoUrl: '/contact?service=infra-local',
      demoLabel: 'Consultar infraestructura',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Proyectos de desarrollador web freelance en Argentina | React, ecommerce y sitios corporativos</title>
        <meta
          name="description"
          content="Proyectos reales de un desarrollador web freelance en Argentina: React, ecommerce, sitios corporativos, portfolios y soluciones web para empresas."
        />
        <link rel="canonical" href="https://zuzudev.pro/projects" />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <Header />

        <main className="pt-24 pb-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.h1
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="page-title-shine text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-balance"
                style={{ letterSpacing: '-0.02em' }}
              >
                Proyectos reales y <span className="text-slate-400">servicios</span>
              </motion.h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Este portfolio reune proyectos reales de desarrollo web freelance en Argentina: sitios institucionales, ecommerce, portfolios comerciales y soluciones pensadas para negocio con React, Astro y arquitectura moderna.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="liquid-glass-blue rounded-[1.5rem] p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">GitHub</div>
                <div className="text-slate-100 font-semibold">Repos publicos convertidos en casos de portfolio</div>
              </div>
              <div className="liquid-glass-blue rounded-[1.5rem] p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Tipos de proyecto</div>
                <div className="text-slate-100 font-semibold">Institucionales, ecommerce, portfolios y SaaS</div>
              </div>
              <div className="liquid-glass-blue rounded-[1.5rem] p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Objetivo</div>
                <div className="text-slate-100 font-semibold">Mostrar prueba real y abrir nuevas oportunidades</div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  demoUrl={project.demoUrl}
                  repoUrl={project.repoUrl}
                  imageUrl={project.imageUrl}
                  category={project.category}
                  year={project.year}
                  demoLabel={project.demoLabel}
                  repoLabel={project.repoLabel}
                  featured={project.featured}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-center"
            >
              <p className="text-slate-300 mb-6">
                Si quieres sumar mas proyectos con capturas reales, tambien puedo preparar una version todavia mas fuerte de esta seccion.
              </p>
              <Link
                to="/contact?service=consulta-general"
                className="inline-block liquid-glass-button-blue text-slate-50 px-8 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95 hover:brightness-110"
              >
                Pedir propuesta
              </Link>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default ProjectsPage;
