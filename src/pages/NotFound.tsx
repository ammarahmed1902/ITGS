import React from 'react';
import { Home, AlertTriangle } from 'lucide-react';

interface NotFoundProps {
  setActivePage: (page: string) => void;
}

const NotFound: React.FC<NotFoundProps> = ({ setActivePage }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 p-4 bg-red-500/10 rounded-full">
        <AlertTriangle className="w-16 h-16 text-red-500" />
      </div>
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-300 mb-6">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <button
        onClick={() => setActivePage('Home')}
        className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
