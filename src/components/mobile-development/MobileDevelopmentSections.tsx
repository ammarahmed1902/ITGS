import {
  Accessibility,
  Activity,
  AppWindow,
  ArrowRight,
  Bell,
  Blocks,
  BookOpenCheck,
  Braces,
  CheckCircle2,
  CloudCog,
  Code2,
  Database,
  FileCheck2,
  Gauge,
  GitBranch,
  KeyRound,
  LayoutTemplate,
  Link2,
  MapPin,
  MonitorCheck,
  Network,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Store,
  TestTube2,
  UsersRound,
  WifiOff,
} from 'lucide-react';
import type { BlogPost } from '../../domain/entities/BlogPost';
import { pathForPage, trackSiteEvent } from '../../lib/siteNavigation';
import IconBadge from '../IconBadge';
import RelatedServicesSection from '../service-cards/RelatedServicesSection';

type Navigate = { setActivePage: (page: string) => void };

const appTypes = [
  { title: 'Consumer mobile apps', copy: 'Focused customer experiences designed around useful recurring tasks and clear journeys.', icon: Smartphone },
  { title: 'Business & enterprise apps', copy: 'Mobile access to operational workflows, information and approvals away from a desk.', icon: UsersRound },
  { title: 'Customer self-service apps', copy: 'Account, service, booking and support experiences organized around customer needs.', icon: AppWindow },
  { title: 'Booking & service apps', copy: 'Scheduling, appointment management and service interactions with clear confirmation states.', icon: BookOpenCheck },
  { title: 'Connected mobile products', copy: 'Applications that exchange data with agreed APIs, platforms and business systems.', icon: Network },
  { title: 'App modernization', copy: 'Improve an existing product’s user experience, maintainability and technical direction.', icon: RefreshCw },
];

