import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { BlogPost } from '../domain/entities/BlogPost';
import Breadcrumbs from '../components/Breadcrumbs';
import {routeForKey} from '../lib/routes';
export default function BlogPage({posts,loading,error}:{posts:BlogPost[];loading:boolean;error:string|null}){
 const [category,setCategory]=useState('All');
 const published=posts.filter(p=>p.status==='Published'&&p.approved);
 const categories=['All',...new Set(published.map(p=>p.category))];
 const visible=published.filter(p=>category==='All'||p.category===category);
 return <div className="page-shell"><div className="site-container"><Breadcrumbs items={routeForKey('Blog').breadcrumb}/><span className="eyebrow">Insights</span><h1 className="page-title">Ideas for building, reaching and operating better.</h1><p className="mt-6 max-w-2xl text-lg leading-8">Practical perspectives on digital products, development, design and growth.</p>{published.length>0&&<div className="mt-12 flex flex-wrap gap-2" aria-label="Filter insights">{categories.map(item=><button key={item} aria-pressed={category===item} onClick={()=>setCategory(item)} className={`min-h-11 rounded-md border px-4 text-sm font-medium ${category===item?'border-electric bg-electric text-white':'border-border bg-white text-ink'}`}>{item}</button>)}</div>}<p role="status" aria-live="polite" className="mt-6 text-sm">{loading?'Loading insights.':`${visible.length} articles shown.`}</p>{error&&<p role="alert">{error}</p>}<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visible.map(post=><article key={post.id} className="card overflow-hidden"><a href={`/insights/${post.slug}/`} className="flex h-full flex-col text-left"><img src={post.image} alt={post.imageAlt||''} width="1200" height="630" loading="lazy" className="aspect-[1200/630] w-full object-cover"/><div className="p-6"><span className="eyebrow">{post.category}</span><h2 className="text-2xl leading-8">{post.title}</h2><p className="mt-4 line-clamp-3 text-sm leading-6">{post.excerpt||post.metaDescription}</p><span className="mt-7 inline-flex items-center gap-2 font-semibold">Read article <ArrowUpRight size={16}/></span></div></a></article>)}</div>{!loading&&!error&&visible.length===0&&<p className="card mt-8 p-8">There are no published insights in this category.</p>}</div></div>;
}
