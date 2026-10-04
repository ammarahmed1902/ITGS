import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  ClipboardCheck,
  Megaphone,
  Search,
  Target,
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
  AudienceResearchSection,
  ChannelDepthSection,
  ConnectedMarketingSection,
  CustomerJourneySection,
  MarketingAudienceSection,
  MarketingCapabilitiesSection,
  MarketingGoalsSection,
  MarketingInsightsSection,
  MarketingMeasurementSection,
  MarketingOnboardingReportingSection,
  MarketingPlatformsSection,
  MarketingSystemVisual,
  RelatedMarketingServices,
  WhyMarketingSection,
} from '../components/digital-marketing/DigitalMarketingSections';

type Props = { setActivePage: (page: string) => void; posts: BlogPost[]; loading: boolean };

const deliverables = [
  { title: 'Marketing opportunity assessment', copy: 'A review of the current journey, channels, evidence, measurement and priority constraints.' },
  { title: 'Strategy & campaign plan', copy: 'Agreed objectives, audiences, journey stages, channel roles, offers, KPIs and priorities.' },
  { title: 'Audience & messaging framework', copy: 'Practical guidance for audience focus, message themes and campaign communication.' },
  { title: 'Campaign implementation', copy: 'The agreed setup, launch and management work for channels included in scope.' },
  { title: 'Content & creative requirements', copy: 'A clear plan for the assets, formats, messages and landing experiences the work requires.' },
  { title: 'Conversion & tracking configuration', copy: 'Agreed conversion events, campaign tagging and journey measurement where technically supported.' },
  { title: 'Performance reporting', copy: 'Reporting that connects agreed KPIs with context, limitations and recommended actions.' },
  { title: 'Optimization priorities', copy: 'An evidence-led list of changes across campaigns, content, journeys and measurement.' },
];

const process: { title: string; copy: string; output: string; icon: LucideIcon }[] = [
  { title: 'Audit', copy: 'Review goals, channels, website, analytics, tracking, customer journey, available history and competitive context.', output: 'Marketing opportunity assessment', icon: Search },
  { title: 'Strategy', copy: 'Define audiences, objectives, funnel, channel roles, offers, messaging, KPIs, roadmap and measurement.', output: 'Strategy & campaign plan', icon: Target },
  { title: 'Execution', copy: 'Create and operate the campaigns, content, landing experiences, automation and tracking included in scope.', output: 'Live marketing system', icon: Megaphone },
  { title: 'Optimization', copy: 'Review costs, conversion quality, audiences, creative, journey friction and agreed business indicators.', output: 'Reporting & prioritized actions', icon: BarChart3 },
];

export const DIGITAL_MARKETING_FAQS = [
  { question: 'What is included in digital marketing services?', answer: 'The engagement can include strategy, audience research, performance marketing, content, social media, lifecycle communication, automation, conversion optimization, analytics and reporting. The written scope defines the channels, activities and deliverables included.' },
  { question: 'Do we need to use every marketing channel?', answer: 'No. Channel selection should follow the business goal, customer journey, audience evidence, budget, available content, sales process and measurement readiness. A focused mix is often more useful than trying to operate everywhere.' },
  { question: 'Can ITGS support only one part of our marketing?', answer: 'A focused engagement can cover a selected capability, campaign, conversion journey or measurement problem. It can also support an internal team within clearly defined responsibilities.' },
  { question: 'How do you decide which channels to use?', answer: 'Recommendations are based on the audience, intent, offer, buying cycle, commercial objective, budget, competitive context, existing evidence and the readiness of the destination experience.' },
  { question: 'How long does it take to see results?', answer: 'Timing varies by channel, starting position, buying cycle, budget, creative, website experience, tracking quality and market conditions. ITGS does not guarantee a fixed result or timeline before those conditions are assessed.' },
  { question: 'How is marketing success measured?', answer: 'Success measures are agreed for the engagement. Reporting can connect platform activity, conversion events and business outcomes where the underlying data supports that relationship, while making attribution limits visible.' },
  { question: 'How is a digital marketing engagement priced?', answer: 'Pricing depends on the number of channels, campaign complexity, media activity, content and creative needs, landing-page work, integrations, reporting and operating cadence. A proposal follows an initial scope discussion.' },
  { question: 'Can you work with our internal marketing team?', answer: 'Yes, when roles and decision rights are clear. ITGS can provide a defined specialist scope, delivery capacity or coordinated support alongside internal marketing, sales, product and engineering teams.' },
  { question: 'Do you create advertising assets and landing pages?', answer: 'Creative, content, design and landing-page work can be included when agreed. The scope defines the formats, quantities, review process, source materials and implementation responsibilities.' },
  { question: 'What reporting and analytics will we receive?', answer: 'The reporting format, KPIs, data sources, access and review cadence are agreed before delivery. Reports should include context and recommended actions rather than presenting channel metrics without interpretation.' },
  { question: 'Can you connect campaigns with our CRM or automation tools?', answer: 'Integration work can be assessed against the existing platform, data model, access, privacy requirements and technical capability. Supported connections and ownership are confirmed in scope.' },
  { question: 'Can SEO and paid campaigns work together?', answer: 'They can share search insights, audience questions, landing experiences, content priorities and measurement context. Each channel still needs an appropriate role, timeframe and evaluation method.' },
];

