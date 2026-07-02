import React, { useEffect } from 'react';

// Actualiza variables CSS (--spot-x / --spot-y) en las tarjetas glass bajo el
// cursor para el efecto spotlight definido en index.css. Un solo listener
// global delegado: costo mínimo, funciona en todas las tarjetas del sitio.
const SpotlightEffect = () => {
  useEffect(() => {
    const onMove = (e) => {
      const card = e.target.closest?.('.liquid-glass-light, .liquid-glass-blue');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return null;
};

export default SpotlightEffect;
