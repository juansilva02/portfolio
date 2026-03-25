import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';

const CertificationCard = ({ name, issuer, issueDate, credentialId, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-600/50">
          <Award className="w-5 h-5 text-slate-300" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-100 mb-1">{name}</h3>
          <p className="text-slate-300 text-sm font-medium mb-2">{issuer}</p>
          
          <div className="flex flex-col gap-1 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              <span>Issued {issueDate}</span>
            </div>
            {credentialId && (
              <div className="text-slate-500">
                ID: {credentialId}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;