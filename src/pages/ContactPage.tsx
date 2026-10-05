import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronDown,
  ClipboardList,
  Compass,
  FolderOpen,
  MessageSquareText,
  Route,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import IconBadge from '../components/IconBadge';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';

const contactPaths = [
  {
    title: 'Start a new project',
    copy: 'Bring an idea, an existing product or a business problem. We will use the first conversation to understand the context and identify a useful next step.',
    action: 'Book a strategy call',
    page: 'Booking',
    icon: Sparkles,
  },
  {
    title: 'Explore the right capability',
    copy: 'Review ITGS services when you know the outcome you want, but you are still deciding which combination of design, technology or growth support fits.',
    action: 'Explore services',
    page: 'Services',
    icon: Compass,
  },
  {
    title: 'Continue an active conversation',
    copy: 'If you already have an agreed project channel or ITGS contact, continue there so the people and context stay connected.',
    action: 'See how ITGS works',
    page: 'About',
    icon: MessageSquareText,
  },
] as const;

const preparation = [
  ['The change you need', 'What should become easier, clearer, faster or more effective?', Route],
  ['What exists today', 'Share the current product, process, systems or constraints if they are relevant.', FolderOpen],
  ['Who it needs to serve', 'Tell us about the customers, users or team members affected by the work.', UsersRound],
  ['What a useful outcome means', 'Describe the business result or user improvement you want to work toward.', Check],
] as const;

const nextSteps = [
  ['Understand', 'We discuss the objective, current state, users and constraints.', 'Shared context'],
  ['Find the starting point', 'We identify the smallest useful discovery or delivery step.', 'Recommended direction'],
  ['Confirm the engagement', 'Scope, responsibilities, timing and commercial terms are agreed before work begins.', 'Written scope'],
] as const;

const faqs = [
  {
    question: 'Do I need a finished brief before contacting ITGS?',
    answer: 'No. A clear description of the problem, the people affected and what you want to improve is enough for an initial conversation. If the work is a fit, discovery can help turn early context into a structured brief.',
  },
  {
    question: 'Can ITGS help me choose the right service?',
    answer: 'Yes. Start with the outcome rather than a service name. The initial conversation can help identify whether the next step belongs in strategy, design, development, digital growth, operations or a connected combination.',
  },
  {
    question: 'What happens after the strategy call?',
    answer: 'The next step depends on the problem and its readiness. It may be a focused discovery activity, a request for additional context or a proposed scope. No work begins until responsibilities, deliverables and terms are confirmed.',
  },
  {
    question: 'Can you confirm pricing or a delivery date on the first call?',
    answer: 'Reliable pricing and timing depend on the agreed scope, dependencies and responsibilities. These details are confirmed after enough context is available to define the work responsibly.',
  },
] as const;

