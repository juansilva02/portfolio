import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ title, description, techStack, demoUrl, repoUrl, featured = false, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative bg-slate-800/40 rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
        featured 
          ? 'border-slate-500/50 glow-slate md:col-span-2 md:row-span-2' 
          : 'border-slate-700/50 hover:border-slate-500/50 hover:shadow-slate-500/10'
      }`}
    >
      {featured && (
        <div className="absolute top-4 right-4 bg-slate-700/50 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-600/50">
          <span className="text-xs font-medium text-slate-300">Featured</span>
        </div>
      )}
      
      <div className="flex flex-col h-full">
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
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>Repository</span>
            </a>
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-2xl bg-slate-400/0 group-hover:bg-slate-400/5 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;