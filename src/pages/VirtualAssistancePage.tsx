import {
  ArrowRight, ChevronDown, ClipboardCheck, KeyRound, MessagesSquare,
  RefreshCw, Search, UserRoundCheck, Workflow, type LucideIcon,
} from 'lucide-react';
import type { BlogPost } from '../domain/entities/BlogPost';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';
import { ApprovedCaseStudies, ApprovedProofBar, ApprovedTestimonials } from '../components/home/ApprovedContentSections';
import {
  BoundariesAndAudienceSection, DelegateAutomateSection, DelegableTasksSection,
  DelegationSystemVisual, MatchingAndVettingSection, MeasurementAndPricingSection,
  OperatingModelSection, RelatedVAServiceSection, SecurityAccessSection,
  SupportCategoriesSection, ToolsCommunicationSection, VAInsightsSection,
  WhyVirtualAssistanceSection, WorkflowDocumentationSection, WorkloadProblemsSection,
} from '../components/virtual-assistance/VirtualAssistanceSections';

type Props = { setActivePage: (page: string) => void; posts: BlogPost[]; loading: boolean };

const process: { title: string; copy: string; output: string; icon: LucideIcon }[] = [
  { title: 'Scope', copy: 'Understand tasks, volume, tools, hours, access, communication, complexity and success criteria.', output: 'Delegation scope', icon: Search },
  { title: 'Match', copy: 'Select an appropriate support profile against the approved role requirements.', output: 'Support match', icon: UserRoundCheck },
  { title: 'Secure onboarding', copy: 'Define tools, permissions, communication, priorities, documentation and escalation.', output: 'Operational onboarding plan', icon: KeyRound },
  { title: 'Transfer work', copy: 'Move recurring responsibilities into a documented and approved workflow.', output: 'Active delegation system', icon: Workflow },
  { title: 'Operate', copy: 'Complete agreed work, coordinate updates and escalate exceptions through the chosen channel.', output: 'Ongoing operational support', icon: MessagesSquare },
  { title: 'Review & improve', copy: 'Assess delivery, changing priorities, process gaps and further delegation opportunities.', output: 'Review and improvement actions', icon: RefreshCw },
];

const deliverables = [
  ['Support scope', 'Documented responsibilities, boundaries, approvals and excluded work.'],
  ['Workflow map or SOPs', 'Repeatable task documentation where included in the engagement.'],
  ['Assigned support model', 'Dedicated, shared, managed or client-directed structure only as confirmed.'],
  ['Tool & access plan', 'Approved systems, permissions, credential method and offboarding responsibilities.'],
  ['Recurring task management', 'Agreed responsibilities, cadence, priorities and exception handling.'],
  ['Communication & escalation', 'Channels, working windows, updates, approvals and escalation paths.'],
  ['Status reporting', 'Completed work, outstanding items, blockers and capacity at an agreed cadence.'],
  ['Service review', 'Delivery observations and improvement actions where included.'],
];

export const VIRTUAL_ASSISTANCE_FAQS = [
  { question: 'What can I delegate to an ITGS virtual assistant?', answer: 'Potential work includes calendar and inbox administration, meeting preparation, research, documents, data maintenance, CRM updates, reporting, customer follow-up, vendor coordination and project coordination. The final list depends on capability, access, risk and written scope.' },
  { question: 'Is the assistant dedicated to my business?', answer: 'The dedicated or shared model has not been confirmed as a universal ITGS offer. The engagement must state the assigned support structure, hours, responsibilities and management model before work begins.' },
  { question: 'How are assistants selected?', answer: 'Matching should consider role requirements, task complexity, tool familiarity, communication needs, working-hour overlap, language, business context and relevant experience. The exact vetting and employment or contracting structure must be confirmed for the engagement.' },
  { question: 'Can the assistant work in our existing tools?', answer: 'Support can be assessed for the client’s approved email, calendar, documentation, project, CRM, customer-support and operational systems. Specific tools are confirmed against current capability, permissions and data-handling requirements.' },
  { question: 'How is sensitive business information protected?', answer: 'The engagement should define least-privilege access, client-owned accounts, approved credential handling, authentication, storage, sharing and offboarding. ITGS does not claim unverified security certifications or blanket compliance.' },
  { question: 'Do assistants sign confidentiality agreements?', answer: 'Confidentiality and NDA terms must be confirmed in the applicable agreement. The website does not assume that one standard applies to every assistant, contractor, client or jurisdiction.' },
  { question: 'What happens if the assistant is unavailable?', answer: 'The written scope should define the actual continuity model, notification, documentation, handover, access reassignment and any backup coverage. Guaranteed backup or replacement timing is not promised unless contracted.' },
  { question: 'Can support start part-time and increase later?', answer: 'Capacity changes can be discussed, but part-time, full-time, dedicated and shared options depend on availability, role requirements and the confirmed ITGS operating model.' },
  { question: 'Which time zones can you support?', answer: 'Working hours and overlap windows must be agreed for the engagement. The page does not claim universal or 24/7 coverage.' },
  { question: 'Can ITGS document recurring processes?', answer: 'Workflow mapping or SOP support can be included where confirmed. Documentation can cover inputs, outputs, steps, approval rules, exceptions and escalation points.' },
  { question: 'How is performance reviewed?', answer: 'Useful measures may include task completion, turnaround, accuracy, backlog movement, process consistency and customer response quality. The agreed outcomes should guide review without turning support into intrusive surveillance.' },
  { question: 'How is Virtual Assistance priced?', answer: 'Pricing should reflect hours or capacity, role, task complexity, required coverage, tools, access, communication and the level of management or continuity included. Final pricing and terms require a confirmed scope.' },
];

