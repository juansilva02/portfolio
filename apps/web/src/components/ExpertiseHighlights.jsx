import React from 'react';
import { motion } from 'framer-motion';
import { Blocks, BrainCircuit, Code, FileCode2, Server, Users } from 'lucide-react';

const ExpertiseHighlights = () => {
  const expertise = [
    {
      icon: Blocks,
      title: 'Blockchain Architecture',
      description: 'Designing scalable Layer 1 protocols and cross-chain bridges with high throughput and security.',
    },
    {
      icon: BrainCircuit,
      title: 'AI & LLM Integration',
      description: 'Orchestrating multi-LLM systems and developing AI-powered tools for automated workflows.',
    },
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'Building responsive, high-performance web applications using modern React and Node.js ecosystems.',
    },
    {
      icon: FileCode2,
      title: 'Smart Contracts',
      description: 'Developing and auditing secure Solidity and Rust smart contracts for DeFi and NFT platforms.',
    },
    {
      icon: Server,
      title: 'DevOps & Infrastructure',
      description: 'Implementing robust CI/CD pipelines and managing scalable Kubernetes clusters.',
    },
    {
      icon: Users,
      title: 'Technical Leadership',
      description: 'Mentoring engineering teams and driving technical strategy from conception to deployment.',
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Core <span className="text-slate-400">Expertise</span></h2>
          <p className="text-slate-300 max-w-2xl mx-auto">Specialized skills bridging the gap between decentralized systems and artificial intelligence.</p>
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
              className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-slate-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10"
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