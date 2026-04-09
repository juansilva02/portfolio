import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SkillCard from '@/components/SkillCard.jsx';

const SkillsPage = () => {
  const skillCategories = [
    {
      category: 'Lenguajes',
      skills: [
        { name: 'JavaScript' },
        { name: 'TypeScript' },
        { name: 'Python' },
        { name: 'Go' },
        { name: 'HTML & CSS' },
      ],
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'React' },
        { name: 'Astro' },
        { name: 'Tailwind CSS' },
        { name: 'Vite' },
        { name: 'Next.js' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js' },
        { name: 'Express' },
        { name: 'FastAPI' },
        { name: 'GraphQL' },
      ],
    },
    {
      category: 'Databases',
      skills: [
        { name: 'PostgreSQL' },
        { name: 'MongoDB' },
        { name: 'Redis' },
      ],
    },
    {
      category: 'DevOps',
      skills: [
        { name: 'Docker' },
        { name: 'GitHub Actions' },
        { name: 'CI/CD' },
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
        <title>Skills | Juan Silva | zuzudev</title>
        <meta name="description" content="Stack técnico y habilidades de Juan Silva en desarrollo web moderno, interfaces, automatización y soluciones orientadas a producto." />
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
                Stack y <span className="text-slate-400">skills</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Una vista clara de las tecnologías con las que construyo productos web, interfaces y automatizaciones.
              </p>
            </motion.div>

            <div className="space-y-16">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-3xl font-bold text-slate-100 mb-8">
                    {category.category}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillCard
                        key={skill.name}
                        name={skill.name}
                        category={category.category}
                        proficiency={skill.proficiency}
                        index={skillIndex}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50"
            >
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Aprendizaje continuo</h3>
              <p className="text-slate-300 leading-relaxed max-w-prose">
                La tecnología cambia rápido. Mantengo el stack actualizado explorando nuevas herramientas,
                mejorando criterios de arquitectura y probando enfoques que eleven la calidad visual, técnica
                y operativa de cada proyecto.
              </p>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default SkillsPage;
