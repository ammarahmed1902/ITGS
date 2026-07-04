import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { ROUTES } from '../config/site';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  declare readonly props: Readonly<Props>;
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-starfield flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
          <div className="mb-6 p-4 bg-red-500/10 rounded-full">
            <AlertTriangle className="w-16 h-16 text-red-500" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-midnight mb-4">Something went wrong</h1>
          <p className="text-steel max-w-md mb-8">
            An unexpected error occurred. Please refresh the page or return to the homepage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-primary px-8 py-4 flex items-center gap-2"
            >
              <RefreshCw size={18} aria-hidden="true" />
              Refresh Page
            </button>
            <Link to={ROUTES.home} className="btn-outline-light px-8 py-4 flex items-center gap-2">
              <Home size={18} aria-hidden="true" />
              Back to Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
