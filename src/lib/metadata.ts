import type { Route } from './routes';
import type { SiteConfig } from './siteConfig';
import type { BlogPost } from '../domain/entities/BlogPost';
export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g,'\\u003c');
export function metadata(route: Route, config: SiteConfig, posts: BlogPost[]) {
  const url = config.origin + route.path;
  const post = posts.find(p=>route.key===`Article:${p.slug}`);
  const graph: Record<string,unknown>[] = [
    {'@type':'Organization','@id':`${config.origin}/#organization`,name:'ITGS',url:config.origin},
    {'@type':'WebSite','@id':`${config.origin}/#website`,name:'ITGS',url:config.origin,publisher:{'@id':`${config.origin}/#organization`}},
    {'@type':'WebPage',name:route.title,description:route.description,url,isPartOf:{'@id':`${config.origin}/#website`}},
  ];
  if(route.breadcrumb.length) graph.push({'@type':'BreadcrumbList',itemListElement:route.breadcrumb.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,item:config.origin+item.path}))});
  if(route.pageType==='service') graph.push({'@type':'Service',name:route.breadcrumb.at(-1)?.name,description:route.description,url,provider:{'@id':`${config.origin}/#organization`}});
  if(post) graph.push({'@type':'Article',headline:post.title,description:route.description,datePublished:post.publishedAt,dateModified:post.updatedAt || post.publishedAt,author:{'@type':'Person',name:post.author},image:post.image,mainEntityOfPage:url,publisher:{'@id':`${config.origin}/#organization`}});
  const image=post?.shareImage || post?.image || config.shareImage;
  const tags=[['name','description',route.description],['name','robots',config.production&&route.indexable?'index, follow':'noindex, follow'],['property','og:type',post?'article':'website'],['property','og:site_name','ITGS'],['property','og:title',route.title],['property','og:description',route.description],['property','og:url',url],['name','twitter:card',image?'summary_large_image':'summary'],['name','twitter:title',route.title],['name','twitter:description',route.description]];
  if(image) tags.push(['property','og:image',image],['property','og:image:alt',post?.imageAlt || 'ITGS — software, digital products and growth'],['name','twitter:image',image],['name','twitter:image:alt',post?.imageAlt || 'ITGS']);
  if(image && !post && config.shareImageWidth && config.shareImageHeight)tags.push(['property','og:image:width',String(config.shareImageWidth)],['property','og:image:height',String(config.shareImageHeight)]);
  return `<title>${escapeHtml(route.title)}</title>\n${tags.map(([key,name,value])=>`<meta ${key}="${name}" content="${escapeHtml(value)}" data-itgs-meta>`).join('\n')}\n${route.indexable?`<link rel="canonical" href="${escapeHtml(url)}" data-itgs-meta>`:''}\n<script id="itgs-structured-data" type="application/ld+json" data-itgs-meta>${safeJson({'@context':'https://schema.org','@graph':graph})}</script>`;
}
export function updateMetadata(route: Route, config: SiteConfig, posts: BlogPost[]) {
  const template=document.createElement('template');template.innerHTML=metadata(route,config,posts);
  document.head.querySelectorAll('[data-itgs-meta],title').forEach(el=>el.remove());
  document.head.append(template.content);
}
