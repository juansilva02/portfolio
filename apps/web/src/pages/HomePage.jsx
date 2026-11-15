import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import NewsletterCTA from '@/components/NewsletterCTA.jsx';
import CommercialSaas from '@/components/CommercialSaas.jsx';
const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Gestión comercial para empresas | zuzudev</title>
        <meta
          name="description"
          content="Desarrollador web freelance en Argentina. Landing pages en 48 hs, React, automatizacion n8n, software para empresas y SaaS desde Buenos Aires."
        />
        <link rel="canonical" href="https://zuzudev.pro/" />
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <main>
          <CommercialSaas />
          <NewsletterCTA />
        </main>
        <Footer />
      </div>
    </motion.div>
  );
};
export default HomePage;
