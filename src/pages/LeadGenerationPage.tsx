import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  ClipboardCheck,
  Filter,
  Rocket,
  Search,
  Target,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { BlogPost } from '../domain/entities/BlogPost';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';
import {
  ApprovedCaseStudies,
  ApprovedIndustries,
  ApprovedProofBar,
  ApprovedTestimonials,
} from '../components/home/ApprovedContentSections';
import {
  AudienceIcpSection,
  BuyerJourneySection,
  CrmNurtureSection,
  InboundOutboundSection,
  LeadAudienceSection,
  LeadCapabilitiesSection,
  LeadInsightsSection,
  LeadMeasurementSection,
  LeadPlatformsSection,
  LeadProblemsSection,
  LeadSystemVisual,
  OfferConversionSection,
  QualificationSection,
  RelatedLeadServices,
  SalesFeedbackSection,
  WhyLeadGenerationSection,
} from '../components/lead-generation/LeadGenerationSections';

type Props = { setActivePage: (page: string) => void; posts: BlogPost[]; loading: boolean };

const deliverables = [
  ['Lead generation assessment', 'A review of the market, audience, offer, acquisition, conversion, CRM and measurement constraints.'],
  ['Audience & qualification framework', 'Agreed customer-fit, buying-role, intent and readiness criteria.'],
  ['Acquisition plan', 'Selected channel roles, messages, offers, journeys, responsibilities and KPIs.'],
  ['Campaign implementation', 'The approved acquisition activity included in the engagement.'],
  ['Landing experience', 'Agreed page, form, confirmation and conversion requirements or implementation.'],
  ['CRM & routing workflow', 'Source context, ownership, notification and follow-up requirements where supported.'],
  ['Nurture plan', 'Permission-aware acknowledgement, education and follow-up journeys where included.'],
  ['Measurement framework', 'Lead, qualification, efficiency and pipeline indicators supported by available data.'],
  ['Reporting & optimization priorities', 'Performance context, sales feedback and the next useful system changes.'],
];

const process: { title: string; copy: string; output: string; icon: LucideIcon }[] = [
  { title: 'Diagnose', copy: 'Review the business, customers, sales process, demand, channels, CRM, lead quality, conversion and measurement.', output: 'Lead generation assessment', icon: Search },
  { title: 'Define opportunity', copy: 'Establish audience, fit, buying roles, intent, market opportunity and qualification criteria.', output: 'Audience & qualification framework', icon: Target },
  { title: 'Design the system', copy: 'Define channels, offers, messages, landing journeys, forms, routing, nurture and KPIs.', output: 'Lead generation plan', icon: Workflow },
  { title: 'Launch', copy: 'Implement the agreed campaigns, pages, tracking, integrations and operating workflows.', output: 'Live acquisition system', icon: Rocket },
  { title: 'Qualify & nurture', copy: 'Review lead quality, ownership, follow-up, permission-aware nurture and sales feedback.', output: 'Qualification & nurture workflow', icon: Filter },
  { title: 'Measure & improve', copy: 'Optimize using conversion, quality, efficiency, sales feedback and pipeline evidence.', output: 'Optimization roadmap', icon: BarChart3 },
];

export const LEAD_GENERATION_FAQS = [
  { question: 'What is included in ITGS Lead Generation services?', answer: 'An engagement can include audience and ICP strategy, demand generation, approved outbound work, landing experiences, forms, qualification, CRM workflows, nurture, analytics and reporting. The written scope defines the channels and implementation included.' },
  { question: 'Do you specialize in B2B lead generation?', answer: 'B2B acquisition can be supported where it fits the engagement, including customer profiles, buying roles, longer decision journeys and sales coordination. The main service remains broad because final market positioning requires approved commercial and search-demand evidence.' },
  { question: 'How do you define a qualified lead?', answer: 'Qualification is agreed with the client using relevant fit, intent, engagement and readiness criteria. A marketing-qualified lead, sales-qualified lead and opportunity should reflect the client’s actual process rather than a universal definition.' },
  { question: 'Which channels do you use to generate leads?', answer: 'Channel selection depends on the market, demand, buying cycle, offer, sales economics, budget and available capability. It can include relevant inbound or approved outbound methods rather than using every channel by default.' },
  { question: 'Do you offer LinkedIn lead generation?', answer: 'Professional-network outreach can be considered where current ITGS capability, audience fit, platform terms and the agreed operating model support it. ITGS does not promise guaranteed meetings or mass unsolicited messaging.' },
  { question: 'Can you integrate leads into our CRM?', answer: 'CRM workflow work can be assessed against the existing platform, data model, access, routing requirements, privacy obligations and technical capability. Supported connections and ownership are confirmed in scope.' },
  { question: 'Can ITGS work with our existing sales team?', answer: 'Yes. Sales input is useful for defining qualification, routing, acceptance and rejection reasons, follow-up expectations and the feedback loop used to improve targeting and messaging.' },
  { question: 'How do you measure lead quality?', answer: 'Quality can be evaluated through agreed fit, intent, acceptance, rejection reasons, progression and opportunity evidence. Available CRM and sales feedback determine how far measurement can reliably extend.' },
  { question: 'How much do lead generation services cost?', answer: 'Pricing depends on audience research, channels, media activity, content and creative, landing-page work, integrations, nurture, reporting and operating cadence. A proposal follows an initial scope discussion.' },
  { question: 'How long does lead generation take to produce results?', answer: 'Timing depends on market demand, offer, audience, budget, channel, sales cycle, website readiness, implementation and competition. Early system setup and learning should not be presented as a universal promise of lead or customer volume.' },
  { question: 'Can you guarantee a certain number of leads?', answer: 'No. ITGS does not guarantee a universal number of leads, qualified opportunities or closed customers because performance depends on the offer, market, audience, budget, competition, conversion experience, sales process and other variables.' },
  { question: 'How do you handle outbound outreach and consent?', answer: 'Where outbound or automated communication is included, the implementation should support appropriate consent, opt-outs, privacy requirements and platform terms. The client remains responsible for confirming applicable legal obligations with appropriate counsel.' },
];

