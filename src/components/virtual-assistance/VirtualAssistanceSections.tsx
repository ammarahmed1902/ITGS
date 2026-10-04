import {
  ArrowRight, Bot, BriefcaseBusiness, CalendarDays, CheckCircle2,
  ClipboardList, Clock3, Database, FileText, FolderKanban, Headphones, KeyRound,
  Mail, MessageSquareText, Network, RefreshCw, Search, ShieldCheck, Sparkles,
  UserRoundCheck, UsersRound, Workflow,
} from 'lucide-react';
import type { BlogPost } from '../../domain/entities/BlogPost';
import { pathForPage, servicePath, trackSiteEvent } from '../../lib/siteNavigation';
import IconBadge from '../IconBadge';
import RelatedServicesSection from '../service-cards/RelatedServicesSection';

type Navigate = { setActivePage: (page: string) => void };

export function DelegationSystemVisual() {
  const stages = [
    ['Scope the work', ClipboardList], ['Match support', UserRoundCheck],
    ['Control access', KeyRound], ['Document workflow', FileText],
    ['Operate & communicate', MessageSquareText], ['Review & improve', RefreshCw],
  ] as const;
  return <div role="img" aria-label="Managed delegation system connecting scope, matching, access, workflow documentation, delivery and review" className="overflow-hidden rounded-xl border border-white/15 bg-[#0a2239]/90 p-5 shadow-[0_24px_60px_rgba(2,19,41,.3)] sm:p-6">
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-sky">Managed delegation system</p><p className="mt-1 text-sm font-semibold text-white">Recurring work with ownership and boundaries.</p></div><span className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/55">Scope confirmed first</span></div>
    <ol className="mt-5 grid gap-2 sm:grid-cols-2">{stages.map(([label, Icon], index) => <li key={label} className="flex min-h-16 items-center gap-3 rounded-lg border border-white/10 bg-white/[.04] px-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky"><Icon size={18} /></span><div><span className="block text-[10px] font-semibold text-white/65">0{index + 1}</span><span className="text-sm font-semibold text-white">{label}</span></div></li>)}</ol>
    <div className="mt-4 flex items-center gap-3 rounded-lg bg-electric px-4 py-3 text-xs font-semibold text-white"><Workflow size={17} />Human support integrated into the operating workflow.</div>
  </div>;
}

const problems = [
  ['Inbox and calendar keep taking over', 'Scheduling, coordination and follow-up consume time that should stay focused on decisions.', Mail],
  ['Recurring admin keeps falling behind', 'Documents, records and routine tasks need a reliable owner.', ClipboardList],
  ['Customer requests create bottlenecks', 'Routine questions and follow-ups pull specialists away from core work.', Headphones],
  ['Projects need more follow-through', 'Tasks, notes, deadlines and stakeholders need consistent coordination.', FolderKanban],
  ['Business records drift out of date', 'CRM and operational data require regular, careful maintenance.', Database],
  ['The team needs flexible capacity', 'There is meaningful recurring work, but the right support model is still unclear.', UsersRound],
] as const;

