import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { heroFarmhouse } from "@/assets/hero-images";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/CtaBand";
import { Newsletter } from "@/components/site/Newsletter";
import { blogPosts } from "@/data/content";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Islamabad Real Estate Blog | Apna Islamabad Homes" },
      { name: "description", content: "Market insights, buying guides and investment analysis for Islamabad real estate." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <>
      <PageHero
        image={heroFarmhouse}
        eyebrow="Insights"
        title="Blog & Market Insights"
        subtitle="Expert commentary on Islamabad's real estate market — trends, deals and guides."
        breadcrumbs={[{ to: "/", label: "Home" }, { label: "Blog" }]}
      />

      <section className="py-20">
        <div className="container-lux">
          <article className="card-lux grid lg:grid-cols-2 overflow-hidden">
            <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="badge-gold w-max">Featured</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-display font-semibold text-navy leading-tight">{featured.title}</h2>
              <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-4 text-xs text-muted-foreground">{featured.date} · {featured.readTime}</div>
              <a href="#" className="mt-6 btn-gold w-max">Read Article <ArrowRight size={14} /></a>
            </div>
          </article>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="container-lux">
          <SectionHeading eyebrow="All Articles" title="Latest Posts" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((b) => (
              <article key={b.slug} className="card-lux overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden"><img src={b.image} alt={b.title} loading="lazy" className="h-full w-full object-cover" /></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="badge-navy">{b.category}</span>
                    <span>{b.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-lg text-navy leading-snug">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
                  <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold">Read More <ArrowRight size={14} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Newsletter title="Get Weekly Market Insights" subtitle="Data-driven analysis from our research desk, every Friday." />
    </>
  );
}
