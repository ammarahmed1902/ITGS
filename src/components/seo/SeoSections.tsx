import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Blocks,
  Bot,
  Braces,
  CheckCircle2,
  CircleGauge,
  Code2,
  FileSearch,
  FileText,
  Gauge,
  GitMerge,
  Globe2,
  Link2,
  MapPin,
  MousePointerClick,
  Network,
  PanelsTopLeft,
  RefreshCw,
  Search,
  ShieldCheck,
  Target,
} from 'lucide-react';
import type { BlogPost } from '../../domain/entities/BlogPost';
import { pathForPage, servicePath, trackSiteEvent } from '../../lib/siteNavigation';
import IconBadge from '../IconBadge';
import RelatedServicesSection from '../service-cards/RelatedServicesSection';

type Navigate = { setActivePage: (page: string) => void };

export function SeoSystemVisual() {
  const steps = [
    ['Search demand', Search],
    ['Intent', Target],
    ['Architecture', Network],
    ['Technical foundation', Code2],
    ['Content & authority', FileText],
    ['Conversion & measurement', BarChart3],
  ] as const;
  return <div role="img" aria-label="SEO system connecting search demand, intent, architecture, technical foundations, content, authority, conversion and measurement" className="overflow-hidden rounded-xl border border-white/15 bg-[#0a2239]/90 p-5 shadow-[0_24px_60px_rgba(2,19,41,.3)] sm:p-6"><div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-sky">Sustainable search system</p><p className="mt-1 text-sm font-semibold text-white">Evidence moves from discovery to improvement.</p></div><span className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/55">No ranking guarantees</span></div><ol className="mt-5 grid gap-2 sm:grid-cols-2">{steps.map(([label, Icon], index) => <li key={label} className="flex min-h-16 items-center gap-3 rounded-lg border border-white/10 bg-white/[.04] px-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky"><Icon size={18} /></span><div><span className="block text-[10px] font-semibold text-white/65">0{index + 1}</span><span className="text-sm font-semibold text-white">{label}</span></div></li>)}</ol><div className="mt-4 flex items-center gap-3 rounded-lg bg-electric px-4 py-3 text-xs font-semibold text-white"><RefreshCw size={17} />Measurement informs the next priority.</div></div>;
}

const problems = [
  ['Organic traffic is declining', 'Investigate technical, content, competitive and search-environment changes before prescribing activity.', Activity],
  ['Commercial pages are not visible', 'Review intent alignment, page quality, architecture, authority and the actual search results.', Target],
  ['Important pages are not indexed', 'Examine crawling, rendering, canonicalization, internal links and indexation signals.', FileSearch],
  ['Traffic is not becoming leads', 'Assess query intent, landing-page relevance, user experience and the conversion path.', MousePointerClick],
  ['Local competitors appear first', 'Review geographic relevance, business profiles, location architecture and reputation signals.', MapPin],
  ['A redesign or migration is planned', 'Protect valuable URLs, content, internal links and measurement through the change.', GitMerge],
  ['Content is not performing', 'Reassess intent, quality, topical coverage, overlap and internal-link support.', FileText],
  ['Search experiences are changing', 'Strengthen crawlable content, clear entities, first-party expertise and genuine authority.', Bot],
] as const;

