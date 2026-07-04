import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProjectCard from '@/components/ProjectCard.jsx';
import { projects } from '@/data/projects.js';

const ProjectsPage = () => {
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
                  techStack={project.tech}
                  demoUrl={project.demoUrl}
                  repoUrl={project.repoUrl}
                  imageUrl={project.image}
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
