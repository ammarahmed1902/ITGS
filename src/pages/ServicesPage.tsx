import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import type { BlogPost } from '../domain/entities/BlogPost';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';
import ServiceCard from '../components/service-cards/ServiceCard';
import { serviceCardItem } from '../components/service-cards/serviceCards';
import {
  ConceptWorkSection,
  ConnectedModelSection,
  ExpertiseSection,
  InsightsSection,
  SolutionsSection,
  WhyItgsSection,
} from '../components/home/HomepageSections';
import { ApprovedCaseStudies, ApprovedIndustries, ApprovedProofBar } from '../components/home/ApprovedContentSections';

type Props = {
  setActivePage: (page: string) => void;
  posts: BlogPost[];
  loading: boolean;
};

type ServiceItem = {
  id: string;
  description: string;
  capabilities: string[];
  cta: string;
};

type ServiceGroupData = {
  id: string;
  number: string;
  title: string;
  summary: string;
  services: ServiceItem[];
};

const serviceGroups: ServiceGroupData[] = [
  {
    id: 'build-services',
    number: '01',
    title: 'Build',
    summary: 'Create digital products, platforms and experiences around a clear user and business need.',
    services: [
      { id: 'web-development', description: 'Plan and build websites, customer portals and web applications around the people who use and manage them.', capabilities: ['Web applications', 'Customer portals', 'CMS & integrations'], cta: 'Explore Web Development' },
      { id: 'mobile-development', description: 'Create focused iOS and Android experiences for customer journeys and work that happens away from a desk.', capabilities: ['iOS & Android', 'Cross-platform delivery', 'Product integrations'], cta: 'Explore Mobile App Development' },
      { id: 'ui-ux-design', description: 'Turn complex requirements and difficult journeys into clear, consistent interfaces and prototypes.', capabilities: ['User journeys', 'Interface design', 'Interactive prototypes'], cta: 'Explore UI/UX Design' },
      { id: 'graphic-design', description: 'Develop visual identity and communication assets that help a business present itself consistently.', capabilities: ['Brand identity', 'Marketing assets', 'Presentation design'], cta: 'Explore Graphic Design' },
    ],
  },
  {
    id: 'reach-services',
    number: '02',
    title: 'Reach',
    summary: 'Build visibility, create demand and connect acquisition activity to the customer journey.',
    services: [
      { id: 'digital-marketing', description: 'Coordinate channels and campaign activity around a defined audience, offer and commercial objective.', capabilities: ['Campaign strategy', 'Paid media', 'Content planning'], cta: 'Explore Digital Marketing' },
      { id: 'seo', description: 'Improve technical search foundations, content structure and the paths that connect discovery with useful pages.', capabilities: ['Technical SEO', 'On-page SEO', 'Content optimization'], cta: 'Explore SEO Services' },
      { id: 'lead-generation', description: 'Shape focused acquisition journeys that connect targeting, landing experiences and sales follow-up.', capabilities: ['B2B acquisition', 'Funnel planning', 'CRM connections'], cta: 'Explore Lead Generation' },
    ],
  },
  {
    id: 'operate-services',
    number: '03',
    title: 'Operate & Scale',
    summary: 'Support, optimize and coordinate the systems and recurring work behind the business.',
    services: [
      { id: 'e-commerce', description: 'Support ongoing online commerce across storefronts, marketplaces, listings and operational workflows.', capabilities: ['Store operations', 'Marketplace management', 'Listing optimization'], cta: 'Explore E-commerce Solutions' },
      { id: 'virtual-assistance', description: 'Add structured administrative and operational support around agreed workflows and responsibilities.', capabilities: ['Administrative support', 'Project coordination', 'Customer operations'], cta: 'Explore Virtual Assistance' },
    ],
  },
];

function ServiceGroup({ group, setActivePage }: { group: ServiceGroupData; setActivePage: Props['setActivePage']; key?: string }) {
  return (
    <section id={group.id} className="scroll-mt-28 border-b border-border py-14 last:border-0 md:py-20" aria-labelledby={`${group.id}-title`}>
      <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
        <div>
          <span className="text-xs font-semibold tracking-[.14em] text-electric">{group.number}</span>
          <h2 id={`${group.id}-title`} className="mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-[1.08]">{group.title}</h2>
          <p className="mt-5 max-w-md text-base leading-7">{group.summary}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{group.services.map((item, index) => <ServiceCard key={item.id} index={index} item={serviceCardItem(item.id, { description: item.description, ctaLabel: item.cta, onNavigate: (id) => { trackSiteEvent('service_page_click', { service: id, location: 'services_hub' }); setActivePage(`Service:${id}`); } })} />)}</div>
      </div>
    </section>
  );
}

const faqs = [
  { question: 'What services does ITGS provide?', answer: 'ITGS provides connected capabilities across web and mobile development, UI/UX and graphic design, digital marketing, SEO, lead generation, e-commerce operations and virtual assistance. Each service has a dedicated page with more specific scope.' },
  { question: 'Can I hire ITGS for only one service?', answer: 'A project can begin with one clearly defined capability. Where another discipline affects the result, that dependency can be discussed without automatically expanding the engagement.' },
  { question: 'How do I know which service I need?', answer: 'Start with the outcome or problem rather than an internal service label. A strategy call can help identify a sensible first step and the capabilities likely to support it.' },
  { question: 'Can ITGS work with an existing website or software product?', answer: 'Yes. Existing products can be reviewed around a defined user journey, technical concern, growth objective or operational problem. Required access and review activities are agreed first.' },
  { question: 'Can development and digital marketing be handled together?', answer: 'They can be coordinated when the scope requires it. Search, performance, user experience, analytics and implementation decisions often affect one another.' },
  { question: 'Do you provide ongoing support after launch?', answer: 'Ongoing support and improvement work can be discussed. Coverage, responsibilities, response expectations and commercial terms require confirmation for each engagement.' },
  { question: 'How does a new ITGS engagement begin?', answer: 'The first conversation clarifies the goal, current situation, users, constraints and timing. ITGS can then recommend an appropriate discovery or delivery scope for review.' },
];

