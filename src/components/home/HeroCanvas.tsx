import type { ReactNode } from 'react';

type HeroCanvasProps = {
  children?: ReactNode;
  showFollowOn?: boolean;
};

/**
 * Text-free hero canvas: edge-to-edge navy/blue glow field with reeded-glass ribs.
 * Content is optional and sits in `.hero-content` above the decorative layers.
 */
export default function HeroCanvas({ children, showFollowOn = true }: HeroCanvasProps) {
  return (
    <div className="hero-stage">
      <div className="hero-frame">
        <section className="hero">
          <div className="hero-layers" aria-hidden="true">
            <div className="hero-base" />
            <div className="hero-wash" />
            <div className="hero-roaming-glow hero-roaming-glow-primary" />
            <div className="hero-roaming-glow hero-roaming-glow-secondary" />
            <div className="hero-glow hero-glow-primary" />
            <div className="hero-glow hero-glow-secondary" />
            <div className="hero-glow hero-glow-accent" />
            <div className="hero-ribs" />
            <div className="hero-grain">
              <svg viewBox="0 0 200 200" preserveAspectRatio="none" focusable="false">
                <filter id="hero-canvas-noise" x="0" y="0" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#hero-canvas-noise)" />
              </svg>
            </div>
          </div>
          <div className="hero-content">{children}</div>
        </section>
        {showFollowOn && <div className="hero-follow" aria-hidden="true" />}
      </div>
    </div>
  );
}
