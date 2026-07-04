import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { ROUTES } from '../config/site';

const NotFound = () => (
  <>
    <PageMeta title="Page Not Found" noIndex path="/404" />
    <div className="min-h-screen bg-starfield flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
      <div className="mb-6 p-4 bg-red-500/10 rounded-full">
        <AlertTriangle className="w-16 h-16 text-red-500" aria-hidden="true" />
      </div>
      <h1 className="text-6xl md:text-8xl font-extrabold text-midnight mb-4">404</h1>
      <h2 className="text-2xl font-bold text-steel mb-4">Page Not Found</h2>
      <p className="text-steel/80 max-w-md mb-10">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to={ROUTES.home} className="btn-primary px-8 py-4 flex items-center gap-2">
        <Home className="w-5 h-5" aria-hidden="true" />
        Back to Home
      </Link>
    </div>
  </>
);

export default NotFound;
