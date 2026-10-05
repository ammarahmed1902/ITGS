import {routeForKey,resolveRoute} from './routes';
import {emitAnalytics} from './analytics';
export const pathForPage=(page:string)=>routeForKey(page).path;
export const servicePath=(id:string)=>routeForKey(`Service:${id}`).path;
export const pageFromPath=(path:string)=>resolveRoute(path).key;
// App owns normalized anchor analytics; retained for existing component compatibility.
export function trackSiteEvent(eventName:string,_details:Record<string,string>={}){
  if(typeof window==='undefined')return;
  const path=resolveRoute(location.pathname).path;
  if(/contact|cta|discuss/.test(eventName))emitAnalytics('contact_click',path);
}
