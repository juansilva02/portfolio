import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SkillCard from '@/components/SkillCard.jsx';

const SkillsPage = () => {
  const skillCategories = [
    {
      category: 'Languages',
      skills: [
        { name: 'Go', proficiency: 92 },
        { name: 'Rust', proficiency: 88 },
        { name: 'Python', proficiency: 95 },
        { name: 'Solidity', proficiency: 90 },
        { name: 'TypeScript', proficiency: 87 },
        { name: 'JavaScript', proficiency: 93 },
      ],
    },
    {
      category: 'Blockchain & Web3',
      skills: [
        { name: 'Ethereum', proficiency: 94 },
        { name: 'Smart Contracts', proficiency: 91 },
        { name: 'DeFi Protocols', proficiency: 89 },
        { name: 'Layer 1 Development', proficiency: 86 },
        { name: 'Web3.js / Ethers.js', proficiency: 92 },
        { name: 'IPFS', proficiency: 83 },
      ],
    },
    {
      category: 'AI & Machine Learning',
      skills: [
        { name: 'LLM Orchestration', proficiency: 88 },
        { name: 'TensorFlow', proficiency: 85 },
        { name: 'PyTorch', proficiency: 87 },
        { name: 'Natural Language Processing', proficiency: 84 },
        { name: 'Computer Vision', proficiency: 81 },
      ],
    },
    {
      category: 'Frameworks & Tools',
      skills: [
        { name: 'React', proficiency: 91 },
        { name: 'Node.js', proficiency: 93 },
        { name: 'Docker', proficiency: 89 },
        { name: 'Kubernetes', proficiency: 85 },
        { name: 'GraphQL', proficiency: 87 },
        { name: 'Redis', proficiency: 84 },
      ],
    },
    {
      category: 'Databases',
      skills: [
        { name: 'PostgreSQL', proficiency: 90 },
        { name: 'MongoDB', proficiency: 88 },
        { name: 'Redis', proficiency: 86 },
        { name: 'Cassandra', proficiency: 82 },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Skills - Aaron Dukes</title>
        <meta name="description" content="Technical skills and expertise of Aaron Dukes including blockchain development, AI/ML, and full-stack technologies." />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-balance" style={{ letterSpacing: '-0.02em' }}>
                Technical <span className="text-slate-400">Skills</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                A comprehensive overview of my technical expertise across blockchain, AI, and full-stack development
              </p>
            </motion.div>

            <div className="space-y-16">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-3xl font-bold text-slate-100 mb-8">
                    {category.category}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillCard
                        key={skill.name}
                        name={skill.name}
                        category={category.category}
                        proficiency={skill.proficiency}
                        index={skillIndex}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50"
            >
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Continuous Learning</h3>
              <p className="text-slate-300 leading-relaxed max-w-prose">
                Technology evolves rapidly, and I'm committed to staying at the forefront. I regularly 
                explore new frameworks, contribute to open-source projects, and participate in hackathons 
                to sharpen my skills and learn from the community. Currently diving deeper into zero-knowledge 
                proofs, advanced consensus mechanisms, and transformer architectures for AI applications.
              </p>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default SkillsPage;