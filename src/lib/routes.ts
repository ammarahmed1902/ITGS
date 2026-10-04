import type { BlogPost } from '../domain/entities/BlogPost';

export type ServiceId = 'web-development' | 'mobile-development' | 'ui-ux-design' | 'graphic-design' | 'digital-marketing' | 'seo' | 'lead-generation' | 'e-commerce' | 'virtual-assistance';
export type PageKey = 'Home' | 'Services' | 'Solutions' | 'Work' | 'About' | 'Careers' | 'Blog' | 'Booking' | 'NotFound' | `Service:${ServiceId}` | `Article:${string}`;
export interface Route { key: PageKey; path: string; title: string; description: string; pageType: 'home' | 'hub' | 'service' | 'company' | 'article' | 'booking' | 'error'; indexable: boolean; sitemap: boolean; breadcrumb: {name: string; path: string}[]; }
const home = {name: 'Home', path: '/'};
function route(key: PageKey, path: string, label: string, title: string, description: string, pageType: Route['pageType']): Route {
  return {key, path, title, description, pageType, indexable: true, sitemap: true, breadcrumb: key === 'Home' ? [] : [home, ...(pageType === 'service' ? [{name:'Services', path:'/services/'}] : []), {name:label, path}]};
}
export const routes: Route[] = [
  route('Home','/','Home','ITGS — Software, Digital Products & Growth','ITGS connects software development, digital products, design and digital growth in one accountable team.','home'),
  route('Services','/services/','Services','Digital & Technology Services | ITGS','Explore ITGS services across software development, design, digital growth and operational support.','hub'),
  route('Solutions','/solutions/','Solutions','Business & Digital Solutions | ITGS','Explore ITGS solutions organized around launching, improving, growing and operating digital products and business systems.','hub'),
  route('Work','/work/','Our Work','Internal Design Concepts | ITGS','Explore self-initiated ITGS design concepts. These examples are not client work and make no performance claims.','hub'),
  route('About','/company/about/','About','About ITGS | Digital Product, Technology & Growth Partner','Learn about ITGS and our connected approach to product design, software engineering, digital growth and operational support.','company'),
  route('Careers','/company/careers/','Careers','Careers at ITGS | Current Openings','Check current published opportunities at ITGS. There are no published openings at this time.','company'),
  route('Blog','/insights/','Insights','Digital Product & Growth Insights | ITGS','Practical ITGS insights on digital products, development, design and sustainable growth.','hub'),
  route('Booking','/book-a-strategy-call/','Book a strategy call','Book a Strategy Call | ITGS','Book a strategy call with ITGS to discuss your digital product, platform or growth objective.','booking'),
  ...([
    ['web-development','web-development','Web Development','Custom websites, portals and web applications built around business requirements, user experience, performance and search readiness.'],
    ['mobile-development','mobile-app-development','Mobile App Development','Plan, design and build custom iOS and Android applications around users, integrations, product requirements and release goals.'],
    ['ui-ux-design','ui-ux-design','UI/UX Design','Research-led UI/UX design covering user journeys, responsive interfaces, prototypes, design systems and developer handoff.'],
    ['graphic-design','graphic-design','Graphic Design','Visual identity, marketing assets and presentation design to support clear, consistent business communication.'],
    ['digital-marketing','digital-marketing','Digital Marketing','Connected digital marketing across acquisition, content, lifecycle, conversion, measurement and continuous optimization.'],
    ['seo','search-engine-optimization','Search Engine Optimization','Technical SEO, search-intent strategy, content architecture and sustainable authority building for organic visibility.'],
    ['lead-generation','lead-generation','Lead Generation','Lead generation across audience targeting, acquisition, conversion, qualification, CRM workflows and pipeline measurement.'],
    ['e-commerce','ecommerce-solutions','E-commerce Solutions','E-commerce solutions across storefront technology, marketplaces, product operations, customer experience, growth and measurement.'],
    ['virtual-assistance','virtual-assistance','Virtual Assistant','Administrative and operational virtual assistant support built around workflow integration, matching, secure access and coordination.'],
  ] as const).map(([id,slug,name,description]) => route(`Service:${id}`,`/services/${slug}/`,name,`${name} Services | ITGS`,description,'service')),
];
export const notFound: Route = {...route('NotFound','/404.html','Page not found','Page Not Found | ITGS','This page could not be found. Explore ITGS services, solutions and insights.','error'), indexable:false, sitemap:false};
export function articleRoute(post: BlogPost): Route {
  return {...route(`Article:${post.slug}`,`/insights/${post.slug}/`,post.title,post.metaTitle || `${post.title} | ITGS`,post.metaDescription || post.excerpt || '', 'article'), breadcrumb:[home,{name:'Insights',path:'/insights/'},{name:post.title,path:`/insights/${post.slug}/`}]};
}
export function allRoutes(posts: BlogPost[] = []) { return [...routes,...posts.filter(p=>p.status==='Published' && p.approved).map(articleRoute)]; }
export function resolveRoute(path: string, posts: BlogPost[] = []): Route { return allRoutes(posts).find(r=>r.path===(path.replace(/\/+$/,'') || '')+'/') || notFound; }
export function routeForKey(key: string, posts: BlogPost[] = []): Route { return allRoutes(posts).find(r=>r.key===key) || notFound; }
