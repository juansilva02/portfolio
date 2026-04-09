import React from 'react';
import { motion } from 'framer-motion';

const skillPalette = {
  'JavaScript': {
    glow: 'rgba(245, 214, 74, 0.32)',
    border: 'rgba(245, 214, 74, 0.42)',
    accent: 'rgba(255, 244, 199, 0.55)',
  },
  'TypeScript': {
    glow: 'rgba(59, 130, 246, 0.26)',
    border: 'rgba(96, 165, 250, 0.38)',
    accent: 'rgba(191, 219, 254, 0.5)',
  },
  'React': {
    glow: 'rgba(34, 211, 238, 0.28)',
    border: 'rgba(103, 232, 249, 0.38)',
    accent: 'rgba(207, 250, 254, 0.5)',
  },
  'Astro': {
    glow: 'rgba(168, 85, 247, 0.28)',
    border: 'rgba(196, 181, 253, 0.4)',
    accent: 'rgba(233, 213, 255, 0.52)',
  },
  'Tailwind CSS': {
    glow: 'rgba(45, 212, 191, 0.24)',
    border: 'rgba(94, 234, 212, 0.35)',
    accent: 'rgba(204, 251, 241, 0.46)',
  },
  'Next.js': {
    glow: 'rgba(226, 232, 240, 0.14)',
    border: 'rgba(203, 213, 225, 0.28)',
    accent: 'rgba(255, 255, 255, 0.3)',
  },
  'Node.js': {
    glow: 'rgba(74, 222, 128, 0.22)',
    border: 'rgba(134, 239, 172, 0.34)',
    accent: 'rgba(220, 252, 231, 0.44)',
  },
  'Python': {
    glow: 'rgba(96, 165, 250, 0.18)',
    border: 'rgba(250, 204, 21, 0.24)',
    accent: 'rgba(254, 249, 195, 0.44)',
  },
  'Go': {
    glow: 'rgba(34, 211, 238, 0.22)',
    border: 'rgba(125, 211, 252, 0.34)',
    accent: 'rgba(224, 242, 254, 0.45)',
  },
  'HTML & CSS': {
    glow: 'rgba(251, 113, 133, 0.18)',
    border: 'rgba(251, 146, 60, 0.28)',
    accent: 'rgba(255, 237, 213, 0.42)',
  },
};

const skillIconMap = {
  'JavaScript': 'JS',
  'TypeScript': 'TS',
  'React': 'atom',
  'Astro': 'astro',
  'Tailwind CSS': 'tw',
  'Vite': 'vite',
  'Next.js': 'N',
  'Node.js': 'node',
  'Python': 'py',
  'Go': 'go',
  'HTML & CSS': 'web',
  'Express': 'EX',
  'FastAPI': 'FA',
  'GraphQL': 'GQL',
  'PostgreSQL': 'db',
  'MongoDB': 'mongo',
  'Redis': 'redis',
  'Docker': 'docker',
  'GitHub Actions': 'gh',
  'CI/CD': 'ci',
};

