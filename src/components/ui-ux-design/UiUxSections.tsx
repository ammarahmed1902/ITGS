import {
  Accessibility,
  AppWindow,
  ArrowRight,
  Blocks,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Eye,
  FileSearch,
  GitBranch,
  Grid2X2,
  Layers3,
  LayoutDashboard,
  LayoutTemplate,
  ListTree,
  MonitorSmartphone,
  MousePointerClick,
  Network,
  PanelTop,
  PenTool,
  Search,
  Smartphone,
  UsersRound,
} from 'lucide-react';
import type { BlogPost } from '../../domain/entities/BlogPost';
import { pathForPage, trackSiteEvent } from '../../lib/siteNavigation';
import IconBadge from '../IconBadge';
import RelatedServicesSection from '../service-cards/RelatedServicesSection';

type Navigate = { setActivePage: (page: string) => void };

const experienceTypes = [
  { title: 'Web applications', copy: 'Complex browser-based products, workflows and role-based experiences.', icon: AppWindow },
  { title: 'Mobile applications', copy: 'Focused iOS, Android and cross-platform journeys shaped around mobile behavior.', icon: Smartphone },
  { title: 'SaaS products', copy: 'Multi-feature products requiring clear navigation, onboarding and scalable patterns.', icon: Layers3 },
  { title: 'Customer & employee portals', copy: 'Self-service experiences organized around information, tasks and permissions.', icon: UsersRound },
  { title: 'Dashboards & data products', copy: 'Interfaces that make complex information easier to understand and act on.', icon: LayoutDashboard },
  { title: 'Conversion experiences', copy: 'Relevant web journeys where hierarchy, forms and decision paths affect action.', icon: MousePointerClick },
];

