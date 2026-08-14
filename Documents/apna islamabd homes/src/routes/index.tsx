import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ChevronLeft, ChevronRight, ShieldCheck, Users, Scale, TrendingUp,
  HardHat, Headphones, Building2, Home, Warehouse, LandPlot, Trees, Landmark, Star, MapPin,
  Phone, Mail, Clock, ArrowRight
} from "lucide-react";
import { heroVilla, heroPenthouse, heroFarmhouse } from "@/assets/hero-images";
import { SearchPanel } from "@/components/site/SearchPanel";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SectionHeading, CtaBand } from "@/components/site/CtaBand";
import { Newsletter } from "@/components/site/Newsletter";
import { properties } from "@/data/properties";
import { agents } from "@/data/agents";
import { testimonials, blogPosts } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apna Islamabad Homes | Luxury Real Estate in Islamabad" },
      { name: "description", content: "Find your dream home in Islamabad. Verified luxury villas, apartments, plots and commercial properties across F-7, DHA, Bahria Town and Blue Area." },
    ],
  }),
  component: HomePage,
});

const SLIDES = [
  { image: heroVilla, eyebrow: "Islamabad · Est. 2014", title: "Find Your Dream Home in Islamabad", subtitle: "Buy, sell and invest in premium properties with Islamabad's most trusted experts." },
  { image: heroPenthouse, eyebrow: "The Skyline Collection", title: "Luxury Living Starts Here", subtitle: "Discover Islamabad's finest villas, penthouses and apartments — handpicked for discerning owners." },
  { image: heroFarmhouse, eyebrow: "Investment Advisory", title: "Smart Property Investment", subtitle: "Helping you build generational wealth through prime Islamabad real estate." },
];

