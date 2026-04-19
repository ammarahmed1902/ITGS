import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Lock, LogOut, Plus, Edit, Trash2, ArrowRight, Upload, Image as ImageIcon, Info, Search, Download } from 'lucide-react';
import { SERVICES_DATA } from '../constants';
import { BlogPost } from '../domain/entities/BlogPost';
import { JobPost, JobStatus, JobType } from '../domain/entities/JobPost';
import { JobApplication, ApplicationStatus } from '../domain/entities/JobApplication';

const JOB_TYPES: JobType[] = ['Full Time', 'Part Time', 'Remote', 'Contract', 'Internship'];
const JOB_STATUSES: JobStatus[] = ['Open', 'Closed'];
const APPLICATION_STATUSES: (ApplicationStatus | 'All')[] = ['All', 'New', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Hired'];
const DEPARTMENTS = ['Security Engineering', 'Product Design', 'Growth', 'Engineering', 'Marketing', 'Operations'];

interface AdminPageProps {
  posts: BlogPost[];
  jobs: JobPost[];
  applications: JobApplication[];
  onSave: (post: BlogPost) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onSaveJob: (job: JobPost) => Promise<void>;
  onDeleteJob: (id: string) => Promise<void>;
  onSaveApplication: (application: JobApplication) => Promise<void>;
  onUpdateApplicationStatus: (id: string, status: ApplicationStatus) => Promise<void>;
  onDeleteApplication: (id: string) => Promise<void>;
}

const defaultJobForm = (): JobPost => ({
  id: Date.now().toString(),
  title: '',
  department: DEPARTMENTS[0],
  location: '',
  jobType: 'Full Time',
  experienceRequired: '',
  salaryRange: '',
  description: '',
  responsibilities: [],
  requirements: [],
  benefits: [],
  deadline: '',
  status: 'Open',
  image: '',
  slug: '',
  metaTitle: '',
  metaDescription: '',
  postedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
});

const AdminPage = ({ posts, jobs, applications, onSave, onDelete, onSaveJob, onDeleteJob, onSaveApplication, onUpdateApplicationStatus, onDeleteApplication }: AdminPageProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [view, setView] = useState<'dashboard' | 'blog-editor' | 'job-editor'>('dashboard');
  const [adminSection, setAdminSection] = useState<'Blog' | 'Jobs' | 'Applications'>('Blog');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingJob, setEditingJob] = useState<JobPost | null>(null);
  const [activeTab, setActiveTab] = useState<'Published' | 'Draft'>('Published');
  const [applicationSearch, setApplicationSearch] = useState('');
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | 'All'>('All');

  const [form, setForm] = useState({
    title: '',
    category: SERVICES_DATA[0].title,
    image: '',
    content: '',
    metaTitle: '',
    metaDescription: ''
  });

  const [jobForm, setJobForm] = useState<JobPost>(defaultJobForm());

  useEffect(() => {
    if (editingPost) {
      setForm({
        title: editingPost.title,
        category: editingPost.category,
        image: editingPost.image,
        content: editingPost.content,
        metaTitle: editingPost.metaTitle || '',
        metaDescription: editingPost.metaDescription || ''
      });
    } else {
      setForm({
        title: '',
        category: SERVICES_DATA[0].title,
        image: '',
        content: '',
        metaTitle: '',
        metaDescription: ''
      });
    }
  }, [editingPost, view]);

  useEffect(() => {
    if (editingJob) {
      setJobForm(editingJob);
    } else {
      setJobForm(defaultJobForm());
    }
  }, [editingJob, view]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'blogarouthawrite' && password === 'Cn/X#J39q@RKAwz5Z(MBTt<b^SN!+6') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSavePost = async (status: 'Published' | 'Draft') => {
    const newPost: BlogPost = {
      id: editingPost ? editingPost.id : Date.now().toString(),
      ...form,
      status,
      date: editingPost ? editingPost.date : new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      views: editingPost ? editingPost.views : 0,
      readTime: editingPost ? editingPost.readTime : '5m'
    };

    await onSave(newPost);
    setView('dashboard');
    setEditingPost(null);
  };

  const handleSaveJob = async () => {
    const updatedJob: JobPost = {
      ...jobForm,
      responsibilities: jobForm.responsibilities.filter(Boolean),
      requirements: jobForm.requirements.filter(Boolean),
      benefits: jobForm.benefits.filter(Boolean),
      slug: jobForm.slug || jobForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };

    await onSaveJob(updatedJob);
    setView('dashboard');
    setEditingJob(null);
  };

  const handleDeleteJob = async (id: string) => {
    if (window.confirm('Delete this job posting?')) {
      await onDeleteJob(id);
    }
  };

  const filteredPosts = posts.filter((p) => p.status === activeTab);
  const totalViews = posts.reduce((acc, p) => acc + p.views, 0);
  const formattedViews = totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : `${totalViews}`;

  const filteredApplications = useMemo(
    () =>
      applications.filter((application) => {
        const matchesStatus = applicationStatus === 'All' || application.status === applicationStatus;
        const query = `${application.firstName} ${application.lastName} ${application.email} ${application.jobTitle}`.toLowerCase();
        const matchesSearch = query.includes(applicationSearch.toLowerCase());
        return matchesStatus && matchesSearch;
      }),
    [applications, applicationSearch, applicationStatus]
  );

  if (!isLoggedIn) {
    return (
      <div className="pt-48 pb-24 bg-starfield min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full card-premium p-12"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center text-electric mx-auto mb-6">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-steel mt-2">Access the ITGS management console.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-midnight mb-2 uppercase tracking-widest">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border border-midnight/10 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-midnight mb-2 uppercase tracking-widest">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-midnight/10 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <button type="submit" className="btn-primary w-full py-4">Sign In</button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (view === 'blog-editor') {
    return (
      <div className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={() => {
                setView('dashboard');
                setEditingPost(null);
              }}
              className="w-10 h-10 rounded-full bg-white border border-midnight/10 flex items-center justify-center text-midnight hover:border-electric transition-colors"
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <div>
              <h1 className="text-4xl font-bold">{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
              <p className="text-steel">Manage the editorial workflow with draft and publish controls.</p>
            </div>
          </div>

          <div className="card-premium p-10 space-y-10">
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Post Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="Enter a compelling title..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all appearance-none"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-steel">Featured Image</label>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-midnight/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-electric/40 transition-colors cursor-pointer bg-starfield group">
                    <div className="w-12 h-12 bg-electric/5 rounded-full flex items-center justify-center text-electric mb-4 group-hover:scale-110 transition-transform">
                      <Upload size={24} />
                    </div>
                    <p className="text-sm font-bold text-midnight">Click to upload or drag and drop</p>
                    <p className="text-xs text-steel mt-1">PNG, JPG or WEBP (MAX. 2MB)</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-steel/60">Or use Image URL</label>
                      <input
                        type="text"
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        className="w-full bg-starfield border border-midnight/5 rounded-xl px-4 py-3 text-sm focus:border-electric outline-none transition-all"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    <div className="p-4 bg-midnight/5 rounded-xl flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-steel">
                        <ImageIcon size={20} />
                      </div>
                      <div className="text-xs text-steel leading-relaxed">
                        Recommended size: <span className="font-bold">1200x630px</span> for optimal social sharing.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-midnight/5 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Info size={16} className="text-electric" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-midnight">SEO Meta Data</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Meta Title</label>
                  <input
                    type="text"
                    value={form.metaTitle}
                    onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="SEO Title (max 60 chars)"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Meta Description</label>
                  <input
                    type="text"
                    value={form.metaDescription}
                    onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="SEO Description (max 160 chars)"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-midnight/5 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Post Content</label>
              <textarea
                rows={12}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all resize-none"
                placeholder="Write your expert perspective here..."
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-midnight/5">
              <button
                onClick={() => {
                  setView('dashboard');
                  setEditingPost(null);
                }}
                className="px-8 py-4 font-bold text-steel hover:text-midnight transition-colors"
              >
                Discard
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => handleSavePost('Draft')}
                  className="px-8 py-4 bg-midnight/5 hover:bg-midnight/10 text-midnight font-bold rounded-xl transition-all"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => handleSavePost('Published')}
                  className="btn-primary px-12 py-4"
                >
                  Publish Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'job-editor') {
    return (
      <div className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={() => {
                setView('dashboard');
                setEditingJob(null);
              }}
              className="w-10 h-10 rounded-full bg-white border border-midnight/10 flex items-center justify-center text-midnight hover:border-electric transition-colors"
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <div>
              <h1 className="text-4xl font-bold">{editingJob ? 'Edit Job Post' : 'Create New Job Post'}</h1>
              <p className="text-steel">Add or update roles with full SEO, status, and applicant-ready details.</p>
            </div>
          </div>

          <div className="card-premium p-10 space-y-10">
            <div className="grid gap-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Job Title</label>
                  <input
                    type="text"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="Senior Product Designer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Department</label>
                  <select
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all appearance-none"
                  >
                    {DEPARTMENTS.map((department) => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Location</label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="Remote / London, UK"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Job Type</label>
                  <select
                    value={jobForm.jobType}
                    onChange={(e) => setJobForm({ ...jobForm, jobType: e.target.value as JobType })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all appearance-none"
                  >
                    {JOB_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Experience Required</label>
                  <input
                    type="text"
                    value={jobForm.experienceRequired}
                    onChange={(e) => setJobForm({ ...jobForm, experienceRequired: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="e.g. 3+ years"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Salary Range</label>
                  <input
                    type="text"
                    value={jobForm.salaryRange}
                    onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Application Deadline</label>
                  <input
                    type="text"
                    value={jobForm.deadline}
                    onChange={(e) => setJobForm({ ...jobForm, deadline: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="e.g. July 31, 2026"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Status</label>
                  <select
                    value={jobForm.status}
                    onChange={(e) => setJobForm({ ...jobForm, status: e.target.value as JobStatus })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all appearance-none"
                  >
                    {JOB_STATUSES.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">SEO Slug</label>
                  <input
                    type="text"
                    value={jobForm.slug}
                    onChange={(e) => setJobForm({ ...jobForm, slug: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="senior-cloud-security-engineer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-steel">Job Description</label>
                <textarea
                  rows={5}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all resize-none"
                  placeholder="Write a concise, premium role overview..."
                />
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {['responsibilities', 'requirements', 'benefits'].map((section) => (
                  <div key={section} className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-steel">{section.charAt(0).toUpperCase() + section.slice(1)}</label>
                    <textarea
                      rows={5}
                      value={(jobForm as any)[section].join('\n')}
                      onChange={(e) => setJobForm({ ...jobForm, [section]: e.target.value.split('\n').map((line) => line.trim()).filter(Boolean) })}
                      className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all resize-none"
                      placeholder="One item per line"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-steel">Featured Image URL</label>
                <input
                  type="text"
                  value={jobForm.image}
                  onChange={(e) => setJobForm({ ...jobForm, image: e.target.value })}
                  className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Meta Title</label>
                  <input
                    type="text"
                    value={jobForm.metaTitle}
                    onChange={(e) => setJobForm({ ...jobForm, metaTitle: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="SEO title for the role"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Meta Description</label>
                  <input
                    type="text"
                    value={jobForm.metaDescription}
                    onChange={(e) => setJobForm({ ...jobForm, metaDescription: e.target.value })}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="SEO description for the role"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-midnight/5">
              <button
                onClick={() => {
                  setView('dashboard');
                  setEditingJob(null);
                }}
                className="px-8 py-4 font-bold text-steel hover:text-midnight transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveJob}
                className="btn-primary px-12 py-4"
              >
                Save Job Post
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-6 mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Admin Dashboard</span>
            <h1 className="text-5xl font-bold">Content & Careers Management</h1>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 text-steel hover:text-red-500 transition-colors font-bold">
            <LogOut size={20} /> Logout
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {(['Blog', 'Jobs', 'Applications'] as const).map((section) => (
            <button
              key={section}
              onClick={() => {
                setAdminSection(section);
                setView('dashboard');
                setEditingPost(null);
                setEditingJob(null);
              }}
              className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${adminSection === section ? 'bg-electric text-white shadow-lg shadow-electric/20' : 'bg-white/5 border border-white/10 text-steel hover:text-electric'}`}
            >
              {section}
            </button>
          ))}
        </div>

        {adminSection === 'Blog' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-8">
                  <button
                    onClick={() => setActiveTab('Published')}
                    className={`text-2xl font-bold transition-all ${activeTab === 'Published' ? 'text-midnight border-b-2 border-electric' : 'text-steel hover:text-midnight'}`}
                  >
                    Published
                  </button>
                  <button
                    onClick={() => setActiveTab('Draft')}
                    className={`text-2xl font-bold transition-all ${activeTab === 'Draft' ? 'text-midnight border-b-2 border-electric' : 'text-steel hover:text-midnight'}`}
                  >
                    Drafts
                  </button>
                </div>
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setView('blog-editor');
                  }}
                  className="btn-primary py-2 px-6 flex items-center gap-2 text-sm"
                >
                  <Plus size={18} /> New Post
                </button>
              </div>

              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white p-6 rounded-2xl border border-midnight/5 flex items-center justify-between group hover:border-electric/30 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-xl bg-midnight/5 overflow-hidden">
                        <img src={post.image || `https://picsum.photos/seed/admin-${post.id}/100/100`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{post.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-steel text-xs">{post.date}</span>
                          <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${post.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            {post.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setView('blog-editor');
                        }}
                        className="p-2 hover:bg-electric/10 rounded-lg text-electric transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center card-premium border-dashed">
                  <p className="text-steel">No {activeTab.toLowerCase()} posts available.</p>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="card-premium">
                <h2 className="text-xl font-bold mb-6">Quick Stats</h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-steel">Total Posts</span>
                    <span className="font-bold text-midnight">{posts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-steel">Total Views</span>
                    <span className="font-bold text-midnight">{formattedViews}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-steel">Avg. Read Time</span>
                    <span className="font-bold text-midnight">6.2m</span>
                  </div>
                </div>
              </div>

              <div className="card-premium">
                <h2 className="text-xl font-bold mb-6">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {SERVICES_DATA.map((s) => (
                    <span key={s.id} className="px-3 py-1 bg-midnight/5 rounded-full text-xs font-bold text-steel">
                      {s.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {adminSection === 'Jobs' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold">Job Posts</h2>
                  <p className="text-steel">Create, publish, or close roles with a polished career workflow.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingJob(null);
                    setView('job-editor');
                  }}
                  className="btn-primary py-2 px-6 flex items-center gap-2 text-sm"
                >
                  <Plus size={18} /> New Job
                </button>
              </div>

              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-2xl border border-midnight/5 flex flex-col gap-4 hover:border-electric/30 transition-all">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold">{job.title}</h3>
                        <p className="text-steel mt-2">{job.department} · {job.location}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="text-xs uppercase tracking-[0.35em] font-bold px-3 py-1 rounded-full bg-white/5 text-steel">{job.jobType}</span>
                        <span className={`text-xs uppercase tracking-[0.35em] font-bold px-3 py-1 rounded-full ${job.status === 'Open' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {job.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-steel">
                      <span>Deadline: {job.deadline}</span>
                      <span>Salary: {job.salaryRange || 'TBD'}</span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingJob(job);
                          setView('job-editor');
                        }}
                        className="px-4 py-3 bg-electric/10 text-electric font-bold rounded-xl"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="px-4 py-3 bg-red-50 text-red-600 font-bold rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center card-premium border-dashed">
                  <p className="text-steel">No job posts available yet.</p>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="card-premium p-8">
                <h2 className="text-xl font-bold mb-6">Job Metrics</h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-steel">Total Roles</span>
                    <span className="font-bold text-midnight">{jobs.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-steel">Open Roles</span>
                    <span className="font-bold text-midnight">{jobs.filter((job) => job.status === 'Open').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-steel">Closed Roles</span>
                    <span className="font-bold text-midnight">{jobs.filter((job) => job.status === 'Closed').length}</span>
                  </div>
                </div>
              </div>

              <div className="card-premium p-8">
                <h2 className="text-xl font-bold mb-6">Departments</h2>
                <div className="flex flex-wrap gap-2">
                  {DEPARTMENTS.map((department) => (
                    <span key={department} className="px-3 py-1 bg-midnight/5 rounded-full text-xs font-bold text-steel">
                      {department}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {adminSection === 'Applications' && (
          <div className="grid gap-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold">Applicant Tracking</h2>
                <p className="text-steel">Review applications, filter by status, and download candidate resumes.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full lg:w-auto">
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-4 text-steel/60" />
                  <input
                    type="text"
                    value={applicationSearch}
                    onChange={(e) => setApplicationSearch(e.target.value)}
                    placeholder="Search applicants"
                    className="w-full pl-12 pr-5 py-4 rounded-full bg-starfield border border-midnight/10 text-steel focus:border-electric outline-none transition-all"
                  />
                </div>
                <select
                  value={applicationStatus}
                  onChange={(e) => setApplicationStatus(e.target.value as ApplicationStatus | 'All')}
                  className="w-full bg-starfield border border-midnight/10 rounded-full px-5 py-4 focus:border-electric outline-none transition-all"
                >
                  {APPLICATION_STATUSES.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <div key={application.id} className="card-premium p-8 border border-midnight/10">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-3 items-center">
                        <h3 className="text-2xl font-bold">{application.firstName} {application.lastName}</h3>
                        <span className="text-xs uppercase tracking-[0.35em] font-bold px-3 py-1 rounded-full bg-white/5 text-steel">{application.status}</span>
                      </div>
                      <p className="text-steel">{application.jobTitle}</p>
                      <p className="text-steel text-sm">{application.email} · {application.phone}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 items-center">
                      <button
                        onClick={() => onUpdateApplicationStatus(application.id, application.status === 'New' ? 'Shortlisted' : 'Interview Scheduled')}
                        className="px-4 py-3 bg-electric/10 text-electric font-bold rounded-xl"
                      >
                        Next Step
                      </button>
                      <button
                        onClick={() => onDeleteApplication(application.id)}
                        className="px-4 py-3 bg-red-50 text-red-600 font-bold rounded-xl"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 mt-8 text-steel text-sm">
                    <div>
                      <p className="font-bold">Location</p>
                      <p>{application.currentLocation}</p>
                    </div>
                    <div>
                      <p className="font-bold">Experience</p>
                      <p>{application.yearsExperience}</p>
                    </div>
                    <div>
                      <p className="font-bold">Expected Salary</p>
                      <p>{application.expectedSalary}</p>
                    </div>
                    <div>
                      <p className="font-bold">Available Start</p>
                      <p>{application.availableJoinDate}</p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <a
                      href={application.resumeDataUrl}
                      download={application.resumeFileName}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-midnight/5 px-6 py-4 text-sm font-bold text-steel hover:bg-electric/10 transition-all"
                    >
                      <Download size={16} /> Download Resume
                    </a>
                    {application.coverLetterDataUrl && (
                      <a
                        href={application.coverLetterDataUrl}
                        download={application.coverLetterFileName}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-midnight/5 px-6 py-4 text-sm font-bold text-steel hover:bg-electric/10 transition-all"
                      >
                        <Download size={16} /> Download Cover Letter
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center card-premium border-dashed">
                <p className="text-steel">No applicants match this filter yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
