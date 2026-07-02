import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { fadeUp, fadeRight, scaleIn, staggerContainer, revealOnView } from '@/lib/motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import EducationCard from '@/components/EducationCard.jsx';

const EducationPage = () => {
  const education = [
    {
      institution: 'Universidad de Buenos Aires (UBA)',
      degree: 'Licenciatura en Ciencias de la Comunicación',
      field: 'Medios digitales, narrativa transmedia y comunicación estratégica',
      graduationDate: 'Diciembre 2022',
      gpa: '8.7',
    },
    {
      institution: 'Instituto Tecnológico de Buenos Aires (ITBA)',
      degree: 'Curso de Desarrollo Web Full Stack',
      field: 'React, Node.js, bases de datos y despliegue',
      graduationDate: 'Junio 2021',
      gpa: '9.0',
    },
  ];

  const achievements = [
    'Integrante del equipo ganador del Hackathon UBA 2022 con un proyecto de experiencia de usuario móvil',
    'Desarrollo de contenidos digitales para campañas de sensibilización y branding corporativo',
    'Participación en seminarios de comunicación digital y storytelling para marcas tecnológicas',
    'Coordinador de proyecto final de grado sobre comunicación y UX',
    'Colaboración con ONG locales para soluciones de alcance comunitario',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Educación - Juan Silva | zuzudev</title>
        <meta name="description" content="Formación académica de Juan Silva (zuzudev), con estudios en Ciencias de la Comunicación y desarrollo web full-stack." />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <span className="text-slate-400">Educacion</span>
              </motion.h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Formacion academica y tecnica que sostiene mi evolucion hacia productos web y soluciones de mayor nivel.
              </p>
            </motion.div>

            <div className="space-y-6 mb-16">
              {education.map((edu, index) => (
                <EducationCard
                  key={edu.institution}
                  institution={edu.institution}
                  degree={edu.degree}
                  field={edu.field}
                  graduationDate={edu.graduationDate}
                  gpa={edu.gpa}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              variants={staggerContainer(0.08)}
              {...revealOnView}
              className="liquid-glass-light rounded-[1.75rem] p-8"
            >
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-slate-100 mb-6">Logros academicos</motion.h2>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    variants={fadeRight}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <span className="text-slate-500 mt-1.5">•</span>
                    <span className="leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.08)}
              {...revealOnView}
              className="mt-8 liquid-glass-blue rounded-[1.75rem] p-8"
            >
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-slate-100 mb-6">Formacion relevante</motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Distributed Systems',
                  'Cryptography and Network Security',
                  'Advanced Algorithms',
                  'Machine Learning',
                  'Database Systems',
                  'Computer Networks',
                  'Operating Systems',
                  'Artificial Intelligence',
                ].map((course, index) => (
                  <motion.div
                    key={course}
                    variants={scaleIn}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <div className="w-2 h-2 bg-slate-400 rounded-full" />
                    <span>{course}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default EducationPage;
