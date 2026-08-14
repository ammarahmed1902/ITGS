import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal, Grid3x3, List, ShieldCheck, Wallet, Scale, TrendingUp, Home as HomeIcon, ClipboardCheck, ArrowRight, Star } from "lucide-react";
import { heroPenthouse } from "@/assets/hero-images";
import { PageHero } from "@/components/site/PageHero";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SectionHeading, CtaBand } from "@/components/site/CtaBand";
import { Newsletter } from "@/components/site/Newsletter";
import { properties } from "@/data/properties";
import { agents } from "@/data/agents";
import { testimonials } from "@/data/content";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy Luxury Properties in Islamabad | Apna Islamabad Homes" },
      { name: "description", content: "Browse verified luxury villas, penthouses, apartments and plots for sale in Islamabad — F-7, DHA, Bahria Town, Blue Area and more." },
      { property: "og:title", content: "Buy Properties in Islamabad" },
      { property: "og:description", content: "Verified luxury properties for sale across Islamabad's prime sectors." },
    ],
  }),
  component: BuyPage,
});

const SORTS = ["Newest", "Price: Low → High", "Price: High → Low", "Largest Area", "Luxury Collection"] as const;

function BuyPage() {
  const [sort, setSort] = useState<typeof SORTS[number]>("Newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const items = useMemo(() => {
    const list = properties.filter((p) => p.purpose === "buy");
    if (sort === "Price: Low → High") return [...list].sort((a, b) => (a.priceValue ?? 0) - (b.priceValue ?? 0));
    if (sort === "Price: High → Low") return [...list].sort((a, b) => (b.priceValue ?? 0) - (a.priceValue ?? 0));
    return list;
  }, [sort]);

  return (
    <>
      <PageHero
        image={heroPenthouse}
        eyebrow="For Sale"
        title="Buy Properties"
        subtitle="Browse verified luxury homes, apartments, plots and commercial properties in Islamabad."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Buy Properties" }]}
      />

      {/* Filters */}
      <section className="pt-16">
        <div className="container-lux">
          <div className="glass-panel rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-navy font-semibold"><SlidersHorizontal size={16} className="text-gold" /> Advanced Filters</div>
              <button onClick={() => setShowFilters((v) => !v)} className="text-xs text-navy/60 hover:text-navy">{showFilters ? "Hide" : "Show"} all filters</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                ["City", ["Islamabad"]],
                ["Area", ["F-6", "F-7", "F-8", "DHA", "Bahria Town", "Gulberg"]],
                ["Type", ["House", "Apartment", "Penthouse", "Plot", "Farmhouse", "Office"]],
                ["Bedrooms", ["1+", "2+", "3+", "4+", "5+"]],
                ["Baths", ["1+", "2+", "3+", "4+"]],
                ["Area Size", ["5 Marla", "10 Marla", "1 Kanal", "2 Kanal"]],
              ].map(([label, opts]) => (
                <label key={label as string} className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-navy/60 mb-1.5 block">{label}</span>
                  <select className="input-lux appearance-none text-sm"><option>Any</option>{(opts as string[]).map((o) => <option key={o}>{o}</option>)}</select>
                </label>
              ))}
            </div>
            {showFilters && (
              <div className="mt-5 pt-5 border-t border-border">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy/60">Price Range (PKR)</div>
                <input type="range" min={1} max={100} defaultValue={50} className="w-full accent-[color:var(--gold)]" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>1 Cr</span><span>100 Cr</span></div>
                <div className="mt-6 mb-3 text-xs font-semibold uppercase tracking-wider text-navy/60">Amenities</div>
                <div className="flex flex-wrap gap-2">
                  {["Swimming Pool", "Garden", "Servant Quarter", "Basement", "Solar", "Parking", "Security", "Gym", "Elevator"].map((a) => (
                    <label key={a} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-xs cursor-pointer hover:border-gold">
                      <input type="checkbox" className="accent-[color:var(--gold)]" /> {a}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-5 flex gap-3">
              <button className="btn-gold"><Filter size={15} /> Apply Filters</button>
              <button className="btn-outline-navy">Reset</button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container-lux">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <p className="text-sm text-muted-foreground">Showing <span className="font-semibold text-navy">{items.length}</span> verified properties</p>
            <div className="flex items-center gap-3">
              <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="input-lux text-sm w-auto py-2">
                {SORTS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <div className="flex rounded-full border border-border p-1">
                <button aria-pressed={view === "grid"} onClick={() => setView("grid")} className={`grid place-items-center h-8 w-8 rounded-full transition ${view === "grid" ? "bg-navy text-white" : "text-navy/50"}`}><Grid3x3 size={14} /></button>
                <button aria-pressed={view === "list"} onClick={() => setView("list")} className={`grid place-items-center h-8 w-8 rounded-full transition ${view === "list" ? "bg-navy text-white" : "text-navy/50"}`}><List size={14} /></button>
              </div>
            </div>
          </div>

          <div className={view === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "grid gap-6"}>
            {items.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>

          <div className="mt-12 text-center">
            <button className="btn-outline-navy">Load More Properties</button>
          </div>
        </div>
      </section>

      {/* Investment opportunities */}
      <section className="py-20 bg-surface">
        <div className="container-lux">
          <SectionHeading eyebrow="Investment" title="Featured Investment Opportunities" />
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { title: "Luxury Villas in DHA", roi: "12%", from: "PKR 7 Cr", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80" },
              { title: "Commercial Shops, Blue Area", roi: "15%", from: "PKR 4 Cr", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" },
              { title: "Apartments, Gulberg Greens", roi: "10%", from: "PKR 3 Cr", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80" },
            ].map((c) => (
              <div key={c.title} className="card-lux overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden"><img src={c.img} alt={c.title} loading="lazy" className="h-full w-full object-cover" /></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3"><span className="badge-gold">ROI {c.roi}</span><span className="text-xs text-muted-foreground">from {c.from}</span></div>
                  <h3 className="font-display font-semibold text-lg text-navy">{c.title}</h3>
                  <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold">Explore Investment <ArrowRight size={14} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why buy */}
      <section className="py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="Why Buy With Us" title="A safer, smarter way to buy" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              [ShieldCheck, "Verified Listings", "Every title, every inspection — checked."],
              [Wallet, "No Hidden Charges", "Transparent fees and clear paperwork."],
              [Scale, "Legal Documentation", "In-house lawyers handle transfer end-to-end."],
              [TrendingUp, "Investment Consultancy", "Data-backed advisory for high-yield areas."],
              [HomeIcon, "Home Loan Assistance", "Partnered with leading Pakistani banks."],
              [ClipboardCheck, "Property Evaluation", "Independent valuation before you commit."],
            ].map(([Icon, title, desc]) => (
              <div key={title as string} className="p-7 rounded-2xl bg-white border border-border hover:border-gold hover:shadow-card transition">
                <div className="grid place-items-center h-12 w-12 rounded-xl bg-gold/15 text-gold">{/* @ts-ignore */}<Icon size={22} /></div>
                <h3 className="mt-5 font-display font-semibold text-lg text-navy">{title as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultants */}
      <section className="py-24 bg-surface">
        <div className="container-lux">
          <SectionHeading eyebrow="Our Team" title="Meet Our Buying Consultants" />
          <div className="grid gap-6 md:grid-cols-3">
            {agents.slice(0, 3).map((a) => (
              <div key={a.id} className="card-lux p-6 text-center">
                <img src={a.photo} alt={a.name} className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-gold/20" />
                <h3 className="mt-4 font-display font-semibold text-navy">{a.name}</h3>
                <p className="text-sm text-gold">{a.title}</p>
                <p className="mt-3 text-xs text-muted-foreground">{a.experience} · {a.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buying guide */}
      <section className="py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="Guides" title="Buying Guide" />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "How to Buy Property in Islamabad",
              "Property Verification Checklist",
              "Investment Tips for First-Time Buyers",
            ].map((t) => (
              <div key={t} className="p-8 rounded-2xl bg-surface border border-border hover:border-gold transition">
                <span className="badge-navy">Guide</span>
                <h3 className="mt-4 font-display font-semibold text-lg text-navy">{t}</h3>
                <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold">Read Guide <ArrowRight size={14} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-surface">
        <div className="container-lux">
          <SectionHeading eyebrow="Client Stories" title="Trusted by Buyers Across Islamabad" />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="p-8 rounded-2xl bg-white border border-border">
                <div className="flex text-gold">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}</div>
                <p className="mt-4 text-navy/85">"{t.quote}"</p>
                <div className="mt-5 pt-5 border-t border-border"><div className="font-semibold text-navy">{t.name}</div><div className="text-xs text-muted-foreground">{t.location}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Personal Search"
        title="Can't Find the Right Property?"
        subtitle="Let our experts find the perfect property based on your requirements."
        primary={{ to: "/contact", label: "Talk to an Expert" }}
        secondary={{ to: "/contact", label: "Request a Callback" }}
      />
      <Newsletter title="Stay Updated with New Property Listings" subtitle="Get freshly listed properties matched to your criteria." />
    </>
  );
}
