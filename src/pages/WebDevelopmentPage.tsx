import { ArrowRight, ArrowUpRight, ChartNoAxesCombined, ChevronDown, ClipboardList, Code2, Layers3, Rocket, Search, type LucideIcon } from 'lucide-react';
import PortalPreview from '../components/web-development/PortalPreview';
import type { BlogPost } from '../domain/entities/BlogPost';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';
import { ApprovedCaseStudies, ApprovedIndustries, ApprovedProofBar, ApprovedTestimonials } from '../components/home/ApprovedContentSections';
import { QualityStandardsSection, RelatedWebServices, SeoMigrationSection, WebAudienceSection, WebInsightsSection, WebSolutionsSection, WebTechnologySection, WhyWebSection } from '../components/web-development/WebDevelopmentSections';

type Props = { setActivePage: (page: string) => void; posts: BlogPost[]; loading: boolean };

const useCases = [
  { title: 'Launch a new digital product', copy: 'Turn a defined business idea into a usable web product.' },
  { title: 'Replace an outdated website', copy: 'Rebuild around modern UX, performance and business requirements.' },
  { title: 'Modernize a legacy platform', copy: 'Improve an existing application without automatically starting from zero.' },
  { title: 'Build a customer or employee portal', copy: 'Create a focused self-service experience around business processes.' },
  { title: 'Automate manual workflows', copy: 'Replace repetitive tasks with purpose-built web functionality.' },
  { title: 'Connect existing systems', copy: 'Integrate agreed applications, APIs and platforms where appropriate.' },
];

const annotations: { title: string; copy: string; icon: LucideIcon }[] = [
  { title: 'Clear workflows', copy: 'Bring project plans, files, and updates into one place so the next step is visible.', icon: ClipboardList },
  { title: 'Purposeful interfaces', copy: 'Make common tasks easy to find and understand for the people using the product.', icon: Layers3 },
  { title: 'Room to evolve', copy: 'Plan the underlying structure so future needs can be considered as the product develops.', icon: ChartNoAxesCombined },
];

const deliverables = [
  { title: 'Project planning', copy: 'Scope, user needs, technical requirements and agreed success criteria.' },
  { title: 'Information architecture & UX', copy: 'User journeys, structural layouts and content organization.' },
  { title: 'Interface design', copy: 'Responsive screens, interaction states and an agreed prototype.' },
  { title: 'Development & integrations', copy: 'Frontend, backend, CMS and system connections included in scope.' },
  { title: 'Quality assurance', copy: 'Functional, responsive, accessibility and browser checks appropriate to the product.' },
  { title: 'Deployment', copy: 'Production release planning, environment configuration and final checks.' },
  { title: 'Documentation & handover', copy: 'Agreed technical or user documentation, access and handover guidance.' },
  { title: 'Analytics foundations', copy: 'Measurement setup and conversion events where included in the engagement.' },
];

const process = [
  { title: 'Discover', copy: 'Clarify objectives, users, existing systems, search requirements, integrations and constraints.', output: 'Approved project brief', icon: Search },
  { title: 'Design', copy: 'Shape information architecture, flows, wireframes, responsive interfaces and the prototype.', output: 'Approved design / prototype', icon: Layers3 },
  { title: 'Build', copy: 'Develop the agreed product, integrations, responsive experience, SEO foundations and QA.', output: 'Tested staging product', icon: Code2 },
  { title: 'Launch', copy: 'Coordinate deployment, analytics, redirects where required, documentation and handover.', output: 'Production release + handover', icon: Rocket },
];

