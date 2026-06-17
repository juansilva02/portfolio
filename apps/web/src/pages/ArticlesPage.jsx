import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { articles } from '@/data/articles.js';

const ArticlesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Articulos sobre desarrollo web, React y automatizacion | zuzudev</title>
        <meta
          name="description"
          content="Articulos de zuzudev sobre desarrollo web freelance en Argentina, programacion React, automatizacion n8n y sitios que convierten mejor."
        />
        <link rel="canonical" href="https://zuzudev.pro/articles" />
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
              <h1 className="page-title-shine text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-balance">
                Articulos sobre <span className="text-slate-400">web, React y automatizacion</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Contenido orientado a clientes y equipos que buscan un desarrollador web freelance en Argentina, automatizacion con n8n o productos web mejor pensados.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <ArticleCard key={article.slug} {...article} index={index} />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default ArticlesPage;
