import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { JobPost, JobStatus, JobType } from '../../domain/entities/JobPost';

const JOB_TYPES: JobType[] = ['Full Time', 'Part Time', 'Remote', 'Contract', 'Internship'];
const JOB_STATUSES: JobStatus[] = ['Open', 'Closed'];
const DEPARTMENTS = ['Security Engineering', 'Product Design', 'Growth', 'Engineering', 'Marketing', 'Operations'];

const defaultJob = (): JobPost => ({
  id: Date.now().toString(), title: '', department: DEPARTMENTS[0], location: '',
  jobType: 'Full Time', experienceRequired: '', salaryRange: '', description: '',
  responsibilities: [], requirements: [], benefits: [], deadline: '', status: 'Open',
  image: '', slug: '', metaTitle: '', metaDescription: '',
  postedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
});

interface Props {
  editingJob: JobPost | null;
  onSave: (job: JobPost) => Promise<void>;
  onBack: () => void;
}

export default function JobEditor({ editingJob, onSave, onBack }: Props) {
  const [form, setForm] = useState<JobPost>(defaultJob());

  useEffect(() => {
    setForm(editingJob ?? defaultJob());
  }, [editingJob]);

  const handleSave = async () => {
    await onSave({
      ...form,
      responsibilities: form.responsibilities.filter(Boolean),
      requirements: form.requirements.filter(Boolean),
      benefits: form.benefits.filter(Boolean),
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    });
    onBack();
  };

  const inputCls = 'w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all';

  return (
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-midnight/10 flex items-center justify-center text-midnight hover:border-electric transition-colors">
            <ArrowRight size={20} className="rotate-180" />
          </button>
          <div>
            <h1 className="text-4xl font-bold">{editingJob ? 'Edit Job Post' : 'Create New Job Post'}</h1>
            <p className="text-steel">Add or update roles with full SEO, status, and applicant-ready details.</p>
          </div>
        </div>

        <div className="card-premium p-10 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Job Title</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="Senior Product Designer" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Department</label>
              <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className={`${inputCls} appearance-none`}>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Location</label>
              <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputCls} placeholder="Remote / London, UK" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Job Type</label>
              <select value={form.jobType} onChange={e => setForm({ ...form, jobType: e.target.value as JobType })} className={`${inputCls} appearance-none`}>
                {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Experience</label>
              <input type="text" value={form.experienceRequired} onChange={e => setForm({ ...form, experienceRequired: e.target.value })} className={inputCls} placeholder="3+ years" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Salary Range</label>
              <input type="text" value={form.salaryRange} onChange={e => setForm({ ...form, salaryRange: e.target.value })} className={inputCls} placeholder="Optional" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Deadline</label>
              <input type="text" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} className={inputCls} placeholder="July 31, 2026" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as JobStatus })} className={`${inputCls} appearance-none`}>
                {JOB_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">SEO Slug</label>
              <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className={inputCls} placeholder="senior-cloud-security-engineer" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-steel">Job Description</label>
            <textarea rows={5} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className={`${inputCls} resize-none`} placeholder="Write a concise, premium role overview..." />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {(['responsibilities', 'requirements', 'benefits'] as const).map(section => (
              <div key={section} className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-steel">{section}</label>
                <textarea rows={5}
                  value={(form[section] as string[]).join('\n')}
                  onChange={e => setForm({ ...form, [section]: e.target.value.split('\n').map(l => l.trim()).filter(Boolean) })}
                  className={`${inputCls} resize-none`} placeholder="One item per line" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-steel">Featured Image URL</label>
            <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className={inputCls} placeholder="https://images.unsplash.com/..." />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Meta Title</label>
              <input type="text" value={form.metaTitle} onChange={e => setForm({ ...form, metaTitle: e.target.value })} className={inputCls} placeholder="SEO title for the role" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Meta Description</label>
              <input type="text" value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} className={inputCls} placeholder="SEO description for the role" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-midnight/5">
            <button onClick={onBack} className="px-8 py-4 font-bold text-steel hover:text-midnight transition-colors">Cancel</button>
            <button onClick={handleSave} className="btn-primary px-12 py-4">Save Job Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
