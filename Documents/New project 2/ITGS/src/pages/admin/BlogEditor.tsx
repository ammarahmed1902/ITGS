import React, { useState, useEffect } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { BlogPost } from '../../domain/entities/BlogPost';
import { SERVICES_DATA } from '../../constants';

interface Props {
  editingPost: BlogPost | null;
  onSave: (post: BlogPost) => Promise<void>;
  onBack: () => void;
}

export default function BlogEditor({ editingPost, onSave, onBack }: Props) {
  const [form, setForm] = useState({
    title: '',
    category: SERVICES_DATA[0].title,
    image: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
  });

  useEffect(() => {
    if (editingPost) {
      setForm({
        title: editingPost.title,
        category: editingPost.category,
        image: editingPost.image,
        content: editingPost.content,
        metaTitle: editingPost.metaTitle || '',
        metaDescription: editingPost.metaDescription || '',
      });
    } else {
      setForm({ title: '', category: SERVICES_DATA[0].title, image: '', content: '', metaTitle: '', metaDescription: '' });
    }
  }, [editingPost]);

  const handleSave = async (status: 'Published' | 'Draft') => {
    const post: BlogPost = {
      id: editingPost ? editingPost.id : Date.now().toString(),
      ...form,
      status,
      date: editingPost
        ? editingPost.date
        : new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      views: editingPost ? editingPost.views : 0,
      readTime: editingPost ? editingPost.readTime : '5m',
    };
    await onSave(post);
    onBack();
  };

  const f = (field: string) => ({
    className: 'w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all',
  });

  return (
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-midnight/10 flex items-center justify-center text-midnight hover:border-electric transition-colors">
            <ArrowRight size={20} className="rotate-180" />
          </button>
          <div>
            <h1 className="text-4xl font-bold">{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
            <p className="text-steel">Manage the editorial workflow with draft and publish controls.</p>
          </div>
        </div>

        <div className="card-premium p-10 space-y-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Post Title</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} {...f('title')} placeholder="Enter a compelling title..." />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-steel">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all appearance-none">
                {SERVICES_DATA.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-steel">Featured Image URL</label>
            <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} {...f('image')} placeholder="https://images.unsplash.com/..." />
          </div>

          <div className="pt-8 border-t border-midnight/5 space-y-6">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-electric" />
              <h3 className="text-sm font-bold uppercase tracking-widest">SEO Meta Data</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-steel">Meta Title</label>
                <input type="text" value={form.metaTitle} onChange={e => setForm({ ...form, metaTitle: e.target.value })} {...f('metaTitle')} placeholder="SEO Title (max 60 chars)" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-steel">Meta Description</label>
                <input type="text" value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} {...f('metaDescription')} placeholder="SEO Description (max 160 chars)" />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-midnight/5 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-steel">Post Content</label>
            <textarea rows={12} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
              className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all resize-none"
              placeholder="Write your expert perspective here..." />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-midnight/5">
            <button onClick={onBack} className="px-8 py-4 font-bold text-steel hover:text-midnight transition-colors">Discard</button>
            <div className="flex gap-4">
              <button onClick={() => handleSave('Draft')} className="px-8 py-4 bg-midnight/5 hover:bg-midnight/10 text-midnight font-bold rounded-xl transition-all">Save as Draft</button>
              <button onClick={() => handleSave('Published')} className="btn-primary px-12 py-4">Publish Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
