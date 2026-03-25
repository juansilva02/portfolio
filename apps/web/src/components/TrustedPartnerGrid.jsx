import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const TrustedPartnerGrid = () => {
  const partners = [
    'Meridian Labs', 'Quantum Dynamics', 'Nexus Protocol', 
    'Kaspa.com', 'OpenAI', 'Polygon', 'Ethereum Foundation'
  ];

  return (
    <section className="py-20 border-y border-slate-800 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-8"
        >
          Trusted by innovative teams worldwide
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-12">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="text-xl md:text-2xl font-bold text-slate-600 hover:text-slate-300 transition-colors cursor-default"
            >
              {partner}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <button className="inline-flex items-center gap-2 text-slate-300 hover:text-slate-100 font-medium transition-colors group">
            View Case Studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedPartnerGrid;