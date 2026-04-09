import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ParticleBackground from '@/components/ParticleBackground.jsx';
import ProfileCard from '@/components/ProfileCard.jsx';
import SocialLinks from '@/components/SocialLinks.jsx';
import ExpertiseHighlights from '@/components/ExpertiseHighlights.jsx';
import KeyStatistics from '@/components/KeyStatistics.jsx';
import TechStack from '@/components/TechStack.jsx';
import FeaturedWork from '@/components/FeaturedWork.jsx';
import TestimonialCarousel from '@/components/TestimonialCarousel.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import TrustedPartnerGrid from '@/components/TrustedPartnerGrid.jsx';
import NewsletterCTA from '@/components/NewsletterCTA.jsx';

const HomePage = () => {
  const articles = [
    {
      title: 'Como diseno sitios web que convierten mejor',
      category: 'UI',
      readTime: '6 min',
      date: '12 Oct 2025',
      excerpt: 'Una mirada practica al equilibrio entre estructura, claridad visual y llamados a la accion pensados para marcas y negocios.'
    },
    {
      title: 'Automatizaciones reales para equipos pequenos',
      category: 'Automatizacion',
      readTime: '7 min',
      date: '28 Sep 2025',
      excerpt: 'Ideas concretas para ahorrar tiempo con flujos automatizados en procesos comerciales, operativos y de contenido.'
    },
    {
      title: 'Desarrollo web con foco en marca y performance',
      category: 'Desarrollo',
      readTime: '5 min',
      date: '15 Sep 2025',
      excerpt: 'Buenas practicas para construir experiencias web rapidas, mantenibles y alineadas con la identidad visual de cada proyecto.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Juan Silva | Desarrollador Full Stack y UI | zuzudev</title>
        <meta name="description" content="Portfolio de zuzudev. Desarrollo software, interfaces web y automatizaciones para marcas, profesionales y negocios que necesitan una presencia digital clara y efectiva." />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
            <ParticleBackground />
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-slate-400 text-lg font-medium"
                    >
                      Hola, soy
                    </motion.p>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 leading-tight"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      Juan <span className="text-slate-400">Silva</span>
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl md:text-3xl font-semibold text-slate-300"
                    >
                      Desarrollador Full Stack y UI
                    </motion.p>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-slate-500 text-lg"
                    >
                      Construyo experiencias digitales desde Argentina.
                    </motion.p>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-slate-300 text-lg leading-relaxed max-w-prose"
                  >
                    En zuzudev combino desarrollo web, criterio visual y automatizacion para crear productos digitales
                    que se ven bien, comunican mejor y ayudan a que cada marca crezca con una presencia online solida.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <SocialLinks />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap items-center gap-4"
                    >
                      <Link
                        to="/projects"
                        className="group flex items-center gap-2 bg-slate-300 text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 transition-all duration-200 active:scale-95"
                      >
                      <span>Ver proyectos</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                    
                    <a
                      href="/resume.pdf"
                      download
                      className="flex items-center gap-2 border border-slate-500 text-slate-300 px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 active:scale-95"
                    >
                      <Download className="w-5 h-5" />
                      <span>CV</span>
                    </a>
                  </motion.div>
                </motion.div>

                <div className="flex justify-center lg:justify-end">
                  <ProfileCard />
                </div>
              </div>
            </div>
          </section>

          <ExpertiseHighlights />
          <KeyStatistics />
          <TechStack />
          <FeaturedWork />
          <TestimonialCarousel />
          
          {/* Articles Section */}
          <section className="py-20 bg-slate-900/50 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Ultimos <span className="text-slate-400">articulos</span></h2>
                  <p className="text-slate-300 max-w-2xl">Ideas, procesos y aprendizajes sobre desarrollo web, UI y automatizacion aplicada.</p>
                </motion.div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.map((article, idx) => (
                  <ArticleCard key={idx} {...article} index={idx} />
                ))}
              </div>
            </div>
          </section>

          <TrustedPartnerGrid />
          <NewsletterCTA />
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default HomePage;
