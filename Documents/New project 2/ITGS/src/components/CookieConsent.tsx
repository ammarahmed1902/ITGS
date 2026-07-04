import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, X } from 'lucide-react';
import { ROUTES } from '../config/site';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setIsVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-midnight/95 backdrop-blur-md border-t border-cyan/20 animate-slide-up"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-electric/10 rounded-lg hidden md:block">
            <Shield className="w-6 h-6 text-cyan" aria-hidden="true" />
          </div>
          <div>
            <h2 id="cookie-title" className="text-white font-semibold text-lg">
              We value your privacy
            </h2>
            <p id="cookie-desc" className="text-white/60 text-sm max-w-2xl">
              We use cookies to enhance your browsing experience and analyze traffic. By clicking
              &quot;Accept All&quot;, you consent to our use of cookies. See our{' '}
              <Link to={ROUTES.privacy} className="text-cyan hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="flex-1 md:flex-none px-6 py-2.5 text-sm font-bold text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2.5 text-sm font-bold bg-electric hover:bg-cyan text-white rounded-full transition-colors shadow-lg shadow-electric/20"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="p-2 text-white/50 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Dismiss cookie banner"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
