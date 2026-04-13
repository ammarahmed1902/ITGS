import React from 'react';
import { motion } from 'motion/react';
import { BarChart3 } from 'lucide-react';
import Reveal from '../Reveal';
import { StaggerContainer, StaggerItem } from '../Stagger';

const ResultsSection = () => {
  return (
    <section className="section-padding bg-deep-blue relative overflow-hidden">
      {/* Psychology: High-Contrast Data (Authority) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #2196F3 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div>
            <Reveal>
              <span className="text-cyan font-bold uppercase tracking-[0.4em] text-xs mb-8 block">Measurable Success</span>
              <h2 className="text-6xl font-extrabold text-white mb-10 leading-tight text-balance">Results that <span className="text-electric">Define</span> Industries.</h2>
              <p className="text-white/40 text-xl mb-16 font-light leading-relaxed">
                We deliver the technical precision and psychological insight required to dominate global markets.
              </p>
            </Reveal>
            <StaggerContainer delay={0.4}>
              <div className="grid grid-cols-2 gap-16">
                {[
                  { label: "Global Clients", val: "500+" },
                  { label: "Retention Rate", val: "98%" },
                  { label: "Revenue Impact", val: "$2B+" },
                  { label: "Expert Support", val: "24/7" },
                ].map((item, i) => (
                  <div key={i}>
                    <StaggerItem>
                      <div className="text-6xl font-extrabold text-white mb-4 tracking-tighter">{item.val}</div>
                      <div className="text-cyan text-xs uppercase tracking-[0.3em] font-bold">{item.label}</div>
                    </StaggerItem>
                  </div>
                ))}
              </div>
            </StaggerContainer>
          </div>
          
          <Reveal delay={0.6}>
            <div className="bg-white/5 backdrop-blur-3xl p-16 rounded-[3.5rem] border border-white/10 shadow-3xl">
              <div className="flex items-center gap-8 mb-16">
                <div className="w-20 h-20 rounded-3xl bg-electric/20 flex items-center justify-center text-electric shadow-inner">
                  <BarChart3 size={40} />
                </div>
                <div>
                  <div className="text-white text-2xl font-bold">Enterprise Velocity</div>
                  <div className="text-white/30 text-xs uppercase tracking-widest mt-2">Real-time performance auditing</div>
                </div>
              </div>
              <div className="space-y-12">
                {[
                  { label: "System Efficiency", val: 94 },
                  { label: "Security Integrity", val: 100 },
                  { label: "User Engagement", val: 87 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-white/70 text-sm mb-5 font-bold tracking-wider uppercase">
                      <span>{item.label}</span>
                      <span className="text-cyan">{item.val}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.val}%` }}
                        transition={{ duration: 2.5, delay: i * 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-gradient-to-r from-electric to-cyan"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
