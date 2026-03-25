import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ExperienceCard from '@/components/ExperienceCard.jsx';

const ExperiencePage = () => {
  const experiences = [
    {
      company: 'Quantum Dynamics',
      role: 'Lead Blockchain Architect',
      duration: 'Jan 2024 - Present',
      location: 'Remote, US',
      achievements: [
        'Architected and deployed a Layer 1 blockchain protocol handling 50,000+ transactions per second with sub-second finality',
        'Led a team of 8 engineers in developing a cross-chain bridge protocol that facilitated $2.3B in total value locked',
        'Implemented advanced consensus mechanisms using Rust, improving network security and reducing energy consumption by 47%',
        'Designed and deployed smart contract infrastructure for a DeFi lending protocol with $180M TVL',
      ],
    },
    {
      company: 'Meridian Labs',
      role: 'Senior Full Stack Developer',
      duration: 'Mar 2022 - Dec 2023',
      location: 'San Francisco, CA',
      achievements: [
        'Built and scaled an AI-powered trading bot using Python and TensorFlow that achieved 23% higher returns than market average',
        'Developed a multi-LLM orchestration system for automated code review and documentation generation',
        'Created a real-time analytics dashboard using React and GraphQL serving 100,000+ daily active users',
        'Optimized database queries and implemented caching strategies, reducing API response times by 68%',
      ],
    },
    {
      company: 'Nexus Protocol',
      role: 'Blockchain Developer',
      duration: 'Jun 2020 - Feb 2022',
      location: 'Austin, TX',
      achievements: [
        'Developed and audited 15+ smart contracts for NFT marketplaces and DeFi applications on Ethereum',
        'Implemented automated testing frameworks that caught 94% of potential vulnerabilities before deployment',
        'Built a decentralized identity verification system using zero-knowledge proofs',
        'Contributed to open-source Web3 libraries with over 12,000 GitHub stars',
      ],
    },
    {
      company: 'TechVentures Inc',
      role: 'Full Stack Developer',
      duration: 'Aug 2018 - May 2020',
      location: 'Boston, MA',
      achievements: [
        'Developed microservices architecture using Node.js and Docker, improving system reliability to 99.9% uptime',
        'Built RESTful APIs serving 500,000+ requests per day with sub-100ms response times',
        'Implemented CI/CD pipelines using Jenkins and Kubernetes, reducing deployment time by 75%',
        'Mentored 5 junior developers in best practices for scalable application development',
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
        <title>Experience - Aaron Dukes</title>
        <meta name="description" content="Professional experience and career journey of Aaron Dukes in blockchain development, AI/ML, and full-stack engineering." />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-balance" style={{ letterSpacing: '-0.02em' }}>
                Professional <span className="text-slate-400">Experience</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                A timeline of my career building innovative solutions in blockchain and AI
              </p>
            </motion.div>

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={`${experience.company}-${experience.role}`}
                  company={experience.company}
                  role={experience.role}
                  duration={experience.duration}
                  location={experience.location}
                  achievements={experience.achievements}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50"
            >
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Career Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-slate-400 mb-2">8+</div>
                  <div className="text-slate-300">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-slate-400 mb-2">$2.5B+</div>
                  <div className="text-slate-300">Total Value Locked</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-slate-400 mb-2">50+</div>
                  <div className="text-slate-300">Projects Delivered</div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default ExperiencePage;