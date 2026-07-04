import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import PageMeta from '../../components/PageMeta';
import StatusMessage from '../../components/StatusMessage';
import { ROUTES } from '../../config/site';

interface Props {
  onLogin: (identifier: string, password: string) => Promise<string | null>;
}

export default function AdminLoginScreen({ onLogin }: Props) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions while a request is in flight.
    if (isLoggingIn) return;

    // Basic client-side validation (form uses noValidate).
    if (!identifier.trim() || !password) {
      setAuthError('Please enter your username/email and password.');
      return;
    }

    setIsLoggingIn(true);
    setAuthError('');

    try {
      const err = await onLogin(identifier, password);
      if (err) setAuthError(err);
    } catch (err) {
      // login() is designed never to throw, but guard anyway so the
      // spinner can never get stuck on an unexpected failure.
      console.error('[admin] Login failed:', err);
      setAuthError('Something went wrong while signing in. Please try again.');
    } finally {
      // Always stop loading, whether login succeeded, failed, or threw.
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <PageMeta title="Admin Sign In" noIndex path={ROUTES.admin} />
      <div className="pt-24 pb-24 bg-starfield min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-4 block">
              ITGS Admin
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold">Management Console</h1>
            <p className="text-steel mt-3">Secure, role-based access for the ITGS team.</p>
          </div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-premium"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-electric/10 rounded-xl flex items-center justify-center text-electric">
                  <Lock size={20} aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold">Sign In</h2>
              </div>

              <form onSubmit={handleLogin} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="admin-identifier" className="block text-xs font-bold uppercase tracking-widest text-steel mb-2">
                    Username or Email
                  </label>
                  <input
                    id="admin-identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setAuthError('');
                    }}
                    className="input-field"
                    placeholder="Enter username or email"
                    autoComplete="username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-widest text-steel mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="admin-password"
                      type={showPwd ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setAuthError('');
                      }}
                      className="input-field pr-12"
                      placeholder="Enter password"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((p) => !p)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-steel hover:text-midnight transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label={showPwd ? 'Hide password' : 'Show password'}
                    >
                      {showPwd ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                    </button>
                  </div>
                </div>

                {authError && <StatusMessage variant="error" message={authError} />}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <p className="text-center text-xs text-steel pt-2 leading-relaxed">
                  Forgot your password? Contact a Super Admin to reset it from User Management.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
