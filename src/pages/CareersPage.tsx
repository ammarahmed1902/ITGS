import PageIntro from '../components/PageIntro';
import Breadcrumbs from '../components/Breadcrumbs';
import {routeForKey} from '../lib/routes';
export default function CareersPage(){return <div className="page-shell"><div className="site-container"><Breadcrumbs items={routeForKey('Careers').breadcrumb}/><PageIntro eyebrow="Careers" title="Build thoughtful digital work with ITGS." description="Explore published opportunities to work with ITGS."/><div className="card mt-14 p-8 md:p-12"><h2 className="text-2xl">There are no published openings right now.</h2><p className="mt-4 leading-7">Please check again for future opportunities.</p></div></div></div>;}
