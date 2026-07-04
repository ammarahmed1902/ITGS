import React from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const Reveal = ({
  children,
  width = 'w-full',
  delay = 0.25,
}: {
  children: React.ReactNode;
  width?: 'w-full' | 'fit-content';
  delay?: number;
}) => {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className={`relative ${width}`}>{children}</div>;
  }

  return (
    <div className={`relative ${width}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-50px' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
