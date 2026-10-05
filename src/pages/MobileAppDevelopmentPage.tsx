import {
  ArrowRight,
  CalendarCheck2,
  ChevronDown,
  ClipboardList,
  Layers3,
  Rocket,
  ShieldCheck,
  Smartphone,
  Target,
  TestTube2,
  ThumbsUp,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import BookingPreview from '../components/mobile-development/BookingPreview';
import type { BlogPost } from '../domain/entities/BlogPost';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';
import {
  ApprovedCaseStudies,
  ApprovedIndustries,
  ApprovedProofBar,
  ApprovedTestimonials,
} from '../components/home/ApprovedContentSections';
import {
  MobileAppTypesSection,
  MobileAudienceSection,
  MobileInsightsSection,
  MobileIntegrationsSection,
  MobilePostLaunchSection,
  MobileQaReleaseSection,
  MobileQualitySection,
  MobileStrategySection,
  MobileTechnologySection,
  MobileUxSection,
  PlatformApproachSection,
  RelatedMobileServices,
  WhyMobileSection,
} from '../components/mobile-development/MobileDevelopmentSections';

type Props = { setActivePage: (page: string) => void; posts: BlogPost[]; loading: boolean };

const useCases = [
  { title: 'Launch a new mobile product', copy: 'Turn a focused idea or defined concept into a production-ready application.' },
  { title: 'Extend a digital product to mobile', copy: 'Bring important customer or operational workflows to iOS and Android.' },
  { title: 'Serve customers on the go', copy: 'Make accounts, services, bookings or essential actions easier from a phone.' },
  { title: 'Mobilize internal operations', copy: 'Support work, information and approvals that happen away from a desk.' },
  { title: 'Modernize an existing app', copy: 'Improve an aging product’s experience, maintainability and technical direction.' },
  { title: 'Connect existing systems', copy: 'Integrate mobile workflows with agreed APIs and business platforms.' },
];

const annotations: { title: string; copy: string; icon: LucideIcon }[] = [
  { title: 'Focused journeys', copy: 'Keep the primary task clear, from choosing a service to reviewing the details.', icon: Target },
  { title: 'Clear feedback', copy: 'Show what happened after an action, with confirmation and the next useful step.', icon: CalendarCheck2 },
  { title: 'Consistent interactions', copy: 'Use familiar controls and language across selection, confirmation and management.', icon: Layers3 },
  { title: 'Designed for the thumb', copy: 'Keep frequent actions clear and comfortably reachable where the layout allows.', icon: ThumbsUp },
];

const deliverables = [
  { title: 'App planning', copy: 'Feature scope, user needs, platform recommendation and technical requirements.' },
  { title: 'Mobile experience design', copy: 'User flows, wireframes, detailed interfaces and an agreed prototype.' },
  { title: 'Mobile application development', copy: 'Approved functionality across the platforms included in scope.' },
  { title: 'Backend & integrations', copy: 'Application services and agreed system connections where included.' },
  { title: 'Testing', copy: 'Functional, device, integration, regression and release checks for the agreed support matrix.' },
  { title: 'Release preparation', copy: 'Build configuration, release assets and store-submission materials where included.' },
  { title: 'Documentation', copy: 'Agreed technical, operational or user documentation.' },
  { title: 'Source code & repository access', copy: 'Access and transfer arrangements as defined by the written agreement.' },
  { title: 'Handover & measurement', copy: 'Product walkthrough, access handover and analytics or monitoring setup where included.' },
];

const process = [
  { title: 'Discover & define', copy: 'Clarify objectives, users, platforms, integrations, security needs and constraints.', output: 'Product brief / delivery scope', icon: ClipboardList },
  { title: 'Prototype & validate', copy: 'Shape user flows, information architecture, interface direction and key states.', output: 'Approved interactive prototype', icon: Layers3 },
  { title: 'Architect & develop', copy: 'Implement the agreed app, backend connections, analytics and device features.', output: 'Working staging build', icon: Smartphone },
  { title: 'Test & harden', copy: 'Run agreed functional, device, integration, regression and release checks.', output: 'Release candidate', icon: TestTube2 },
  { title: 'Prepare & release', copy: 'Coordinate signed builds, store materials, submission support and documentation.', output: 'Production release package', icon: Rocket },
  { title: 'Improve', copy: 'Where contracted, review issues, platform updates, analytics and the next useful iteration.', output: 'Improvement roadmap', icon: Wrench },
];

export const MOBILE_DEVELOPMENT_FAQS = [
  { question: 'How much does mobile app development cost?', answer: 'Cost depends on the platforms, feature scope, product design, backend work, integrations, security needs, testing matrix and release support. A useful estimate follows discovery of those requirements.' },
  { question: 'How long does it take to build a mobile app?', answer: 'Timing depends on product complexity, decision speed, integration readiness, platforms, testing needs and store preparation. The agreed scope should define phases, review points and an indicative schedule.' },
  { question: 'Do you build for both iOS and Android?', answer: 'The platform plan can include iOS, Android or both when those platforms match the target audience and product requirements. The exact implementation approach is confirmed during discovery.' },
  { question: 'Should we choose native or cross-platform development?', answer: 'That depends on the app’s device features, experience needs, performance requirements, team constraints and future plans. The options are compared during discovery without treating either approach as universally superior.' },
  { question: 'Can you take over or modernize an existing mobile app?', answer: 'An existing product can be assessed for user experience, codebase condition, dependencies, backend services, release setup and ownership. The assessment determines whether targeted modernization or replacement is the more responsible direction.' },
  { question: 'Can you connect the app to an existing system?', answer: 'Potential integrations depend on the system’s interfaces, documentation, access, data model and security requirements. Any connections are reviewed and agreed as part of the scope.' },
  { question: 'Can ITGS build the backend and APIs?', answer: 'Backend or API work can be included where it is supported and agreed. Requirements, hosting, data ownership, security boundaries and ongoing responsibilities must be defined in the written scope.' },
  { question: 'How is the application tested?', answer: 'Testing can cover functionality, agreed physical devices, screen sizes, OS versions, integrations, regression, network conditions, accessibility and release configuration. The project defines a realistic support matrix rather than claiming every device is tested.' },
  { question: 'What does App Store and Google Play submission involve?', answer: 'Submission can involve developer accounts, signing, release builds, store assets, privacy information, metadata and review responses. ITGS can prepare and support the agreed submission process, but Apple and Google decide approval.' },
  { question: 'Who owns the source code and product assets?', answer: 'Ownership and access can differ by engagement. The contract should define source code, design files, repositories, cloud environments, developer accounts, documentation and third-party licensing before work begins.' },
  { question: 'Can analytics and crash monitoring be included?', answer: 'Product analytics, conversion events, crash reporting and operational monitoring can be considered where they are supported and included in scope. Measurement requirements are best agreed before release.' },
  { question: 'How are updates and maintenance handled after launch?', answer: 'A maintenance or improvement plan can be scoped around OS compatibility, dependencies, security updates, issues, store releases and feature development. Availability, responsibilities, response expectations and commercial terms require a separate agreement.' },
];

export default function MobileAppDevelopmentPage({ setActivePage, posts, loading }: Props) {
  return (
    <div className="bg-white">
      <section className="hero-atmosphere overflow-hidden pb-16 pt-28 text-white md:pb-20 md:pt-32 lg:pb-24">
        <div className="site-container">
          <nav className="mb-7 text-sm text-white/65" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2"><li><a href={pathForPage('Home')} onClick={(event) => { event.preventDefault(); setActivePage('Home'); }} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li><li aria-hidden="true" className="text-white/35">/</li><li><a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); setActivePage('Services'); }} className="inline-flex min-h-11 items-center hover:text-white">Services</a></li><li aria-hidden="true" className="text-white/35">/</li><li aria-current="page" className="inline-flex min-h-11 items-center text-white">Mobile App Development</li></ol>
          </nav>
          <div className="grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
            <div className="max-w-2xl">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-sky">Mobile app development services</p>
              <h1 className="text-balance text-[clamp(2.75rem,5vw,4.8rem)] font-semibold leading-[1.03] tracking-[-.055em] text-white">Mobile app development built around <span className="text-sky">your users and business.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#d3e0ed]">Plan, design and build mobile applications for iOS and Android around your users, workflows, systems, integrations and measurable product objectives. Native or cross-platform direction is selected from the requirements.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('discuss_mobile_app_cta', { location: 'hero' }); setActivePage('Contact'); }} className="btn-primary">Discuss your mobile app <ArrowRight size={18} aria-hidden="true" /></a>
                <a href="#mobile-app-example" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-white transition-colors hover:text-sky">View mobile app work <ArrowRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
            <figure className="min-w-0"><BookingPreview /><figcaption className="mt-3 text-right text-xs leading-5 text-white/65"><span className="block">ITGS internal concept · Illustrative data</span><span className="block">Self-initiated concept · Not client work</span></figcaption></figure>
          </div>
        </div>
      </section>

      <ApprovedProofBar />

      <section className="border-b border-border bg-[#fafbfc] py-16 md:py-20" aria-labelledby="mobile-use-cases">
        <div className="site-container"><h2 id="mobile-use-cases" className="max-w-3xl text-[clamp(2rem,3.2vw,3rem)] leading-tight">Designed for the moments that matter.</h2><ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{useCases.map(({ title, copy }, index) => <li key={title} className="bg-white p-6"><span className="text-xs font-semibold text-electric">0{index + 1}</span><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></li>)}</ol></div>
      </section>

      <MobileAppTypesSection />
      <PlatformApproachSection setActivePage={setActivePage} />
      <ApprovedCaseStudies />

      <section id="mobile-app-example" className="section-space scroll-mt-28 bg-white" aria-labelledby="mobile-example-title">
        <div className="site-container"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Internal demonstration</p><h2 id="mobile-example-title" className="max-w-2xl text-balance text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Explore a simpler mobile experience.</h2></div><p className="max-w-xs text-sm font-medium text-steel">Self-initiated concept · Not client work</p></div><div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(250px,.65fr)] lg:gap-14"><div className="min-w-0"><p className="mb-5 max-w-xl text-sm leading-6">An internal booking concept showing selection, appointment details, confirmation and management. The data is illustrative and the concept has not been presented as validated client work.</p><BookingPreview interactive /></div><div className="grid gap-0">{annotations.map(({ title, copy, icon: Icon }) => <div key={title} className="flex gap-4 border-b border-border py-6 first:pt-0 last:border-0 lg:py-7"><span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#dbeafe] bg-[#eef6ff] text-electric"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span><div><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></div></div>)}</div></div></div>
      </section>

      <MobileStrategySection />
      <MobileUxSection />
      <MobileQualitySection />
      <MobileIntegrationsSection />
      <MobileTechnologySection />

      <section className="section-space border-y border-border bg-[#fafbfc]" aria-labelledby="mobile-deliverables-title">
        <div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">Deliverables</p><h2 id="mobile-deliverables-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">What you receive.</h2><p className="mt-5 max-w-sm text-base leading-7">Planning, design, engineering, testing and release materials shaped by the agreed app scope.</p><div className="mt-8 rounded-xl border border-border bg-white p-5"><ShieldCheck className="text-electric" size={22} /><h3 className="mt-4 text-lg">Ownership is agreed in writing.</h3><p className="mt-2 text-sm leading-6">Source code, design files, repositories, cloud environments, developer accounts, documentation and third-party licences can vary by engagement. Contract terms define what transfers and when.</p></div></div><ol className="border-t border-border">{deliverables.map(({ title, copy }, index) => <li key={title} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[44px_minmax(170px,.8fr)_1fr] sm:items-start sm:gap-5"><span className="text-xl font-medium text-steel">{String(index + 1).padStart(2, '0')}</span><h3 className="text-base">{title}</h3><p className="text-sm leading-6">{copy}</p></li>)}</ol></div>
      </section>

      <section className="section-space bg-[#eaf4fc]" aria-labelledby="mobile-process-title">
        <div className="site-container"><p className="eyebrow">Our mobile app development process</p><h2 id="mobile-process-title" className="max-w-3xl text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">A clear path from product definition to release.</h2><ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">{process.map(({ title, copy, output, icon: Icon }, index) => <li key={title} className="relative ml-4 border-l border-[#9fc4ed] pb-2 pl-7 md:ml-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-8"><span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white md:-top-4 md:left-0">{index + 1}</span><Icon className="mb-4 mt-1 text-electric" size={22} strokeWidth={1.8} aria-hidden="true" /><h3 className="text-lg">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6">{copy}</p><p className="mt-4 text-xs font-semibold text-[#174c87]">Output: {output}</p></li>)}</ol></div>
      </section>

      <MobileQaReleaseSection />
      <MobilePostLaunchSection />
      <MobileAudienceSection />
      <ApprovedIndustries />
      <WhyMobileSection />
      <ApprovedTestimonials />
      <RelatedMobileServices setActivePage={setActivePage} />
      <MobileInsightsSection posts={posts} loading={loading} setActivePage={setActivePage} />

      <section className="section-space bg-white" aria-labelledby="mobile-faq-title">
        <div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">Mobile app development FAQ</p><h2 id="mobile-faq-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Before we begin.</h2><p className="mt-5 max-w-sm text-base leading-7">Questions that clarify platform choice, scope, ownership, testing, release and ongoing responsibilities.</p></div><div className="border-t border-border">{MOBILE_DEVELOPMENT_FAQS.map(({ question, answer }) => <details key={question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} aria-hidden="true" /></summary><p className="max-w-2xl pb-6 pr-10 text-sm leading-7">{answer}</p></details>)}</div></div>
      </section>

      <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="mobile-closing-title">
        <div className="site-container"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Ready to define the next step?</p><h2 id="mobile-closing-title" className="max-w-3xl text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] text-white">Let’s put your next idea in people’s hands.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">Tell us who the app is for, what it needs to accomplish and where the product stands today. We can help identify the most useful next step without promising an outcome before the requirements are understood.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('discuss_mobile_app_cta', { location: 'closing' }); setActivePage('Contact'); }} className="btn-primary">Discuss your mobile app <ArrowRight size={18} /></a><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('contact_cta_click', { location: 'mobile_service_closing' }); setActivePage('Contact'); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10">Contact us <ArrowRight size={17} /></a></div></div>
      </section>
    </div>
  );
}

