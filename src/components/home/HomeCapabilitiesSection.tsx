import { ArrowRight, ArrowUpRight, Blocks, ChartNoAxesCombined, Code2, LayoutTemplate, Search, Settings2, ShoppingBag, Smartphone, Target } from 'lucide-react';
import { SERVICES_DATA } from '../../constants';
import { pathForPage, servicePath, trackSiteEvent } from '../../lib/siteNavigation';
import Reveal from '../Reveal';

const serviceGroups = [
  { number: '01', title: 'Build', description: 'Create your digital presence.', icon: Blocks, ids: ['web-development', 'mobile-development', 'ui-ux-design', 'graphic-design'] },
  { number: '02', title: 'Reach', description: 'Connect with your next customers.', icon: ChartNoAxesCombined, ids: ['digital-marketing', 'seo', 'lead-generation'] },
  { number: '03', title: 'Operate', description: 'Support the work behind your business.', icon: Settings2, ids: ['e-commerce', 'virtual-assistance'] },
];

const outcomes = [
  { title: 'Launch a digital product', copy: 'Move from a defined opportunity to a usable web or mobile product.', solution: 'launch-digital-product', icon: Code2 },
  { title: 'Modernize an existing product', copy: 'Clarify user journeys and improve an existing website or application.', solution: 'modernize-product', icon: LayoutTemplate },
  { title: 'Improve organic visibility', copy: 'Strengthen technical foundations, intent-led architecture and useful discovery paths.', solution: 'improve-organic-visibility', icon: Search },
  { title: 'Generate qualified demand', copy: 'Connect audience, acquisition, conversion and qualification around useful opportunities.', solution: 'generate-qualified-demand', icon: Target },
  { title: 'Strengthen online commerce', copy: 'Connect storefront experience, marketplace needs and day-to-day operations.', solution: 'strengthen-online-commerce', icon: ShoppingBag },
  { title: 'Improve digital operations', copy: 'Clarify recurring work and decide what should be delegated, improved or automated.', solution: 'improve-digital-operations', icon: Smartphone },
];

export default function HomeCapabilitiesSection({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <section className="svc-section svc-merge section-space text-white" aria-labelledby="capabilities-title">
      <div className="site-container">
        <Reveal>
          <div className="svc-merge__lead">
            <span className="eyebrow text-sky">Capabilities</span>
            <h2 id="capabilities-title" className="text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.08] text-white">
              Two ways into the same connected team.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Begin with a service, or with the change you need. Both paths share the same ITGS model.
            </p>
          </div>
        </Reveal>

        <div id="services" className="svc-chapter scroll-mt-28" aria-labelledby="services-title">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <span className="eyebrow text-sky">01  ·  What we do</span>
                <h3 id="services-title" className="max-w-xl text-[clamp(1.85rem,3.6vw,2.85rem)] leading-[1.08] text-white">Connected expertise for every stage of growth.</h3>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-white/70 lg:justify-self-end">Start with one need. See how our connected services can help you move from idea to delivery.</p>
            </div>
          </Reveal>
          <div className="mt-10">
            {serviceGroups.map((group) => (
              <div key={group.title} className="svc-group">
                <span className="text-xs font-semibold text-sky/80">{group.number}</span>
                <div>
                  <h4 className="text-2xl text-white">{group.title}</h4>
                  <p className="mt-2 text-sm text-white/60">{group.description}</p>
                </div>
                <div className="grid gap-x-8 sm:grid-cols-2">
                  {group.ids.map((id) => {
                    const service = SERVICES_DATA.find((item) => item.id === id);
                    if (!service) return null;
                    return (
                      <a
                        key={id}
                        href={servicePath(id)}
                        onClick={(event) => { event.preventDefault(); trackSiteEvent('service_page_click', { service: id, location: 'homepage_services' }); setActivePage(`Service:${id}`); }}
                        className="flex min-h-12 items-center justify-between text-left text-[15px] font-medium text-white/90 hover:text-sky"
                      >
                        {service.title} <ArrowUpRight size={17} />
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <a href={pathForPage('Services')} onClick={(event) => { event.preventDefault(); setActivePage('Services'); }} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky hover:text-white">
            Explore all services <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="svc-bridge">
          <span className="svc-bridge__spine" aria-hidden="true" />
          <p className="svc-bridge__chip">Already know the outcome? Start there.</p>
        </div>

        <div id="solutions" className="svc-chapter scroll-mt-28" aria-labelledby="solutions-title">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <span className="eyebrow text-sky">02  ·  Start with the objective</span>
                <h3 id="solutions-title" className="max-w-xl text-[clamp(1.85rem,3.6vw,2.85rem)] leading-[1.08] text-white">What are you trying to achieve?</h3>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-white/70 lg:justify-self-end">Find a practical starting point based on the change you need to make, then connect it to the right ITGS capability.</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {outcomes.map(({ title, copy, solution, icon: Icon }, index) => (
              <article key={title} className="svc-outcome">
                <div className="flex items-center justify-between">
                  <Icon className="text-sky" size={22} strokeWidth={1.7} aria-hidden="true" />
                  <span className="text-xs font-medium text-white/45">0{index + 1}</span>
                </div>
                <h4 className="mt-6 text-xl leading-7 text-white">{title}</h4>
                <p className="mt-3 flex-1 text-sm leading-6 text-white/65">{copy}</p>
                <a
                  href={`${pathForPage('Solutions')}#${solution}`}
                  onClick={(event) => { event.preventDefault(); trackSiteEvent('solution_path_click', { solution }); setActivePage('Solutions'); }}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky hover:text-white"
                >
                  Explore solution <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
          <a href={pathForPage('Solutions')} onClick={(event) => { event.preventDefault(); setActivePage('Solutions'); }} className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky hover:text-white">
            Explore all solutions <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
