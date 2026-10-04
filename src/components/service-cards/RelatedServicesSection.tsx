import { trackSiteEvent } from '../../lib/siteNavigation';
import ServiceCard from './ServiceCard';
import { serviceCardItem } from './serviceCards';

type RelatedService = { id: string; description?: string };

type Props = {
  titleId: string;
  eyebrow?: string;
  title: string;
  services: RelatedService[];
  source: string;
  setActivePage: (page: string) => void;
};

export default function RelatedServicesSection({
  titleId,
  eyebrow = 'Related expertise',
  title,
  services,
  source,
  setActivePage,
}: Props) {
  return (
    <section className="section-space bg-white" aria-labelledby={titleId}>
      <div className="site-container">
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={titleId} className="max-w-4xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">{title}</h2>
        <div className={`mt-10 grid gap-5 md:grid-cols-2 ${services.length > 3 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              index={index}
              item={serviceCardItem(service.id, {
                ...(service.description ? { description: service.description } : {}),
                onNavigate: (id) => {
                  trackSiteEvent('related_service_click', { source, service: id });
                  setActivePage(`Service:${id}`);
                },
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
