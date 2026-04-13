import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import TechVisual from '../TechVisual';

const Hero = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  return (
    <section className="relative min-h-screen bg-midnight flex items-center pt-24 overflow-hidden">
      {/* Psychology: Depth & Dynamic Motion (Confidence) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, 40, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-electric/15 rounded-full blur-[140px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-[700px] h-[700px] bg-cyan/10 rounded-full blur-[160px]"
        />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-10 text-balance tracking-tight">
            Scale with <span className="text-electric">Absolute</span> Authority.
          </h1>
          <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-xl leading-relaxed font-light">
            ITGS engineers psychology-driven technology solutions for the world's most ambitious enterprise brands.
          </p>
          <div className="flex flex-wrap gap-6">
            <button onClick={() => setActivePage('Booking')} className="btn-primary group">
              Get Started Now
              <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <button onClick={() => setActivePage('Booking')} className="btn-outline">Speak with an Expert</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block perspective-2000"
        >
          <TechVisual />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
