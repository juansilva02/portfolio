import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const ExperienceCard = ({ company, role, duration, location, achievements, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-slate-500/50 via-slate-600/30 to-transparent" />
      <div className="absolute left-0 top-6 w-3 h-3 bg-slate-400 rounded-full ring-4 ring-slate-900 -translate-x-[5px]" />
      
      <div className="ml-8 bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-100 mb-1">{role}</h3>
            <p className="text-lg text-slate-300 font-medium">{company}</p>
          </div>
          <div className="flex flex-col gap-1 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            {location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>
        
        <ul className="space-y-2">
          {achievements.map((achievement, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-300">
              <span className="text-slate-500 mt-1.5">•</span>
              <span className="leading-relaxed">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;