export function MobileAppTypesSection() {
  return <section className="section-space bg-white" aria-labelledby="mobile-app-types-title"><div className="site-container"><div className="max-w-3xl"><span className="eyebrow">Mobile applications we build</span><h2 id="mobile-app-types-title" className="text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">The product shape follows the job it needs to do.</h2><p className="mt-5 max-w-2xl text-lg leading-8">The audience, workflows, systems and operating context determine the application—not a preselected template.</p></div><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{appTypes.map(({ title, copy, icon: Icon }) => <article key={title} className="bg-white p-7 transition-colors hover:bg-[#f8fbff]"><IconBadge><Icon size={25} strokeWidth={1.7} /></IconBadge><h3 className="mt-6 text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const approaches = [
  { title: 'Native iOS development', copy: 'Considered when Apple-platform conventions, device capabilities, performance needs or an iOS-first audience justify a dedicated implementation.', icon: Smartphone },
  { title: 'Native Android development', copy: 'Considered when Android-specific behavior, device diversity, integrations or audience needs make a dedicated approach appropriate.', icon: Smartphone },
  { title: 'Cross-platform development', copy: 'Considered when a shared implementation across iOS and Android fits the experience, integrations, delivery constraints and maintenance model.', icon: GitBranch },
];

const comparison = [
  ['Performance & device access', 'A native approach can provide the most direct platform access. Cross-platform capability depends on the selected framework and required features.'],
  ['Shared implementation', 'Cross-platform delivery may share more code. Native products typically maintain separate platform implementations.'],
  ['Experience requirements', 'Both approaches can support strong experiences; platform-specific interaction and visual requirements affect the decision.'],
  ['Delivery & maintenance', 'Team capability, release cadence, testing scope and long-term ownership matter as much as initial delivery speed.'],
];

export function PlatformApproachSection({ setActivePage }: Navigate) {
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="platform-approach-title"><div className="site-container"><div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><span className="eyebrow">Platform strategy</span><h2 id="platform-approach-title" className="text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">The right mobile approach for the product.</h2></div><p className="max-w-xl text-lg leading-8 lg:justify-self-end">Platform decisions should follow the users, product requirements, performance needs, integrations, team constraints and long-term maintainability.</p></div><div className="mt-11 grid gap-4 lg:grid-cols-3">{approaches.map(({ title, copy, icon: Icon }) => <article key={title} className="card p-7"><IconBadge><Icon size={24} /></IconBadge><h3 className="mt-6 text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div><div className="mt-8 overflow-hidden rounded-xl border border-border bg-white"><div className="border-b border-border px-6 py-5"><h3 className="text-xl">Native and cross-platform: what discovery evaluates</h3></div><dl className="grid lg:grid-cols-2">{comparison.map(([term, description]) => <div key={term} className="border-b border-border p-6 last:border-0 lg:border-r lg:[&:nth-child(even)]:border-r-0"><dt className="font-semibold text-ink">{term}</dt><dd className="mt-2 text-sm leading-6 text-steel">{description}</dd></div>)}</dl></div><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('mobile_approach_cta', { location: 'platform_comparison' }); setActivePage('Contact'); }} className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Discuss the right approach for your app <ArrowRight size={17} /></a></div></section>;
}

const strategyInputs = ['Business objective', 'Target users & problems', 'Feature priorities', 'Systems & integrations', 'Platform requirements', 'Security & privacy needs', 'Analytics requirements', 'Release constraints'];
const strategyOutputs = ['Product brief', 'Prioritized feature scope', 'User journeys', 'Platform recommendation', 'Technical direction', 'Delivery roadmap'];

export function MobileStrategySection() {
  return <section className="section-space bg-white" aria-labelledby="mobile-strategy-title"><div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><span className="eyebrow">Product strategy & discovery</span><h2 id="mobile-strategy-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Build the right app before building the app right.</h2><p className="mt-5 text-base leading-7">Development should begin after the essential product decisions are understood. Discovery connects the business need with the users, platforms, systems and release plan.</p></div><div className="grid gap-5 sm:grid-cols-2"><article className="rounded-xl border border-border bg-[#fafcfe] p-6"><h3 className="text-lg">Discovery considers</h3><ul className="mt-5 grid gap-3">{strategyInputs.map((item) => <li key={item} className="flex gap-3 text-sm text-steel"><CheckCircle2 size={18} className="shrink-0 text-electric" aria-hidden="true" />{item}</li>)}</ul></article><article className="rounded-xl border border-border bg-[#eef6ff] p-6"><h3 className="text-lg">Potential planning outputs</h3><ul className="mt-5 grid gap-3">{strategyOutputs.map((item) => <li key={item} className="flex gap-3 text-sm text-steel"><FileCheck2 size={18} className="shrink-0 text-electric" aria-hidden="true" />{item}</li>)}</ul><p className="mt-5 border-t border-[#cfe0f5] pt-4 text-xs leading-5 text-steel">Final outputs depend on the agreed discovery scope.</p></article></div></div></section>;
}

const uxPractices = [
  { title: 'User flows', copy: 'Map the steps people need to complete important tasks.', icon: GitBranch },
  { title: 'Information architecture', copy: 'Organize content and actions around mobile priorities.', icon: Blocks },
  { title: 'Wireframes', copy: 'Test structure before investing in detailed interface work.', icon: LayoutTemplate },
  { title: 'Interactive prototypes', copy: 'Review key journeys and interaction states before development.', icon: AppWindow },
  { title: 'Platform conventions', copy: 'Respect familiar iOS and Android behaviors where they improve clarity.', icon: Smartphone },
  { title: 'Accessible interaction', copy: 'Consider readable content, focus, labels, contrast and touch targets.', icon: Accessibility },
];

export function MobileUxSection() {
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="mobile-ux-title"><div className="site-container"><span className="eyebrow">Mobile UX & product design</span><h2 id="mobile-ux-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Mobile UX designed around real behavior.</h2><p className="mt-5 max-w-3xl text-lg leading-8">A mobile experience should respond to context, touch, interruptions and platform expectations. It should not feel like a desktop interface compressed into a smaller screen.</p><div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[#c8dff3] bg-[#c8dff3] sm:grid-cols-2 lg:grid-cols-3">{uxPractices.map(({ title, copy, icon: Icon }) => <article key={title} className="bg-white/80 p-6"><Icon className="text-electric" size={23} aria-hidden="true" /><h3 className="mt-5 text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const quality = [
  { title: 'Performance', copy: 'Plan for responsive interaction, efficient data use and appropriate startup behavior.', icon: Gauge },
  { title: 'Reliability', copy: 'Handle expected errors, interrupted tasks and changing connection conditions clearly.', icon: Activity },
  { title: 'Security & privacy', copy: 'Consider authentication, authorization, secure storage, encrypted communication and permissions.', icon: ShieldCheck },
  { title: 'Accessibility', copy: 'Use relevant platform accessibility practices and inclusive interaction patterns.', icon: Accessibility },
  { title: 'Device compatibility', copy: 'Define an agreed support matrix across relevant devices, screen sizes and OS versions.', icon: MonitorCheck },
  { title: 'Maintainability', copy: 'Use structured implementation, documentation and release practices that support future work.', icon: Code2 },
];

export function MobileQualitySection() {
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="mobile-quality-title"><div className="site-container"><div className="grid gap-6 lg:grid-cols-2 lg:items-end"><div><span className="eyebrow !text-sky">Product quality</span><h2 id="mobile-quality-title" className="max-w-2xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08] text-white">Built for real-world mobile use.</h2></div><p className="max-w-xl text-lg leading-8 text-white/65 lg:justify-self-end">Quality covers more than a successful build. It includes how the app behaves across users, devices, networks, permissions and future releases.</p></div><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-3">{quality.map(({ title, copy, icon: Icon }) => <article key={title} className="bg-[#0a2239] p-7"><span className="flex size-12 items-center justify-center rounded-xl border border-sky/20 bg-sky/10 text-sky"><Icon size={23} strokeWidth={1.7} /></span><h3 className="mt-6 text-xl text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{copy}</p></article>)}</div><p className="mt-8 max-w-4xl border-t border-white/15 pt-7 text-sm leading-7 text-white/65">For regulated or sensitive products, applicable security, privacy and compliance requirements must be identified during discovery. The architecture can be designed to support agreed requirements; no universal compliance claim is made.</p></div></section>;
}

const integrationCapabilities = [
  { title: 'APIs & business systems', copy: 'Connect with documented APIs, web platforms, CRM, ERP, booking or other agreed systems.', icon: Link2 },
  { title: 'Authentication', copy: 'Plan sign-in, roles, permissions and secure session behavior around the product requirements.', icon: KeyRound },
  { title: 'Notifications & live updates', copy: 'Use push notifications or real-time data where they provide a clear user benefit.', icon: Bell },
  { title: 'Device capabilities', copy: 'Consider location, maps, camera, files or other device features when the use case requires them.', icon: MapPin },
  { title: 'Backend & cloud services', copy: 'Scope application logic, storage and infrastructure needed to support the mobile experience.', icon: CloudCog },
  { title: 'Offline-aware experiences', copy: 'Where required, plan caching, synchronization, recovery and conflict behavior for unreliable connections.', icon: WifiOff },
];

export function MobileIntegrationsSection() {
  return <section className="section-space bg-white" aria-labelledby="mobile-integrations-title"><div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">Backend, APIs & device features</span><h2 id="mobile-integrations-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Mobile apps don’t live in isolation.</h2><p className="mt-5 text-base leading-7">A useful mobile product often depends on secure data, business systems and device capabilities. Each connection is assessed for access, documentation, security and operational ownership.</p></div><div className="grid gap-4 sm:grid-cols-2">{integrationCapabilities.map(({ title, copy, icon: Icon }) => <article key={title} className="rounded-xl border border-border bg-[#fafcfe] p-6"><div className="flex items-center gap-3"><Icon size={21} className="text-electric" aria-hidden="true" /><h3 className="text-base">{title}</h3></div><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const technologyDecisions = [
  { title: 'Platform implementation', items: ['iOS requirements', 'Android requirements', 'Shared-code suitability'], icon: Smartphone },
  { title: 'Application architecture', items: ['Product complexity', 'Offline needs', 'Maintainability'], icon: Braces },
  { title: 'Backend & data', items: ['API availability', 'Data ownership', 'Security boundaries'], icon: Database },
  { title: 'Release & operations', items: ['Developer accounts', 'Build environments', 'Monitoring needs'], icon: Store },
];

export function MobileTechnologySection() {
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="mobile-technology-title"><div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">Technology</span><h2 id="mobile-technology-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Technology chosen around the product.</h2><p className="mt-5 text-base leading-7">Specific frameworks, backend services and cloud providers are confirmed against the product and the team’s verified delivery capability. Technology is not selected to fill a logo wall.</p></div><div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">{technologyDecisions.map(({ title, items, icon: Icon }) => <article key={title} className="bg-white p-6"><div className="flex items-center gap-3"><Icon className="text-electric" size={21} /><h3 className="text-base">{title}</h3></div><ul className="mt-4 flex flex-wrap gap-2">{items.map((item) => <li key={item} className="rounded-full bg-[#f4f9fd] px-3 py-1.5 text-xs text-[#31536f] ring-1 ring-border">{item}</li>)}</ul></article>)}</div></div></section>;
}

const qaChecks = ['Functional testing', 'Agreed real-device testing', 'Screen-size testing', 'OS-version testing', 'Integration testing', 'Regression testing', 'Network-condition testing', 'Accessibility checks', 'Release checks'];

export function MobileQaReleaseSection() {
  return <><section className="section-space bg-white" aria-labelledby="mobile-qa-title"><div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><span className="eyebrow">QA & device testing</span><h2 id="mobile-qa-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Testing across the devices your users actually use.</h2><p className="mt-5 text-base leading-7">Testing follows an agreed support matrix based on the audience, platforms and risk. No team can test every physical device and OS combination, so priorities are defined before release.</p></div><ul className="grid gap-3 sm:grid-cols-2">{qaChecks.map((item) => <li key={item} className="flex min-h-16 items-center gap-4 rounded-lg border border-border bg-[#fafcfe] px-4"><TestTube2 size={20} className="shrink-0 text-electric" /><span className="text-sm font-semibold text-ink">{item}</span></li>)}</ul></div></section><section className="section-space bg-[#eaf4fc]" aria-labelledby="mobile-release-title"><div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20"><div><span className="eyebrow">Release preparation</span><h2 id="mobile-release-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">From development to App Store and Google Play.</h2><p className="mt-5 text-base leading-7">Where included, ITGS can prepare and support the submission process across build configuration, signing, store assets, privacy information, metadata and review responses. Apple and Google control approval, so approval is never guaranteed.</p></div><div className="rounded-xl border border-[#c8dff3] bg-white/75 p-7"><h3 className="text-xl">Client-controlled production accounts</h3><p className="mt-3 text-sm leading-7">Critical production assets should use appropriately controlled App Store Connect, Google Play Console, cloud and third-party accounts where contractually agreed. Access, responsibilities and handover are documented before release.</p><div className="mt-6 flex gap-4"><span className="flex size-11 items-center justify-center rounded-lg bg-[#e6f1ff] text-electric"><Store size={21} /></span><span className="flex size-11 items-center justify-center rounded-lg bg-[#e6f1ff] text-electric"><Rocket size={21} /></span></div></div></div></section></>;
}

export function MobilePostLaunchSection() {
  const items = ['OS compatibility updates', 'Dependency and security updates', 'Crash and issue review', 'Bug fixes and performance work', 'Feature releases', 'Product analytics review', 'Store updates'];
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="mobile-post-launch-title"><div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><span className="eyebrow !text-sky">After release</span><h2 id="mobile-post-launch-title" className="text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08] text-white">Launch is the beginning.</h2><p className="mt-5 text-base leading-7 text-white/65">Mobile platforms, dependencies and customer needs continue to change. An agreed maintenance or improvement plan can be scoped separately around the product’s operational needs.</p></div><div><ul className="grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 sm:grid-cols-2">{items.map((item) => <li key={item} className="flex min-h-16 items-center gap-3 bg-[#0a2239] px-5 text-sm text-white/80"><RefreshCw size={17} className="shrink-0 text-sky" />{item}</li>)}</ul><div className="mt-6 rounded-xl border border-white/15 p-6"><h3 className="text-lg text-white">Measure the product after launch</h3><p className="mt-2 text-sm leading-6 text-white/65">Activation, engagement, funnels, crashes, feature use and conversion events can be considered before release where analytics are included. No improvement outcome is guaranteed.</p></div></div></div></section>;
}

const audiences = [
  ['Startups & product teams', 'Define, validate and launch a focused mobile product.'],
  ['Growing businesses', 'Add a customer or operational mobile experience connected to existing systems.'],
  ['Established organizations', 'Modernize an aging app or introduce a maintainable mobile channel.'],
  ['Internal operations teams', 'Support work and approvals that happen away from a desk.'],
];

export function MobileAudienceSection() {
  return <section className="section-space bg-white" aria-labelledby="mobile-audience-title"><div className="site-container"><span className="eyebrow">Who we build for</span><h2 id="mobile-audience-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">Mobile development for teams with a defined problem to solve.</h2><div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{audiences.map(([title, copy], index) => <article key={title} className="bg-white p-6"><span className="text-xs font-semibold text-electric">0{index + 1}</span><h3 className="mt-5 text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const reasons = [
  ['Product thinking before coding', 'Define what the product should do before committing to implementation.', Blocks],
  ['UX and engineering together', 'Connect key journeys, interaction states and technical constraints early.', LayoutTemplate],
  ['Architecture around the product', 'Choose platform and system approaches according to actual requirements.', Braces],
  ['Connected delivery', 'Coordinate mobile, backend, web, analytics and growth work from shared context.', Network],
  ['Transparent stages and outputs', 'Agree review points, responsibilities and expected outputs for the engagement.', CheckCircle2],
] as const;

export function WhyMobileSection() {
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="why-mobile-title"><div className="site-container"><span className="eyebrow">Why ITGS for mobile development</span><h2 id="why-mobile-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.45rem)] leading-[1.08]">A mobile product connected to the decisions around it.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{reasons.map(([title, copy, Icon]) => <article key={title} className="card p-6"><IconBadge small><Icon size={20} /></IconBadge><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const related = [
  { id: 'ui-ux-design', title: 'UI/UX Design', copy: 'Research, flows, prototypes and interaction design for the mobile experience.', icon: LayoutTemplate },
  { id: 'web-development', title: 'Web Development', copy: 'Companion web platforms, administration portals and connected digital products.', icon: AppWindow },
  { id: 'digital-marketing', title: 'Digital Marketing', copy: 'Connect launch, acquisition and measurement around the product where relevant.', icon: Gauge },
  { id: 'seo', title: 'Search Engine Optimization', copy: 'Support the web and content surfaces that help people discover the product.', icon: Search },
];

export function RelatedMobileServices({ setActivePage }: Navigate) {
  return <RelatedServicesSection titleId="related-mobile-title" title="Expertise that supports the wider mobile product." services={related.map(({ id, copy }) => ({ id, description: copy }))} source="mobile_development" setActivePage={setActivePage} />;
}

export function MobileInsightsSection({ posts, loading, setActivePage }: { posts: BlogPost[]; loading: boolean } & Navigate) {
  const enabled = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  const visible = enabled ? posts.filter((post) => post.status === 'Published' && /mobile|app|ios|android|product|ui\/ux/i.test(`${post.category} ${post.title}`)).slice(0, 3) : [];
  if (!loading && visible.length === 0) return null;
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="mobile-insights-title"><div className="site-container"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="eyebrow">Mobile product insights</span><h2 id="mobile-insights-title" className="text-[clamp(2.2rem,4vw,3.45rem)]">Guidance for better mobile decisions.</h2></div><a href={pathForPage('Blog')} onClick={(event) => { event.preventDefault(); setActivePage('Blog'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Browse all insights <ArrowRight size={16} /></a></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{visible.map((post) => <article key={post.id} className="card p-6"><span className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">{post.category}</span><h3 className="mt-4 text-xl leading-7"><a href={`/insights/${post.slug}/`} className="hover:underline">{post.title}</a></h3><p className="mt-3 line-clamp-3 text-sm leading-6">{post.excerpt || post.content}</p><p className="mt-6 text-xs text-steel">{post.date} · {post.readTime}</p></article>)}</div></div></section>;
}
