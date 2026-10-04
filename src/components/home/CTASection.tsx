import { ArrowUpRight } from 'lucide-react';
import { pathForPage, trackSiteEvent } from '../../lib/siteNavigation';

export default function CTASection({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <div className="hero-atmosphere rounded-xl px-6 py-12 text-white md:px-12 md:py-16 lg:flex lg:items-center lg:justify-between">
          <div>
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[.16em] text-sky">Start a conversation</span>
            <h2 className="max-w-2xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] text-white">Let’s discuss what you need next.</h2>
            <p className="mt-4 max-w-xl leading-7 text-white/65">Choose a time to share your goals and explore the most useful next step.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:pl-8"><a href={pathForPage('Booking')} onClick={(event) => { event.preventDefault(); trackSiteEvent('strategy_call_cta_click', { location: 'homepage_final_cta' }); setActivePage('Booking'); }} className="btn-light">Book a strategy call <ArrowUpRight size={18} /></a><a href={pathForPage('Work')} onClick={(event) => { event.preventDefault(); setActivePage('Work'); }} className="btn-outline-dark">Explore our work <ArrowUpRight size={18} /></a></div>
        </div>
      </div>
    </section>
  );
}
