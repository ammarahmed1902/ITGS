import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const original=await fs.readFile('src/assets/images/ITGS Logo.png','utf8');
const optimized=await fs.readFile('output/remediation/logo-optimized.svg','utf8');
const browser=await chromium.launch();const page=await browser.newPage();
const result=await page.evaluate(async({original,optimized})=>{
 async function pixels(svg){const image=new Image();image.src='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(svg)));await image.decode();const canvas=document.createElement('canvas');canvas.width=104;canvas.height=80;const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,104,80);ctx.drawImage(image,12,0,80,80);return ctx.getImageData(0,0,104,80).data;}
 const a=await pixels(original),b=await pixels(optimized);let total=0,different=0;for(let i=0;i<a.length;i++){total+=Math.abs(a[i]-b[i]);if(Math.abs(a[i]-b[i])>20)different++;}return {meanChannelDifference:total/a.length,changedChannelFraction:different/a.length};
},{original,optimized});await browser.close();
await fs.writeFile('output/remediation/logo-comparison.json',JSON.stringify(result,null,2));
if(result.meanChannelDifference>1||result.changedChannelFraction>0.01)throw new Error('Logo needs visual review before replacement');
await fs.writeFile('output/remediation/logo-original.svg',original);await fs.copyFile('output/remediation/logo-optimized.svg','src/assets/images/ITGS Logo.png');console.log(result);
