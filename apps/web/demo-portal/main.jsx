import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import DemoPage from '../src/pages/DemoPage';
import '../src/index.css';

function Portal() {
  const { pathname, search, hash } = useLocation();
  const showForm = pathname === '/' || pathname === '/demo';
  useEffect(() => {
    if (!showForm) window.location.replace('https://zuzudev.pro' + pathname + search + hash);
  }, [showForm, pathname, search, hash]);
  return showForm ? <DemoPage /> : null;
}

createRoot(document.getElementById('root')).render(<BrowserRouter><Portal /></BrowserRouter>);
