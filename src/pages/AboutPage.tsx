import { ArrowRight } from 'lucide-react';
import { ApprovedCaseStudies, ApprovedProofBar, ApprovedTestimonials } from '../components/home/ApprovedContentSections';
import {
  ApprovedCompanyFacts, ApprovedCompanyStory, ApprovedLeadershipSection,
  ApprovedOperatingLocations, CompanyNavigationSection, ConnectedCompanyVisual,
  DifferenceSection, FocusApproachSection, MissionPrinciplesSection,
  WhoWeAreSection, WorkingRelationshipSection,
} from '../components/about/AboutSections';
import { pathForPage, trackSiteEvent } from '../lib/siteNavigation';

export default function AboutPage({ setActivePage }: { setActivePage: (page: string) => void }) {
  return <div className="bg-white">
    <section className="hero-atmosphere overflow-hidden pb-16 pt-28 text-white md:pb-20 md:pt-32 lg:pb-24"><div className="site-container"><nav className="mb-7 text-sm text-white/65" aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2"><li><a href={pathForPage('Home')} onClick={(event) => { event.preventDefault(); setActivePage('Home'); }} className="inline-flex min-h-11 items-center hover:text-white">Home</a></li><li aria-hidden="true" className="text-white/35">/</li><li aria-current="page" className="inline-flex min-h-11 items-center text-white">About</li></ol></nav><div className="grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16"><div className="max-w-2xl"><p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-sky">About ITGS</p><h1 className="text-balance text-[clamp(2.75rem,5vw,4.8rem)] font-semibold leading-[1.03] tracking-[-.055em] text-white">Digital expertise shaped around <span className="text-sky">the work that matters.</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-[#d3e0ed]">ITGS brings strategy, product design, software engineering, digital growth and operational support into one connected model built around the business outcome first.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"><a href={pathForPage('Work')} onClick={(event) => { event.preventDefault(); trackSiteEvent('about_navigation_click', { destination: 'work' }); setActivePage('Work'); }} className="btn-primary">See our work <ArrowRight size={18} /></a><a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); trackSiteEvent('about_navigation_click', { destination: 'services' }); setActivePage('Services'); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-white transition-colors hover:text-sky">Explore our services <ArrowRight size={17} /></a></div></div><ConnectedCompanyVisual /></div></div></section>

    <ApprovedCompanyFacts />
    <ApprovedProofBar />
    <WhoWeAreSection setActivePage={setActivePage} />
    <FocusApproachSection />
    <ApprovedCompanyStory />
    <ApprovedLeadershipSection />
    <MissionPrinciplesSection />
    <DifferenceSection />
    <ApprovedCaseStudies />
    <WorkingRelationshipSection />
    <ApprovedTestimonials />
    <ApprovedOperatingLocations />
    <CompanyNavigationSection setActivePage={setActivePage} />

    <section className="hero-atmosphere py-16 text-white md:py-20" aria-labelledby="about-closing-title"><div className="site-container"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[.17em] text-sky">Start with the objective</p><h2 id="about-closing-title" className="max-w-4xl text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] text-white">Looking for a partner that can connect the work?</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">Tell us what you are trying to build, improve or grow. We will help identify the most useful starting point.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('contact_cta_click', { location: 'about_closing' }); setActivePage('Contact'); }} className="btn-primary">Contact us <ArrowRight size={18} /></a><a href={pathForPage('Work')} onClick={(event) => { event.preventDefault(); trackSiteEvent('about_navigation_click', { destination: 'work_closing' }); setActivePage('Work'); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10">View our work <ArrowRight size={17} /></a></div></div></section>
  </div>;
}
