import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Globe, Zap } from 'lucide-react';
import Reveal from '../Reveal';
import { ROUTES } from '../../config/site';

const CTASection = () => (
  <section className="section-padding bg-deep-blue relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent" aria-hidden="true" />
    <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
      <Reveal>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight text-balance">
          Let&rsquo;s Build Your Next Stage of <span className="text-electric">Growth</span>
        </h2>
        <p className="text-white/50 text-lg md:text-2xl mb-6 max-w-2xl mx-auto font-light leading-relaxed">
          You don&rsquo;t need more vendors. You need one technology partner who understands how marketing, development, and e-commerce work together — and who&rsquo;s accountable for the results.
        </p>
        <p className="text-white/50 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Integrate Technical and General Solutions is ready to build that with you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
          <Link to={ROUTES.booking} className="btn-primary text-lg px-10 md:px-14 py-5 group">
            Book Your Free Strategy Call
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <Link to={ROUTES.contact} className="btn-outline text-lg px-10 md:px-14 py-5">
            Talk to Our Team
          </Link>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/40 text-xs uppercase tracking-[0.25em] font-bold">
          <div className="flex items-center gap-2"><Shield size={16} aria-hidden="true" /> Secure Integration</div>
          <div className="flex items-center gap-2"><Globe size={16} aria-hidden="true" /> Global Deployment</div>
          <div className="flex items-center gap-2"><Zap size={16} aria-hidden="true" /> Rapid Execution</div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CTASection;
