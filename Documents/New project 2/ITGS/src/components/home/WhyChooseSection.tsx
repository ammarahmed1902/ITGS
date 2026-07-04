import React from 'react';
import { motion } from 'motion/react';
import Reveal from '../Reveal';
import { StaggerContainer, StaggerItem } from '../Stagger';

const WhyChooseSection = () => (
  <section className="section-padding bg-starfield relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      <Reveal width="fit-content">
        <div className="relative">
          <div className="absolute -inset-4 bg-electric/5 rounded-[2rem] blur-3xl -z-10" aria-hidden="true" />
          <img
            src="https://picsum.photos/seed/itgs-tech/800/600"
            alt="ITGS technology team collaborating on enterprise solutions"
            loading="lazy"
            className="rounded-[2rem] shadow-2xl border border-midnight/10 w-full aspect-[4/3] object-cover"
            referrerPolicy="no-referrer"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-4 right-4 md:-bottom-6 md:-right-6 bg-white p-6 rounded-2xl shadow-xl border border-midnight/10 hidden sm:block"
          >
            <div className="text-electric font-black text-3xl mb-1">99.9%</div>
            <div className="text-steel text-xs uppercase tracking-widest font-bold">Uptime SLA</div>
          </motion.div>
        </div>
      </Reveal>
      <div>
        <Reveal>
          <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-6 block">The ITGS Advantage</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
            Why Enterprise Brands <span className="text-electric">Choose ITGS</span>
          </h2>
          <p className="text-steel/80 text-lg font-light leading-relaxed mb-8">
            Choosing a technology partner is a business decision, not just a vendor selection. Here&rsquo;s what sets ITGS apart.
          </p>
        </Reveal>
        <StaggerContainer delay={0.2}>
          <div className="space-y-8">
            {[
              { title: 'One Team, Every Discipline', desc: 'Your SEO strategist, developer, and designer work from the same brief — not three separate agencies emailing each other on your behalf.' },
              { title: 'Built for Measurable Business Growth', desc: 'Every engagement starts with your business outcome, not a deliverables checklist. We report on pipeline, revenue, and ranking — not just activity.' },
              { title: 'Senior-Level Expertise, Not Junior Execution', desc: 'Our team brings 7+ years of hands-on experience across web development, SEO, and e-commerce management for clients across the US, UK, UAE, and Pakistan.' },
              { title: 'Enterprise-Grade Process', desc: 'From discovery to delivery, every project follows a documented process with clear milestones, so you always know what’s happening and why.' },
              { title: 'Platform-Agnostic Technical Expertise', desc: 'Whether your stack is React, Shopify, WordPress, or a custom build, ITGS has the technical depth to work inside your existing systems — not force you into ours.' },
              { title: 'Transparent, Accountable Communication', desc: 'You get a dedicated point of contact, regular reporting, and a team that explains decisions in business terms, not jargon.' },
            ].map((item, i) => (
              <div key={item.title}>
                <StaggerItem>
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-electric/10 flex-shrink-0 flex items-center justify-center text-electric font-black text-xl group-hover:bg-electric group-hover:text-white transition-all duration-500">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-electric transition-colors">{item.title}</h3>
                    <p className="text-steel/80 leading-relaxed font-light">{item.desc}</p>
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

export default WhyChooseSection;
