import React, { useEffect } from 'react';

// Actualiza variables CSS (--spot-x / --spot-y) en las tarjetas glass bajo el
// cursor para el efecto spotlight definido en index.css. Un solo listener
// global delegado: costo mínimo, funciona en todas las tarjetas del sitio.
const SpotlightEffect = () => {
  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let pending;
    const update = () => {
      frame = 0;
      const { card, x, y } = pending;
      if (!card.isConnected) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${x - rect.left}px`);
      card.style.setProperty('--spot-y', `${y - rect.top}px`);
    };
    const onMove = (e) => {
      if (!pointer.matches || reducedMotion.matches) return;
      const card = e.target.closest?.('.liquid-glass-light, .liquid-glass-blue');
      if (!card) return;
      pending = { card, x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
};

export default SpotlightEffect;
