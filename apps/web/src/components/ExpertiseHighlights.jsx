import React from 'react';
import { motion } from 'framer-motion';
import { Blocks, BrainCircuit, Code, FileCode2, Server, Users } from 'lucide-react';

const ExpertiseHighlights = () => {
  const expertise = [
    {
      icon: Blocks,
      title: 'Arquitectura Frontend',
      description: 'Diseno interfaces escalables con componentes reutilizables, estructura clara y foco en experiencia de usuario.',
    },
    {
      icon: BrainCircuit,
      title: 'Automatizacion e IA',
      description: 'Integro herramientas y flujos automatizados para reducir tareas repetitivas y mejorar procesos reales.',
    },
    {
      icon: Code,
      title: 'Desarrollo Full Stack',
      description: 'Construyo aplicaciones web responsive con React, Node.js y una base pensada para evolucionar sin friccion.',
    },
    {
      icon: FileCode2,
      title: 'Interfaces orientadas a negocio',
      description: 'Transformo necesidades comerciales en pantallas claras, flujos utiles y experiencias digitales faciles de usar.',
    },
    {
      icon: Server,
      title: 'Deploy e infraestructura',
      description: 'Configuro despliegues modernos, optimizacion tecnica y buenas practicas para publicar con confianza.',
    },
    {
      icon: Users,
      title: 'Colaboracion tecnica',
      description: 'Trabajo codo a codo con clientes y equipos para convertir ideas en productos digitales bien resueltos.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="liquid-glass-light rounded-[1.85rem] text-center mb-16 max-w-3xl mx-auto px-8 py-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Lo que <span className="text-slate-400">hago</span></h2>
          <p className="text-slate-300 max-w-2xl mx-auto">Capacidades con las que ayudo a construir productos web mas claros, utiles y alineados a la marca.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
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
