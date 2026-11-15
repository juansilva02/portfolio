import { useEffect, useRef, useState } from 'react';
import GlassSurface from './GlassSurface';
import './GlassSurfaceLayer.css';

// Decorative layer: the original panel keeps its layout, semantics and events.
export default function GlassSurfaceLayer() {
  const host = useRef(null);
  const [visible, setVisible] = useState(false);
  const [radius, setRadius] = useState(38);

  useEffect(() => {
    const element = host.current;
    if (!element) return undefined;
    setRadius(parseFloat(getComputedStyle(element.parentElement).borderTopLeftRadius) || 0);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={host} className="glass-panel-layer" aria-hidden="true">
      {visible && <GlassSurface width="100%" height="100%" borderRadius={radius}
        distortionScale={-180} displace={0.5} backgroundOpacity={0.1} />}
    </span>
  );
}
