import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CertificationCard from '@/components/CertificationCard.jsx';

const CertificationsPage = () => {
  const websites = [
    {
      title: 'Stutt Ingenieria',
      category: 'Sitio corporativo',
      summary: 'Sitio institucional para una empresa de ingenieria, con una interfaz clara, estructura profesional y presencia digital alineada a una marca tecnica y confiable.',
      stack: ['React', 'Vite', 'Tailwind', 'UI Responsive'],
      year: '2026',
      siteUrl: 'https://www.stuttingenieria.com/',
      repoUrl: 'https://github.com/juansilva02/stuttgart',
    },
    {
      title: 'Web corporativa para consultora tecnológica',
      category: 'Sitio institucional',
      summary: 'Arquitectura clara de contenidos, diseño UI sobrio y bloques pensados para transmitir confianza, procesos y casos de éxito.',
      stack: ['React', 'Vite', 'CSS Modules'],
      year: '2026',
      siteUrl: 'https://example.com',
    },
    {
      title: 'Portfolio profesional para creador digital',
      category: 'Portfolio personal',
      summary: 'Identidad visual personalizada, narrativa de marca y estructura flexible para destacar proyectos, servicios y contacto.',
      stack: ['React', 'Tailwind', 'EmailJS'],
      year: '2025',
      siteUrl: 'https://example.com',
    },
    {
      title: 'One page para lanzamiento de producto',
      category: 'Campaña digital',
      summary: 'Página de alto impacto para validar una propuesta de valor con llamados a la acción claros y carga rápida en mobile.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      year: '2025',
      siteUrl: 'https://example.com',
    },
    {
      title: 'Plataforma web para reservas y servicios',
      category: 'Producto web',
      summary: 'Interfaz enfocada en usabilidad, flujo de reservas simple y una base escalable para seguir sumando funcionalidades.',
      stack: ['React', 'Node.js', 'MongoDB'],
      year: '2025',
      siteUrl: 'https://example.com',
    },
    {
      title: 'Micrositio para evento y registro',
      category: 'Evento online',
      summary: 'Diseño centrado en claridad y urgencia, con información clave, agenda y registro integrados en una sola experiencia.',
      stack: ['Next.js', 'Tailwind', 'Forms'],
      year: '2025',
      siteUrl: 'https://example.com',
    },
    {
      title: 'Sitio de servicios para marca personal',
      category: 'Marca personal',
      summary: 'Página pensada para posicionar expertise, comunicar una propuesta profesional sólida y facilitar el contacto comercial.',
      stack: ['React', 'SEO', 'Responsive UI'],
      year: '2024',
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
        <title>Sitios Web | zuzudev</title>
        <meta name="description" content="Selección de sitios web creados por zuzudev, con foco en desarrollo de software, UI cuidada y experiencias digitales pensadas para marcas y negocios." />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-balance" style={{ letterSpacing: '-0.02em' }}>
                Sitios web creados por <span className="text-slate-400">zuzudev</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Una vitrina de experiencias digitales donde combino desarrollo de software, criterio visual y UI enfocada en resultados.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websites.map((site, index) => (
                <CertificationCard
                  key={`${site.title}-${index}`}
                  title={site.title}
                  category={site.category}
                  summary={site.summary}
                  stack={site.stack}
                  year={site.year}
                  siteUrl={site.siteUrl}
                  repoUrl={site.repoUrl}
                  ctaLabel="Ver sitio"
                  repoLabel="Ver codigo"
                  index={index}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50"
            >
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Diseño y desarrollo con enfoque de marca</h3>
              <p className="text-slate-300 leading-relaxed max-w-prose mb-6">
                En zuzudev cada proyecto busca algo más que verse bien: comunicar con claridad, cargar rápido,
                funcionar bien en distintos dispositivos y sostener una identidad visual coherente con la marca.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-slate-400 mb-2">7</div>
                  <div className="text-slate-300 text-sm">Sitios listos para mostrar</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-400 mb-2">100%</div>
                  <div className="text-slate-300 text-sm">Enfoque en español y marca propia</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-400 mb-2">UI + Dev</div>
                  <div className="text-slate-300 text-sm">Propuesta de valor de zuzudev</div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default CertificationsPage;
