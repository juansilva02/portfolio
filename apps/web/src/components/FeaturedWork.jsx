import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, revealOnView, hoverLift } from '@/lib/motion';

const FeaturedWork = () => {
  const projects = [
    {
      title: 'Stutt Ingenieria',
      description: 'Sitio corporativo para una empresa de ingenieria enfocado en comunicar servicios, reforzar marca y generar consultas claras.',
      tech: ['Astro', 'TypeScript', 'Tailwind', 'Responsive UI'],
      image: '/images/stutt-ingenieria.png',
      demoUrl: 'https://www.stuttingenieria.com/',
      repoUrl: 'https://github.com/juansilva02/stuttgart',
      demoLabel: 'Ver sitio real',
      repoLabel: 'Ver codigo',
    },
    {
      title: 'MauroFranArt',
      description: 'Portfolio comercial para un tatuador argentino con enfoque en identidad visual, autoridad y conversion a consultas.',
      tech: ['Next.js 16', 'React 19', 'Tailwind 4', 'Framer Motion'],
      image: '/images/maurofranart-web.webp',
      demoUrl: 'https://maurofranart.zuzudev.pro/',
      repoUrl: 'https://github.com/juansilva02/maurofranart-portfolio',
      demoLabel: 'Ver sitio online',
      repoLabel: 'Repositorio',
    },
    {
      title: 'Growers And Friends',
      description: 'Tienda online para growshop con carrito, checkout, blog basico y CTA directos a WhatsApp y MercadoPago.',
      tech: ['React 19', 'Vite 8', 'Tailwind', 'MercadoPago'],
      image: '/images/growersandfriends.webp',
      demoUrl: 'https://growersandgrowshop.zuzudev.pro/',
      repoUrl: 'https://github.com/juansilva02/growersandgrowshop',
      demoLabel: 'Ver demo',
      repoLabel: 'Repositorio',
    },
    {
      title: 'Los Eucaliptus Corralon',
      description: 'Storefront comercial y de venta para corralon, preparado para crecer hacia pedidos, carrito y backend de ordenes.',
      tech: ['React 19', 'Vite 8', 'CSS custom', 'Node.js'],
      image: '/images/corralon-losecualiptus-web.webp',
      repoUrl: 'https://github.com/juansilva02/web_loseucaliptos',
      repoLabel: 'Ver repositorio',
    },
    {
      title: 'MM Seguros',
      description: 'Sitio institucional multi página para empresa de seguros, con rutas comerciales, secciones de cotización y estructura preparada para escalar contenidos.',
      tech: ['Astro 6', 'Tailwind 4', 'TypeScript', 'Multi-page'],
      image: '/images/mmseguros-web.webp',
      repoUrl: 'https://github.com/juansilva02/mmseguros',
      repoLabel: 'Ver repositorio',
    },
  ];

  return (
    <section className="py-20 bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={staggerContainer()} {...revealOnView} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div variants={fadeRight}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Proyectos reales desde <span className="text-slate-400">GitHub</span>
            </h2>
            <p className="text-slate-300 max-w-2xl">
              Una seleccion de trabajos publicados y repositorios reales que muestran sitios institucionales, ecommerce y marcas personales construidos por zuzudev.
            </p>
          </motion.div>
          <motion.div variants={fadeLeft}>
            <Link to="/projects" className="group flex items-center gap-2 text-slate-300 hover:text-slate-100 transition-colors">
              Ver todos los proyectos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div variants={staggerContainer(0.08)} {...revealOnView} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              whileHover={hoverLift}
              className="group liquid-glass-light rounded-[1.65rem] overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              {project.image && (
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-100 mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs font-medium text-slate-300 bg-slate-700/50 px-2 py-1 rounded border border-slate-600/50">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-slate-700/50">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {project.demoLabel}
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      {project.repoLabel}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWork;
