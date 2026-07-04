import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import TechVisual from '../TechVisual';
import { ROUTES } from '../../config/site';

const Hero = () => (
  <section className="relative min-h-screen bg-midnight flex items-center pt-28 md:pt-32 overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2], x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-electric/15 rounded-full blur-[140px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15], x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 -right-20 w-[700px] h-[700px] bg-cyan/10 rounded-full blur-[160px]"
      />
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 text-balance tracking-tight">
          Enterprise Technology &amp; Growth Solutions, Engineered to <span className="text-electric">Scale Your Business</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-xl leading-relaxed font-light">
          Integrate Technical and General Solutions (ITGS) is the technology partner behind ambitious companies&rsquo; growth — combining SEO, web development, mobile app development, and e-commerce management into one accountable team. No fragmented vendors. No guesswork. Just measurable business growth.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to={ROUTES.booking} className="btn-primary group">
            Get Your Free Growth Strategy
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
          </Link>
          <Link to={ROUTES.about} className="btn-outline">
            See How We Work
          </Link>
        </div>
        <p className="mt-10 text-white/40 text-xs sm:text-sm font-medium tracking-wide leading-relaxed">
          Top Rated on Upwork&nbsp;&nbsp;•&nbsp;&nbsp;7+ Years Delivering Results&nbsp;&nbsp;•&nbsp;&nbsp;Clients Across the US, UK, UAE &amp; Pakistan&nbsp;&nbsp;•&nbsp;&nbsp;Enterprise-Grade Security &amp; Process
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.15 }}
        className="relative hidden lg:block"
        aria-hidden="true"
      >
        <TechVisual />
      </motion.div>
    </div>
  </section>
);

export default Hero;
