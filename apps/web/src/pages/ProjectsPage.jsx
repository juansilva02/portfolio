import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProjectCard from '@/components/ProjectCard.jsx';
import ParticleBackground from '@/components/ParticleBackground.jsx';

const ProjectsPage = () => {
  const projects = [
    {
      title: 'Stutt Ingenieria',
      category: 'Sitio corporativo',
      year: '2026',
      description: 'Sitio corporativo desarrollado para comunicar servicios, reforzar la presencia digital de la marca y ofrecer una experiencia clara tanto en desktop como en mobile.',
      techStack: ['Astro', 'TypeScript', 'Tailwind', 'Responsive UI'],
      imageUrl: '/images/stutt-ingenieria.png',
      demoUrl: 'https://www.stuttingenieria.com/',
      repoUrl: 'https://github.com/juansilva02/stuttgart',
      featured: true,
    },
    {
      title: 'Landing para marca personal',
      category: 'Marca personal',
      year: '2025',
      description: 'Pagina de presentacion enfocada en convertir visitas en contactos, con estructura narrativa, copy claro y una interfaz visual alineada a la identidad del profesional.',
      techStack: ['React', 'Tailwind', 'SEO', 'EmailJS'],
      demoUrl: '/projects',
    },
    {
      title: 'Micrositio para lanzamiento',
      category: 'Campana digital',
      year: '2025',
      description: 'Experiencia de una sola pagina pensada para presentar una propuesta puntual con velocidad de carga, jerarquia visual y llamados a la accion bien definidos.',
      techStack: ['Astro', 'CSS', 'JavaScript', 'UI Copy'],
      demoUrl: '/projects',
    },
    {
      title: 'Web institucional para consultora',
      category: 'Sitio institucional',
      year: '2025',
      description: 'Proyecto orientado a transmitir confianza, ordenar servicios y mejorar la claridad comercial mediante una interfaz sobria, moderna y facil de recorrer.',
      techStack: ['Next.js', 'Tailwind', 'Forms', 'Contenido estructurado'],
      demoUrl: '/projects',
    },
    {
      title: 'Portfolio profesional',
      category: 'Portfolio',
      year: '2024',
      description: 'Sitio personal disenado para mostrar trayectoria, proyectos y propuesta de valor con una presentacion limpia, adaptable y lista para crecer.',
      techStack: ['React', 'Framer Motion', 'Tailwind', 'UI Responsive'],
      demoUrl: '/projects',
    },
    {
      title: 'Automatizacion para procesos digitales',
      category: 'Automatizacion',
      year: '2024',
      description: 'Implementacion de flujos que conectan formularios, contacto y tareas internas para reducir trabajo manual y mejorar tiempos de respuesta.',
      techStack: ['n8n', 'JavaScript', 'APIs', 'Integraciones'],
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
        <title>Proyectos | zuzudev</title>
        <meta name="description" content="Proyectos de zuzudev enfocados en desarrollo web, interfaces modernas y soluciones digitales pensadas para marcas, profesionales y negocios." />
      </Helmet>

      <div className="min-h-screen bg-slate-900 relative overflow-hidden">
        <ParticleBackground />
        <Header />
        
        <main className="pt-24 pb-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-balance" style={{ letterSpacing: '-0.02em' }}>
                Proyectos y sitios web <span className="text-slate-400">en un mismo lugar</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Una sola vitrina para mostrar productos, landings, webs institucionales y automatizaciones con el sello visual y tecnico de zuzudev.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Enfoque</div>
                <div className="text-slate-100 font-semibold">UI, desarrollo y marca</div>
              </div>
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Formato</div>
                <div className="text-slate-100 font-semibold">Sitios, productos y flujos digitales</div>
              </div>
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Resultado</div>
                <div className="text-slate-100 font-semibold">Experiencias claras, rapidas y solidas</div>
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
                Queres que trabajemos en tu proximo proyecto?
              </p>
              <a
                href="/contact"
                className="inline-block bg-slate-300 text-slate-900 px-8 py-3 rounded-lg font-medium hover:bg-slate-200 transition-all duration-200 active:scale-95"
              >
                Hablemos
              </a>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default ProjectsPage;
