import { ArrowRight, BarChart3, CheckCircle2, ChevronDown, Code2, FileSearch, Link2, RefreshCw, Target, type LucideIcon } from 'lucide-react';
import type { BlogPost } from '../domain/entities/BlogPost';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';
import {
  ApprovedCaseStudies,
  ApprovedIndustries,
  ApprovedProofBar,
  ApprovedTestimonials,
} from '../components/home/ApprovedContentSections';
import {
  AuthorityEthicsSection,
  MarketVisibilitySection,
  OnPageContentSection,
  RelatedSeoServices,
  SearchIntentSection,
  SeoArchitectureSection,
  SeoAudienceSection,
  SeoImplementationSection,
  SeoInsightsSection,
  SeoMeasurementSection,
  SeoMigrationSection,
  SeoProblemsSection,
  SeoSystemSection,
  SeoSystemVisual,
  TechnicalSeoSection,
  WhySeoSection,
} from '../components/seo/SeoSections';

type Props = { setActivePage: (page: string) => void; posts: BlogPost[]; loading: boolean };

const deliverables = [
  ['SEO audit', 'Technical, content, architecture and measurement findings prioritized by likely value.'],
  ['Search-intent map', 'Relevant search demand grouped by intent and mapped to suitable pages.'],
  ['SERP & competitor analysis', 'A review of actual search competitors, result formats and meaningful gaps.'],
  ['Technical roadmap', 'Developer-ready priorities covering the agreed technical search scope.'],
  ['Content architecture', 'Recommendations for existing, consolidated or new pages and their relationships.'],
  ['On-page optimization', 'Approved changes to page structure, metadata, content and internal links.'],
  ['Content briefs', 'Evidence-led page guidance when content creation is included.'],
  ['Local or authority plan', 'Market and reputation work only where explicitly included and supported.'],
  ['Measurement framework', 'Agreed indicators, conversions, data sources and reporting limitations.'],
  ['Optimization roadmap', 'Next priorities based on new technical, search and conversion evidence.'],
];

const process: { title: string; copy: string; output: string; icon: LucideIcon }[] = [
  { title: 'Diagnose', copy: 'Audit technical health, architecture, content, search demand, competitors, analytics and available authority evidence.', output: 'SEO opportunity assessment', icon: FileSearch },
  { title: 'Prioritize', copy: 'Map intent, page opportunities, technical work, content gaps and commercial importance.', output: 'SEO roadmap', icon: Target },
  { title: 'Implement', copy: 'Execute or coordinate technical fixes, page optimization, content improvement and internal linking.', output: 'Implemented improvements', icon: Code2 },
  { title: 'Build coverage', copy: 'Strengthen topical depth, useful content, relevant mentions and appropriate local or entity signals.', output: 'Expanded search footprint', icon: Link2 },
  { title: 'Measure', copy: 'Evaluate visibility, traffic quality, conversions and business performance where measurable.', output: 'Performance analysis', icon: BarChart3 },
  { title: 'Improve', copy: 'Use new search and conversion evidence to select the next useful iteration.', output: 'Updated priorities', icon: RefreshCw },
];

