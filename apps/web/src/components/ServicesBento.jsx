import { ArrowUpRight, Database, LayoutTemplate, Server } from 'lucide-react';
import MagicBento from '@/components/MagicBento';
import { projects } from '@/data/projects';
import './ServicesBento.css';

const serviceVisuals = {
  '/contact?service=landing-48h': {
    icon: LayoutTemplate,
    visual: (
      <div className="services-bento__browser">
        <div className="services-bento__browser-bar"><i /><i /><i /></div>
        <div className="services-bento__browser-page">
          <span className="services-bento__browser-eyebrow">TU NEGOCIO, ONLINE</span>
          <span className="services-bento__browser-heading">Una página.<br />Tu próxima consulta.</span>
          <span className="services-bento__browser-line" />
          <span className="services-bento__browser-line services-bento__browser-line--short" />
          <span className="services-bento__browser-button">Contactar <ArrowUpRight size={14} /></span>
        </div>
      </div>
    ),
    rowSpan: 2,
  },
  '/contact?service=software-empresa': { icon: Database, visual: 'automation' },
  '/contact?service=infra-local': { icon: Server, visual: 'security' },
};

const services = projects.filter(project => !project.image).map(project => {
  const { icon: Icon, visual, rowSpan = 1 } = serviceVisuals[project.demoUrl];
  return {
    id: project.demoUrl,
    title: project.title,
    label: `${project.category} · ${project.year}`,
    icon: <Icon size={18} aria-hidden="true" />,
    visual,
    colSpan: 2,
    rowSpan,
    href: project.demoUrl,
    description: (
      <>
        <span>{project.description}</span>
        <span className="services-bento__tags">
          {project.tech.map(tech => <span key={tech}>{tech}</span>)}
        </span>
        <span className="services-bento__cta">{project.demoLabel}<ArrowUpRight size={17} aria-hidden="true" /></span>
      </>
    ),
  };
});

export default function ServicesBento() {
  return (
    <section aria-labelledby="services-heading" className="mb-16">
      <h2 id="services-heading" className="text-2xl md:text-3xl font-bold text-slate-100 mb-6">Servicios para tu negocio</h2>
      <MagicBento
        items={services}
        columns={4}
        rowHeight={310}
        gap={16}
        radius={24}
        glowColor="#94a3b8"
        textAutoHide={false}
        intro={false}
        className="services-bento"
        style={{
          '--mb-surface': 'linear-gradient(160deg, #182331 0%, #10151e 100%)',
          '--mb-tile': 'linear-gradient(180deg, #334155 0%, #1e293b 100%)',
        }}
      />
    </section>
  );
}
