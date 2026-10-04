import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const headers=JSON.parse(await fs.readFile('vercel.json','utf8')).headers[0].headers;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png'};
http.createServer(async(req,res)=>{
  for(const {key,value} of headers)res.setHeader(key,value);
  let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
  const file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(404);res.end();return;}
  try{
    const stat=await fs.stat(file);
    if(stat.isDirectory()&&!pathname.endsWith('/')){res.writeHead(308,{Location:pathname+'/'+new URL(req.url,'http://localhost').search});res.end();return;}
    const target=stat.isDirectory()?path.join(file,'index.html'):file;
    res.setHeader('Content-Type',mime[path.extname(target)]||'application/octet-stream');res.end(await fs.readFile(target));
  }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await fs.readFile(path.join(root,'404.html')));}
}).listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log(`Static preview: http://127.0.0.1:${process.env.PORT||4173}`));
