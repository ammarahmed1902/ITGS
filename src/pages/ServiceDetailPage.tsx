import { ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../constants';
import Breadcrumbs from '../components/Breadcrumbs';
import {routeForKey} from '../lib/routes';
import IconBadge from '../components/IconBadge';
import ProcessFlow from '../components/ProcessFlow';
import { iconForFeature } from '../components/contentIcons';
import type { BlogPost } from '../domain/entities/BlogPost';

export default function ServiceDetailPage({
  serviceId,
}: {
  serviceId: string;
  setActivePage: (page: string) => void;
  posts: BlogPost[];
  loading: boolean;
}) {
  const service = SERVICES_DATA.find((item) => item.id === serviceId);
  if (!service) return <div className="page-shell site-container">Service not found.</div>;
  return (
    <div className="min-h-screen bg-starfield">
      <section className="hero-atmosphere pb-20 pt-36 text-white md:pb-24 md:pt-44">
        <div className="site-container">
          <Breadcrumbs items={routeForKey(`Service:${serviceId}`).breadcrumb}/>
          <div className="max-w-4xl">
            <IconBadge dark className="mb-6">{service.icon}</IconBadge>
            <h1 className="page-title max-w-3xl text-white">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-white/70">{service.shortDesc}</p>
            <a href="/book-a-strategy-call/" className="btn-light mt-9">Book a strategy call <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Overview</span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-tight">What this service can support.</h2>
            <p className="mt-6 text-lg leading-8">{service.overview}</p>
          </div>
          <div className="card p-7">
            {service.features.map((feature) => {
              const Icon = iconForFeature(feature);
              return <div key={feature} className="flex items-center gap-4 border-b border-border py-4 last:border-0"><IconBadge small><Icon size={20} strokeWidth={1.8} /></IconBadge><span className="font-medium text-ink">{feature}</span></div>;
            })}
          </div>
        </div>
      </section>
      <section className="section-space bg-white">
        <div className="site-container">
          <span className="eyebrow">Delivery</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)]">A practical four-step process.</h2>
          <ProcessFlow steps={service.process.map((step) => ({ title: step.step, description: step.desc }))} />
        </div>
      </section>
    </div>
  );
}
