import React, { Suspense, lazy } from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress.jsx';
import SpotlightEffect from './components/SpotlightEffect.jsx';
import SiteBackground from './components/SiteBackground.jsx';
import FloatingContactButton from './components/FloatingContactButton.jsx';
import HomePage from './pages/HomePage.jsx';

// Code-splitting: cada página se carga on demand (la home queda eager para el LCP)
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const SkillsPage = lazy(() => import('./pages/SkillsPage.jsx'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage.jsx'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'));
const EducationPage = lazy(() => import('./pages/EducationPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage.jsx'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage.jsx'));
const CotizarPage = lazy(() => import('./pages/CotizarPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/cotizar" element={<CotizarPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/certifications" element={<Navigate to="/projects" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <SiteBackground />
      <ScrollProgress />
      <SpotlightEffect />
      <ScrollToTop />
      <AnimatedRoutes />
      <FloatingContactButton />
      <Toaster />
    </Router>
  );
}

export default App;
