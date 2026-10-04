import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
const manifest=JSON.parse(fs.readFileSync('dist/route-manifest.json','utf8'));
test('all routes: raw identity, hydration, no runtime errors and responsive overflow',async({page})=>{
 test.setTimeout(120000);
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const route of manifest.routes){const response=await page.goto(route.path);expect(response?.status()).toBe(200);await expect(page).toHaveTitle(route.title);await expect(page.locator('h1')).toHaveCount(1);for(const width of [320,375,390,768,1024,1280,1440]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${route.path} at ${width}`).toBe(true);}}
 expect(errors).toEqual([]);
});
test('unknown and unpublished pages are real 404s',async({request})=>{for(const path of ['/random-page/','/contact/','/qa-missing-page/','/services/not-real/','/work/not-real/','/company/team/','/company/reviews/']){const r=await request.get(path);expect(r.status()).toBe(404);expect(await r.text()).toContain('Page not found.');}});
test('skip link, mobile menu and solution fragment focus',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to main content'})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 const menu=page.getByRole('button',{name:'Menu',exact:true});await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Escape');await expect(menu).toBeFocused();await expect(menu).toHaveAttribute('aria-expanded','false');
 await page.locator('a[href="/solutions/#improve-organic-visibility"]').first().click();await expect(page).toHaveURL(/\/solutions\/#improve-organic-visibility$/);await expect(page.locator('#improve-organic-visibility')).toBeFocused();await page.reload();await expect(page.locator('#improve-organic-visibility')).toBeVisible();
});
test('desktop escape and booking isolation',async({page})=>{
 await page.goto('/');const services=page.getByRole('button',{name:'Services',exact:true});await services.click();await page.keyboard.press('Escape');await expect(services).toBeFocused();await expect(services).toHaveAttribute('aria-expanded','false');
 await page.getByRole('link',{name:'Book a strategy call',exact:true}).first().click();await expect(page).toHaveURL(/book-a-strategy-call\/$/);await expect(page.locator('h1')).toBeFocused();await expect(page.locator('iframe')).toHaveCount(0);await expect(page.getByRole('link',{name:'Open Calendly'})).toHaveAttribute('href',/^https:\/\/calendly.com\//);
});
test('native FAQs respond to keyboard',async({page})=>{await page.goto('/services/web-development/');const summary=page.locator('summary').first();await summary.focus();await page.keyboard.press('Enter');await expect(page.locator('details').first()).toHaveAttribute('open','');});
test('automated accessibility on representative templates',async({page},info)=>{test.setTimeout(180000);const results=[];for(const path of ['/','/services/','/services/web-development/','/solutions/','/work/','/company/about/','/insights/','/book-a-strategy-call/']){await page.goto(path);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();results.push({path,violations:result.violations});}await info.attach('axe-results',{body:JSON.stringify(results,null,2),contentType:'application/json'});expect(results.flatMap(r=>r.violations.map(v=>({path:r.path,id:v.id,nodes:v.nodes.map(n=>n.target)})))).toEqual([]);});
test('approved article URL, filter, reload and history',async({page,request})=>{
 const article=manifest.routes.find((r:{pageType:string})=>r.pageType==='article');test.skip(!article,'No approved article in this build; run the controlled QA content build.');
 await page.goto('/insights/');await page.getByRole('button',{name:'Testing',exact:true}).click();await expect(page.getByRole('button',{name:'Testing',exact:true})).toHaveAttribute('aria-pressed','true');await expect(page.getByRole('status')).toContainText('1 articles shown.');await page.locator(`a[href="${article.path}"]`).click();await expect(page).toHaveURL(new RegExp(article.path));await expect(page.locator('h1')).toBeFocused();await page.reload();await expect(page).toHaveTitle(article.title);await page.goBack();await expect(page).toHaveURL(/\/insights\/$/);expect((await request.get('/insights/qa-draft/')).status()).toBe(404);
});
test('configured analytics collects once and consent suppresses tracking',async({page})=>{
 const events:{event:string;path:string}[]=[];await page.route('https://analytics.example.test/events',async route=>{events.push(route.request().postDataJSON());await route.fulfill({status:204});});
 await page.goto('/');const preference=page.getByRole('button',{name:'Analytics preferences'});test.skip(await preference.count()===0,'No approved collector configured; use QA analytics endpoint build.');await preference.click();await page.getByRole('button',{name:'Allow analytics',exact:true}).click();await expect.poll(()=>events.filter(e=>e.event==='page_view').length).toBe(1);
 await page.getByRole('link',{name:'Book a strategy call',exact:true}).first().click();await expect.poll(()=>events.filter(e=>e.event==='page_view').length).toBe(2);expect(events.filter(e=>e.event==='strategy_call_click')).toHaveLength(1);
 await preference.click();await page.getByRole('button',{name:'Reject analytics',exact:true}).click();await page.locator('a[href="/services/"]').first().click();await page.waitForTimeout(150);expect(events.filter(e=>e.event==='page_view')).toHaveLength(2);for(const event of events)expect(Object.keys(event).sort()).toEqual(['event','path','timestamp']);
});
test('renderer failure presents recovery UI rather than a blank page',async({page})=>{
 await page.route('**/company/careers/',async route=>{const response=await route.fetch();let html=await response.text();html=html.replace(/(<script type="application\/json" id="itgs-page-data">)(.*?)(<\/script>)/,(_,open,json,close)=>{const data=JSON.parse(json);data.route={...data.route,key:'Article:missing-test-record',pageType:'article'};return open+JSON.stringify(data)+close;});await route.fulfill({response,body:html});});
 await page.goto('/company/careers/');await expect(page.getByRole('heading',{name:'We couldn’t display this page.'})).toBeVisible();await expect(page.getByRole('button',{name:'Try again'})).toBeVisible();
});
