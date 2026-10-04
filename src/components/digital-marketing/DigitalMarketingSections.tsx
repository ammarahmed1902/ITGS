import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Blocks,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  FileText,
  Gauge,
  LayoutTemplate,
  Mail,
  Megaphone,
  MessageSquareText,
  MousePointerClick,
  Network,
  PanelsTopLeft,
  Search,
  Settings2,
  Share2,
  Target,
  UsersRound,
} from 'lucide-react';
import type { BlogPost } from '../../domain/entities/BlogPost';
import { pathForPage, servicePath, trackSiteEvent } from '../../lib/siteNavigation';
import IconBadge from '../IconBadge';
import RelatedServicesSection from '../service-cards/RelatedServicesSection';

type Navigate = { setActivePage: (page: string) => void };

export function MarketingSystemVisual() {
  const stages = [
    ['Audience', UsersRound],
    ['Strategy', Target],
    ['Channels', Network],
    ['Experience', LayoutTemplate],
    ['Conversion', MousePointerClick],
    ['Measurement', BarChart3],
  ] as const;
  return <div role="img" aria-label="Connected marketing model from audience and strategy through channels, digital experience, conversion and measurement" className="overflow-hidden rounded-xl border border-white/15 bg-[#0a2239]/90 p-5 shadow-[0_24px_60px_rgba(2,19,41,.3)] sm:p-6"><div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-sky">Connected marketing system</p><p className="mt-1 text-sm font-semibold text-white">One customer journey, coordinated decisions.</p></div><span className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/55">No performance claims</span></div><ol className="mt-5 grid gap-2 sm:grid-cols-2">{stages.map(([label, Icon], index) => <li key={label} className="flex min-h-16 items-center gap-3 rounded-lg border border-white/10 bg-white/[.04] px-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky"><Icon size={18} /></span><div><span className="block text-[10px] font-semibold text-white/65">0{index + 1}</span><span className="text-sm font-semibold text-white">{label}</span></div></li>)}</ol><div className="mt-4 flex items-center gap-3 rounded-lg bg-electric px-4 py-3 text-xs font-semibold text-white"><Activity size={17} />Evidence returns to the next decision.</div></div>;
}

const goals = [
  ['Generate qualified demand', 'Create more opportunities from relevant audiences and useful offers.', Target],
  ['Reduce acquisition waste', 'Improve targeting, campaign structure and the journey after the click.', CircleDollarSign],
  ['Launch or grow a product', 'Coordinate awareness, education and demand around a defined offering.', Megaphone],
  ['Turn traffic into leads', 'Improve landing experiences, forms, proof and follow-up paths.', MousePointerClick],
  ['Nurture existing prospects', 'Use relevant content and lifecycle communication to maintain engagement.', Mail],
  ['Improve marketing visibility', 'Establish clearer tracking, reporting and decision-making.', BarChart3],
] as const;

