import type { SiteConfig } from './siteConfig';
export type AnalyticsEvent = 'page_view'|'contact_click'|'service_click'|'solution_click'|'case_study_click'|'insight_click';
let config: SiteConfig|undefined;let lastView='';
let consent=false;
const events=new Set<AnalyticsEvent>(['page_view','contact_click','service_click','solution_click','case_study_click','insight_click']);
export function initializeAnalytics(next: SiteConfig){config=next;try{consent=localStorage.getItem('itgs.analytics.consent')==='granted';}catch{consent=false;}}
export function setAnalyticsConsent(granted: boolean){consent=granted;try{localStorage.setItem('itgs.analytics.consent',granted?'granted':'denied');}catch{/* Storage may be disabled. */}if(granted){lastView='';pageView(location.pathname);}}
export function emitAnalytics(event: AnalyticsEvent,path: string){
  if(!events.has(event)||!consent||!config?.analyticsEndpoint) return;
  // Only normalized event names and registered paths: never query strings, form data or provider payloads.
  const payload={event,path:path.split(/[?#]/)[0],timestamp:new Date().toISOString()};
  void fetch(config.analyticsEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),credentials:'omit',keepalive:true}).catch(()=>{});
}
export function pageView(path: string){if(path!==lastView){lastView=path;emitAnalytics('page_view',path);}}
export function reportError(code: 'render_failure'|'route_load_failure'|'cms_invalid_record', config: SiteConfig){
  if(config.monitoringEndpoint) void fetch(config.monitoringEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code}),credentials:'omit',keepalive:true}).catch(()=>{});
}
