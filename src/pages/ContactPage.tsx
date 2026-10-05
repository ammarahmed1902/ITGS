import { useState, type FormEvent } from 'react';
import {
  ArrowRight, Check, ChevronDown, ClipboardList, FolderOpen,
  MessageSquareText, Route, Send, ShieldCheck, UsersRound,
} from 'lucide-react';
import type { SiteConfig } from '../lib/siteConfig';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';

const preparation = [
  ['The change you need', 'What should become easier, clearer, faster or more effective?', Route],
  ['What exists today', 'Share the current product, process, systems or constraints if they are relevant.', FolderOpen],
  ['Who it needs to serve', 'Tell us about the customers, users or team members affected by the work.', UsersRound],
  ['What a useful outcome means', 'Describe the business result or user improvement you want to work toward.', Check],
] as const;

const nextSteps = [
  ['Review', 'We read the context and identify the questions that need an answer.', 'Shared context'],
  ['Clarify', 'We determine whether ITGS is relevant and what the smallest useful starting point may be.', 'Recommended direction'],
  ['Confirm', 'Scope, responsibilities, timing and commercial terms are agreed before work begins.', 'Written scope'],
] as const;

const faqs = [
  { question: 'Do I need a finished brief before contacting ITGS?', answer: 'No. A clear description of the problem, the people affected and what you want to improve is enough for an initial enquiry. If the work is a fit, discovery can help turn early context into a structured brief.' },
  { question: 'Can ITGS help me choose the right service?', answer: 'Yes. Start with the outcome rather than a service name. Your enquiry can help identify whether the next step belongs in strategy, design, development, digital growth, operations or a connected combination.' },
  { question: 'What happens after I send the form?', answer: 'ITGS reviews the context and decides whether a useful next step can be suggested. That may be a request for additional information, a focused discovery activity or a proposed scope.' },
  { question: 'Can you confirm pricing or a delivery date immediately?', answer: 'Reliable pricing and timing depend on the agreed scope, dependencies and responsibilities. These details are confirmed after enough context is available to define the work responsibly.' },
] as const;

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPage({ setActivePage, config }: { setActivePage: (page: string) => void; config: SiteConfig }) {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, page: string, source: string) => {
    event.preventDefault();
    trackSiteEvent('contact_navigation_click', { location: source });
    setActivePage(page);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitState('sending');
    setErrorMessage('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'), email: data.get('email'), company: data.get('company'),
          service: data.get('service'), message: data.get('message'), website: data.get('website'),
          consent: data.get('consent') === 'on', sourcePath: location.pathname,
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json().catch(() => ({})) as { message?: string };
      if (!response.ok) throw new Error(result.message || 'Your message could not be sent. Please try again.');
      form.reset();
      setSubmitState('sent');
      trackSiteEvent('contact_form_submit', { location: 'contact_page' });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Your message could not be sent. Please try again.');
      setSubmitState('error');
    }
  };

  return <>
    <section className="hero-atmosphere overflow-hidden pb-16 pt-28 text-white md:pb-20 md:pt-32 lg:pb-24" aria-labelledby="contact-title">
      <div className="site-container">
        <nav className="mb-7 text-sm text-white/65" aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2"><li><a href={pathForPage('Home')} onClick={(event) => navigate(event, 'Home', 'breadcrumb')} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li><li aria-hidden="true" className="text-white/35">/</li><li aria-current="page" className="inline-flex min-h-11 items-center text-white">Contact</li></ol></nav>
        <div className="grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-sky">Contact ITGS</p>
            <h1 id="contact-title" className="text-balance text-[clamp(2.8rem,5.5vw,5.2rem)] font-semibold leading-[1.01] tracking-[-.055em] text-white">Let’s make the <span className="text-sky">next step clear.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#d3e0ed]">Tell us what you are building, improving or trying to grow. Start with the context and we will help identify a practical way forward.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#contact-form" className="btn-primary">Send an enquiry <Send size={17} /></a><a href={pathForPage('Services')} onClick={(event) => navigate(event, 'Services', 'contact_hero')} className="btn-outline-dark">Explore services <ArrowRight size={17} /></a></div>
          </div>
          <div role="img" aria-label="A clear enquiry journey from sharing context to agreeing the next step" className="relative mx-auto w-full max-w-[590px] rounded-xl border border-white/15 bg-[#081e32]/85 p-5 shadow-[0_28px_80px_rgba(0,0,0,.32)] backdrop-blur-sm sm:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5"><div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-sky">A useful first message</p><p className="mt-2 text-lg font-semibold text-white">Start with the problem. We’ll follow the context.</p></div><span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-sky/25 bg-sky/10 text-sky"><MessageSquareText size={21} /></span></div>
            <ol className="relative mt-6 grid gap-3 before:absolute before:bottom-8 before:left-[21px] before:top-8 before:w-px before:bg-gradient-to-b before:from-sky/60 before:to-sky/10">{[
              ['01', 'Share the situation', 'The objective, users and current state.'], ['02', 'Explain the need', 'The priorities, constraints and open questions.'], ['03', 'Choose the next step', 'A responsible direction before delivery begins.'],
            ].map(([number, title, copy]) => <li key={number} className="relative grid grid-cols-[44px_1fr] gap-4 rounded-lg border border-white/10 bg-white/[.045] p-4"><span className="z-10 flex size-11 items-center justify-center rounded-full border border-sky/30 bg-[#0b2944] text-xs font-semibold text-sky">{number}</span><div><h2 className="text-base tracking-[-.02em] text-white">{title}</h2><p className="mt-1 text-sm leading-6 text-white/60">{copy}</p></div></li>)}</ol>
            <div className="mt-5 flex items-center gap-3 rounded-lg bg-electric px-4 py-3 text-sm font-semibold text-white"><ShieldCheck size={18} aria-hidden="true" /> Your enquiry stays private</div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact-form" className="section-space scroll-mt-28 bg-white" aria-labelledby="contact-form-title">
      <div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div><span className="eyebrow">Send an enquiry</span><h2 id="contact-form-title" className="text-[clamp(2.25rem,4vw,3.6rem)] leading-[1.06]">Tell us what you need.</h2><p className="mt-5 max-w-lg text-base leading-7">Share the problem, the current situation and the outcome you are working toward. You do not need a polished brief.</p><div className="mt-8 rounded-xl border border-[#cfe0f5] bg-[#eef6ff] p-5"><ShieldCheck className="text-electric" size={22} /><h3 className="mt-4 text-lg">Clear context is enough.</h3><p className="mt-2 text-sm leading-6">Do not include passwords, confidential credentials, payment information or sensitive personal data.</p></div></div>
        <form onSubmit={submit} aria-labelledby="contact-form-title" className="rounded-xl border border-border bg-[#fbfdff] p-6 shadow-[0_22px_55px_rgba(16,37,56,.08)] sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-ink">Name <span className="sr-only">required</span><input className="field font-normal" name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
            <label className="grid gap-2 text-sm font-semibold text-ink">Work email <span className="sr-only">required</span><input className="field font-normal" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            <label className="grid gap-2 text-sm font-semibold text-ink">Company <span className="font-normal text-steel">(optional)</span><input className="field font-normal" name="company" autoComplete="organization" maxLength={120} /></label>
            <label className="grid gap-2 text-sm font-semibold text-ink">What can we help with? <span className="sr-only">required</span><select className="field font-normal" name="service" required defaultValue=""><option value="" disabled>Select an area</option><option>Web development</option><option>Mobile app development</option><option>UI/UX design</option><option>Digital marketing</option><option>Search engine optimization</option><option>Lead generation</option><option>E-commerce solutions</option><option>Virtual assistance</option><option>Not sure yet</option><option>Something else</option></select></label>
          </div>
          <label className="mt-5 grid gap-2 text-sm font-semibold text-ink">Project or business context <span className="sr-only">required</span><textarea className="min-h-40 w-full resize-y rounded-md border border-[#7a8995] bg-white px-4 py-3 font-normal text-ink outline-none transition focus:border-electric" name="message" required minLength={20} maxLength={3000} placeholder="What are you trying to build, improve or change?" /></label>
          <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <label className="mt-5 flex items-start gap-3 text-sm leading-6"><input name="consent" type="checkbox" required className="mt-1 size-4 shrink-0 accent-[#155eef]" /><span>I agree that ITGS may use these details to respond to my enquiry.{config.privacyUrl && <> <a href={config.privacyUrl} className="font-semibold text-electric underline">Read the privacy notice</a>.</>}</span></label>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center"><button type="submit" disabled={submitState === 'sending'} className="btn-primary disabled:cursor-wait disabled:opacity-65">{submitState === 'sending' ? 'Sending…' : 'Send enquiry'} <Send size={17} /></button><p className={`text-sm ${submitState === 'sent' ? 'font-semibold text-[#087a55]' : submitState === 'error' ? 'font-semibold text-[#a32121]' : 'text-steel'}`} role="status" aria-live="polite">{submitState === 'sent' ? 'Thank you. Your enquiry has been sent.' : submitState === 'error' ? errorMessage : 'Required fields are marked by the browser.'}</p></div>
        </form>
      </div>
    </section>

    <section className="section-space bg-[#eaf4fc]" aria-labelledby="contact-prepare-title"><div className="site-container grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20"><div><span className="eyebrow">Prepare your message</span><h2 id="contact-prepare-title" className="text-[clamp(2.2rem,3.8vw,3.35rem)] leading-[1.08]">A useful brief can be simple.</h2><p className="mt-5 max-w-lg text-base leading-7">A few points of context help us understand the request. Bring what you know; uncertainties can stay visible.</p><div className="mt-8 rounded-xl border border-[#bad5f1] bg-white/70 p-5"><ClipboardList className="text-electric" size={23} /><p className="mt-4 text-sm font-semibold text-ink">No polished requirements document is needed.</p></div></div><ol className="grid gap-px overflow-hidden rounded-xl border border-[#c7d9ec] bg-[#c7d9ec] sm:grid-cols-2">{preparation.map(([title, copy, Icon], index) => <li key={title} className="bg-white p-6 md:p-7"><div className="flex items-center justify-between gap-4"><Icon className="text-electric" size={22} aria-hidden="true" /><span className="text-xs font-semibold text-steel">0{index + 1}</span></div><h3 className="mt-6 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></li>)}</ol></div></section>

    <section className="section-space bg-white" aria-labelledby="contact-next-title"><div className="site-container"><span className="eyebrow">What happens next</span><h2 id="contact-next-title" className="max-w-4xl text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.08]">From first message to a defined direction.</h2><ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-0">{nextSteps.map(([title, copy, output], index) => <li key={title} className="relative ml-4 border-l border-[#9fc4ed] pb-4 pl-8 last:pb-0 md:ml-0 md:border-l-0 md:border-t md:px-6 md:pb-0 md:pt-9 md:first:pl-0 md:last:pr-0"><span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full bg-electric text-xs font-semibold text-white md:-top-4 md:left-6 md:first:left-0">{index + 1}</span><h3 className="text-xl">{title}</h3><p className="mt-3 max-w-sm text-sm leading-6">{copy}</p><p className="mt-5 text-xs font-semibold uppercase tracking-[.1em] text-[#174c87]">Output: {output}</p></li>)}</ol></div></section>

    <section className="section-space border-t border-border bg-[#f7f8f5]" aria-labelledby="contact-faq-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">Contact FAQ</span><h2 id="contact-faq-title" className="text-[clamp(2.2rem,3.8vw,3.25rem)] leading-[1.08]">Before you send.</h2><p className="mt-5 max-w-sm text-base leading-7">A few answers about starting the conversation and deciding what should happen next.</p></div><div className="border-t border-border">{faqs.map(({ question, answer }) => <details key={question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="shrink-0 text-[#41627e] transition-transform group-open:rotate-180" size={20} aria-hidden="true" /></summary><p className="max-w-2xl pb-6 pr-9 text-sm leading-7">{answer}</p></details>)}</div></div></section>

    <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="contact-closing-title"><div className="site-container"><MessageSquareText className="text-sky" size={28} aria-hidden="true" /><p className="mb-4 mt-6 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Ready when the context is</p><h2 id="contact-closing-title" className="max-w-4xl text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] text-white">Bring us the problem. We’ll help clarify the path.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">Share the situation, surface the important questions and give us enough context to identify whether there is a useful next step together.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#contact-form" className="btn-primary">Send an enquiry <Send size={17} /></a><a href={pathForPage('Services')} onClick={(event) => navigate(event, 'Services', 'contact_closing')} className="btn-outline-dark">Explore services <ArrowRight size={17} /></a></div></div></section>
  </>;
}