export function MarketingGoalsSection() {
  return <section className="section-space bg-white" aria-labelledby="marketing-goals-title"><div className="site-container"><span className="eyebrow">Start with the business goal</span><h2 id="marketing-goals-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Choose the problem before choosing the channel.</h2><p className="mt-5 max-w-3xl text-lg leading-8">The right marketing mix depends on the business model, customer journey, current demand, goals, budget, evidence and competitive context.</p><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{goals.map(([title, copy, Icon]) => <article key={title} className="bg-white p-7 transition-colors hover:bg-[#f8fbff]"><IconBadge><Icon size={24} /></IconBadge><h3 className="mt-6 text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const capabilities = [
  ['Performance marketing', 'Plan and manage agreed acquisition campaigns around audience, offer, landing experience and conversion signals.', Gauge],
  ['Content strategy', 'Plan useful content around customer questions, buying stages, campaigns and commercial priorities.', FileText],
  ['Social media marketing', 'Define the appropriate organic or paid social scope rather than assuming every platform is required.', Share2],
  ['Email & lifecycle marketing', 'Support nurture, onboarding, education, follow-up or re-engagement where appropriate.', Mail],
  ['Marketing automation', 'Connect triggers, audiences, messages, actions and agreed CRM or platform updates.', Settings2],
  ['Conversion optimization', 'Review landing-page clarity, forms, message match, proof, mobile UX and journey friction.', MousePointerClick],
  ['Analytics & measurement', 'Define useful events, KPIs, reporting and the limits of available attribution.', BarChart3],
] as const;

export function MarketingCapabilitiesSection({ setActivePage }: Navigate) {
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="marketing-capabilities-title"><div className="site-container"><div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><span className="eyebrow">Digital marketing services</span><h2 id="marketing-capabilities-title" className="text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">One strategy. The right mix of channels.</h2></div><p className="max-w-xl text-lg leading-8 lg:justify-self-end">Every engagement uses the capabilities required by the agreed objective. A long channel list is not a strategy.</p></div><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{capabilities.map(([title, copy, Icon]) => <article key={title} className="bg-white p-6"><Icon className="text-electric" size={22} /><h3 className="mt-5 text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div><a href={servicePath('seo')} onClick={(event) => { event.preventDefault(); trackSiteEvent('seo_service_click', { source: 'digital_marketing' }); setActivePage('Service:seo'); }} className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Explore Search Engine Optimization <ArrowUpRight size={16} /></a></div></section>;
}

const journey = [
  ['Discover', 'Awareness, relevant search visibility, social, content and paid reach.'],
  ['Evaluate', 'Educational content, landing experiences, proof and appropriate retargeting.'],
  ['Convert', 'Offers, forms, bookings, purchases and a clear sales or service handoff.'],
  ['Nurture', 'Useful lifecycle communication, follow-up and relevant content.'],
  ['Retain & grow', 'Customer communication, education and appropriate repeat journeys.'],
];

export function CustomerJourneySection() {
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="customer-journey-title"><div className="site-container"><span className="eyebrow">Customer journey</span><h2 id="customer-journey-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Marketing across the customer journey.</h2><p className="mt-5 max-w-3xl text-lg leading-8">Channels can support different stages depending on the customer, offer and business. The purpose of this model is coordination, not a rigid funnel.</p><ol className="mt-11 grid gap-6 lg:grid-cols-5 lg:gap-3">{journey.map(([title, copy], index) => <li key={title} className="relative ml-4 border-l border-[#9fc4ed] pb-2 pl-7 lg:ml-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pt-8"><span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white lg:-top-4 lg:left-0">{index + 1}</span><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></li>)}</ol></div></section>;
}

const audienceInputs = ['Existing customer data', 'Sales conversations', 'CRM evidence', 'Search behavior', 'Analytics', 'Campaign history', 'Competitor positioning', 'Audience research'];
const audienceOutputs = ['Audience priorities', 'Messaging hypotheses', 'Channel opportunities', 'Customer journey', 'Measurement plan'];

export function AudienceResearchSection() {
  return <section className="section-space bg-white" aria-labelledby="audience-research-title"><div className="site-container grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20"><div><span className="eyebrow">Audience & market understanding</span><h2 id="audience-research-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Understand the customer before buying their attention.</h2><p className="mt-5 text-base leading-7">Available evidence should shape the audience, message and channel choices. Research activities vary by business, data access and engagement scope.</p></div><div className="grid gap-5 sm:grid-cols-2"><article className="rounded-xl border border-border bg-[#fafcfe] p-6"><h3 className="text-lg">Potential inputs</h3><ul className="mt-5 grid gap-3">{audienceInputs.map((item) => <li key={item} className="flex gap-3 text-sm text-steel"><CheckCircle2 size={18} className="shrink-0 text-electric" />{item}</li>)}</ul></article><article className="rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-6"><h3 className="text-lg">Potential outputs</h3><ul className="mt-5 grid gap-3">{audienceOutputs.map((item) => <li key={item} className="flex gap-3 text-sm text-steel"><ClipboardList size={18} className="shrink-0 text-electric" />{item}</li>)}</ul><p className="mt-5 border-t border-[#cfe0f5] pt-4 text-xs leading-5 text-steel">Outputs depend on the agreed strategy scope and evidence available.</p></article></div></div></section>;
}

export function ConnectedMarketingSection() {
  const steps = ['Audience research', 'Strategy', 'Content & creative', 'Channel execution', 'Website or landing experience', 'Conversion & lead handling', 'Analytics', 'Optimization'];
  return <section id="marketing-approach" className="section-space scroll-mt-28 bg-[#071b2f] text-white" aria-labelledby="connected-marketing-title"><div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow !text-sky">The connected ITGS model</span><h2 id="connected-marketing-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Marketing works through a connected system.</h2><p className="mt-5 text-base leading-7 text-white/65">Campaign performance can be constrained by the website, user experience, tracking or lead follow-up—not only by channel settings. The relevant layer should be identified before more activity is added.</p></div><ol className="grid gap-2 sm:grid-cols-2">{steps.map((step, index) => <li key={step} className="flex min-h-16 items-center gap-4 rounded-lg border border-white/15 bg-white/[.04] px-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky/10 text-xs font-semibold text-sky">{index + 1}</span><span className="text-sm font-semibold text-white/85">{step}</span>{index < steps.length - 1 && <ArrowDown className="ml-auto text-white/25" size={15} />}</li>)}</ol></div></section>;
}

const channelDepth = [
  { eyebrow: 'Acquisition', title: 'Performance marketing with the destination in view.', copy: 'Campaign structure, targeting, creative testing, landing-page alignment, conversion tracking, remarketing and budget allocation can be scoped where supported. The commercial objective guides the work.', icon: Gauge },
  { eyebrow: 'Content & social', title: 'Content with a job to do.', copy: 'Content can support education, campaigns, sales conversations, social communication, search and landing experiences. Social scope is defined clearly across strategy, creative, organic or paid activity.', icon: MessageSquareText },
  { eyebrow: 'Lifecycle', title: 'Communication beyond the first visit.', copy: 'Email and automation can support nurture, onboarding, follow-up, education, re-engagement and retention when the data, permissions and platforms support the journey.', icon: Mail },
  { eyebrow: 'Conversion experience', title: 'Traffic is useful only when the journey works.', copy: 'Message match, landing-page clarity, forms, trust, mobile UX, page performance and follow-up can be reviewed where they limit the intended action.', icon: MousePointerClick },
];

export function ChannelDepthSection({ setActivePage }: Navigate) {
  return <section className="section-space bg-white" aria-labelledby="channel-depth-title"><div className="site-container"><span className="eyebrow">Channel execution & conversion</span><h2 id="channel-depth-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Activity connects to the journey after the click.</h2><div className="mt-10 grid gap-4 lg:grid-cols-2">{channelDepth.map(({ eyebrow, title, copy, icon: Icon }) => <article key={title} className="card p-7"><div className="flex items-center gap-3"><IconBadge small><Icon size={20} /></IconBadge><span className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">{eyebrow}</span></div><h3 className="mt-6 text-2xl">{title}</h3><p className="mt-3 text-sm leading-7">{copy}</p></article>)}</div><div className="mt-7 flex flex-wrap gap-5"><a href={servicePath('ui-ux-design')} onClick={(event) => { event.preventDefault(); setActivePage('Service:ui-ux-design'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Explore UI/UX Design <ArrowUpRight size={16} /></a><a href={servicePath('web-development')} onClick={(event) => { event.preventDefault(); setActivePage('Service:web-development'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">See our Web Development services <ArrowUpRight size={16} /></a></div></div></section>;
}

const metrics = [
  ['Platform metrics', 'Impressions, reach, clicks, click-through rate and channel costs where available.'],
  ['Conversion metrics', 'Leads, calls, bookings, purchases or other agreed conversion events.'],
  ['Business metrics', 'Qualified opportunities, acquisition cost, revenue or retention only where the data can support the relationship.'],
];

export function MarketingMeasurementSection() {
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="marketing-measurement-title"><div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><span className="eyebrow">Analytics & attribution</span><h2 id="marketing-measurement-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Know what marketing is actually doing.</h2><p className="mt-5 text-base leading-7">Campaigns should begin with a measurement plan covering useful events, campaign tagging, funnel stages, reporting and known attribution limitations. Specific platforms are confirmed only after access and capability are verified.</p><div className="mt-6 rounded-xl border border-border bg-white p-5"><h3 className="text-lg">Privacy and consent matter.</h3><p className="mt-2 text-sm leading-6">Tracking should account for appropriate consent, platform requirements and privacy considerations. No universal legal compliance claim is made.</p></div></div><ol className="space-y-3">{metrics.map(([title, copy], index) => <li key={title} className="grid gap-3 rounded-xl border border-border bg-white p-6 sm:grid-cols-[48px_1fr]"><span className="flex size-10 items-center justify-center rounded-full bg-[#eaf3ff] text-sm font-semibold text-electric">{index + 1}</span><div><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></div></li>)}</ol></div></section>;
}

const onboarding = ['Access & discovery', 'Current-state audit', 'Measurement validation', 'Priority setting', 'Campaign plan', 'Implementation'];

export function MarketingOnboardingReportingSection() {
  return <section className="section-space bg-white" aria-labelledby="marketing-onboarding-title"><div className="site-container"><div className="grid gap-12 lg:grid-cols-2 lg:gap-20"><div><span className="eyebrow">Beginning the engagement</span><h2 id="marketing-onboarding-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Start with access, evidence and priorities.</h2><p className="mt-5 text-base leading-7">The opening stage adapts to the quality of existing data, account access, website readiness and campaign complexity. It does not promise a fixed launch date before those conditions are understood.</p><ol className="mt-7 grid gap-2 sm:grid-cols-2">{onboarding.map((item, index) => <li key={item} className="flex min-h-14 items-center gap-3 rounded-lg border border-border bg-[#fafcfe] px-4"><span className="text-xs font-semibold text-electric">0{index + 1}</span><span className="text-sm font-semibold text-ink">{item}</span></li>)}</ol></div><div className="rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-7"><span className="eyebrow">Reporting & communication</span><h2 className="text-[clamp(2rem,3vw,2.7rem)] leading-tight">No black-box marketing.</h2><p className="mt-4 text-sm leading-7">Where agreed, reporting should connect KPIs, campaign commentary, budget visibility and recommended actions. The review cadence, access, responsible contacts and reporting format are defined for the engagement.</p><ul className="mt-6 grid gap-3 sm:grid-cols-2">{['Agreed KPIs', 'Campaign commentary', 'Budget visibility', 'Recommended actions', 'Scheduled reviews', 'Defined ownership'].map((item) => <li key={item} className="flex gap-3 text-sm text-steel"><CheckCircle2 size={18} className="shrink-0 text-electric" />{item}</li>)}</ul></div></div></div></section>;
}

const audiences = [
  ['Businesses building an acquisition system', 'Need coordinated journeys rather than isolated campaigns.'],
  ['Teams with weak measurement', 'Need clearer conversion signals, reporting and attribution limits.'],
  ['Growing brands', 'Need a structured approach across selected channels and content.'],
  ['Internal marketing teams', 'Need specialist execution or additional capacity within a shared plan.'],
  ['Companies with conversion friction', 'Need to connect media, messaging, UX and landing experiences.'],
];

export function MarketingAudienceSection() {
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="marketing-audience-title"><div className="site-container"><span className="eyebrow">Who this service is for</span><h2 id="marketing-audience-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Digital marketing for teams that need a connected plan.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{audiences.map(([title, copy], index) => <article key={title} className="card p-6"><span className="text-xs font-semibold text-electric">0{index + 1}</span><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div><div className="mt-8 rounded-xl border border-[#c8dff3] bg-white/70 p-6"><h3 className="text-xl">Engagement scope can be focused.</h3><p className="mt-2 max-w-3xl text-sm leading-7">An engagement may coordinate a broader marketing system, support selected specialist capabilities or work alongside an internal team. The operating model must be confirmed against actual ITGS capacity and written into scope.</p></div></div></section>;
}

const platformGroups = [
  ['Advertising', 'Accounts and platforms used for the approved acquisition channels.'],
  ['Analytics & tagging', 'Measurement tools used to capture agreed events and campaign context.'],
  ['CRM & automation', 'Systems used for lead handling, lifecycle communication and workflow triggers.'],
  ['Reporting', 'Tools used to consolidate agreed data and communicate decisions.'],
];

export function MarketingPlatformsSection() {
  return <section className="section-space bg-white" aria-labelledby="marketing-platforms-title"><div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">Marketing technology</span><h2 id="marketing-platforms-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Platforms that support the strategy.</h2><p className="mt-5 text-base leading-7">Specific platforms are listed only after the business approves the service taxonomy and team capability. Tools should support the strategy rather than decorate the page.</p></div><div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">{platformGroups.map(([title, copy]) => <article key={title} className="bg-[#fafcfe] p-6"><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const reasons = [
  ['Strategy before spend', 'Define the audience, objective, journey and measurement plan before increasing activity.', Target],
  ['Channels work together', 'Coordinate paid, content, social, lifecycle and digital experiences around the journey.', Network],
  ['Website and marketing share context', 'Identify when UX, development or technical problems limit campaign performance.', PanelsTopLeft],
  ['Measurement before optimization', 'Define useful conversion signals before claiming campaign success.', BarChart3],
  ['Business outcomes over vanity metrics', 'Interpret channel activity in the context of agreed commercial objectives.', CircleDollarSign],
  ['Evidence guides the next change', 'Use campaign and journey data to prioritize the next useful action.', Activity],
] as const;

export function WhyMarketingSection() {
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="why-marketing-title"><div className="site-container"><span className="eyebrow !text-sky">Why digital marketing with ITGS</span><h2 id="why-marketing-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Marketing connected to the experience customers enter.</h2><div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-3">{reasons.map(([title, copy, Icon]) => <article key={title} className="bg-[#0a2239] p-7"><Icon className="text-sky" size={23} /><h3 className="mt-5 text-xl text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{copy}</p></article>)}</div></div></section>;
}

const related = [
  { id: 'seo', title: 'Search Engine Optimization', copy: 'Capture sustained organic demand within the wider acquisition strategy.', icon: Search },
  { id: 'lead-generation', title: 'Lead Generation', copy: 'Build focused acquisition and follow-up systems around qualified demand.', icon: Target },
  { id: 'web-development', title: 'Web Development', copy: 'Improve the technical platform and landing experiences campaigns depend on.', icon: PanelsTopLeft },
  { id: 'ui-ux-design', title: 'UI/UX Design', copy: 'Reduce friction across landing pages, forms and conversion journeys.', icon: LayoutTemplate },
  { id: 'e-commerce', title: 'E-commerce Solutions', copy: 'Connect acquisition with storefront experience and commerce operations.', icon: Blocks },
];

export function RelatedMarketingServices({ setActivePage }: Navigate) {
  return <RelatedServicesSection titleId="related-marketing-title" title="Specialists connected around the customer journey." services={related.map(({ id, copy }) => ({ id, description: copy }))} source="digital_marketing" setActivePage={setActivePage} />;
}

export function MarketingInsightsSection({ posts, loading, setActivePage }: { posts: BlogPost[]; loading: boolean } & Navigate) {
  const enabled = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  const visible = enabled ? posts.filter((post) => post.status === 'Published' && /marketing|campaign|attribution|conversion|content|social|email|lead/i.test(`${post.category} ${post.title}`)).slice(0, 3) : [];
  if (!loading && visible.length === 0) return null;
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="marketing-insights-title"><div className="site-container"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="eyebrow">Digital marketing insights</span><h2 id="marketing-insights-title" className="text-[clamp(2.2rem,4vw,3.45rem)]">Guidance for more useful marketing decisions.</h2></div><a href={pathForPage('Blog')} onClick={(event) => { event.preventDefault(); setActivePage('Blog'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Browse all insights <ArrowRight size={16} /></a></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{visible.map((post) => <article key={post.id} className="card p-6"><span className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">{post.category}</span><h3 className="mt-4 text-xl leading-7"><a href={`/insights/${post.slug}/`} className="hover:underline">{post.title}</a></h3><p className="mt-3 line-clamp-3 text-sm leading-6">{post.excerpt || post.content}</p><p className="mt-6 text-xs text-steel">{post.date} · {post.readTime}</p></article>)}</div></div></section>;
}

