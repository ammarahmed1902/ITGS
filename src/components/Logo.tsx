import React from 'react';
import logoSrc from '../assets/images/ITGS Logo.svg';

const Logo = () => (
  <div className="flex items-center gap-3">
    <img src={logoSrc} alt="ITGS Logo" className="w-25 h-25 object-contain" />
    <div className="flex flex-col">
      <span className="text-white font-display text-2xl font-black tracking-tighter leading-none"></span>
      <span className="text-cyan text-[8px] uppercase tracking-[0.4em] font-bold mt-1"> </span>
    </div>
  </div>
);

export default Logo;
