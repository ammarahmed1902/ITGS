import React from 'react';
import { motion } from 'motion/react';

const AboutPage = () => (
  <div className="pt-32 pb-24 bg-starfield min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-6">Our Mission & Vision</h1>
        <p className="text-steel max-w-2xl mx-auto text-lg">
          Empowering the global enterprise through the perfect synergy of human psychology and advanced technology.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <img src="https://picsum.photos/seed/itgs-about/800/600" alt="About ITGS" className="rounded-3xl shadow-xl" referrerPolicy="no-referrer" />
        <div>
          <h2 className="text-3xl font-bold mb-6">A Journey of Credibility</h2>
          <p className="text-steel mb-6 leading-relaxed">
            Founded in 2015, ITGS has grown from a specialized security firm into a global technology authority. Our journey is defined by a relentless pursuit of excellence and a deep understanding of how technology impacts the human experience.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-starfield rounded-2xl border border-midnight/5">
              <div className="text-cyan font-bold text-2xl mb-1">2015</div>
              <div className="text-steel text-sm">Founded in SF</div>
            </div>
            <div className="p-6 bg-starfield rounded-2xl border border-midnight/5">
              <div className="text-cyan font-bold text-2xl mb-1">2019</div>
              <div className="text-steel text-sm">Global Expansion</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