export default function DigitalMarketingPage({ setActivePage, posts, loading }: Props) {
  const bookCall = (location: string) => {
    trackSiteEvent('discuss_marketing_goals_cta', { location });
    setActivePage('Booking');
  };

  return (
    <div className="bg-white">
      <section className="hero-atmosphere overflow-hidden pb-16 pt-28 text-white md:pb-20 md:pt-32 lg:pb-24">
        <div className="site-container">
          <nav className="mb-7 text-sm text-white/65" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li><a href={pathForPage('Home')} onClick={(event) => { event.preventDefault(); setActivePage('Home'); }} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li>
              <li aria-hidden="true" className="text-white/35">/</li>
              <li><a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); setActivePage('Services'); }} className="inline-flex min-h-11 items-center hover:text-white">Services</a></li>
              <li aria-hidden="true" className="text-white/35">/</li>
              <li aria-current="page" className="inline-flex min-h-11 items-center text-white">Digital Marketing</li>
            </ol>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-sky">Digital marketing services</p>
              <h1 className="text-balance text-[clamp(2.75rem,5vw,4.8rem)] font-semibold leading-[1.03] tracking-[-.055em] text-white">Digital marketing built around <span className="text-sky">measurable growth.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#d3e0ed]">Connect strategy, performance marketing, content, social, lifecycle campaigns, conversion experiences and measurement around the audiences and outcomes that matter to your business.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={pathForPage('Booking')} onClick={(event) => { event.preventDefault(); bookCall('hero'); }} className="btn-primary">Discuss your marketing goals <ArrowRight size={18} /></a>
                <a href="#marketing-approach" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-white transition-colors hover:text-sky">Explore our approach <ArrowRight size={17} /></a>
              </div>
            </div>
            <MarketingSystemVisual />
          </div>
        </div>
      </section>

      <ApprovedProofBar />
      <MarketingGoalsSection />
      <MarketingCapabilitiesSection setActivePage={setActivePage} />
      <CustomerJourneySection />
      <AudienceResearchSection />
      <ConnectedMarketingSection />
      <ApprovedCaseStudies />
      <ChannelDepthSection setActivePage={setActivePage} />
      <MarketingMeasurementSection />

      <section className="section-space border-y border-border bg-[#fafbfc]" aria-labelledby="marketing-deliverables-title">
        <div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div><p className="eyebrow">Engagement deliverables</p><h2 id="marketing-deliverables-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">What you receive.</h2><p className="mt-5 max-w-sm text-base leading-7">A practical set of strategy, implementation, measurement and decision-making outputs shaped by the agreed engagement.</p><div className="mt-8 rounded-xl border border-border bg-white p-5"><ClipboardCheck className="text-electric" size={22} /><h3 className="mt-4 text-lg">The scope defines the deliverables.</h3><p className="mt-2 text-sm leading-6">Channels, asset quantities, media budgets, integrations, operating cadence and team responsibilities require confirmation before publication or delivery.</p></div></div>
          <ol className="border-t border-border">{deliverables.map(({ title, copy }, index) => <li key={title} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[44px_minmax(180px,.8fr)_1fr] sm:items-start sm:gap-5"><span className="text-xl font-medium text-steel">{String(index + 1).padStart(2, '0')}</span><h3 className="text-base">{title}</h3><p className="text-sm leading-6">{copy}</p></li>)}</ol>
        </div>
      </section>

      <section className="section-space bg-[#eaf4fc]" aria-labelledby="marketing-process-title">
        <div className="site-container"><p className="eyebrow">Our digital marketing process</p><h2 id="marketing-process-title" className="max-w-3xl text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">A clear route from evidence to continuous improvement.</h2><ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">{process.map(({ title, copy, output, icon: Icon }, index) => <li key={title} className="relative ml-4 border-l border-[#9fc4ed] pb-2 pl-7 md:ml-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-8"><span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white md:-top-4 md:left-0">{index + 1}</span><Icon className="mb-4 mt-1 text-electric" size={22} /><h3 className="text-lg">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6">{copy}</p><p className="mt-4 text-xs font-semibold text-[#174c87]">Output: {output}</p></li>)}</ol></div>
      </section>

      <MarketingOnboardingReportingSection />
      <MarketingAudienceSection />
      <ApprovedIndustries />
      <MarketingPlatformsSection />
      <WhyMarketingSection />
      <ApprovedTestimonials />
      <RelatedMarketingServices setActivePage={setActivePage} />
      <MarketingInsightsSection posts={posts} loading={loading} setActivePage={setActivePage} />

      <section className="section-space bg-white" aria-labelledby="marketing-faq-title">
        <div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">Digital marketing FAQ</p><h2 id="marketing-faq-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Before we begin.</h2><p className="mt-5 max-w-sm text-base leading-7">Questions that clarify channel selection, scope, measurement, collaboration and realistic expectations.</p></div><div className="border-t border-border">{DIGITAL_MARKETING_FAQS.map(({ question, answer }) => <details key={question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} /></summary><p className="max-w-2xl pb-6 pr-10 text-sm leading-7">{answer}</p></details>)}</div></div>
      </section>

      <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="marketing-closing-title">
        <div className="site-container"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Ready to connect the journey?</p><h2 id="marketing-closing-title" className="max-w-4xl text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] text-white">Turn marketing activity into a connected growth system.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">Tell us what you need marketing to achieve, what is already in place and where the journey is unclear. We can help identify a focused next step.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={pathForPage('Booking')} onClick={(event) => { event.preventDefault(); bookCall('closing'); }} className="btn-primary">Discuss your marketing goals <ArrowRight size={18} /></a><a href={pathForPage('Booking')} onClick={(event) => { event.preventDefault(); trackSiteEvent('strategy_call_cta_click', { location: 'digital_marketing_closing' }); setActivePage('Booking'); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10">Book a strategy call <ArrowRight size={17} /></a></div></div>
      </section>
    </div>
  );
}

