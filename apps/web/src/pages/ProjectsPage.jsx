import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProjectCard from '@/components/ProjectCard.jsx';

const ProjectsPage = () => {
  const projects = [
    {
      title: 'DeFi Liquidity Protocol',
      description: 'A decentralized liquidity aggregation protocol that optimizes trading routes across multiple DEXs. Features automated market making, yield farming strategies, and cross-chain swaps. Achieved $180M in total value locked within 6 months of launch.',
      techStack: ['Solidity', 'Rust', 'React', 'Web3.js', 'The Graph', 'IPFS'],
      demoUrl: 'https://demo.example.com',
      repoUrl: 'https://github.com',
      featured: true,
    },
    {
      title: 'Multi-Chain Bridge',
      description: 'Secure cross-chain bridge enabling asset transfers between Ethereum, Polygon, and Binance Smart Chain. Implements advanced cryptographic proofs and multi-signature validation for enhanced security.',
      techStack: ['Go', 'Solidity', 'Node.js', 'PostgreSQL'],
      demoUrl: 'https://demo.example.com',
      repoUrl: 'https://github.com',
    },
    {
      title: 'AI Trading Bot',
      description: 'Machine learning-powered trading bot that analyzes market sentiment, technical indicators, and on-chain data to execute profitable trades. Achieved 23% higher returns than market average.',
      techStack: ['Python', 'TensorFlow', 'Redis', 'FastAPI'],
      repoUrl: 'https://github.com',
    },
    {
      title: 'NFT Marketplace',
      description: 'Full-featured NFT marketplace with lazy minting, royalty distribution, and advanced search capabilities. Supports ERC-721 and ERC-1155 standards with gas-optimized contracts.',
      techStack: ['Solidity', 'React', 'Ethers.js', 'MongoDB', 'IPFS'],
      demoUrl: 'https://demo.example.com',
      repoUrl: 'https://github.com',
    },
    {
      title: 'Decentralized Identity System',
      description: 'Privacy-preserving identity verification system using zero-knowledge proofs. Enables users to prove credentials without revealing sensitive information.',
      techStack: ['Rust', 'Circom', 'React', 'PostgreSQL'],
      repoUrl: 'https://github.com',
    },
    {
      title: 'LLM Orchestration Platform',
      description: 'Multi-model AI orchestration system that routes queries to optimal language models based on task requirements. Includes automated prompt optimization and response caching.',
      techStack: ['Python', 'FastAPI', 'Redis', 'Docker', 'Kubernetes'],
      demoUrl: 'https://demo.example.com',
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
        <title>Projects - Aaron Dukes</title>
        <meta name="description" content="Featured projects and portfolio of Aaron Dukes showcasing blockchain applications, DeFi protocols, AI systems, and full-stack development work." />
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
                Featured <span className="text-slate-400">Projects</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                A showcase of innovative blockchain and AI solutions I've built
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  demoUrl={project.demoUrl}
                  repoUrl={project.repoUrl}
                  featured={project.featured}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 text-center"
            >
              <p className="text-slate-300 mb-6">
                Interested in collaborating on a project?
              </p>
              <a
                href="/contact"
                className="inline-block bg-slate-300 text-slate-900 px-8 py-3 rounded-lg font-medium hover:bg-slate-200 transition-all duration-200 active:scale-95"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default ProjectsPage;