import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import ShinyText from '@/components/ShinyText.jsx';
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
        <title>Mis artículos sobre desarrollo web, React y automatización | zuzudev</title>
        <meta
          name="description"
          content="Te comparto mis ideas sobre desarrollo web freelance en Argentina, programación React, automatización n8n y sitios que convierten mejor."
        />
        <link rel="canonical" href="https://zuzudev.pro/articles" />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <main className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                <ShinyText text="Te comparto mis artículos sobre web, React y automatización" color="#94a3b8" speed={2.8} delay={1} />
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Escribo sobre lo que hago para ayudarte a mejorar tu web, automatizar tus procesos y construir productos digitales mejor pensados.
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
