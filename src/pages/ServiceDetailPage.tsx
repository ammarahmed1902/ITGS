import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { SERVICES_DATA } from '../constants';
import Reveal from '../components/Reveal';

const ServiceDetailPage = ({ serviceId, setActivePage }: { serviceId: string, setActivePage: (page: string) => void }) => {
  const service = SERVICES_DATA.find(s => s.id === serviceId);
  if (!service) return <div>Service not found</div>;

  return (
    <div className="bg-starfield min-h-screen">
      {/* Hero Section */}
      <section className="pt-48 pb-32 bg-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #2196F3 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <button 
                onClick={() => setActivePage('Services')}
                className="inline-flex items-center gap-2 text-cyan text-xs font-bold uppercase tracking-widest mb-8 hover:gap-4 transition-all"
              >
                <ArrowRight size={14} className="rotate-180" /> Back to Services
              </button>
              <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
                {service.title} <span className="text-electric">Redefined.</span>
              </h1>
              <p className="text-white/50 text-xl md:text-2xl mb-12 font-light leading-relaxed">
                {service.shortDesc}
              </p>
              <button onClick={() => setActivePage('Booking')} className="btn-primary px-12 py-5 text-lg">Request a Quote</button>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="relative">
                <div className="absolute -inset-4 bg-electric/20 rounded-[3rem] blur-3xl" />
                <img 
                  src={`https://picsum.photos/seed/${service.id}/800/600`} 
                  alt={service.title} 
                  className="relative rounded-[3rem] shadow-2xl border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding bg-starfield">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <Reveal>
              <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-8 block">Overview</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Strategic Value & <span className="text-electric">Impact.</span></h2>
              <p className="text-steel/70 text-xl leading-relaxed font-light">
                {service.overview}
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-8">
              {service.features.map((f, i) => (
                <div key={i}>
                  <Reveal delay={0.2 * i}>
                    <div className="p-8 bg-starfield rounded-3xl border border-midnight/5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center text-electric mb-6">
                        <Zap size={20} />
                      </div>
                      <div className="font-bold text-midnight">{f}</div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-starfield">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <Reveal>
              <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Our Methodology</span>
              <h2 className="text-5xl font-extrabold">How We Deliver <span className="text-electric">Excellence.</span></h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((p, i) => (
              <div key={i}>
                <Reveal delay={0.15 * i}>
                  <div className="relative group">
                    <div className="text-8xl font-black text-midnight/5 absolute -top-10 -left-4 group-hover:text-electric/10 transition-colors">0{i + 1}</div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-4 text-midnight">{p.step}</h3>
                      <p className="text-steel/70 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results / Case Study */}
      <section className="section-padding bg-deep-blue text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <span className="text-cyan font-bold uppercase tracking-[0.4em] text-xs mb-8 block">Proven Results</span>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-12">Measurable <span className="text-electric">Success.</span></h2>
            <div className="bg-white/5 backdrop-blur-xl p-16 rounded-[3.5rem] border border-white/10 shadow-2xl">
              <p className="text-2xl md:text-3xl font-light leading-relaxed italic mb-12">
                "{service.results}"
              </p>
              <div className="flex flex-wrap justify-center gap-12 pt-12 border-t border-white/5">
                {service.tools.map((t, i) => (
                  <div key={i} className="text-white/40 font-bold uppercase tracking-widest text-sm">{t}</div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-starfield">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-5xl font-extrabold mb-8">Ready to Scale Your <span className="text-electric">Authority?</span></h2>
            <p className="text-steel/70 text-xl mb-12 font-light">
              Contact our experts today to discuss how our {service.title} solutions can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button onClick={() => setActivePage('Booking')} className="btn-primary px-12 py-5 text-lg">Get Started</button>
              <button onClick={() => setActivePage('Services')} className="btn-outline px-12 py-5 text-lg">View Other Services</button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
