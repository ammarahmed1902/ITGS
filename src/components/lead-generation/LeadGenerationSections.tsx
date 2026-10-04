import { Activity, ArrowDown, ArrowRight, ArrowUpRight, BarChart3, Blocks, CheckCircle2, CircleDollarSign, Code2, Filter, GitMerge, LayoutTemplate, Mail, Megaphone, MessageSquareText, MousePointerClick, PanelsTopLeft, Search, Send, ShieldCheck, Target, UserCheck, UsersRound, Workflow } from 'lucide-react';
import type { BlogPost } from '../../domain/entities/BlogPost';
import { pathForPage, servicePath, trackSiteEvent } from '../../lib/siteNavigation';
import IconBadge from '../IconBadge';
import RelatedServicesSection from '../service-cards/RelatedServicesSection';

type Navigate = { setActivePage: (page: string) => void };

export function LeadSystemVisual() {
  const stages = [
    ['Audience & offer', Target],
    ['Acquisition', Megaphone],
    ['Conversion', MousePointerClick],
    ['Qualification', Filter],
    ['CRM & follow-up', Workflow],
    ['Pipeline evidence', BarChart3],
  ] as const;
  return <div role="img" aria-label="Lead generation system connecting audience, acquisition, conversion, qualification, CRM, follow-up and pipeline measurement" className="overflow-hidden rounded-xl border border-white/15 bg-[#0a2239]/90 p-5 shadow-[0_24px_60px_rgba(2,19,41,.3)] sm:p-6"><div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-sky">Connected lead system</p><p className="mt-1 text-sm font-semibold text-white">Quality is defined beyond the form submission.</p></div><span className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/55">No lead guarantees</span></div><ol className="mt-5 grid gap-2 sm:grid-cols-2">{stages.map(([label, Icon], index) => <li key={label} className="flex min-h-16 items-center gap-3 rounded-lg border border-white/10 bg-white/[.04] px-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky"><Icon size={18} /></span><div><span className="block text-[10px] font-semibold text-white/65">0{index + 1}</span><span className="text-sm font-semibold text-white">{label}</span></div></li>)}</ol><div className="mt-4 flex items-center gap-3 rounded-lg bg-electric px-4 py-3 text-xs font-semibold text-white"><Activity size={17} />Sales feedback improves the next decision.</div></div>;
}

const problems = [
  ['Not enough relevant demand', 'The right prospects are not discovering or engaging with the business.', Search],
  ['Traffic but too few leads', 'Landing-page, form or offer friction prevents useful conversion.', MousePointerClick],
  ['Too many poor-fit leads', 'Audience, message, offer or qualification criteria need refinement.', Filter],
  ['Leads do not reach sales', 'Routing, ownership or CRM workflow is creating operational gaps.', GitMerge],
  ['Leads go cold', 'Acknowledgement, follow-up or nurture is missing or poorly timed.', Mail],
  ['Channel value is unclear', 'Tracking stops at clicks or forms instead of accepted opportunities.', BarChart3],
  ['Acquisition efficiency is falling', 'Campaign, conversion and qualification performance need to be assessed together.', CircleDollarSign],
] as const;

