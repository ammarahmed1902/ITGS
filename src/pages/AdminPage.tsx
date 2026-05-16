import React, { useState, useMemo } from 'react';
import { LogOut, Plus, Edit, Trash2, Search, Download, Users } from 'lucide-react';
import { BlogPost } from '../domain/entities/BlogPost';
import { JobPost } from '../domain/entities/JobPost';
import { JobApplication, ApplicationStatus } from '../domain/entities/JobApplication';
import { AdminUser } from '../domain/entities/AdminUser';
import { ROLE_LABELS, ROLE_COLORS, ROLE_PERMISSIONS, AdminSection } from '../config/rolePermissions';
import { useAdminAuth } from '../presentation/hooks/useAdminAuth';
import { getAdminUsers } from '../infrastructure/repositories/AdminUserRepository';
import { SERVICES_DATA } from '../constants';
import AdminLoginScreen from './admin/AdminLoginScreen';
import BlogEditor from './admin/BlogEditor';
import JobEditor from './admin/JobEditor';
import UserManagement from './admin/UserManagement';

const APPLICATION_STATUSES: (ApplicationStatus | 'All')[] = ['All', 'New', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Hired'];

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

const AdminPage = ({
  posts, jobs, applications,
  onSave, onDelete, onSaveJob, onDeleteJob,
  onSaveApplication, onUpdateApplicationStatus, onDeleteApplication,
}: AdminPageProps) => {
  const { currentUser, isInitialized, login, logout, refreshCurrentUser } = useAdminAuth();

  const [view, setView] = useState<'dashboard' | 'blog-editor' | 'job-editor'>('dashboard');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingJob, setEditingJob] = useState<JobPost | null>(null);
  
  const [activeTab, setActiveTab] = useState<'Published' | 'Draft'>(() => 
    (localStorage.getItem('itgs_admin_active_tab') as 'Published' | 'Draft') || 'Published'
  );
  
  const [adminSection, setAdminSection] = useState<AdminSection>(() => 
    (localStorage.getItem('itgs_admin_section') as AdminSection) || 'Blog'
  );

  React.useEffect(() => {
    localStorage.setItem('itgs_admin_active_tab', activeTab);
  }, [activeTab]);

  React.useEffect(() => {
    localStorage.setItem('itgs_admin_section', adminSection);
  }, [adminSection]);
  const [appSearch, setAppSearch] = useState('');
  const [appStatus, setAppStatus] = useState<ApplicationStatus | 'All'>('All');
  const [users, setUsers] = useState<AdminUser[]>([]);

  const allowedSections = currentUser ? ROLE_PERMISSIONS[currentUser.role] : [];

  // Validate persisted section against role permissions
  React.useEffect(() => {
    if (allowedSections.length > 0 && !allowedSections.includes(adminSection)) {
      setAdminSection(allowedSections[0]);
    }
  }, [currentUser, allowedSections, adminSection]);

  const refreshUsers = () => setUsers(getAdminUsers());

  const goSection = (s: AdminSection) => {
    setAdminSection(s);
    setView('dashboard');
    setEditingPost(null);
    setEditingJob(null);
    if (s === 'User Management') refreshUsers();
  };

  const filteredPosts = posts.filter(p => p.status === activeTab);
  const totalViews = posts.reduce((a, p) => a + p.views, 0);
  const fmtViews = totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : `${totalViews}`;

  const filteredApps = useMemo(() =>
    applications.filter(a => {
      const matchStatus = appStatus === 'All' || a.status === appStatus;
      const q = `${a.firstName} ${a.lastName} ${a.email} ${a.jobTitle}`.toLowerCase();
      return matchStatus && q.includes(appSearch.toLowerCase());
    }),
    [applications, appSearch, appStatus]
  );

  /* ── Loading ───────────────────────────────────────────────────────────── */
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-starfield flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* ── Login ─────────────────────────────────────────────────────────────── */
  if (!currentUser) return <AdminLoginScreen onLogin={login} />;

  /* ── Blog editor ───────────────────────────────────────────────────────── */
  if (view === 'blog-editor') {
    return (
      <BlogEditor
        editingPost={editingPost}
        onSave={onSave}
        onBack={() => { setView('dashboard'); setEditingPost(null); }}
      />
    );
  }

  /* ── Job editor ────────────────────────────────────────────────────────── */
  if (view === 'job-editor') {
    return (
      <JobEditor
        editingJob={editingJob}
        onSave={onSaveJob}
        onBack={() => { setView('dashboard'); setEditingJob(null); }}
      />
    );
  }

  /* ── Dashboard ─────────────────────────────────────────────────────────── */
  const ic = 'w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all';

  return (
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-2 block">Admin Dashboard</span>
            <h1 className="text-4xl font-bold">Content &amp; Careers Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white rounded-2xl border border-midnight/5 px-4 py-3">
              <div className="w-9 h-9 bg-electric/10 rounded-xl flex items-center justify-center text-electric font-bold text-sm">
                {currentUser.displayName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-midnight">{currentUser.displayName}</p>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${ROLE_COLORS[currentUser.role].bg} ${ROLE_COLORS[currentUser.role].text}`}>
                  {ROLE_LABELS[currentUser.role]}
                </span>
              </div>
            </div>
            <button onClick={logout} className="flex items-center gap-2 text-steel hover:text-red-500 transition-colors font-bold text-sm">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {allowedSections.map(section => (
            <button
              key={section}
              onClick={() => goSection(section)}
              className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                adminSection === section
                  ? 'bg-electric text-white shadow-lg shadow-electric/20'
                  : 'bg-white/5 border border-white/10 text-steel hover:text-electric'
              }`}
            >
              {section === 'User Management' && <Users size={15} />}
              {section}
            </button>
          ))}
        </div>

        {/* ── Blog section ─────────────────────────────────────────────────── */}
        {adminSection === 'Blog' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-6">
                  {(['Published', 'Draft'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`text-2xl font-bold transition-all ${activeTab === tab ? 'text-midnight border-b-2 border-electric' : 'text-steel hover:text-midnight'}`}>
                      {tab === 'Draft' ? 'Drafts' : tab}
                    </button>
                  ))}
                </div>
                <button onClick={() => { setEditingPost(null); setView('blog-editor'); }} className="btn-primary py-2 px-6 flex items-center gap-2 text-sm">
                  <Plus size={18} /> New Post
                </button>
              </div>

              {filteredPosts.length > 0 ? filteredPosts.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-2xl border border-midnight/5 flex items-center justify-between group hover:border-electric/30 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-xl bg-midnight/5 overflow-hidden">
                      <img src={post.image || `https://picsum.photos/seed/ap-${post.id}/100/100`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{post.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-steel text-xs">{post.date}</span>
                        <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${post.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{post.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingPost(post); setView('blog-editor'); }} className="p-2 hover:bg-electric/10 rounded-lg text-electric transition-colors"><Edit size={18} /></button>
                    <button onClick={() => window.confirm('Delete post?') && onDelete(post.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </div>
              )) : (
                <div className="py-20 text-center card-premium border-dashed">
                  <p className="text-steel">No {activeTab.toLowerCase()} posts available.</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="card-premium">
                <h2 className="text-xl font-bold mb-5">Quick Stats</h2>
                <div className="space-y-4">
                  {[['Total Posts', posts.length], ['Total Views', fmtViews], ['Published', posts.filter(p => p.status === 'Published').length], ['Drafts', posts.filter(p => p.status === 'Draft').length]].map(([label, val]) => (
                    <div key={label as string} className="flex justify-between items-center">
                      <span className="text-steel">{label}</span>
                      <span className="font-bold text-midnight">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-premium">
                <h2 className="text-xl font-bold mb-5">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {SERVICES_DATA.map(s => <span key={s.id} className="px-3 py-1 bg-midnight/5 rounded-full text-xs font-bold text-steel">{s.title}</span>)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Jobs section ─────────────────────────────────────────────────── */}
        {adminSection === 'Jobs' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold">Job Posts</h2>
                  <p className="text-steel">Create, publish, or close roles.</p>
                </div>
                <button onClick={() => { setEditingJob(null); setView('job-editor'); }} className="btn-primary py-2 px-6 flex items-center gap-2 text-sm">
                  <Plus size={18} /> New Job
                </button>
              </div>
              {jobs.length > 0 ? jobs.map(job => (
                <div key={job.id} className="bg-white p-6 rounded-2xl border border-midnight/5 flex flex-col gap-4 hover:border-electric/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold">{job.title}</h3>
                      <p className="text-steel mt-1">{job.department} · {job.location}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-white/5 text-steel">{job.jobType}</span>
                      <span className={`text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full ${job.status === 'Open' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{job.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-steel">Deadline: {job.deadline} · Salary: {job.salaryRange || 'TBD'}</p>
                  <div className="flex gap-3">
                    <button onClick={() => { setEditingJob(job); setView('job-editor'); }} className="px-4 py-2.5 bg-electric/10 text-electric font-bold rounded-xl text-sm">Edit</button>
                    <button onClick={() => window.confirm('Delete job?') && onDeleteJob(job.id)} className="px-4 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl text-sm">Delete</button>
                  </div>
                </div>
              )) : (
                <div className="py-20 text-center card-premium border-dashed"><p className="text-steel">No job posts yet.</p></div>
              )}
            </div>
            <div className="space-y-6">
              <div className="card-premium">
                <h2 className="text-xl font-bold mb-5">Job Metrics</h2>
                <div className="space-y-4">
                  {[['Total Roles', jobs.length], ['Open', jobs.filter(j => j.status === 'Open').length], ['Closed', jobs.filter(j => j.status === 'Closed').length]].map(([label, val]) => (
                    <div key={label as string} className="flex justify-between items-center">
                      <span className="text-steel">{label}</span>
                      <span className="font-bold text-midnight">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Applications section ──────────────────────────────────────────── */}
        {adminSection === 'Applications' && (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold">Applicant Tracking</h2>
                <p className="text-steel">Review applications and download candidate files.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full lg:w-auto">
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-4 text-steel/60" />
                  <input type="text" value={appSearch} onChange={e => setAppSearch(e.target.value)} placeholder="Search applicants"
                    className="w-full pl-12 pr-5 py-4 rounded-full bg-starfield border border-midnight/10 focus:border-electric outline-none transition-all text-steel" />
                </div>
                <select value={appStatus} onChange={e => setAppStatus(e.target.value as ApplicationStatus | 'All')}
                  className="w-full bg-starfield border border-midnight/10 rounded-full px-5 py-4 focus:border-electric outline-none transition-all">
                  {APPLICATION_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {filteredApps.length > 0 ? filteredApps.map(app => (
              <div key={app.id} className="card-premium p-8 border border-midnight/10">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-1">
                    <div className="flex flex-wrap gap-3 items-center">
                      <h3 className="text-2xl font-bold">{app.firstName} {app.lastName}</h3>
                      <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-white/5 text-steel">{app.status}</span>
                    </div>
                    <p className="text-steel">{app.jobTitle}</p>
                    <p className="text-steel text-sm">{app.email} · {app.phone}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => onUpdateApplicationStatus(app.id, app.status === 'New' ? 'Shortlisted' : 'Interview Scheduled')}
                      className="px-4 py-2.5 bg-electric/10 text-electric font-bold rounded-xl text-sm">Next Step</button>
                    <button onClick={() => onDeleteApplication(app.id)} className="px-4 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl text-sm">Remove</button>
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-4 mt-6 text-sm text-steel">
                  {[['Location', app.currentLocation], ['Experience', app.yearsExperience], ['Expected Salary', app.expectedSalary], ['Available', app.availableJoinDate]].map(([label, val]) => (
                    <div key={label as string}><p className="font-bold text-midnight mb-0.5">{label}</p><p>{val}</p></div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={app.resumeDataUrl} download={app.resumeFileName}
                    className="inline-flex items-center gap-2 rounded-2xl bg-midnight/5 px-5 py-3 text-sm font-bold text-steel hover:bg-electric/10 transition-all">
                    <Download size={15} /> Resume
                  </a>
                  {app.coverLetterDataUrl && (
                    <a href={app.coverLetterDataUrl} download={app.coverLetterFileName}
                      className="inline-flex items-center gap-2 rounded-2xl bg-midnight/5 px-5 py-3 text-sm font-bold text-steel hover:bg-electric/10 transition-all">
                      <Download size={15} /> Cover Letter
                    </a>
                  )}
                </div>
              </div>
            )) : (
              <div className="py-20 text-center card-premium border-dashed"><p className="text-steel">No applicants match this filter.</p></div>
            )}
          </div>
        )}

        {/* ── User Management section ───────────────────────────────────────── */}
        {adminSection === 'User Management' && (
          <UserManagement
            users={users}
            currentUserId={currentUser.id}
            onUsersChanged={() => { refreshUsers(); refreshCurrentUser(); }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
