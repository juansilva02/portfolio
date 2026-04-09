import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const ExperienceCard = ({ company, role, duration, location, achievements, index = 0 }) => {
  const featured = index === 0;

  const palette = featured
    ? {
        line: 'from-sky-300/75 via-sky-300/40 to-transparent',
        dot: 'bg-sky-200',
        ring: 'ring-sky-300/15',
        border: 'rgba(125, 211, 252, 0.34)',
        glow: 'rgba(125, 211, 252, 0.28)',
        accent: 'rgba(191, 219, 254, 0.2)',
        badge: 'rgba(191,219,254,0.16)',
        bullet: 'text-sky-200',
      }
    : {
        line: 'from-slate-300/40 via-slate-400/20 to-transparent',
        dot: 'bg-slate-300',
        ring: 'ring-slate-200/8',
        border: 'rgba(203, 213, 225, 0.22)',
        glow: 'rgba(148, 163, 184, 0.16)',
        accent: 'rgba(226, 232, 240, 0.1)',
        badge: 'rgba(226,232,240,0.08)',
        bullet: 'text-slate-500',
      };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b ${palette.line}`} />
      <div className={`absolute left-0 top-6 w-3 h-3 ${palette.dot} rounded-full ring-4 ${palette.ring} -translate-x-[5px]`} />

      <div
        className="group relative ml-8 overflow-hidden rounded-[1.65rem] border bg-slate-900/28 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        style={{
          borderColor: palette.border,
          boxShadow: featured
            ? `inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.02), 0 24px 44px -30px ${palette.glow}`
            : `inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,255,255,0.02), 0 18px 34px -30px ${palette.glow}`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(circle at 16% 16%, ${palette.accent}, transparent 24%), linear-gradient(145deg, rgba(255,255,255,0.06) 0%, transparent 38%, rgba(255,255,255,0.02) 100%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 skill-sheen"
          style={{
            background: `linear-gradient(115deg, transparent 18%, ${palette.accent} 42%, transparent 68%)`,
            opacity: featured ? 0.9 : 0.5,
          }}
        />
        <div
          className={`pointer-events-none absolute -bottom-10 -right-8 h-28 w-28 rounded-full blur-3xl ${featured ? 'orbit-glow' : ''}`}
          style={{ background: palette.glow, opacity: featured ? 0.7 : 0.38 }}
        />
        <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/18" />

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4 relative z-10">
          <div>
            <div
              className="mb-3 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300"
              style={{
                borderColor: palette.border,
                background: palette.badge,
              }}
            >
              {featured ? 'Experiencia principal' : 'Trayectoria'}
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-1">{role}</h3>
            <p className="text-lg text-slate-300 font-medium">{company}</p>
          </div>
          <div className="flex flex-col gap-1 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            {location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>

        <ul className="relative z-10 space-y-2">
          {achievements.map((achievement, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-300">
              <span className={`mt-1.5 ${palette.bullet}`}>•</span>
              <span className="leading-relaxed">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
