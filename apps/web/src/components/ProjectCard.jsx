import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({
  title,
  description,
  techStack,
  demoUrl,
  repoUrl,
  imageUrl,
  category,
  year,
  featured = false,
  index = 0,
}) => {
  const isExternalDemo = demoUrl?.startsWith('http');
  const isExternalRepo = repoUrl?.startsWith('http');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
          <div className={`relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/70 mb-6 ${featured ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
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
          {techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs font-medium text-slate-300 bg-slate-900/50 px-2 py-1 rounded border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-3 mt-auto">
          {demoUrl && (
            <a
              href={demoUrl}
              target={isExternalDemo ? "_blank" : undefined}
              rel={isExternalDemo ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Ver sitio</span>
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target={isExternalRepo ? "_blank" : undefined}
              rel={isExternalRepo ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>Repositorio</span>
            </a>
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-2xl bg-slate-400/0 group-hover:bg-slate-400/5 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;