export const WEB_DEVELOPMENT_FAQS = [
  { question: 'How much does custom web development cost?', answer: 'Cost depends on scope, product complexity, integrations, content, design requirements and delivery responsibilities. ITGS provides project-specific pricing after the requirements are understood.' },
  { question: 'How long does a web development project take?', answer: 'Timing depends on scope, dependencies, content readiness, integrations and review cycles. A working schedule is agreed after discovery rather than promised before the work is understood.' },
  { question: 'How is the project priced?', answer: 'Pricing is based on an agreed scope. The work, assumptions and payment terms are documented in a proposal for review before a project begins.' },
  { question: 'Who owns the code and designs?', answer: 'Ownership, licenses, and access to project files would be defined in the written agreement before work begins.' },
  { question: 'What technologies does ITGS use?', answer: 'Technology is selected around product requirements, integrations, ownership and maintainability. The proposed stack and any third-party licensing are documented before implementation.' },
  { question: 'Can ITGS redesign our existing website?', answer: 'Yes. A redesign can begin with a review of the existing experience, content, technical environment and search considerations so useful assets are not discarded without reason.' },
  { question: 'How do you protect SEO during a redesign?', answer: 'Migration planning can include URL inventory, content review, redirects, metadata, internal-link checks, analytics and post-launch monitoring. These steps reduce avoidable risk but cannot guarantee unchanged rankings.' },
  { question: 'Can you integrate with our existing systems?', answer: 'Potential integrations are reviewed during discovery. Feasibility, access, data handling and responsibility for each system must be confirmed in scope.' },
  { question: 'Can our team manage the website after launch?', answer: 'Where content management is included, the administration experience, access, documentation and training expectations are agreed for the project.' },
  { question: 'How will we review progress?', answer: 'The review rhythm, staging access, decision points and people involved are agreed during planning and documented in the project brief.' },
  { question: 'What support can be included after launch?', answer: 'Post-launch support can be discussed as part of the scope. Availability, response times, and any related terms would be confirmed separately.' },
];

