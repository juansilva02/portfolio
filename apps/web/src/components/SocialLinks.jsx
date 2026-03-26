import React from 'react';
import { Github, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const links = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/juansilva02' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/juan-bautista-silva/' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/541136952045' },
];

const SocialLinks = () => (
  <div className="flex items-center justify-center gap-3">
    {links.map(({ icon: Icon, label, href }, index) => (
      <motion.a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ delay: index * 0.1 }}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-all duration-200"
      >
        <Icon className="w-4 h-4" />
      </motion.a>
    ))}
  </div>
);

export default SocialLinks;