export default function LeadGenerationPage({ setActivePage, posts, loading }: Props) {
  const discussLeads = (location: string) => {
    trackSiteEvent('discuss_lead_generation_goals', { location });
    setActivePage('Contact');
  };
  return <div className="bg-white">
    <section className="hero-atmosphere overflow-hidden pb-16 pt-28 text-white md:pb-20 md:pt-32 lg:pb-24"><div className="site-container"><nav className="mb-7 text-sm text-white/65" aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2"><li><a href={pathForPage('Home')} onClick={(event) => { event.preventDefault(); setActivePage('Home'); }} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li><li aria-hidden="true" className="text-white/35">/</li><li><a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); setActivePage('Services'); }} className="inline-flex min-h-11 items-center hover:text-white">Services</a></li><li aria-hidden="true" className="text-white/35">/</li><li aria-current="page" className="inline-flex min-h-11 items-center text-white">Lead Generation</li></ol></nav><div className="grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16"><div className="max-w-2xl"><p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-sky">Lead generation services</p><h1 className="text-balance text-[clamp(2.75rem,5vw,4.8rem)] font-semibold leading-[1.03] tracking-[-.055em] text-white">Lead generation built around <span className="text-sky">qualified opportunities.</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-[#d3e0ed]">Connect audience targeting, acquisition, landing experiences, qualification, CRM workflows and follow-up around the prospects most relevant to your business.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); discussLeads('hero'); }} className="btn-primary">Discuss your lead generation goals <ArrowRight size={18} /></a><a href="#lead-approach" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-white transition-colors hover:text-sky">Explore our approach <ArrowRight size={17} /></a></div></div><LeadSystemVisual /></div></div></section>

    <ApprovedProofBar />
    <LeadProblemsSection />
    <AudienceIcpSection />
    <BuyerJourneySection />
    <LeadCapabilitiesSection />
    <InboundOutboundSection setActivePage={setActivePage} />
    <OfferConversionSection setActivePage={setActivePage} />
    <QualificationSection />
    <CrmNurtureSection />
    <LeadMeasurementSection />
    <ApprovedCaseStudies />

    <section className="section-space bg-[#eaf4fc]" aria-labelledby="lead-process-title"><div className="site-container"><p className="eyebrow">Our lead generation process</p><h2 id="lead-process-title" className="max-w-3xl text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">A continuous path from diagnosis to better opportunities.</h2><ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">{process.map(({ title, copy, output, icon: Icon }, index) => <li key={title} className="relative ml-4 border-l border-[#9fc4ed] pb-2 pl-7 md:ml-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-8"><span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white md:-top-4 md:left-0">{index + 1}</span><Icon className="mb-4 mt-1 text-electric" size={22} /><h3 className="text-lg">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6">{copy}</p><p className="mt-4 text-xs font-semibold text-[#174c87]">Output: {output}</p></li>)}</ol></div></section>

    <SalesFeedbackSection />
    <section className="section-space border-y border-border bg-white" aria-labelledby="lead-deliverables-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">Scope-dependent deliverables</p><h2 id="lead-deliverables-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">What you receive.</h2><p className="mt-5 max-w-sm text-base leading-7">Strategy, implementation and measurement outputs shaped by the market, sales process and agreed service scope.</p><div className="mt-8 rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-5"><ClipboardCheck className="text-electric" size={22} /><h3 className="mt-4 text-lg">The scope controls the output.</h3><p className="mt-2 text-sm leading-6">Channels, contact volumes, media budgets, platform access, content, integrations and team responsibilities require confirmation.</p></div></div><ol className="border-t border-border">{deliverables.map(([title, copy], index) => <li key={title} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[44px_minmax(180px,.8fr)_1fr] sm:items-start sm:gap-5"><span className="text-xl font-medium text-steel">{String(index + 1).padStart(2, '0')}</span><h3 className="text-base">{title}</h3><p className="text-sm leading-6">{copy}</p></li>)}</ol></div></section>

    <LeadAudienceSection />
    <ApprovedIndustries />
    <LeadPlatformsSection />
    <WhyLeadGenerationSection />
    <ApprovedTestimonials />
    <RelatedLeadServices setActivePage={setActivePage} />
    <LeadInsightsSection posts={posts} loading={loading} setActivePage={setActivePage} />

    <section className="section-space bg-white" aria-labelledby="lead-faq-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">Lead generation FAQ</p><h2 id="lead-faq-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Before we begin.</h2><p className="mt-5 max-w-sm text-base leading-7">Questions that clarify audience, qualification, channels, CRM, measurement and realistic expectations.</p></div><div className="border-t border-border">{LEAD_GENERATION_FAQS.map(({ question, answer }) => <details key={question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} /></summary><p className="max-w-2xl pb-6 pr-10 text-sm leading-7">{answer}</p></details>)}</div></div></section>

    <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="lead-closing-title"><div className="site-container"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Ready to improve the system?</p><h2 id="lead-closing-title" className="max-w-4xl text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] text-white">Build a lead system your sales team can actually use.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">Tell us who you are trying to reach, how leads arrive today and where quality or conversion is breaking down. We can help identify a focused next step.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); discussLeads('closing'); }} className="btn-primary">Discuss your lead generation goals <ArrowRight size={18} /></a><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('contact_cta_click', { location: 'lead_generation_closing' }); setActivePage('Contact'); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10">Contact us <ArrowRight size={17} /></a></div></div></section>
  </div>;
}

