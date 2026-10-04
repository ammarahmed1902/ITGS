import { useCallback, useEffect, useRef, useState, type ComponentType, type MouseEvent } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import {loadPage,type PageProps} from './lib/pageLoader';
import {resolveRoute,routeForKey,type Route} from './lib/routes';
import type {BlogPost} from './domain/entities/BlogPost';
import type {SiteConfig} from './lib/siteConfig';
import {updateMetadata} from './lib/metadata';
import {initializeAnalytics,pageView,emitAnalytics,reportError,setAnalyticsConsent} from './lib/analytics';
export interface AppData {route:Route;posts:BlogPost[];config:SiteConfig;}
export default function App({data,initialPage}:{data:AppData;initialPage:ComponentType<PageProps>}) {
  const [view,setView]=useState({route:data.route,Page:initialPage});
  const [navigationError,setNavigationError]=useState(false);
  const [preferences,setPreferences]=useState(false);
  const [focusRequest,setFocusRequest]=useState<string|null>(null);
  const sequence=useRef(0);
  const navigate=useCallback(async (href:string,history:'push'|'pop'='push')=>{
    const url=new URL(href,window.location.origin);const next=resolveRoute(url.pathname,data.posts);
    if(next.key==='NotFound'){window.location.assign(url.href);return;}
    const request=++sequence.current;
    try{const Page=await loadPage(next);if(request!==sequence.current)return;
      if(history==='push'&&location.pathname+location.hash!==next.path+url.hash)window.history.pushState({},'',next.path+url.hash);
      setView({route:next,Page});setFocusRequest(url.hash);setNavigationError(false);
    }catch{setNavigationError(true);reportError('route_load_failure',data.config);}
  },[data.posts,data.config]);
  useEffect(()=>{initializeAnalytics(data.config);if(location.hash)setFocusRequest(location.hash);const back=()=>{void navigate(location.pathname+location.hash,'pop');};window.addEventListener('popstate',back);return()=>window.removeEventListener('popstate',back);},[navigate,data.config]);
  useEffect(()=>{updateMetadata(view.route,data.config,data.posts);pageView(view.route.path);},[view.route,data.config,data.posts]);
  useEffect(()=>{
    if(focusRequest===null)return;
    let id=focusRequest.slice(1);try{id=decodeURIComponent(id);}catch{/* Invalid fragments do not affect page availability. */}
    const target=(focusRequest?document.getElementById(id):null)||document.querySelector<HTMLElement>('main h1')||document.getElementById('main-content');
    if(target){target.tabIndex=-1;target.focus({preventScroll:true});if(focusRequest)target.scrollIntoView();else window.scrollTo(0,0);}
    setFocusRequest(null);
  },[view,focusRequest]);
  function capture(event:MouseEvent){
    const anchor=(event.target as Element).closest<HTMLAnchorElement>('a[href]');if(!anchor)return;
    const url=new URL(anchor.href,location.href);
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0){event.stopPropagation();return;}
    if(url.origin!==location.origin||anchor.target==='_blank'||anchor.hasAttribute('download')||anchor.getAttribute('href')==='#main-content')return;
    const next=resolveRoute(url.pathname,data.posts);if(next.key==='NotFound')return;
    event.preventDefault();event.stopPropagation();
    if(next.key==='Booking')emitAnalytics('strategy_call_click',view.route.path);
    else if(next.pageType==='service')emitAnalytics('service_click',next.path);
    else if(next.key==='Solutions')emitAnalytics('solution_click',next.path);
    else if(next.pageType==='article')emitAnalytics('insight_click',next.path);
    void navigate(next.path+url.hash);
  }
  return <div className="min-h-screen bg-starfield" onClickCapture={capture}>
    <a href="#main-content" tabIndex={0} className="skip-link">Skip to main content</a>
    <Navbar key={view.route.path} activePage={view.route.key} setActivePage={page=>void navigate(routeForKey(page,data.posts).path)}/>
    {navigationError&&<div className="fixed inset-x-4 top-24 z-50 rounded-lg border bg-white p-4" role="alert">This page could not load. Please try the link again or reload.</div>}
    <main id="main-content" tabIndex={-1}><ErrorBoundary key={view.route.path} config={data.config}><view.Page setActivePage={page=>void navigate(routeForKey(page,data.posts).path)} posts={data.posts} loading={false} error={null} serviceId={view.route.key.slice(8)} config={data.config} route={view.route}/></ErrorBoundary></main>
    <Footer setActivePage={page=>void navigate(routeForKey(page,data.posts).path)} compact={view.route.pageType==='service'}/>
    {(data.config.privacyUrl||data.config.analyticsEndpoint)&&<div className="bg-midnight px-5 pb-6 text-center text-sm text-white"><div className="flex justify-center gap-6">{data.config.privacyUrl&&<a className="underline" href={data.config.privacyUrl}>Privacy notice</a>}{data.config.analyticsEndpoint&&<button onClick={()=>setPreferences(v=>!v)} className="underline" aria-expanded={preferences}>Analytics preferences</button>}</div>{preferences&&<div className="mx-auto mt-4 max-w-xl rounded-md border border-white/30 p-5"><p>Allow optional analytics to help us understand page visits and booking actions? No form details are collected by this site's analytics.</p><div className="mt-4 flex justify-center gap-4"><button className="btn-light" onClick={()=>{setAnalyticsConsent(true);setPreferences(false);}}>Allow analytics</button><button className="btn-outline-dark" onClick={()=>{setAnalyticsConsent(false);setPreferences(false);}}>Reject analytics</button></div></div>}</div>}
  </div>;
}
