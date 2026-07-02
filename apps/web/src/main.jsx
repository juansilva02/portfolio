import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Easter egg para quien abra la consola 👀
/* eslint-disable no-console */
console.log(
  '%c$ sudo zuzudev "juansilva02"',
  'color:#34d399;font-family:monospace;font-size:13px;'
);
console.log(
  '%c✓ Hola dev curioso. Este portfolio está hecho con React + Vite + Tailwind + framer-motion.\n→ ¿Trabajamos juntos? administracion@zuzudev.pro',
  'color:#7dd3fc;font-family:monospace;font-size:12px;'
);
/* eslint-enable no-console */

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
