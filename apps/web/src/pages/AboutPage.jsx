import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Code2, Rocket, Users, Award } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const AboutPage = () => {
  const highlights = [
    {
      icon: Code2,
      title: 'Creative Development',
      description: 'Combines narrative thinking with practical engineering to launch products with strong user engagement.',
    },
    {
      icon: Rocket,
      title: 'Product Focused',
      description: 'Aligns technical choices with business goals and works iteratively toward measurable results.',
    },
    {
      icon: Users,
      title: 'Team Leadership',
      description: 'Mentors teams in modern frontend and backend practices, boosting productivity and code quality.',
    },
    {
      icon: Award,
      title: 'Outcome Oriented',
      description: 'Delivered successful web applications, mobile-first experiences, and marketing platforms under tight deadlines.',
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
        <title>About - Juan Silva | zuzudev</title>
        <meta name="description" content="Conoce a Juan Silva (zuzudev), desarrollador full-stack con enfoque en productos digitales, UX y tecnologías web modernas." />
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
                About <span className="text-slate-400">Me</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Building the future of decentralized systems, one line of code at a time
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-slate-100 mb-4">Mi Trayectoria</h2>
                <p className="text-slate-300 leading-relaxed">
                  Comencé mi carrera en tecnología en Buenos Aires creando contenidos digitales y sitios web interactivos. 
                  Esta mezcla de comunicación y código me llevó naturalmente a especializarme en experiencias de usuario.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Hoy soy desarrollador full-stack con foco en productos que resuelven problemas reales para pymes y startups. 
                  Disfruto idear soluciones claras, implementar arquitectura escalable y mejorar métricas de conversión.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Me apasiona aprender nuevas tecnologías y llevarlas a proyectos prácticos: desde diseño de interfaces hasta despliegue y automatización de infraestructura.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-slate-100 mb-4">Más allá del Código</h2>
                <p className="text-slate-300 leading-relaxed">
                  Fuera del teclado, lidero comunidades de desarrolladores y colaboro con equipos creativos para generar contenido educativo.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Me interesa el diseño estratégico de producto, la comunicación asertiva y las propuestas con impacto social.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  En mi tiempo libre, exploro nuevas herramientas, escribo artículos y trabajo en proyectos personales como `zuzudev.com`.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">What Drives Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600/50">
                        <highlight.icon className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2">{highlight.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{highlight.description}</p>
                      </div>
                    </div>
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

export default AboutPage;