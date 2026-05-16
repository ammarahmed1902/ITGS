import React from 'react';
import logoSrc from '../assets/images/ITGS Logo.svg';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "w-32" }: LogoProps) => (
  <div className={`flex items-center ${className}`}>
    <img src={logoSrc} alt="ITGS Logo" className="w-full h-auto object-contain" />
  </div>
);

export default Logo;
