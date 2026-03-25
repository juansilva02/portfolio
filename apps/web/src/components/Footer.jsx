import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const socials = [
    { icon: Github, label: 'GitHub', href: 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: MessageCircle, label: 'Discord', href: 'https://discord.com' },
    { icon: Mail, label: 'Email', href: 'mailto:aaron@example.com' },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="text-2xl font-bold text-slate-100">
              <span className="text-slate-400">{'{AD}'}</span>
            </span>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-prose">
              Full Stack Developer specializing in blockchain and AI technologies. Building the future of decentralized systems.
            </p>
          </div>

          <div>
            <span className="text-slate-100 font-semibold mb-4 block">Quick Links</span>
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
          </div>

          <div>
            <span className="text-slate-100 font-semibold mb-4 block">Connect</span>
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
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Aaron Dukes. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-slate-500 hover:text-slate-300 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-500 hover:text-slate-300 transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;