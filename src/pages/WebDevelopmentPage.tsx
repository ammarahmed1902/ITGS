import {
  Accessibility, ArrowRight, ArrowUpRight, Blocks, Check, ChevronDown,
  CircleGauge, Code2, FileCheck2, Gauge, LayoutTemplate, Link2,
  MonitorSmartphone, PanelsTopLeft, Rocket, Search, ShieldCheck, TestTube2,
  type LucideIcon,
} from 'lucide-react';
import WebsitePreview from '../components/web-development/WebsitePreview';
import { WebInsightsSection } from '../components/web-development/WebDevelopmentSections';
import type { BlogPost } from '../domain/entities/BlogPost';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';
import type { MouseEvent } from 'react';

type Props = { setActivePage: (page: string) => void; posts: BlogPost[]; loading: boolean };
type IconItem = { title: string; copy: string; icon: LucideIcon };

const services: IconItem[] = [
  { title: 'Custom website development', copy: 'Responsive, content-led websites structured around customer journeys and manageable publishing.', icon: PanelsTopLeft },
  { title: 'Web application development', copy: 'Browser-based products shaped around specific workflows, user roles and operational requirements.', icon: Code2 },
  { title: 'CMS development', copy: 'Flexible content systems that help internal teams publish and maintain information efficiently.', icon: LayoutTemplate },
  { title: 'APIs & system integrations', copy: 'Practical connections between agreed platforms, data sources and business processes.', icon: Link2 },
];

const whyItems: IconItem[] = [
  { title: 'Business context first', copy: 'We clarify the objective, users and constraints before selecting the technical approach.', icon: Search },
  { title: 'Design and development together', copy: 'UX decisions and technical implementation stay connected throughout the project.', icon: Blocks },
  { title: 'Clear review points', copy: 'The project brief defines decisions, deliverables and review stages before production work begins.', icon: FileCheck2 },
  { title: 'Built for ownership', copy: 'Access, documentation, licensing and handover expectations are agreed in writing.', icon: ShieldCheck },
];

const process = [
  { title: 'Discovery & planning', copy: 'Clarify goals, audiences, content, systems and scope.', output: 'Project brief', icon: Search },
  { title: 'UI/UX design', copy: 'Shape journeys, structure, responsive screens and interactions.', output: 'Approved prototype', icon: LayoutTemplate },
  { title: 'Development', copy: 'Build the agreed frontend, backend and integrations.', output: 'Staging product', icon: Code2 },
  { title: 'Testing & QA', copy: 'Check function, devices, accessibility and agreed requirements.', output: 'Tested release', icon: TestTube2 },
  { title: 'Launch & handover', copy: 'Coordinate deployment, documentation and final access.', output: 'Handover package', icon: Rocket },
];

const conceptCards = [
  { title: 'Customer portal', type: 'Web application concept', copy: 'Project navigation, files, updates and a delivery timeline.', accent: 'from-[#155eef] to-[#8fc7ff]' },
  { title: 'Operations workspace', type: 'Internal tool concept', copy: 'A focused view of tasks, status, ownership and next actions.', accent: 'from-[#102a40] to-[#155eef]' },
  { title: 'Content platform', type: 'CMS concept', copy: 'Structured publishing flows for pages, resources and updates.', accent: 'from-[#0d3150] to-[#00a6c0]' },
];

const technologyStack = [
  { name: 'React', image: '/images/technology/react.svg' },
  { name: 'TypeScript', image: '/images/technology/typescript.svg' },
  { name: 'Node.js', image: '/images/technology/nodejs.svg' },
  { name: 'Vite', image: '/images/technology/vite.svg' },
  { name: 'Vercel', image: '/images/technology/vercel.svg' },
  { name: 'Supabase', image: '/images/technology/supabase.svg' },
  { name: 'OpenAPI', image: '/images/technology/openapi.svg' },
  { name: 'Git', image: '/images/technology/git.svg' },
  { name: 'Docker', image: '/images/technology/docker.svg' },
  { name: 'WordPress', image: '/images/technology/wordpress.svg' },
];

const quality: IconItem[] = [
  { title: 'Performance', copy: 'Loading, rendering and Core Web Vitals considered throughout the build.', icon: Gauge },
  { title: 'Responsive delivery', copy: 'Layouts and interaction patterns checked across relevant screen sizes and inputs.', icon: MonitorSmartphone },
  { title: 'Accessibility', copy: 'Semantic structure, keyboard support, contrast and understandable interaction patterns.', icon: Accessibility },
  { title: 'Security & maintainability', copy: 'Appropriate dependency, application and deployment practices with structured handover.', icon: ShieldCheck },
];

