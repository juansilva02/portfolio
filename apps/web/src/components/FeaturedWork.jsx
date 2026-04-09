import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedWork = () => {
  const projects = [
    {
      title: 'Stutt Ingenieria',
      description: 'Sitio corporativo pensado para comunicar servicios, transmitir confianza y reforzar la presencia digital de la marca.',
      tech: ['React', 'Vite', 'Tailwind', 'Responsive UI'],
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec8ce?auto=format&fit=crop&q=80&w=800',
      demoUrl: 'https://www.stuttingenieria.com/',
      repoUrl: 'https://github.com/juansilva02/stuttgart',
    },
    {
      title: 'Landing para marca personal',
      description: 'Pagina de presentacion enfocada en servicios, autoridad profesional y conversion desde mobile y desktop.',
      tech: ['React', 'Tailwind', 'EmailJS', 'SEO'],
      image: 'https://images.unsplash.com/photo-1620825937374-87fc7d62828e?auto=format&fit=crop&q=80&w=800',
      demoUrl: '/projects',
    },
    {
      title: 'Micrositio para lanzamiento',
      description: 'Experiencia visual de una sola pagina con narrativa clara, secciones rapidas y llamados a la accion bien definidos.',
      tech: ['Astro', 'CSS', 'JavaScript', 'UI Copy'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
      demoUrl: '/projects',
    }
  ];

  return (
    <section className="py-20 bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Trabajo <span className="text-slate-400">destacado</span></h2>
            <p className="text-slate-300 max-w-2xl">Una seleccion de proyectos recientes donde combino desarrollo web, UI y criterio de marca.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/projects" className="group flex items-center gap-2 text-slate-300 hover:text-slate-100 transition-colors">
              Ver todos los proyectos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/10 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-100 mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-medium text-slate-300 bg-slate-700/50 px-2 py-1 rounded border border-slate-600/50">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-700/50">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target={project.demoUrl.startsWith('http') ? '_blank' : undefined}
                      rel={project.demoUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Ver sitio
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors"
                    >
                      <Github className="w-4 h-4" /> Ver codigo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
