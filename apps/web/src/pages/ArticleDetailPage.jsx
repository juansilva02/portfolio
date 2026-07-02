import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { articlesBySlug } from '@/data/articles.js';
import { fadeUp, staggerContainer, revealOnView } from '@/lib/motion';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const article = articlesBySlug[slug];

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>{article.seoTitle} | zuzudev</title>
        <meta name="description" content={article.metaDescription} />
        <link rel="canonical" href={`https://zuzudev.pro/articles/${article.slug}`} />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <main className="pt-24 pb-20">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Link to="/articles" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">
                Volver a articulos
              </Link>
            </div>

            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="liquid-glass-blue rounded-[2rem] p-8 md:p-10 mb-10"
            >
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 bg-slate-900/40 px-3 py-1 rounded-full border border-slate-700/50">
                  {article.category}
                </span>
                <span className="text-sm text-slate-400">{article.readTime}</span>
                <span className="text-sm text-slate-400">{article.date}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-5 text-balance">{article.title}</h1>
              <p className="text-xl text-slate-300 leading-relaxed">{article.excerpt}</p>
            </motion.header>

            <motion.div
              variants={staggerContainer()}
              {...revealOnView}
              className="liquid-glass-light rounded-[2rem] p-8 md:p-10"
            >
              <motion.p variants={fadeUp} className="text-lg text-slate-200 leading-relaxed mb-8">{article.intro}</motion.p>

              <div className="space-y-10">
                {article.sections.map((section) => (
                  <motion.section variants={fadeUp} key={section.heading}>
                    <h2 className="text-2xl font-bold text-slate-100 mb-4">{section.heading}</h2>
                    <div className="space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-slate-300 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </div>

              <motion.div variants={fadeUp} className="mt-12 pt-8 border-t border-slate-700/50">
                <h3 className="text-xl font-semibold text-slate-100 mb-4">Palabras clave trabajadas</h3>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs font-medium text-slate-300 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-700/50"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </article>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default ArticleDetailPage;
