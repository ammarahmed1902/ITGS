import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { ROUTES } from '../config/site';

const NAV_LINKS = [
  { label: 'Home', path: ROUTES.home },
  { label: 'About', path: ROUTES.about },
  { label: 'Services', path: ROUTES.services },
  { label: 'Reviews', path: ROUTES.reviews },
  { label: 'Team', path: ROUTES.team },
  { label: 'Blog', path: ROUTES.blog },
  { label: 'Careers', path: ROUTES.careers },
  { label: 'Contact', path: ROUTES.contact },
] as const;

function isActivePath(pathname: string, path: string): boolean {
  if (path === ROUTES.home) return pathname === ROUTES.home;
  return pathname === path || pathname.startsWith(`${path}/`);
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav py-2" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to={ROUTES.home} className="rounded-lg" aria-label="ITGS Home">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map(({ label, path }) => {
            const active = isActivePath(pathname, path);
            return (
              <Link
                key={path}
                to={path}
                aria-current={active ? 'page' : undefined}
                className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-cyan relative group ${
                  active ? 'text-cyan' : 'text-white/70'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 bg-cyan transition-all duration-300 group-hover:w-full ${
                    active ? 'w-full' : 'w-0'
                  }`}
                />
              </Link>
            );
          })}
          <Link
            to={ROUTES.booking}
            aria-current={pathname === ROUTES.booking ? 'page' : undefined}
            className="bg-electric hover:bg-cyan text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-electric/20"
          >
            Schedule Meeting
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-midnight flex flex-col p-8 md:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex justify-between items-center mb-12">
              <Link to={ROUTES.home} onClick={closeMobile} aria-label="ITGS Home">
                <Logo />
              </Link>
              <button
                type="button"
                className="text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={closeMobile}
                aria-label="Close navigation menu"
              >
                <X size={28} aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {NAV_LINKS.map(({ label, path }, index) => {
                const active = isActivePath(pathname, path);
                return (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      to={path}
                      onClick={closeMobile}
                      aria-current={active ? 'page' : undefined}
                      className={`block text-left text-3xl sm:text-4xl font-black tracking-tighter transition-colors ${
                        active ? 'text-cyan' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-auto pt-12 border-t border-white/5">
              <Link
                to={ROUTES.booking}
                onClick={closeMobile}
                className="w-full bg-electric hover:bg-cyan text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-electric/20 flex items-center justify-center gap-3"
              >
                Schedule Meeting
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
