import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { fadeUp, staggerContainer, revealOnView } from '@/lib/motion';

const NewsletterCTA = () => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer()}
          {...revealOnView}
          className="liquid-glass-blue rounded-[2rem] p-8 md:p-12 text-center"
        >
          <motion.span variants={fadeUp} className="inline-flex items-center rounded-full border border-slate-600/50 bg-slate-900/50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            Oferta directa
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-6 text-3xl md:text-4xl font-bold text-slate-100">
            Landing page en 48 hs desde 200 USD.
            <br />
            Software y SaaS para empresas que necesitan avanzar ya.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Si necesitas captar clientes rapido o ordenar una operacion con software propio, escribime y te respondo con una propuesta concreta.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact?service=landing-48h"
              className="inline-flex items-center gap-2 liquid-glass-button-blue px-6 py-3 rounded-xl font-medium text-slate-50 transition-all duration-200 hover:brightness-110 active:scale-95"
            >
              Pedir propuesta
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/541136952045?text=Hola%20Juan%2C%20quiero%20una%20propuesta%20para%20mi%20negocio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-6 py-3 font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              Hablar por WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
