import { ArrowUpRight } from 'lucide-react';
import { pathForPage, trackSiteEvent } from '../../lib/siteNavigation';
import ServiceCardsSection from '../service-cards/ServiceCardsSection';
import { serviceCardItems } from '../service-cards/serviceCards';

const featuredServices = [
  'web-development',
  'mobile-development',
  'ui-ux-design',
  'digital-marketing',
  'seo',
  'lead-generation',
];

export default function ServicesPreview({ setActivePage }: { setActivePage: (page: string) => void }) {
  const items = serviceCardItems(featuredServices, (id) => {
    trackSiteEvent('service_page_click', { service: id, location: 'homepage_services' });
    setActivePage(`Service:${id}`);
  });

  return (
    <ServiceCardsSection
      id="services"
      eyebrow="What we do"
      title="Connected expertise for every stage of growth."
      intro="Start with one need. Flip a card to see how each capability can help you move from idea to delivery."
      items={items}
      theme="light"
      footer={
        <a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); setActivePage('Services'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
          Explore all services <ArrowUpRight size={16} />
        </a>
      }
    />
  );
}
