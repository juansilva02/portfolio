// Shared framer-motion presets for consistent, balanced reveals across the site.
// Usage in a section:
//   import { fadeUp, staggerContainer, revealOnView } from '@/lib/motion';
//   <motion.div variants={staggerContainer()} {...revealOnView}>
//     <motion.h2 variants={fadeUp}>...</motion.h2>
//   </motion.div>

const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};

// Parent container that staggers its children. Children must carry a variant
// with matching `hidden`/`show` keys (e.g. fadeUp).
export const staggerContainer = (stagger = 0.1, delayChildren = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

// Spread onto any motion element to reveal it once when scrolled into view.
export const revealOnView = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-80px' },
};

// Subtle, reusable hover for cards (use with whileHover on a motion element).
export const hoverLift = {
  y: -6,
  transition: { duration: 0.25, ease: 'easeOut' },
};
