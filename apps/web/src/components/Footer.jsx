import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, MessageCircle, Mail } from 'lucide-react';
import { fadeUp, staggerContainer, revealOnView } from '@/lib/motion';

const Footer = () => {
  const quickLinks = [
    { name: 'Servicios', path: '/projects' },
    { name: 'Articulos', path: '/articles' },
    { name: 'Sobre mi', path: '/about' },
    { name: 'Contacto', path: '/contact' },
  ];

  const socials = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/juansilva02' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/juan-bautista-silva/' },
    { icon: Mail, label: 'Email', href: 'mailto:administracion@zuzudev.pro' },
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/541136952045' },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div variants={staggerContainer(0.08)} {...revealOnView} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div variants={fadeUp}>
            <span className="text-2xl font-bold text-slate-100">
              <span className="text-slate-400">zuzudev</span>
            </span>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-prose">
              Landing pages en 48 hs, desarrollo de software para empresas, SaaS y armado de red de servidores local para bases de datos.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <span className="text-slate-100 font-semibold mb-4 block">Navegacion</span>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-slate-400 hover:text-slate-200 text-sm transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div variants={fadeUp}>
            <span className="text-slate-100 font-semibold mb-4 block">Contacto directo</span>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800 transition-all duration-200 active:scale-95"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Buenos Aires, Argentina. Trabajo remoto y con respuesta directa.
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} {...revealOnView} className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Juan Silva | zuzudev
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="mailto:administracion@zuzudev.pro" className="text-slate-500 hover:text-slate-300 transition-colors duration-200">
              administracion@zuzudev.pro
            </a>
            <a href="https://wa.me/541136952045" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 transition-colors duration-200">
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
