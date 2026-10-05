import { ArrowUpRight } from 'lucide-react';
import type { MouseEvent } from 'react';
import { SERVICES_DATA } from '../constants';
import { pathForPage, servicePath, trackSiteEvent } from '../lib/siteNavigation';
import Logo from './Logo';

const footerServices = ['web-development', 'mobile-development', 'ui-ux-design', 'digital-marketing', 'seo', 'e-commerce'];

export default function Footer({ setActivePage, compact = false }: { setActivePage: (page: string) => void; compact?: boolean }) {
  const navigate = (event: MouseEvent<HTMLAnchorElement>, page: string) => { event.preventDefault(); setActivePage(page); };
  if (compact) return (
    <footer className="border-t border-white/10 bg-midnight py-7 text-white">
      <div className="site-container flex flex-col gap-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4"><Logo /><span className="border-l border-white/25 pl-4">Software, products and growth—connected.</span></div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2"><span>© 2026 ITGS</span>{['Services','Solutions','Work','Blog'].map(page=><a key={page} href={pathForPage(page)} className="inline-flex min-h-11 items-center text-sky">{page==='Blog'?'Insights':page==='Work'?'Our Work':page}</a>)}<a href={pathForPage('Contact')} onClick={(event) => navigate(event, 'Contact')} className="inline-flex min-h-11 items-center font-medium text-sky hover:text-white">Contact ITGS</a></div>
      </div>
    </footer>
  );
  return (
    <footer className="bg-midnight py-14 text-white">
      <div className="site-container">
        <div className="grid gap-10 border-b border-white/15 pb-12 sm:grid-cols-2 xl:grid-cols-[1.35fr_1fr_1fr_.8fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-6 text-white/65">Software development, digital products, design and digital growth through one connected team.</p>
            <a href={pathForPage('Booking')} onClick={(event) => { trackSiteEvent('strategy_call_cta_click', { location: 'footer' }); navigate(event, 'Booking'); }} className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky hover:text-white">Book a strategy call <ArrowUpRight size={16} /></a>
          </div>
          <div>
            <h2 className="mb-5 text-sm font-semibold tracking-normal text-white">Services</h2>
            <ul className="grid gap-3 text-sm text-white/60"><li><a href="/services/" className="font-medium text-sky">All services</a></li>{footerServices.map((id) => { const service = SERVICES_DATA.find((item) => item.id === id)!; return <li key={id}><a href={servicePath(id)} onClick={(event) => navigate(event, `Service:${id}`)} className="hover:text-white">{service.title}</a></li>; })}</ul>
          </div>
          <div>
            <h2 className="mb-5 text-sm font-semibold tracking-normal text-white">Solutions</h2>
            <ul className="grid gap-3 text-sm text-white/60"><li><a href={pathForPage('Solutions')} onClick={(event) => navigate(event, 'Solutions')} className="font-medium text-sky hover:text-white">View all solutions</a></li><li><a href="/solutions/#launch-digital-product" onClick={(event) => navigate(event, 'Solutions')} className="hover:text-white">Launch a digital product</a></li><li><a href="/solutions/#modernize-product" onClick={(event) => navigate(event, 'Solutions')} className="hover:text-white">Modernize a product</a></li><li><a href="/solutions/#improve-organic-visibility" onClick={(event) => navigate(event, 'Solutions')} className="hover:text-white">Improve organic visibility</a></li><li><a href="/solutions/#strengthen-online-commerce" onClick={(event) => navigate(event, 'Solutions')} className="hover:text-white">Strengthen online commerce</a></li></ul>
          </div>
          <div>
            <h2 className="mb-5 text-sm font-semibold tracking-normal text-white">Our Work</h2>
            <ul className="grid gap-3 text-sm text-white/60"><li><a href={pathForPage('Work')} onClick={(event) => navigate(event, 'Work')} className="font-medium text-sky hover:text-white">View work</a></li><li><a href={pathForPage('Work')} onClick={(event) => navigate(event, 'Work')} className="hover:text-white">Design concepts</a></li><li><a href={pathForPage('Work')} onClick={(event) => navigate(event, 'Work')} className="hover:text-white">Internal concepts</a></li></ul>
          </div>
          <div>
            <h2 className="mb-5 text-sm font-semibold tracking-normal text-white">Company & resources</h2>
            <ul className="grid gap-3 text-sm text-white/60">{['About', 'Careers', 'Blog', 'Contact'].map((page) => <li key={page}><a href={pathForPage(page)} onClick={(event) => navigate(event, page)} className="hover:text-white">{page === 'Blog' ? 'Insights' : page}</a></li>)}</ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs text-white/65 sm:flex-row sm:justify-between"><p>© 2026 ITGS. All rights reserved.</p><p>Software, products and growth—connected.</p></div>
      </div>
    </footer>
  );
}
