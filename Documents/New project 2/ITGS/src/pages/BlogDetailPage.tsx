import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '../domain/entities/BlogPost';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import { ROUTES } from '../config/site';

const BlogDetailPage = ({ posts }: { posts: BlogPost[] }) => {
  const { postId } = useParams<{ postId: string }>();
  const post = posts.find((p) => p.id === postId && p.status === 'Published');

  if (!post) {
    return (
      <>
        <PageMeta title="Article Not Found" noIndex path={`/blog/${postId}`} />
        <div className="pt-32 pb-24 bg-starfield min-h-screen">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-extrabold mb-4">Article Not Found</h1>
            <p className="text-steel mb-10">This insight may have been moved or is not yet published.</p>
            <Link to={ROUTES.blog} className="btn-primary px-10 py-4">
              Back to Blog
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.content.slice(0, 160)}
        path={ROUTES.blogPost(post.id)}
        type="article"
        image={post.image}
      />
      <article className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            to={ROUTES.blog}
            className="inline-flex items-center gap-2 text-electric text-xs font-bold uppercase tracking-widest mb-10 hover:gap-3 transition-all"
          >
            <ArrowRight size={14} className="rotate-180" aria-hidden="true" /> Back to Insights
          </Link>
          <Reveal>
            <span className="text-cyan text-xs font-bold uppercase tracking-widest mb-4 block">{post.category}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{post.title}</h1>
            <div className="flex flex-wrap gap-4 text-steel text-sm mb-10">
              <time dateTime={post.date}>{post.date}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime} read</span>
            </div>
            <img
              src={post.image}
              alt=""
              loading="lazy"
              className="w-full rounded-3xl mb-12 shadow-xl"
              referrerPolicy="no-referrer"
            />
            <div className="prose prose-lg max-w-none text-steel leading-relaxed space-y-6">
              {post.content.split('\n').filter(Boolean).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {post.content.length < 200 && (
                <p>
                  At ITGS, we believe that {post.category.toLowerCase()} is not just a technical discipline — it is a
                  strategic advantage. Our teams combine deep expertise with psychology-driven design to deliver outcomes
                  that scale across global markets.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
};

export default BlogDetailPage;