const SkillLogo = ({ type, accent }) => {
  const commonStroke = {
    stroke: accent,
    strokeWidth: 1.8,
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'atom':
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <circle cx="16" cy="16" r="2.2" fill={accent} />
          <ellipse cx="16" cy="16" rx="10.5" ry="4.5" {...commonStroke} />
          <ellipse cx="16" cy="16" rx="10.5" ry="4.5" {...commonStroke} transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="10.5" ry="4.5" {...commonStroke} transform="rotate(120 16 16)" />
        </svg>
      );
    case 'astro':
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <path d="M16 5L21.8 19.5L18.4 17.6L16 24.8L13.6 17.6L10.2 19.5L16 5Z" fill={accent} />
        </svg>
      );
    case 'tw':
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <path d="M9 13.5C10.5 9.8 13.2 8 17 8C22 8 22.6 11.6 25 12.4C23.5 16.2 20.8 18 17 18C12 18 11.4 14.4 9 13.5ZM7 20C8.3 17.2 10.6 15.8 13.8 15.8C18 15.8 18.5 18.5 20.6 19.1C19.3 21.9 17 23.3 13.8 23.3C9.6 23.3 9.1 20.6 7 20Z" fill={accent} />
        </svg>
      );
    case 'vite':
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <path d="M16 4L24 8.8L18 27L14 27L8 8.8L16 4Z" fill={accent} />
          <path d="M16 10.2L19.2 12.3L16.9 20.3H15.1L12.8 12.3L16 10.2Z" fill="rgba(15,23,42,0.65)" />
        </svg>
      );
    case 'node':
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <polygon points="16,4.8 24.5,9.7 24.5,22.3 16,27.2 7.5,22.3 7.5,9.7" fill="none" stroke={accent} strokeWidth="1.8" />
          <path d="M13 12V20M19 12V20M13 12C14.3 11.5 15.2 11.3 16 11.3C18.3 11.3 19 12.5 19 14.6" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'py':
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <path d="M10 9.2C10 7.4 11.4 6 13.2 6H17.5C19.7 6 21 7.4 21 9.6V13.8C21 16 19.5 17.1 17.4 17.1H12.6C10.6 17.1 9 18.3 9 20.5V22.8" {...commonStroke} />
          <path d="M22 22.8C22 24.6 20.6 26 18.8 26H14.5C12.3 26 11 24.6 11 22.4V18.2C11 16 12.5 14.9 14.6 14.9H19.4C21.4 14.9 23 13.7 23 11.5V9.2" {...commonStroke} />
          <circle cx="14" cy="9.9" r="1" fill={accent} />
          <circle cx="18" cy="22.1" r="1" fill={accent} />
        </svg>
      );
    case 'go':
      return <span className="text-[11px] font-black tracking-[0.18em]" style={{ color: accent }}>GO</span>;
    case 'web':
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <rect x="6" y="7" width="20" height="18" rx="4" {...commonStroke} />
          <path d="M6 12H26M12 25V12M20 25V12" {...commonStroke} />
        </svg>
      );
    case 'mongo':
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <path d="M16 5C19.4 9.1 19.4 15.2 16 26C12.6 15.2 12.6 9.1 16 5Z" fill={accent} />
        </svg>
      );
    case 'redis':
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <path d="M8 11L16 8L24 11L16 14L8 11Z" fill={accent} />
          <path d="M8 16L16 13L24 16L16 19L8 16Z" fill={accent} opacity="0.78" />
          <path d="M8 21L16 18L24 21L16 24L8 21Z" fill={accent} opacity="0.56" />
        </svg>
      );
    case 'docker':
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <rect x="8" y="12" width="4" height="4" rx="1" fill={accent} />
          <rect x="13" y="12" width="4" height="4" rx="1" fill={accent} />
          <rect x="18" y="12" width="4" height="4" rx="1" fill={accent} />
          <rect x="13" y="17" width="4" height="4" rx="1" fill={accent} />
          <rect x="18" y="17" width="4" height="4" rx="1" fill={accent} />
          <path d="M7 20.5C8.6 23.3 11.4 24.5 15.4 24.5C21.3 24.5 24.8 21.5 25.5 17.5C24.2 17.9 23.2 17.7 22.2 16.8" {...commonStroke} />
        </svg>
      );
    case 'gh':
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <path d="M11 21.2V17.8C9 17.2 8 15.7 8 13.7C8 10.4 10.5 8 14 8C15.3 8 16.4 8.3 17.3 9C18.2 8.3 19.3 8 20.6 8C24.1 8 26.6 10.4 26.6 13.7C26.6 15.7 25.6 17.2 23.6 17.8V21.2" {...commonStroke} />
          <circle cx="13.2" cy="13.5" r="1" fill={accent} />
          <circle cx="20.8" cy="13.5" r="1" fill={accent} />
        </svg>
      );
    case 'ci':
      return <span className="text-[10px] font-black tracking-[0.12em]" style={{ color: accent }}>CI/CD</span>;
    case 'db':
      return (
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <ellipse cx="16" cy="9.5" rx="7.5" ry="3.5" {...commonStroke} />
          <path d="M8.5 9.5V21.5C8.5 23.4 11.8 25 16 25C20.2 25 23.5 23.4 23.5 21.5V9.5" {...commonStroke} />
          <path d="M8.5 15.5C8.5 17.4 11.8 19 16 19C20.2 19 23.5 17.4 23.5 15.5" {...commonStroke} />
        </svg>
      );
    default:
      return <span className="text-xs font-black tracking-[0.14em]" style={{ color: accent }}>{type}</span>;
  }
};

const SkillCard = ({ name, category, index = 0 }) => {
  const palette = skillPalette[name] ?? {
    glow: 'rgba(148, 163, 184, 0.14)',
    border: 'rgba(148, 163, 184, 0.24)',
    accent: 'rgba(226, 232, 240, 0.28)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-stable group relative overflow-hidden rounded-[1.35rem] border bg-slate-900/28 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        borderColor: palette.border,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,255,255,0.02), 0 18px 38px -28px ${palette.glow}`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle at 14% 16%, ${palette.glow}, transparent 28%), radial-gradient(circle at 82% 18%, ${palette.accent}, transparent 22%), linear-gradient(145deg, rgba(255,255,255,0.05) 0%, transparent 32%, rgba(255,255,255,0.02) 100%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 skill-sheen"
        style={{
          background: `linear-gradient(115deg, transparent 18%, ${palette.accent} 42%, transparent 68%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -top-10 left-8 h-24 w-32 rounded-full blur-2xl opacity-45"
        style={{ background: palette.glow }}
      />
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/20" />

      <div className="relative z-10 mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-1">{name}</h3>
          <p className="text-sm text-slate-400">{category}</p>
        </div>
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border backdrop-blur-md"
          style={{
            borderColor: palette.border,
            background: `linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03)), radial-gradient(circle at 30% 20%, ${palette.accent}, transparent 55%), rgba(15,23,42,0.32)`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 24px -18px ${palette.glow}`,
          }}
        >
          <SkillLogo type={skillIconMap[name] ?? name.slice(0, 2).toUpperCase()} accent={palette.accent} />
        </div>
      </div>
      <p className="relative z-10 text-slate-300 text-sm leading-relaxed">
        Implementacion solida, criterio visual consistente y una base tecnica lista para produccion.
      </p>
      <div className="absolute inset-0 rounded-xl bg-slate-400/0 group-hover:bg-slate-400/5 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default SkillCard;