export function LeadProblemsSection() {
  return <section className="section-space bg-white" aria-labelledby="lead-problems-title"><div className="site-container"><span className="eyebrow">Start with the constraint</span><h2 id="lead-problems-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Where is your lead generation breaking down?</h2><p className="mt-5 max-w-3xl text-lg leading-8">Demand, conversion, qualification, routing and sales follow-up are different problems. The right intervention begins by locating the actual gap.</p><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{problems.map(([title, copy, Icon]) => <article key={title} className="bg-white p-6 transition-colors hover:bg-[#f8fbff]"><IconBadge small><Icon size={21} /></IconBadge><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const icpInputs = ['Industry or customer type', 'Company size or customer value', 'Geography', 'Current need', 'Buying stage', 'Commercial fit', 'Sales evidence', 'Behavioral or intent signals'];
const roles = ['Economic buyer', 'Decision-maker', 'Influencer', 'End user'];

export function AudienceIcpSection() {
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="lead-audience-title"><div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><span className="eyebrow">Audience & ICP strategy</span><h2 id="lead-audience-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Define who is actually worth reaching.</h2><p className="mt-5 text-base leading-7">Audience definition should use available customer, sales, market and behavioral evidence. For B2B work, this may include an Ideal Customer Profile and the buying roles involved in the decision.</p><div className="mt-7 rounded-xl border border-border bg-white p-5"><ShieldCheck className="text-electric" size={22} /><h3 className="mt-4 text-lg">Relevant evidence, not invasive profiling.</h3><p className="mt-2 text-sm leading-6">The approach should use appropriate business, customer and intent signals within agreed privacy and platform constraints.</p></div></div><div className="grid gap-5 sm:grid-cols-2"><article className="rounded-xl border border-border bg-white p-6"><h3 className="text-lg">Potential fit criteria</h3><ul className="mt-5 grid gap-3">{icpInputs.map((item) => <li key={item} className="flex gap-3 text-sm text-steel"><CheckCircle2 size={18} className="shrink-0 text-electric" />{item}</li>)}</ul></article><article className="rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-6"><h3 className="text-lg">Buying roles, where relevant</h3><ul className="mt-5 grid gap-4">{roles.map((item) => <li key={item} className="flex gap-3 text-sm font-medium text-ink"><UsersRound size={18} className="shrink-0 text-electric" />{item}</li>)}</ul><p className="mt-6 border-t border-[#cfe0f5] pt-5 text-xs leading-5 text-steel">Qualification criteria are agreed with the client rather than imposed as universal definitions.</p></article></div></div></section>;
}

const journey = [
  ['Awareness', 'A relevant prospect encounters the business.'],
  ['Interest', 'The problem and possible value become clearer.'],
  ['Evaluation', 'The prospect compares approaches, proof and fit.'],
  ['Conversion', 'A useful action creates a lead record.'],
  ['Qualification', 'Fit, intent and readiness are assessed.'],
  ['Nurture', 'Relevant follow-up supports the next decision.'],
  ['Sales handoff', 'Ownership and context move to the right person.'],
  ['Opportunity', 'An accepted prospect enters the defined sales process.'],
];

export function BuyerJourneySection() {
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="buyer-journey-title"><div className="site-container"><span className="eyebrow">Buyer journey</span><h2 id="buyer-journey-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Map the journey from attention to sales conversation.</h2><p className="mt-5 max-w-3xl text-lg leading-8">Lead generation does not end with a form. Each stage needs an agreed role, owner and useful next action.</p><ol className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">{journey.map(([title, copy], index) => <li key={title} className="relative ml-4 border-l border-[#9fc4ed] pb-2 pl-7 md:ml-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-8"><span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white md:-top-4 md:left-0">{index + 1}</span><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></li>)}</ol></div></section>;
}

const capabilities = [
  ['Audience & ICP strategy', 'Identify customer profiles, segments and buying roles worth prioritizing.', Target],
  ['Demand generation', 'Create or capture relevant demand through approved marketing channels.', Megaphone],
  ['Outbound prospecting', 'Plan focused account research and outreach where genuinely included.', Send],
  ['Landing pages & conversion', 'Build journeys designed to convert relevant attention into useful action.', LayoutTemplate],
  ['Lead qualification', 'Define fit, intent, readiness and routing criteria with the sales team.', Filter],
  ['CRM integration', 'Capture source context and pass lead data into agreed workflows.', Workflow],
  ['Automation & nurture', 'Support timely acknowledgement and relevant follow-up where permitted.', Mail],
  ['Analytics & attribution', 'Measure the path from campaign source toward accepted opportunities.', BarChart3],
] as const;

export function LeadCapabilitiesSection() {
  return <section id="lead-approach" className="section-space scroll-mt-28 bg-white" aria-labelledby="lead-capabilities-title"><div className="site-container"><div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><span className="eyebrow">Lead generation services</span><h2 id="lead-capabilities-title" className="text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Capabilities across the lead generation system.</h2></div><p className="max-w-xl text-lg leading-8 lg:justify-self-end">The right scope depends on the market, buying cycle, offer, sales process, demand, budget and available systems. Not every engagement needs every capability.</p></div><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{capabilities.map(([title, copy, Icon]) => <article key={title} className="bg-[#fafcfe] p-6"><Icon className="text-electric" size={22} /><h3 className="mt-5 text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

export function InboundOutboundSection({ setActivePage }: Navigate) {
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="inbound-outbound-title"><div className="site-container"><span className="eyebrow !text-sky">Acquisition approach</span><h2 id="inbound-outbound-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Inbound and outbound have different jobs.</h2><p className="mt-5 max-w-3xl text-base leading-7 text-white/65">One approach may capture existing demand while another creates focused conversations with selected prospects. The mix should follow the market and sales economics.</p><div className="mt-10 grid gap-4 lg:grid-cols-2"><article className="rounded-xl border border-white/15 bg-white/[.04] p-7"><Search className="text-sky" size={23} /><h3 className="mt-5 text-2xl text-white">Inbound lead generation</h3><p className="mt-3 text-sm leading-7 text-white/65">May connect organic search, content, approved paid media, landing pages and referrals around people already researching a problem.</p><div className="mt-6 flex flex-wrap gap-5"><a href={servicePath('seo')} onClick={(event) => { event.preventDefault(); setActivePage('Service:seo'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky">Explore SEO services <ArrowUpRight size={16} /></a><a href={servicePath('digital-marketing')} onClick={(event) => { event.preventDefault(); setActivePage('Service:digital-marketing'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky">Explore Digital Marketing <ArrowUpRight size={16} /></a></div></article><article className="rounded-xl border border-white/15 bg-white/[.04] p-7"><Send className="text-sky" size={23} /><h3 className="mt-5 text-2xl text-white">Outbound lead generation</h3><p className="mt-3 text-sm leading-7 text-white/65">Where genuinely scoped, outbound may use account research, professional-network outreach, approved email communication and sales-development coordination.</p><p className="mt-5 text-xs leading-5 text-white/50">ITGS does not market mass unsolicited messaging, guaranteed meetings or spam automation.</p></article></div></div></section>;
}

const offerModel = ['Audience', 'Problem', 'Offer', 'Message', 'Conversion experience'];
const conversionChecks = ['Value proposition', 'Message match', 'Proof', 'CTA hierarchy', 'Appropriate forms', 'Mobile usability', 'Page performance', 'Objection handling', 'Confirmation state', 'Tracking'];

export function OfferConversionSection({ setActivePage }: Navigate) {
  return <section className="section-space bg-white" aria-labelledby="offer-conversion-title"><div className="site-container grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20"><div><span className="eyebrow">Offer, messaging & conversion</span><h2 id="offer-conversion-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Give relevant prospects a reason to respond.</h2><p className="mt-5 text-base leading-7">A consultation, assessment, demo, estimate, guide, report or trial can work only when it fits the audience, buying stage and business model.</p><ol className="mt-7 grid gap-2">{offerModel.map((item, index) => <li key={item} className="flex min-h-14 items-center gap-4 rounded-lg border border-border bg-[#fafcfe] px-4"><span className="text-xs font-semibold text-electric">0{index + 1}</span><span className="text-sm font-semibold text-ink">{item}</span>{index < offerModel.length - 1 && <ArrowDown className="ml-auto text-[#7aa6d8]" size={15} />}</li>)}</ol></div><div className="rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-7"><h3 className="text-2xl">Turn attention into action.</h3><p className="mt-3 text-sm leading-7">Landing experiences should make the offer understandable, reduce unnecessary friction and capture the context required for the next step.</p><ul className="mt-6 grid gap-3 sm:grid-cols-2">{conversionChecks.map((item) => <li key={item} className="flex gap-3 text-sm text-steel"><CheckCircle2 size={18} className="shrink-0 text-electric" />{item}</li>)}</ul><div className="mt-7 flex flex-wrap gap-5"><a href={servicePath('ui-ux-design')} onClick={(event) => { event.preventDefault(); setActivePage('Service:ui-ux-design'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Explore UI/UX Design <ArrowUpRight size={16} /></a><a href={servicePath('web-development')} onClick={(event) => { event.preventDefault(); setActivePage('Service:web-development'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">See Web Development <ArrowUpRight size={16} /></a></div></div></div></section>;
}

const qualification = [
  ['Lead', 'A person or organization completed an agreed conversion action.'],
  ['Marketing-qualified lead', 'Meets the marketing qualification criteria agreed for the program.'],
  ['Sales-qualified lead', 'Meets the fit and readiness criteria agreed with the sales team.'],
  ['Opportunity', 'Has been accepted into the organization’s defined sales process.'],
];

export function QualificationSection() {
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="qualification-title"><div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">Lead quality</span><h2 id="qualification-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">More leads are not always better leads.</h2><p className="mt-5 text-base leading-7">The stages below are useful working concepts, but every client should define qualification according to its market, offer and sales process.</p><div className="mt-6 rounded-xl border border-[#c8dff3] bg-white/70 p-5"><h3 className="text-lg">Scoring should support judgment.</h3><p className="mt-2 text-sm leading-6">Fit, intent, engagement and readiness signals can support routing where the data exists. Arbitrary scores should not disguise uncertainty.</p></div></div><ol className="space-y-3">{qualification.map(([title, copy], index) => <li key={title} className="grid gap-3 rounded-xl border border-[#c8dff3] bg-white p-6 sm:grid-cols-[48px_1fr]"><span className="flex size-10 items-center justify-center rounded-full bg-[#eaf3ff] text-sm font-semibold text-electric">{index + 1}</span><div><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></div></li>)}</ol></div></section>;
}

export function CrmNurtureSection() {
  const crmFlow = ['Form, call or campaign', 'Lead record', 'Source context', 'Qualification', 'Owner assignment', 'Notification', 'Follow-up', 'Opportunity'];
  return <section className="section-space bg-white" aria-labelledby="crm-flow-title"><div className="site-container"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><span className="eyebrow">CRM, routing & nurture</span><h2 id="crm-flow-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Leads need somewhere useful to go.</h2><p className="mt-5 text-base leading-7">A lead-generation system is incomplete when conversion data sits unassigned or without context. CRM and routing scope depends on the client’s systems, access and agreed implementation.</p><p className="mt-5 text-sm leading-6">Follow-up can include acknowledgement, educational content, sales context and appropriate re-engagement without overwhelming people with automated messages.</p></div><ol className="grid gap-2 sm:grid-cols-2">{crmFlow.map((item, index) => <li key={item} className="flex min-h-16 items-center gap-4 rounded-lg border border-border bg-[#fafcfe] px-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#eaf3ff] text-xs font-semibold text-electric">{index + 1}</span><span className="text-sm font-semibold text-ink">{item}</span></li>)}</ol></div><div className="mt-10 rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-6"><div className="flex items-start gap-4"><ShieldCheck className="mt-1 shrink-0 text-electric" size={23} /><div><h3 className="text-xl">Consent and communication controls belong in the system.</h3><p className="mt-2 text-sm leading-7">Where outbound or automated communication is included, implementation should support appropriate consent, opt-outs, platform terms and privacy requirements. ITGS does not claim universal legal compliance; the client should confirm regulatory obligations with appropriate counsel.</p></div></div></div></div></section>;
}

const metrics = [
  ['Acquisition', 'Impressions, clicks, cost and engagement where relevant.'],
  ['Conversion', 'Forms, calls, bookings or other agreed lead actions.'],
  ['Quality', 'Qualified rate, acceptance and recorded rejection reasons.'],
  ['Efficiency', 'Cost per qualified lead or acquisition cost where measurable.'],
  ['Pipeline', 'Accepted opportunities and pipeline value where CRM data allows.'],
  ['Commercial', 'Customers or revenue only where attribution is reliable enough.'],
];

export function LeadMeasurementSection() {
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="lead-measurement-title"><div className="site-container grid gap-12 lg:grid-cols-[.74fr_1.26fr] lg:gap-20"><div><span className="eyebrow">Closed-loop measurement</span><h2 id="lead-measurement-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Know which leads actually become opportunities.</h2><p className="mt-5 text-base leading-7">Where systems permit, downstream sales outcomes should return to marketing reporting. The aim is the clearest practical view available—not a claim that one platform contains absolute attribution truth.</p><div className="mt-6 rounded-xl border border-border bg-white p-5"><h3 className="text-lg">Useful source context</h3><p className="mt-2 text-sm leading-6">Campaign, source, medium, landing page, form, call, offer and CRM outcome can be connected where tracking and data access support it.</p></div></div><div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">{metrics.map(([title, copy]) => <article key={title} className="bg-white p-6"><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

export function SalesFeedbackSection() {
  const loop = ['Marketing generates leads', 'Sales reviews quality', 'Acceptance or rejection reason recorded', 'Targeting, message or qualification adjusted', 'New evidence informs the next cycle'];
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="sales-feedback-title"><div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><span className="eyebrow !text-sky">Sales feedback loop</span><h2 id="sales-feedback-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Sales feedback improves lead generation.</h2><p className="mt-5 text-base leading-7 text-white/65">Marketing cannot determine lead quality alone. Consistent acceptance and rejection reasons can reveal where audience, offer, message or qualification should change.</p></div><ol className="grid gap-2">{loop.map((item, index) => <li key={item} className="flex min-h-16 items-center gap-4 rounded-lg border border-white/15 bg-white/[.04] px-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky/10 text-xs font-semibold text-sky">{index + 1}</span><span className="text-sm font-semibold text-white/85">{item}</span>{index < loop.length - 1 && <ArrowDown size={15} className="ml-auto text-white/25" />}</li>)}</ol></div></section>;
}

const audiences = [
  ['B2B service companies', 'Need relevant conversations with clearly defined buying roles.'],
  ['SaaS & technology teams', 'Need pipeline support across longer, multi-step buying journeys.'],
  ['Professional services', 'Need appropriate inquiries rather than undifferentiated traffic.'],
  ['Growing sales teams', 'Need clearer acquisition, routing and follow-up processes.'],
  ['Teams with poor lead quality', 'Need stronger targeting, offers and qualification criteria.'],
  ['Teams with weak follow-up', 'Need lead ownership, CRM context and nurture workflows.'],
];

export function LeadAudienceSection() {
  return <section className="section-space bg-white" aria-labelledby="lead-service-audience-title"><div className="site-container"><span className="eyebrow">Who this service is for</span><h2 id="lead-service-audience-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">For teams that need a more useful path to opportunity.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{audiences.map(([title, copy], index) => <article key={title} className="card p-6"><span className="text-xs font-semibold text-electric">0{index + 1}</span><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const platformGroups = [
  ['CRM', 'Systems that hold lead source, qualification, ownership and opportunity context.'],
  ['Marketing automation', 'Tools supporting permission-aware acknowledgement, nurture and workflow triggers.'],
  ['Advertising', 'Approved acquisition platforms used for the agreed audience and channel strategy.'],
  ['Analytics & tagging', 'Systems used to capture campaign, conversion and journey evidence.'],
  ['Forms & scheduling', 'Interfaces used to capture the right information and support the next action.'],
];

export function LeadPlatformsSection() {
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="lead-platforms-title"><div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">Technology supporting the lead flow</span><h2 id="lead-platforms-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Tools should preserve context from source to sales.</h2><p className="mt-5 text-base leading-7">Specific platforms are named only after current ITGS capability, the client environment and access are confirmed. Integration exists to support the process, not to create a logo wall.</p></div><div className="grid gap-px overflow-hidden rounded-xl border border-[#c8dff3] bg-[#c8dff3] sm:grid-cols-2">{platformGroups.map(([title, copy]) => <article key={title} className="bg-white p-6"><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const reasons = [
  ['Lead quality before volume', 'Optimize toward relevant opportunities rather than form fills alone.', UserCheck],
  ['Acquisition and conversion together', 'Evaluate campaigns in the context of the landing experience.', MousePointerClick],
  ['Marketing and CRM connected', 'Preserve source and qualification context into the sales workflow.', Workflow],
  ['Sales feedback improves targeting', 'Use acceptance and rejection evidence to refine the system.', MessageSquareText],
  ['Development capability in-house', 'Address landing-page, website or integration constraints where scoped.', Code2],
  ['Measurement before scaling', 'Confirm conversion and quality signals before increasing activity.', BarChart3],
] as const;

export function WhyLeadGenerationSection() {
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="why-lead-generation-title"><div className="site-container"><span className="eyebrow !text-sky">Why lead generation with ITGS</span><h2 id="why-lead-generation-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Connect marketing demand with the sales team that must use it.</h2><div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-3">{reasons.map(([title, copy, Icon]) => <article key={title} className="bg-[#0a2239] p-7"><Icon className="text-sky" size={23} /><h3 className="mt-5 text-xl text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{copy}</p></article>)}</div></div></section>;
}

const related = [
  { id: 'digital-marketing', title: 'Digital Marketing', copy: 'Coordinate the wider acquisition, content and lifecycle strategy.', icon: Megaphone },
  { id: 'seo', title: 'Search Engine Optimization', copy: 'Capture relevant organic demand through search-ready architecture and content.', icon: Search },
  { id: 'web-development', title: 'Web Development', copy: 'Build landing experiences, forms and technical connections.', icon: PanelsTopLeft },
  { id: 'ui-ux-design', title: 'UI/UX Design', copy: 'Improve conversion journeys, form interactions and decision clarity.', icon: LayoutTemplate },
  { id: 'e-commerce', title: 'E-commerce Solutions', copy: 'Connect lead capture with considered-purchase or assisted commerce journeys.', icon: Blocks },
];

export function RelatedLeadServices({ setActivePage }: Navigate) {
  return <RelatedServicesSection titleId="related-lead-title" title="The services behind a stronger lead system." services={related.map(({ id, copy }) => ({ id, description: copy }))} source="lead_generation" setActivePage={setActivePage} />;
}

export function LeadInsightsSection({ posts, loading, setActivePage }: { posts: BlogPost[]; loading: boolean } & Navigate) {
  const enabled = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  const visible = enabled ? posts.filter((post) => post.status === 'Published' && /lead|demand|crm|pipeline|conversion|outbound|landing page|qualification/i.test(`${post.category} ${post.title}`)).slice(0, 3) : [];
  if (!loading && visible.length === 0) return null;
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="lead-insights-title"><div className="site-container"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="eyebrow">Lead generation insights</span><h2 id="lead-insights-title" className="text-[clamp(2.2rem,4vw,3.45rem)]">Guidance for stronger acquisition and qualification.</h2></div><a href={pathForPage('Blog')} onClick={(event) => { event.preventDefault(); trackSiteEvent('insight_click', { source: 'lead_generation' }); setActivePage('Blog'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Browse all insights <ArrowRight size={16} /></a></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{visible.map((post) => <article key={post.id} className="card p-6"><span className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">{post.category}</span><h3 className="mt-4 text-xl leading-7"><a href={`/insights/${post.slug}/`} className="hover:underline">{post.title}</a></h3><p className="mt-3 line-clamp-3 text-sm leading-6">{post.excerpt || post.content}</p><p className="mt-6 text-xs text-steel">{post.date} · {post.readTime}</p></article>)}</div></div></section>;
}

