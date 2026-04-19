import React from 'react';
import { ArrowRight } from 'lucide-react';
import { JobPost } from '../domain/entities/JobPost';

const JobDetailPage = ({ jobId, jobs, setActivePage }: { jobId: string; jobs: JobPost[]; setActivePage: (page: string) => void }) => {
  const job = jobs.find((item) => item.id === jobId);

  if (!job) {
    return (
      <div className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
          <p className="text-steel mb-10">The role you are looking for is unavailable. Please return to the careers page.</p>
          <button onClick={() => setActivePage('Careers')} className="btn-primary px-10 py-4">
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <button onClick={() => setActivePage('Careers')} className="inline-flex items-center gap-2 text-steel text-sm mb-10 hover:text-electric transition-colors">
          <ArrowRight size={14} className="rotate-180" /> Back to Careers
        </button>

        <div className="grid lg:grid-cols-[1.4fr_0.7fr] gap-12 items-start">
          <div className="space-y-8">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-black/20">
              <img src={job.image} alt={job.title} className="w-full h-[420px] object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4">
              <div className="inline-flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-electric/10 text-electric text-xs font-bold uppercase tracking-[0.3em]">{job.jobType}</span>
                <span className="px-4 py-2 rounded-full bg-white/5 text-steel text-xs font-bold uppercase tracking-[0.3em]">{job.status}</span>
                <span className="px-4 py-2 rounded-full bg-white/5 text-steel text-xs font-bold uppercase tracking-[0.3em]">Deadline: {job.deadline}</span>
              </div>
              <h1 className="text-5xl font-black leading-tight">{job.title}</h1>
              <div className="flex flex-wrap gap-6 text-steel text-sm">
                <span>{job.department}</span>
                <span>{job.location}</span>
                <span>{job.experienceRequired} experience</span>
              </div>
              <p className="text-steel/85 leading-relaxed text-lg">{job.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <section className="card-premium p-8">
                <h2 className="text-2xl font-bold mb-6">Responsibilities</h2>
                <ul className="space-y-4 text-steel">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="text-electric font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="card-premium p-8">
                <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                <ul className="space-y-4 text-steel">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="text-electric font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="card-premium p-8">
              <h2 className="text-2xl font-bold mb-6">Benefits</h2>
              <ul className="grid gap-4 text-steel">
                {job.benefits.map((item, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <span className="mt-1 text-electric font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="card-premium p-8 sticky top-28">
              <h2 className="text-2xl font-bold mb-6">Role Summary</h2>
              <div className="space-y-4 text-steel">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-steel/60 mb-2">Department</h3>
                  <p>{job.department}</p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-steel/60 mb-2">Location</h3>
                  <p>{job.location}</p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-steel/60 mb-2">Employment Type</h3>
                  <p>{job.jobType}</p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-steel/60 mb-2">Experience</h3>
                  <p>{job.experienceRequired}</p>
                </div>
                {job.salaryRange && (
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-steel/60 mb-2">Salary</h3>
                    <p>{job.salaryRange}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-steel/60 mb-2">Application Deadline</h3>
                  <p>{job.deadline}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePage(`Apply:${job.id}`)}
              className="btn-primary w-full py-5 text-lg"
            >
              Apply Now
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
