import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TechStack = () => {
  const categories = [
    {
      title: 'Languages',
      techs: [
        { name: 'Go', desc: 'High-performance backend services' },
        { name: 'Rust', desc: 'Memory-safe systems & smart contracts' },
        { name: 'Python', desc: 'AI/ML & data processing' },
        { name: 'Solidity', desc: 'EVM smart contract development' },
      ]
    },
    {
      title: 'Frameworks',
      techs: [
        { name: 'React', desc: 'Frontend UI development' },
        { name: 'Next.js', desc: 'Full-stack React applications' },
        { name: 'Node.js', desc: 'Scalable network applications' },
      ]
    },
    {
      title: 'Blockchain',
      techs: [
        { name: 'Ethereum', desc: 'Layer 1 protocol development' },
        { name: 'Polygon', desc: 'Layer 2 scaling solutions' },
        { name: 'Solana', desc: 'High-throughput dApps' },
      ]
    },
    {
      title: 'AI & ML',
      techs: [
        { name: 'OpenAI', desc: 'LLM integration & fine-tuning' },
        { name: 'Claude', desc: 'Advanced reasoning models' },
        { name: 'TensorFlow', desc: 'Custom model training' },
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Technology <span className="text-slate-400">Stack</span></h2>
          <p className="text-slate-300 max-w-2xl mx-auto">Modern tools and frameworks I use to build scalable solutions.</p>
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
                className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50"
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
                          className="px-3 py-1.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-sm text-slate-300 hover:text-slate-100 hover:border-slate-400 hover:bg-slate-700/50 transition-colors cursor-default"
                        >
                          {tech.name}
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