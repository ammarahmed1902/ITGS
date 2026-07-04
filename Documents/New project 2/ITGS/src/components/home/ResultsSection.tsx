import React from 'react';
import { motion } from 'motion/react';
import { BarChart3 } from 'lucide-react';
import Reveal from '../Reveal';
import { StaggerContainer, StaggerItem } from '../Stagger';

const ResultsSection = () => (
  <section className="section-padding bg-deep-blue relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #2196F3 1px, transparent 0)', backgroundSize: '40px 40px' }}
      aria-hidden="true"
    />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <Reveal>
            <span className="text-cyan font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Measurable Success</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight text-balance">
              Client Success <span className="text-electric">Stories</span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl mb-12 font-light leading-relaxed">
              Numbers tell the story better than we can.
            </p>
          </Reveal>
          <StaggerContainer delay={0.3}>
            <div className="grid grid-cols-2 gap-8 md:gap-12">
              {[
                { label: 'Global Clients', val: '500+' },
                { label: 'Retention Rate', val: '98%' },
                { label: 'Revenue Impact', val: '$2B+' },
                { label: 'Expert Support', val: '24/7' },
            ].map((item) => (
              <div key={item.label}>
                <StaggerItem>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tighter">{item.val}</div>
                  <div className="text-cyan text-xs uppercase tracking-[0.3em] font-bold">{item.label}</div>
                </StaggerItem>
              </div>
            ))}
            </div>
          </StaggerContainer>
        </div>

        <Reveal delay={0.4}>
          <div className="bg-white/5 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-electric/20 flex items-center justify-center text-electric">
                <BarChart3 size={32} aria-hidden="true" />
              </div>
              <div>
                <div className="text-white text-xl font-bold">Enterprise Velocity</div>
                <div className="text-white/40 text-xs uppercase tracking-widest mt-1">Illustrative benchmarks</div>
              </div>
            </div>
            <div className="space-y-8">
              {[
                { label: 'System Efficiency', val: 94 },
                { label: 'Security Integrity', val: 100 },
                { label: 'User Engagement', val: 87 },
              ].map((item, i) => (
                <div key={item.label}>
                  <div className="flex justify-between text-white/70 text-sm mb-3 font-bold tracking-wider uppercase">
                    <span>{item.label}</span>
                    <span className="text-cyan">{item.val}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={item.val} aria-valuemin={0} aria-valuemax={100}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
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

export default ResultsSection;
