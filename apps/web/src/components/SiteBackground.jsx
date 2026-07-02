import React from 'react';

// Fondo global del sitio. Se monta UNA sola vez en App.jsx (fixed, detrás de
// todo) — más prolijo y performante que una instancia por página.
// Capas: base oscura → aurora que deriva → grilla terminal → red de hexágonos
// tintada de sky → partículas. Decorativo (aria-hidden), sin coste de interacción.
const SiteBackground = () => {
  const hexagons = Array.from({ length: 18 }, (_, i) => {
    const cols = 6;
    const row = Math.floor(i / cols);
    const col = i % cols;
    const offsetX = row % 2 === 0 ? 10 : 17;
    return { id: i, x: offsetX + col * 16, y: 16 + row * 18, delay: (i % 6) * 0.7 };
  });

  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
    [12, 13], [13, 14], [14, 15], [15, 16], [16, 17],
    [0, 6], [1, 6], [1, 7], [2, 7], [2, 8], [3, 8], [3, 9], [4, 9], [4, 10], [5, 10], [5, 11],
    [6, 12], [7, 12], [7, 13], [8, 13], [8, 14], [9, 14], [9, 15], [10, 15], [10, 16], [11, 16], [11, 17],
  ];

  const hexPoints = (cx, cy, r = 5.8) =>
    Array.from({ length: 6 }, (_, index) => {
      const angle = ((60 * index - 30) * Math.PI) / 180;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ');

  const particles = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 4 + 7,
    opacity: Math.random() * 0.25 + 0.08,
    sky: i % 3 === 0,
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base oscura */}
      <div className="absolute inset-0 bg-[#070b14]" />

      {/* Aurora que deriva */}
      <div className="absolute -top-1/4 -left-1/4 h-[70vh] w-[70vh] rounded-full bg-sky-500/[0.12] blur-[120px] aurora-a" />
      <div className="absolute top-1/3 -right-1/4 h-[75vh] w-[75vh] rounded-full bg-cyan-400/[0.10] blur-[130px] aurora-b" />
      <div className="absolute -bottom-1/4 left-1/3 h-[65vh] w-[65vh] rounded-full bg-indigo-500/[0.10] blur-[120px] aurora-c" />

      {/* Grilla terminal */}
      <div className="absolute inset-0 terminal-grid" />

      {/* Red de hexágonos tintada de sky */}
      <div className="absolute inset-0 opacity-[0.20]">
        <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" className="w-full h-full animate-hex-drift">
          {links.map(([start, end], index) => (
            <line
              key={`link-${index}`}
              x1={hexagons[start].x}
              y1={hexagons[start].y}
              x2={hexagons[end].x}
              y2={hexagons[end].y}
              stroke="rgba(125,211,252,0.18)"
              strokeWidth="0.22"
              className="animate-network-pulse"
              style={{ animationDelay: `${(index % 8) * 0.5}s` }}
            />
          ))}
          {hexagons.map((hex) => (
            <g key={hex.id} className="animate-network-pulse" style={{ animationDelay: `${hex.delay}s` }}>
              <polygon points={hexPoints(hex.x, hex.y)} fill="none" stroke="rgba(125,211,252,0.22)" strokeWidth="0.28" />
              <circle cx={hex.x} cy={hex.y} r="0.6" fill="rgba(186,230,253,0.4)" />
            </g>
          ))}
        </svg>
      </div>

      {/* Partículas flotantes */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full blur-sm ${p.sky ? 'bg-sky-300/40' : 'bg-slate-400/30'}`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Viñeta sutil para dar profundidad y foco al contenido */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
};

export default SiteBackground;
