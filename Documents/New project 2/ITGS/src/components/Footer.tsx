import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Linkedin } from 'lucide-react';
import { SERVICES_DATA } from '../constants';
import { SITE, ROUTES } from '../config/site';
import Logo from './Logo';

const Footer = () => (
  <footer className="bg-deep-blue pt-20 pb-10 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="mb-6">
            <Logo />
          </div>
          <p className="text-white/60 leading-relaxed text-sm">
            The global authority in psychology-driven technology solutions for the modern enterprise.
          </p>
        </div>
        <div>
          <h2 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h2>
          <ul className="space-y-3 text-white/60 text-sm">
            {[
              ['About Us', ROUTES.about],
              ['Our Team', ROUTES.team],
              ['Careers', ROUTES.careers],
              ['Blog', ROUTES.blog],
              ['Contact Us', ROUTES.contact],
            ].map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="hover:text-cyan transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Services</h2>
          <ul className="space-y-3 text-white/60 text-sm">
            {SERVICES_DATA.map((s) => (
              <li key={s.id}>
                <Link to={ROUTES.service(s.id)} className="hover:text-cyan transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to={ROUTES.services} className="text-cyan hover:text-white transition-colors font-bold">
                View All Services →
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contact</h2>
          <ul className="space-y-3 text-white/60 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-cyan transition-colors">
                {SITE.email}
              </a>
            </li>
            <li>{SITE.phone}</li>
            <li>
              {SITE.address.line1}, {SITE.address.city}
            </li>
            <li className="flex gap-3 pt-3">
              <a
                href={SITE.social.website}
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan transition-colors"
                aria-label="Visit ITGS website"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe size={18} className="text-white" aria-hidden="true" />
              </a>
              <a
                href={SITE.social.linkedin}
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan transition-colors"
                aria-label="ITGS on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} className="text-white" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs uppercase tracking-widest">
        <p>© 2026 ITGS Global. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to={ROUTES.privacy} className="hover:text-white transition-colors p-2 -m-2">
            Privacy Policy
          </Link>
          <Link to={ROUTES.terms} className="hover:text-white transition-colors p-2 -m-2">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
