import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { JobPost } from '../domain/entities/JobPost';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import { ROUTES } from '../config/site';

const CareersPage = ({ jobs }: { jobs: JobPost[] }) => {
  const [search, setSearch] = useState('');
  const openJobs = useMemo(() => jobs.filter((job) => job.status === 'Open'), [jobs]);
  const filteredJobs = useMemo(
    () => openJobs.filter((job) =>
      [job.title, job.department, job.location, job.jobType].join(' ').toLowerCase().includes(search.toLowerCase())
    ),
    [openJobs, search]
  );

  return (
    <>
      <PageMeta title="Careers" description="Explore open roles at ITGS and join a premium global technology authority." path={ROUTES.careers} />
      <div className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <PageHeader
            eyebrow="Job Posts"
            title="Work with a Premium Technology Authority"
            description="Explore active opportunities, review role expectations, and submit your application with confidence."
          />
          <div className="card-premium mb-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-steel text-sm">Open roles across product, security, growth, and engineering.</p>
                <p className="text-3xl font-black mt-2">{openJobs.length} Live Job Posts</p>
              </div>
              <div className="relative max-w-xl w-full">
                <label htmlFor="job-search" className="sr-only">Search jobs</label>
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-steel/60" aria-hidden="true" />
                <input
                  id="job-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by role, department or location"
                  className="input-field pl-12 rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredJobs.length > 0 ? filteredJobs.map((job) => (
              <article key={job.id} className="card-premium hover:border-electric/30 transition-all">
                <div className="flex flex-wrap gap-4 items-start justify-between mb-5">
                  <div>
                    <span className="inline-flex px-3 py-1 rounded-full bg-electric/10 text-electric text-xs uppercase tracking-widest font-bold">{job.jobType}</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold mt-3 mb-2">{job.title}</h2>
                    <p className="text-steel text-sm">{job.department} · {job.location}</p>
                  </div>
                  <div className="text-right text-sm">
                    <span className="text-steel text-xs uppercase tracking-widest">Deadline</span>
                    <div className="text-midnight font-bold">{job.deadline}</div>
                  </div>
                </div>
                <p className="text-steel leading-relaxed mb-6 line-clamp-3">{job.description}</p>
                <Link to={ROUTES.job(job.id)} className="btn-primary px-8 py-3 inline-flex">View Role</Link>
              </article>
            )) : (
              <div className="col-span-full text-center py-20 card-premium border-dashed">
                <p className="text-steel text-xl mb-6">No open job posts match your search.</p>
                {search && (
                  <button type="button" onClick={() => setSearch('')} className="btn-outline-light px-8 py-3">Clear Search</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CareersPage;
