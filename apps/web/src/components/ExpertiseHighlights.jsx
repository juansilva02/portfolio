import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Database, LayoutTemplate, Server, Settings2, Workflow } from 'lucide-react';
import { fadeUp, staggerContainer, revealOnView, hoverLift } from '@/lib/motion';

const ExpertiseHighlights = () => {
  const expertise = [
    {
      icon: LayoutTemplate,
      title: 'Landing pages que venden',
      description: 'Paginas claras, rapidas y adaptadas a tu negocio para captar consultas desde el primer trafico.',
    },
    {
      icon: Building2,
      title: 'Software para empresas',
      description: 'Pantallas, paneles y flujos para ordenar procesos internos, seguimiento y operacion diaria.',
    },
    {
      icon: Workflow,
      title: 'Automatizacion de tareas',
      description: 'Integraciones y automatizaciones para reducir trabajo manual y mejorar tiempos de respuesta.',
    },
    {
      icon: Database,
      title: 'SaaS y productos web',
      description: 'MVPs, dashboards y bases tecnicas listas para evolucionar como producto digital.',
    },
    {
      icon: Server,
      title: 'Infraestructura local',
      description: 'Armado de red y servidores locales para almacenamiento y acceso controlado a bases de datos.',
    },
    {
      icon: Settings2,
      title: 'Ejecucion con criterio',
      description: 'Trabajo directo, foco comercial y decisiones tecnicas alineadas a resultados concretos.',
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          {...revealOnView}
          className="liquid-glass-light rounded-[1.85rem] text-center mb-16 max-w-3xl mx-auto px-8 py-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            Servicios para <span className="text-slate-400">vender y operar mejor</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Desarrollo soluciones web pensadas para captar clientes, ordenar procesos y sostener crecimiento tecnico real.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          {...revealOnView}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {expertise.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={hoverLift}
              className="group liquid-glass-light rounded-[1.4rem] p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-slate-300 group-hover:text-slate-100 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseHighlights;
