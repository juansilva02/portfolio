import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NewsletterCTA = () => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="liquid-glass-blue rounded-[2rem] p-8 md:p-12 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-slate-600/50 bg-slate-900/50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            zuzudev
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-slate-100">
            Necesitas una web clara, moderna y pensada para tu marca?
          </h2>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Puedo ayudarte a transformar una idea, servicio o negocio en una experiencia digital bien resuelta, con foco en UI, desarrollo y resultados.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-300 px-6 py-3 font-medium text-slate-900 transition-all duration-200 hover:bg-slate-200 active:scale-95"
            >
              Hablemos de tu proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-6 py-3 font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 active:scale-95"
            >
              Ver mas trabajos
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
