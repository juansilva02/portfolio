import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

const EducationCard = ({ institution, degree, field, graduationDate, gpa, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="liquid-glass-blue rounded-[1.65rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600/50">
          <GraduationCap className="w-6 h-6 text-slate-300" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-100 mb-1">{degree}</h3>
          <p className="text-slate-300 font-medium mb-2">{institution}</p>
          {field && <p className="text-slate-400 text-sm mb-3">{field}</p>}
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{graduationDate}</span>
            </div>
            {gpa && (
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-medium">GPA: {gpa}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationCard;
