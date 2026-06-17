import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, MessageCircle } from 'lucide-react';
import { fadeUp, revealOnView } from '@/lib/motion';

const ProjectCard = ({
  title,
  description,
  techStack,
  demoUrl,
  repoUrl,
  imageUrl,
  category,
  year,
  demoLabel = 'Ver sitio',
  repoLabel = 'Repositorio',
  featured = false,
  index = 0,
}) => {
  const isExternalDemo = demoUrl?.startsWith('http');
  const isExternalRepo = repoUrl?.startsWith('http');

  return (
    <motion.div
      variants={fadeUp}
      {...revealOnView}
      className={`glass-stable group relative rounded-[1.65rem] p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
        featured 
          ? 'liquid-glass-blue glow-slate md:col-span-2 md:row-span-2' 
          : 'liquid-glass-light'
      }`}
    >
      {featured && (
        <div className="absolute top-4 right-4 bg-slate-700/50 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-600/50">
          <span className="text-xs font-medium text-slate-300">Destacado</span>
        </div>
      )}
      
      <div className="flex flex-col h-full">
        {imageUrl && (
          <div className={`relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/70 mb-6 ${featured ? 'flex-1 min-h-[260px]' : 'aspect-[16/10]'}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-900/10 z-10" />
            <img
              src={imageUrl}
              alt={`Vista previa de ${title}`}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        )}

        {(category || year) && (
          <div className="flex items-center justify-between gap-3 mb-3">
            {category ? (
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {category}
              </span>
            ) : (
              <span />
            )}
            {year && <span className="text-xs text-slate-500">{year}</span>}
          </div>
        )}

        <h3 className={`font-bold text-slate-100 mb-3 ${featured ? 'text-2xl' : 'text-xl'}`}>
          {title}
        </h3>
        
        <p className={`text-slate-300 leading-relaxed mb-4 ${featured ? 'text-base' : 'text-sm'}`}>
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium text-slate-300 bg-slate-900/50 px-2 py-1 rounded border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto pt-5 border-t border-slate-700/50">
          {demoUrl && (
            isExternalDemo ? (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{demoLabel}</span>
              </a>
            ) : (
              <Link
                to={demoUrl}
                className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{demoLabel}</span>
              </Link>
            )
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target={isExternalRepo ? "_blank" : undefined}
              rel={isExternalRepo ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>{repoLabel}</span>
            </a>
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-2xl bg-slate-400/0 group-hover:bg-slate-400/5 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;
