import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { SERVICES_DATA } from '../constants';
import Reveal from '../components/Reveal';
import PageMeta from '../components/PageMeta';
import { ROUTES } from '../config/site';

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = SERVICES_DATA.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <>
        <PageMeta title="Service Not Found" noIndex path={`/services/${serviceId}`} />
        <div className="pt-32 pb-24 bg-starfield min-h-screen">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-extrabold mb-4">Service Not Found</h1>
            <p className="text-steel mb-10">The service you are looking for does not exist or has been moved.</p>
            <Link to={ROUTES.services} className="btn-primary px-10 py-4">
              View All Services
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title={service.title}
        description={service.shortDesc}
        path={ROUTES.service(service.id)}
      />
      <div className="bg-starfield min-h-screen">
        <section className="pt-32 md:pt-40 pb-20 bg-deep-blue relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #2196F3 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal>
                <Link
                  to={ROUTES.services}
                  className="inline-flex items-center gap-2 text-cyan text-xs font-bold uppercase tracking-widest mb-8 hover:gap-3 transition-all"
                >
                  <ArrowRight size={14} className="rotate-180" aria-hidden="true" /> Back to Services
                </Link>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                  {service.title} <span className="text-electric">Redefined.</span>
                </h1>
                <p className="text-white/60 text-lg md:text-xl mb-10 font-light leading-relaxed">{service.shortDesc}</p>
                <Link to={ROUTES.booking} className="btn-primary px-10 py-4 text-lg inline-flex">Request a Quote</Link>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-electric/20 rounded-[2rem] blur-3xl" aria-hidden="true" />
                  <img
                    src={`https://picsum.photos/seed/${service.id}/800/600`}
                    alt={service.title}
                    loading="lazy"
                    className="relative rounded-[2rem] shadow-2xl border border-white/10 w-full aspect-[4/3] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Overview</span>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Strategic Value & <span className="text-electric">Impact.</span></h2>
                <p className="text-steel/80 text-lg leading-relaxed font-light">{service.overview}</p>
              </Reveal>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {service.features.map((f, i) => (
                  <div key={f}>
                    <Reveal delay={0.1 * i}>
                    <div className="p-6 bg-starfield rounded-2xl border border-midnight/10 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center text-electric mb-4">
                        <Zap size={18} aria-hidden="true" />
                      </div>
                      <div className="font-bold text-midnight text-sm md:text-base">{f}</div>
                    </div>
                  </Reveal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-starfield">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Reveal>
                <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Our Methodology</span>
                <h2 className="text-3xl md:text-5xl font-extrabold">How We Deliver <span className="text-electric">Excellence.</span></h2>
              </Reveal>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((p, i) => (
                <div key={p.step}>
                  <Reveal delay={0.1 * i}>
                  <div className="relative">
                    <div className="text-6xl font-black text-midnight/5 absolute -top-6 -left-2" aria-hidden="true">0{i + 1}</div>
                    <h3 className="text-xl font-bold mb-3 text-midnight relative z-10">{p.step}</h3>
                    <p className="text-steel/80 leading-relaxed relative z-10">{p.desc}</p>
                  </div>
                </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-deep-blue text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <Reveal>
              <span className="text-cyan font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Proven Results</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-10">Measurable <span className="text-electric">Success.</span></h2>
              <blockquote className="bg-white/5 backdrop-blur-xl p-10 md:p-14 rounded-[2.5rem] border border-white/10">
                <p className="text-xl md:text-2xl font-light leading-relaxed italic mb-10">&ldquo;{service.results}&rdquo;</p>
                <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-white/10">
                  {service.tools.map((t) => (
                    <span key={t} className="text-white/50 font-bold uppercase tracking-widest text-xs">{t}</span>
                  ))}
                </div>
              </blockquote>
            </Reveal>
          </div>
        </section>

        <section className="section-padding bg-starfield">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Ready to Scale Your <span className="text-electric">Authority?</span></h2>
              <p className="text-steel/80 text-lg mb-10 font-light">
                Contact our experts to discuss how our {service.title} solutions can transform your business.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to={ROUTES.booking} className="btn-primary px-10 py-4 text-lg">Get Started</Link>
                <Link to={ROUTES.services} className="btn-outline-light px-10 py-4 text-lg">View Other Services</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceDetailPage;
