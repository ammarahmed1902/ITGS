import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (page: string) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = ['Home', 'About', 'Services', 'Reviews', 'Team', 'Blog', 'Careers', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass-nav py-0.5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div
          className="cursor-pointer"
          onClick={() => setActivePage('Home')}
        >
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActivePage(link)}
              className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-cyan relative group ${activePage === link ? 'text-cyan' : 'text-white/60'}`}
            >
              {link}
              <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-cyan transition-all duration-300 group-hover:w-full ${activePage === link ? 'w-full' : ''}`} />
            </button>
          ))}
          <button
            onClick={() => setActivePage('Booking')}
            className="bg-electric hover:bg-cyan text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-electric/20 flex items-center justify-center"
          >
            Schedule Meeting
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[60] bg-midnight flex flex-col p-8 md:hidden overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-12">
            <Logo />
            <button 
              className="text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" 
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={32} />
            </button>
          </div>
          
          <div className="flex flex-col gap-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setActivePage(link);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-4xl font-black tracking-tighter transition-colors ${activePage === link ? 'text-cyan' : 'text-white/60 hover:text-white'}`}
              >
                {link}
              </motion.button>
            ))}
          </div>

          <div className="mt-auto pt-12 border-t border-white/5">
            <button
              onClick={() => {
                setActivePage('Booking');
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-electric hover:bg-cyan text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-electric/20 flex items-center justify-center gap-3"
            >
              Schedule Meeting
              <ArrowRight size={18} />
            </button>
            <div className="mt-8 text-white/20 text-xs uppercase tracking-widest text-center">
              © 2026 ITGS Global
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
