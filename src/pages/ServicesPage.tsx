import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../constants';
import Reveal from '../components/Reveal';
import { StaggerContainer, StaggerItem } from '../components/Stagger';

const ServicesPage = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  return (
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Reveal>
            <h1 className="text-6xl font-extrabold mb-6">Our Core Solutions</h1>
            <p className="text-steel max-w-2xl mx-auto text-xl font-light">Deep-dive into the technology and strategy that powers the world's most ambitious brands.</p>
          </Reveal>
        </div>
        <StaggerContainer>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((s, i) => (
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
      </div>
    </div>
  );
};

export default ServicesPage;
