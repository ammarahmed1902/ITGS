import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../../constants';
import Reveal from '../Reveal';
import { StaggerContainer, StaggerItem } from '../Stagger';

const ServicesPreview = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  return (
    <section className="section-padding bg-starfield relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <Reveal>
            <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Core Expertise</span>
            <h2 className="text-6xl md:text-7xl font-extrabold mb-8 text-balance">Engineered for <span className="text-electric">Impact.</span></h2>
            <p className="text-steel/70 max-w-2xl mx-auto text-xl font-light leading-relaxed">
              Our suite of services is designed to provide the authority and reliability your global brand demands.
            </p>
          </Reveal>
        </div>
        <StaggerContainer>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES_DATA.slice(0, 4).map((s, i) => (
              <div key={i}>
                <StaggerItem>
                  <div className="card-premium group h-full flex flex-col">
                    <div className="w-20 h-20 bg-starfield rounded-2xl flex items-center justify-center text-cyan mb-8 group-hover:bg-electric group-hover:text-white transition-all duration-700 shadow-inner">
                      {s.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-electric transition-colors">{s.title}</h3>
                    <p className="text-steel/80 text-sm leading-relaxed font-light mb-8 flex-grow">{s.shortDesc}</p>
                    
                    <button 
                      onClick={() => setActivePage(`Service:${s.id}`)}
                      className="pt-6 border-t border-midnight/5 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-black hover:text-electric transition-colors mt-auto"
                    >
                      Learn More <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>
                </StaggerItem>
              </div>
            ))}
          </div>
        </StaggerContainer>
        <div className="mt-20 text-center">
          <button onClick={() => setActivePage('Services')} className="btn-outline">View All Services</button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
