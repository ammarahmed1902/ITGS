import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { heroVilla } from "@/assets/hero-images";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { Newsletter } from "@/components/site/Newsletter";
import { agents } from "@/data/agents";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Our Agents | Apna Islamabad Homes" },
      { name: "description", content: "Meet Islamabad's most trusted real estate consultants — luxury homes, investment, commercial and rentals." },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <>
      <PageHero
        image={heroVilla}
        eyebrow="Expert Team"
        title="Meet Our Agents"
        subtitle="A hand-picked team of consultants with deep expertise across Islamabad's prime sectors."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Agents" }]}
      />

      <section className="py-20">
        <div className="container-lux grid gap-8 md:grid-cols-2">
          {agents.map((a) => (
            <article key={a.id} className="card-lux grid grid-cols-3 overflow-hidden">
              <div className="col-span-1">
                <img src={a.photo} alt={a.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="col-span-2 p-6 flex flex-col">
                <h3 className="text-xl font-display font-semibold text-navy">{a.name}</h3>
                <p className="text-sm text-gold font-medium">{a.title}</p>
                <p className="mt-3 text-sm text-muted-foreground">{a.bio}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {a.specialties.map((s) => <span key={s} className="text-[11px] px-2 py-1 rounded-full bg-surface border border-border">{s}</span>)}
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>{a.experience}</span><span>·</span><span>{a.stat}</span>
                </div>
                <div className="mt-auto pt-5 flex flex-wrap gap-2">
                  <a href={`tel:${a.phone}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy text-white text-xs"><Phone size={12} />Call</a>
                  <a href={`https://wa.me/${a.whatsapp.replace(/\D/g, "")}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold text-navy text-xs"><MessageCircle size={12} />WhatsApp</a>
                  <Link to="/contact" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-navy text-xs">Contact <ArrowRight size={12} /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Want to join our team?"
        subtitle="We're always looking for high-performing consultants who share our standards."
        primary={{ to: "/contact", label: "Apply Now" }}
      />
      <Newsletter />
    </>
  );
}
