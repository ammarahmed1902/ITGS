import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { JobPost } from '../domain/entities/JobPost';
import { isJobAcceptingApplications } from '../utils/jobUtils';
import PageMeta from '../components/PageMeta';
import StructuredData from '../components/StructuredData';
import { ROUTES, SITE } from '../config/site';

const JobDetailPage = ({ jobs }: { jobs: JobPost[] }) => {
  const { jobId } = useParams<{ jobId: string }>();
  const job = jobs.find((item) => item.id === jobId);
  const canApply = job ? isJobAcceptingApplications(job) : false;

  if (!job) {
    return (
      <>
        <PageMeta title="Job Not Found" noIndex path={`/careers/${jobId}`} />
        <div className="pt-32 pb-24 bg-starfield min-h-screen">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-extrabold mb-4">Job Not Found</h1>
            <p className="text-steel mb-10">The role you are looking for is unavailable.</p>
            <Link to={ROUTES.careers} className="btn-primary px-10 py-4">Back to Careers</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta title={job.metaTitle || job.title} description={job.metaDescription || job.description} path={ROUTES.job(job.id)} />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: job.title,
          description: job.description,
          datePosted: job.postedAt,
          validThrough: job.deadline,
          employmentType: job.jobType,
          hiringOrganization: {
            '@type': 'Organization',
            name: SITE.name,
            sameAs: SITE.social.website,
          },
          jobLocation: {
            '@type': 'Place',
            address: job.location,
          },
        }}
      />
      <div className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <Link to={ROUTES.careers} className="inline-flex items-center gap-2 text-steel text-sm mb-10 hover:text-electric transition-colors">
            <ArrowRight size={14} className="rotate-180" aria-hidden="true" /> Back to Careers
          </Link>
          <div className="grid lg:grid-cols-[1.4fr_0.7fr] gap-12 items-start">
            <div className="space-y-8">
              <div className="rounded-[2rem] overflow-hidden shadow-xl">
                <img src={job.image} alt={job.title} loading="lazy" className="w-full h-64 md:h-80 object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-full bg-electric/10 text-electric text-xs font-bold uppercase tracking-widest">{job.jobType}</span>
                  <span className="px-4 py-2 rounded-full bg-white border border-midnight/10 text-steel text-xs font-bold uppercase tracking-widest">{job.status}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold">{job.title}</h1>
                <p className="text-steel text-lg leading-relaxed">{job.description}</p>
              </div>
              {[
                { title: 'Responsibilities', items: job.responsibilities },
                { title: 'Requirements', items: job.requirements },
                { title: 'Benefits', items: job.benefits },
              ].map((section) => (
                <section key={section.title} className="card-premium">
                  <h2 className="text-2xl font-bold mb-5">{section.title}</h2>
                  <ul className="space-y-3 text-steel">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3"><span className="text-electric font-bold">•</span>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="card-premium">
                <h2 className="text-xl font-bold mb-5">Role Summary</h2>
                <dl className="space-y-4 text-steel text-sm">
                  {[['Department', job.department], ['Location', job.location], ['Type', job.jobType], ['Experience', job.experienceRequired], ['Salary', job.salaryRange || 'TBD'], ['Deadline', job.deadline]].map(([label, val]) => (
                    <div key={label as string}><dt className="font-bold text-midnight text-xs uppercase tracking-widest mb-1">{label}</dt><dd>{val}</dd></div>
                  ))}
                </dl>
              </div>
              {canApply ? (
                <Link to={ROUTES.jobApply(job.id)} className="btn-primary w-full py-5 text-lg text-center block">Apply Now</Link>
              ) : (
                <div className="rounded-2xl border border-midnight/10 bg-midnight/5 px-6 py-5 text-center">
                  <p className="font-bold text-midnight mb-1">Applications Closed</p>
                  <p className="text-steel text-sm">This role is not currently accepting applications.</p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailPage;
