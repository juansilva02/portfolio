import React from 'react';

// Pure CSS 3D "web page being assembled" scene. The browser frame sits on a
// slowly tilting preserve-3d plane; each content brick flies in from depth,
// settles, holds, then clears and rebuilds — an endless "armado de pagina".
// Decorative only (aria-hidden); animation handled in index.css.

const Bar = ({ w, h = 8, className = 'bg-slate-300/20' }) => (
  <span className={`block rounded-full ${className}`} style={{ width: w, height: h }} />
);

const brickStyle = (index, bx) => ({
  animationDelay: `${index * 0.18}s`,
  '--bx': bx,
});

const WebPageAssembly3D = () => {
  return (
    <div className="assembly-stage relative mx-auto w-full max-w-[440px] py-6" aria-hidden="true">
      <div className="assembly-scene">
        <div className="assembly-window overflow-hidden rounded-2xl border border-sky-300/20 bg-gradient-to-b from-slate-900/90 to-slate-950/95 shadow-[0_40px_80px_-40px_rgba(56,189,248,0.45)]">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/5 bg-slate-950/60 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <div className="ml-2 flex flex-1 items-center gap-2 rounded-md border border-white/5 bg-slate-900/70 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="font-mono text-[10px] text-slate-400">zuzudev.pro</span>
            </div>
          </div>

          {/* assembling page body */}
          <div className="assembly-body space-y-3 p-4">
            {/* nav */}
            <div className="assembly-brick flex items-center justify-between" style={brickStyle(0, '-36px')}>
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-sky-400/70" />
                <Bar w={40} h={6} />
                <Bar w={28} h={6} />
                <Bar w={28} h={6} />
              </div>
              <span className="h-6 w-16 rounded-md bg-sky-400/30" />
            </div>

            {/* hero title */}
            <div className="assembly-brick space-y-2 pt-1" style={brickStyle(1, '34px')}>
              <Bar w="82%" h={13} className="bg-slate-200/35" />
              <Bar w="58%" h={13} className="bg-slate-200/25" />
            </div>

            {/* subtitle */}
            <div className="assembly-brick space-y-1.5" style={brickStyle(2, '-26px')}>
              <Bar w="100%" h={6} className="bg-slate-400/25" />
              <Bar w="88%" h={6} className="bg-slate-400/25" />
            </div>

            {/* CTAs */}
            <div className="assembly-brick flex items-center gap-2 pt-0.5" style={brickStyle(3, '30px')}>
              <span className="h-8 w-28 rounded-lg bg-gradient-to-r from-sky-400/70 to-sky-500/50" />
              <span className="h-8 w-20 rounded-lg border border-slate-500/40" />
            </div>

            {/* cards row */}
            <div className="assembly-brick grid grid-cols-3 gap-2 pt-1" style={brickStyle(4, '-30px')}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="liquid-glass-light space-y-1.5 rounded-lg p-2">
                  <span className="block h-3.5 w-3.5 rounded-md bg-sky-400/60" />
                  <Bar w="90%" h={5} />
                  <Bar w="70%" h={5} />
                </div>
              ))}
            </div>

            {/* media block */}
            <div className="assembly-brick" style={brickStyle(5, '28px')}>
              <div className="relative h-16 overflow-hidden rounded-xl bg-gradient-to-br from-sky-500/25 via-slate-700/20 to-slate-900/30">
                <span className="absolute left-3 top-3 h-2 w-2 rounded-full bg-emerald-400/80" />
                <span className="absolute bottom-2.5 left-3 block h-1.5 w-20 rounded-full bg-white/15" />
              </div>
            </div>

            {/* footer */}
            <div className="assembly-brick flex items-center justify-between pt-0.5" style={brickStyle(6, '-22px')}>
              <Bar w={70} h={5} className="bg-slate-500/30" />
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-500/30" />
                <span className="h-2 w-2 rounded-full bg-slate-500/30" />
                <span className="h-2 w-2 rounded-full bg-slate-500/30" />
              </div>
            </div>
          </div>
        </div>

        {/* soft reflection / glow under the window */}
        <div className="mx-auto mt-3 h-6 w-3/4 rounded-[50%] bg-sky-400/10 blur-xl" />
      </div>
    </div>
  );
};

export default WebPageAssembly3D;
