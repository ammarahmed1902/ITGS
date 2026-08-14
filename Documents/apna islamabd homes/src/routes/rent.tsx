import { createFileRoute } from "@tanstack/react-router";
import { Sofa, PawPrint, Calendar, KeyRound, ShieldCheck, Scale } from "lucide-react";
import { heroVilla } from "@/assets/hero-images";
import { PageHero } from "@/components/site/PageHero";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SectionHeading, CtaBand } from "@/components/site/CtaBand";
import { Newsletter } from "@/components/site/Newsletter";
import { properties } from "@/data/properties";

export const Route = createFileRoute("/rent")({
  head: () => ({
    meta: [
      { title: "Rent Properties in Islamabad | Apna Islamabad Homes" },
      { name: "description", content: "Verified rental homes, furnished apartments and corporate lets across Islamabad — including F-7, E-11 and Blue Area." },
    ],
  }),
  component: RentPage,
});

function RentPage() {
  const items = properties.filter((p) => p.purpose === "rent");
  return (
    <>
      <PageHero
        image={heroVilla}
        eyebrow="For Rent"
        title="Rent Properties"
        subtitle="Access verified rental homes, furnished apartments and corporate lets across Islamabad."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Rent Properties" }]}
      />

      <section className="pt-16">
        <div className="container-lux">
          <div className="glass-panel rounded-2xl p-4 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                ["Location", ["Any", "F-7", "E-11", "DHA", "Bahria Town", "Gulberg Greens", "Blue Area"]],
                ["Monthly Rent", ["Any", "Under 100k", "100k–250k", "250k–500k", "500k+"]],
                ["Type", ["Any", "House", "Apartment", "Studio", "Villa"]],
                ["Beds", ["Any", "1+", "2+", "3+", "4+"]],
                ["Baths", ["Any", "1+", "2+", "3+"]],
                ["Furnishing", ["Any", "Furnished", "Semi", "Unfurnished"]],
              ].map(([label, opts]) => (
                <label key={label as string}>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-navy/60 mb-1.5 block">{label}</span>
                  <select className="input-lux text-sm appearance-none">{(opts as string[]).map((o) => <option key={o}>{o}</option>)}</select>
                </label>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Furnished", "Pet Friendly", "Immediate Move-in", "Parking Included"].map((t) => (
                <button key={t} className="px-4 py-1.5 rounded-full border border-border text-xs hover:border-gold hover:text-gold transition">{t}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-lux">
          <SectionHeading eyebrow="Featured Rentals" title="Handpicked Rental Homes" align="left" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container-lux">
          <SectionHeading eyebrow="Renting Made Simple" title="How Renting With Us Works" />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [Sofa, "Furnished or Not", "Choose from fully furnished, semi or unfurnished rentals."],
              [Calendar, "Flexible Terms", "Short-stay, monthly or annual leases with clear T&Cs."],
              [PawPrint, "Pet-Friendly Options", "Filter properties that welcome your family — including pets."],
              [KeyRound, "Move-In Support", "We handle handover, utilities and inventory checks."],
              [ShieldCheck, "Verified Landlords", "Every landlord and property vetted before listing."],
              [Scale, "Fair Contracts", "Standardised, tenant-friendly rental agreements."],
            ].map(([Icon, title, desc]) => (
              <div key={title as string} className="p-7 rounded-2xl bg-white border border-border">
                <div className="grid place-items-center h-12 w-12 rounded-xl bg-gold/15 text-gold">{/* @ts-ignore */}<Icon size={22} /></div>
                <h3 className="mt-5 font-display font-semibold text-navy">{title as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Renters Desk"
        title="Looking for the perfect rental?"
        subtitle="Tell us your budget and area — we'll send curated options within 24 hours."
        primary={{ to: "/contact", label: "Request Rental Match" }}
        secondary={{ to: "/agents", label: "Talk to an Agent" }}
      />
      <Newsletter title="Get New Rentals First" subtitle="Fresh rental listings, before they hit the market." />
    </>
  );
}
