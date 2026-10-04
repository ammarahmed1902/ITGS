import { Accessibility, ArrowRight, Blocks, ChevronDown, ClipboardCheck, Code2, Eye, Layers3, ListTree, MousePointerClick, PenTool, Route, Search, type LucideIcon } from 'lucide-react';
import { DesignWorkspacePreview, OnboardingConcept } from '../components/ui-ux-design/DesignConceptVisual';
import type { BlogPost } from '../domain/entities/BlogPost';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';
import {
  ApprovedCaseStudies,
  ApprovedIndustries,
  ApprovedProofBar,
  ApprovedTestimonials,
} from '../components/home/ApprovedContentSections';
import {
  DesignSystemsHandoffSection,
  ExperienceTypesSection,
  InclusiveResponsiveSection,
  InformationArchitectureSection,
  PrototypeValidationSection,
  RelatedUiUxServices,
  ResearchEvidenceSection,
  UiUxAudienceSection,
  UiUxCapabilitiesSection,
  UiUxInsightsSection,
  UxAuditSection,
  WhyUiUxSection,
} from '../components/ui-ux-design/UiUxSections';

type Props = { setActivePage: (page: string) => void; posts: BlogPost[]; loading: boolean };

const useCases = [
  { title: 'Design a new product', copy: 'Move from requirements and assumptions toward a tangible, testable experience.' },
  { title: 'Improve an existing product', copy: 'Identify friction, confusion and unnecessary complexity in important journeys.' },
  { title: 'Modernize a legacy experience', copy: 'Restructure outdated interfaces and workflows around current needs.' },
  { title: 'Create product consistency', copy: 'Unify fragmented experiences through reusable patterns and shared rules.' },
  { title: 'Improve critical journeys', copy: 'Simplify tasks, forms or decision paths where users struggle or abandon.' },
  { title: 'Prepare a product to scale', copy: 'Create structures and systems that support more features, users and teams.' },
];

const annotations: { title: string; copy: string; icon: LucideIcon }[] = [
  { title: 'Clear information hierarchy', copy: 'Give each screen one primary task and make supporting information easy to scan.', icon: ListTree },
  { title: 'Useful interaction states', copy: 'Show selection, progress and the next action so the interface explains its response.', icon: MousePointerClick },
  { title: 'Reusable patterns', copy: 'Keep controls, spacing and language consistent across the journey.', icon: Blocks },
  { title: 'Progressive disclosure', copy: 'Reveal detail as people need it instead of presenting every decision at once.', icon: Layers3 },
];

const deliverables = [
  { title: 'Research & findings', copy: 'Agreed research activities, available evidence and synthesized findings.' },
  { title: 'User flows & journey maps', copy: 'Visual representations of important tasks and decision paths.' },
  { title: 'Information architecture', copy: 'Content, functionality and navigation structure where applicable.' },
  { title: 'Wireframes', copy: 'Structural screen layouts used to review hierarchy and workflow.' },
  { title: 'High-fidelity UI', copy: 'Approved responsive interface designs and relevant interaction states.' },
  { title: 'Interactive prototype', copy: 'Clickable representation of important journeys included in scope.' },
  { title: 'Component library or design system', copy: 'Reusable foundations, components and patterns where required.' },
  { title: 'Accessibility criteria', copy: 'Relevant design requirements and states when included in the engagement.' },
  { title: 'Developer specifications & design QA', copy: 'Behavior notes, assets and implementation review where agreed.' },
];

const process = [
  { title: 'Understand', copy: 'Clarify objectives, users, evidence, constraints, technical context and success criteria.', output: 'Research findings / design brief', icon: Search },
  { title: 'Structure', copy: 'Develop information architecture, user flows, journeys, wireframes and feature hierarchy.', output: 'Approved UX structure', icon: Route },
  { title: 'Design', copy: 'Create visual direction, responsive UI, interaction states, prototypes and components.', output: 'Interactive prototype / UI system', icon: PenTool },
  { title: 'Evaluate', copy: 'Use stakeholder, usability, accessibility and feasibility review as appropriate.', output: 'Refined design findings', icon: Eye },
  { title: 'Handoff', copy: 'Prepare specifications, assets, component references and behavior notes.', output: 'Developer-ready design package', icon: Code2 },
  { title: 'Review & improve', copy: 'Where included, review implementation, feedback, analytics and the next iteration.', output: 'Design QA / improvement priorities', icon: ClipboardCheck },
];

