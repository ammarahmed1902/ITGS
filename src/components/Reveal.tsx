import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const Reveal = ({ children, width = "w-full", delay = 0 }: { children: React.ReactNode, width?: "w-full" | "fit-content", delay?: number }) => {
  const reducedMotion = useReducedMotion();
  return (
    <div className={`relative ${width}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: reducedMotion ? 0 : 18 },
          visible: { opacity: 1, y: 0 },
        }}
        initial={false}
        whileInView="visible"
        transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.12 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
