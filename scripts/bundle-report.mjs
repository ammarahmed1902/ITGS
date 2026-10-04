import fs from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
const manifest=JSON.parse(await fs.readFile('dist/.vite/manifest.json','utf8'));
function imports(key,seen=new Set()){if(seen.has(key))return seen;seen.add(key);for(const dep of manifest[key]?.imports||[])imports(dep,seen);return seen;}
const entry=Object.keys(manifest).find(key=>manifest[key].isEntry);
const pages=Object.keys(manifest).filter(key=>key.startsWith('src/pages/'));
const results=[];
for(const page of [entry,...pages]){const keys=new Set([...imports(entry),...imports(page)]);let bytes=0,gzip=0;for(const key of keys){const data=await fs.readFile('dist/'+manifest[key].file);bytes+=data.length;gzip+=gzipSync(data).length;}results.push({page,bytes,gzip,files:[...keys].map(key=>manifest[key].file)});}
await fs.mkdir('output/remediation',{recursive:true});await fs.writeFile('output/remediation/bundle-comparison.json',JSON.stringify({baseline:{bytes:828790,gzip:213900},routes:results},null,2));console.log(results.map(r=>`${r.page}: ${r.bytes} bytes; ${r.gzip} gzip`).join('\n'));
