import { ArrowRight, ArrowUpRight, Layers3 } from 'lucide-react';
import { ApprovedCaseStudies, ApprovedProofBar, ApprovedTestimonials } from '../components/home/ApprovedContentSections';
import { ConceptWorkSection } from '../components/home/HomepageSections';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';

export default function WorkPage({ setActivePage }: { setActivePage: (page: string) => void }) {
  return <div className="bg-white">
    <section className="hero-atmosphere pb-16 pt-28 text-white md:pb-20 md:pt-32"><div className="site-container"><nav className="mb-8 text-sm text-white/65" aria-label="Breadcrumb"><ol className="flex items-center gap-2"><li><a href={pathForPage('Home')} onClick={(event) => { event.preventDefault(); setActivePage('Home'); }} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li><li aria-hidden="true" className="text-white/35">/</li><li aria-current="page" className="text-white">Our Work</li></ol></nav><div className="grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end"><div><span className="mb-5 block text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Our work</span><h1 className="max-w-4xl text-balance text-[clamp(2.8rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-.055em] text-white">Internal concepts for <span className="text-sky">digital products.</span></h1></div><div><p className="max-w-xl text-lg leading-8 text-[#d3e0ed]">Explore self-initiated design concepts. These are not client projects and do not demonstrate measured client results.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><a href="#work-library" className="btn-primary">Explore concepts <ArrowRight size={17} /></a><a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); setActivePage('Services'); }} className="btn-outline-dark">Browse by service <ArrowRight size={17} /></a></div></div></div></div></section>

    <ApprovedProofBar />



    <div id="work-library" className="scroll-mt-28"><ApprovedCaseStudies /></div>
    <ConceptWorkSection setActivePage={setActivePage} showHubLink={false} />
    <ApprovedTestimonials />


    <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="work-closing-title"><div className="site-container"><Layers3 className="text-sky" size={28} /><p className="mb-4 mt-6 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Bring us the context</p><h2 id="work-closing-title" className="max-w-4xl text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] text-white">Discuss a similar problem.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">Tell us what needs to change, what already exists and how success should be understood. We will help identify a practical starting point.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('contact_cta_click', { location: 'work_closing' }); setActivePage('Contact'); }} className="btn-primary">Discuss your project <ArrowUpRight size={18} /></a><a href={pathForPage('Solutions')} onClick={(event) => { event.preventDefault(); setActivePage('Solutions'); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10">Explore solutions <ArrowRight size={17} /></a></div></div></section>
  </div>;
}
