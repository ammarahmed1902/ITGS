import React from 'react';

const ReviewsPage = () => (
  <div className="pt-32 pb-24 bg-starfield min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Trusted by Visionaries</h1>
        <p className="text-steel">Real stories from our global partners.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: "Sarah Jenkins", role: "CTO, Global Fin", text: "ITGS transformed our security posture. Their psychology-driven approach made adoption seamless across our 50,000 employees." },
          { name: "Marcus Chen", role: "VP Engineering, TechFlow", text: "The reliability of ITGS infrastructure is unmatched. We haven't seen a single minute of downtime since migrating." },
          { name: "Elena Rodriguez", role: "Director of UX, InnovateX", text: "Their understanding of human-centric design is profound. Our user engagement metrics have skyrocketed." },
        ].map((r, i) => (
          <div key={i} className="card-premium">
            <div className="flex gap-1 text-electric mb-4">
              {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
            </div>
            <p className="text-midnight font-medium mb-6 italic">"{r.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-midnight/5" />
              <div>
                <div className="font-bold">{r.name}</div>
                <div className="text-steel text-sm">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ReviewsPage;
