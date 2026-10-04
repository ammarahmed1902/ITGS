import { ArrowRight, ListChecks, MessageSquareText, UsersRound } from 'lucide-react';
import IconBadge from '../IconBadge';
import Reveal from '../Reveal';

const benefits = [
  { text: 'A focused scope built around your goal', icon: ListChecks },
  { text: 'One accountable team across disciplines', icon: UsersRound },
  { text: 'Clear handoffs and practical next steps', icon: MessageSquareText },
];

export default function ResultsSection({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <section className="section-space animated-atmosphere text-white">
      <span className="ambient-wash" aria-hidden="true" />
      <span className="ambient-glow" aria-hidden="true" />
      <span className="ambient-grid" aria-hidden="true" />
      <div className="site-container relative grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-center">
        <Reveal><div>
          <span className="eyebrow !text-sky">One connected partner</span>
          <h2 className="max-w-2xl text-[clamp(2.1rem,4vw,3.5rem)] leading-[1.07] text-white">Strategy, creative and technology working in one direction.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">Bring the parts of your digital business together—from the experience customers see to the systems and support behind it.</p>
          <button onClick={() => setActivePage('About')} className="mt-8 inline-flex items-center gap-2 font-semibold text-sky hover:text-white">How ITGS works <ArrowRight size={18} /></button>
        </div></Reveal>
        <ul className="card border-white/15 bg-white/[.06] p-7 text-white backdrop-blur-sm">
          {benefits.map(({ text, icon: Icon }) => (
            <li key={text} className="benefit-row flex items-center gap-4 border-b border-white/15 py-4 last:border-0"><IconBadge dark small><Icon size={22} strokeWidth={1.8} /></IconBadge><span className="leading-6 text-white/85">{text}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
