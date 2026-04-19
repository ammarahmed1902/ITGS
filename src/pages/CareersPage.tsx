import React, { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { JobPost } from '../domain/entities/JobPost';

const CareersPage = ({ jobs, setActivePage }: { jobs: JobPost[]; setActivePage: (page: string) => void }) => {
  const [search, setSearch] = useState('');
  const openJobs = useMemo(
    () => jobs.filter((job) => job.status === 'Open'),
    [jobs]
  );

  const filteredJobs = useMemo(
    () =>
      openJobs.filter((job) =>
        [job.title, job.department, job.location, job.jobType]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [openJobs, search]
  );

  return (
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.35em] text-cyan font-bold text-sm mb-4">Job Posts</p>
          <h1 className="text-5xl font-bold mb-6">Work with a Premium Technology Authority</h1>
          <p className="text-steel max-w-2xl mx-auto text-lg">Explore our active opportunities, review detailed role expectations, and submit your application with confidence.</p>
        </div>

        <div className="card-premium p-8 mb-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-steel text-sm">Open roles across product, security, growth, and engineering.</p>
              <p className="text-3xl font-black mt-2">{openJobs.length} Live Job Posts</p>
            </div>
            <div className="relative max-w-xl w-full">
              <Search size={18} className="absolute left-4 top-4 text-steel/60" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by role, department or location"
                className="w-full pl-12 pr-5 py-4 rounded-full bg-starfield border border-midnight/10 text-steel focus:border-electric outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="card-premium p-8 border border-midnight/10 hover:border-electric/30 transition-all">
                <div className="flex flex-wrap gap-4 items-start justify-between mb-6">
                  <div>
                    <span className="inline-flex px-3 py-1 rounded-full bg-electric/10 text-electric text-xs uppercase tracking-[0.35em] font-bold">{job.jobType}</span>
                    <h2 className="text-3xl font-black mt-4 mb-3">{job.title}</h2>
                    <p className="text-steel text-sm">{job.department} · {job.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-steel text-xs uppercase tracking-[0.35em]">Deadline</span>
                    <div className="text-midnight font-bold">{job.deadline}</div>
                  </div>
                </div>
                <p className="text-steel leading-relaxed mb-8">{job.description}</p>
                <div className="grid gap-4 sm:grid-cols-2 mb-8 text-sm text-steel">
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="font-bold">Experience</p>
                    <p>{job.experienceRequired}</p>
                  </div>
                  {job.salaryRange && (
                    <div className="rounded-3xl bg-white/5 p-4">
                      <p className="font-bold">Salary Range</p>
                      <p>{job.salaryRange}</p>
                    </div>
                  )}
                </div>
                <button onClick={() => setActivePage(`Job:${job.id}`)} className="btn-primary px-8 py-4">
                  View Role
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 card-premium border-dashed">
              <p className="text-steel text-xl">No open job posts match your search. Check back soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
