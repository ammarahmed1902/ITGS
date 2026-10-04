import {renderToString} from 'react-dom/server';
import App,{type AppData} from './App';
import {loadPage} from './lib/pageLoader';
export {allRoutes,notFound} from './lib/routes';
export {metadata,safeJson} from './lib/metadata';
export {parseSiteConfig} from './lib/siteConfig';
export {parsePublishedPosts} from './lib/cms';
export async function render(data:AppData){const Page=await loadPage(data.route);return renderToString(<App data={data} initialPage={Page}/>);}
