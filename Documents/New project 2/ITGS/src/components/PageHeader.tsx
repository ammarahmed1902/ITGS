import React from 'react';
import Reveal from './Reveal';

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}

const PageHeader = ({ eyebrow, title, description, className = '' }: PageHeaderProps) => (
  <div className={`text-center mb-16 ${className}`}>
    <Reveal>
      {eyebrow && (
        <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
          {eyebrow}
        </span>
      )}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-balance">{title}</h1>
      {description && (
        <p className="text-steel max-w-2xl mx-auto text-lg font-light leading-relaxed">{description}</p>
      )}
    </Reveal>
  </div>
);

export default PageHeader;
