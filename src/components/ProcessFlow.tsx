import { ClipboardList, Code2, Compass, Flag, Gauge, Layers3, Lightbulb, Link2, PackageCheck, PenTool, Rocket, Search, Settings2, Target, type LucideIcon } from 'lucide-react';
import IconBadge from './IconBadge';
import Reveal from './Reveal';

export type ProcessStep = { title: string; description: string };

function iconForStep(title: string): LucideIcon {
  const name = title.toLowerCase();
  if (/discover|research|audit|profil|sourc/.test(name)) return Search;
  if (/defin|strateg|architect|wirefram|funnel|concept|matching/.test(name)) return Target;
  if (/plan|setup|onboard|keyword/.test(name)) return ClipboardList;
  if (/visual design|^design$/.test(name)) return PenTool;
  if (/develop|build|execut|integrat|design|on-page/.test(name)) return Code2;
  if (/test|optim|report|improv|scal/.test(name)) return Gauge;
  if (/authorit/.test(name)) return Link2;
  if (/deliver|deploy|launch|app store/.test(name)) return Rocket;
  if (/traffic|nurtur/.test(name)) return Compass;
  if (/prototyp/.test(name)) return Layers3;
  if (/visual/.test(name)) return Lightbulb;
  if (/complete|handover/.test(name)) return PackageCheck;
  if (/configur/.test(name)) return Settings2;
  return Flag;
}

export default function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="process-flow mt-10 grid gap-4 md:grid-cols-4" aria-label="Process stages">
      {steps.map(({ title, description }, index) => {
        const Icon = iconForStep(title);
        return (
          <li key={`${title}-${index}`} className="process-step relative min-w-0">
            <Reveal delay={index * 0.08}>
              <article className="interactive-card h-full rounded-xl border border-border bg-white p-6 md:p-7">
                <div className="flex items-center justify-between gap-3">
                  <IconBadge><Icon size={28} strokeWidth={1.8} /></IconBadge>
                  <span className="text-xs font-semibold tracking-[.12em] text-electric">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-6">{description}</p>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
