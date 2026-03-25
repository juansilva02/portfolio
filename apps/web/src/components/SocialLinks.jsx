import React from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ name, category, proficiency, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-slate-800/40 rounded-xl p-6 border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-500/10"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-1">{name}</h3>
          <p className="text-sm text-slate-400">{category}</p>
        </div>
        <span className="text-xs font-medium text-slate-300 bg-slate-700/50 px-2 py-1 rounded border border-slate-600/50">
          {proficiency}%
        </span>
      </div>
      
      <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-slate-400 rounded-full"
        />
      </div>
      
      <div className="absolute inset-0 rounded-xl bg-slate-400/0 group-hover:bg-slate-400/5 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default SkillCard;