import {
  ArrowRight, ArrowUpRight, Blocks, CheckCircle2, ClipboardList, Code2,
  Compass, Eye, Gauge, Handshake, Layers3, LineChart, MessageSquareText,
  Search, ShieldCheck, Sparkles, Target, UsersRound, Workflow,
} from 'lucide-react';
import { pathForPage, trackSiteEvent } from '../../lib/siteNavigation';
import IconBadge from '../IconBadge';

type Navigate = { setActivePage: (page: string) => void };

type CompanyFact = {
  label: string;
  value: string;
  description: string;
  internalSource: string;
  verificationDate: string;
  sourceUrl?: string;
  approved: boolean;
};

type Leader = {
  fullName: string;
  title: string;
  biography: string;
  responsibility: string;
  imageUrl?: string;
  profileUrl?: string;
  sourceReference: string;
  approved: boolean;
};

type CompanyStory = {
  heading: string;
  copy: string;
  sourceReference: string;
  approved: boolean;
};

type OperatingLocation = {
  name: string;
  description: string;
  sourceReference: string;
  approved: boolean;
};

// Company facts, history, leaders and locations remain unpublished until a
// referenced source has been verified and approved for public use.
const companyFacts: CompanyFact[] = [];
const leaders: Leader[] = [];
const companyStory: CompanyStory[] = [];
const operatingLocations: OperatingLocation[] = [];

