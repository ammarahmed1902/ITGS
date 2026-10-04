export default function TestimonialsSection() {
  return (
    <section className="section-space bg-starfield">
      <div className="site-container grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <span className="eyebrow">Built for clarity</span>
          <h2 className="text-[clamp(2rem,4vw,3.1rem)] leading-[1.08]">No inflated promises. Just a clear view of the work.</h2>
        </div>
        <div className="card p-7 md:p-10">
          <p className="text-xl leading-9 text-ink">The strongest proof is specific: the challenge, what was delivered and the result. ITGS case studies and testimonials will appear here once each claim and attribution is approved.</p>
          <p className="mt-6 text-sm leading-6">Until then, the site stays complete without invented client logos, anonymous quotes or unsupported numbers.</p>
        </div>
      </div>
    </section>
  );
}
