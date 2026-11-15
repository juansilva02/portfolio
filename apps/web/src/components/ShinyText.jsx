import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const ShinyText = ({
  text, children, disabled = false, speed = 2, className = '',
  color = '#b5b5b5', shineColor = '#ffffff', spread = 120,
  yoyo = false, pauseOnHover = false, direction = 'left', delay = 0,
}) => {
  const reduceMotion = useReducedMotion();
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (disabled || reduceMotion || speed <= 0) return;
    const duration = speed + Math.max(0, delay);
    const from = direction === 'left' ? '150% center' : '-50% center';
    const to = direction === 'left' ? '-50% center' : '150% center';
    const animation = element.animate([
      { backgroundPosition: from, offset: 0 },
      { backgroundPosition: to, offset: speed / duration },
      { backgroundPosition: to, offset: 1 },
    ], { duration: duration * 1000, iterations: Infinity, direction: yoyo ? 'alternate' : 'normal' });
    let visible = false;
    let hovered = false;
    const syncPlayback = () => {
      if (visible && !document.hidden && !hovered) animation.play();
      else animation.pause();
    };
    const onEnter = () => { hovered = pauseOnHover; syncPlayback(); };
    const onLeave = () => { hovered = false; syncPlayback(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    syncPlayback();
    observer.observe(element);
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      element.removeEventListener('mouseenter', onEnter);
      element.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', syncPlayback);
      animation.cancel();
    };
  }, [disabled, reduceMotion, speed, delay, direction, yoyo, pauseOnHover]);

  return (
    <span
      ref={elementRef}
      className={`inline-block ${className}`}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: '200% auto',
        backgroundPosition: '150% center',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children ?? text}
    </span>
  );
};

export default ShinyText;
