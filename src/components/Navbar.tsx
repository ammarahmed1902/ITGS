import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (page: string) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = ['Home', 'About', 'Services', 'Reviews', 'Team', 'Blog', 'Careers'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass-nav py-8">
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
        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-midnight border-b border-white/5 p-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => {
                setActivePage(link);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-2xl font-black tracking-tighter ${activePage === link ? 'text-cyan' : 'text-white/60'}`}
            >
              {link}
            </button>
          ))}
          <button 
            onClick={() => {
              setActivePage('Booking');
              setIsMobileMenuOpen(false);
            }}
            className="bg-electric text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm mt-4 flex items-center justify-center"
          >
            Schedule Meeting
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
