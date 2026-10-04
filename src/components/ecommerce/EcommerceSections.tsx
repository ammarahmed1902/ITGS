import { Activity, ArrowRight, ArrowUpRight, BarChart3, Box, Boxes, CheckCircle2, Code2, Gauge, GitMerge, Globe2, LayoutTemplate, Mail, Map, Megaphone, MousePointerClick, PackageCheck, Search, Settings2, ShieldCheck, ShoppingBag, ShoppingCart, Store, Truck, UsersRound, Workflow } from 'lucide-react';
import type { BlogPost } from '../../domain/entities/BlogPost';
import { pathForPage, servicePath, trackSiteEvent } from '../../lib/siteNavigation';
import IconBadge from '../IconBadge';
import RelatedServicesSection from '../service-cards/RelatedServicesSection';

type Navigate = { setActivePage: (page: string) => void };

export function CommerceSystemVisual() {
  const stages = [
    ['Product & model', Box],
    ['Platform', Store],
    ['Catalog', Boxes],
    ['Customer experience', ShoppingBag],
    ['Operations', Workflow],
    ['Growth & measurement', BarChart3],
  ] as const;
  return <div role="img" aria-label="Connected commerce system spanning product, platform, catalog, customer experience, operations, growth and measurement" className="overflow-hidden rounded-xl border border-white/15 bg-[#0a2239]/90 p-5 shadow-[0_24px_60px_rgba(2,19,41,.3)] sm:p-6"><div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-sky">Connected commerce system</p><p className="mt-1 text-sm font-semibold text-white">Technology, operations and growth in context.</p></div><span className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/55">No sales guarantees</span></div><ol className="mt-5 grid gap-2 sm:grid-cols-2">{stages.map(([label, Icon], index) => <li key={label} className="flex min-h-16 items-center gap-3 rounded-lg border border-white/10 bg-white/[.04] px-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky"><Icon size={18} /></span><div><span className="block text-[10px] font-semibold text-white/65">0{index + 1}</span><span className="text-sm font-semibold text-white">{label}</span></div></li>)}</ol><div className="mt-4 flex items-center gap-3 rounded-lg bg-electric px-4 py-3 text-xs font-semibold text-white"><Activity size={17} />Evidence guides the next commerce decision.</div></div>;
}

const goals = [
  ['Launch a new online store', 'Establish the storefront, catalog, measurement and required connections.', Store],
  ['Improve an existing store', 'Address UX, performance, conversion or technical limitations.', Gauge],
  ['Expand to a marketplace', 'Prepare product data and operating workflows for an appropriate channel.', Globe2],
  ['Simplify product operations', 'Improve catalog, listing, variant or inventory processes.', Boxes],
  ['Improve discoverability', 'Strengthen relevant search, marketplace and acquisition foundations.', Search],
  ['Improve conversion', 'Reduce friction from product discovery through checkout.', MousePointerClick],
  ['Evaluate a new commerce model', 'Assess wholesale, dropshipping or additional channels without promising viability.', GitMerge],
] as const;

