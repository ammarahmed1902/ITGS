import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { SERVICES_DATA } from '../constants';
import { pathForPage, servicePath, trackSiteEvent } from '../lib/siteNavigation';
import Logo from './Logo';

type Props = { activePage: string; setActivePage: (page: string) => void };

const companyLinks = ['About', 'Careers', 'Contact'];
const featuredServiceIds = ['web-development', 'mobile-development', 'ui-ux-design', 'digital-marketing', 'seo', 'e-commerce'];

export default function Navbar({ activePage, setActivePage }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const servicesButton = useRef<HTMLButtonElement>(null);
  const companyButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setServicesOpen(false);
        setCompanyOpen(false);
        if (servicesOpen) servicesButton.current?.focus();
        else if (companyOpen) companyButton.current?.focus();
        else if (menuOpen) menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [servicesOpen, companyOpen, menuOpen]);

  const navigate = (page: string) => {
    setActivePage(page);
    setMenuOpen(false);
    setServicesOpen(false);
    setCompanyOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <nav className="nav-panel mx-auto max-w-[1296px] rounded-xl px-3 py-2.5 md:px-4" aria-label="Main navigation">
        <div className="flex items-center justify-between gap-4">
          <a href="/" onClick={(event) => { event.preventDefault(); navigate('Home'); }} aria-label="ITGS home" className="shrink-0"><Logo /></a>
          <span className="mr-auto hidden border-l border-white/15 pl-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#afc9dc] xl:block">Digital partner</span>

          <div className="hidden items-center gap-5 lg:flex xl:gap-7">
            <div className="relative">
              <button ref={servicesButton} onClick={() => { setServicesOpen((open) => !open); setCompanyOpen(false); }} aria-expanded={servicesOpen} aria-controls="services-menu" className={`flex min-h-11 items-center gap-1 ${activePage.startsWith('Service') ? 'text-sky' : 'text-white/90 hover:text-white'}`}>Services <ChevronDown size={15} className={servicesOpen ? 'rotate-180' : ''} /></button>
              {servicesOpen && (
                <div id="services-menu" className="absolute left-0 top-12 w-[560px] rounded-xl border border-white/15 bg-deep-blue p-3 shadow-2xl">
                  <div className="grid grid-cols-2 gap-1">
                    {featuredServiceIds.map((id) => {
                      const service = SERVICES_DATA.find((item) => item.id === id)!;
                      return <a key={id} href={servicePath(id)} onClick={(event) => { event.preventDefault(); trackSiteEvent('service_page_click', { service: id, location: 'header' }); navigate(`Service:${id}`); }} className="rounded-lg px-3 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white"><span className="block font-semibold text-white">{service.title}</span><span className="mt-1 block text-xs leading-5 text-white/55">{service.shortDesc.split('.')[0]}.</span></a>;
                    })}
                  </div>
                  <a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); navigate('Services'); }} className="mt-2 flex min-h-11 items-center justify-between rounded-lg border border-white/15 px-3 text-sm font-semibold text-sky hover:bg-white/10">View all ITGS services <span aria-hidden="true">→</span></a>
                </div>
              )}
            </div>
            <a href={pathForPage('Solutions')} onClick={(event) => { event.preventDefault(); navigate('Solutions'); }} className={`flex min-h-11 items-center ${activePage === 'Solutions' ? 'text-sky' : 'text-white/90 hover:text-white'}`}>Solutions</a>
            <a href={pathForPage('Work')} onClick={(event) => { event.preventDefault(); navigate('Work'); }} className={`flex min-h-11 items-center ${activePage === 'Work' ? 'text-sky' : 'text-white/90 hover:text-white'}`}>Our work</a>
            <a href={pathForPage('Blog')} onClick={(event) => { event.preventDefault(); navigate('Blog'); }} className={`flex min-h-11 items-center ${activePage === 'Blog' ? 'text-sky' : 'text-white/90 hover:text-white'}`}>Insights</a>
            <div className="relative">
              <button ref={companyButton} onClick={() => { setCompanyOpen((open) => !open); setServicesOpen(false); }} aria-expanded={companyOpen} aria-controls="company-menu" className={`flex min-h-11 items-center gap-1 ${companyLinks.includes(activePage) ? 'text-sky' : 'text-white/90 hover:text-white'}`}>Company <ChevronDown size={15} className={companyOpen ? 'rotate-180' : ''} /></button>
              {companyOpen && <div id="company-menu" className="absolute right-0 top-12 w-52 rounded-lg border border-white/15 bg-deep-blue p-2 shadow-2xl">{companyLinks.map((link) => <a key={link} href={pathForPage(link)} onClick={(event) => { event.preventDefault(); navigate(link); }} className="block min-h-10 w-full rounded-md px-3 py-2.5 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white">{link}</a>)}</div>}
            </div>
            <a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('contact_cta_click', { location: 'header' }); navigate('Contact'); }} className="nav-action inline-flex min-h-11 items-center gap-2 rounded-md border border-sky/60 px-4 text-sm font-semibold text-white shadow-lg shadow-black/15">Contact us <ArrowUpRight size={16} /></a>
          </div>

          <button ref={menuButton} onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" className="flex min-h-11 items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 text-sm text-white lg:hidden">Menu {menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>

        {menuOpen && (
          <div id="mobile-navigation" className="mt-3 max-h-[calc(100vh-100px)] overflow-y-auto border-t border-white/15 pb-2 pt-3 lg:hidden">
            <a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); navigate('Services'); }} className="flex min-h-12 w-full items-center justify-between border-b border-white/10 px-2 text-left text-white/85">Services <span aria-hidden="true">→</span></a>
            <a href={pathForPage('Solutions')} onClick={(event) => { event.preventDefault(); navigate('Solutions'); }} className="flex min-h-12 items-center justify-between border-b border-white/10 px-2 text-white/85">Solutions <span aria-hidden="true">→</span></a>
            <a href={pathForPage('Work')} onClick={(event) => { event.preventDefault(); navigate('Work'); }} className="flex min-h-12 items-center justify-between border-b border-white/10 px-2 text-white/85">Our work <span aria-hidden="true">→</span></a>
            <a href={pathForPage('Blog')} onClick={(event) => { event.preventDefault(); navigate('Blog'); }} className="flex min-h-12 items-center justify-between border-b border-white/10 px-2 text-white/85">Insights <span aria-hidden="true">→</span></a>
            {companyLinks.map((link) => <a key={link} href={pathForPage(link)} onClick={(event) => { event.preventDefault(); navigate(link); }} className="flex min-h-12 items-center justify-between border-b border-white/10 px-2 text-white/85">{link}<span aria-hidden="true">→</span></a>)}
            <a href={pathForPage('Contact')} onClick={(event) => { event.preventDefault(); trackSiteEvent('contact_cta_click', { location: 'mobile_header' }); navigate('Contact'); }} className="nav-action mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-md font-semibold text-white">Contact us <ArrowUpRight size={18} /></a>
          </div>
        )}
      </nav>
    </header>
  );
}
