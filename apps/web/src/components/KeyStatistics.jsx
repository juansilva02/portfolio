import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Briefcase, FileCode, Users } from 'lucide-react';

const StatCounter = ({ value, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const KeyStatistics = () => {
  const stats = [
    { icon: Calendar, value: 4, label: 'Anos creando soluciones digitales' },
    { icon: Briefcase, value: 20, label: 'Proyectos web y de automatizacion' },
    { icon: FileCode, value: 12, label: 'Interfaces y sistemas publicados' },
    { icon: Users, value: 15, label: 'Clientes y equipos acompanados' },
  ];

  return (
    <section className="py-16 border-y border-slate-700/50 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-500/50 transition-colors relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-slate-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <stat.icon className="w-8 h-8 text-slate-400 mb-4 group-hover:text-slate-300 transition-colors animate-pulse-glow" />
              <h3 className="text-4xl font-bold text-slate-100 mb-2 font-variant-numeric tabular-nums">
                <StatCounter value={stat.value} />
              </h3>
              <p className="text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyStatistics;
