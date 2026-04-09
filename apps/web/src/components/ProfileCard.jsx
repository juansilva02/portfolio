import React from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative group"
    >
      <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 ring-1 ring-slate-600/50 glow-slate transition-all duration-300 hover:ring-slate-500 hover:glow-slate-strong hover:scale-105">
        <div className="relative w-full aspect-square rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center overflow-hidden mb-6 border border-slate-600/30">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-transparent" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(148, 163, 184, 0.03) 2px, rgba(148, 163, 184, 0.03) 4px)',
          }} />
          <User className="w-32 h-32 text-slate-400/60" strokeWidth={1.5} />
          
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <circle cx="50" cy="50" r="2" fill="#94A3B8" />
              <circle cx="150" cy="50" r="2" fill="#94A3B8" />
              <circle cx="50" cy="150" r="2" fill="#94A3B8" />
              <circle cx="150" cy="150" r="2" fill="#94A3B8" />
              <line x1="50" y1="50" x2="150" y2="50" stroke="#94A3B8" strokeWidth="0.5" />
              <line x1="50" y1="150" x2="150" y2="150" stroke="#94A3B8" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="50" y2="150" stroke="#94A3B8" strokeWidth="0.5" />
              <line x1="150" y1="50" x2="150" y2="150" stroke="#94A3B8" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-600/50">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-slate-300">Disponible para proyectos</span>
        </div>
        
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-slate-500/30 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-slate-500/30 rounded-br-2xl" />
      </div>
    </motion.div>
  );
};

export default ProfileCard;
