import React from 'react';
import { motion } from 'motion/react';
import Reveal from '../Reveal';
import { StaggerContainer, StaggerItem } from '../Stagger';

const WhyChooseSection = () => {
  return (
    <section className="section-padding bg-starfield relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        <Reveal width="fit-content">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-electric/5 rounded-[3rem] blur-3xl -z-10" />
            <img 
              src="https://picsum.photos/seed/itgs-tech/800/600" 
              alt="Technology Innovation" 
              className="rounded-[3rem] shadow-2xl border border-midnight/5"
              referrerPolicy="no-referrer"
            />
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 -right-10 bg-starfield p-8 rounded-3xl shadow-2xl border border-midnight/5 hidden md:block"
            >
              <div className="text-electric font-black text-4xl mb-1">99.9%</div>
              <div className="text-steel/60 text-xs uppercase tracking-widest font-bold">Uptime Guaranteed</div>
            </motion.div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-8 block">The ITGS Advantage</span>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-10 leading-tight">Why Industry Leaders <span className="text-electric">Choose ITGS.</span></h2>
          </Reveal>
          <StaggerContainer delay={0.3}>
            <div className="space-y-12">
              {[
                { title: "Psychology-Driven Approach", desc: "We understand the human element behind every interaction, building trust through intuitive design." },
                { title: "Uncompromising Reliability", desc: "Our systems are built for 99.99% uptime, ensuring your business never misses a beat." },
                { title: "Future-Proof Innovation", desc: "We stay ahead of the curve, integrating the latest AI and blockchain technologies seamlessly." },
              ].map((item, i) => (
                <div key={i}>
                  <StaggerItem>
                    <div className="flex gap-8 group">
                      <div className="w-16 h-16 rounded-2xl bg-starfield flex-shrink-0 flex items-center justify-center text-electric font-black text-2xl shadow-inner group-hover:bg-electric group-hover:text-white transition-all duration-500">
                        0{i + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-electric transition-colors">{item.title}</h3>
                        <p className="text-steel/70 text-lg leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                </div>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
