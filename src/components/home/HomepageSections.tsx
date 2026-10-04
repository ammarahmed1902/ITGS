import { ArrowRight, BarChart3, ChevronDown, CircleGauge, Cloud, Code2, Compass, Database, Layers3, LayoutTemplate, Search, ShieldCheck, ShoppingBag, Smartphone, Target, UsersRound } from 'lucide-react';
import type { BlogPost } from '../../domain/entities/BlogPost';
import { pathForPage, servicePath, trackSiteEvent } from '../../lib/siteNavigation';
import Reveal from '../Reveal';

type NavigateProps = { setActivePage: (page: string) => void };

const solutions = [
  { title: 'Launch a digital product', copy: 'Move from a defined opportunity to a usable web or mobile product.', solution: 'launch-digital-product', icon: Code2 },
  { title: 'Modernize an existing product', copy: 'Clarify user journeys and improve an existing website or application.', solution: 'modernize-product', icon: LayoutTemplate },
  { title: 'Improve organic visibility', copy: 'Strengthen technical foundations, intent-led architecture and useful discovery paths.', solution: 'improve-organic-visibility', icon: Search },
  { title: 'Generate qualified demand', copy: 'Connect audience, acquisition, conversion and qualification around useful opportunities.', solution: 'generate-qualified-demand', icon: Target },
  { title: 'Strengthen online commerce', copy: 'Connect storefront experience, marketplace needs and day-to-day operations.', solution: 'strengthen-online-commerce', icon: ShoppingBag },
  { title: 'Improve digital operations', copy: 'Clarify recurring work and decide what should be delegated, improved or automated.', solution: 'improve-digital-operations', icon: Smartphone },
];

