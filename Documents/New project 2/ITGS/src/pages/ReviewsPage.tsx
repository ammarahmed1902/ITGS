import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import { TESTIMONIALS } from '../data/testimonials';
import { ROUTES } from '../config/site';

const ReviewsPage = () => (
  <>
    <PageMeta title="Client Reviews" description="What enterprise clients say about working with ITGS." path={ROUTES.reviews} />
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          eyebrow="Testimonials"
          title="What Our Clients Say"
          description="Trusted by leaders across logistics, fintech, and enterprise SaaS."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((r) => (
            <article key={r.name} className="card-premium h-full flex flex-col">
              <div className="text-electric mb-4" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => <span key={i} aria-hidden="true">★</span>)}
              </div>
              <p className="text-steel/80 italic leading-relaxed mb-6 flex-grow">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-4 pt-4 border-t border-midnight/10">
                <div className="w-12 h-12 rounded-full bg-electric/10 flex items-center justify-center text-electric font-bold" aria-hidden="true">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-bold text-midnight">{r.name}</div>
                  <div className="text-steel text-xs uppercase tracking-widest">{r.role}, {r.company}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center">
          <Link to={ROUTES.contact} className="btn-primary px-10 py-4">Start Your Project</Link>
        </div>
      </div>
    </div>
  </>
);

export default ReviewsPage;