export const UI_UX_DESIGN_FAQS = [
  { question: 'What is included in UI/UX design services?', answer: 'The scope can include research, UX strategy, information architecture, user journeys, wireframes, interface design, prototyping, design systems, accessibility criteria and developer handoff. The written agreement defines the activities and outputs for the project.' },
  { question: 'How much does a UI/UX design project cost?', answer: 'Cost depends on the product stage, number and complexity of journeys, research activities, platforms, design-system needs, validation and handoff depth. A useful estimate follows an initial understanding of that scope.' },
  { question: 'How long does a UI/UX project take?', answer: 'Timing depends on product complexity, evidence availability, stakeholder access, research recruitment, review cycles and the number of platforms or journeys. The project plan should define phases and review points.' },
  { question: 'Can you improve our existing product?', answer: 'An existing product can be reviewed around a specific journey or problem. Access, evidence, review activities and the scope of proposed changes are agreed before work begins.' },
  { question: 'Can you redesign an existing SaaS product?', answer: 'A SaaS product can be assessed across navigation, onboarding, workflows, information hierarchy, consistency, accessibility and responsive behavior. The assessment determines whether targeted improvements or a broader redesign is appropriate.' },
  { question: 'Is user research included?', answer: 'Research activities depend on the agreed scope. Interviews, analytics review, usability studies, recruitment and participant consent are planned explicitly when included. The internal concept shown here has not been tested with real users.' },
  { question: 'Do you conduct usability testing?', answer: 'Usability testing can be included when relevant users, scenarios, recruitment, consent and evaluation goals are defined. It is never implied to have occurred unless it was actually conducted.' },
  { question: 'Do you create or work with existing design systems?', answer: 'A new component library or design system can be scoped where it supports the product. Existing systems can also be reviewed and extended around their current foundations, components, governance and engineering implementation.' },
  { question: 'Can ITGS design both web and mobile products?', answer: 'The design scope can cover responsive websites, web applications and mobile product journeys where supported. Platform conventions, input methods and content priorities are considered for each agreed surface.' },
  { question: 'How do you handle accessibility?', answer: 'Relevant accessibility criteria can be incorporated into requirements, components and interaction states. This can include contrast, typography, focus, keyboard use, labels, errors, touch targets and reduced motion without claiming universal compliance.' },
  { question: 'What design files and documentation will we receive?', answer: 'Expected source files, prototype access, component documentation, specifications, assets and handoff format are listed in the project scope before delivery.' },
  { question: 'Can you work with our developers after handoff?', answer: 'Collaboration can include feasibility reviews, handoff sessions, implementation questions and design QA when agreed. Team responsibilities, access and review points are defined for the engagement.' },
];

