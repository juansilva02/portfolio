import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Layers3 } from 'lucide-react';

const CertificationCard = ({
  title,
  category,
  summary,
  stack = [],
  year,
  siteUrl,
  repoUrl,
  ctaLabel = 'Ver proyecto',
  repoLabel = 'Ver codigo',
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-slate-800/40 rounded-xl p-6 border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-600/50">
          <Globe className="w-5 h-5 text-slate-300" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              <Layers3 className="w-3 h-3" />
              {category}
            </span>
            {year && <span className="text-xs text-slate-500">{year}</span>}
          </div>

          <h3 className="text-lg font-bold text-slate-100 mb-3">{title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">{summary}</p>

          {stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {stack.map((item) => (
                <span
                  key={item}
                  className="text-xs font-medium text-slate-300 bg-slate-900/60 px-2 py-1 rounded border border-slate-700/50"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          {(siteUrl || repoUrl) && (
            <div className="flex flex-wrap items-center gap-4">
              {siteUrl && (
                <a
                  href={siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors duration-200"
                >
                  <span>{ctaLabel}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors duration-200"
                >
                  <span>{repoLabel}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          )}
          {!siteUrl && !repoUrl && (
            <div className="text-xs text-slate-500">
              Disponible para enlazar cuando el sitio este publicado
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
