import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../constants';
import { BlogPost } from '../domain/entities/BlogPost';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import { ROUTES } from '../config/site';

const BlogPage = ({ posts }: { posts: BlogPost[] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(SERVICES_DATA.map((s) => s.title)))];

  const filteredPosts = posts.filter(
    (post) => post.status === 'Published' && (selectedCategory === 'All' || post.category === selectedCategory)
  );

  return (
    <>
      <PageMeta title="Insights & Innovation" description="Expert perspectives on the future of technology from ITGS." path={ROUTES.blog} />
      <div className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <PageHeader
            eyebrow="Knowledge Hub"
            title="Insights & Innovation"
            description="Expert perspectives on the future of technology."
          />

          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-3 mb-10" role="group" aria-label="Filter by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`px-5 py-2.5 border rounded-full text-sm font-bold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-electric text-white border-electric shadow-lg shadow-electric/20'
                      : 'bg-white border-midnight/10 text-steel hover:text-electric hover:border-electric'
                  }`}
                >
                  {category === 'All' ? 'All Insights' : category}
                </button>
              ))}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-midnight/10 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((b, i) => (
                <motion.article
                  key={b.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="card-premium flex flex-col"
                >
                  <img
                    src={b.image}
                    alt=""
                    loading="lazy"
                    className="rounded-xl mb-6 aspect-[3/2] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-cyan text-xs font-bold uppercase mb-2">{b.category}</span>
                  <h2 className="text-xl font-bold mb-4 flex-grow">{b.title}</h2>
                  <div className="flex justify-between items-center pt-5 border-t border-midnight/10">
                    <time className="text-steel text-sm" dateTime={b.date}>{b.date}</time>
                    <Link
                      to={ROUTES.blogPost(b.id)}
                      className="text-electric font-bold text-sm hover:underline flex items-center gap-1"
                    >
                      Read More <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full text-center py-20 card-premium border-dashed">
                <p className="text-steel text-xl mb-6">No insights found for this category yet.</p>
                <button type="button" onClick={() => setSelectedCategory('All')} className="btn-outline-light px-8 py-3">
                  View All Insights
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