export const WEB_DEVELOPMENT_FAQS = [
  { question: 'How much does a web development project cost?', answer: 'Cost depends on scope, product complexity, integrations, content, design requirements and delivery responsibilities. ITGS provides project-specific pricing after the requirements are understood.' },
  { question: 'How long does a web development project take?', answer: 'Timing depends on scope, dependencies, content readiness, integrations and review cycles. A working schedule is agreed after discovery rather than promised before the work is understood.' },
  { question: 'Can ITGS improve an existing website or application?', answer: 'Yes. The work can begin with a review of the current experience, content, technical environment and search considerations so useful assets are retained where appropriate.' },
  { question: 'Can you connect the website to our existing systems?', answer: 'Potential integrations are reviewed during discovery. Feasibility, access, data handling and responsibility for each system are confirmed in scope.' },
  { question: 'Who owns the code and design files?', answer: 'Ownership, licensing, repository access and the transfer of design or technical files are defined in the written agreement before work begins.' },
  { question: 'What support can be included after launch?', answer: 'Post-launch support can be discussed as part of the scope. Availability, response times and related terms are confirmed separately before publication or agreement.' },
];

export default function WebDevelopmentPage({ setActivePage, posts, loading }: Props) {
  const contact = (location: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    trackSiteEvent('discuss_web_project_cta', { location });
    setActivePage('Contact');
  };

  return (
    <div className="bg-white">
      <section className="hero-atmosphere overflow-hidden pb-20 pt-28 text-white md:pb-24 md:pt-32 lg:pb-28">
        <div className="site-container">
          <nav className="mb-8 text-sm text-white/65" aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2"><li><a href="/" onClick={(event) => { event.preventDefault(); setActivePage('Home'); }} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li><li aria-hidden="true">/</li><li><a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); setActivePage('Services'); }} className="inline-flex min-h-11 items-center hover:text-white">Services</a></li><li aria-hidden="true">/</li><li aria-current="page" className="text-white">Web Development</li></ol></nav>
          <div className="grid items-center gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-sky">Web development services</p>
              <h1 className="text-balance text-[clamp(2.75rem,5.7vw,5rem)] font-semibold leading-[1.01] tracking-[-.06em] text-white">Web development built around <span className="text-sky">your business.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#d3e0ed]">Websites, customer portals and applications designed around the people who use them and the teams who manage them.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href={pathForPage('Contact')} onClick={contact('web_hero')} className="btn-primary">Discuss your project <ArrowRight size={18} aria-hidden="true" /></a><a href="#web-services" className="btn-outline-dark">Explore our services <ArrowRight size={18} aria-hidden="true" /></a></div>
              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/70" aria-label="Web development priorities">{['Responsive by default', 'Accessible foundations', 'Clear handover'].map((item) => <li key={item} className="flex items-center gap-2"><span className="flex size-5 items-center justify-center rounded-full bg-sky/15 text-sky"><Check size={12} /></span>{item}</li>)}</ul>
            </div>
            <WebsitePreview />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-6" aria-label="Technology used in ITGS web development">
        <div className="site-container">
          <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[.18em] text-steel">Technology foundations used in delivery</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {technologyStack.slice(0, 5).map(({ name, image }) => <div key={name} className="flex min-h-12 items-center justify-center gap-2 border-l border-border px-3 first:border-l-0"><img src={image} alt="" width="22" height="22" className="size-[22px] object-contain" /><span className="text-sm font-semibold text-ink">{name}</span></div>)}
          </div>
        </div>
      </section>

      <section id="web-services" className="section-space scroll-mt-28 bg-white" aria-labelledby="web-services-title">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center"><p className="eyebrow">Our services</p><h2 id="web-services-title" className="text-balance text-[clamp(2.25rem,4vw,3.7rem)] leading-[1.06]">Comprehensive web development services.</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8">A connected set of capabilities for building, improving and operating digital products.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{services.map(({ title, copy, icon: Icon }, index) => <article key={title} className="group flex min-h-[320px] flex-col rounded-2xl border border-border bg-white p-7 shadow-[0_18px_50px_rgba(6,19,31,.07)] transition duration-300 hover:-translate-y-1 hover:border-[#9fc7f4] hover:shadow-[0_22px_60px_rgba(6,19,31,.12)]"><div className="flex items-start justify-between"><span className="flex size-12 items-center justify-center rounded-xl border border-[#cfe0f5] bg-[#eef6ff] text-electric"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span><span className="text-xs font-semibold text-steel">0{index + 1}</span></div><h3 className="mt-8 text-xl leading-6">{title}</h3><p className="mt-4 text-sm leading-6">{copy}</p><a href={pathForPage('Contact')} onClick={contact('web_service_card')} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-semibold text-electric">Discuss this service <ArrowRight size={16} /></a></article>)}</div>
        </div>
      </section>

      <section className="bg-midnight text-white" aria-labelledby="why-web-title">
        <div className="grid lg:grid-cols-2">
          <figure className="relative min-h-[440px] overflow-hidden bg-[#dceaf5] lg:min-h-[640px]">
            <img src="/images/web-development/developer-workspace.webp" alt="Software developer reviewing a web interface and code in a modern workspace" width="1536" height="1024" loading="lazy" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/45 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
              {[{ label: 'Product thinking', icon: Blocks }, { label: 'Secure delivery', icon: ShieldCheck }, { label: 'Maintainable code', icon: Code2 }].map(({ label, icon: Icon }) => <span key={label} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/25 bg-midnight/80 px-4 text-xs font-semibold text-white backdrop-blur"><Icon size={16} className="text-sky" />{label}</span>)}
            </div>
            <figcaption className="sr-only">Illustrative development workspace visual created for ITGS.</figcaption>
          </figure>
          <div className="flex items-center p-7 sm:p-12 lg:p-16 xl:p-20"><div className="max-w-2xl"><p className="mb-5 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Why choose ITGS</p><h2 id="why-web-title" className="text-balance text-[clamp(2.35rem,4.2vw,4rem)] leading-[1.05] text-white">A web development partner for the whole product.</h2><p className="mt-6 text-lg leading-8 text-white/75">Strategy, user experience, technical delivery and launch planning share the same project context.</p><ul className="mt-9 grid gap-5">{whyItems.map(({ title, copy, icon: Icon }) => <li key={title} className="flex gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-sky/20 bg-sky/10 text-sky"><Icon size={20} strokeWidth={1.7} /></span><div><h3 className="text-base tracking-[-.02em] text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-white/68">{copy}</p></div></li>)}</ul></div></div>
        </div>
      </section>

      <section className="section-space bg-[#f7f9fb]" aria-labelledby="web-process-title"><div className="site-container"><div className="mx-auto max-w-3xl text-center"><p className="eyebrow">Our process</p><h2 id="web-process-title" className="text-[clamp(2.25rem,4vw,3.6rem)] leading-[1.06]">A clear development process.</h2><p className="mt-5 text-lg leading-8">Defined stages make reviews, responsibilities and outputs easier to understand.</p></div><ol className="mt-14 grid gap-8 md:grid-cols-5 md:gap-4">{process.map(({ title, copy, output, icon: Icon }, index) => <li key={title} className="relative border-l border-[#a8c8e8] pb-3 pl-8 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-8"><span className="absolute -left-5 top-0 flex size-10 items-center justify-center rounded-xl border border-[#bcd5ee] bg-white text-electric shadow-sm md:-top-5 md:left-0"><Icon size={19} strokeWidth={1.8} /></span><span className="text-[10px] font-semibold uppercase tracking-[.14em] text-electric">0{index + 1}</span><h3 className="mt-2 text-lg leading-6">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p><p className="mt-4 text-xs font-semibold text-[#31536f]">Output: {output}</p></li>)}</ol></div></section>

      <section id="web-development-example" className="section-space bg-white" aria-labelledby="web-work-title"><div className="site-container"><div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="eyebrow">Our work</p><h2 id="web-work-title" className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.06]">Concepts that make the thinking visible.</h2></div><p className="max-w-2xl text-base leading-7 lg:justify-self-end">ITGS is a new company. These self-initiated concepts demonstrate interface and product thinking; they are not client work and contain illustrative data.</p></div><div className="mt-11 grid gap-5 lg:grid-cols-3">{conceptCards.map(({ title, type, copy, accent }) => <article key={title} className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_16px_45px_rgba(6,19,31,.07)]"><div className={`relative h-48 bg-gradient-to-br ${accent} p-5`}><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} /><div className="relative mt-4 rounded-xl border border-white/30 bg-white/95 p-4 shadow-xl"><div className="flex items-center justify-between"><span className="h-2 w-20 rounded bg-[#dbe7f2]" /><span className="size-6 rounded-full bg-[#eaf3ff]" /></div><div className="mt-5 grid grid-cols-[.72fr_1.28fr] gap-3"><div className="h-20 rounded-lg bg-[#eef4f8]" /><div className="grid gap-2"><span className="h-5 rounded bg-[#dce8f4]" /><span className="h-5 rounded bg-[#eaf1f7]" /><span className="h-5 rounded bg-[#eaf1f7]" /></div></div></div></div><div className="p-6"><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-electric">{type}</p><h3 className="mt-3 text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p><p className="mt-5 text-xs font-semibold text-steel">Self-initiated concept · Not client work</p></div></article>)}</div></div></section>

      <section className="section-space border-y border-border bg-[#f7f9fb]" aria-labelledby="web-tech-title">
        <div className="site-container grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-20">
          <div><p className="eyebrow">Technology & platform expertise</p><h2 id="web-tech-title" className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.06]">Modern technology for modern products.</h2><p className="mt-5 max-w-md text-base leading-7">The stack follows the requirements, ownership model and systems involved. These are technologies already used in the ITGS delivery environment.</p></div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" aria-label="ITGS web development technology stack">
            {technologyStack.map(({ name, image }) => <li key={name} className="group flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-white p-4 text-center shadow-[0_10px_28px_rgba(6,19,31,.05)] transition duration-200 hover:-translate-y-1 hover:border-[#a9cbee] hover:shadow-[0_16px_36px_rgba(6,19,31,.10)]"><img src={image} alt={`${name} logo`} width="42" height="42" loading="lazy" className="h-10 w-12 object-contain transition-transform duration-200 group-hover:scale-105" /><span className="text-xs font-semibold text-ink">{name}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="section-space bg-white" aria-labelledby="web-quality-title">
        <div className="site-container grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-14">
          <div><p className="eyebrow">Quality foundations</p><h2 id="web-quality-title" className="max-w-2xl text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.06]">Built for performance, security and long-term use.</h2><p className="mt-5 max-w-2xl text-base leading-7">The work includes the decisions that help a product remain usable, understandable and practical to maintain.</p>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">{quality.map(({ title, copy, icon: Icon }) => <article key={title} className="flex gap-4 rounded-xl border border-border bg-[#fbfcfe] p-5 shadow-[0_10px_28px_rgba(6,19,31,.04)]"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf3ff] text-electric"><Icon size={21} /></span><div><h3 className="text-base">{title}</h3><p className="mt-1 text-xs leading-5">{copy}</p></div></article>)}</div>
          </div>
          <figure className="relative min-h-[420px] overflow-hidden rounded-2xl border border-border bg-[#eaf4fc] shadow-[0_22px_60px_rgba(6,19,31,.12)]">
            <img src="/images/web-development/performance-workspace.webp" alt="Laptop showing a web development workspace with code and a responsive interface preview" width="1536" height="1024" loading="lazy" className="absolute inset-0 size-full object-cover" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/55 bg-white/92 p-5 shadow-xl backdrop-blur sm:left-auto sm:max-w-[250px]"><CircleGauge size={23} className="text-electric" aria-hidden="true" /><h3 className="mt-3 text-base">SEO-ready foundations</h3><p className="mt-1 text-xs leading-5">Semantic structure, URL planning and performance considered before launch. Rankings are never guaranteed.</p></div>
            <figcaption className="sr-only">Illustrative web development workspace visual created for ITGS.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section-space bg-[#f7f9fb]" aria-labelledby="web-faq-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="eyebrow">Frequently asked questions</p><h2 id="web-faq-title" className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.06]">Before we begin.</h2><p className="mt-5 max-w-sm text-base leading-7">Clear answers about scope, delivery, ownership and support.</p><a href={pathForPage('Contact')} onClick={contact('web_faq')} className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Ask a different question <ArrowUpRight size={16} /></a></div><div className="overflow-hidden rounded-xl border border-border bg-white px-5 sm:px-7">{WEB_DEVELOPMENT_FAQS.map(({ question, answer }) => <details key={question} className="group border-b border-border last:border-0"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} /></summary><p className="max-w-2xl pb-6 pr-8 text-sm leading-7">{answer}</p></details>)}</div></div></section>

      <WebInsightsSection posts={posts} loading={loading} setActivePage={setActivePage} />

      <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="web-closing-title"><div className="site-container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="mb-4 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Start a conversation</p><h2 id="web-closing-title" className="max-w-3xl text-balance text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.06] text-white">Let’s build a web product that fits the work.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/70">Tell us what you are trying to launch, replace or improve. We’ll use that context to discuss a practical next step.</p></div><a href={pathForPage('Contact')} onClick={contact('web_final_cta')} className="btn-light">Contact ITGS <ArrowUpRight size={18} /></a></div></section>
    </div>
  );
}
