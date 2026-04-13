import React from 'react';
import { motion } from 'motion/react';
import { Network } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-3 group">
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Outer Rotating Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-2 border-dashed border-cyan/30 rounded-xl"
      />
      {/* Inner Shield/Node */}
      <div className="relative w-9 h-9 bg-electric rounded-lg flex items-center justify-center glow-cyan transform group-hover:rotate-12 transition-transform duration-500">
        <Network size={20} className="text-white" />
      </div>
      {/* Floating Particles */}
      <motion.div 
        animate={{ y: [-2, 2, -2], x: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -top-1 -right-1 w-2 h-2 bg-cyan rounded-full shadow-[0_0_10px_#00C2FF]"
      />
    </div>
    <div className="flex flex-col">
      <span className="text-white font-display text-2xl font-black tracking-tighter leading-none">ITGS</span>
      <span className="text-cyan text-[8px] uppercase tracking-[0.4em] font-bold mt-1">Global Authority</span>
    </div>
  </div>
);

export default Logo;
