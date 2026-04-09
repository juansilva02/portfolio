import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const techPalette = {
  JavaScript: {
    glow: 'rgba(245, 214, 74, 0.28)',
    border: 'rgba(245, 214, 74, 0.34)',
    accent: 'rgba(255, 244, 199, 0.42)',
  },
  TypeScript: {
    glow: 'rgba(59, 130, 246, 0.24)',
    border: 'rgba(96, 165, 250, 0.3)',
    accent: 'rgba(191, 219, 254, 0.4)',
  },
  Python: {
    glow: 'rgba(96, 165, 250, 0.16)',
    border: 'rgba(250, 204, 21, 0.22)',
    accent: 'rgba(254, 249, 195, 0.36)',
  },
  SQL: {
    glow: 'rgba(226, 232, 240, 0.14)',
    border: 'rgba(203, 213, 225, 0.24)',
    accent: 'rgba(248, 250, 252, 0.34)',
  },
  React: {
    glow: 'rgba(34, 211, 238, 0.24)',
    border: 'rgba(103, 232, 249, 0.3)',
    accent: 'rgba(207, 250, 254, 0.38)',
  },
  'Next.js': {
    glow: 'rgba(226, 232, 240, 0.12)',
    border: 'rgba(203, 213, 225, 0.24)',
    accent: 'rgba(255, 255, 255, 0.28)',
  },
  Astro: {
    glow: 'rgba(168, 85, 247, 0.22)',
    border: 'rgba(196, 181, 253, 0.3)',
    accent: 'rgba(233, 213, 255, 0.38)',
  },
  'Node.js': {
    glow: 'rgba(74, 222, 128, 0.2)',
    border: 'rgba(134, 239, 172, 0.28)',
    accent: 'rgba(220, 252, 231, 0.34)',
  },
  Tailwind: {
    glow: 'rgba(45, 212, 191, 0.22)',
    border: 'rgba(94, 234, 212, 0.28)',
    accent: 'rgba(204, 251, 241, 0.36)',
  },
  'Framer Motion': {
    glow: 'rgba(244, 114, 182, 0.18)',
    border: 'rgba(249, 168, 212, 0.26)',
    accent: 'rgba(252, 231, 243, 0.34)',
  },
  CSS: {
    glow: 'rgba(96, 165, 250, 0.18)',
    border: 'rgba(125, 211, 252, 0.24)',
    accent: 'rgba(224, 242, 254, 0.34)',
  },
  n8n: {
    glow: 'rgba(251, 146, 60, 0.18)',
    border: 'rgba(253, 186, 116, 0.26)',
    accent: 'rgba(255, 237, 213, 0.34)',
  },
  GitHub: {
    glow: 'rgba(226, 232, 240, 0.12)',
    border: 'rgba(203, 213, 225, 0.22)',
    accent: 'rgba(255, 255, 255, 0.28)',
  },
  Vercel: {
    glow: 'rgba(226, 232, 240, 0.12)',
    border: 'rgba(203, 213, 225, 0.22)',
    accent: 'rgba(255, 255, 255, 0.28)',
  },
  Figma: {
    glow: 'rgba(244, 114, 182, 0.16)',
    border: 'rgba(168, 85, 247, 0.22)',
    accent: 'rgba(243, 232, 255, 0.32)',
  },
};

const TechStack = () => {
  const categories = [
    {
      title: 'Lenguajes',
      techs: [
        { name: 'JavaScript', desc: 'Logica para frontend, interacciones y aplicaciones web' },
        { name: 'TypeScript', desc: 'Codigo mas seguro y mantenible para proyectos en crecimiento' },
        { name: 'Python', desc: 'Automatizacion, integraciones y procesamiento de datos' },
        { name: 'SQL', desc: 'Consulta y modelado de datos para productos y operaciones' },
      ]
    },
    {
      title: 'Frameworks',
      techs: [
        { name: 'React', desc: 'Interfaces dinamicas y componentes reutilizables' },
        { name: 'Next.js', desc: 'Aplicaciones web modernas con enfoque full stack' },
        { name: 'Astro', desc: 'Sitios rapidos, livianos y orientados a contenido' },
        { name: 'Node.js', desc: 'APIs, servicios y logica de servidor' },
      ]
    },
    {
      title: 'UI y estilos',
      techs: [
        { name: 'Tailwind', desc: 'Sistemas visuales agiles y consistentes' },
        { name: 'Framer Motion', desc: 'Animaciones con criterio y mejor percepcion de interfaz' },
        { name: 'CSS', desc: 'Control fino del look and feel de cada pantalla' },
      ]
    },
    {
      title: 'Herramientas',
      techs: [
        { name: 'n8n', desc: 'Automatizacion de tareas y procesos conectando servicios' },
        { name: 'GitHub', desc: 'Versionado, colaboracion y despliegue de codigo' },
        { name: 'Vercel', desc: 'Publicacion veloz para sitios y aplicaciones modernas' },
        { name: 'Figma', desc: 'Apoyo visual para definir estructura y decisiones de UI' },
      ]
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="liquid-glass-blue rounded-[1.85rem] text-center mb-16 max-w-3xl mx-auto px-8 py-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Stack <span className="text-slate-400">tecnologico</span></h2>
          <p className="text-slate-300 max-w-2xl mx-auto">Herramientas y tecnologias que uso para construir productos web claros, rapidos y mantenibles.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TooltipProvider delayDuration={100}>
            {categories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="liquid-glass-light rounded-[1.65rem] p-6"
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-6 pb-2 border-b border-slate-700 relative">
                  {category.title}
                  <motion.div 
                    className="absolute bottom-[-1px] left-0 h-[1px] bg-slate-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: '40%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                  />
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.techs.map((tech) => (
                    <Tooltip key={tech.name}>
                      <TooltipTrigger asChild>
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          className="glass-stable relative overflow-hidden px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-slate-100 transition-colors cursor-default backdrop-blur-md"
                          style={{
                            border: `1px solid ${(techPalette[tech.name] ?? techPalette.GitHub).border}`,
                            background: `radial-gradient(circle at 18% 18%, ${(techPalette[tech.name] ?? techPalette.GitHub).accent}, transparent 24%), linear-gradient(145deg, rgba(255,255,255,0.08) 0%, transparent 42%, rgba(255,255,255,0.02) 100%), rgba(15,23,42,0.28)`,
                            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1), 0 14px 28px -24px ${(techPalette[tech.name] ?? techPalette.GitHub).glow}`,
                          }}
                        >
                          <span
                            className="pointer-events-none absolute inset-0 skill-sheen"
                            style={{
                              background: `linear-gradient(115deg, transparent 18%, ${(techPalette[tech.name] ?? techPalette.GitHub).accent} 42%, transparent 68%)`,
                              opacity: 0.55,
                            }}
                          />
                          <span className="relative z-10">{tech.name}</span>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-800 border-slate-600 text-slate-200">
                        <p>{tech.desc}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </motion.div>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
