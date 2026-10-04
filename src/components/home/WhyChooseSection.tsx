import ProcessFlow from '../ProcessFlow';
import Reveal from '../Reveal';

const steps = [
  { title: 'Discover', description: 'Clarify the business goal, audience, requirements, existing systems and constraints.' },
  { title: 'Define', description: 'Turn the evidence into a focused scope, roadmap, architecture and measures.' },
  { title: 'Deliver', description: 'Coordinate design, development, implementation, quality checks and launch.' },
  { title: 'Improve', description: 'Use analytics, search insight and product feedback to guide the next iteration.' },
];

export default function WhyChooseSection() {
  return (
    <section className="section-space bg-white" aria-labelledby="process-title">
      <div className="site-container">
        <Reveal><div><span className="eyebrow">How we work</span><h2 id="process-title" className="max-w-2xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.08]">A clear path from question to continuous improvement.</h2></div></Reveal>
        <ProcessFlow steps={steps} />
      </div>
    </section>
  );
}
