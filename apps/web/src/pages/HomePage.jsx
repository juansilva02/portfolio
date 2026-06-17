import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Database,
  LayoutTemplate,
  MessageCircle,
  Server,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ParticleBackground from '@/components/ParticleBackground.jsx';
import ExpertiseHighlights from '@/components/ExpertiseHighlights.jsx';
import KeyStatistics from '@/components/KeyStatistics.jsx';
import TechStack from '@/components/TechStack.jsx';
import FeaturedWork from '@/components/FeaturedWork.jsx';
import NewsletterCTA from '@/components/NewsletterCTA.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import HeroBootLine from '@/components/HeroBootLine.jsx';
import WebPageAssembly3D from '@/components/WebPageAssembly3D.jsx';
import { articles } from '@/data/articles.js';

const heroLeft = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const statRow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const heroCard = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const serviceOffers = [
  {
    icon: LayoutTemplate,
    title: 'Landing page express',
    summary: 'Desde 200 USD, entregada en 48 hs, orientada a captar consultas rapido.',
  },
  {
    icon: Building2,
    title: 'Software para empresas',
    summary: 'Sistemas internos, paneles y flujos que ordenan operaciones y ventas.',
  },
  {
    icon: Database,
    title: 'SaaS y productos web',
    summary: 'MVPs, dashboards y soluciones listas para crecer con tu negocio.',
  },
  {
    icon: Server,
    title: 'Infraestructura local',
    summary: 'Armado de red y servidores locales para almacenamiento de bases de datos.',
  },
];

const HomePage = () => {
  const reduce = useReducedMotion();
  const seen = typeof window !== 'undefined' && sessionStorage.getItem('zuzudev_intro') === 'seen';
  const skipIntro = Boolean(reduce || seen);
  const [booted, setBooted] = useState(skipIntro);

  const handleBoot = () => {
    setBooted(true);
    try { sessionStorage.setItem('zuzudev_intro', 'seen'); } catch (e) { /* noop */ }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Desarrollador web freelance en Argentina | React, n8n y landing pages | zuzudev</title>
        <meta
          name="description"
          content="Desarrollador web freelance en Argentina. Landing pages en 48 hs, React, automatizacion n8n, software para empresas y SaaS desde Buenos Aires."
        />
        <link rel="canonical" href="https://zuzudev.pro/" />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        <Header />

        <main>
          <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
            <ParticleBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                <motion.div
                  variants={heroLeft}
                  initial={booted ? false : 'hidden'}
                  animate={booted ? 'show' : 'hidden'}
                  className="space-y-8"
                >
                  <motion.div
                    initial={booted ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="min-h-[48px]"
                  >
                    <HeroBootLine skip={skipIntro} onComplete={handleBoot} />
                  </motion.div>

                  <motion.div variants={heroItem} className="space-y-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">
                      Disponible esta semana
                    </span>

                    <h1
                      className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 leading-tight text-balance"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      Landing Page en <span className="text-slate-400">48 hs</span>.
                      <br />
                      Software serio para <span className="text-slate-400">empresas y comercios</span>.
                    </h1>

                    <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                      Soy Juan Silva, desarrollador web freelance en Argentina y creador de zuzudev. Trabajo desde Buenos Aires
                      con React, automatizacion n8n y foco en negocio: landing pages desde 200 USD, software para empresas,
                      SaaS y armado de red de servidores local para almacenamiento de bases de datos.
                    </p>
                  </motion.div>

                  <motion.div variants={heroItem} className="flex flex-wrap items-center gap-4">
                    <Link
                      to="/contact?service=landing-48h"
                      className="group inline-flex items-center gap-2 liquid-glass-button-blue px-6 py-3 rounded-xl font-medium text-slate-50 transition-all duration-200 hover:brightness-110 active:scale-95"
                    >
                      Quiero mi landing
                      <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>

                    <a
                      href="https://wa.me/541136952045?text=Hola%20Juan%2C%20quiero%20consultarte%20por%20una%20landing%20page."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-6 py-3 font-medium text-slate-200 transition-all duration-200 hover:bg-slate-800 active:scale-95"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp directo
                    </a>

                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 active:scale-95"
                    >
                      Ver caso real
                    </Link>
                  </motion.div>

                  <motion.div variants={statRow} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <motion.div variants={heroItem} className="liquid-glass-light rounded-[1.25rem] p-4">
                      <div className="text-sm text-slate-400 mb-1">Oferta inicial</div>
                      <div className="text-slate-100 font-semibold">200 USD la landing base</div>
                    </motion.div>
                    <motion.div variants={heroItem} className="liquid-glass-light rounded-[1.25rem] p-4">
                      <div className="text-sm text-slate-400 mb-1">Entrega</div>
                      <div className="text-slate-100 font-semibold">48 hs para salir a vender</div>
                    </motion.div>
                    <motion.div variants={heroItem} className="liquid-glass-light rounded-[1.25rem] p-4">
                      <div className="text-sm text-slate-400 mb-1">Forma de trabajo</div>
                      <div className="text-slate-100 font-semibold">Directo conmigo</div>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={heroCard}
                  initial={booted ? false : 'hidden'}
                  animate={booted ? 'show' : 'hidden'}
                  className="relative"
                >
                  <WebPageAssembly3D />
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {serviceOffers.map((offer, index) => (
                  <motion.div
                    key={offer.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="liquid-glass-light rounded-[1.5rem] p-5"
                  >
                    <offer.icon className="w-6 h-6 text-slate-200 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">{offer.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-300">{offer.summary}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <ExpertiseHighlights />
          <KeyStatistics />
          <FeaturedWork />
          <TechStack />
          <section className="py-20 bg-slate-900/50 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                    Articulos para <span className="text-slate-400">atraer trafico y educar clientes</span>
                  </h2>
                  <p className="text-slate-300 max-w-2xl">
                    Contenido sobre desarrollo web freelance, React, automatizacion n8n y criterios de conversion aplicado a negocios reales.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Link to="/articles" className="group flex items-center gap-2 text-slate-300 hover:text-slate-100 transition-colors">
                    Ver todos los articulos
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.map((article, idx) => (
                  <ArticleCard key={article.slug} {...article} index={idx} />
                ))}
              </div>
            </div>
          </section>
          <NewsletterCTA />
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default HomePage;
