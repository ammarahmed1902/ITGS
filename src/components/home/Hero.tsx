import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { pathForPage, trackSiteEvent } from '../../lib/siteNavigation';
import HeroCanvas from './HeroCanvas';

export default function Hero({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <HeroCanvas>
      <div className="site-container flex min-h-[inherit] items-center justify-center pb-16 pt-32 text-center text-white md:pb-20 md:pt-36">
        <div className="mx-auto max-w-[920px]">
          <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.16em] text-sky">
            Software · Digital products · Digital growth
          </span>
          <h1 className="text-balance mx-auto max-w-[920px] text-[clamp(2.6rem,5.7vw,5.25rem)] font-semibold leading-[.98] tracking-[-.055em] text-white">
            Software, digital products and growth working as one.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#d3dee6] md:text-xl">
            ITGS helps organizations design, build, launch and improve digital products and customer-acquisition systems through one connected team.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('contact_cta_click', { location: 'homepage_hero' }); setActivePage('Contact'); }} className="btn-light">
              Contact us <ArrowUpRight size={18} />
            </a>
            <a href="#services" className="btn-outline-dark">
              Explore services <ArrowRight size={18} />
            </a>
          </div>
          <p className="mt-9 text-sm text-white/65">Plan the right move. Build it well. Learn from what happens next.</p>
        </div>
      </div>
    </HeroCanvas>
  );
}