export default function WebDevelopmentPage({ setActivePage, posts, loading }: Props) {
  return (
    <div className="bg-white">
      <section className="hero-atmosphere overflow-hidden pb-16 pt-28 text-white md:pb-20 md:pt-32 lg:pb-24">
        <div className="site-container">
          <nav className="mb-7 text-sm text-white/65" aria-label="Breadcrumb"><ol className="flex items-center gap-2"><li><a href="/" onClick={(event) => { event.preventDefault(); setActivePage('Home'); }} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li><li aria-hidden="true" className="text-white/35">/</li><li><a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); setActivePage('Services'); }} className="inline-flex min-h-11 items-center hover:text-white">Services</a></li><li aria-hidden="true" className="text-white/35">/</li><li aria-current="page" className="text-white">Web Development</li></ol></nav>
          <div className="grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
            <div className="max-w-2xl">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-sky">Web development services</p>
              <h1 className="text-balance text-[clamp(2.75rem,5vw,4.8rem)] font-semibold leading-[1.03] tracking-[-.055em] text-white">Web development built around <span className="text-sky">your business.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#d3e0ed]">Websites, portals and web applications designed around business requirements, the people who use them, technical performance, search readiness and room to evolve.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('discuss_web_project_cta', { location: 'web_hero' }); setActivePage('Contact'); }} className="btn-primary">Discuss your web project <ArrowRight size={18} aria-hidden="true" /></a>
                <a href="#web-development-example" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-white transition-colors hover:text-sky">View web development work <ArrowRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
            <figure className="min-w-0">
              <PortalPreview />
              <figcaption className="mt-3 text-right text-xs text-white/65">ITGS internal concept · Illustrative demonstration · Not client work</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <ApprovedProofBar />

      <section className="border-b border-border bg-[#fafbfc] py-16 md:py-20" aria-labelledby="web-use-cases">
        <div className="site-container">
          <h2 id="web-use-cases" className="text-[clamp(2rem,3.2vw,3rem)] leading-tight">Built for your next move.</h2>
          <ol className="mt-10 grid gap-0 border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {useCases.map(({ title, copy }, index) => <li key={title} className="flex min-h-40 gap-4 border-b border-r border-border bg-white p-6">
              <span className="shrink-0 text-3xl font-medium tracking-[-.06em] text-steel">0{index + 1}</span>
              <div className="border-l border-[#d7e1ec] pl-4"><h3 className="text-base font-semibold tracking-[-.02em]">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></div>
            </li>)}
          </ol>
        </div>
      </section>

      <WebSolutionsSection />
      <ApprovedCaseStudies />

      <section id="web-development-example" className="section-space scroll-mt-28 bg-white" aria-labelledby="web-example-title">
        <div className="site-container">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="eyebrow">Internal demonstration</p><h2 id="web-example-title" className="max-w-2xl text-balance text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">See how we think. Explore what we build.</h2></div>
            <p className="max-w-xs text-sm font-medium text-steel">Self-initiated concept · Not client work</p>
          </div>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(250px,.65fr)] lg:gap-14">
            <PortalPreview interactive />
            <div className="grid gap-0">
              {annotations.map(({ title, copy, icon: Icon }) => <div key={title} className="flex gap-4 border-b border-border py-6 first:pt-0 last:border-0 lg:py-8">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#dbeafe] bg-[#eef6ff] text-electric"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
                <div><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm leading-6">{copy}</p></div>
              </div>)}
            </div>
          </div>
        </div>
      </section>

      <QualityStandardsSection />
      <WebTechnologySection />

      <section className="section-space border-y border-border bg-[#fafbfc]" aria-labelledby="web-deliverables-title">
        <div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div><p className="eyebrow">Deliverables</p><h2 id="web-deliverables-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">What you receive.</h2><p className="mt-5 max-w-sm text-base leading-7">A connected set of planning, design, development, and handover materials shaped by the agreed scope.</p></div>
          <div><ol className="border-t border-border">
            {deliverables.map(({ title, copy }, index) => <li key={title} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[44px_minmax(150px,.75fr)_1fr] sm:items-start sm:gap-5"><span className="text-xl font-medium text-steel">0{index + 1}</span><h3 className="text-base">{title}</h3><p className="text-sm leading-6">{copy}</p></li>)}
          </ol><div className="mt-6 rounded-lg border border-[#cfe0ef] bg-[#edf6fc] p-5"><h3 className="text-base">Ownership and access are agreed in writing.</h3><p className="mt-2 text-sm leading-6">Source code, design files, repository access, CMS administration, domains, hosting, documentation, handover and third-party licensing can vary by engagement. The written agreement defines what transfers and when.</p></div></div>
        </div>
      </section>

      <section className="section-space bg-[#eaf4fc]" aria-labelledby="web-process-title">
        <div className="site-container">
          <p className="eyebrow">Our process</p>
          <h2 id="web-process-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">A clear path from idea to launch.</h2>
          <ol className="web-process mt-12 grid gap-8 lg:grid-cols-4 lg:gap-5">
            {process.map(({ title, copy, output, icon: Icon }, index) => <li key={title} className="relative ml-4 border-l border-[#9fc4ed] pb-2 pl-7 lg:ml-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pt-8">
              <span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white lg:-top-4 lg:left-0">{index + 1}</span>
              <Icon className="mb-4 mt-1 text-electric" size={22} strokeWidth={1.8} aria-hidden="true" />
              <h3 className="text-lg">{title}</h3><p className="mt-2 max-w-xs text-sm leading-6">{copy}</p><p className="mt-4 text-xs font-semibold text-[#174c87]">Output: {output}</p>
            </li>)}
          </ol>
        </div>
      </section>

      <SeoMigrationSection />
      <WebAudienceSection />
      <ApprovedIndustries />
      <WhyWebSection />
      <ApprovedTestimonials />
      <RelatedWebServices setActivePage={setActivePage} />
      <WebInsightsSection posts={posts} loading={loading} setActivePage={setActivePage} />

      <section className="section-space bg-white" aria-labelledby="web-faq-title">
        <div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div><p className="eyebrow">Web development FAQ</p><h2 id="web-faq-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Before we begin.</h2><p className="mt-5 max-w-sm text-base leading-7">Questions that clarify scope, ownership, migration risk and delivery expectations.</p></div>
          <div className="border-t border-border">
            {WEB_DEVELOPMENT_FAQS.map(({ question, answer }) => <details key={question} className="group border-b border-border">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} aria-hidden="true" /></summary>
              <p className="max-w-2xl pb-6 pr-10 text-sm leading-7">{answer}</p>
            </details>)}
          </div>
        </div>
      </section>

      <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="web-closing-title">
        <div className="site-container">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Ready to get started?</p>
          <h2 id="web-closing-title" className="max-w-3xl text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] text-white">Let’s build your next chapter.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/75">Tell us what you’re trying to build, replace or improve. We can help define the most useful next step around the users, systems and business requirements involved.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('discuss_web_project_cta', { location: 'web_final_cta' }); setActivePage('Contact'); }} className="btn-primary">Discuss your web project <ArrowRight size={18} aria-hidden="true" /></a><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('contact_cta_click', { location: 'web_final_cta' }); setActivePage('Contact'); }} className="btn-outline-dark">Contact us <ArrowUpRight size={18} aria-hidden="true" /></a></div>
        </div>
      </section>
    </div>
  );
}

