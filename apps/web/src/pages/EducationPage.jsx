import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import EducationCard from '@/components/EducationCard.jsx';

const EducationPage = () => {
  const education = [
    {
      institution: 'Massachusetts Institute of Technology',
      degree: 'Master of Science in Computer Science',
      field: 'Specialization in Distributed Systems and Cryptography',
      graduationDate: 'May 2018',
      gpa: '3.9',
    },
    {
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      field: 'Minor in Mathematics',
      graduationDate: 'May 2016',
      gpa: '3.8',
    },
  ];

  const achievements = [
    'Published research paper on consensus mechanisms in distributed ledger systems',
    'Dean\'s List for 6 consecutive semesters',
    'Winner of MIT Blockchain Hackathon 2017',
    'Teaching Assistant for Advanced Algorithms course',
    'Member of ACM and IEEE Computer Society',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Education - Aaron Dukes</title>
        <meta name="description" content="Educational background and academic achievements of Aaron Dukes in Computer Science with specialization in distributed systems and cryptography." />
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
                <span className="text-slate-400">Education</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Academic foundation in computer science and distributed systems
              </p>
            </motion.div>

            <div className="space-y-6 mb-16">
              {education.map((edu, index) => (
                <EducationCard
                  key={edu.institution}
                  institution={edu.institution}
                  degree={edu.degree}
                  field={edu.field}
                  graduationDate={edu.graduationDate}
                  gpa={edu.gpa}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50"
            >
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Academic Achievements</h2>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <span className="text-slate-500 mt-1.5">•</span>
                    <span className="leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50"
            >
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Relevant Coursework</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Distributed Systems',
                  'Cryptography and Network Security',
                  'Advanced Algorithms',
                  'Machine Learning',
                  'Database Systems',
                  'Computer Networks',
                  'Operating Systems',
                  'Artificial Intelligence',
                ].map((course, index) => (
                  <motion.div
                    key={course}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <div className="w-2 h-2 bg-slate-400 rounded-full" />
                    <span>{course}</span>
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

export default EducationPage;