export default function ContactPage({ setActivePage }: { setActivePage: (page: string) => void }) {
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, page: string, location: string) => {
    event.preventDefault();
    trackSiteEvent(page === 'Booking' ? 'strategy_call_cta_click' : 'contact_navigation_click', { location });
    setActivePage(page);
  };

  return <>
    <section className="hero-atmosphere overflow-hidden pb-16 pt-28 text-white md:pb-20 md:pt-32 lg:pb-24" aria-labelledby="contact-title">
      <div className="site-container">
        <nav className="mb-7 text-sm text-white/65" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li><a href={pathForPage('Home')} onClick={(event) => navigate(event, 'Home', 'breadcrumb')} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li>
            <li aria-hidden="true" className="text-white/35">/</li>
            <li aria-current="page" className="inline-flex min-h-11 items-center text-white">Contact</li>
          </ol>
        </nav>
        <div className="grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-sky">Contact ITGS</p>
            <h1 id="contact-title" className="text-balance text-[clamp(2.8rem,5.5vw,5.2rem)] font-semibold leading-[1.01] tracking-[-.055em] text-white">Let’s make the <span className="text-sky">next step clear.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#d3e0ed]">Tell us what you are building, improving or trying to grow. We will start with the context and help identify a practical way forward.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={pathForPage('Booking')} onClick={(event) => navigate(event, 'Booking', 'contact_hero')} className="btn-primary">Book a strategy call <ArrowUpRight size={18} /></a>
              <a href="#contact-options" className="btn-outline-dark">Choose a starting point <ArrowRight size={17} /></a>
            </div>
          </div>

          <div role="img" aria-label="A clear contact journey from sharing context to agreeing the next step" className="relative mx-auto w-full max-w-[590px] rounded-xl border border-white/15 bg-[#081e32]/85 p-5 shadow-[0_28px_80px_rgba(0,0,0,.32)] backdrop-blur-sm sm:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-sky">Your first conversation</p><p className="mt-2 text-lg font-semibold text-white">Start with the problem. Shape the path together.</p></div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-sky/25 bg-sky/10 text-sky"><MessageSquareText size={21} /></span>
            </div>
            <ol className="relative mt-6 grid gap-3 before:absolute before:bottom-8 before:left-[21px] before:top-8 before:w-px before:bg-gradient-to-b before:from-sky/60 before:to-sky/10">
              {[
                ['01', 'Share the context', 'The objective, users and current situation.'],
                ['02', 'Clarify the need', 'The constraints, priorities and open questions.'],
                ['03', 'Agree the next step', 'A responsible direction before delivery begins.'],
              ].map(([number, title, copy]) => <li key={number} className="relative grid grid-cols-[44px_1fr] gap-4 rounded-lg border border-white/10 bg-white/[.045] p-4">
                <span className="z-10 flex size-11 items-center justify-center rounded-full border border-sky/30 bg-[#0b2944] text-xs font-semibold text-sky">{number}</span>
                <div><h2 className="text-base tracking-[-.02em] text-white">{title}</h2><p className="mt-1 text-sm leading-6 text-white/60">{copy}</p></div>
              </li>)}
            </ol>
            <div className="mt-5 flex items-center gap-3 rounded-lg bg-electric px-4 py-3 text-sm font-semibold text-white"><CalendarCheck size={18} aria-hidden="true" /> 30-minute strategy call</div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact-options" className="section-space scroll-mt-28 bg-white" aria-labelledby="contact-options-title">
      <div className="site-container">
        <div className="grid gap-7 border-b border-border pb-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div><span className="eyebrow">Choose your starting point</span><h2 id="contact-options-title" className="max-w-3xl text-[clamp(2.25rem,4vw,3.6rem)] leading-[1.06]">How can we help?</h2></div>
          <p className="max-w-2xl text-lg leading-8 lg:justify-self-end">Choose the route closest to your situation. You do not need to know the final scope or service mix before you get in touch.</p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {contactPaths.map(({ title, copy, action, page, icon: Icon }, index) => <article key={title} className="group flex min-h-[330px] flex-col rounded-xl border border-border bg-[#fbfdff] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#91b9e9] hover:bg-[#f4f9ff] md:p-7">
            <div className="flex items-start justify-between gap-4"><IconBadge><Icon size={23} /></IconBadge><span className="text-xs font-semibold text-steel">0{index + 1}</span></div>
            <h3 className="mt-8 text-2xl">{title}</h3>
            <p className="mt-4 text-sm leading-7">{copy}</p>
            <a href={pathForPage(page)} onClick={(event) => navigate(event, page, `contact_option_${index + 1}`)} className="mt-auto flex min-h-12 items-center justify-between border-t border-border pt-5 text-sm font-semibold text-electric">{action}<ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} /></a>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section-space bg-[#eaf4fc]" aria-labelledby="contact-prepare-title">
      <div className="site-container grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
        <div>
          <span className="eyebrow">Prepare for the conversation</span>
          <h2 id="contact-prepare-title" className="text-[clamp(2.2rem,3.8vw,3.35rem)] leading-[1.08]">A useful brief can be simple.</h2>
          <p className="mt-5 max-w-lg text-base leading-7">A few points of context help us use the conversation well. Bring what you know; uncertainties can stay visible.</p>
          <div className="mt-8 rounded-xl border border-[#bad5f1] bg-white/70 p-5"><ClipboardList className="text-electric" size={23} /><p className="mt-4 text-sm font-semibold text-ink">No polished requirements document is needed for the first call.</p></div>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-xl border border-[#c7d9ec] bg-[#c7d9ec] sm:grid-cols-2">
          {preparation.map(([title, copy, Icon], index) => <li key={title} className="bg-white p-6 md:p-7">
            <div className="flex items-center justify-between gap-4"><Icon className="text-electric" size={22} aria-hidden="true" /><span className="text-xs font-semibold text-steel">0{index + 1}</span></div>
            <h3 className="mt-6 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p>
          </li>)}
        </ol>
      </div>
    </section>

    <section className="section-space bg-white" aria-labelledby="contact-next-title">
      <div className="site-container">
        <span className="eyebrow">What happens next</span>
        <h2 id="contact-next-title" className="max-w-4xl text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.08]">From first conversation to a defined direction.</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-0">
          {nextSteps.map(([title, copy, output], index) => <li key={title} className="relative ml-4 border-l border-[#9fc4ed] pb-4 pl-8 last:pb-0 md:ml-0 md:border-l-0 md:border-t md:px-6 md:pb-0 md:pt-9 md:first:pl-0 md:last:pr-0">
            <span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white md:-top-4 md:left-6 md:first:left-0">{index + 1}</span>
            <h3 className="text-xl">{title}</h3><p className="mt-3 max-w-sm text-sm leading-6">{copy}</p><p className="mt-5 text-xs font-semibold uppercase tracking-[.1em] text-[#174c87]">Output: {output}</p>
          </li>)}
        </ol>
      </div>
    </section>

    <section className="section-space border-t border-border bg-[#f7f8f5]" aria-labelledby="contact-faq-title">
      <div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div><span className="eyebrow">Contact FAQ</span><h2 id="contact-faq-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Before we talk.</h2><p className="mt-5 max-w-sm text-base leading-7">A few answers about starting the conversation and deciding what should happen next.</p></div>
        <div className="border-t border-border">{faqs.map(({ question, answer }) => <details key={question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} aria-hidden="true" /></summary><p className="max-w-2xl pb-6 pr-9 text-sm leading-7">{answer}</p></details>)}</div>
      </div>
    </section>

    <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="contact-closing-title">
      <div className="site-container">
        <MessageSquareText className="text-sky" size={28} aria-hidden="true" />
        <p className="mb-4 mt-6 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Ready when the context is</p>
        <h2 id="contact-closing-title" className="max-w-4xl text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] text-white">Bring us the problem. We’ll help clarify the path.</h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">Use the first conversation to share the situation, surface the important questions and decide whether there is a useful next step together.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={pathForPage('Booking')} onClick={(event) => navigate(event, 'Booking', 'contact_closing')} className="btn-primary">Book a strategy call <ArrowUpRight size={18} /></a><a href={pathForPage('Services')} onClick={(event) => navigate(event, 'Services', 'contact_closing')} className="btn-outline-dark">Explore services <ArrowRight size={17} /></a></div>
      </div>
    </section>
  </>;
}
