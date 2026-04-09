import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircleMore } from 'lucide-react';

const FloatingContactButton = () => {
  const location = useLocation();

  if (location.pathname === '/contact') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="fixed bottom-6 right-6 z-[60]"
    >
      <Link
        to="/contact"
        className="group flex items-center gap-3 rounded-full border border-slate-600/60 bg-slate-900/90 px-4 py-3 text-slate-100 shadow-lg shadow-slate-950/30 backdrop-blur-md transition-all duration-200 hover:border-slate-400/70 hover:bg-slate-800"
        aria-label="Pedir contacto"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 text-slate-900 transition-transform duration-200 group-hover:scale-105">
          <MessageCircleMore className="h-5 w-5" />
        </span>
        <span className="pr-1 text-sm font-medium">
          Pedir contacto
        </span>
      </Link>
    </motion.div>
  );
};

export default FloatingContactButton;
