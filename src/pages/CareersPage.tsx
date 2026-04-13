import React from 'react';

const CareersPage = () => (
  <div className="pt-32 pb-24 bg-starfield min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-6">Join the Authority</h1>
        <p className="text-steel max-w-2xl mx-auto">We're looking for visionaries who want to shape the future of global technology.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 mb-24">
        <div className="card-premium">
          <h2 className="text-2xl font-bold mb-6">Why Work With ITGS?</h2>
          <ul className="space-y-4">
            {["Global Impact", "Innovative Culture", "Continuous Learning", "Premium Benefits"].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan/10 flex items-center justify-center text-cyan">✓</div>
                <span className="text-steel font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          {[
            { role: "Senior Security Architect", loc: "Remote / SF" },
            { role: "Full Stack Engineer", loc: "London, UK" },
            { role: "UX Researcher (Psychology)", loc: "Remote" },
          ].map((j, i) => (
            <div key={i} className="p-6 bg-starfield rounded-2xl border border-midnight/5 flex justify-between items-center hover:border-electric transition-colors">
              <div>
                <div className="font-bold text-lg">{j.role}</div>
                <div className="text-steel text-sm">{j.loc}</div>
              </div>
              <button className="btn-primary py-2">Apply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default CareersPage;
