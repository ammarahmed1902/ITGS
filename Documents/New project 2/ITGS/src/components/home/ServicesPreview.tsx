import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../../constants';
import Reveal from '../Reveal';
import { StaggerContainer, StaggerItem } from '../Stagger';
import { ROUTES } from '../../config/site';

const ServicesPreview = () => (
  <section className="section-padding bg-starfield relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 md:mb-24">
        <Reveal>
          <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-6 block">What We Do</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-balance">
            Full-Service Technology &amp; Growth <span className="text-electric">Solutions</span>
          </h2>
          <p className="text-steel/80 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            ITGS delivers nine core service lines, each led by specialists and engineered to work together. Pick one service or build a complete growth system — every engagement is designed around your business goals, not a fixed package.
          </p>
        </Reveal>
      </div>
      <StaggerContainer>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SERVICES_DATA.slice(0, 4).map((s) => (
            <div key={s.id}>
              <StaggerItem>
              <div className="card-premium group h-full flex flex-col">
                <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center text-electric mb-6 group-hover:bg-electric group-hover:text-white transition-all duration-500">
                  {s.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-electric transition-colors">{s.title}</h3>
                <p className="text-steel/80 text-sm leading-relaxed font-light mb-6 flex-grow">{s.shortDesc}</p>
                <Link
                  to={ROUTES.service(s.id)}
                  className="pt-5 border-t border-midnight/10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-midnight hover:text-electric transition-colors mt-auto"
                >
                  Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </Link>
              </div>
              </StaggerItem>
            </div>
          ))}
        </div>
      </StaggerContainer>
      <div className="mt-16 text-center">
        <Link to={ROUTES.services} className="btn-outline-light">
          View All Services
        </Link>
      </div>
    </div>
  </section>
);

export default ServicesPreview;