export function WorkloadProblemsSection() {
  return <section className="section-space bg-white" aria-labelledby="va-problems-title"><div className="site-container"><span className="eyebrow">Start with the workload</span><h2 id="va-problems-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">What is taking time away from higher-value work?</h2><p className="mt-5 max-w-3xl text-lg leading-8">Useful support begins by identifying recurring work, unclear ownership and the places where coordination keeps returning to senior people.</p><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{problems.map(([title, copy, Icon]) => <article key={title} className="bg-white p-6 transition-colors hover:bg-[#f8fbff]"><IconBadge small><Icon size={21} /></IconBadge><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const services = [
  ['Executive & administrative support', 'Calendar, inbox, meetings, research, documents and follow-up within agreed authority.', CalendarDays],
  ['Operations support', 'Data maintenance, documentation, reporting, vendor coordination and recurring workflows.', Workflow],
  ['Customer support', 'Routine inbox or ticket triage, records, follow-up and escalation routing where offered.', Headphones],
  ['Project coordination', 'Task tracking, notes, status updates, reminders and stakeholder follow-up around an existing plan.', FolderKanban],
  ['Sales support', 'Prospect research, list preparation, CRM maintenance and meeting administration where scoped.', BriefcaseBusiness],
  ['Marketing support', 'Research, scheduling, reporting and campaign administration where current capability supports it.', Sparkles],
] as const;

export function SupportCategoriesSection() {
  return <section id="delegable-work" className="section-space bg-[#f4f7fa]" aria-labelledby="va-services-title"><div className="site-container"><span className="eyebrow">Virtual assistant services</span><h2 id="va-services-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Support organized around the work—not a generic role.</h2><p className="mt-5 max-w-3xl text-lg leading-8">The final service mix depends on the responsibilities, systems, judgment and access involved. Specialist work is included only when the capability is confirmed.</p><div className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{services.map(([title, copy, Icon], index) => <article key={title} className="card p-6"><div className="flex items-start justify-between gap-4"><IconBadge><Icon size={24} /></IconBadge><span className="text-xs font-semibold text-steel">0{index + 1}</span></div><h3 className="mt-6 text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const tasks = ['Calendar & scheduling', 'Inbox administration', 'Meeting preparation', 'Research', 'Document formatting', 'Data entry & cleanup', 'CRM updates', 'Reports & dashboards', 'Customer follow-up', 'Vendor coordination', 'Project coordination', 'File organization', 'Travel administration', 'Recurring process support'];

export function DelegableTasksSection() {
  return <section className="section-space bg-white" aria-labelledby="delegable-tasks-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">Concrete delegation</span><h2 id="delegable-tasks-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Work that no longer needs to sit on your desk.</h2><p className="mt-5 max-w-md text-base leading-7">Start with repeatable responsibilities that have a clear input, outcome, frequency and approval path.</p></div><ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">{tasks.map((task) => <li key={task} className="flex min-h-16 items-center gap-3 bg-white px-5 text-sm font-semibold text-ink"><CheckCircle2 className="shrink-0 text-electric" size={18} />{task}</li>)}</ul></div></section>;
}

export function BoundariesAndAudienceSection() {
  const audiences = ['Founders & business owners', 'Executives', 'Small teams', 'Sales teams', 'Customer-facing teams', 'Growing operations teams'];
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="va-audience-title"><div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20"><div><span className="eyebrow">Who this service is for</span><h2 id="va-audience-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Support for people who need their time back.</h2><p className="mt-5 text-base leading-7">The strongest fit is recurring administrative or operational work that can be scoped, communicated and reviewed.</p><ul className="mt-8 grid gap-3 sm:grid-cols-2">{audiences.map((audience) => <li key={audience} className="flex items-center gap-3 rounded-lg border border-[#c9def3] bg-white/65 px-4 py-3 text-sm font-semibold text-ink"><UsersRound className="text-electric" size={18} />{audience}</li>)}</ul></div><aside className="rounded-xl bg-midnight p-7 text-white md:p-9"><ShieldCheck className="text-sky" size={28} /><p className="mt-6 text-[11px] font-semibold uppercase tracking-[.16em] text-sky">Clear boundaries matter</p><h3 className="mt-3 text-2xl text-white">Some responsibilities should stay with an accountable specialist.</h3><p className="mt-4 text-sm leading-7 text-white/70">Virtual assistants should not independently provide licensed advice, approve financial transactions, hold unrestricted banking access, make strategic decisions beyond scope or perform regulated work without appropriate controls.</p><p className="mt-5 border-t border-white/15 pt-5 text-xs leading-6 text-white/55">Authority, approvals, escalation and excluded work should be documented before access is granted.</p></aside></div></section>;
}

export function WorkflowDocumentationSection() {
  const stages = ['Observe', 'Document', 'Confirm', 'Execute', 'Improve'];
  const copy = ['Watch how the work runs today.', 'Capture steps, inputs and exceptions.', 'Agree ownership and approvals.', 'Run the documented workflow.', 'Review gaps and update the process.'];
  return <section className="section-space bg-white" aria-labelledby="va-workflow-title"><div className="site-container"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-20"><div><span className="eyebrow">Delegation readiness</span><h2 id="va-workflow-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">You do not need a perfect process before you delegate.</h2></div><p className="max-w-2xl text-lg leading-8">Onboarding can capture the current workflow, inputs, outputs, frequency, systems, approval rules and escalation points. Where included, that knowledge becomes a documented delegation workflow.</p></div><ol className="mt-12 grid gap-5 md:grid-cols-5">{stages.map((stage, index) => <li key={stage} className="relative border-l border-[#9fc4ed] pb-5 pl-7 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-8"><span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white md:-top-4 md:left-0">{index + 1}</span><h3 className="text-lg">{stage}</h3><p className="mt-2 text-sm leading-6">{copy[index]}</p></li>)}</ol><div className="mt-10 rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-6"><p className="text-xs font-semibold uppercase tracking-[.14em] text-electric">Potential output</p><p className="mt-2 font-semibold text-ink">Documented delegation workflow or SOP, where included in scope.</p></div></div></section>;
}

export function MatchingAndVettingSection() {
  const matching = ['Role requirements', 'Task complexity', 'Tool familiarity', 'Communication needs', 'Working-hour overlap', 'Business context', 'Language requirements', 'Relevant experience'];
  const screening = ['Identity and references where used', 'Interview and communication review', 'Experience and tool review', 'Practical assessment where relevant', 'Security and acceptable-use onboarding'];
  return <section className="section-space bg-[#f4f7fa]" aria-labelledby="va-matching-title"><div className="site-container grid gap-8 lg:grid-cols-2"><article className="card p-7 md:p-9"><UserRoundCheck className="text-electric" size={28} /><span className="eyebrow mt-6">Matching</span><h2 id="va-matching-title" className="text-[clamp(2rem,3vw,2.75rem)] leading-tight">Match support to the work.</h2><p className="mt-4 text-base leading-7">Selection should follow the responsibilities and working context rather than a vague profile.</p><ul className="mt-7 grid gap-3 sm:grid-cols-2">{matching.map((item) => <li key={item} className="flex gap-2 text-sm leading-6"><CheckCircle2 className="mt-1 shrink-0 text-electric" size={16} />{item}</li>)}</ul></article><article className="card p-7 md:p-9"><Search className="text-electric" size={28} /><span className="eyebrow mt-6">Selection transparency</span><h2 className="text-[clamp(2rem,3vw,2.75rem)] leading-tight">Know how access is being assigned.</h2><p className="mt-4 text-base leading-7">The approved screening process and assistant employment or contracting structure must be confirmed before publication and in the engagement.</p><ul className="mt-7 grid gap-3">{screening.map((item) => <li key={item} className="flex gap-2 text-sm leading-6"><CheckCircle2 className="mt-1 shrink-0 text-electric" size={16} />{item}</li>)}</ul></article></div></section>;
}

export function SecurityAccessSection() {
  const controls = [
    ['Least-privilege access', 'Provide only the permissions required for agreed tasks.'], ['Client-controlled accounts', 'Keep ownership of business systems with the client where practical.'],
    ['Assigned users & roles', 'Use delegated access or role-based permissions where tools support them.'], ['Credential handling', 'Avoid sending passwords through unsecured channels; agree an approved method.'],
    ['Two-factor authentication', 'Use available authentication controls for relevant accounts.'], ['Offboarding', 'Revoke or reassign access promptly when responsibilities change or support ends.'],
  ];
  return <section className="section-space bg-midnight text-white" aria-labelledby="va-security-title"><div className="site-container"><span className="text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Security & account ownership</span><h2 id="va-security-title" className="mt-4 max-w-4xl text-[clamp(2.3rem,4vw,3.6rem)] leading-[1.08] text-white">Access should be useful, not unlimited.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">Security controls, confidentiality terms, approved storage, tool access and offboarding should be defined for the actual engagement. ITGS does not claim unverified security certifications.</p><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/10 md:grid-cols-2 lg:grid-cols-3">{controls.map(([title, copy]) => <article key={title} className="bg-midnight p-6"><KeyRound className="text-sky" size={22} /><h3 className="mt-5 text-lg text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{copy}</p></article>)}</div><div className="mt-7 flex flex-col gap-3 rounded-xl border border-sky/25 bg-sky/[.06] p-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-3xl text-sm leading-6 text-white/75"><strong className="text-white">Account ownership:</strong> email, calendar, CRM, project, social and commerce accounts should normally remain client-controlled, with access granted through approved users and roles.</p><ShieldCheck className="shrink-0 text-sky" size={30} /></div></div></section>;
}

export function ToolsCommunicationSection() {
  const tools = [
    ['Communication', 'Approved email, messaging and meeting tools'], ['Productivity', 'Approved document, calendar and workspace tools'],
    ['Project coordination', 'Existing task and project-management systems'], ['CRM & records', 'Approved customer and operational databases'],
    ['Customer support', 'Existing inbox or ticketing systems where scoped'], ['Documentation', 'Client-approved shared drives, wikis and knowledge systems'],
  ];
  return <section className="section-space bg-white" aria-labelledby="va-tools-title"><div className="site-container"><div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-20"><div><span className="eyebrow">Workflow integration</span><h2 id="va-tools-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Work inside the tools your team already uses.</h2><p className="mt-5 text-base leading-7">The assistant should fit the approved workflow. Specific tools are confirmed against capability, permissions and data-handling requirements before commitment.</p></div><div className="grid gap-3 sm:grid-cols-2">{tools.map(([title, copy]) => <article key={title} className="rounded-xl border border-border bg-[#fbfdff] p-5"><Network className="text-electric" size={20} /><h3 className="mt-4 text-base">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div></div><div className="mt-12 grid gap-6 border-t border-border pt-10 md:grid-cols-3"><article><MessageSquareText className="text-electric" size={23} /><h3 className="mt-4 text-xl">Clear communication</h3><p className="mt-3 text-sm leading-6">Agree where requests live, how priorities change, when updates happen and how exceptions are escalated.</p></article><article><Clock3 className="text-electric" size={23} /><h3 className="mt-4 text-xl">Defined availability</h3><p className="mt-3 text-sm leading-6">Working hours, overlap, capacity and response expectations require confirmation. No 24/7 coverage is implied.</p></article><article><RefreshCw className="text-electric" size={23} /><h3 className="mt-4 text-xl">Continuity planning</h3><p className="mt-3 text-sm leading-6">Documentation, handover, access changes and any backup or rematching process should be agreed. Backup coverage is not assumed.</p></article></div></div></section>;
}

export function OperatingModelSection() {
  const models = [['Client-directed', 'The client assigns work and manages priorities directly.'], ['Managed support', 'An ITGS operations layer supports delivery, quality and administration where offered.'], ['Hybrid', 'The client owns priorities while ITGS supports the operating structure where agreed.']];
  return <section className="section-space bg-[#f4f7fa]" aria-labelledby="va-model-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">Engagement clarity</span><h2 id="va-model-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Define who manages the work.</h2><p className="mt-5 text-base leading-7">Dedicated or shared support, part-time or full-time capacity, management, coverage, contract structure and pricing must be confirmed in the written scope.</p></div><div className="grid gap-4 md:grid-cols-3">{models.map(([title, copy], index) => <article key={title} className="card p-6"><span className="text-sm font-semibold text-electric">0{index + 1}</span><h3 className="mt-4 text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

export function DelegateAutomateSection({ setActivePage }: Navigate) {
  const paths = [
    ['Delegate', 'Use human support for judgment, communication, changing context, coordination and exceptions.', UserRoundCheck],
    ['Automate', 'Use software for stable, rule-based, high-volume work that can be automated safely.', Bot],
    ['Combine both', 'Let automation handle predictable steps while a person manages exceptions and follow-through.', Workflow],
  ] as const;
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="delegate-automate-title"><div className="site-container"><span className="eyebrow">Human support + technology</span><h2 id="delegate-automate-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Should this work be delegated or automated?</h2><p className="mt-5 max-w-3xl text-lg leading-8">The right answer can change by task. Confidential client information should never be placed in unapproved AI tools, and automated output still needs appropriate review.</p><div className="mt-10 grid gap-4 md:grid-cols-3">{paths.map(([title, copy, Icon]) => <article key={title} className="card p-7"><IconBadge><Icon size={24} /></IconBadge><h3 className="mt-6 text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div><a href={servicePath('web-development')} onClick={(event) => { event.preventDefault(); trackSiteEvent('related_service_click', { source: 'virtual_assistance', service: 'web-development' }); setActivePage('Service:web-development'); }} className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Explore workflow technology with Web Development <ArrowRight size={16} /></a></div></section>;
}

export function MeasurementAndPricingSection() {
  const measures = ['Task completion', 'Turnaround or response', 'Scheduling accuracy', 'Data accuracy', 'Backlog movement', 'Process consistency', 'Customer response quality', 'Capacity use where relevant'];
  return <section className="section-space bg-white" aria-labelledby="va-measurement-title"><div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20"><div><span className="eyebrow">Quality & visibility</span><h2 id="va-measurement-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Work should be visible.</h2><p className="mt-5 text-base leading-7">Review completed work, outstanding items, blockers, changing priorities and process improvements at an agreed cadence. Measure delivery against the outcome—not surveillance.</p><ul className="mt-8 grid gap-3 sm:grid-cols-2">{measures.map((measure) => <li key={measure} className="flex gap-2 text-sm"><CheckCircle2 className="shrink-0 text-electric" size={17} />{measure}</li>)}</ul></div><aside className="rounded-xl border border-border bg-[#f8fbff] p-7 md:p-9"><p className="eyebrow">Engagement & pricing</p><h3 className="text-2xl">Scope determines the support model.</h3><p className="mt-4 text-sm leading-7">Pricing should reflect capacity, role, task complexity, required coverage, tools, access, communication and the level of management or continuity included.</p><p className="mt-5 rounded-lg border border-[#cfe0f5] bg-white p-4 text-sm leading-6"><strong className="text-ink">Confirmation required:</strong> part-time, full-time, dedicated, shared, managed-support and custom-team options must not be published as available until ITGS confirms them.</p></aside></div></section>;
}

export function WhyVirtualAssistanceSection() {
  const reasons = [
    ['Start with the workload', 'Identify recurring responsibilities before selecting a support profile.'], ['Connect people and systems', 'Integrate support into approved tools, permissions and communication.'],
    ['Document recurring work', 'Reduce dependence on undocumented context where SOP support is included.'], ['Keep authority clear', 'Define ownership, approval and escalation boundaries.'],
    ['Review the operating model', 'Improve delegation and identify work that is better automated.'], ['Protect client control', 'Prefer client-owned accounts and revocable access where practical.'],
  ];
  return <section className="section-space bg-white" aria-labelledby="why-va-title"><div className="site-container"><span className="eyebrow">Why ITGS</span><h2 id="why-va-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Build an operating layer—not a loose collection of tasks.</h2><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{reasons.map(([title, copy]) => <article key={title} className="bg-white p-6"><h3 className="text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

export function RelatedVAServiceSection({ setActivePage }: Navigate) {
  const related = [
    ['E-commerce Solutions', 'Coordinate catalog or commerce administration where relevant.', 'e-commerce'],
    ['Lead Generation', 'Support research, CRM maintenance and follow-up administration where scoped.', 'lead-generation'],
    ['Digital Marketing', 'Coordinate approved marketing administration and reporting.', 'digital-marketing'],
    ['Web Development', 'Replace suitable manual work with software or workflow automation.', 'web-development'],
  ];
  return <RelatedServicesSection titleId="va-related-title" title="Connect operational support with the system around it." services={related.map(([, copy, id]) => ({ id, description: copy }))} source="virtual_assistance" setActivePage={setActivePage} />;
}

export function VAInsightsSection({ posts, loading, setActivePage }: { posts: BlogPost[]; loading: boolean } & Navigate) {
  const enabled = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  const visible = enabled ? posts.filter((post) => post.status === 'Published' && /virtual assistant|delegat|administrative|operations|workflow|SOP|executive assistant/i.test(`${post.category} ${post.title}`)).slice(0, 3) : [];
  if (!loading && visible.length === 0) return null;
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="va-insights-title"><div className="site-container"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="eyebrow">Virtual assistant insights</span><h2 id="va-insights-title" className="text-[clamp(2.2rem,4vw,3.45rem)]">Guidance for responsible delegation.</h2></div><a href={pathForPage('Blog')} onClick={(event) => { event.preventDefault(); trackSiteEvent('insight_click', { source: 'virtual_assistance' }); setActivePage('Blog'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Browse all insights <ArrowRight size={16} /></a></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{visible.map((post) => <article key={post.id} className="card p-6"><span className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">{post.category}</span><h3 className="mt-4 text-xl leading-7"><a href={`/insights/${post.slug}/`} className="hover:underline">{post.title}</a></h3><p className="mt-3 line-clamp-3 text-sm leading-6">{post.excerpt || post.content}</p><p className="mt-6 text-xs text-steel">{post.date} · {post.readTime}</p></article>)}</div></div></section>;
}

