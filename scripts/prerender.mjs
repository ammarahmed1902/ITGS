import fs from 'node:fs/promises';
import {loadEnv} from 'vite';
import {render,allRoutes,notFound,metadata,safeJson,parseSiteConfig,parsePublishedPosts} from '../.build/entry-server.js';
const env={...loadEnv('production',process.cwd(),''),...process.env};
const config=parseSiteConfig(env);
const cmsUrl=env.SUPABASE_URL||env.VITE_SUPABASE_URL;
const key=env.SUPABASE_ANON_KEY||env.VITE_SUPABASE_ANON_KEY;
if(Boolean(cmsUrl)!==Boolean(key))throw new Error('CMS configuration is incomplete: supply both Supabase URL and public read key, or neither.');
let posts=[];
if(cmsUrl&&key){
  if(new URL(cmsUrl).protocol!=='https:')throw new Error('CMS requires HTTPS');
  const response=await fetch(`${cmsUrl}/rest/v1/blog_posts?select=*&status=eq.Published&approved=eq.true&published_at=lte.${encodeURIComponent(new Date().toISOString())}&order=published_at.desc`,{headers:{apikey:key,Authorization:`Bearer ${key}`},signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error(`CMS_READ_FAILED_${response.status}`);
  const parsed=parsePublishedPosts(await response.json());if(parsed.rejected)throw new Error(`CMS_INVALID_RECORDS: ${parsed.rejected}. Correct the records before release.`);posts=parsed.posts;
}else if(env.CMS_REQUIRED==='true')throw new Error('CMS_REQUIRED is set but CMS is not configured.');
if(env.QA_CONTENT_FILE){if(config.production)throw new Error('QA fixtures cannot be published in production.');posts=parsePublishedPosts(JSON.parse(await fs.readFile(env.QA_CONTENT_FILE,'utf8'))).posts;}
const template=await fs.readFile('dist/index.html','utf8');
const registry=allRoutes(posts);
for(const route of [...registry,notFound]){
  const data={route,posts,config};
  const html=template.replace('<!--itgs-head-->',metadata(route,config,posts)).replace('<!--itgs-body-->',await render(data)).replace('<!--itgs-data-->',`<script type="application/json" id="itgs-page-data">${safeJson(data)}</script>`);
  const target=route.key==='NotFound'?'dist/404.html':`dist${route.path}index.html`;
  await fs.mkdir(target.slice(0,target.lastIndexOf('/')),{recursive:true});await fs.writeFile(target,html);
}
const sitemap=config.production?registry.filter(r=>r.indexable&&r.sitemap):[];
const xmlEscape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
await fs.writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap.map(r=>`<url><loc>${xmlEscape(config.origin+r.path)}</loc></url>`).join('')}</urlset>`);
await fs.writeFile('dist/robots.txt',`User-agent: *\nAllow: /\n${config.production?`Sitemap: ${config.origin}/sitemap.xml\n`:''}`);
await fs.writeFile('dist/route-manifest.json',JSON.stringify({origin:config.origin,production:config.production,routes:registry},null,2));
console.log(`Generated ${registry.length} routes plus 404; ${posts.length} approved articles; ${config.production?'production indexing enabled':'preview noindex (not production-ready)'}.`);
