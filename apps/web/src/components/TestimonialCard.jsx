import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ quote, author, title, company }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50 relative h-full flex flex-col"
    >
      <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-600/30 rotate-180" />
      <div className="flex-grow mb-6">
        <p className="text-slate-300 leading-relaxed italic relative z-10">
          "{quote}"
        </p>
      </div>
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-lg border border-slate-600">
          {author.charAt(0)}
        </div>
        <div>
          <h4 className="text-slate-100 font-semibold">{author}</h4>
          <p className="text-slate-400 text-sm">{title}, <span className="text-slate-300">{company}</span></p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;