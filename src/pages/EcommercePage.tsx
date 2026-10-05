import { ArrowRight, BarChart3, ChevronDown, ClipboardCheck, Search, Settings2, Store, Wrench, type LucideIcon } from 'lucide-react';
import type { BlogPost } from '../domain/entities/BlogPost';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';
import {
  ApprovedCaseStudies,
  ApprovedIndustries,
  ApprovedProofBar,
  ApprovedTestimonials,
} from '../components/home/ApprovedContentSections';
import {
  CommerceAudienceSection,
  CommerceExperienceSection,
  CommerceGoalsSection,
  CommerceGrowthSection,
  CommerceInsightsSection,
  CommerceMeasurementSection,
  CommerceModelsSection,
  CommerceOperationsSection,
  CommerceOwnershipSection,
  CommercePillarsSection,
  CommercePlatformsSection,
  CommerceSystemVisual,
  RelatedCommerceServices,
  SourcingEconomicsSection,
  StorefrontMarketplaceSection,
  WhyCommerceSection,
} from '../components/ecommerce/EcommerceSections';

type Props = { setActivePage: (page: string) => void; posts: BlogPost[]; loading: boolean };

const deliverables = [
  ['Commerce assessment', 'Technical, customer-experience and operational findings relevant to the agreed objective.'],
  ['Platform or channel recommendation', 'A reasoned platform, marketplace or operating-model recommendation where required.'],
  ['Storefront or marketplace setup', 'The approved configuration, development or operational setup included in scope.'],
  ['Product & catalog structure', 'Product data, categories, variants and listing requirements where applicable.'],
  ['Integration plan', 'Defined systems, data movement, access and ownership requirements.'],
  ['Tracking & analytics', 'Agreed commerce events, definitions, data sources and reporting limitations.'],
  ['Marketplace optimization', 'Approved content, catalog and operational improvements where included.'],
  ['Operational documentation', 'Relevant workflows, ownership and handover materials where agreed.'],
  ['Growth & optimization roadmap', 'Priorities based on customer, commerce and operational evidence.'],
];

const process: { title: string; copy: string; output: string; icon: LucideIcon }[] = [
  { title: 'Assess', copy: 'Understand the model, products, platforms, marketplaces, operations, journey, technology, goals and measurement.', output: 'Commerce assessment', icon: Search },
  { title: 'Define', copy: 'Decide channel priorities, development scope, marketplace work, operating needs, integrations and KPIs.', output: 'Commerce roadmap', icon: ClipboardCheck },
  { title: 'Build & configure', copy: 'Implement the approved storefront, listings, catalog, integrations, analytics and operational setup.', output: 'Configured commerce system', icon: Wrench },
  { title: 'Launch & operate', copy: 'Release the agreed commerce channels and establish ownership and operating workflows.', output: 'Live commerce operation', icon: Store },
  { title: 'Optimize', copy: 'Review UX, listings, traffic, conversion, product data, advertising and operational evidence.', output: 'Optimization actions', icon: Settings2 },
  { title: 'Scale carefully', copy: 'Add products, markets, channels, automation or retention activity only when evidence supports it.', output: 'Evidence-led expansion plan', icon: BarChart3 },
];

