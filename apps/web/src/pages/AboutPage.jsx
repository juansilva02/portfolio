import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Code2, Rocket, Users, Award } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const AboutPage = () => {
  const highlights = [
    {
      icon: Code2,
      title: 'Technical Excellence',
      description: 'Deep expertise in blockchain architecture, smart contract development, and AI/ML systems with a focus on scalable, production-ready solutions.',
    },
    {
      icon: Rocket,
      title: 'Innovation Driven',
      description: 'Passionate about exploring emerging technologies and implementing cutting-edge solutions that solve real-world problems in decentralized ecosystems.',
    },
    {
      icon: Users,
      title: 'Collaborative Approach',
      description: 'Strong believer in open-source development and knowledge sharing. Active contributor to blockchain and AI communities.',
    },
    {
      icon: Award,
      title: 'Proven Track Record',
      description: 'Successfully delivered multiple high-impact projects in DeFi, NFT platforms, and AI-powered applications for startups and enterprises.',
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
        <title>About - Aaron Dukes</title>
        <meta name="description" content="Learn about Aaron Dukes, a Full Stack Developer specializing in blockchain and AI technologies with expertise in Layer 1 systems and decentralized applications." />
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
                About <span className="text-slate-400">Me</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Building the future of decentralized systems, one line of code at a time
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-slate-100 mb-4">My Journey</h2>
                <p className="text-slate-300 leading-relaxed">
                  My journey into technology began with a fascination for how systems work at their core. 
                  This curiosity led me to explore blockchain technology and artificial intelligence, 
                  where I discovered the potential to revolutionize how we build and interact with digital systems.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Over the years, I've specialized in developing Layer 1 blockchain protocols, implementing 
                  complex smart contract systems, and orchestrating multi-LLM AI architectures. My work spans 
                  from building high-performance DeFi protocols to creating AI-powered tools that enhance 
                  developer productivity.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  I'm particularly passionate about the intersection of blockchain and AI, where I see 
                  tremendous potential for creating more intelligent, autonomous, and trustless systems 
                  that can transform industries.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-slate-100 mb-4">Beyond Code</h2>
                <p className="text-slate-300 leading-relaxed">
                  When I'm not architecting blockchain systems or training AI models, you'll find me 
                  contributing to open-source projects, writing technical articles, or mentoring aspiring 
                  developers in the Web3 space.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  I'm an active participant in blockchain hackathons and AI research communities, 
                  constantly learning and sharing knowledge with fellow developers. I believe in the 
                  power of community-driven innovation and the importance of making advanced technologies 
                  accessible to everyone.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Outside of technology, I enjoy exploring new places, reading about emerging tech trends, 
                  and experimenting with new programming languages and frameworks. I'm always looking for 
                  the next challenge that pushes my skills to new heights.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">What Drives Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600/50">
                        <highlight.icon className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2">{highlight.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{highlight.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default AboutPage;