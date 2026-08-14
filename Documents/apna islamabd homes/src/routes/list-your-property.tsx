import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Check, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { heroFarmhouse } from "@/assets/hero-images";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/CtaBand";

export const Route = createFileRoute("/list-your-property")({
  head: () => ({
    meta: [
      { title: "List Your Property | Apna Islamabad Homes" },
      { name: "description", content: "Sell or rent your property faster. List with Islamabad's most trusted real estate agency and reach qualified buyers." },
    ],
  }),
  component: ListPage,
});

function ListPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        image={heroFarmhouse}
        eyebrow="Owners & Landlords"
        title="List Your Property"
        subtitle="Reach vetted buyers and tenants across Islamabad and the Pakistani diaspora."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "List Your Property" }]}
      />

      <section className="py-20">
        <div className="container-lux grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Why List With Us" title="More reach. Fewer time-wasters." align="left" />
            <ul className="space-y-4">
              {[
                [ShieldCheck, "Verified-Only Marketplace", "Your listing appears alongside pre-screened peers — no clutter."],
                [Users, "Vetted Buyer Pool", "Direct access to our network of buyers and overseas investors."],
                [TrendingUp, "Data-Driven Pricing", "Get an independent valuation before you list."],
              ].map(([Icon, t, d]) => (
                <li key={t as string} className="flex gap-4">
                  <div className="grid place-items-center h-11 w-11 rounded-xl bg-gold/15 text-gold shrink-0">{/* @ts-ignore */}<Icon size={18} /></div>
                  <div>
                    <div className="font-display font-semibold text-navy">{t as string}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{d as string}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 p-8 md:p-10 rounded-2xl bg-white border border-border shadow-card">
            <h2 className="text-2xl font-display font-semibold text-navy">Property details</h2>
            <p className="mt-2 text-sm text-muted-foreground">A consultant will contact you within 24 hours to schedule a valuation.</p>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-8 grid gap-4 md:grid-cols-2">
              <Input label="Owner name" required />
              <Input label="Phone" required placeholder="+92 300 0000000" />
              <Input label="Email" type="email" required />
              <Select label="Purpose" opts={["For Sale", "For Rent"]} />
              <Select label="Property type" opts={["House", "Villa", "Apartment", "Penthouse", "Plot", "Farmhouse", "Office", "Shop", "Plaza"]} />
              <Input label="Location / Sector" placeholder="e.g. DHA Phase II" required />
              <Input label="Area" placeholder="e.g. 1 Kanal" required />
              <Input label="Expected price (PKR)" required />
              <Input label="Bedrooms" full={false} />
              <Input label="Bathrooms" full={false} />
              <label className="block md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1.5 block">Description</span>
                <textarea rows={4} className="input-lux" placeholder="Key features, condition, amenities..." />
              </label>
              <div className="md:col-span-2 rounded-xl border-2 border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                <Upload size={22} className="mx-auto text-gold" />
                <div className="mt-2">Drag photos here or <span className="text-navy font-semibold underline">browse</span></div>
                <div className="text-xs mt-1">Up to 20 images · JPG or PNG</div>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="btn-gold">
                  {sent ? <><Check size={16} /> Submitted — we'll be in touch</> : "Submit Listing Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Input({ label, type = "text", required, placeholder, full = true }: { label: string; type?: string; required?: boolean; placeholder?: string; full?: boolean }) {
  return (
    <label className={`block ${full ? "" : "md:col-span-1"}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1.5 block">{label}</span>
      <input type={type} required={required} placeholder={placeholder} className="input-lux" />
    </label>
  );
}
function Select({ label, opts }: { label: string; opts: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1.5 block">{label}</span>
      <select className="input-lux appearance-none">{opts.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  );
}