export default function UiUxDesignPage({ setActivePage, posts, loading }: Props) {
  return (
    <div className="bg-white">
      <section className="hero-atmosphere overflow-hidden pb-16 pt-28 text-white md:pb-20 md:pt-32 lg:pb-24">
        <div className="site-container">
          <nav className="mb-7 text-sm text-white/65" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2"><li><a href={pathForPage('Home')} onClick={(event) => { event.preventDefault(); setActivePage('Home'); }} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li><li aria-hidden="true" className="text-white/35">/</li><li><a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); setActivePage('Services'); }} className="inline-flex min-h-11 items-center hover:text-white">Services</a></li><li aria-hidden="true" className="text-white/35">/</li><li aria-current="page" className="inline-flex min-h-11 items-center text-white">UI/UX Design</li></ol>
          </nav>
          <div className="grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
            <div className="max-w-2xl">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-sky">UI/UX design services</p>
              <h1 className="text-balance text-[clamp(2.75rem,5vw,4.8rem)] font-semibold leading-[1.03] tracking-[-.055em] text-white">UI/UX design that makes complex products feel <span className="text-sky">simple.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#d3e0ed]">Research-led UX strategy, user journeys, interfaces and reusable systems for websites, web applications, mobile products, dashboards, SaaS platforms and portals.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"><a href={pathForPage('Booking')} onClick={(event) => { event.preventDefault(); trackSiteEvent('discuss_product_experience_cta', { location: 'hero' }); setActivePage('Booking'); }} className="btn-primary">Discuss your product experience <ArrowRight size={18} /></a><a href="#ui-ux-example" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-white transition-colors hover:text-sky">View UI/UX work <ArrowRight size={17} /></a></div>
            </div>
            <figure className="min-w-0"><DesignWorkspacePreview /><figcaption className="mt-3 text-right text-xs leading-5 text-white/65"><span className="block">ITGS internal concept · Illustrative data</span><span className="block">Self-initiated concept · Not client work</span></figcaption></figure>
          </div>
        </div>
      </section>

      <ApprovedProofBar />

      <section className="border-b border-border bg-[#fafbfc] py-16 md:py-20" aria-labelledby="ui-ux-use-cases">
        <div className="site-container"><h2 id="ui-ux-use-cases" className="max-w-3xl text-[clamp(2rem,3.2vw,3rem)] leading-tight">Clarity at every stage.</h2><ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{useCases.map(({ title, copy }, index) => <li key={title} className="bg-white p-6"><span className="text-xs font-semibold text-electric">0{index + 1}</span><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></li>)}</ol></div>
      </section>

      <ExperienceTypesSection />
      <UiUxCapabilitiesSection />
      <ApprovedCaseStudies />

      <section id="ui-ux-example" className="section-space scroll-mt-28 bg-white" aria-labelledby="ui-ux-example-title">
        <div className="site-container"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Internal demonstration</p><h2 id="ui-ux-example-title" className="max-w-2xl text-balance text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Explore the decisions behind the design.</h2></div><p className="max-w-xs text-sm font-medium text-steel">Self-initiated concept · Not client work</p></div><div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(250px,.65fr)] lg:gap-14"><div className="min-w-0"><p className="mb-5 max-w-xl text-sm leading-6">An internal onboarding concept showing how one task moves from welcome, to setup, to a useful next step. The example uses illustrative data and has not been validated with real users.</p><OnboardingConcept /></div><div className="grid gap-0">{annotations.map(({ title, copy, icon: Icon }) => <div key={title} className="flex gap-4 border-b border-border py-6 first:pt-0 last:border-0 lg:py-7"><span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#dbeafe] bg-[#eef6ff] text-electric"><Icon size={23} strokeWidth={1.8} /></span><div><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></div></div>)}<p className="pt-6 text-xs leading-5 text-steel">This demonstration explains design thinking. It is not research, validation or client evidence.</p></div></div></div>
      </section>

      <ResearchEvidenceSection />
      <UxAuditSection setActivePage={setActivePage} />
      <InformationArchitectureSection />
      <PrototypeValidationSection />
      <InclusiveResponsiveSection />
      <DesignSystemsHandoffSection />

      <section className="section-space border-y border-border bg-[#fafbfc]" aria-labelledby="ui-ux-deliverables-title">
        <div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">Deliverables</p><h2 id="ui-ux-deliverables-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">What you receive.</h2><p className="mt-5 max-w-sm text-base leading-7">Evidence, structure, interface detail and handoff materials shaped by the agreed design scope.</p><div className="mt-8 rounded-xl border border-border bg-white p-5"><Accessibility className="text-electric" size={22} /><h3 className="mt-4 text-lg">Scope controls the output.</h3><p className="mt-2 text-sm leading-6">Research, testing, accessibility criteria, a design system and design QA are included only when explicitly agreed. The project scope defines files, access and review responsibilities.</p></div></div><ol className="border-t border-border">{deliverables.map(({ title, copy }, index) => <li key={title} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[44px_minmax(180px,.8fr)_1fr] sm:items-start sm:gap-5"><span className="text-xl font-medium text-steel">{String(index + 1).padStart(2, '0')}</span><h3 className="text-base">{title}</h3><p className="text-sm leading-6">{copy}</p></li>)}</ol></div>
      </section>

      <section className="section-space bg-[#eaf4fc]" aria-labelledby="ui-ux-process-title">
        <div className="site-container"><p className="eyebrow">Our UI/UX design process</p><h2 id="ui-ux-process-title" className="max-w-3xl text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">A clearer route from evidence to implementation.</h2><ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">{process.map(({ title, copy, output, icon: Icon }, index) => <li key={title} className="relative ml-4 border-l border-[#9fc4ed] pb-2 pl-7 md:ml-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-8"><span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white md:-top-4 md:left-0">{index + 1}</span><Icon className="mb-4 mt-1 text-electric" size={22} /><h3 className="text-lg">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6">{copy}</p><p className="mt-4 text-xs font-semibold text-[#174c87]">Output: {output}</p></li>)}</ol></div>
      </section>

      <UiUxAudienceSection />
      <ApprovedIndustries />
      <WhyUiUxSection />
      <ApprovedTestimonials />
      <RelatedUiUxServices setActivePage={setActivePage} />
      <UiUxInsightsSection posts={posts} loading={loading} setActivePage={setActivePage} />

      <section className="section-space bg-white" aria-labelledby="ui-ux-faq-title">
        <div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">UI/UX design FAQ</p><h2 id="ui-ux-faq-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Before we begin.</h2><p className="mt-5 max-w-sm text-base leading-7">Questions that clarify research, scope, validation, accessibility, design systems and implementation support.</p></div><div className="border-t border-border">{UI_UX_DESIGN_FAQS.map(({ question, answer }) => <details key={question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} /></summary><p className="max-w-2xl pb-6 pr-10 text-sm leading-7">{answer}</p></details>)}</div></div>
      </section>

      <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="ui-ux-closing-title">
        <div className="site-container"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Ready to improve the experience?</p><h2 id="ui-ux-closing-title" className="max-w-3xl text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] text-white">Let’s make your product easier to use.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">Tell us where users struggle, what you are planning to build or what needs to improve. We can help identify a focused next design step based on the product and available evidence.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={pathForPage('Booking')} onClick={(event) => { event.preventDefault(); trackSiteEvent('discuss_product_experience_cta', { location: 'closing' }); setActivePage('Booking'); }} className="btn-primary">Discuss your product experience <ArrowRight size={18} /></a><a href={pathForPage('Booking')} onClick={(event) => { event.preventDefault(); trackSiteEvent('strategy_call_cta_click', { location: 'uiux_service_closing' }); setActivePage('Booking'); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10">Book a strategy call <ArrowRight size={17} /></a></div></div>
      </section>
    </div>
  );
}

