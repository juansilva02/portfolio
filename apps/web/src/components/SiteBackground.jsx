import React from 'react';

// Static gradients avoid continuously repainting blurred layers behind cards.
const SiteBackground = () => (
  <div className="site-bg-layer -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="absolute inset-0 site-bg-colors" />
    <div className="absolute inset-0 terminal-grid" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
  </div>
);

export default SiteBackground;