function HomePage() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const featured = properties.filter((p) => p.featured && p.purpose === "buy").slice(0, 3);
  const latest = properties.slice(3, 6);

  return (
    <>
      {/* HERO SLIDER */}
      <section className="relative h-[70vh] min-h-[520px] max-h-[780px] w-full overflow-hidden">
        {SLIDES.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}>
            <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority={i === 0 ? "high" : "auto"} />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/50 to-navy/85" />
          </div>
        ))}
        <div className="container-lux relative h-full flex flex-col justify-center text-white">
          <p className="eyebrow" key={`e-${slide}`}>{SLIDES[slide].eyebrow}</p>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-semibold max-w-4xl leading-[1.02] text-white" key={`t-${slide}`}>{SLIDES[slide].title}</h1>
          <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl" key={`s-${slide}`}>{SLIDES[slide].subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/buy" className="btn-gold">Explore Properties</Link>
            <Link to="/contact" className="btn-outline-light">Talk to an Expert</Link>
          </div>
        </div>

        {/* controls */}
        <button aria-label="Previous slide" onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)} className="hidden md:grid absolute left-6 top-1/2 -translate-y-1/2 place-items-center h-12 w-12 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-gold hover:text-navy transition"><ChevronLeft size={22} /></button>
        <button aria-label="Next slide" onClick={() => setSlide((s) => (s + 1) % SLIDES.length)} className="hidden md:grid absolute right-6 top-1/2 -translate-y-1/2 place-items-center h-12 w-12 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-gold hover:text-navy transition"><ChevronRight size={22} /></button>

        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} aria-label={`Go to slide ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === slide ? "w-8 bg-gold" : "w-3 bg-white/50"}`} />
          ))}
        </div>
      </section>

      {/* SEARCH PANEL (floating) */}
      <SearchPanel floating />

      {/* FEATURED PROPERTIES */}
      <section className="py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="Handpicked" title="Featured Premium Properties" subtitle="A curated selection of Islamabad's most exceptional homes." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
          <div className="mt-10 text-center">
            <Link to="/buy" className="btn-outline-navy">View All Properties <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 bg-surface">
        <div className="container-lux">
          <SectionHeading eyebrow="Browse by Category" title="Explore Property Types" subtitle="From skyline penthouses to Margalla-view farmhouses." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Home, label: "Luxury Houses" },
              { icon: Building2, label: "Apartments" },
              { icon: Warehouse, label: "Commercial" },
              { icon: LandPlot, label: "Plots" },
              { icon: Trees, label: "Farm Houses" },
              { icon: Landmark, label: "Villas" },
            ].map(({ icon: Icon, label }) => (
              <Link key={label} to="/buy" className="group bg-white rounded-2xl p-6 text-center border border-border hover:border-gold hover:shadow-luxe transition">
                <div className="mx-auto grid place-items-center h-14 w-14 rounded-full bg-navy text-gold group-hover:bg-gold group-hover:text-navy transition">
                  <Icon size={22} />
                </div>
                <div className="mt-4 font-display font-semibold text-navy text-sm">{label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="Why Choose Us" title="A trusted partner for buying, selling and investing" subtitle="Every listing verified. Every deal handled end-to-end." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Verified Listings", desc: "Every property inspected, titled and legally cleared before listing." },
              { icon: Users, title: "Trusted Experts", desc: "Consultants with 10+ years each in Islamabad's prime sectors." },
              { icon: Scale, title: "Legal Assistance", desc: "In-house legal team handles transfer, taxation and documentation." },
              { icon: TrendingUp, title: "Investment Advice", desc: "Data-backed advisory on high-yield areas and emerging corridors." },
              { icon: HardHat, title: "Property Management", desc: "Full-service management for overseas Pakistanis and busy owners." },
              { icon: Headphones, title: "24/7 Customer Support", desc: "Dedicated relationship managers across time zones." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-7 rounded-2xl border border-border hover:border-gold hover:shadow-card transition bg-white">
                <div className="grid place-items-center h-12 w-12 rounded-xl bg-gold/15 text-gold"><Icon size={22} /></div>
                <h3 className="mt-5 font-display font-semibold text-lg text-navy">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST LISTINGS */}
      <section className="py-24 bg-surface">
        <div className="container-lux">
          <SectionHeading eyebrow="Just Added" title="Latest Property Listings" subtitle="Fresh off the market — reviewed and verified this week." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* MEET AGENTS */}
      <section className="py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="Our Team" title="Meet Our Expert Agents" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents.slice(0, 3).map((a) => (
              <div key={a.id} className="card-lux p-6 text-center">
                <img src={a.photo} alt={a.name} className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-gold/20" />
                <h3 className="mt-5 font-display font-semibold text-lg text-navy">{a.name}</h3>
                <p className="text-sm text-gold font-medium">{a.title}</p>
                <div className="mt-4 flex justify-center gap-4 text-xs text-muted-foreground">
                  <span>{a.experience}</span><span className="text-navy/20">·</span><span>{a.stat}</span>
                </div>
                <div className="mt-6 flex justify-center gap-2">
                  <a href={`tel:${a.phone}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy text-white text-xs font-medium hover:bg-navy-soft transition"><Phone size={12} />Call</a>
                  <a href={`https://wa.me/${a.whatsapp.replace(/\D/g, "")}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold text-navy text-xs font-medium hover:brightness-105 transition">WhatsApp</a>
                  <Link to="/agents" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-navy text-xs font-medium hover:border-gold transition">Profile</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-20 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--gold),transparent_60%)]" />
        <div className="container-lux relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["500+", "Properties Sold"],
            ["350+", "Happy Clients"],
            ["40+", "Professional Agents"],
            ["12+", "Years Experience"],
          ].map(([n, l]) => (
            <div key={l as string}>
              <div className="text-5xl md:text-6xl font-display font-semibold text-gold">{n}</div>
              <div className="mt-2 text-sm tracking-wider text-white/70 uppercase">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="Client Stories" title="What Our Clients Say" />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="p-8 rounded-2xl bg-surface border border-border">
                <div className="flex text-gold">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}</div>
                <p className="mt-5 text-navy/85 leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="font-display font-semibold text-navy">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-24 bg-surface">
        <div className="container-lux">
          <SectionHeading eyebrow="Insights" title="Latest from the Blog" />
          <div className="grid gap-6 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((b) => (
              <article key={b.slug} className="card-lux overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={b.image} alt={b.title} loading="lazy" className="h-full w-full object-cover hover:scale-105 transition duration-700" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="badge-navy">{b.category}</span>
                    <span>{b.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-lg text-navy leading-snug">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
                  <Link to="/blog" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold transition">Read More <ArrowRight size={14} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to Find Your Dream Property?"
        subtitle="Explore Islamabad's finest real estate opportunities with trusted experts guiding every step."
        primary={{ to: "/buy", label: "Explore Properties" }}
        secondary={{ to: "/contact", label: "Contact Us" }}
      />

      {/* OFFICE */}
      <section className="py-24">
        <div className="container-lux grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="eyebrow">Visit Us</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-semibold text-navy">Our Islamabad Office</h2>
            <p className="mt-3 text-muted-foreground max-w-md">Walk into our F-7 Markaz office for a private consultation over espresso.</p>
            <ul className="mt-6 space-y-3 text-sm text-navy/80">
              <li className="flex items-start gap-3"><MapPin size={18} className="text-gold mt-0.5" />Office No. 12, F-7 Markaz, Islamabad, Pakistan</li>
              <li className="flex items-center gap-3"><Phone size={18} className="text-gold" />+92 330 2748777</li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-gold" />info@apnaislamabadhomes.com</li>
              <li className="flex items-center gap-3"><Clock size={18} className="text-gold" />Mon–Sat · 9 AM – 7 PM</li>
            </ul>
            <a href="https://maps.google.com/?q=F-7+Markaz+Islamabad" target="_blank" rel="noreferrer" className="btn-gold mt-8">Get Directions</a>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-luxe aspect-[4/3]">
            <iframe
              title="Office location"
              src="https://www.google.com/maps?q=F-7+Markaz+Islamabad&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
