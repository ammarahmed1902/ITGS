import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, TrendingUp } from "lucide-react";
import { heroFarmhouse } from "@/assets/hero-images";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading, CtaBand } from "@/components/site/CtaBand";
import { Newsletter } from "@/components/site/Newsletter";
import { newProjects } from "@/data/content";

export const Route = createFileRoute("/new-projects")({
  head: () => ({
    meta: [
      { title: "New Projects in Islamabad | Apna Islamabad Homes" },
      { name: "description", content: "Pre-launch and under-construction luxury projects across Islamabad from Pakistan's top developers." },
    ],
  }),
  component: NewProjectsPage,
});

function NewProjectsPage() {
  return (
    <>
      <PageHero
        image={heroFarmhouse}
        eyebrow="Off-Plan"
        title="New Projects"
        subtitle="Pre-launch and under-construction luxury developments from Islamabad's leading builders."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "New Projects" }]}
      />

      <section className="py-20">
        <div className="container-lux">
          <SectionHeading eyebrow="Launching Soon" title="Signature Developments" />
          <div className="grid gap-8 lg:grid-cols-2">
            {newProjects.map((p) => (
              <article key={p.id} className="card-lux overflow-hidden grid md:grid-cols-2">
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-6 flex flex-col">
                  <span className="badge-gold w-max">{p.status}</span>
                  <h3 className="mt-3 text-2xl font-display font-semibold text-navy">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">by {p.developer}</p>
                  <ul className="mt-4 space-y-2 text-sm text-navy/80">
                    <li className="flex items-center gap-2"><MapPin size={14} className="text-gold" />{p.location}</li>
                    <li className="flex items-center gap-2"><Calendar size={14} className="text-gold" />Handover {p.handover}</li>
                    <li className="flex items-center gap-2"><TrendingUp size={14} className="text-gold" />From {p.priceFrom}</li>
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.highlights.map((h) => <span key={h} className="text-[11px] px-2 py-1 rounded-full bg-surface border border-border">{h}</span>)}
                  </div>
                  <div className="mt-auto pt-6">
                    <a href="#" className="btn-gold">Request Brochure</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Get early access to off-market launches"
        subtitle="Our new-projects desk shares pre-launch pricing with clients first."
        primary={{ to: "/contact", label: "Join Early Access" }}
      />
      <Newsletter />
    </>
  );
}