export const SEO_FAQS = [
  { question: 'What is included in ITGS SEO services?', answer: 'An engagement can include technical SEO, search-intent research, information architecture, on-page optimization, content strategy, internal linking, local or multi-market considerations, authority planning, migration support and measurement. The written scope defines the actual capabilities and outputs included.' },
  { question: 'How long does SEO take?', answer: 'Timing depends on the site, technical condition, implementation speed, market demand, competition, content and available authority. Technical corrections can sometimes change search behavior sooner, while competitive commercial visibility usually requires sustained work. No universal timeline is promised.' },
  { question: 'How much do SEO services cost?', answer: 'Cost depends on site size, technical complexity, markets, content needs, implementation ownership, authority work, reporting and engagement cadence. A useful estimate follows an initial scope discussion.' },
  { question: 'Can ITGS guarantee first-page or number-one rankings?', answer: 'No. Search positions depend on competition, website condition, market demand, search-engine changes, implementation and other factors outside any provider’s control. ITGS does not guarantee a specific ranking, traffic level, lead volume or AI citation.' },
  { question: 'How do you choose which searches to target?', answer: 'Opportunities are assessed using intent, business relevance, result composition, competition, existing visibility, customer journey, page quality and conversion potential. High volume alone is not enough.' },
  { question: 'Do you provide technical SEO?', answer: 'Technical SEO can include crawling, indexation, canonicals, rendering, internal links, performance, mobile behavior, structured data, redirects, status codes, sitemaps and robots directives when included in scope.' },
  { question: 'Do you provide Local SEO?', answer: 'Local SEO can be scoped for relevant businesses and may cover business profiles, local demand, location pages, information consistency, reputation signals, citations, markup, links and multi-location architecture.' },
  { question: 'Can you help during a website redesign or migration?', answer: 'Yes. Migration support can include benchmarking, URL inventory, redirect mapping, content preservation, metadata and canonical review, internal-link updates, staging checks, launch validation and post-launch monitoring.' },
  { question: 'How do you build backlinks and authority?', answer: 'The approach favors relevant editorial quality, useful resources, research, expert contribution, legitimate partnerships, high-quality outreach and mention reclamation where appropriate. ITGS does not promise link quantities or use manipulative schemes.' },
  { question: 'How do you measure SEO performance?', answer: 'Measurement can cover relevant visibility, landing-page engagement, conversions and commercial outcomes where the data supports attribution. Reporting should explain what changed, why it matters and what is being prioritized next.' },
  { question: 'Can ITGS implement technical SEO fixes?', answer: 'Implementation can be included or coordinated when the development scope and access allow it. Requirements, ownership, validation and monitoring responsibilities are confirmed for the engagement.' },
  { question: 'How does SEO work with AI-powered search?', answer: 'Clear entities, technically accessible content, useful first-party expertise, structured information and genuine authority can support modern discovery. There is no guaranteed formula for being cited or surfaced by an AI system.' },
];

