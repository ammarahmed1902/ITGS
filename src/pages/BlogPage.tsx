import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../constants';
import { BlogPost } from '../domain/entities/BlogPost';

const BlogPage = ({ posts }: { posts: BlogPost[] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = posts.filter(post => 
    post.status === 'Published' && (selectedCategory === 'All' || post.category === selectedCategory)
  );

  return (
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Insights & Innovation</h1>
          <p className="text-steel">Expert perspectives on the future of technology.</p>
        </div>

        {/* Service Categories Section */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-3 border rounded-full text-sm font-bold transition-all duration-300 backdrop-blur-sm ${
                selectedCategory === 'All' 
                  ? 'bg-electric text-white border-electric shadow-lg shadow-electric/20' 
                  : 'bg-white/5 border-white/10 text-steel hover:text-electric hover:border-electric'
              }`}
            >
              All Insights
            </button>
            {SERVICES_DATA.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedCategory(service.title)}
                className={`px-6 py-3 border rounded-full text-sm font-bold transition-all duration-300 backdrop-blur-sm ${
                  selectedCategory === service.title 
                    ? 'bg-electric text-white border-electric shadow-lg shadow-electric/20' 
                    : 'bg-white/5 border-white/10 text-steel hover:text-electric hover:border-electric'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((b, i) => (
              <motion.div 
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-premium flex flex-col"
              >
                <img src={b.image || `https://picsum.photos/seed/blog-${b.title}/600/400`} alt={b.title} className="rounded-xl mb-6" referrerPolicy="no-referrer" />
                <div className="text-cyan text-xs font-bold uppercase mb-2">{b.category}</div>
                <h3 className="text-xl font-bold mb-4 flex-grow">{b.title}</h3>
                <div className="flex justify-between items-center pt-6 border-t border-midnight/5">
                  <span className="text-steel text-sm">{b.date}</span>
                  <button className="text-electric font-bold text-sm hover:underline">Read More</button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-steel text-xl">No insights found for this category yet. Check back soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
