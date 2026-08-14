import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Building2, Store, Briefcase, ShieldCheck, LineChart } from "lucide-react";
import { heroPenthouse } from "@/assets/hero-images";
import { PageHero } from "@/components/site/PageHero";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SectionHeading, CtaBand } from "@/components/site/CtaBand";
import { Newsletter } from "@/components/site/Newsletter";
import { properties } from "@/data/properties";

export const Route = createFileRoute("/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial Property in Islamabad | Apna Islamabad Homes" },
      { name: "description", content: "Grade-A commercial plazas, offices and retail spaces in Blue Area, F-10 and I-8 with verified rental income data." },
    ],
  }),
  component: CommercialPage,
});

function CommercialPage() {
  const items = properties.filter((p) => p.purpose === "commercial");
  return (
    <>
      <PageHero
        image={heroPenthouse}
        eyebrow="Commercial"
        title="Commercial Properties"
        subtitle="Invest in Islamabad's most prestigious commercial addresses — plazas, offices and prime retail."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Commercial" }]}
      />

      <section className="py-20">
        <div className="container-lux">
          <SectionHeading eyebrow="Featured Commercial" title="Prime Commercial Opportunities" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container-lux">
          <SectionHeading eyebrow="Sectors We Cover" title="Commercial Categories" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              [Building2, "Office Floors"],
              [Store, "Retail Shops"],
              [Briefcase, "Coworking Spaces"],
              [TrendingUp, "Whole Plazas"],
            ].map(([Icon, label]) => (
              <div key={label as string} className="p-7 rounded-2xl bg-white border border-border text-center hover:border-gold hover:shadow-card transition">
                <div className="mx-auto grid place-items-center h-14 w-14 rounded-full bg-navy text-gold">{/* @ts-ignore */}<Icon size={22} /></div>
                <h3 className="mt-4 font-display font-semibold text-navy">{label as string}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="Why Us" title="Institutional-Grade Commercial Advisory" />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [LineChart, "ROI Modelling", "Every listing comes with an independent yield projection."],
              [ShieldCheck, "Due Diligence", "Legal, structural and rental-income verification before purchase."],
              [Briefcase, "Corporate Tenants", "Access to our network of MNCs and local corporates."],
            ].map(([Icon, t, d]) => (
              <div key={t as string} className="p-7 rounded-2xl border border-border">
                <div className="grid place-items-center h-12 w-12 rounded-xl bg-gold/15 text-gold">{/* @ts-ignore */}<Icon size={22} /></div>
                <h3 className="mt-4 font-display font-semibold text-navy">{t as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Building your commercial portfolio?"
        subtitle="Speak to our commercial desk about off-market plazas and Grade-A offices."
        primary={{ to: "/contact", label: "Book a Consultation" }}
      />
      <Newsletter />
    </>
  );
}
