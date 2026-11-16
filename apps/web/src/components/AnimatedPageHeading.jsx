import { motion, useReducedMotion } from 'framer-motion';

export default function AnimatedPageHeading({ children, ...props }) {
  const reduced = useReducedMotion();
  return <motion.h1 {...props}
    initial={reduced ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true }}
    transition={{ duration: reduced ? 0 : 0.7, ease: 'easeOut' }}
  >{children}</motion.h1>;
}
