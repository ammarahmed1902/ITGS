import { ArrowUpRight } from 'lucide-react';
import {publishableCaseStudy, type CaseStudy} from '../../domain/entities/CaseStudy';

export type ProofItem = {
  name: string;
  value?: string;
  description: string;
  logoUrl?: string;
  url?: string;
  sourceReference: string;
  approved: boolean;
};

export type CaseStudyItem = CaseStudy & {url:string};

export type IndustryItem = {
  name: string;
  description: string;
  url: string;
  approved: boolean;
};

export type TestimonialItem = {
  fullName: string;
  jobTitle: string;
  company: string;
  quote: string;
  source: string;
  sourceUrl?: string;
  approved: boolean;
};

// These collections stay empty until a referenced record is approved for publication.
// They can be replaced with CMS data without changing the homepage layout.
const proofItems: ProofItem[] = [];
const caseStudies: CaseStudyItem[] = [];
const industries: IndustryItem[] = [];
const testimonials: TestimonialItem[] = [];

export function ApprovedProofBar() {
  const visible = proofItems.filter((item) => item.approved && item.sourceReference);
  if (visible.length === 0) return null;
  return <section aria-label="Verified ITGS proof" className="border-y border-border bg-white py-6"><div className="site-container grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{visible.map((item) => <article key={item.name} className="flex items-center gap-4">{item.logoUrl && <img src={item.logoUrl} alt="" width="44" height="44" className="size-11 object-contain" />}<div>{item.value && <p className="text-xl font-semibold text-ink">{item.value}</p>}<p className="text-sm font-semibold text-ink">{item.name}</p><p className="text-xs leading-5">{item.description}</p></div></article>)}</div></section>;
}

export function ApprovedCaseStudies() {
  const visible = caseStudies.filter(publishableCaseStudy);
  if (visible.length === 0) return null;
  return <section className="section-space bg-[#f3f7fa]" aria-labelledby="case-studies-title"><div className="site-container"><span className="eyebrow">Featured work</span><h2 id="case-studies-title" className="text-[clamp(2rem,4vw,3.3rem)]">Selected work. Verified outcomes.</h2><div className="mt-10 grid gap-5 lg:grid-cols-2">{visible.map((item) => <article key={item.projectName} className="card p-7"><span className="text-xs font-semibold uppercase tracking-[.14em] text-electric">{item.industry}</span><h3 className="mt-4 text-2xl">{item.projectName}</h3><dl className="mt-6 grid gap-4 text-sm leading-6"><div><dt className="font-semibold text-ink">Challenge</dt><dd>{item.challenge}</dd></div><div><dt className="font-semibold text-ink">Work delivered</dt><dd>{item.workDelivered}</dd></div><div><dt className="font-semibold text-ink">Verified outcome</dt><dd>{item.metrics.map(metric => [metric.name, metric.baseline, metric.finalValue, metric.period, metric.source].join(' · ')).join('; ')}</dd></div></dl><a href={item.url} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric">View the case study <ArrowUpRight size={16} /></a></article>)}</div></div></section>;
}

export function ApprovedIndustries() {
  const visible = industries.filter((item) => item.approved);
  if (visible.length === 0) return null;
  return <section id="industries" className="section-space bg-white" aria-labelledby="industries-title"><div className="site-container"><span className="eyebrow">Industries</span><h2 id="industries-title" className="text-[clamp(2rem,4vw,3.3rem)]">Experience grounded in operating context.</h2><div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">{visible.map((item) => <a key={item.name} href={item.url} className="bg-white p-7 hover:bg-[#f7fbff]"><h3 className="text-xl">{item.name}</h3><p className="mt-3 text-sm leading-6">{item.description}</p></a>)}</div></div></section>;
}

export function ApprovedTestimonials() {
  const visible = testimonials.filter((item) => item.approved && item.source);
  if (visible.length === 0) return null;
  return <section className="section-space bg-[#f7f8f5]" aria-labelledby="testimonials-title"><div className="site-container"><span className="eyebrow">Client proof</span><h2 id="testimonials-title" className="text-[clamp(2rem,4vw,3.3rem)]">What approved clients say.</h2><div className="mt-10 grid gap-5 lg:grid-cols-2">{visible.map((item) => <figure key={`${item.fullName}-${item.company}`} className="card p-7"><blockquote className="text-lg leading-8 text-ink">“{item.quote}”</blockquote><figcaption className="mt-6 text-sm"><strong className="block text-ink">{item.fullName}</strong><span>{item.jobTitle}, {item.company}</span></figcaption></figure>)}</div></div></section>;
}

