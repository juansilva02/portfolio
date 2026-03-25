import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

const ArticleCard = ({ title, category, readTime, date, excerpt, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-500/10 flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-slate-300 bg-slate-700/50 px-2.5 py-1 rounded-full border border-slate-600/50">
          {category}
        </span>
        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>{readTime}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-slate-300 transition-colors">
        {title}
      </h3>
      
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
        {excerpt}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
        <span className="text-slate-500 text-xs">{date}</span>
        <button className="flex items-center gap-1.5 text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
          Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.article>
  );
};

export default ArticleCard;