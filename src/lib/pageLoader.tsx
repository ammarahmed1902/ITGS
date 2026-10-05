import type { ComponentType } from 'react';
import type { BlogPost } from '../domain/entities/BlogPost';
import type { SiteConfig } from './siteConfig';
import type { Route } from './routes';
export interface PageProps {setActivePage:(page:string)=>void;posts:BlogPost[];loading:boolean;error:null;serviceId:string;config:SiteConfig;route:Route;}
const loaders: Record<string,()=>Promise<{default:ComponentType<PageProps>}>>={
  Home:()=>import('../pages/HomePage'),Services:()=>import('../pages/ServicesPage'),Solutions:()=>import('../pages/SolutionsPage'),Work:()=>import('../pages/WorkPage'),About:()=>import('../pages/AboutPage'),Careers:()=>import('../pages/CareersPage'),Contact:()=>import('../pages/ContactPage'),Blog:()=>import('../pages/BlogPage'),Booking:()=>import('../pages/BookingPage'),NotFound:()=>import('../pages/NotFoundPage'),
  'Service:web-development':()=>import('../pages/WebDevelopmentPage'),'Service:mobile-development':()=>import('../pages/MobileAppDevelopmentPage'),'Service:ui-ux-design':()=>import('../pages/UiUxDesignPage'),'Service:digital-marketing':()=>import('../pages/DigitalMarketingPage'),'Service:seo':()=>import('../pages/SeoPage'),'Service:lead-generation':()=>import('../pages/LeadGenerationPage'),'Service:e-commerce':()=>import('../pages/EcommercePage'),'Service:virtual-assistance':()=>import('../pages/VirtualAssistancePage'),'Service:graphic-design':()=>import('../pages/ServiceDetailPage'),
};
export async function loadPage(route: Route):Promise<ComponentType<PageProps>> {
  if(route.pageType==='article'){const {default:Article}=await import('../pages/ArticlePage');return function ArticleRoute(props:PageProps){return <Article post={props.posts.find(p=>route.key===`Article:${p.slug}`)!}/>;};}
  return (await (loaders[route.key] || loaders.NotFound)()).default;
}
