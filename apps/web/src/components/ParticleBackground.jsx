import React from 'react';

const ParticleBackground = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 4 + 6,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  const hexagons = Array.from({ length: 18 }, (_, i) => {
    const cols = 6;
    const row = Math.floor(i / cols);
    const col = i % cols;
    const offsetX = row % 2 === 0 ? 10 : 17;

    return {
      id: i,
      x: offsetX + col * 16,
      y: 16 + row * 18,
      delay: (i % 6) * 0.7,
    };
  });

  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
    [12, 13], [13, 14], [14, 15], [15, 16], [16, 17],
    [0, 6], [1, 6], [1, 7], [2, 7], [2, 8], [3, 8], [3, 9], [4, 9], [4, 10], [5, 10], [5, 11],
    [6, 12], [7, 12], [7, 13], [8, 13], [8, 14], [9, 14], [9, 15], [10, 15], [10, 16], [11, 16], [11, 17],
  ];

  const hexPoints = (cx, cy, r = 5.8) => (
    Array.from({ length: 6 }, (_, index) => {
      const angle = ((60 * index - 30) * Math.PI) / 180;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ')
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-[0.22]">
        <svg
          viewBox="0 0 100 80"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full animate-hex-drift"
        >
          {links.map(([start, end], index) => (
            <line
              key={`link-${index}`}
              x1={hexagons[start].x}
              y1={hexagons[start].y}
              x2={hexagons[end].x}
              y2={hexagons[end].y}
              stroke="rgba(148,163,184,0.16)"
              strokeWidth="0.22"
              className="animate-network-pulse"
              style={{ animationDelay: `${(index % 8) * 0.5}s` }}
            />
          ))}

          {hexagons.map((hex) => (
            <g key={hex.id} className="animate-network-pulse" style={{ animationDelay: `${hex.delay}s` }}>
              <polygon
                points={hexPoints(hex.x, hex.y)}
                fill="none"
                stroke="rgba(148,163,184,0.22)"
                strokeWidth="0.28"
              />
              <circle cx={hex.x} cy={hex.y} r="0.6" fill="rgba(226,232,240,0.35)" />
            </g>
          ))}
        </svg>
      </div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-slate-400/30 blur-sm"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.08),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(148,163,184,0.06),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(100,116,139,0.08),transparent_30%)]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-slate-600/5 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '3s' }} />
    </div>
  );
};

export default ParticleBackground;
