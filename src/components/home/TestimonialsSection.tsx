import React from 'react';
import Reveal from '../Reveal';
import { StaggerContainer, StaggerItem } from '../Stagger';

const TestimonialsSection = () => {
  const reviews = [
    { name: "Sarah Jenkins", role: "CTO, Global Logistics", text: "ITGS transformed our legacy systems into a high-velocity engine. Their psychological approach to UX is a game-changer." },
    { name: "David Chen", role: "VP Engineering, FinTech Pro", text: "The most reliable tech partner we've ever worked with. Their security architecture is second to none." },
    { name: "Marcus Thorne", role: "Director of Innovation, NexGen", text: "Scaling was our biggest hurdle until ITGS stepped in. They don't just build; they architect success." },
  ];

  return (
    <section className="section-padding bg-starfield relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <Reveal>
            <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Client Success</span>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8">Trusted by the <span className="text-electric">Best.</span></h2>
          </Reveal>
        </div>
        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-10">
            {reviews.map((r, i) => (
              <div key={i}>
                <StaggerItem>
                  <div className="bg-starfield p-12 rounded-[2.5rem] shadow-xl border border-midnight/5 relative group hover:-translate-y-2 transition-all duration-500 h-full">
                    <div className="text-electric mb-8">
                      {[...Array(5)].map((_, j) => <span key={j} className="text-2xl">★</span>)}
                    </div>
                    <p className="text-steel/80 text-xl italic leading-relaxed mb-10 font-light">"{r.text}"</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-14 h-14 rounded-full bg-midnight/5 flex items-center justify-center text-midnight font-bold text-xl">
                        {r.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-midnight">{r.name}</div>
                        <div className="text-steel/60 text-sm uppercase tracking-widest font-medium">{r.role}</div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              </div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default TestimonialsSection;
