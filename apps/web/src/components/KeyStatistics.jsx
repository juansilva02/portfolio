import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Clock3, DollarSign, MessageCircle } from 'lucide-react';
import { fadeUp, staggerContainer, revealOnView, hoverLift } from '@/lib/motion';

const KeyStatistics = () => {
  const stats = [
    { icon: Clock3, displayValue: '48 hs', label: 'Entrega objetivo para una landing express publicada' },
    { icon: DollarSign, displayValue: '200 USD', label: 'Base de entrada para una landing clara y profesional' },
    { icon: MessageCircle, displayValue: 'Directo', label: 'Trato conmigo, sin intermediarios ni vueltas innecesarias' },
    { icon: Building2, displayValue: 'Empresas + SaaS', label: 'Soluciones para negocio, software interno y producto web' },
  ];

  return (
    <section className="py-16 border-y border-slate-700/50 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.08)}
          {...revealOnView}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              whileHover={hoverLift}
              className="liquid-glass-light flex flex-col items-center text-center p-6 rounded-[1.65rem] transition-colors relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-slate-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <stat.icon className="w-8 h-8 text-slate-400 mb-4 group-hover:text-slate-300 transition-colors animate-pulse-glow" />
              <h3 className="text-3xl font-bold text-slate-100 mb-2 text-balance">{stat.displayValue}</h3>
              <p className="text-slate-400 font-medium text-sm leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyStatistics;
