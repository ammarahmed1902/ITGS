import {
  Accessibility,
  ArrowRight,
  Blocks,
  Braces,
  CheckCircle2,
  CircleGauge,
  Cloud,
  Code2,
  Database,
  FileCode2,
  Gauge,
  LayoutTemplate,
  Link2,
  MonitorSmartphone,
  PanelsTopLeft,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  UsersRound,
} from 'lucide-react';
import type { BlogPost } from '../../domain/entities/BlogPost';
import { pathForPage } from '../../lib/siteNavigation';
import IconBadge from '../IconBadge';
import RelatedServicesSection from '../service-cards/RelatedServicesSection';

type Navigate = { setActivePage: (page: string) => void };

const solutions = [
  { title: 'Business websites', copy: 'Content-led websites shaped around customer journeys, conversion paths and manageable publishing.', labels: ['Responsive UI', 'Content structure'], icon: PanelsTopLeft },
  { title: 'Custom web applications', copy: 'Browser-based products designed around specific workflows, roles and operational requirements.', labels: ['Custom workflows', 'Role-based experiences'], icon: Code2 },
  { title: 'Customer & employee portals', copy: 'Secure self-service spaces that bring information, tasks and updates into one clear experience.', labels: ['Self-service', 'Business processes'], icon: UsersRound },
  { title: 'CMS-powered websites', copy: 'Flexible content platforms that help internal teams update and organize content efficiently.', labels: ['Content management', 'Reusable templates'], icon: LayoutTemplate },
  { title: 'API & system integrations', copy: 'Connect agreed systems and data flows through appropriate APIs and integration patterns.', labels: ['APIs', 'System connections'], icon: Link2 },
  { title: 'Website modernization', copy: 'Improve an aging website or application around usability, performance and maintainability.', labels: ['Redesign', 'Platform improvement'], icon: RefreshCw },
];

export function WebSolutionsSection() {
  return <section className="section-space bg-white" aria-labelledby="web-solutions-title"><div className="site-container"><div className="max-w-3xl"><span className="eyebrow">What we build</span><h2 id="web-solutions-title" className="text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Web development solutions shaped around the work.</h2><p className="mt-5 max-w-2xl text-lg leading-8">The format follows the users, workflows, content and systems involved. A project may combine several of these capabilities.</p></div><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{solutions.map(({ title, copy, labels, icon: Icon }) => <article key={title} className="bg-white p-7 transition-colors hover:bg-[#f8fbff]"><IconBadge><Icon size={25} strokeWidth={1.7} /></IconBadge><h3 className="mt-6 text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p><ul className="mt-5 flex flex-wrap gap-2" aria-label={`${title} capabilities`}>{labels.map((label) => <li key={label} className="rounded-full border border-[#d6e5f3] bg-[#f4f9fd] px-3 py-1.5 text-xs text-[#31536f]">{label}</li>)}</ul></article>)}</div></div></section>;
}

const standards = [
  { title: 'Performance', copy: 'Consider loading, rendering and Core Web Vitals throughout design and implementation.', icon: Gauge },
  { title: 'Technical SEO', copy: 'Plan crawlability, semantic structure, metadata, URLs, redirects and internal links before launch.', icon: Search },
  { title: 'Accessibility', copy: 'Use accessible patterns, keyboard support, meaningful structure and contrast-conscious interfaces.', icon: Accessibility },
  { title: 'Security', copy: 'Apply appropriate practices to dependencies, application boundaries, content systems and deployments.', icon: ShieldCheck },
  { title: 'Responsive experience', copy: 'Design and check relevant screen sizes, inputs and interaction patterns.', icon: MonitorSmartphone },
  { title: 'Maintainability', copy: 'Use structured code, documentation and manageable content patterns that support future work.', icon: FileCode2 },
];

export function QualityStandardsSection() {
  return <section className="section-space bg-[#071b2f] text-white" aria-labelledby="quality-title"><div className="site-container"><div className="grid gap-6 lg:grid-cols-2 lg:items-end"><div><span className="eyebrow !text-sky">Technical standards</span><h2 id="quality-title" className="max-w-2xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08] text-white">Built for more than launch.</h2></div><p className="max-w-xl text-lg leading-8 text-white/65 lg:justify-self-end">Quality is shaped by the decisions that make a product usable, discoverable, resilient and practical to operate.</p></div><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-3">{standards.map(({ title, copy, icon: Icon }) => <article key={title} className="bg-[#0a2239] p-7"><span className="flex size-12 items-center justify-center rounded-xl border border-sky/20 bg-sky/10 text-sky"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span><h3 className="mt-6 text-xl text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/64">{copy}</p></article>)}</div><div className="mt-9 grid gap-6 border-t border-white/15 pt-8 lg:grid-cols-[.7fr_1.3fr]"><h3 className="text-2xl text-white">SEO requirements belong in the build.</h3><p className="text-sm leading-7 text-white/65">Search readiness is affected by navigation, semantic HTML, URL design, page templates, rendering, metadata foundations, structured-data readiness, internal linking and performance. Considering these during architecture reduces avoidable rework after launch. Rankings are never guaranteed.</p></div></div></section>;
}

const technologyGroups = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'Responsive HTML & CSS'], icon: Braces },
  { title: 'Application layer', items: ['Node-based services', 'APIs', 'Data integrations'], icon: Code2 },
  { title: 'Content & data', items: ['CMS patterns', 'Structured content', 'Relational data'], icon: Database },
  { title: 'Delivery', items: ['Vercel', 'Cloud deployment', 'Environment configuration'], icon: Cloud },
  { title: 'Commerce', items: ['Storefront experiences', 'Platform integrations', 'Operational workflows'], icon: ShoppingCart },
  { title: 'Measurement', items: ['Analytics foundations', 'Search Console readiness', 'Conversion events'], icon: CircleGauge },
];