export function CommerceGoalsSection() {
  return <section className="section-space bg-white" aria-labelledby="commerce-goals-title"><div className="site-container"><span className="eyebrow">Start with the commerce goal</span><h2 id="commerce-goals-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">What does your commerce business need next?</h2><p className="mt-5 max-w-3xl text-lg leading-8">The right route depends on how the business sells, where products appear today, which operational constraints exist and what evidence is available.</p><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{goals.map(([title, copy, Icon]) => <article key={title} className="bg-white p-6 transition-colors hover:bg-[#f8fbff]"><IconBadge small><Icon size={21} /></IconBadge><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const pillars = [
  { label: 'Build', title: 'Commerce technology & storefronts', copy: 'Storefront development, UX, migration, integrations and search-ready foundations where supported.', icon: Code2 },
  { label: 'Operate', title: 'Marketplace & catalog operations', copy: 'Amazon, eBay, listing, catalog and inventory workflows where included and authorized.', icon: Settings2 },
  { label: 'Source & supply', title: 'Product and supplier research', copy: 'Evidence-led supplier comparison, cost analysis and operating-model support where genuinely offered.', icon: PackageCheck },
  { label: 'Grow', title: 'Discovery, conversion & lifecycle', copy: 'SEO, approved acquisition, conversion improvement and retention work tied to commerce evidence.', icon: BarChart3 },
  { label: 'Scale', title: 'Automation, analytics & expansion', copy: 'Add systems, channels, markets or operational capacity only when the data supports the decision.', icon: Workflow },
];

export function CommercePillarsSection() {
  return <section id="commerce-capabilities" className="section-space scroll-mt-28 bg-[#f7f8f5]" aria-labelledby="commerce-pillars-title"><div className="site-container"><div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><span className="eyebrow">E-commerce solutions</span><h2 id="commerce-pillars-title" className="text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">One connected commerce system.</h2></div><p className="max-w-xl text-lg leading-8 lg:justify-self-end">Storefront development, marketplace management, sourcing and growth solve different problems. The service structure keeps those responsibilities clear.</p></div><div className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{pillars.map(({ label, title, copy, icon: Icon }, index) => <article key={label} className="card p-6"><span className="text-xs font-semibold text-electric">0{index + 1} · {label}</span><Icon className="mt-6 text-electric" size={22} /><h3 className="mt-4 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const models = [
  ['Direct-to-consumer', 'Brand-owned storefronts serving customers directly.', ShoppingBag],
  ['B2B commerce', 'Wholesale, account pricing, bulk orders or business buying workflows.', UsersRound],
  ['Marketplace selling', 'Supported third-party channels with platform-specific operations.', Globe2],
  ['Multi-channel commerce', 'A storefront and marketplaces coordinated around shared product data.', NetworkIcon],
  ['Wholesale', 'Supplier, catalog, inventory and business-order workflows where included.', Boxes],
  ['Dropshipping', 'Supplier-connected order operations treated as a model, not a profit promise.', Truck],
] as const;

function NetworkIcon({ size = 22, className = '' }: { size?: number; className?: string }) {
  return <Map size={size} className={className} />;
}

export function CommerceModelsSection() {
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="commerce-models-title"><div className="site-container"><span className="eyebrow">Business models</span><h2 id="commerce-models-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Built around how you sell.</h2><p className="mt-5 max-w-3xl text-base leading-7">A direct storefront, marketplace operation, wholesale model and dropshipping workflow have different responsibilities, economics and risks.</p><div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[#c8dff3] bg-[#c8dff3] md:grid-cols-2 lg:grid-cols-3">{models.map(([title, copy, Icon]) => <article key={title} className="bg-white p-6"><Icon className="text-electric" size={22} /><h3 className="mt-5 text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

export function CommercePlatformsSection() {
  const platforms = [
    ['Shopify', 'Storefront configuration, theme or custom work, catalog, apps, analytics, search fundamentals, migration and performance where supported.'],
    ['Amazon', 'Authorized catalog, listing, content, operational monitoring and reporting work where the service is confirmed.'],
    ['eBay', 'Store setup, categorization, product information, pricing, inventory coordination and reporting where supported.'],
    ['Other commerce environments', 'Assessed against current team capability, APIs, data, migration needs and the operating model before commitment.'],
  ];
  return <section className="section-space bg-white" aria-labelledby="commerce-platforms-title"><div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">Platform architecture</span><h2 id="commerce-platforms-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Platforms matched to the commerce model.</h2><p className="mt-5 text-base leading-7">A branded storefront and a marketplace seller account are not interchangeable. Platform choice should follow the products, customer journey, operations, ownership needs and integration constraints.</p></div><div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">{platforms.map(([title, copy]) => <article key={title} className="bg-[#fafcfe] p-6"><h3 className="text-xl">{title}</h3><p className="mt-3 text-sm leading-7">{copy}</p></article>)}</div></div></section>;
}

export function StorefrontMarketplaceSection() {
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="storefront-marketplace-title"><div className="site-container"><span className="eyebrow !text-sky">Storefronts & marketplaces</span><h2 id="storefront-marketplace-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Different channels require different operating systems.</h2><div className="mt-10 grid gap-4 lg:grid-cols-3"><article className="rounded-xl border border-white/15 bg-white/[.04] p-7"><Store className="text-sky" size={23} /><h3 className="mt-5 text-2xl text-white">Storefront development</h3><p className="mt-3 text-sm leading-7 text-white/65">Store configuration or development can include product structure, responsive UX, integrations, analytics, migration, performance and ongoing maintenance where agreed.</p></article><article className="rounded-xl border border-white/15 bg-white/[.04] p-7"><Globe2 className="text-sky" size={23} /><h3 className="mt-5 text-2xl text-white">Amazon operations</h3><p className="mt-3 text-sm leading-7 text-white/65">Where offered, scope may cover account setup, catalog structure, listings, product content, marketplace discoverability, inventory coordination and reporting.</p></article><article className="rounded-xl border border-white/15 bg-white/[.04] p-7"><ShoppingCart className="text-sky" size={23} /><h3 className="mt-5 text-2xl text-white">eBay operations</h3><p className="mt-3 text-sm leading-7 text-white/65">Where offered, scope may cover store and listing setup, categorization, product data, pricing, inventory synchronization, promotions and reporting.</p></article></div><p className="mt-7 max-w-3xl text-sm leading-6 text-white/55">Marketplace rules, algorithms, account decisions, placement, competitor pricing and fees remain outside ITGS control. No Buy Box, ranking, bestseller, approval or account-standing outcome is guaranteed.</p></div></section>;
}

const sourcingFlow = ['Opportunity criteria', 'Product research', 'Supplier identification', 'Supplier comparison', 'Sample or validation process', 'Cost analysis', 'Operating decision'];

export function SourcingEconomicsSection() {
  return <section className="section-space bg-white" aria-labelledby="sourcing-title"><div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><span className="eyebrow">Product & supplier research</span><h2 id="sourcing-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">A product is not attractive until the economics work.</h2><p className="mt-5 text-base leading-7">Where sourcing support is genuinely included, product and supplier research should test assumptions rather than promise a high-margin result.</p><ol className="mt-7 grid gap-2">{sourcingFlow.map((item, index) => <li key={item} className="flex min-h-14 items-center gap-4 rounded-lg border border-border bg-[#fafcfe] px-4"><span className="text-xs font-semibold text-electric">0{index + 1}</span><span className="text-sm font-semibold text-ink">{item}</span></li>)}</ol></div><div className="rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-7"><h3 className="text-2xl">Contribution economics need context.</h3><p className="mt-3 text-sm leading-7">Supplier cost is only one input. Shipping, import or duties, marketplace fees, fulfillment, advertising, returns, competition and pricing can materially change the commercial decision.</p><div className="mt-7 grid gap-2">{['Product cost', 'Shipping & import considerations', 'Marketplace or payment fees', 'Fulfillment & operations', 'Advertising & acquisition', 'Returns & service costs', 'Estimated contribution economics'].map((item, index, items) => <div key={item} className="flex min-h-12 items-center justify-between rounded-lg border border-[#c8dff3] bg-white px-4"><span className="text-sm font-medium text-ink">{item}</span><span className="text-sm font-semibold text-electric">{index === items.length - 1 ? '=' : '−'}</span></div>)}</div><p className="mt-5 text-xs leading-5 text-steel">Supplier checks and financial analysis are limited to the agreed evidence and are not legal, manufacturing or profitability guarantees.</p></div></div></section>;
}

const uxAreas = [
  ['Navigation', 'Make product categories and routes understandable.'],
  ['Product discovery', 'Support search, filters and useful category organization.'],
  ['Product pages', 'Clarify information, imagery, options and trust.'],
  ['Cart & checkout', 'Reduce unnecessary confusion within platform constraints.'],
  ['Mobile commerce', 'Prioritize hierarchy, speed and comfortable interaction.'],
  ['Accessibility', 'Consider keyboard use, focus, labels, errors, variants and touch targets.'],
];

export function CommerceExperienceSection({ setActivePage }: Navigate) {
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="commerce-experience-title"><div className="site-container"><div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><span className="eyebrow">Customer experience & conversion</span><h2 id="commerce-experience-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Make it easier to find, decide and buy.</h2></div><p className="max-w-xl text-base leading-7 lg:justify-self-end">More traffic does not fix a weak store. Analytics, product behavior, checkout friction, mobile UX, performance and trust can reveal where the experience needs attention.</p></div><div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[#c8dff3] bg-[#c8dff3] md:grid-cols-2 lg:grid-cols-3">{uxAreas.map(([title, copy]) => <article key={title} className="bg-white p-6"><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div><div className="mt-7 flex flex-wrap gap-5"><a href={servicePath('ui-ux-design')} onClick={(event) => { event.preventDefault(); setActivePage('Service:ui-ux-design'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Explore UI/UX Design <ArrowUpRight size={16} /></a><a href={servicePath('web-development')} onClick={(event) => { event.preventDefault(); setActivePage('Service:web-development'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Explore Web Development <ArrowUpRight size={16} /></a></div></div></section>;
}

export function CommerceGrowthSection({ setActivePage }: Navigate) {
  return <section className="section-space bg-white" aria-labelledby="commerce-growth-title"><div className="site-container"><span className="eyebrow">Discovery, acquisition & retention</span><h2 id="commerce-growth-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Acquire customers beyond the storefront.</h2><div className="mt-10 grid gap-4 lg:grid-cols-3"><article className="card p-7"><Search className="text-electric" size={23} /><h3 className="mt-5 text-xl">E-commerce SEO</h3><p className="mt-3 text-sm leading-7">Category architecture, product pages, faceted navigation, canonicals, internal links, structured data, performance and discontinued-product handling can affect organic discovery.</p><a href={servicePath('seo')} onClick={(event) => { event.preventDefault(); setActivePage('Service:seo'); }} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Explore Search Engine Optimization <ArrowUpRight size={16} /></a></article><article className="card p-7"><Megaphone className="text-electric" size={23} /><h3 className="mt-5 text-xl">Commerce marketing</h3><p className="mt-3 text-sm leading-7">Where supported, search or shopping ads, paid social, remarketing and marketplace advertising should be evaluated against useful orders and acquisition economics rather than traffic alone.</p><a href={servicePath('digital-marketing')} onClick={(event) => { event.preventDefault(); setActivePage('Service:digital-marketing'); }} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Explore Digital Marketing <ArrowUpRight size={16} /></a></article><article className="card p-7"><Mail className="text-electric" size={23} /><h3 className="mt-5 text-xl">Lifecycle & retention</h3><p className="mt-3 text-sm leading-7">Welcome, cart recovery, post-purchase, replenishment and re-engagement journeys can be scoped where permissions, platform capability and the business model support them.</p></article></div></div></section>;
}

const integrations = ['Payment providers', 'CRM', 'ERP', 'Inventory', 'Shipping', 'Fulfillment', 'Email & lifecycle', 'Analytics', 'Accounting', 'Marketplace feeds'];
const catalogOps = ['SKU structure', 'Product data', 'Variants', 'Categories', 'Inventory sync', 'Catalog imports & exports', 'Marketplace synchronization'];

export function CommerceOperationsSection() {
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="commerce-operations-title"><div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20"><div><span className="eyebrow !text-sky">Systems & integrations</span><h2 id="commerce-operations-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Connect commerce with the systems behind it.</h2><p className="mt-5 text-base leading-7 text-white/65">Modern commerce depends on data moving safely between the storefront, marketplaces and operational systems. Specific platforms and integrations are confirmed only after capability and access are assessed.</p><div className="mt-7 flex flex-wrap gap-2">{integrations.map((item) => <span key={item} className="rounded-full border border-white/15 bg-white/[.04] px-3 py-2 text-xs text-white/70">{item}</span>)}</div></div><div className="rounded-xl border border-white/15 bg-white/[.04] p-7"><h3 className="text-2xl text-white">Catalog and inventory operations</h3><p className="mt-3 text-sm leading-7 text-white/65">Where included, operational work can make product information and inventory movement more consistent across approved channels.</p><ul className="mt-6 grid gap-3 sm:grid-cols-2">{catalogOps.map((item) => <li key={item} className="flex gap-3 text-sm text-white/70"><CheckCircle2 size={18} className="shrink-0 text-sky" />{item}</li>)}</ul><div className="mt-7 border-t border-white/10 pt-5"><div className="flex items-start gap-3"><ShieldCheck className="mt-1 shrink-0 text-sky" size={21} /><p className="text-xs leading-5 text-white/55">HTTPS, access controls, secure integrations, dependency maintenance, backups and privacy should be considered where relevant. Payment processing should use appropriately configured providers; no universal PCI or security certification is claimed.</p></div></div></div></div></section>;
}

const measures = [
  ['Traffic', 'Sessions and visitors in the context of their source and intent.'],
  ['Product engagement', 'Category, search, filter and product interaction where available.'],
  ['Conversion', 'Orders and conversion rate with platform and tracking limitations visible.'],
  ['Commercial', 'Revenue and average order value without treating revenue as profit.'],
  ['Acquisition', 'Customer acquisition cost and ROAS where measurement is supportable.'],
  ['Retention', 'Repeat purchase or lifetime value only where enough data exists.'],
  ['Operations', 'Stock, cancellation, fulfillment and returns where systems provide the data.'],
  ['Economics', 'Margin or contribution only when the required financial inputs are available.'],
];

export function CommerceMeasurementSection() {
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="commerce-measurement-title"><div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">Commerce analytics</span><h2 id="commerce-measurement-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Know what is actually driving commerce performance.</h2><p className="mt-5 text-base leading-7">Useful measurement connects discovery, product behavior, orders, acquisition and operations. Revenue alone can hide advertising, fulfillment, returns and product economics.</p><div className="mt-6 rounded-xl border border-border bg-white p-5"><h3 className="text-lg">Attribution has limits.</h3><p className="mt-2 text-sm leading-6">Reporting should state which systems, time periods and definitions are being used rather than presenting one dashboard as absolute truth.</p></div></div><div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">{measures.map(([title, copy]) => <article key={title} className="bg-white p-6"><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const audiences = [
  ['Brands launching e-commerce', 'Need platform, catalog, customer experience and operating foundations.'],
  ['Existing stores with friction', 'Need UX, performance, conversion or technical improvements.'],
  ['Marketplace sellers', 'Need clearer Amazon or eBay catalog and operating workflows.'],
  ['Multi-channel sellers', 'Need storefront and marketplace data coordinated.'],
  ['Wholesale businesses', 'Need B2B product, account or bulk-order workflows.'],
  ['Expanding product operations', 'Need catalog, supplier or process support around new complexity.'],
];

export function CommerceAudienceSection() {
  return <section className="section-space bg-white" aria-labelledby="commerce-audience-title"><div className="site-container"><span className="eyebrow">Who this service is for</span><h2 id="commerce-audience-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Commerce support for different operating challenges.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{audiences.map(([title, copy], index) => <article key={title} className="card p-6"><span className="text-xs font-semibold text-electric">0{index + 1}</span><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

export function CommerceOwnershipSection() {
  const ownership = ['Store and marketplace accounts', 'Domain and hosting', 'Advertising accounts', 'Analytics accounts', 'Payment-provider accounts', 'Code or theme rights as contracted', 'Credentials and access controls'];
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="commerce-ownership-title"><div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><span className="eyebrow">Ownership, access & platform risk</span><h2 id="commerce-ownership-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Build for appropriate client control.</h2><p className="mt-5 text-base leading-7">Critical commerce accounts should remain client-controlled where practical, with ITGS working through authorized access and responsibilities defined in the engagement.</p><p className="mt-5 text-sm leading-6">Platform policy, algorithms, account decisions, marketplace fees and competitor behavior remain outside ITGS control.</p></div><ul className="grid gap-3 sm:grid-cols-2">{ownership.map((item) => <li key={item} className="flex min-h-16 items-center gap-3 rounded-xl border border-[#c8dff3] bg-white px-5 text-sm font-semibold text-ink"><ShieldCheck size={19} className="shrink-0 text-electric" />{item}</li>)}</ul></div></section>;
}

const reasons = [
  ['Technology and operations together', 'Connect the storefront to the product and order processes behind it.', Workflow],
  ['Marketplace and owned-store context', 'Treat third-party channels and brand-controlled experiences differently.', Store],
  ['UX and development together', 'Move from experience findings into implementation where scoped.', Code2],
  ['SEO and acquisition connected', 'Relate demand to the category and product architecture it reaches.', Search],
  ['Measurement before expansion', 'Understand performance before adding spend, products or channels.', BarChart3],
  ['Client ownership considered', 'Define control of accounts, access and assets clearly.', ShieldCheck],
] as const;

export function WhyCommerceSection() {
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="why-commerce-title"><div className="site-container"><span className="eyebrow !text-sky">Why e-commerce with ITGS</span><h2 id="why-commerce-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Connect the buying experience with the operation behind it.</h2><div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-3">{reasons.map(([title, copy, Icon]) => <article key={title} className="bg-[#0a2239] p-7"><Icon className="text-sky" size={23} /><h3 className="mt-5 text-xl text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{copy}</p></article>)}</div></div></section>;
}

const related = [
  { id: 'web-development', title: 'Web Development', copy: 'Build custom storefront behavior and technical integrations.', icon: Code2 },
  { id: 'ui-ux-design', title: 'UI/UX Design', copy: 'Improve product discovery, decision-making and checkout journeys.', icon: LayoutTemplate },
  { id: 'seo', title: 'Search Engine Optimization', copy: 'Support category and product discoverability through search-ready structure.', icon: Search },
  { id: 'digital-marketing', title: 'Digital Marketing', copy: 'Connect customer acquisition, remarketing and lifecycle communication.', icon: Megaphone },
  { id: 'lead-generation', title: 'Lead Generation', copy: 'Support considered-purchase, wholesale or B2B commerce inquiries.', icon: UsersRound },
];

export function RelatedCommerceServices({ setActivePage }: Navigate) {
  return <RelatedServicesSection titleId="related-commerce-title" title="Capabilities connected around the commerce system." services={related.map(({ id, copy }) => ({ id, description: copy }))} source="ecommerce" setActivePage={setActivePage} />;
}

export function CommerceInsightsSection({ posts, loading, setActivePage }: { posts: BlogPost[]; loading: boolean } & Navigate) {
  const enabled = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  const visible = enabled ? posts.filter((post) => post.status === 'Published' && /commerce|shopify|amazon|ebay|marketplace|product|conversion|checkout|catalog/i.test(`${post.category} ${post.title}`)).slice(0, 3) : [];
  if (!loading && visible.length === 0) return null;
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="commerce-insights-title"><div className="site-container"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="eyebrow">E-commerce insights</span><h2 id="commerce-insights-title" className="text-[clamp(2.2rem,4vw,3.45rem)]">Guidance for better commerce decisions.</h2></div><a href={pathForPage('Blog')} onClick={(event) => { event.preventDefault(); trackSiteEvent('insight_click', { source: 'ecommerce' }); setActivePage('Blog'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Browse all insights <ArrowRight size={16} /></a></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{visible.map((post) => <article key={post.id} className="card p-6"><span className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">{post.category}</span><h3 className="mt-4 text-xl leading-7"><a href={`/insights/${post.slug}/`} className="hover:underline">{post.title}</a></h3><p className="mt-3 line-clamp-3 text-sm leading-6">{post.excerpt || post.content}</p><p className="mt-6 text-xs text-steel">{post.date} · {post.readTime}</p></article>)}</div></div></section>;
}

