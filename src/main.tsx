import {createRoot,hydrateRoot} from 'react-dom/client';
import App,{type AppData} from './App';
import {loadPage} from './lib/pageLoader';
import {resolveRoute} from './lib/routes';
import './index.css';
async function start(){
  const root=document.getElementById('root');if(!root)throw new Error('Missing application root');
  const source=document.getElementById('itgs-page-data');
  const data:AppData=source?JSON.parse(source.textContent||'{}'):{route:resolveRoute(location.pathname),posts:[],config:{origin:location.origin,production:false,bookingUrl:'https://calendly.com/ammarzerobyte/30min'}};
  const initialPage=await loadPage(data.route);
  const app=<App data={data} initialPage={initialPage}/>;
  if(source&&root.hasChildNodes())hydrateRoot(root,app);
  else {root.replaceChildren();createRoot(root).render(app);}
}
void start().catch(()=>{const notice=document.createElement('p');notice.setAttribute('role','alert');notice.textContent='Interactive features could not load. You can still use the page links, or reload to try again.';document.body.prepend(notice);});
