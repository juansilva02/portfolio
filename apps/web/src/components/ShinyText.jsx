import { useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

// Shine only during a deliberate hover, without animation-frame subscriptions.
const ShinyText = ({
  text, children, disabled = false, speed = 2, className = '',
  color = '#b5b5b5', shineColor = '#ffffff', spread = 120,
  yoyo = false, pauseOnHover = false, direction = 'left', delay = 0,
}) => {
  const reduceMotion = useReducedMotion();
  const animation = useRef(null);
  useEffect(() => () => animation.current?.cancel(), []);

  const shine = event => {
    if (disabled || reduceMotion || pauseOnHover || speed <= 0) return;
    animation.current?.cancel();
    const from = direction === 'left' ? '150% center' : '-50% center';
    const to = direction === 'left' ? '-50% center' : '150% center';
    animation.current = event.currentTarget.animate([
      { backgroundPosition: from }, { backgroundPosition: to },
    ], {
      duration: speed * 1000, delay: Math.max(0, delay) * 1000,
      iterations: yoyo ? 2 : 1, direction: yoyo ? 'alternate' : 'normal',
    });
  };

  return <span className={`inline-block ${className}`} onMouseEnter={shine}
    onMouseLeave={() => animation.current?.cancel()}
    style={{
      backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
      backgroundSize: '200% auto', backgroundPosition: '150% center',
      WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
    }}>{children ?? text}</span>;
};

export default ShinyText;
