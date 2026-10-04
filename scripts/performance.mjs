import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch();
const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
const page=await context.newPage();const cdp=await context.newCDPSession(page);
await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
await page.addInitScript(()=>{window.qa={lcp:null,cls:0,eventDurations:[]};new PerformanceObserver(list=>{for(const e of list.getEntries())window.qa.lcp={ms:e.startTime,tag:e.element?.tagName,text:e.element?.textContent?.slice(0,100)};}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.qa.cls+=e.value;}).observe({type:'layout-shift',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(e.interactionId)window.qa.eventDurations.push(e.duration);}).observe({type:'event',durationThreshold:16,buffered:true});});
const manifest=JSON.parse(await fs.readFile('dist/route-manifest.json','utf8'));const results=[];
await context.tracing.start({screenshots:true,snapshots:true});
for(const route of manifest.routes){await cdp.send('Network.clearBrowserCache');await page.goto('http://127.0.0.1:4175'+route.path,{waitUntil:'networkidle'});await page.waitForTimeout(500);await page.getByRole('button',{name:'Menu',exact:true}).click();await page.keyboard.press('Escape');await page.waitForTimeout(100);results.push(await page.evaluate(()=>({path:location.pathname,...window.qa})));}
await context.tracing.stop({path:'output/playwright/throttled-mobile-trace.zip'});await fs.writeFile('output/remediation/throttled-mobile.json',JSON.stringify({conditions:{latency:150,downloadBytesPerSecond:200000,cpuSlowdown:4,viewport:'390x844',runs:1},note:'Lab samples. Event durations are interaction diagnostics, not field INP; CLS is an observed short-window sum.',results},null,2));await browser.close();console.log(`Measured ${results.length} route templates.`);
