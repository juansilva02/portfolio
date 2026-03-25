import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CertificationCard from '@/components/CertificationCard.jsx';

const CertificationsPage = () => {
  const certifications = [
    {
      name: 'Certified Blockchain Developer',
      issuer: 'Blockchain Council',
      issueDate: 'Mar 2023',
      credentialId: 'BC-DEV-2023-4782',
    },
    {
      name: 'AWS Certified Solutions Architect - Professional',
      issuer: 'Amazon Web Services',
      issueDate: 'Jan 2023',
      credentialId: 'AWS-SAP-2023-1247',
    },
    {
      name: 'Certified Ethereum Developer',
      issuer: 'Ethereum Foundation',
      issueDate: 'Nov 2022',
      credentialId: 'ETH-DEV-2022-8934',
    },
    {
      name: 'TensorFlow Developer Certificate',
      issuer: 'Google',
      issueDate: 'Aug 2022',
      credentialId: 'TF-DEV-2022-5621',
    },
    {
      name: 'Certified Kubernetes Administrator',
      issuer: 'Cloud Native Computing Foundation',
      issueDate: 'Jun 2022',
      credentialId: 'CKA-2022-3456',
    },
    {
      name: 'Solidity Smart Contract Security',
      issuer: 'ConsenSys Academy',
      issueDate: 'Apr 2022',
      credentialId: 'CS-SEC-2022-7891',
    },
    {
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      issueDate: 'Feb 2022',
      credentialId: 'PSM-I-2022-2345',
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      issueDate: 'Dec 2021',
      credentialId: 'MDB-DEV-2021-6789',
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
        <title>Certifications - Aaron Dukes</title>
        <meta name="description" content="Professional certifications and credentials of Aaron Dukes in blockchain development, cloud architecture, AI/ML, and software engineering." />
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
                Professional <span className="text-slate-400">Certifications</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Industry-recognized credentials validating expertise across blockchain, cloud, and AI technologies
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <CertificationCard
                  key={cert.credentialId}
                  name={cert.name}
                  issuer={cert.issuer}
                  issueDate={cert.issueDate}
                  credentialId={cert.credentialId}
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
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Commitment to Excellence</h3>
              <p className="text-slate-300 leading-relaxed max-w-prose mb-6">
                I believe in continuous professional development and staying current with industry standards. 
                These certifications represent my commitment to mastering the technologies I work with and 
                delivering solutions that meet the highest quality standards.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-slate-400 mb-2">8</div>
                  <div className="text-slate-300 text-sm">Active Certifications</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-400 mb-2">5</div>
                  <div className="text-slate-300 text-sm">Technology Domains</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-400 mb-2">2026</div>
                  <div className="text-slate-300 text-sm">Latest Renewal</div>
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

export default CertificationsPage;