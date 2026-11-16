import React, { lazy, Suspense, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { fadeLeft, fadeRight, staggerContainer, revealOnView } from '@/lib/motion';
import { featuredProjects } from '@/data/projects.js';
import './FeaturedWork.css';

const CircularCarousel = lazy(() => import('./CircularCarousel'));
const projects = featuredProjects.filter(project => project.image);
const items = projects.map(project => ({
  src: project.image,
  alt: `Captura del sitio ${project.title}`,
  title: project.title,
  subtitle: project.category,
}));

const FeaturedWork = () => {
  const section = useRef(null);
  const carousel = useRef(null);
  const nearViewport = useInView(section, { once: true, margin: '300px' });
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const project = projects[active] || projects[0];
  const navigate = direction => {
    setPaused(true);
    carousel.current?.[direction]();
  };
  const fallback = <img className="project-carousel-fallback" src={items[0].src} alt={items[0].alt} loading="lazy" />;

  return (
    <section ref={section} className="featured-work py-20 bg-slate-900/20" aria-label="Proyectos destacados">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={staggerContainer()} {...revealOnView} className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
          <motion.div variants={fadeRight}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Proyectos reales desde <span className="text-slate-400">GitHub</span>
            </h2>
            <p className="text-slate-300 max-w-2xl">
              Una seleccion de trabajos publicados y repositorios reales que muestran sitios institucionales, ecommerce y marcas personales construidos por zuzudev.
            </p>
          </motion.div>
          <motion.div variants={fadeLeft}>
            <Link to="/projects" className="group flex min-h-11 items-center gap-2 text-slate-300 hover:text-slate-100 transition-colors">
              Ver todos los proyectos<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="project-carousel-stage"
          onPointerDownCapture={() => setPaused(true)}
          onFocusCapture={event => {
            if (event.target.getAttribute('aria-roledescription') === 'carousel') setPaused(true);
          }}
          onKeyDownCapture={event => {
            if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) setPaused(true);
          }}
        >
          {nearViewport ? <Suspense fallback={fallback}>
            <CircularCarousel ref={carousel} items={items} preset="cylinder" intro="rise"
              cardWidth={340} aspectRatio={1.4} speed={20} captions gap={35} tilt={-6}
              perspective={1140} direction="right" momentum={0.88} parallax={0.32}
              stretch={0.51} fadeColor="#0a1120" depthFade={0.33} innerShade={0.35}
              cornerRadius={13} pauseOnHover autoplay={paused ? 'off' : 'drift'}
              onChange={setActive} onItemClick={() => setPaused(true)} ariaLabel="Proyectos del portfolio"
            />
          </Suspense> : fallback}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-7" aria-label="Controles del carrusel">
          <Button type="button" variant="outline" className="min-h-11 min-w-11 border-slate-600" aria-label="Proyecto anterior" disabled={!nearViewport} onClick={() => navigate('previous')}><ArrowLeft aria-hidden="true" /></Button>
          {!reducedMotion && <Button type="button" variant="outline" className="min-h-11 border-slate-600" disabled={!nearViewport} onClick={() => setPaused(value => !value)}>
            {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}{paused ? 'Reproducir' : 'Pausar'}
          </Button>}
          <Button type="button" variant="outline" className="min-h-11 min-w-11 border-slate-600" aria-label="Proyecto siguiente" disabled={!nearViewport} onClick={() => navigate('next')}><ArrowRight aria-hidden="true" /></Button>
        </div>
        <div className="project-carousel-details mx-auto max-w-2xl text-center">
          <p className="text-slate-300 leading-relaxed">{project.description}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {project.tech.map(tech => <span key={tech} className="text-xs text-slate-300 bg-slate-700/50 px-2 py-1 rounded border border-slate-600/50">{tech}</span>)}
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            {project.demoUrl && <Button asChild className="liquid-glass-button-blue min-h-12 rounded-xl text-slate-50">
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.demoLabel}: ${project.title}`}><ExternalLink aria-hidden="true" />{project.demoLabel}</a>
            </Button>}
            {project.repoUrl && <Button asChild variant="outline" className="min-h-12 rounded-xl border-slate-600">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Repositorio: ${project.title}`}><Github aria-hidden="true" />{project.repoLabel || 'Repositorio'}</a>
            </Button>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