export default function VirtualAssistancePage({ setActivePage, posts, loading }: Props) {
  const discussSupport = (location: string) => {
    trackSiteEvent('discuss_support_needs', { location });
    setActivePage('Contact');
  };
  return <div className="bg-white">
    <section className="hero-atmosphere overflow-hidden pb-16 pt-28 text-white md:pb-20 md:pt-32 lg:pb-24"><div className="site-container"><nav className="mb-7 text-sm text-white/65" aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2"><li><a href={pathForPage('Home')} onClick={(event) => { event.preventDefault(); setActivePage('Home'); }} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li><li aria-hidden="true" className="text-white/35">/</li><li><a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); setActivePage('Services'); }} className="inline-flex min-h-11 items-center hover:text-white">Services</a></li><li aria-hidden="true" className="text-white/35">/</li><li aria-current="page" className="inline-flex min-h-11 items-center text-white">Virtual Assistant Services</li></ol></nav><div className="grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16"><div className="max-w-2xl"><p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-sky">Virtual assistant services</p><h1 className="text-balance text-[clamp(2.75rem,5vw,4.8rem)] font-semibold leading-[1.03] tracking-[-.055em] text-white">Virtual assistant support built around <span className="text-sky">how you work.</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-[#d3e0ed]">Delegate recurring administrative and operational work to support shaped around your responsibilities, systems and working preferences—with ownership, access and communication defined first.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); discussSupport('hero'); }} className="btn-primary">Discuss your support needs <ArrowRight size={18} /></a><a href="#delegable-work" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-white transition-colors hover:text-sky">Explore what you can delegate <ArrowRight size={17} /></a></div></div><DelegationSystemVisual /></div></div></section>

    <ApprovedProofBar />
    <WorkloadProblemsSection />
    <SupportCategoriesSection />
    <DelegableTasksSection />
    <BoundariesAndAudienceSection />
    <WorkflowDocumentationSection />
    <MatchingAndVettingSection />
    <SecurityAccessSection />
    <ToolsCommunicationSection />
    <OperatingModelSection />
    <DelegateAutomateSection setActivePage={setActivePage} />
    <ApprovedCaseStudies />

    <section className="section-space bg-[#eaf4fc]" aria-labelledby="va-process-title"><div className="site-container"><p className="eyebrow">How virtual assistance works</p><h2 id="va-process-title" className="max-w-4xl text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">From recurring workload to a reviewed operating rhythm.</h2><ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">{process.map(({ title, copy, output, icon: Icon }, index) => <li key={title} className="relative ml-4 border-l border-[#9fc4ed] pb-2 pl-7 md:ml-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-8"><span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white md:-top-4 md:left-0">{index + 1}</span><Icon className="mb-4 mt-1 text-electric" size={22} /><h3 className="text-lg">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6">{copy}</p><p className="mt-4 text-xs font-semibold text-[#174c87]">Output: {output}</p></li>)}</ol></div></section>

    <section className="section-space border-y border-border bg-white" aria-labelledby="va-deliverables-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">Scope-dependent deliverables</p><h2 id="va-deliverables-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">What you receive.</h2><p className="mt-5 max-w-sm text-base leading-7">Operational outputs shaped by the workload, access, support model and agreed responsibilities.</p><div className="mt-8 rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-5"><ClipboardCheck className="text-electric" size={22} /><h3 className="mt-4 text-lg">Every engagement needs a written scope.</h3><p className="mt-2 text-sm leading-6">Availability, assistant structure, tools, confidentiality, backup, reporting, pricing and service levels require confirmation.</p></div></div><ol className="border-t border-border">{deliverables.map(([title, copy], index) => <li key={title} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[44px_minmax(180px,.8fr)_1fr] sm:items-start sm:gap-5"><span className="text-xl font-medium text-steel">{String(index + 1).padStart(2, '0')}</span><h3 className="text-base">{title}</h3><p className="text-sm leading-6">{copy}</p></li>)}</ol></div></section>

    <MeasurementAndPricingSection />
    <WhyVirtualAssistanceSection />
    <ApprovedTestimonials />
    <RelatedVAServiceSection setActivePage={setActivePage} />
    <VAInsightsSection posts={posts} loading={loading} setActivePage={setActivePage} />

    <section className="section-space bg-white" aria-labelledby="va-faq-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">Virtual assistant FAQ</p><h2 id="va-faq-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Before we begin.</h2><p className="mt-5 max-w-sm text-base leading-7">Questions that clarify responsibilities, access, availability, continuity, pricing and the actual support model.</p></div><div className="border-t border-border">{VIRTUAL_ASSISTANCE_FAQS.map(({ question, answer }) => <details key={question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} aria-hidden="true" /></summary><p className="max-w-2xl pb-6 pr-10 text-sm leading-7">{answer}</p></details>)}</div></div></section>

    <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="va-closing-title"><div className="site-container"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Ready to create clear ownership?</p><h2 id="va-closing-title" className="max-w-4xl text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] text-white">Give recurring work a clear owner.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">Tell us what keeps returning to your desk, which systems your team uses and what kind of support you are considering. We can help define the next responsible step.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); discussSupport('closing'); }} className="btn-primary">Discuss your support needs <ArrowRight size={18} /></a><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('contact_cta_click', { location: 'virtual_assistance_closing' }); setActivePage('Contact'); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10">Contact us <ArrowRight size={17} /></a></div></div></section>
  </div>;
}

