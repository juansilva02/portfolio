import React from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ name, category, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-slate-800/40 rounded-xl p-6 border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-500/10"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-100 mb-1">{name}</h3>
        <p className="text-sm text-slate-400">{category}</p>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">Experienced practitioner delivering production-grade implementations and clean architecture.</p>
      <div className="absolute inset-0 rounded-xl bg-slate-400/0 group-hover:bg-slate-400/5 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default SkillCard;