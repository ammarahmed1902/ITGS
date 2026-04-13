import React from 'react';
import { motion } from 'motion/react';

const TeamPage = () => (
  <div className="pt-32 pb-24 bg-starfield min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">The Minds Behind ITGS</h1>
        <p className="text-steel">A global team of experts dedicated to your success.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { name: "Dr. Aris Thorne", role: "CEO & Founder", img: "https://picsum.photos/seed/person1/400/500" },
          { name: "James Wilson", role: "Chief Architect", img: "https://picsum.photos/seed/person2/400/500" },
          { name: "Lila Vance", role: "Head of Psychology", img: "https://picsum.photos/seed/person3/400/500" },
          { name: "Kenji Sato", role: "VP of Security", img: "https://picsum.photos/seed/person4/400/500" },
        ].map((m, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }} className="group relative overflow-hidden rounded-3xl">
            <img src={m.img} alt={m.name} className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-6">
              <div className="text-white font-bold text-xl">{m.name}</div>
              <div className="text-cyan text-sm">{m.role}</div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan/50 rounded-3xl transition-colors duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default TeamPage;