export function WebTechnologySection() {
  return <section className="section-space bg-white" aria-labelledby="web-tech-title"><div className="site-container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20"><div><span className="eyebrow">Technology</span><h2 id="web-tech-title" className="text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.08]">Technology chosen around the product.</h2><p className="mt-5 max-w-md text-base leading-7">The technical approach should reflect the requirements, ownership model, integrations and team that will operate the product.</p></div><div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">{technologyGroups.map(({ title, items, icon: Icon }) => <article key={title} className="bg-[#fafcfe] p-6"><div className="flex items-center gap-3"><Icon className="text-electric" size={21} aria-hidden="true" /><h3 className="text-base">{title}</h3></div><ul className="mt-4 flex flex-wrap gap-2">{items.map((item) => <li key={item} className="rounded-full bg-white px-3 py-1.5 text-xs text-[#31536f] ring-1 ring-border">{item}</li>)}</ul></article>)}</div></div></section>;
}

const migrationSteps = ['Existing URL inventory', 'Content and search review', 'New URL mapping', '301 redirect planning', 'Metadata and content migration', 'Internal-link validation', 'Analytics and Search Console checks', 'Post-launch monitoring'];

export function SeoMigrationSection() {
  return <section className="section-space bg-[#eaf4fc]" aria-labelledby="migration-title"><div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16"><div><span className="eyebrow">Website redesign & migration</span><h2 id="migration-title" className="text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.08]">Redesign without ignoring what already works.</h2><p className="mt-5 text-base leading-7">Existing organic visibility, useful content and established URLs should be assessed before a redesign changes the structure. Migration planning reduces avoidable risk, but cannot guarantee every ranking will remain unchanged.</p></div><ol className="grid gap-3 sm:grid-cols-2">{migrationSteps.map((step, index) => <li key={step} className="flex min-h-16 items-center gap-4 rounded-lg border border-[#c8dff3] bg-white/70 px-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white">{index + 1}</span><span className="text-sm font-semibold text-ink">{step}</span></li>)}</ol></div></section>;
}

const audiences = [
  { title: 'Growing businesses', copy: 'A stronger website supporting marketing, sales, content and daily operations.' },
  { title: 'Product teams', copy: 'A web application, portal or product experience built around defined workflows.' },
  { title: 'Established organizations', copy: 'Modernization, system connections or replacement of an aging platform.' },
  { title: 'Marketing teams', copy: 'A manageable website designed to support search, campaigns, content and conversion.' },
];

export function WebAudienceSection() {
  return <section className="section-space bg-white" aria-labelledby="audience-title"><div className="site-container"><span className="eyebrow">Who we build for</span><h2 id="audience-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.08]">Web development for teams that need more than a template.</h2><div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{audiences.map(({ title, copy }, index) => <article key={title} className="bg-white p-6"><span className="text-xs font-semibold text-electric">0{index + 1}</span><h3 className="mt-5 text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const why = [
  { title: 'Product thinking before coding', copy: 'Understand the business and user problem before choosing the solution.', icon: Blocks },
  { title: 'One connected team', copy: 'Strategy, UX, development, search and growth work from the same context.', icon: UsersRound },
  { title: 'SEO considered before launch', copy: 'Technical search requirements influence architecture and implementation.', icon: Search },
  { title: 'Defined stages and outputs', copy: 'Scope, review points and expected deliverables are agreed for the project.', icon: CheckCircle2 },
  { title: 'Built for ownership', copy: 'Access, documentation, licensing and handover terms are clarified in writing.', icon: ShieldCheck },
];

export function WhyWebSection() {
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="why-web-title"><div className="site-container"><span className="eyebrow">Why build with ITGS</span><h2 id="why-web-title" className="max-w-3xl text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.08]">A web project connected to the decisions around it.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{why.map(({ title, copy, icon: Icon }) => <article key={title} className="card p-6"><IconBadge small><Icon size={20} /></IconBadge><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section>;
}

const related = [
  { id: 'ui-ux-design', title: 'UI/UX Design', copy: 'Shape navigation, journeys and interaction states before development.', icon: LayoutTemplate },
  { id: 'seo', title: 'Search Engine Optimization', copy: 'Build crawlability, internal links and search foundations into the architecture.', icon: Search },
  { id: 'digital-marketing', title: 'Digital Marketing', copy: 'Connect the website with campaigns, measurement and acquisition journeys.', icon: CircleGauge },
  { id: 'e-commerce', title: 'E-commerce Solutions', copy: 'Coordinate storefront experience with ongoing commerce operations.', icon: ShoppingCart },
  { id: 'mobile-development', title: 'Mobile App Development', copy: 'Extend a product into focused mobile journeys where the use case requires it.', icon: Smartphone },
];

export function RelatedWebServices({ setActivePage }: Navigate) {
  return <RelatedServicesSection titleId="related-web-title" title="Expertise that connects with web development." services={related.map(({ id, copy }) => ({ id, description: copy }))} source="web_development" setActivePage={setActivePage} />;
}

export function WebInsightsSection({ posts, loading, setActivePage }: { posts: BlogPost[]; loading: boolean } & Navigate) {
  const enabled = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  const visible = enabled ? posts.filter((post) => post.status === 'Published' && /web|seo|ui\/ux|development/i.test(post.category)).slice(0, 3) : [];
  if (!loading && visible.length === 0) return null;
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="web-insights-title"><div className="site-container"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="eyebrow">Web development insights</span><h2 id="web-insights-title" className="text-[clamp(2.2rem,4vw,3.4rem)]">Guidance for better web decisions.</h2></div><a href={pathForPage('Blog')} onClick={(event) => { event.preventDefault(); setActivePage('Blog'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Browse all insights <ArrowRight size={16} /></a></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{visible.map((post) => <article key={post.id} className="card p-6"><span className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">{post.category}</span><h3 className="mt-4 text-xl leading-7"><a href={`/insights/${post.slug}/`} className="hover:underline">{post.title}</a></h3><p className="mt-3 line-clamp-3 text-sm leading-6">{post.excerpt || post.content}</p><p className="mt-6 text-xs text-steel">{post.date} · {post.readTime}</p></article>)}</div></div></section>;
}