export const ECOMMERCE_FAQS = [
  { question: 'What is included in ITGS E-commerce Solutions?', answer: 'An engagement can include commerce assessment, storefront development, marketplace operations, catalog work, product or supplier research, integrations, customer experience, search, acquisition, lifecycle communication, analytics and optimization. The written scope defines the actual capabilities and outputs.' },
  { question: 'Do you build Shopify stores?', answer: 'Shopify work can be scoped around store configuration, theme or custom storefront work, catalog setup, apps and integrations, analytics, migration, search foundations, performance and maintenance where current ITGS capability supports it. Shopify Plus expertise is not claimed.' },
  { question: 'Do you manage Amazon and eBay accounts?', answer: 'Marketplace work can be considered where the required capability and operating model are confirmed. Scope may cover authorized account, catalog, listing, product information, inventory coordination, promotions and reporting without guaranteeing platform outcomes.' },
  { question: 'Can you work with an existing online store?', answer: 'Yes. An existing store can be reviewed around a defined technical, UX, conversion, catalog, integration or operational problem. Access and implementation responsibilities are agreed first.' },
  { question: 'Do you help with product sourcing?', answer: 'Product and supplier research can be scoped where genuinely supported. It may include criteria, supplier identification, comparison, samples or validation inputs and cost analysis. ITGS does not guarantee supplier performance, product demand or margins.' },
  { question: 'What is the difference between dropshipping and wholesale?', answer: 'Dropshipping commonly routes customer orders to a supplier for fulfillment without the seller holding the same inventory model. Wholesale generally involves purchasing and managing inventory for resale. Each has different cash-flow, fulfillment, control, margin and customer-experience implications.' },
  { question: 'Can ITGS integrate our store with other systems?', answer: 'Integration work can be assessed against the commerce platform, APIs, data model, security, access and operational requirements. Supported payment, CRM, inventory, shipping, fulfillment, analytics or accounting connections are confirmed in scope.' },
  { question: 'Do you provide E-commerce SEO?', answer: 'E-commerce SEO can address category architecture, product pages, faceted navigation, canonicalization, internal linking, structured data, performance and discontinued products where included. Deeper search work routes through the dedicated SEO service.' },
  { question: 'Can ITGS help improve conversion rates?', answer: 'ITGS can review analytics, product discovery, product pages, mobile behavior, cart and checkout friction, trust and performance. Findings and experiments do not guarantee a specific conversion increase.' },
  { question: 'Who owns the Shopify or marketplace accounts?', answer: 'Critical commerce, domain, payment, advertising and analytics accounts should remain client-controlled where practical. ITGS should operate through authorized access, with asset and code ownership defined contractually.' },
  { question: 'How do you measure e-commerce performance?', answer: 'Measurement can connect traffic, product engagement, orders, revenue, acquisition and operational indicators. Margin, customer value or profitability is reported only when the necessary financial and customer data is available and reliable enough.' },
  { question: 'Do you guarantee marketplace rankings, revenue or profitability?', answer: 'No. ITGS does not guarantee placement, Buy Box ownership, account standing, specific sales, revenue, ROAS, margin or profitability. Outcomes depend on products, pricing, demand, competition, platform decisions, operations and other variables.' },
];

