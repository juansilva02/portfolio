import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ExperienceCard from '@/components/ExperienceCard.jsx';

const ExperiencePage = () => {
  const experiences = [
    {
      company: 'ZuzuDev Studio',
      role: 'Senior Full Stack Developer',
      duration: 'Feb 2023 - Presente',
      location: 'Buenos Aires, Argentina',
      achievements: [
        'Desarrollo de la plataforma principal de zuzudev.com usando React, Vite y Tailwind.',
        'Implementacion de un sistema de blog CMS headless con Astro y Netlify o Vercel.',
        'Diseno e integracion de procesos de CI/CD con GitHub Actions para despliegues automaticos.',
        'Optimizacion de rendimiento web alcanzando Core Web Vitals A en todos los proyectos.',
      ],
    },
    {
      company: 'MediaLab AR',
      role: 'Full Stack Developer',
      duration: 'Jun 2021 - Ene 2023',
      location: 'Buenos Aires, Argentina',
      achievements: [
        'Construccion de una aplicacion de gestion de contenidos para marketing digital basada en Node.js y React.',
        'Integracion de Stripe para pagos recurrentes y creacion de panel de administracion con metricas en tiempo real.',
        'Coordinacion con equipos de diseno para mejorar la experiencia de usuario y reducir tasa de rebote en 25%.',
        'Migracion de backend a arquitectura serverless en AWS Lambda y API Gateway.',
      ],
    },
    {
      company: 'Universidad de Buenos Aires (UBA)',
      role: 'Pasante en Desarrollo Web',
      duration: 'Mar 2020 - Mayo 2021',
      location: 'Buenos Aires, Argentina',
      achievements: [
        'Participacion en proyectos universitarios de plataformas educativas con React y Firebase.',
        'Automatizacion de tareas de social media y reportes con scripts en Python.',
        'Asistencia en talleres de programacion y mentoria a estudiantes de Comunicacion.',
      ],
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
        <title>Experiencia | Juan Silva | zuzudev</title>
        <meta
          name="description"
          content="Experiencia profesional de Juan Silva en desarrollo web, productos digitales y soluciones full-stack con foco en calidad y ejecucion."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-900 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(125,211,252,0.08),transparent_22%),radial-gradient(circle_at_82%_22%,rgba(226,232,240,0.06),transparent_20%),radial-gradient(circle_at_50%_82%,rgba(148,163,184,0.08),transparent_28%)]" />
          <div className="absolute -top-24 left-[8%] h-64 w-64 rounded-full bg-sky-300/8 blur-3xl animate-float" />
          <div className="absolute top-[30%] right-[10%] h-72 w-72 rounded-full bg-slate-200/6 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-[-4rem] left-[28%] h-80 w-80 rounded-full bg-slate-400/8 blur-3xl animate-float" style={{ animationDelay: '1.8s' }} />
          <div className="absolute inset-0 opacity-[0.18] animate-hex-drift">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
              <path d="M0 64C12 58 18 48 30 48C42 48 47 59 59 59C70 59 76 50 88 50C94 50 97 52 100 54V100H0V64Z" fill="rgba(148,163,184,0.06)" />
              <path d="M0 70C10 67 18 60 28 60C41 60 47 69 60 69C72 69 77 63 89 63C94 63 97 64 100 66V100H0V70Z" fill="rgba(191,219,254,0.04)" />
            </svg>
          </div>
        </div>

        <Header />

        <main className="pt-24 pb-20 relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-balance"
                style={{ letterSpacing: '-0.02em' }}
              >
                Experiencia <span className="text-slate-400">profesional</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Trayectoria construyendo productos web, sistemas utiles y soluciones digitales con foco en ejecucion, detalle y resultados.
              </p>
            </motion.div>

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={`${experience.company}-${experience.role}`}
                  company={experience.company}
                  role={experience.role}
                  duration={experience.duration}
                  location={experience.location}
                  achievements={experience.achievements}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 rounded-[1.75rem] border border-slate-700/50 bg-slate-900/28 p-8 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Resumen de carrera</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-slate-300 mb-2">4+</div>
                  <div className="text-slate-300">Años creando soluciones digitales</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-slate-300 mb-2">20+</div>
                  <div className="text-slate-300">Proyectos y sistemas publicados</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-slate-300 mb-2">100%</div>
                  <div className="text-slate-300">Foco en calidad y ejecución</div>
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

export default ExperiencePage;
