import type { ReactNode } from 'react';
import ServiceCard from './ServiceCard';
import type { ServiceCardItem } from './serviceCards';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: ServiceCardItem[];
  footer?: ReactNode;
  theme?: 'light' | 'dark';
};

export default function ServiceCardsSection({ id, eyebrow, title, intro, items, footer, theme = 'dark' }: Props) {
  const titleId = `${id}-title`;
  const dark = theme === 'dark';

  return (
    <section id={id} className={`section-space scroll-mt-28 ${dark ? 'bg-midnight text-white' : 'bg-starfield'}`} aria-labelledby={titleId}>
      <div className="site-container">
        <div className={`grid gap-7 border-b pb-10 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-16 ${dark ? 'border-white/15' : 'border-border'}`}>
          <div>
            <span className={`eyebrow ${dark ? '!text-sky' : ''}`}>{eyebrow}</span>
            <h2 id={titleId} className={`max-w-3xl text-[clamp(2.15rem,4vw,3.6rem)] leading-[1.06] ${dark ? 'text-white' : ''}`}>
              {title}
            </h2>
          </div>
          <p className={`max-w-xl text-base leading-7 lg:justify-self-end ${dark ? 'text-white/68' : 'text-steel'}`}>{intro}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => <ServiceCard key={item.id} item={item} index={index} />)}
        </div>

        {footer && <div className={`mt-8 flex justify-end ${dark ? 'text-sky' : 'text-electric'}`}>{footer}</div>}
      </div>
    </section>
  );
}
