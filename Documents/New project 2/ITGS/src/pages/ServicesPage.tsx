import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../constants';
import Reveal from '../components/Reveal';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import { StaggerContainer, StaggerItem } from '../components/Stagger';
import { ROUTES } from '../config/site';

const ServicesPage = () => (
  <>
    <PageMeta title="Our Core Solutions" description="Technology and strategy that powers the world's most ambitious brands." path={ROUTES.services} />
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          eyebrow="What We Do"
          title="Our Core Solutions"
          description="Deep-dive into the technology and strategy that powers the world's most ambitious brands."
        />
        <StaggerContainer>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((s) => (
              <div key={s.id}>
                <StaggerItem>
                <div className="card-premium group h-full flex flex-col">
                  <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center text-electric mb-6 group-hover:bg-electric group-hover:text-white transition-all duration-500">
                    {s.icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-electric transition-colors">{s.title}</h2>
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
      </div>
    </div>
  </>
);

export default ServicesPage;
