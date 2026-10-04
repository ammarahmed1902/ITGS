import type { BlogPost } from '../domain/entities/BlogPost';
function string(value: unknown): value is string {return typeof value==='string' && value.trim().length>0;}
function https(value: unknown): value is string {try{return string(value)&&new URL(value).protocol==='https:';}catch{return false;}}
export function parsePublishedPosts(value: unknown, now = Date.now()): { posts: BlogPost[]; rejected: number } {
  if(!Array.isArray(value)) throw new Error('CMS_INVALID_RESPONSE');
  const posts: BlogPost[]=[];const slugs=new Set<string>();let rejected=0;
  for(const item of value){
    if(!item || typeof item!=='object'){rejected++;continue;}
    const r=item as Record<string,unknown>;
    if(r.status!=='Published'||r.approved!==true) continue;
    const date=typeof r.published_at==='string'?Date.parse(r.published_at):NaN;
    if(Number.isFinite(date)&&date>now) continue;
    if(!string(r.id)||!string(r.slug)||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.slug)||slugs.has(r.slug)||!string(r.title)||!string(r.author)||!string(r.content)||!string(r.category)||!string(r.meta_description)||!Number.isFinite(date)||!https(r.image_url)||!string(r.image_alt)|| (r.share_image_url!=null&&!https(r.share_image_url)) || (r.updated_at!=null && (typeof r.updated_at!=='string'||!Number.isFinite(Date.parse(r.updated_at)))) || ['meta_title','excerpt','read_time'].some(key=>r[key]!=null&&typeof r[key]!=='string')){rejected++;continue;}
    slugs.add(r.slug);
    posts.push({id:r.id,slug:r.slug,title:r.title,author:r.author,approved:true,status:'Published',content:r.content,category:r.category,publishedAt:new Date(date).toISOString(),date:new Date(date).toLocaleDateString('en-US',{month:'short',day:'2-digit',year:'numeric',timeZone:'UTC'}),image:r.image_url,imageAlt:r.image_alt,shareImage:r.share_image_url as string|undefined,updatedAt:r.updated_at as string|undefined,metaTitle:r.meta_title as string|undefined,metaDescription:r.meta_description,excerpt:r.excerpt as string|undefined,readTime:typeof r.read_time==='string'?r.read_time:`${Math.max(1,Math.ceil(r.content.split(/\s+/).length/200))} min`,views:0});
  }
  return {posts,rejected};
}
