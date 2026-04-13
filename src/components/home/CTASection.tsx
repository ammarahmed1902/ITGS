import React from 'react';
import { ArrowRight, Shield, Globe, Zap } from 'lucide-react';
import Reveal from '../Reveal';

const CTASection = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  return (
    <section className="section-padding bg-deep-blue relative overflow-hidden">
      {/* Psychology: Urgency & Directness */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent" />
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <Reveal>
          <h2 className="text-6xl md:text-8xl font-extrabold text-white mb-10 leading-tight">Ready to <span className="text-electric">Dominate?</span></h2>
          <p className="text-white/50 text-2xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Join the global elite who rely on ITGS for psychology-driven technology that scales without limits.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <button onClick={() => setActivePage('Booking')} className="btn-primary text-xl px-16 py-6 group">
              Start Your Transformation
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button onClick={() => setActivePage('Booking')} className="btn-outline text-xl px-16 py-6">
              Speak with an Expert
            </button>
          </div>
          <div className="mt-20 flex items-center justify-center gap-10 text-white/30 text-xs uppercase tracking-[0.3em] font-bold">
            <div className="flex items-center gap-2"><Shield size={16} /> Secure Integration</div>
            <div className="flex items-center gap-2"><Globe size={16} /> Global Deployment</div>
            <div className="flex items-center gap-2"><Zap size={16} /> Rapid Execution</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTASection;
