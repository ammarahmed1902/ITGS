import React from 'react';
import { motion } from 'motion/react';
import { Globe } from 'lucide-react';

const TechVisual = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000">
      {/* Background Matrix/Grid Effect */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="grid grid-cols-12 gap-1 w-full h-full">
          {[...Array(144)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
              className="border-[0.5px] border-cyan/20 h-12"
            />
          ))}
        </div>
      </div>

      {/* Central Neural Hub */}
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={{ 
          rotateY: [0, 360],
          rotateX: [0, 10, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative z-20 w-48 h-48"
      >
        {/* Hub Core */}
        <div className="absolute inset-0 bg-midnight/80 border-2 border-cyan/40 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,194,255,0.3)]">
          <div className="relative w-32 h-32">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-cyan/10 rounded-full blur-xl"
            />
            <Globe className="text-cyan w-full h-full p-6 animate-pulse" />
          </div>
        </div>

        {/* Orbiting Data Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-20px] border border-cyan/20 rounded-full"
            style={{ rotateX: `${45 + i * 15}deg`, rotateY: `${i * 30}deg` }}
          />
        ))}
      </motion.div>

      {/* Neural Nodes & Connections */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.cos(angle) * 220;
          const y = Math.sin(angle) * 220;
          
          return (
            <div key={i} className="absolute top-1/2 left-1/2" style={{ transform: `translate(${x}px, ${y}px)` }}>
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  boxShadow: ["0 0 0px rgba(0,194,255,0)", "0 0 15px rgba(0,194,255,0.5)", "0 0 0px rgba(0,194,255,0)"]
                }}
                transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                className="w-3 h-3 bg-cyan rounded-full"
              />
              
              {/* Connection Line to Hub */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 220 }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="absolute top-1.5 right-1.5 h-[1px] bg-gradient-to-l from-cyan/50 to-transparent origin-right"
                style={{ transform: `rotate(${angle + Math.PI}rad)` }}
              />
            </div>
          );
        })}
      </div>

      {/* Scanning Beam */}
      <motion.div
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan/40 to-transparent z-30 blur-sm"
      />

      {/* Floating Terminal Snippets */}
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-20 right-0 bg-midnight/90 border border-white/10 p-3 rounded-lg text-[9px] font-mono text-cyan shadow-2xl"
      >
        <div className="flex gap-2 mb-1 border-b border-white/5 pb-1">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div>$ itgs --status</div>
        <div className="text-white/60">{" > "} uptime: 99.999%</div>
        <div className="text-white/60">{" > "} security: active</div>
        <div className="text-electric">{" > "} nodes: 1,240 online</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 left-0 bg-midnight/90 border border-white/10 p-3 rounded-lg text-[9px] font-mono text-electric shadow-2xl"
      >
        <div className="text-white/40 mb-1">// global_sync.js</div>
        <div>const sync = async () ={" > "} {'{'}</div>
        <div className="pl-2">await cloud.distribute();</div>
        <div className="text-cyan">{'}'}</div>
      </motion.div>

      {/* Falling Data Bits */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * 600 - 300, opacity: 0 }}
            animate={{ y: 600, opacity: [0, 1, 0] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 10 }}
            className="absolute text-[8px] font-mono text-cyan"
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechVisual;
