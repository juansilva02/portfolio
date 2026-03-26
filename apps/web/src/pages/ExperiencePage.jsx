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
      duration: 'Feb 2023 - Present',
      location: 'Buenos Aires, Argentina',
      achievements: [
        'Desarrollo de la plataforma principal de zuzudev.com usando React, Vite y Tailwind.',
        'Implementación de un sistema de blog CMS headless con Astro y Netlify (o vercel).',
        'Diseño e integración de procesos de CI/CD con GitHub Actions para despliegues automáticos.',
        'Optimización de rendimiento web alcanzando Core Web Vitals A en todos los proyectos.',
      ],
    },
    {
      company: 'MediaLab AR',
      role: 'Full Stack Developer',
      duration: 'Jun 2021 - Ene 2023',
      location: 'Buenos Aires, Argentina',
      achievements: [
        'Construcción de una aplicación de gestión de contenidos para marketing digital basada en Node.js y React.',
        'Integración de Stripe para pagos recurrentes y creación de panel de administración con métricas en tiempo real.',
        'Coordinación con equipos de diseño para mejorar la experiencia de usuario y reducir tasa de rebote en 25%.',
        'Migración de backend a arquitectura serverless en AWS Lambda y API Gateway.',
      ],
    },
    {
      company: 'Universidad de Buenos Aires (UBA)',
      role: 'Pasante en Desarrollo Web',
      duration: 'Mar 2020 - Mayo 2021',
      location: 'Buenos Aires, Argentina',
      achievements: [
        'Participación en proyectos universitarios de plataformas educativas con React y Firebase.',
        'Automatización de tareas de social media y reportes con scripts en Python.',
        'Asistencia en talleres de programación y mentoría a estudiantes de Comunicación.',
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
        <title>Experiencia - Juan Silva | zuzudev</title>
        <meta name="description" content="Experiencia profesional de Juan Silva en desarrollo web, productos digitales y soluciones full-stack." />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-balance" style={{ letterSpacing: '-0.02em' }}>
                Professional <span className="text-slate-400">Experience</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                A timeline of my career building innovative solutions in blockchain and AI
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
              className="mt-16 bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50"
            >
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Career Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-slate-400 mb-2">8+</div>
                  <div className="text-slate-300">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-slate-400 mb-2">$2.5B+</div>
                  <div className="text-slate-300">Total Value Locked</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-slate-400 mb-2">50+</div>
                  <div className="text-slate-300">Projects Delivered</div>
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