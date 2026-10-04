import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const manifest=JSON.parse(await fs.readFile('dist/route-manifest.json','utf8'));
test('every published static route has unique raw identity and parseable schema',async()=>{
 const titles=new Set();
 for(const route of manifest.routes){const html=await fs.readFile(`dist${route.path}index.html`,'utf8');assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,route.path);assert.match(html,/<main[^>]*>[\s\S]+<\/main>/);assert.ok(html.includes(`href="${manifest.origin+route.path}"`));const title=html.match(/<title>(.*?)<\/title>/)[1];assert.ok(!titles.has(title));titles.add(title);JSON.parse(html.match(/id="itgs-structured-data"[^>]*>(.*?)<\/script>/)[1]);assert.ok(!/The Psychology of Trust|being prepared|previous unverified/.test(html));assert.ok(html.includes(manifest.production?'index, follow':'noindex, follow'));}
});
test('404 has unavailable identity and no homepage canonical',async()=>{const html=await fs.readFile('dist/404.html','utf8');assert.match(html,/Page not found/);assert.match(html,/noindex, follow/);assert.ok(!html.includes('rel="canonical"'));});
test('XML sitemap equals the published indexable registry',async()=>{const xml=await fs.readFile('dist/sitemap.xml','utf8');const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.deepEqual(urls,manifest.production?manifest.routes.filter(r=>r.indexable&&r.sitemap).map(r=>manifest.origin+r.path):[]);});