function ServicesFaq() {
  return (
    <section className="section-space bg-[#f7f8f5]" aria-labelledby="services-faq-title">
      <div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div><span className="eyebrow">Services FAQ</span><h2 id="services-faq-title" className="text-[clamp(2rem,4vw,3.3rem)] leading-[1.08]">Choosing the right starting point.</h2><p className="mt-5 max-w-sm text-base leading-7">Useful questions when the challenge is clear but the service mix is not.</p></div>
        <div className="border-t border-border">{faqs.map(({ question, answer }) => <details key={question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} aria-hidden="true" /></summary><p className="max-w-2xl pb-6 pr-8 text-sm leading-7">{answer}</p></details>)}</div>
      </div>
    </section>
  );
}

function ServiceSelectionCta({ setActivePage }: { setActivePage: Props['setActivePage'] }) {
  return (
    <section className="bg-white py-14 md:py-20" aria-labelledby="service-selection-title">
      <div className="site-container"><div className="hero-atmosphere rounded-xl px-6 py-12 text-white md:px-12 md:py-16 lg:flex lg:items-end lg:justify-between">
        <div><span className="mb-4 block text-[11px] font-semibold uppercase tracking-[.16em] text-sky">Find the right capability</span><h2 id="service-selection-title" className="max-w-2xl text-[clamp(2rem,4vw,3.35rem)] leading-[1.08] text-white">Not sure which service you need?</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/70">Tell us what you’re trying to build, grow or improve. We can help identify a useful starting point without forcing the problem into the wrong service category.</p></div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:ml-8 lg:mt-0 lg:flex-col"><a href={pathForPage('Booking')} onClick={(event) => { event.preventDefault(); trackSiteEvent('service_selection_cta_click', { action: 'discuss_requirements' }); setActivePage('Booking'); }} className="btn-light">Discuss your requirements <ArrowRight size={17} /></a><a href={pathForPage('Booking')} onClick={(event) => { event.preventDefault(); trackSiteEvent('strategy_call_cta_click', { location: 'services_final_cta' }); setActivePage('Booking'); }} className="btn-outline-dark">Book a strategy call <ArrowUpRight size={17} /></a></div>
      </div></div>
    </section>
  );
}

export default function ServicesPage({ setActivePage, posts, loading }: Props) {
  return (
    <div className="min-h-screen bg-starfield">
      <section className="hero-atmosphere pb-14 pt-32 text-white md:pb-20 md:pt-36">
        <div className="site-container">
          <nav aria-label="Breadcrumb" className="mb-9 text-sm text-white/65"><ol className="flex items-center gap-2"><li><a href="/" onClick={(event) => { event.preventDefault(); setActivePage('Home'); }} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li><li aria-hidden="true" className="text-white/35">/</li><li aria-current="page" className="text-white">Services</li></ol></nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div><span className="mb-5 block text-[11px] font-semibold uppercase tracking-[.17em] text-sky">ITGS services</span><h1 className="max-w-4xl text-balance text-[clamp(2.7rem,5.4vw,5rem)] font-semibold leading-[1.01] tracking-[-.055em] text-white">Connected expertise for every stage of digital growth.</h1></div>
            <p className="max-w-xl text-lg leading-8 text-[#d3e0ed]">Explore connected ITGS services across web and mobile development, digital experience design, search, marketing, lead generation, e-commerce and operational support.</p>
          </div>
          <nav aria-label="Service categories" className="mt-11 grid gap-3 sm:grid-cols-3">
            {serviceGroups.map((group) => <a key={group.id} href={`#${group.id}`} className="group flex min-h-16 items-center justify-between rounded-lg border border-white/15 bg-white/[.06] px-5 text-sm font-semibold text-white backdrop-blur-sm hover:border-sky/55 hover:bg-white/10"><span><span className="mr-3 text-sky">{group.number}</span>{group.title}</span><ArrowDown className="text-sky transition-transform group-hover:translate-y-1" size={17} aria-hidden="true" /></a>)}
          </nav>
        </div>
      </section>

      <ApprovedProofBar />

      <div className="bg-[#f7f8f5]"><div className="site-container">{serviceGroups.map((group) => <ServiceGroup key={group.id} group={group} setActivePage={setActivePage} />)}</div></div>

      <SolutionsSection setActivePage={setActivePage} />
      <ConnectedModelSection />
      <ApprovedCaseStudies />
      <ConceptWorkSection setActivePage={setActivePage} />
      <ApprovedIndustries />
      <ExpertiseSection />
      <WhyItgsSection />
      <InsightsSection posts={posts} loading={loading} setActivePage={setActivePage} />
      <ServicesFaq />
      <ServiceSelectionCta setActivePage={setActivePage} />
    </div>
  );
}
