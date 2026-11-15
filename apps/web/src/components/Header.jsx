import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const demoFocus = location.pathname === '/' || location.pathname === '/demo';
  const actionPath = demoFocus ? '/demo' : '/contact?service=landing-48h';
  const actionLabel = demoFocus ? 'Solicitá tu demo' : 'Cotizar ahora';

  const navItems = [
    { name: 'Servicios', path: '/projects' },
    { name: 'Cotizar', path: '/cotizar' },
    { name: 'Articulos', path: '/articles' },
    { name: 'Sobre mi', path: '/about' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg shadow-slate-900/20 border-b border-slate-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-slate-100 hover:text-slate-300 transition-colors duration-200"
          >
            <span className="bg-gradient-to-r from-slate-400 via-white to-slate-400 bg-clip-text text-transparent">{'{zuzudev}'}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 relative ${
                  location.pathname === item.path
                    ? 'text-slate-100'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-slate-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <Link
            to={actionPath}
            className="hidden lg:block liquid-glass-button-blue text-slate-50 px-6 py-2 rounded-xl font-medium transition-all duration-200 active:scale-95 hover:brightness-110"
          >
            {actionLabel}
          </Link>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex min-h-11 min-w-11 items-center justify-center text-slate-100 hover:text-slate-300 transition-colors duration-200"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800"
          >
            <nav id="mobile-navigation" className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-slate-800 text-slate-100'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to={actionPath}
                className="mt-2 liquid-glass-button-blue text-slate-50 px-4 py-3 rounded-xl font-medium text-center transition-all duration-200 active:scale-95 hover:brightness-110"
              >
                {actionLabel}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
