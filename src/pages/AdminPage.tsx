import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, LogOut, Plus, Edit, Trash2, ArrowRight, Upload, Image as ImageIcon, Info } from 'lucide-react';
import { SERVICES_DATA } from '../constants';
import { BlogPost } from '../domain/entities/BlogPost';

interface AdminPageProps {
  posts: BlogPost[];
  onSave: (post: BlogPost) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const AdminPage = ({ posts, onSave, onDelete }: AdminPageProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<'Published' | 'Draft'>('Published');

  const [form, setForm] = useState({
    title: '',
    category: SERVICES_DATA[0].title,
    image: '',
    content: '',
    metaTitle: '',
    metaDescription: ''
  });

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'blogarouthawrite' && password === 'Cn/X#J39q@RKAwz5Z(MBTt<b^SN!+6') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSave = async (status: 'Published' | 'Draft') => {
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
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await onDelete(id);
    }
  };

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
            <p className="text-steel mt-2">Access the ITGS blog management system.</p>
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

  if (view === 'editor') {
    return (
      <div className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <button 
              onClick={() => setView('dashboard')}
              className="w-10 h-10 rounded-full bg-white border border-midnight/10 flex items-center justify-center text-midnight hover:border-electric transition-colors"
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <h1 className="text-4xl font-bold">{editingPost ? 'Edit Post' : 'Create New Post'}</h1>
          </div>

          <div className="card-premium p-10 space-y-10">
            {/* Basic Info */}
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Post Title</label>
                  <input 
                    type="text" 
                    value={form.title}
                    onChange={(e) => setForm({...form, title: e.target.value})}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="Enter a compelling title..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Category</label>
                  <select 
                    value={form.category}
                    onChange={(e) => setForm({...form, category: e.target.value})}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all appearance-none"
                  >
                    {SERVICES_DATA.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Upload Section */}
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
                        onChange={(e) => setForm({...form, image: e.target.value})}
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

            {/* SEO Section */}
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
                    onChange={(e) => setForm({...form, metaTitle: e.target.value})}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="SEO Title (max 60 chars)"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">Meta Description</label>
                  <input 
                    type="text" 
                    value={form.metaDescription}
                    onChange={(e) => setForm({...form, metaDescription: e.target.value})}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="SEO Description (max 160 chars)"
                  />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="pt-8 border-t border-midnight/5 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Post Content</label>
              <textarea 
                rows={12}
                value={form.content}
                onChange={(e) => setForm({...form, content: e.target.value})}
                className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all resize-none"
                placeholder="Write your expert perspective here..."
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-midnight/5">
              <button 
                onClick={() => setView('dashboard')}
                className="px-8 py-4 font-bold text-steel hover:text-midnight transition-colors"
              >
                Discard
              </button>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleSave('Draft')}
                  className="px-8 py-4 bg-midnight/5 hover:bg-midnight/10 text-midnight font-bold rounded-xl transition-all"
                >
                  Save as Draft
                </button>
                <button 
                  onClick={() => handleSave('Published')}
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

  const filteredPosts = posts.filter(p => p.status === activeTab);
  const totalViews = posts.reduce((acc, p) => acc + p.views, 0);
  const formattedViews = totalViews >= 1000 ? (totalViews / 1000).toFixed(1) + 'k' : totalViews;

  return (
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Admin Dashboard</span>
            <h1 className="text-5xl font-bold">Blog Management</h1>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 text-steel hover:text-red-500 transition-colors font-bold">
            <LogOut size={20} /> Logout
          </button>
        </div>

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
                  setView('editor');
                }}
                className="btn-primary py-2 px-6 flex items-center gap-2 text-sm"
              >
                <Plus size={18} /> New Post
              </button>
            </div>
            
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, i) => (
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
                        setView('editor');
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
                <p className="text-steel">No {activeTab.toLowerCase()} posts found.</p>
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
                {SERVICES_DATA.map(s => (
                  <span key={s.id} className="px-3 py-1 bg-midnight/5 rounded-full text-xs font-bold text-steel">
                    {s.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