export function ConnectedCompanyVisual() {
  const disciplines = [
    ['Strategy', Compass], ['Product & design', Layers3], ['Engineering', Code2],
    ['Digital growth', LineChart], ['Operations', Workflow],
  ] as const;
  return <div role="img" aria-label="ITGS connected delivery model bringing strategy, product design, engineering, digital growth and operations together" className="rounded-xl border border-white/15 bg-[#0a2239]/90 p-5 shadow-[0_24px_60px_rgba(2,19,41,.3)] sm:p-6">
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-sky">Connected delivery model</p><p className="mt-1 text-sm font-semibold text-white">Shared context across the work.</p></div><Blocks className="text-sky" size={24} /></div>
    <div className="mt-5 grid gap-2 sm:grid-cols-2">{disciplines.map(([label, Icon], index) => <div key={label} className={`flex min-h-16 items-center gap-3 rounded-lg border border-white/10 bg-white/[.04] px-4 ${index === disciplines.length - 1 ? 'sm:col-span-2' : ''}`}><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky"><Icon size={18} /></span><span className="text-sm font-semibold text-white">{label}</span></div>)}</div>
    <div className="mt-4 rounded-lg bg-electric px-4 py-3 text-center text-xs font-semibold text-white">Business outcome first. Disciplines follow.</div>
  </div>;
}

export function ApprovedCompanyFacts() {
  const visible = companyFacts.filter((fact) => fact.approved && fact.internalSource && fact.verificationDate);
  if (visible.length === 0) return null;
  return <section className="border-y border-border bg-white py-7" aria-label="Verified ITGS company facts"><div className="site-container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{visible.map((fact) => <article key={fact.label}><p className="text-[11px] font-semibold uppercase tracking-[.14em] text-electric">{fact.label}</p><p className="mt-2 text-2xl font-semibold text-ink">{fact.value}</p><p className="mt-1 text-xs leading-5">{fact.description}</p></article>)}</div></section>;
}

export function WhoWeAreSection({ setActivePage }: Navigate) {
  const disciplines = ['Strategy', 'Product design', 'Software engineering', 'Digital growth', 'Operational support'];
  return <section className="section-space bg-white" aria-labelledby="who-we-are-title"><div className="site-container grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20"><div><span className="eyebrow">Who we are</span><h2 id="who-we-are-title" className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08]">One company across product, technology and growth.</h2><p className="mt-6 max-w-xl text-lg leading-8">ITGS is a digital partner that brings complementary disciplines into one delivery model. The aim is to solve the business problem with the right combination of work, clear ownership and shared context.</p><a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); trackSiteEvent('about_navigation_click', { destination: 'services' }); setActivePage('Services'); }} className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">Explore ITGS services <ArrowRight size={17} /></a></div><div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">{disciplines.map((discipline, index) => <div key={discipline} className={`flex min-h-24 items-center justify-between bg-[#fbfdff] px-6 ${index === disciplines.length - 1 ? 'sm:col-span-2' : ''}`}><span className="font-semibold text-ink">{discipline}</span><span className="text-xs font-semibold text-steel">0{index + 1}</span></div>)}</div></div></section>;
}

const approach = [
  ['Understand', 'Clarify the objective, context and constraints before prescribing a solution.', Search],
  ['Define', 'Agree scope, responsibilities, review points and useful success criteria.', ClipboardList],
  ['Deliver', 'Work through visible decisions and review points with the relevant specialists.', Sparkles],
  ['Improve', 'Use real results and feedback to decide what should happen next.', Gauge],
] as const;

export function FocusApproachSection() {
  return <section className="section-space bg-[#f4f7fa]" aria-labelledby="company-focus-title"><div className="site-container grid gap-8 lg:grid-cols-[.9fr_1.1fr]"><article className="rounded-xl bg-midnight p-8 text-white md:p-10"><Target className="text-sky" size={27} /><span className="mt-7 block text-[11px] font-semibold uppercase tracking-[.16em] text-sky">Our focus</span><h2 id="company-focus-title" className="mt-3 text-[clamp(2.2rem,3.5vw,3.25rem)] leading-[1.08] text-white">Make technology useful for the business behind it.</h2><p className="mt-6 max-w-xl text-base leading-7 text-white/70">ITGS starts with the outcome and operating reality, then determines which combination of strategy, design, development, marketing or operational support is actually required.</p></article><article className="rounded-xl border border-border bg-white p-8 md:p-10"><span className="eyebrow">How we work</span><h2 className="text-[clamp(2rem,3vw,2.7rem)] leading-tight">A simple approach across disciplines.</h2><ol className="mt-7">{approach.map(([title, copy, Icon], index) => <li key={title} className="grid grid-cols-[44px_1fr_auto] gap-4 border-b border-border py-5 last:border-0"><IconBadge small><Icon size={19} /></IconBadge><div><h3 className="text-base">{title}</h3><p className="mt-1 text-sm leading-6">{copy}</p></div><span className="text-xs font-semibold text-steel">0{index + 1}</span></li>)}</ol></article></div></section>;
}

export function ApprovedCompanyStory() {
  const visible = companyStory.filter((item) => item.approved && item.sourceReference);
  if (visible.length === 0) return null;
  return <section className="section-space bg-white" aria-labelledby="company-story-title"><div className="site-container max-w-4xl"><span className="eyebrow">Company story</span><h2 id="company-story-title" className="text-[clamp(2.2rem,4vw,3.5rem)]">How ITGS got here.</h2><div className="mt-9 space-y-8">{visible.map((item) => <article key={item.heading} className="border-l-2 border-electric pl-6"><h3 className="text-xl">{item.heading}</h3><p className="mt-3 leading-7">{item.copy}</p></article>)}</div></div></section>;
}

export function ApprovedLeadershipSection() {
  const visible = leaders.filter((leader) => leader.approved && leader.sourceReference);
  if (visible.length === 0) return null;
  return <section className="section-space bg-white" aria-labelledby="leadership-title"><div className="site-container"><span className="eyebrow">Leadership</span><h2 id="leadership-title" className="text-[clamp(2.2rem,4vw,3.5rem)]">The people responsible for the work.</h2><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visible.map((leader) => <article key={leader.fullName} className="card overflow-hidden">{leader.imageUrl && <img src={leader.imageUrl} alt={leader.fullName} className="aspect-[4/3] w-full object-cover" />}<div className="p-6"><h3 className="text-xl">{leader.fullName}</h3><p className="mt-1 text-sm font-semibold text-electric">{leader.title}</p><p className="mt-4 text-sm leading-6">{leader.biography}</p><p className="mt-4 text-xs leading-5"><strong className="text-ink">Responsibility:</strong> {leader.responsibility}</p>{leader.profileUrl && <a href={leader.profileUrl} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">View profile <ArrowUpRight size={16} /></a>}</div></article>)}</div></div></section>;
}

const principles = [
  ['Understand before prescribing', 'Do not select a discipline or solution before understanding the problem.', Compass],
  ['Own the outcome', 'Responsibility includes the usefulness of the result, not only task completion.', Target],
  ['Make the work visible', 'Keep scope, progress, decisions and review points understandable.', Eye],
  ['Use evidence over assumptions', 'Let research, data and feedback change the next decision.', LineChart],
  ['Build for the next team', 'Create systems and documentation another person can understand and improve.', UsersRound],
  ['Say what is true', 'Do not invent proof, certainty, credentials or results.', ShieldCheck],
] as const;

export function MissionPrinciplesSection() {
  return <><section className="section-space bg-[#eaf4fc]" aria-labelledby="mission-title"><div className="site-container grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><span className="eyebrow">Why ITGS exists</span><h2 id="mission-title" className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08]">Help businesses make better use of digital technology.</h2></div><p className="max-w-3xl text-xl leading-9 text-[#294760]">Connect strategy, execution and ongoing improvement around real operational and commercial needs—so technology supports the business rather than becoming another disconnected initiative.</p></div></section><section className="section-space bg-white" aria-labelledby="principles-title"><div className="site-container"><span className="eyebrow">Operating principles</span><h2 id="principles-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">How we choose to work.</h2><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{principles.map(([title, copy, Icon]) => <article key={title} className="bg-white p-6"><Icon className="text-electric" size={22} /><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></article>)}</div></div></section></>;
}

export function DifferenceSection() {
  const points = [
    ['One connected delivery model', 'Relevant disciplines can work from shared context instead of separate briefs.'],
    ['Business problem before discipline', 'The work starts with the need rather than a predetermined website, campaign or app.'],
    ['Clear scope and review points', 'Responsibilities, decisions and checkpoints stay visible.'],
    ['Build and improve', 'Delivery can create evidence for the next useful decision.'],
    ['Specialists where specialization matters', 'The model does not pretend every person covers every discipline.'],
  ];
  return <section className="section-space bg-[#f4f7fa]" aria-labelledby="difference-title"><div className="site-container"><span className="eyebrow">The operating model</span><h2 id="difference-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Why ITGS works differently.</h2><ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{points.map(([title, copy], index) => <li key={title} className="card p-6"><span className="text-sm font-semibold text-electric">0{index + 1}</span><h3 className="mt-5 text-lg">{title}</h3><p className="mt-3 text-sm leading-6">{copy}</p></li>)}</ol></div></section>;
}

export function WorkingRelationshipSection() {
  const items = [
    ['Clear ownership', 'Know who owns the decision, delivery and next action.', Handshake],
    ['Visible communication', 'Use agreed channels and useful updates rather than hidden work.', MessageSquareText],
    ['Defined review points', 'Create moments to evaluate direction before work moves too far.', CheckCircle2],
    ['Relevant specialists', 'Bring in the discipline needed for the specific problem.', UsersRound],
    ['Documented decisions', 'Keep important context available beyond a meeting or individual.', ClipboardList],
    ['Truthful proof', 'Publish outcomes, credentials and company facts only when verified.', ShieldCheck],
  ] as const;
  return <section className="section-space bg-midnight text-white" aria-labelledby="relationship-title"><div className="site-container"><span className="text-[11px] font-semibold uppercase tracking-[.17em] text-sky">The client relationship</span><h2 id="relationship-title" className="mt-4 max-w-4xl text-[clamp(2.3rem,4vw,3.6rem)] leading-[1.08] text-white">What working with ITGS should feel like.</h2><div className="mt-11 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/10 md:grid-cols-2 lg:grid-cols-3">{items.map(([title, copy, Icon]) => <article key={title} className="bg-midnight p-6"><Icon className="text-sky" size={22} /><h3 className="mt-5 text-lg text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{copy}</p></article>)}</div></div></section>;
}

export function ApprovedOperatingLocations() {
  const visible = operatingLocations.filter((location) => location.approved && location.sourceReference);
  if (visible.length === 0) return null;
  return <section className="section-space bg-white" aria-labelledby="locations-title"><div className="site-container"><span className="eyebrow">Operating model</span><h2 id="locations-title" className="text-[clamp(2.2rem,4vw,3.5rem)]">Where we work.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{visible.map((location) => <article key={location.name} className="card p-6"><h3 className="text-xl">{location.name}</h3><p className="mt-3 text-sm leading-6">{location.description}</p></article>)}</div></div></section>;
}

export function CompanyNavigationSection({ setActivePage }: Navigate) {
  const items = [
    { title: 'Explore services', copy: 'See the capabilities inside the connected model.', page: 'Services', href: pathForPage('Services') },
    { title: 'Explore solutions', copy: 'Start with the business outcome you need to achieve.', page: 'Solutions', href: pathForPage('Solutions') },
    { title: 'View our work', copy: 'See work through its problem, decisions and evidence.', page: 'Work', href: pathForPage('Work') },
    { title: 'Read insights', copy: 'Explore practical thinking across products and growth.', page: 'Blog', href: pathForPage('Blog') },
    { title: 'Contact ITGS', copy: 'Discuss the problem, context and next useful step.', page: 'Contact', href: pathForPage('Contact') },
  ];
  return <section className="section-space bg-white" aria-labelledby="company-navigation-title"><div className="site-container"><span className="eyebrow">Continue exploring</span><h2 id="company-navigation-title" className="max-w-4xl text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08]">Find the part of ITGS relevant to you.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{items.map((item) => <a key={item.title} href={item.href} onClick={(event) => { event.preventDefault(); trackSiteEvent('about_navigation_click', { destination: item.page.toLowerCase() }); setActivePage(item.page); }} className="card group p-7"><h3 className="flex items-center justify-between gap-4 text-xl">{item.title}<ArrowUpRight className="text-electric transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={19} /></h3><p className="mt-3 text-sm leading-6">{item.copy}</p></a>)}</div></div></section>;
}