export default function SeoPage({ setActivePage, posts, loading }: Props) {
  const discussSeo = (location: string) => {
    trackSiteEvent('discuss_seo_goals', { location });
    setActivePage('Booking');
  };
  return <div className="bg-white">
    <section className="hero-atmosphere overflow-hidden pb-16 pt-28 text-white md:pb-20 md:pt-32 lg:pb-24"><div className="site-container"><nav className="mb-7 text-sm text-white/65" aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2"><li><a href={pathForPage('Home')} onClick={(event) => { event.preventDefault(); setActivePage('Home'); }} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li><li aria-hidden="true" className="text-white/35">/</li><li><a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); setActivePage('Services'); }} className="inline-flex min-h-11 items-center hover:text-white">Services</a></li><li aria-hidden="true" className="text-white/35">/</li><li aria-current="page" className="inline-flex min-h-11 items-center text-white">Search Engine Optimization</li></ol></nav><div className="grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16"><div className="max-w-2xl"><p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-sky">SEO services</p><h1 className="text-balance text-[clamp(2.75rem,5vw,4.8rem)] font-semibold leading-[1.03] tracking-[-.055em] text-white">Search Engine Optimization built around <span className="text-sky">sustainable visibility.</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-[#d3e0ed]">Improve how customers discover your business through technical SEO, search-intent research, content architecture, on-page optimization, legitimate authority building and continuous measurement.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"><a href={pathForPage('Booking')} onClick={(event) => { event.preventDefault(); discussSeo('hero'); }} className="btn-primary">Discuss your SEO goals <ArrowRight size={18} /></a><a href="#seo-approach" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-white transition-colors hover:text-sky">Explore our SEO approach <ArrowRight size={17} /></a></div></div><SeoSystemVisual /></div></div></section>

    <ApprovedProofBar />
    <SeoProblemsSection />
    <SeoSystemSection />
    <SearchIntentSection />
    <SeoArchitectureSection />
    <TechnicalSeoSection />
    <OnPageContentSection />
    <MarketVisibilitySection />
    <AuthorityEthicsSection />
    <SeoMigrationSection setActivePage={setActivePage} />
    <ApprovedCaseStudies />
    <SeoMeasurementSection />

    <section className="section-space border-y border-border bg-white" aria-labelledby="seo-deliverables-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">Scope-dependent deliverables</p><h2 id="seo-deliverables-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">What you receive.</h2><p className="mt-5 max-w-sm text-base leading-7">Evidence, implementation requirements and decision-making outputs shaped by the site, market and agreed scope.</p><div className="mt-8 rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-5"><CheckCircle2 className="text-electric" size={22} /><h3 className="mt-4 text-lg">Not every project needs every output.</h3><p className="mt-2 text-sm leading-6">Markets, pages, content volume, authority work, implementation, reporting and team responsibilities are confirmed before delivery.</p></div></div><ol className="border-t border-border">{deliverables.map(([title, copy], index) => <li key={title} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[44px_minmax(180px,.8fr)_1fr] sm:items-start sm:gap-5"><span className="text-xl font-medium text-steel">{String(index + 1).padStart(2, '0')}</span><h3 className="text-base">{title}</h3><p className="text-sm leading-6">{copy}</p></li>)}</ol></div></section>

    <section className="section-space bg-[#eaf4fc]" aria-labelledby="seo-process-title"><div className="site-container"><p className="eyebrow">Our SEO process</p><h2 id="seo-process-title" className="max-w-3xl text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">An iterative cycle from diagnosis to improvement.</h2><ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">{process.map(({ title, copy, output, icon: Icon }, index) => <li key={title} className="relative ml-4 border-l border-[#9fc4ed] pb-2 pl-7 md:ml-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-8"><span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white md:-top-4 md:left-0">{index + 1}</span><Icon className="mb-4 mt-1 text-electric" size={22} /><h3 className="text-lg">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6">{copy}</p><p className="mt-4 text-xs font-semibold text-[#174c87]">Output: {output}</p></li>)}</ol></div></section>

    <SeoImplementationSection setActivePage={setActivePage} />
    <section className="section-space bg-[#f7f8f5]" aria-labelledby="seo-first-stage-title"><div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">Beginning the engagement</span><h2 id="seo-first-stage-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">What the early work may include.</h2><p className="mt-5 text-base leading-7">A typical opening sequence moves from access and benchmarking into audit, priorities, critical fixes, page or content work and measurement. It is a planning model, not a ranking promise.</p></div><ol className="grid gap-2 sm:grid-cols-2">{['Access & benchmarking', 'Technical & content audit', 'Opportunity prioritization', 'Critical fixes', 'Page & content implementation', 'Authority or local work', 'Measurement & iteration'].map((item, index) => <li key={item} className="flex min-h-14 items-center gap-3 rounded-lg border border-border bg-white px-4"><span className="text-xs font-semibold text-electric">0{index + 1}</span><span className="text-sm font-semibold text-ink">{item}</span></li>)}</ol></div></section>
    <SeoAudienceSection />
    <ApprovedIndustries />
    <WhySeoSection />
    <ApprovedTestimonials />
    <RelatedSeoServices setActivePage={setActivePage} />
    <SeoInsightsSection posts={posts} loading={loading} setActivePage={setActivePage} />

    <section className="section-space bg-white" aria-labelledby="seo-faq-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">Search Engine Optimization FAQ</p><h2 id="seo-faq-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Before we begin.</h2><p className="mt-5 max-w-sm text-base leading-7">Questions that clarify scope, expectations, technical work, authority, measurement and implementation.</p></div><div className="border-t border-border">{SEO_FAQS.map(({ question, answer }) => <details key={question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} /></summary><p className="max-w-2xl pb-6 pr-10 text-sm leading-7">{answer}</p></details>)}</div></div></section>

    <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="seo-closing-title"><div className="site-container"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Ready to understand the constraint?</p><h2 id="seo-closing-title" className="max-w-4xl text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] text-white">Find what is limiting your search visibility.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">Tell us what you are trying to rank for, what has changed or where organic performance is falling short. We can help identify a useful next step based on the available evidence.</p><div className="mt-8"><a href={pathForPage('Booking')} onClick={(event) => { event.preventDefault(); discussSeo('closing'); }} className="btn-primary">Discuss your SEO goals <ArrowRight size={18} /></a></div></div></section>
  </div>;
}

