import React from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import ExperiencePage from './pages/ExperiencePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import EducationPage from './pages/EducationPage.jsx';
import CertificationsPage from './pages/CertificationsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={
          <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-slate-100 mb-4">404</h1>
              <p className="text-xl text-slate-300 mb-8">Page not found</p>
              <a href="/" className="bg-slate-300 text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 transition-all duration-200 active:scale-95">
                Back to Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
      <Toaster />
    </Router>
  );
}

export default App;