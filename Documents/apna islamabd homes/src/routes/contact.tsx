import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { heroVilla } from "@/assets/hero-images";
import { PageHero } from "@/components/site/PageHero";
import { Newsletter } from "@/components/site/Newsletter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Apna Islamabad Homes | Real Estate Islamabad" },
      { name: "description", content: "Reach our F-7 Markaz office in Islamabad. Call, WhatsApp or send us a message — we respond within one business day." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        image={heroVilla}
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="Speak to a senior consultant, book a viewing, or drop into our F-7 Markaz office."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Contact" }]}
      />

      <section className="py-20">
        <div className="container-lux grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3 p-8 md:p-10 rounded-2xl bg-white border border-border shadow-card">
            <h2 className="text-2xl font-display font-semibold text-navy">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">We respond within one business day.</p>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-8 grid gap-4 md:grid-cols-2">
              <label className="block md:col-span-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1.5 block">Full name</span>
                <input required className="input-lux" placeholder="Ali Khan" />
              </label>
              <label className="block md:col-span-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1.5 block">Phone</span>
                <input required className="input-lux" placeholder="+92 300 0000000" />
              </label>
              <label className="block md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1.5 block">Email</span>
                <input type="email" required className="input-lux" placeholder="you@email.com" />
              </label>
              <label className="block md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1.5 block">Interested in</span>
                <select className="input-lux appearance-none"><option>Buying</option><option>Renting</option><option>Selling / Listing</option><option>Commercial</option><option>Investment Advisory</option></select>
              </label>
              <label className="block md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1.5 block">Message</span>
                <textarea required rows={5} className="input-lux" placeholder="Tell us about your requirements..." />
              </label>
              <div className="md:col-span-2">
                <button type="submit" className="btn-gold">
                  {sent ? <><Check size={16} /> Message Sent</> : <><Send size={16} /> Send Message</>}
                </button>
              </div>
            </form>
          </div>

          {/* Info */}
          <aside className="lg:col-span-2 space-y-4">
            {[
              [MapPin, "Office", "Office No. 12, F-7 Markaz, Islamabad, Pakistan"],
              [Phone, "Phone", "+92 330 2748777"],
              [Mail, "Email", "info@apnaislamabadhomes.com"],
              [Clock, "Hours", "Mon–Sat · 9 AM – 7 PM"],
            ].map(([Icon, label, val]) => (
              <div key={label as string} className="p-6 rounded-2xl bg-surface border border-border flex items-start gap-4">
                <div className="grid place-items-center h-11 w-11 rounded-xl bg-navy text-gold shrink-0">{/* @ts-ignore */}<Icon size={18} /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-navy/60 font-semibold">{label as string}</div>
                  <div className="mt-1 text-navy">{val as string}</div>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-lux">
          <div className="rounded-2xl overflow-hidden shadow-luxe aspect-[16/7]">
            <iframe
              title="Office map"
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