export default function EcommercePage({ setActivePage, posts, loading }: Props) {
  const discussCommerce = (location: string) => {
    trackSiteEvent('discuss_ecommerce_goals', { location });
    setActivePage('Contact');
  };
  return <div className="bg-white">
    <section className="hero-atmosphere overflow-hidden pb-16 pt-28 text-white md:pb-20 md:pt-32 lg:pb-24"><div className="site-container"><nav className="mb-7 text-sm text-white/65" aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2"><li><a href={pathForPage('Home')} onClick={(event) => { event.preventDefault(); setActivePage('Home'); }} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li><li aria-hidden="true" className="text-white/35">/</li><li><a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); setActivePage('Services'); }} className="inline-flex min-h-11 items-center hover:text-white">Services</a></li><li aria-hidden="true" className="text-white/35">/</li><li aria-current="page" className="inline-flex min-h-11 items-center text-white">E-commerce Solutions</li></ol></nav><div className="grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16"><div className="max-w-2xl"><p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-sky">E-commerce solutions</p><h1 className="text-balance text-[clamp(2.75rem,5vw,4.8rem)] font-semibold leading-[1.03] tracking-[-.055em] text-white">E-commerce solutions built to <span className="text-sky">sell, operate and scale.</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-[#d3e0ed]">Build, manage and improve online commerce across storefronts, marketplaces, product operations and digital growth—with technology and operations working from one connected strategy.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); discussCommerce('hero'); }} className="btn-primary">Discuss your e-commerce goals <ArrowRight size={18} /></a><a href="#commerce-capabilities" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-white transition-colors hover:text-sky">Explore e-commerce capabilities <ArrowRight size={17} /></a></div></div><CommerceSystemVisual /></div></div></section>

    <ApprovedProofBar />
    <CommerceGoalsSection />
    <CommercePillarsSection />
    <CommerceModelsSection />
    <CommercePlatformsSection />
    <StorefrontMarketplaceSection />
    <SourcingEconomicsSection />
    <CommerceExperienceSection setActivePage={setActivePage} />
    <CommerceGrowthSection setActivePage={setActivePage} />
    <CommerceOperationsSection />
    <CommerceMeasurementSection />
    <ApprovedCaseStudies />

    <section className="section-space bg-[#eaf4fc]" aria-labelledby="commerce-process-title"><div className="site-container"><p className="eyebrow">Our e-commerce process</p><h2 id="commerce-process-title" className="max-w-4xl text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">A route from operating context to evidence-led improvement.</h2><ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">{process.map(({ title, copy, output, icon: Icon }, index) => <li key={title} className="relative ml-4 border-l border-[#9fc4ed] pb-2 pl-7 md:ml-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-8"><span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white md:-top-4 md:left-0">{index + 1}</span><Icon className="mb-4 mt-1 text-electric" size={22} /><h3 className="text-lg">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6">{copy}</p><p className="mt-4 text-xs font-semibold text-[#174c87]">Output: {output}</p></li>)}</ol></div></section>

    <section className="section-space border-y border-border bg-white" aria-labelledby="commerce-deliverables-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">Scope-dependent deliverables</p><h2 id="commerce-deliverables-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">What you receive.</h2><p className="mt-5 max-w-sm text-base leading-7">Technical, operational and measurement outputs shaped by the commerce model and agreed scope.</p><div className="mt-8 rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-5"><ClipboardCheck className="text-electric" size={22} /><h3 className="mt-4 text-lg">Not every engagement needs every output.</h3><p className="mt-2 text-sm leading-6">Platforms, marketplaces, product volumes, integrations, content, operations, maintenance and team ownership require confirmation.</p></div></div><ol className="border-t border-border">{deliverables.map(([title, copy], index) => <li key={title} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[44px_minmax(180px,.8fr)_1fr] sm:items-start sm:gap-5"><span className="text-xl font-medium text-steel">{String(index + 1).padStart(2, '0')}</span><h3 className="text-base">{title}</h3><p className="text-sm leading-6">{copy}</p></li>)}</ol></div></section>

    <CommerceAudienceSection />
    <ApprovedIndustries />
    <CommerceOwnershipSection />
    <WhyCommerceSection />
    <ApprovedTestimonials />
    <RelatedCommerceServices setActivePage={setActivePage} />
    <CommerceInsightsSection posts={posts} loading={loading} setActivePage={setActivePage} />

    <section className="section-space bg-white" aria-labelledby="commerce-faq-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">E-commerce FAQ</p><h2 id="commerce-faq-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Before we begin.</h2><p className="mt-5 max-w-sm text-base leading-7">Questions that clarify platforms, marketplaces, sourcing, integrations, ownership, measurement and realistic expectations.</p></div><div className="border-t border-border">{ECOMMERCE_FAQS.map(({ question, answer }) => <details key={question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} /></summary><p className="max-w-2xl pb-6 pr-10 text-sm leading-7">{answer}</p></details>)}</div></div></section>

    <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="commerce-closing-title"><div className="site-container"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Ready to improve the operation?</p><h2 id="commerce-closing-title" className="max-w-4xl text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] text-white">Build a commerce system that works beyond the storefront.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">Tell us what you sell, where you sell today and what is limiting growth or operations. We can help identify the most useful next step.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); discussCommerce('closing'); }} className="btn-primary">Discuss your e-commerce goals <ArrowRight size={18} /></a><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('contact_cta_click', { location: 'ecommerce_closing' }); setActivePage('Contact'); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10">Contact us <ArrowRight size={17} /></a></div></div></section>
  </div>;
}