export function ExperienceTypesSection() {
  return <section className="section-space bg-white" aria-labelledby="experience-types-title"><div className="site-container"><span className="eyebrow">Digital experiences we design</span><h2 id="experience-types-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Design shaped around the product people need to use.</h2><p className="mt-5 max-w-3xl text-lg leading-8">The interface follows the users, tasks, content, technical environment and business objective rather than a preselected visual style.</p><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{experienceTypes.map(({ title, copy, icon: Icon }) => <article key={title} className="bg-white p-7 transition-colors hover:bg-[#f8fbff]"><IconBadge><Icon size={25} /></IconBadge><h3 className="mt-6 text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const capabilities = [
  ['UX research', 'Select appropriate evidence-gathering activities before major design decisions.', Search],
  ['UX strategy', 'Connect user needs, business requirements and product constraints.', GitBranch],
  ['Information architecture', 'Organize content, functionality, navigation and hierarchy.', ListTree],
  ['User journeys', 'Map important tasks and identify friction or unnecessary steps.', Network],
  ['Wireframing', 'Define structure and priority before visual detail.', LayoutTemplate],
  ['UI design', 'Create responsive interfaces aligned with the product and brand.', PenTool],
  ['Interaction design', 'Define how controls, states and feedback respond to people.', MousePointerClick],
  ['Interactive prototyping', 'Make important journeys reviewable before development.', AppWindow],
  ['Usability evaluation', 'Test or review important assumptions where appropriate and scoped.', Eye],
  ['Design systems', 'Create reusable foundations, components, states and guidance.', Blocks],
  ['Developer handoff', 'Document behavior, responsive rules, assets and implementation details.', Code2],
] as const;

export function UiUxCapabilitiesSection() {
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="uiux-capabilities-title"><div className="site-container"><div className="grid gap-7 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><span className="eyebrow">UI/UX design services</span><h2 id="uiux-capabilities-title" className="text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">From evidence to implementation-ready design.</h2></div><p className="max-w-xl text-lg leading-8 lg:justify-self-end">The exact activity mix depends on the product stage, available evidence, users, risk and agreed scope.</p></div><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{capabilities.map(([title, copy, Icon]) => <article key={title as string} className="bg-white p-6"><Icon className="text-electric" size={22} /><h3 className="mt-5 text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const researchMethods = ['Stakeholder interviews', 'User interviews', 'Analytics review', 'Competitor analysis', 'Heuristic evaluation', 'Support or feedback review', 'Session evidence', 'Usability testing'];

export function ResearchEvidenceSection() {
  return <section className="section-space bg-white" aria-labelledby="research-evidence-title"><div className="site-container grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20"><div><span className="eyebrow">Research & discovery</span><h2 id="research-evidence-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Design decisions start with evidence.</h2><p className="mt-5 text-base leading-7">Research activities are selected according to the product, available evidence, project stage and scope. No method is presented as completed unless it actually occurred.</p><p className="mt-5 text-sm leading-6 text-steel">Personas, where useful, should be grounded in relevant behavioral evidence rather than invented demographics.</p></div><div><div className="grid gap-3 sm:grid-cols-2">{researchMethods.map((method) => <div key={method} className="flex min-h-16 items-center gap-3 rounded-lg border border-border bg-[#fafcfe] px-4"><FileSearch size={19} className="shrink-0 text-electric" /><span className="text-sm font-semibold text-ink">{method}</span></div>)}</div><div className="mt-6 rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-6"><h3 className="text-lg">Define what “better” means.</h3><p className="mt-2 text-sm leading-6">Success criteria may relate to task completion, unnecessary steps, abandonment, product adoption, consistency, accessibility, development efficiency or support friction. These are objectives to measure, not guaranteed outcomes.</p></div></div></div></section>;
}

const auditAreas = ['Navigation', 'Information architecture', 'User flows', 'Visual hierarchy', 'Consistency', 'Accessibility', 'Responsive behavior', 'Form friction', 'Error handling', 'Interaction states'];

export function UxAuditSection({ setActivePage }: Navigate) {
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="ux-audit-title"><div className="site-container grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20"><div><span className="eyebrow">UX audit & redesign</span><h2 id="ux-audit-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Already have a product? Start with the friction.</h2><p className="mt-5 text-base leading-7">An existing experience can be reviewed around the journeys that matter most. The goal is to prioritize useful improvements before committing to a complete redesign.</p><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('ux_audit_cta', { location: 'uiux_service' }); setActivePage('Contact'); }} className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Discuss a UX audit <ArrowRight size={17} /></a></div><div className="rounded-xl border border-[#c8dff3] bg-white/75 p-6"><h3 className="text-xl">Potential review areas</h3><ul className="mt-5 grid gap-3 sm:grid-cols-2">{auditAreas.map((item) => <li key={item} className="flex gap-3 text-sm text-steel"><CheckCircle2 size={18} className="shrink-0 text-electric" />{item}</li>)}</ul><p className="mt-6 border-t border-border pt-5 text-xs font-semibold text-[#174c87]">Potential output: prioritized UX findings and recommended improvements</p></div></div></section>;
}

const architectureItems = [
  ['Content & features', 'Group related information and capability around user intent.'],
  ['Navigation', 'Create clear paths through the product without exposing unnecessary complexity.'],
  ['Permissions', 'Show the right information and actions for each relevant role.'],
  ['Workflows', 'Sequence decisions, inputs and feedback around the task.'],
];

export function InformationArchitectureSection() {
  return <section className="section-space bg-white" aria-labelledby="information-architecture-title"><div className="site-container"><div className="max-w-3xl"><span className="eyebrow">Information architecture & journeys</span><h2 id="information-architecture-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Make the product understandable before making it visually attractive.</h2><p className="mt-5 text-lg leading-8">Information architecture defines how content, features, permissions and workflows fit together. User journeys then make important tasks explicit and reviewable.</p></div><div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{architectureItems.map(([title, copy], index) => <article key={title} className="bg-white p-6"><span className="text-xs font-semibold text-electric">0{index + 1}</span><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

export function PrototypeValidationSection() {
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="prototype-validation-title"><div className="site-container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20"><div><span className="eyebrow !text-sky">Prototype & validation</span><h2 id="prototype-validation-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Make important journeys testable before expensive development.</h2><p className="mt-5 text-base leading-7 text-white/65">Interactive prototypes can expose unclear flows, missing states and feasibility questions while changes are still easier to make.</p></div><div className="grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 sm:grid-cols-2">{([
    ['Stakeholder review', 'Check the design against the business requirement and agreed scope.', ClipboardCheck],
    ['Usability testing', 'Observe relevant users completing important tasks when research is included.', UsersRound],
    ['Accessibility review', 'Assess design criteria such as contrast, focus, labels, errors and touch targets.', Accessibility],
    ['Feasibility review', 'Review behavior, systems and component implications with engineering.', Code2],
  ] as const).map(([title, copy, Icon]) => <article key={title as string} className="bg-[#0a2239] p-7"><Icon className="text-sky" size={23} /><h3 className="mt-5 text-xl text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{copy}</p></article>)}</div></div></section>;
}

const inclusive = [
  ['Accessibility criteria', 'Consider contrast, type size, focus, keyboard use, labels, errors, touch targets and reduced motion.', Accessibility],
  ['Responsive behavior', 'Define how hierarchy, navigation, layout and actions adapt across desktop, tablet and mobile.', MonitorSmartphone],
  ['Interaction states', 'Design selected, loading, success, empty, disabled and error states where relevant.', MousePointerClick],
] as const;

export function InclusiveResponsiveSection() {
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="inclusive-responsive-title"><div className="site-container"><span className="eyebrow">Accessibility & responsive design</span><h2 id="inclusive-responsive-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Designed to work for more people, contexts and screens.</h2><p className="mt-5 max-w-3xl text-lg leading-8">Accessibility and responsive behavior should influence requirements and component states early. Accessibility criteria can be incorporated without claiming universal WCAG compliance.</p><div className="mt-10 grid gap-4 lg:grid-cols-3">{inclusive.map(([title, copy, Icon]) => <article key={title as string} className="card p-7"><IconBadge><Icon size={24} /></IconBadge><h3 className="mt-6 text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const systemItems = ['Foundations', 'Typography', 'Spacing', 'Color tokens', 'Reusable components', 'Interaction states', 'Responsive rules', 'Accessibility guidance', 'Documentation'];

export function DesignSystemsHandoffSection() {
  return <><section className="section-space bg-white" aria-labelledby="design-systems-title"><div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><span className="eyebrow">Design systems</span><h2 id="design-systems-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Systems that keep products consistent.</h2><p className="mt-5 text-base leading-7">A design system can support consistency, reuse and clearer implementation across a growing product. The required depth depends on the product and team.</p></div><div><ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{systemItems.map((item) => <li key={item} className="flex min-h-16 items-center gap-3 rounded-lg border border-border bg-[#fafcfe] px-4"><Grid2X2 size={18} className="shrink-0 text-electric" /><span className="text-sm font-semibold text-ink">{item}</span></li>)}</ul><div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#174c87]"><span>Design tokens</span><ArrowRight size={14} /><span>Reusable components</span><ArrowRight size={14} /><span>Engineering</span><ArrowRight size={14} /><span>QA & governance</span></div></div></div></section><section className="section-space bg-[#eaf4fc]" aria-labelledby="handoff-title"><div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20"><div><span className="eyebrow">Developer handoff & design QA</span><h2 id="handoff-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Designed to survive development.</h2><p className="mt-5 text-base leading-7">Useful UI/UX work continues beyond an approved Figma screen. Handoff can clarify behavior, responsive rules, assets, states, component references and implementation priorities.</p></div><div className="rounded-xl border border-[#c8dff3] bg-white/75 p-7"><h3 className="text-xl">Shared context reduces drift.</h3><p className="mt-3 text-sm leading-7">Designers and developers can review feasibility before handoff and material differences during implementation. Design QA is included only when agreed in scope.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Behavior notes', 'Responsive rules', 'Component references', 'Implementation review'].map((item) => <span key={item} className="min-w-0 break-words rounded-lg border border-border bg-white px-4 py-3 text-sm font-semibold text-ink">{item}</span>)}</div></div></div></section></>;
}

const audiences = [
  ['New product teams', 'Turn requirements and assumptions into a clear, testable product experience.'],
  ['Established product teams', 'Improve friction, usability or difficult workflows in an existing product.'],
  ['Growing SaaS businesses', 'Create reusable patterns and systems that support more features and teams.'],
  ['Enterprise teams', 'Bring consistency and clarity to complex products, roles and workflows.'],
  ['Development teams', 'Receive implementation-ready UX/UI without building a complete internal design function.'],
];

export function UiUxAudienceSection() {
  return <section className="section-space bg-white" aria-labelledby="uiux-audience-title"><div className="site-container"><span className="eyebrow">Who this service is for</span><h2 id="uiux-audience-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">UI/UX design for different product challenges.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{audiences.map(([title, copy], index) => <article key={title} className="card p-6"><span className="text-xs font-semibold text-electric">0{index + 1}</span><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const reasons = [
  ['Evidence before assumptions', 'Use available research and product evidence to guide decisions.', Search],
  ['Complexity made understandable', 'Organize workflows and information before visual polish.', ListTree],
  ['Design and engineering together', 'Reduce gaps between approved design and implementation.', Code2],
  ['Accessibility considered early', 'Include relevant criteria before interfaces are complete.', Accessibility],
  ['Reusable systems', 'Create patterns that support consistency and future work.', Blocks],
  ['Design that can be evaluated', 'Make important journeys reviewable before development.', Eye],
] as const;

export function WhyUiUxSection() {
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="why-uiux-title"><div className="site-container"><span className="eyebrow !text-sky">Why design with ITGS</span><h2 id="why-uiux-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Design connected to the product, implementation and outcome.</h2><div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-3">{reasons.map(([title, copy, Icon]) => <article key={title} className="bg-[#0a2239] p-7"><Icon className="text-sky" size={23} /><h3 className="mt-5 text-xl text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{copy}</p></article>)}</div></div></section>;
}

const related = [
  { id: 'web-development', title: 'Web Development', copy: 'Turn approved product designs into responsive web experiences and applications.', icon: PanelTop },
  { id: 'mobile-development', title: 'Mobile App Development', copy: 'Connect mobile product design with iOS, Android and cross-platform delivery.', icon: Smartphone },
  { id: 'seo', title: 'Search Engine Optimization', copy: 'Coordinate content UX, navigation and search-ready web structures where relevant.', icon: Search },
  { id: 'digital-marketing', title: 'Digital Marketing', copy: 'Connect acquisition and conversion journeys with the wider customer experience.', icon: BookOpenCheck },
];

export function RelatedUiUxServices({ setActivePage }: Navigate) {
  return <RelatedServicesSection titleId="related-uiux-title" title="Expertise that carries product design into delivery." services={related.map(({ id, copy }) => ({ id, description: copy }))} source="uiux_design" setActivePage={setActivePage} />;
}

export function UiUxInsightsSection({ posts, loading, setActivePage }: { posts: BlogPost[]; loading: boolean } & Navigate) {
  const enabled = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  const visible = enabled ? posts.filter((post) => post.status === 'Published' && /ui\/ux|ux|design system|usability|accessibility|product design/i.test(`${post.category} ${post.title}`)).slice(0, 3) : [];
  if (!loading && visible.length === 0) return null;
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="uiux-insights-title"><div className="site-container"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="eyebrow">UI/UX insights</span><h2 id="uiux-insights-title" className="text-[clamp(2.2rem,4vw,3.45rem)]">Guidance for clearer product decisions.</h2></div><a href={pathForPage('Blog')} onClick={(event) => { event.preventDefault(); setActivePage('Blog'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Browse all insights <ArrowRight size={16} /></a></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{visible.map((post) => <article key={post.id} className="card p-6"><span className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">{post.category}</span><h3 className="mt-4 text-xl leading-7"><a href={`/insights/${post.slug}/`} className="hover:underline">{post.title}</a></h3><p className="mt-3 line-clamp-3 text-sm leading-6">{post.excerpt || post.content}</p><p className="mt-6 text-xs text-steel">{post.date} · {post.readTime}</p></article>)}</div></div></section>;
}


