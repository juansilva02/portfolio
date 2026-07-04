import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

// 404 con estética terminal: "comando no encontrado" para la ruta pedida.
const NotFoundPage = () => {
  const location = useLocation();
  const ruta = (location.pathname || '/').replace(/"/g, '');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <Helmet>
        <title>404 · Página no encontrada | zuzudev</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="w-full max-w-2xl">
        <div className="liquid-glass-blue rounded-2xl overflow-hidden border border-slate-700/60">
          {/* Barra de la ventana */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/60 bg-slate-900/40">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs font-mono text-slate-500">zuzudev — bash</span>
          </div>

          {/* Contenido */}
          <div className="p-6 sm:p-8 font-mono text-sm sm:text-base leading-relaxed">
            <p className="text-slate-300">
              <span className="text-emerald-400">$</span> cd{' '}
              <span className="text-sky-300 break-all">{ruta}</span>
            </p>
            <p className="text-red-400 mt-2">
              bash: cd: {ruta}: No existe el archivo o directorio
            </p>
            <p className="text-slate-300 mt-4">
              <span className="text-emerald-400">$</span> zuzudev --sugerencia
            </p>
            <p className="text-slate-400 mt-2">
              → La página que buscás no existe o se movió. Volvé al inicio o mirá los proyectos.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 liquid-glass-button-blue text-slate-50 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 hover:brightness-110 active:scale-95"
              >
                <Home className="w-4 h-4" />
                Volver al inicio
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-2.5 font-medium text-slate-200 transition-all duration-200 hover:bg-slate-800 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                Ver proyectos
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-8xl sm:text-9xl font-bold text-slate-800 select-none">404</p>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
