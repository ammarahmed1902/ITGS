import React from 'react';
import { Globe, Users } from 'lucide-react';
import { SERVICES_DATA } from '../constants';

const Footer = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  return (
    <footer className="bg-deep-blue pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-electric rounded flex items-center justify-center">
                <span className="text-white font-bold">I</span>
              </div>
              <span className="text-white font-display text-xl font-bold">ITGS</span>
            </div>
            <p className="text-white/40 leading-relaxed">
              The global authority in psychology-driven technology solutions for the modern enterprise.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><button onClick={() => setActivePage('About')} className="hover:text-cyan transition-colors">About Us</button></li>
              <li><button onClick={() => setActivePage('Team')} className="hover:text-cyan transition-colors">Our Team</button></li>
              <li><button onClick={() => setActivePage('Careers')} className="hover:text-cyan transition-colors">Careers</button></li>
              <li><button onClick={() => setActivePage('Blog')} className="hover:text-cyan transition-colors">Blog</button></li>
              <li><button onClick={() => setActivePage('Admin')} className="hover:text-cyan transition-colors">Admin Login</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              {SERVICES_DATA.slice(0, 4).map((s, i) => (
                <li key={i}>
                  <button 
                    onClick={() => setActivePage(`Service:${s.id}`)}
                    className="hover:text-cyan transition-colors text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li>contact@itgs.global</li>
              <li>+1 (800) ITGS-TECH</li>
              <li>Silicon Valley, CA</li>
              <li className="flex gap-4 pt-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan transition-colors cursor-pointer">
                  <Globe size={16} className="text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan transition-colors cursor-pointer">
                  <Users size={16} className="text-white" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4 text-white/20 text-xs uppercase tracking-widest">
          <p>© 2026 ITGS Global. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