export function SeoProblemsSection() {
  return <section className="section-space bg-white" aria-labelledby="seo-problems-title"><div className="site-container"><span className="eyebrow">Start with the search problem</span><h2 id="seo-problems-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Diagnose what is limiting useful visibility.</h2><p className="mt-5 max-w-3xl text-lg leading-8">Different symptoms need different evidence. Rankings, crawling, page quality, authority and conversion can each change the right next step.</p><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{problems.map(([title, copy, Icon]) => <article key={title} className="bg-white p-6 transition-colors hover:bg-[#f8fbff]"><IconBadge small><Icon size={21} /></IconBadge><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const capabilities = [
  ['Technical SEO', 'Make important pages easier to crawl, render, understand and index.', Code2],
  ['Search & keyword strategy', 'Map relevant demand, intent and commercial priorities to the right pages.', Search],
  ['On-page SEO', 'Improve structure, relevance, metadata, internal links and information hierarchy.', PanelsTopLeft],
  ['Content strategy', 'Plan and improve content around useful questions and real search demand.', FileText],
  ['Authority building', 'Pursue relevant editorial reputation and legitimate mention opportunities.', Link2],
  ['Local SEO', 'Support geographically relevant discovery through appropriate local signals.', MapPin],
  ['Multi-market SEO', 'Assess country, language and architecture requirements where the capability is scoped.', Globe2],
  ['SEO measurement', 'Connect visibility and traffic quality to conversions where the data allows.', BarChart3],
] as const;

export function SeoSystemSection() {
  return <section id="seo-approach" className="section-space scroll-mt-28 bg-[#f7f8f5]" aria-labelledby="seo-system-title"><div className="site-container"><div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><span className="eyebrow">Connected SEO services</span><h2 id="seo-system-title" className="text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">SEO that works as a connected system.</h2></div><p className="max-w-xl text-lg leading-8 lg:justify-self-end">Sustainable visibility usually depends on several layers working together. The engagement includes only the capabilities required by the agreed objective and supported by ITGS.</p></div><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{capabilities.map(([title, copy, Icon]) => <article key={title} className="bg-white p-6"><Icon className="text-electric" size={22} /><h3 className="mt-5 text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const intentInputs = ['Search demand', 'Search intent', 'SERP composition', 'Business relevance', 'Competition', 'Customer journey', 'Existing rankings', 'Existing pages', 'Conversion potential'];
const intentOutputs = ['Search-intent map', 'Page-to-query mapping', 'Content opportunities', 'Priority roadmap'];

export function SearchIntentSection() {
  return <section className="section-space bg-white" aria-labelledby="search-intent-title"><div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><span className="eyebrow">Demand research</span><h2 id="search-intent-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Search intent before keywords.</h2><p className="mt-5 text-base leading-7">A high-volume query is not automatically valuable. Research should consider what the searcher needs, what the results reward and whether the opportunity supports a real business objective.</p><div className="mt-7 rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-6"><h3 className="text-lg">The output is a decision system.</h3><p className="mt-2 text-sm leading-6">Keywords are grouped by intent and mapped to suitable existing or proposed pages. The result should reduce duplication and guide architecture, content and measurement.</p></div></div><div className="grid gap-5 sm:grid-cols-2"><article className="rounded-xl border border-border bg-[#fafcfe] p-6"><h3 className="text-lg">Research inputs</h3><ul className="mt-5 grid gap-3">{intentInputs.map((item) => <li key={item} className="flex gap-3 text-sm text-steel"><Search size={17} className="shrink-0 text-electric" />{item}</li>)}</ul></article><article className="rounded-xl border border-border bg-white p-6"><h3 className="text-lg">Scope-dependent outputs</h3><ul className="mt-5 grid gap-4">{intentOutputs.map((item) => <li key={item} className="flex gap-3 text-sm font-medium text-ink"><CheckCircle2 size={18} className="shrink-0 text-electric" />{item}</li>)}</ul></article></div></div></section>;
}

export function SeoArchitectureSection() {
  const path = ['Homepage', 'Service hub', 'Primary service', 'Sub-service', 'Industry or solution', 'Case study or supporting content'];
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="seo-architecture-title"><div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><span className="eyebrow !text-sky">Information architecture</span><h2 id="seo-architecture-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Search visibility starts with site architecture.</h2><p className="mt-5 text-base leading-7 text-white/65">Navigation, page hierarchy, URLs, breadcrumbs, crawl paths and internal links help people and search engines understand how topics and services relate.</p><p className="mt-5 text-sm leading-6 text-white/55">Not every variation needs a page. A specialist page should have distinct intent, useful depth, real capability and a clear role in the wider site.</p></div><ol className="grid gap-2 sm:grid-cols-2">{path.map((item, index) => <li key={item} className="flex min-h-16 items-center gap-4 rounded-lg border border-white/15 bg-white/[.04] px-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky/10 text-xs font-semibold text-sky">{index + 1}</span><span className="text-sm font-semibold text-white/85">{item}</span>{index < path.length - 1 && <ArrowDown size={15} className="ml-auto text-white/25" />}</li>)}</ol></div></section>;
}

const technicalChecks = [
  ['Crawling & indexation', 'Discoverability, index coverage, crawl paths and directives.', FileSearch],
  ['Canonicals & duplicates', 'Signals for duplicate, similar or parameterized URLs.', GitMerge],
  ['Rendering & JavaScript', 'Access to meaningful content and links in rendered pages.', Braces],
  ['Internal linking', 'Contextual routes and authority flow to important pages.', Link2],
  ['Performance & mobile', 'LCP, INP, CLS, server response, assets and mobile behavior.', Gauge],
  ['Structured data', 'Accurate markup that matches visible entities and content.', Blocks],
  ['Redirects & status codes', 'Errors, legacy URLs, redirect paths and migration behavior.', RefreshCw],
  ['Sitemaps & robots', 'Crawl directives aligned with the intended indexation strategy.', Network],
] as const;

export function TechnicalSeoSection() {
  return <section className="section-space bg-white" aria-labelledby="technical-seo-title"><div className="site-container"><div className="grid gap-7 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><span className="eyebrow">Technical SEO</span><h2 id="technical-seo-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Remove barriers between important pages and search.</h2></div><div className="max-w-xl lg:justify-self-end"><p className="text-base leading-7">Technical review should prioritize issues by impact, confidence and implementation effort rather than produce a hundred-item checklist with no path to delivery.</p><p className="mt-3 text-sm leading-6">Strong Core Web Vitals support a healthy user experience, but perfect scores do not guarantee rankings.</p></div></div><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{technicalChecks.map(([title, copy, Icon]) => <article key={title} className="card p-6"><Icon className="text-electric" size={22} /><h3 className="mt-5 text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const contentFlow = ['Demand research', 'Intent mapping', 'Gap analysis', 'Page strategy', 'Brief or optimization', 'Internal linking', 'Performance review'];

export function OnPageContentSection() {
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="content-strategy-title"><div className="site-container"><div className="grid gap-12 lg:grid-cols-2 lg:gap-20"><div><span className="eyebrow">On-page SEO & content</span><h2 id="content-strategy-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Build content around demand, not publishing quotas.</h2><p className="mt-5 text-base leading-7">Commercial pages should answer relevant buying intent and support action. Informational content should deepen useful coverage, answer real questions and create natural routes to appropriate services.</p><ol className="mt-7 grid gap-2 sm:grid-cols-2">{contentFlow.map((item, index) => <li key={item} className="flex min-h-14 items-center gap-3 rounded-lg border border-[#c8dff3] bg-white/70 px-4"><span className="text-xs font-semibold text-electric">0{index + 1}</span><span className="text-sm font-semibold text-ink">{item}</span></li>)}</ol></div><div className="grid gap-4"><article className="rounded-xl border border-[#c8dff3] bg-white p-6"><h3 className="text-xl">On-page decisions</h3><p className="mt-3 text-sm leading-7">Search intent, titles, headings, topic coverage, hierarchy, internal links, image context, structured content, conversion relevance and duplicate intent all matter. This is not a keyword-density exercise.</p></article><article className="rounded-xl border border-[#c8dff3] bg-white p-6"><h3 className="text-xl">Refresh before adding volume</h3><p className="mt-3 text-sm leading-7">Declining or outdated pages may need consolidation, clearer focus, stronger evidence, updated information or better internal links before new content is justified.</p></article><article className="rounded-xl border border-[#c8dff3] bg-white p-6"><h3 className="text-xl">Resolve cannibalization deliberately</h3><p className="mt-3 text-sm leading-7">When pages compete for the same intent, the right action may be to consolidate, differentiate, redirect, reposition or change internal links—not create another near-duplicate page.</p></article></div></div></div></section>;
}

export function MarketVisibilitySection() {
  return <section className="section-space bg-white" aria-labelledby="market-visibility-title"><div className="site-container"><span className="eyebrow">Local, multi-market & emerging discovery</span><h2 id="market-visibility-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Adapt search strategy to the market and discovery experience.</h2><div className="mt-10 grid gap-4 lg:grid-cols-3"><article className="card p-7"><MapPin className="text-electric" size={23} /><h3 className="mt-5 text-xl">Local SEO</h3><p className="mt-3 text-sm leading-7">Where included, local work can cover business profiles, local intent, location pages, information consistency, reputation signals, citations, local markup, links and multi-location structure.</p></article><article className="card p-7"><Globe2 className="text-electric" size={23} /><h3 className="mt-5 text-xl">International & multi-market SEO</h3><p className="mt-3 text-sm leading-7">Where capability and scope are confirmed, market work can consider country and language architecture, localization, hreflang, regional demand and search behavior. A translated page alone is not an international strategy.</p></article><article className="card p-7"><Bot className="text-electric" size={23} /><h3 className="mt-5 text-xl">AI-assisted search visibility</h3><p className="mt-3 text-sm leading-7">Clear entities, useful first-party expertise, crawlable content, structured information and genuine authority can support modern discovery. No formula or placement in an AI answer can be guaranteed.</p></article></div></div></section>;
}

export function AuthorityEthicsSection() {
  const avoid = ['Mass directory spam', 'Private blog networks', 'Automated irrelevant links', 'Guest-post farms', 'Manipulative anchor patterns', 'Low-quality paid placements'];
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="authority-title"><div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><span className="eyebrow !text-sky">Authority & search risk</span><h2 id="authority-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Build authority without chasing link counts.</h2><p className="mt-5 text-base leading-7 text-white/65">Relevant editorial coverage, useful resources, original research, expert contributions, legitimate partnerships and reclaimed mentions can strengthen reputation when they fit the business.</p><p className="mt-5 text-sm leading-6 text-white/55">Authority work should prioritize relevance, editorial quality and long-term brand value. No fixed quantity or placement is promised.</p></div><div className="rounded-xl border border-white/15 bg-white/[.04] p-7"><div className="flex items-center gap-3"><ShieldCheck className="text-sky" size={23} /><h3 className="text-xl text-white">Avoid tactics that create long-term search risk.</h3></div><ul className="mt-6 grid gap-3 sm:grid-cols-2">{avoid.map((item) => <li key={item} className="flex gap-3 text-sm text-white/70"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-sky" />{item}</li>)}</ul><p className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-white/55">AI tools may assist appropriate workflows, but production content should be reviewed for accuracy, originality, usefulness, intent, brand context and factual support.</p></div></div></section>;
}

export function SeoMigrationSection({ setActivePage }: Navigate) {
  const steps = ['Benchmark current visibility', 'Inventory valuable URLs', 'Map redirects', 'Preserve useful content', 'Validate canonicals & metadata', 'Update internal links', 'Test staging', 'Launch & monitor'];
  return <section className="section-space bg-white" aria-labelledby="seo-migration-title"><div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">SEO migration & redesign</span><h2 id="seo-migration-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Protect organic visibility during major website changes.</h2><p className="mt-5 text-base leading-7">Redesigns, platform changes and URL restructuring can create avoidable search loss when search evidence enters the project too late.</p><a href={servicePath('web-development')} onClick={(event) => { event.preventDefault(); trackSiteEvent('web_development_link', { source: 'seo_migration' }); setActivePage('Service:web-development'); }} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">See our Web Development services <ArrowUpRight size={16} /></a></div><ol className="grid gap-2 sm:grid-cols-2">{steps.map((item, index) => <li key={item} className="flex min-h-16 items-center gap-4 rounded-lg border border-border bg-[#fafcfe] px-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#eaf3ff] text-xs font-semibold text-electric">{index + 1}</span><span className="text-sm font-semibold text-ink">{item}</span></li>)}</ol></div></section>;
}

const measures = [
  ['Visibility', 'Impressions, relevant ranking distribution and share of appropriate search visibility.'],
  ['Engagement', 'Organic landing sessions and useful behavior on the pages that matter.'],
  ['Conversions', 'Forms, calls, bookings, purchases or other agreed actions.'],
  ['Commercial performance', 'Qualified leads, pipeline or organic revenue only where measurement supports the relationship.'],
];

export function SeoMeasurementSection() {
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="seo-measurement-title"><div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><span className="eyebrow">Measurement & reporting</span><h2 id="seo-measurement-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Rankings matter. Business outcomes matter more.</h2><p className="mt-5 text-base leading-7">Rankings are useful diagnostic indicators. A useful measurement model also considers traffic quality, conversion and commercial outcomes where the data supports attribution.</p><div className="mt-6 rounded-xl border border-border bg-white p-5"><h3 className="text-lg">Understand what changed and why.</h3><p className="mt-2 text-sm leading-6">Reporting should cover work completed, technical issues, visibility, landing pages, conversion performance and next priorities. Brand and non-brand discovery can be separated where appropriate.</p></div></div><ol className="space-y-3">{measures.map(([title, copy], index) => <li key={title} className="grid gap-3 rounded-xl border border-border bg-white p-6 sm:grid-cols-[48px_1fr]"><span className="flex size-10 items-center justify-center rounded-full bg-[#eaf3ff] text-sm font-semibold text-electric">{index + 1}</span><div><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></div></li>)}</ol></div></section>;
}

export function SeoImplementationSection({ setActivePage }: Navigate) {
  const flow = ['SEO identifies the issue', 'Requirement is documented', 'Development implements', 'SEO validates', 'Performance is monitored'];
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="seo-implementation-title"><div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><span className="eyebrow">Implementation ownership</span><h2 id="seo-implementation-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">SEO recommendations that can actually ship.</h2><p className="mt-5 text-base leading-7">Many sound recommendations fail at implementation. Where development is included, search requirements can move from diagnosis into code and then back through validation.</p><a href={servicePath('web-development')} onClick={(event) => { event.preventDefault(); trackSiteEvent('technical_seo_link', { destination: 'web_development' }); setActivePage('Service:web-development'); }} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Connect SEO with development <ArrowUpRight size={16} /></a></div><ol className="grid gap-3">{flow.map((item, index) => <li key={item} className="flex min-h-16 items-center gap-4 rounded-xl border border-[#c8dff3] bg-white/80 px-5"><span className="text-sm font-semibold text-electric">0{index + 1}</span><span className="font-semibold text-ink">{item}</span>{index < flow.length - 1 && <ArrowDown className="ml-auto text-[#7aa6d8]" size={16} />}</li>)}</ol></div></section>;
}

const audiences = [
  ['Visibility without growth', 'Need better intent alignment, page quality and conversion context.'],
  ['Organic traffic decline', 'Need diagnosis before broad changes or content production.'],
  ['Growing websites', 'Need architecture and internal linking that can scale.'],
  ['Local or multi-location teams', 'Need stronger local relevance and consistent location structure.'],
  ['Redesigning or migrating', 'Need search evidence protected through major website change.'],
  ['Marketing teams', 'Need technical SEO support that can work with development.'],
];

export function SeoAudienceSection() {
  return <section className="section-space bg-white" aria-labelledby="seo-audience-title"><div className="site-container"><span className="eyebrow">Who this service is for</span><h2 id="seo-audience-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">SEO support for different search challenges.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{audiences.map(([title, copy], index) => <article key={title} className="card p-6"><span className="text-xs font-semibold text-electric">0{index + 1}</span><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const reasons = [
  ['SEO and development connected', 'Move technical recommendations closer to implementation and validation.', Code2],
  ['Architecture before content volume', 'Build the right page relationships before adding unnecessary content.', Network],
  ['Intent before keywords', 'Choose opportunities around what customers actually need and the business can serve.', Target],
  ['Evidence before activity', 'Use search, technical and conversion evidence to set priorities.', FileSearch],
  ['Sustainable authority', 'Favor relevance, editorial value and reputation over link quantity.', ShieldCheck],
  ['Measurement beyond rankings', 'Connect search indicators to useful actions where attribution permits.', CircleGauge],
] as const;

export function WhySeoSection() {
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="why-seo-title"><div className="site-container"><span className="eyebrow !text-sky">Why SEO with ITGS</span><h2 id="why-seo-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Search strategy connected to the website that must support it.</h2><div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-3">{reasons.map(([title, copy, Icon]) => <article key={title} className="bg-[#0a2239] p-7"><Icon className="text-sky" size={23} /><h3 className="mt-5 text-xl text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{copy}</p></article>)}</div></div></section>;
}

const related = [
  { id: 'web-development', title: 'Web Development', copy: 'Implement technical fixes and build search-ready information architecture.', icon: Code2 },
  { id: 'ui-ux-design', title: 'UI/UX Design', copy: 'Improve landing-page clarity, journeys and usability around search intent.', icon: PanelsTopLeft },
  { id: 'digital-marketing', title: 'Digital Marketing', copy: 'Connect organic discovery with the wider acquisition and lifecycle system.', icon: BarChart3 },
  { id: 'lead-generation', title: 'Lead Generation', copy: 'Turn relevant search demand into useful inquiry and follow-up journeys.', icon: Target },
  { id: 'e-commerce', title: 'E-commerce Solutions', copy: 'Coordinate search architecture with product discovery and commerce operations.', icon: Blocks },
];

export function RelatedSeoServices({ setActivePage }: Navigate) {
  return <RelatedServicesSection titleId="related-seo-title" title="Connect search strategy with delivery." services={related.map(({ id, copy }) => ({ id, description: copy }))} source="seo" setActivePage={setActivePage} />;
}

export function SeoInsightsSection({ posts, loading, setActivePage }: { posts: BlogPost[]; loading: boolean } & Navigate) {
  const enabled = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  const visible = enabled ? posts.filter((post) => post.status === 'Published' && /seo|search|keyword|migration|index|core web vital|content/i.test(`${post.category} ${post.title}`)).slice(0, 3) : [];
  if (!loading && visible.length === 0) return null;
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="seo-insights-title"><div className="site-container"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="eyebrow">SEO insights</span><h2 id="seo-insights-title" className="text-[clamp(2.2rem,4vw,3.45rem)]">Guidance for stronger search decisions.</h2></div><a href={pathForPage('Blog')} onClick={(event) => { event.preventDefault(); trackSiteEvent('insight_click', { source: 'seo' }); setActivePage('Blog'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Browse all insights <ArrowRight size={16} /></a></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{visible.map((post) => <article key={post.id} className="card p-6"><span className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">{post.category}</span><h3 className="mt-4 text-xl leading-7"><a href={`/insights/${post.slug}/`} className="hover:underline">{post.title}</a></h3><p className="mt-3 line-clamp-3 text-sm leading-6">{post.excerpt || post.content}</p><p className="mt-6 text-xs text-steel">{post.date} · {post.readTime}</p></article>)}</div></div></section>;
}

