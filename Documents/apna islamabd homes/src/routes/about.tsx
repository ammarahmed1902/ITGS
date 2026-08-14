import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, Target, Heart } from "lucide-react";
import { heroPenthouse } from "@/assets/hero-images";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading, CtaBand } from "@/components/site/CtaBand";
import { Newsletter } from "@/components/site/Newsletter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Apna Islamabad Homes | Islamabad Real Estate" },
      { name: "description", content: "Islamabad's trusted luxury real estate agency since 2014. Meet the team, mission and values behind our verified listings." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        image={heroPenthouse}
        eyebrow="Our Story"
        title="Building trust in Islamabad real estate since 2014"
        subtitle="An independent, family-run agency that puts client interest ahead of transactions."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "About Us" }]}
      />

      <section className="py-24">
        <div className="container-lux grid gap-16 lg:grid-cols-2 items-center">
          <div>
            <p className="eyebrow">Who We Are</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-semibold text-navy leading-tight">A boutique real estate firm with a national reach</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">Founded in F-7 Markaz in 2014, Apna Islamabad Homes has grown into one of the capital's most trusted names in luxury real estate — serving Pakistani families, overseas investors and institutional buyers.</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">Every listing on our books is physically inspected and legally cleared. Every transaction is handled end-to-end by named consultants. And every client, regardless of budget, gets the same level of care.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["500+", "Properties Sold"],
              ["350+", "Happy Clients"],
              ["40+", "Consultants"],
              ["12+", "Years Trust"],
            ].map(([n, l]) => (
              <div key={l as string} className="p-8 rounded-2xl bg-surface text-center">
                <div className="text-4xl font-display font-semibold text-gold">{n}</div>
                <div className="mt-2 text-xs uppercase tracking-wider text-navy/60">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container-lux">
          <SectionHeading eyebrow="What Drives Us" title="Our Values" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              [Award, "Excellence", "White-glove service on every deal, regardless of size."],
              [Heart, "Client First", "Our reputation is built on repeat business, not first sales."],
              [Target, "Transparency", "Verified listings, clear fees, no surprises."],
              [Users, "Community", "Reinvesting in Islamabad through housing and education."],
            ].map(([Icon, title, desc]) => (
              <div key={title as string} className="p-7 rounded-2xl bg-white border border-border">
                <div className="grid place-items-center h-12 w-12 rounded-xl bg-gold/15 text-gold">{/* @ts-ignore */}<Icon size={22} /></div>
                <h3 className="mt-4 font-display font-semibold text-navy">{title as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's find your next address"
        subtitle="Book a private consultation with a senior consultant."
        primary={{ to: "/contact", label: "Book Consultation" }}
        secondary={{ to: "/agents", label: "Meet the Team" }}
      />
      <Newsletter />
    </>
  );
}
