import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal';
import { StaggerContainer, StaggerItem } from '../Stagger';
import { TESTIMONIALS } from '../../data/testimonials';
import { ROUTES } from '../../config/site';

const TestimonialsSection = () => (
  <section className="section-padding bg-starfield relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16 md:mb-20">
        <Reveal>
          <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Client Success</span>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            What Our Clients <span className="text-electric">Say</span>
          </h2>
        </Reveal>
      </div>
      <StaggerContainer>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((r) => (
            <div key={r.name}>
              <StaggerItem>
              <article className="card-premium h-full flex flex-col">
                <div className="text-electric mb-6" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} aria-hidden="true" className="text-xl">★</span>
                  ))}
                </div>
                <p className="text-steel/80 text-lg italic leading-relaxed mb-8 font-light flex-grow">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div
                    className="w-12 h-12 rounded-full bg-electric/10 flex items-center justify-center text-electric font-bold text-lg"
                    aria-hidden="true"
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-midnight">{r.name}</div>
                    <div className="text-steel/70 text-xs uppercase tracking-widest font-medium">
                      {r.role}, {r.company}
                    </div>
                  </div>
                </div>
              </article>
              </StaggerItem>
            </div>
          ))}
        </div>
      </StaggerContainer>
      <div className="mt-12 text-center">
        <Link to={ROUTES.reviews} className="text-electric font-bold uppercase tracking-widest text-sm hover:underline">
          Read all client reviews →
        </Link>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