export function SolutionsSection({ setActivePage }: NavigateProps) {
  return (
    <section id="solutions" className="solutions-polished section-space scroll-mt-28 text-white" aria-labelledby="solutions-title">
      <span className="solutions-polished__glow" aria-hidden="true" />
      <span className="solutions-polished__grid" aria-hidden="true" />
      <div className="site-container relative">
        <div className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full border border-sky/30 bg-sky/10 text-[10px] font-semibold text-sky">01</span><span className="eyebrow !mb-0 !text-sky">Start with the objective</span></div>
            <h2 id="solutions-title" className="max-w-3xl text-[clamp(2.3rem,4.5vw,4rem)] leading-[1.02] text-white">What are you trying to achieve?</h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-xl text-lg leading-8 text-white/70">Find a practical starting point based on the change you need to make, then connect it to the right ITGS capability.</p>
            <a href={pathForPage('Solutions')} onClick={(event) => { event.preventDefault(); setActivePage('Solutions'); }} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky transition-colors hover:text-white">View the complete solution map <ArrowRight size={16} /></a>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map(({ title, copy, solution, icon: Icon }, index) => (
            <article key={solution} className="solution-path-card group relative flex min-h-[19rem] flex-col overflow-hidden rounded-2xl border border-white/15 p-6 md:p-7">
              <div className="solution-path-card__line" aria-hidden="true" />
              <div className="flex items-start justify-between gap-5"><span className="flex size-12 items-center justify-center rounded-xl border border-sky/25 bg-sky/10 text-sky shadow-[inset_0_1px_0_rgba(255,255,255,.12)]"><Icon size={23} strokeWidth={1.7} /></span><span className="text-[11px] font-semibold tabular-nums tracking-[.18em] text-white/42">PATH {String(index + 1).padStart(2, '0')}</span></div>
              <h3 className="mt-8 max-w-[16rem] text-[1.45rem] leading-7 text-white">{title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/64">{copy}</p>
              <a href={`${pathForPage('Solutions')}#${solution}`} onClick={(event) => { event.preventDefault(); trackSiteEvent('solution_path_click', { solution }); setActivePage('Solutions'); }} className="mt-auto flex min-h-11 items-end justify-between gap-3 pt-7 text-sm font-semibold text-sky"><span>Explore solution</span><span className="flex size-8 items-center justify-center rounded-full border border-sky/25 bg-sky/10 transition-transform group-hover:translate-x-1"><ArrowRight size={15} /></span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const conceptWork = [
  { label: 'Web development', title: 'A clearer customer portal', copy: 'Project navigation, files, updates and delivery status organized into one focused workspace.', service: 'web-development', icon: Layers3 },
  { label: 'Mobile app development', title: 'A simpler booking journey', copy: 'A connected mobile flow for selecting a service, reviewing details and confirming a booking.', service: 'mobile-development', icon: Smartphone },
  { label: 'UI/UX design', title: 'From flow to finished interface', copy: 'A user flow, wireframe and interface that make the design decisions easy to follow.', service: 'ui-ux-design', icon: LayoutTemplate },
];

export function ConceptWorkSection({ setActivePage, showHubLink = true }: NavigateProps & { showHubLink?: boolean }) {
  return (
    <section id="work" className="section-space scroll-mt-28 bg-[#f3f7fa]" aria-labelledby="work-title">
      <div className="site-container">
        <Reveal><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><span className="eyebrow">Internal demonstrations</span><h2 id="work-title" className="max-w-2xl text-[clamp(2rem,4vw,3.35rem)] leading-[1.08]">See how we frame and communicate the work.</h2></div>
          <div className="max-w-md"><p className="text-sm leading-6">Self-initiated concepts · Not client work · No performance claims</p>{showHubLink && <a href={pathForPage('Work')} onClick={(event) => { event.preventDefault(); setActivePage('Work'); }} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">View all work <ArrowRight size={16} /></a>}</div>
        </div></Reveal>
        <div className="mt-11 grid gap-5 lg:grid-cols-3">
          {conceptWork.map(({ label, title, copy, service, icon: Icon }, index) => (
            <article key={title} className="interactive-card card overflow-hidden">
              <div className="hero-atmosphere relative h-44 overflow-hidden p-6 text-white">
                <span className="absolute right-5 top-4 text-[11px] text-white/55">ITGS internal concept</span>
                <div className="absolute -bottom-12 -right-8 size-40 rounded-full border border-sky/25" aria-hidden="true" />
                <div className="absolute bottom-8 left-6 right-6 flex items-end gap-3" aria-hidden="true">
                  {[44, 72, 58, 96].map((height, itemIndex) => <span key={itemIndex} className="flex-1 rounded-t border border-sky/35 bg-white/10" style={{ height }} />)}
                </div>
                <Icon className="relative text-sky" size={28} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <div className="p-6">
                <span className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">0{index + 1} · {label}</span>
                <h3 className="mt-4 text-2xl leading-8">{title}</h3>
                <p className="mt-3 text-sm leading-6">{copy}</p>
                <a href={servicePath(service)} onClick={(event) => { event.preventDefault(); trackSiteEvent('internal_concept_click', { service }); setActivePage(`Service:${service}`); }} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink hover:text-electric">Explore {label.toLowerCase()} services <ArrowRight size={16} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const lifecycle = [
  { title: 'Strategy', icon: Compass },
  { title: 'UX & design', icon: LayoutTemplate },
  { title: 'Development', icon: Code2 },
  { title: 'Launch', icon: Cloud },
  { title: 'SEO & growth', icon: Search },
  { title: 'Analytics', icon: BarChart3 },
  { title: 'Next iteration', icon: CircleGauge },
];

export function ConnectedModelSection() {
  return (
    <section id="connected-model" className="section-space scroll-mt-28 animated-atmosphere text-white" aria-labelledby="connected-model-title">
      <span className="ambient-wash" aria-hidden="true" /><span className="ambient-glow" aria-hidden="true" /><span className="ambient-grid" aria-hidden="true" />
      <div className="site-container relative">
        <Reveal><div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
          <div><div className="mb-5 flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full border border-sky/30 bg-sky/10 text-[10px] font-semibold text-sky">02</span><span className="eyebrow !mb-0 !text-sky">The connected ITGS model</span></div><h2 id="connected-model-title" className="max-w-2xl text-[clamp(2.25rem,4.4vw,3.85rem)] leading-[1.03] text-white">Strategy, creative and technology working in one direction.</h2></div>
          <div className="lg:justify-self-end"><span className="mb-4 inline-flex rounded-full border border-white/15 bg-white/[.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.14em] text-sky">One connected operating loop</span><p className="max-w-xl text-lg leading-8 text-white/70">Each discipline shares context with the next. Product decisions shape design, development supports discovery, and real usage informs the following iteration.</p></div>
        </div></Reveal>
        <div className="connected-model-shell mt-12 rounded-2xl border border-white/15 bg-[#04182a]/55 p-4 shadow-[0_28px_80px_rgba(0,8,20,.28)] backdrop-blur-md md:p-6">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {lifecycle.map(({ title, icon: Icon }, index) => (
              <li key={title} className="connected-model-stage group relative flex items-center gap-4 rounded-xl border border-white/10 bg-white/[.055] p-4 lg:min-h-40 lg:flex-col lg:items-start lg:justify-between">
                <div className="flex w-full items-start justify-between gap-3"><span className="flex size-10 items-center justify-center rounded-lg border border-sky/25 bg-sky/10 text-sky"><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></span><span className="text-[10px] font-semibold tracking-[.16em] text-white/38">{String(index + 1).padStart(2, '0')}</span></div>
                <span className="text-sm font-semibold leading-5 text-white">{title}</span>
                {index < lifecycle.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-sky/20 bg-[#082641] p-1 text-sky shadow-lg lg:block" size={23} aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <div className="mt-5 flex items-start gap-3 border-t border-white/10 pt-5 text-sm leading-6 text-white/60"><CircleGauge className="mt-0.5 shrink-0 text-sky" size={18} aria-hidden="true" /><p>The model is cyclical: performance evidence returns to strategy and guides the next useful iteration.</p></div>
        </div>
      </div>
    </section>
  );
}

const capabilityGroups = [
  { title: 'Digital products', copy: 'Responsive websites, web applications and customer portals.', icon: Code2 },
  { title: 'Mobile experiences', copy: 'Focused iOS and Android journeys shaped around real tasks.', icon: Smartphone },
  { title: 'Content & commerce', copy: 'Manageable content structures and connected online storefronts.', icon: Database },
  { title: 'Cloud & integrations', copy: 'Practical system connections and deployment planning.', icon: Cloud },
  { title: 'Analytics & growth', copy: 'Search, acquisition and measurement connected to the customer journey.', icon: BarChart3 },
];

export function ExpertiseSection() {
  return (
    <section id="expertise" className="expertise-polished section-space scroll-mt-28" aria-labelledby="expertise-title">
      <div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start"><div className="mb-5 flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full border border-electric/20 bg-[#edf5ff] text-[10px] font-semibold text-electric">03</span><span className="eyebrow !mb-0">Technology & platform expertise</span></div><h2 id="expertise-title" className="text-[clamp(2.2rem,4.2vw,3.65rem)] leading-[1.04]">The stack follows the problem.</h2><p className="mt-6 max-w-md text-lg leading-8">Platform choices should reflect the users, operating needs, integrations and ownership model—not a logo wall.</p>
          <div className="mt-8 rounded-2xl border border-[#d7e4ef] bg-white/80 p-5 shadow-[0_18px_45px_rgba(16,42,64,.06)]"><p className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">Decision lens</p><div className="mt-4 flex flex-wrap gap-2">{['Users', 'Operations', 'Integrations', 'Ownership'].map((item) => <span key={item} className="rounded-full border border-[#d7e4ef] bg-[#f6faff] px-3 py-2 text-xs font-semibold text-[#294c69]">{item}</span>)}</div></div>
        </div>
        <div className="grid gap-3">
          {capabilityGroups.map(({ title, copy, icon: Icon }, index) => <article key={title} className="capability-row group grid gap-4 rounded-2xl border border-[#dbe6ef] bg-white p-5 sm:grid-cols-[56px_1fr_auto] sm:items-center sm:gap-5 md:p-6"><span className="flex size-14 items-center justify-center rounded-xl border border-[#cbdff5] bg-[#edf5ff] text-electric transition-transform duration-300 group-hover:-translate-y-1"><Icon size={22} strokeWidth={1.8} /></span><div><h3 className="text-lg">{title}</h3><p className="mt-1.5 text-sm leading-6">{copy}</p></div><span className="text-[11px] font-semibold tracking-[.16em] text-[#587088]">{String(index + 1).padStart(2, '0')}</span></article>)}
        </div>
      </div>
    </section>
  );
}

const differentiators = [
  { title: 'One accountable team', copy: 'Strategy, design, development and growth share the same context and priorities.', icon: UsersRound },
  { title: 'Strategy before execution', copy: 'Clarify the problem, audience, scope and success criteria before implementation begins.', icon: Compass },
  { title: 'Decisions tied to an objective', copy: 'Technical and marketing choices are discussed in relation to the agreed business goal.', icon: Target },
  { title: 'Built to keep improving', copy: 'Design and delivery leave room for evidence, maintenance and the next useful iteration.', icon: CircleGauge },
];

export function WhyItgsSection() {
  return (
    <section id="why-itgs" className="why-itgs-polished section-space scroll-mt-28" aria-labelledby="why-itgs-title">
      <div className="site-container relative">
        <div className="grid gap-7 lg:grid-cols-[1fr_.72fr] lg:items-end lg:gap-16"><div><div className="mb-5 flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full border border-electric/20 bg-white text-[10px] font-semibold text-electric">04</span><span className="eyebrow !mb-0">Why ITGS</span></div><h2 id="why-itgs-title" className="max-w-3xl text-[clamp(2.2rem,4.2vw,3.65rem)] leading-[1.04]">A clearer way to coordinate digital work.</h2></div><p className="max-w-xl text-lg leading-8 lg:justify-self-end">Shared context keeps strategy, design, delivery and improvement moving toward the same objective.</p></div>
        <div className="mt-11 grid gap-4 md:grid-cols-2">
          {differentiators.map(({ title, copy, icon: Icon }, index) => <article key={title} className="why-itgs-card group relative overflow-hidden rounded-2xl border border-[#d7e3ec] bg-white p-7 shadow-[0_16px_44px_rgba(16,42,64,.055)] transition duration-300 hover:-translate-y-1 hover:border-[#9fc7f4] hover:shadow-[0_22px_54px_rgba(16,42,64,.09)] md:p-9"><div className="why-itgs-card__accent" aria-hidden="true" /><div className="flex items-start justify-between gap-5"><span className="flex size-[52px] items-center justify-center rounded-xl border border-[#c9def5] bg-[#edf5ff] text-electric"><Icon size={24} strokeWidth={1.7} /></span><span className="text-[11px] font-semibold tracking-[.16em] text-[#587088]">PRINCIPLE {String(index + 1).padStart(2, '0')}</span></div><h3 className="mt-8 text-[1.35rem] leading-7">{title}</h3><p className="mt-3 max-w-lg text-sm leading-6">{copy}</p></article>)}
        </div>
      </div>
    </section>
  );
}

export function InsightsSection({ posts, loading, setActivePage }: { posts: BlogPost[]; loading: boolean } & NavigateProps) {
  const published = posts.filter((post) => post.status === 'Published' && post.approved).slice(0, 3);
  if (!loading && published.length === 0) return null;
  return (
    <section id="insights" className="section-space bg-white" aria-labelledby="insights-title">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="eyebrow">Insights & expertise</span><h2 id="insights-title" className="text-[clamp(2rem,4vw,3.3rem)] leading-[1.08]">Useful thinking for the next decision.</h2></div><a href={pathForPage('Blog')} onClick={(event) => { event.preventDefault(); setActivePage('Blog'); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Browse all insights <ArrowRight size={16} /></a></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {(loading ? [] : published).map((post) => <article key={post.id} className="card flex flex-col p-7"><span className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">{post.category}</span><h3 className="mt-4 text-xl leading-7"><a href={`/insights/${post.slug}/`} className="hover:underline">{post.title}</a></h3><p className="mt-4 line-clamp-3 text-sm leading-6">{post.excerpt || post.content}</p><div className="mt-auto flex items-center justify-between pt-7 text-xs text-steel"><span>{post.date}</span><span>{post.readTime}</span></div></article>)}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { question: 'What services does ITGS provide?', answer: 'ITGS brings together web and mobile development, UI/UX and creative work, digital marketing, search, lead generation, e-commerce services and operational support. The exact combination depends on the objective and agreed scope.' },
  { question: 'Can ITGS handle development and digital marketing together?', answer: 'The connected model is designed for work that crosses product, design, development and growth. Responsibilities, access, measures and deliverables are confirmed before work begins.' },
  { question: 'How does a new engagement begin?', answer: 'A first conversation focuses on the goal, current situation, users, constraints and timing. ITGS can then propose an appropriate discovery or delivery scope for confirmation.' },
  { question: 'Can ITGS improve an existing website or software product?', answer: 'Yes. Existing products can be reviewed around a defined problem, journey or technical need. The review method and access requirements are agreed as part of the scope.' },
  { question: 'Is ongoing support available after launch?', answer: 'Support, maintenance and improvement work can be discussed. Coverage, response expectations and commercial terms require confirmation for each engagement.' },
  { question: 'How are project timelines determined?', answer: 'Timelines depend on scope, dependencies, review cycles, integrations and team availability. A working plan is agreed only after those factors are understood.' },
];

export function HomeFaqSection() {
  return (
    <section className="section-space bg-[#f7f8f5]" aria-labelledby="home-faq-title">
      <div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div><span className="eyebrow">Frequently asked questions</span><h2 id="home-faq-title" className="text-[clamp(2rem,4vw,3.3rem)] leading-[1.08]">Before we start.</h2><p className="mt-5 max-w-sm text-base leading-7">Clear expectations begin with the questions that shape scope and fit.</p></div>
        <div className="border-t border-border">{faqs.map(({ question, answer }) => <details key={question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} aria-hidden="true" /></summary><p className="max-w-2xl pb-6 pr-8 text-sm leading-7">{answer}</p></details>)}</div>
      </div>
    </section>
  );
}

export function ContentIntegrityNote() {
  return (
    <div className="border-y border-[#cfe0ef] bg-[#edf6fc] py-4">
      <div className="site-container flex items-start gap-3 text-sm leading-6 text-[#294c69]"><ShieldCheck className="mt-0.5 shrink-0 text-electric" size={20} aria-hidden="true" /><p><strong className="font-semibold text-ink">Evidence before claims.</strong> Client results, ratings, logos and testimonials are published only after approval and source verification.</p></div>
    </div>
  );
}
