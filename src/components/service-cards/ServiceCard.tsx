import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { useId, useRef, useState, type FocusEvent, type MouseEvent } from 'react';
import type { ServiceCardItem } from './serviceCards';

export default function ServiceCard({ item, index }: { item: ServiceCardItem; index?: number }) {
  const [flipped, setFlipped] = useState(false);
  const frontControl = useRef<HTMLButtonElement>(null);
  const detailsId = useId();
  const Icon = item.icon;

  function followLink(event: MouseEvent<HTMLAnchorElement>) {
    if (!item.onNavigate) return;
    event.preventDefault();
    item.onNavigate(item.id);
  }

  function resetWhenFocusLeaves(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFlipped(false);
  }

  function showFront() {
    setFlipped(false);
    requestAnimationFrame(() => frontControl.current?.focus());
  }

  return (
    <article
      className="service-flip-card"
      data-flipped={flipped ? 'true' : 'false'}
      data-tone={item.tone ?? 'royal'}
      onBlur={resetWhenFocusLeaves}
    >
      <div className="service-flip-card__inner">
        <div className="service-flip-card__face service-flip-card__front">
          <span className="service-flip-card__number" aria-hidden="true">{String((index ?? 0) + 1).padStart(2, '0')}</span>
          <span className="service-flip-card__icon" aria-hidden="true"><Icon size={31} strokeWidth={1.65} /></span>
          <h3 className="service-flip-card__front-title">{item.title}</h3>
          <span className="service-flip-card__hint" aria-hidden="true">View details <ArrowUpRight size={15} /></span>
          <button
            ref={frontControl}
            type="button"
            className="service-flip-card__reveal"
            aria-expanded={flipped}
            aria-controls={detailsId}
            aria-label={`View details about ${item.title}`}
            onClick={() => setFlipped(true)}
            onFocus={() => setFlipped(true)}
          />
        </div>

        <div id={detailsId} className="service-flip-card__face service-flip-card__back" aria-hidden={!flipped}>
          <div className="flex items-start justify-between gap-4">
            <span className="service-flip-card__icon service-flip-card__icon--small" aria-hidden="true"><Icon size={23} strokeWidth={1.65} /></span>
            <button
              type="button"
              className="service-flip-card__return"
              aria-label={`Show front of ${item.title} card`}
              tabIndex={flipped ? 0 : -1}
              onClick={showFront}
            >
              <RotateCcw size={16} aria-hidden="true" /> Back
            </button>
          </div>
          <h3 className="service-flip-card__back-title">{item.title}</h3>
          <p className="service-flip-card__description">{item.description}</p>
          <a
            href={item.href}
            onClick={followLink}
            tabIndex={flipped ? 0 : -1}
            className="service-flip-card__cta"
            aria-label={`${item.ctaLabel ?? 'Learn more'} about ${item.title}`}
          >
            {item.ctaLabel ?? 'Learn more'} <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
