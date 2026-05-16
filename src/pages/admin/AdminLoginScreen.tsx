import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import { UserRole } from '../../domain/entities/AdminUser';
import {
  ROLE_LABELS,
  ROLE_COLORS,
  ROLE_DESCRIPTIONS,
} from '../../config/rolePermissions';
import {
  getAdminUsers,
  resetAdminUserPassword,
} from '../../infrastructure/repositories/AdminUserRepository';
import { generateTempPassword } from '../../utils/crypto';

const ALL_ROLES: UserRole[] = ['super_admin', 'blog_editor', 'jobs_manager'];

interface Props {
  onLogin: (identifier: string, password: string) => Promise<string | null>;
}

export default function AdminLoginScreen({ onLogin }: Props) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetResult, setResetResult] = useState<{
    username: string;
    tempPassword: string;
  } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const err = await onLogin(identifier, password);
    if (err) setAuthError(err);
    setIsLoggingIn(false);
  };

  const handleForgotPassword = async () => {
    setResetError('');
    const allUsers = getAdminUsers();
    const user = allUsers.find(
      (u) => u.email.toLowerCase() === resetEmail.trim().toLowerCase()
    );
    if (!user) {
      setResetError('No account found with that email address.');
      return;
    }
    const tempPwd = generateTempPassword();
    await resetAdminUserPassword(user.id, tempPwd);
    setResetResult({ username: user.username, tempPassword: tempPwd });
  };

  const openForgot = () => {
    setShowForgot(true);
    setAuthError('');
    setResetEmail('');
    setResetError('');
    setResetResult(null);
  };

  return (
    <div className="pt-24 pb-24 bg-starfield min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-4 block">
            ITGS Admin
          </span>
          <h1 className="text-5xl font-bold">Management Console</h1>
          <p className="text-steel mt-3">
            Secure, role-based access for the ITGS team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* ── Form card ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-premium p-10"
          >
            {!showForgot ? (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-electric/10 rounded-xl flex items-center justify-center text-electric">
                    <Lock size={20} />
                  </div>
                  <h2 className="text-2xl font-bold">Sign In</h2>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-steel">
                      Username or Email
                    </label>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => {
                        setIdentifier(e.target.value);
                        setAuthError('');
                      }}
                      className="w-full bg-starfield border border-midnight/10 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                      placeholder="Enter username or email"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-steel">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPwd ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setAuthError('');
                        }}
                        className="w-full bg-starfield border border-midnight/10 rounded-xl px-5 py-4 pr-12 focus:border-electric outline-none transition-all"
                        placeholder="Enter password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((p) => !p)}
                        className="absolute right-4 top-4 text-steel hover:text-midnight transition-colors"
                      >
                        {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {authError && (
                    <p className="text-red-500 text-sm font-bold">{authError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isLoggingIn ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={openForgot}
                    className="w-full text-center text-sm text-steel hover:text-electric transition-colors pt-1"
                  >
                    Forgot your password?
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <button
                    onClick={() => {
                      setShowForgot(false);
                      setResetResult(null);
                    }}
                    className="w-8 h-8 rounded-full border border-midnight/10 flex items-center justify-center hover:border-electric transition-colors"
                  >
                    <ArrowRight size={16} className="rotate-180" />
                  </button>
                  <h2 className="text-2xl font-bold">Reset Password</h2>
                </div>

                {!resetResult ? (
                  <div className="space-y-5">
                    <p className="text-steel text-sm">
                      Enter the email linked to your account. A temporary
                      password will be generated — share it with the account
                      holder securely.
                    </p>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-widest text-steel">
                        Registered Email
                      </label>
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => {
                          setResetEmail(e.target.value);
                          setResetError('');
                        }}
                        className="w-full bg-starfield border border-midnight/10 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    {resetError && (
                      <p className="text-red-500 text-sm font-bold">
                        {resetError}
                      </p>
                    )}
                    <button
                      onClick={handleForgotPassword}
                      className="btn-primary w-full py-4"
                    >
                      Generate Temporary Password
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                      <CheckCircle size={24} />
                    </div>
                    <p className="font-bold text-midnight">
                      Temporary password generated for{' '}
                      <span className="text-electric">{resetResult.username}</span>
                    </p>
                    <div className="bg-midnight/5 rounded-xl p-4 border border-midnight/10">
                      <p className="text-xs text-steel mb-2 uppercase tracking-widest font-bold">
                        Temporary Password — copy now
                      </p>
                      <p className="font-mono text-xl font-bold text-midnight select-all break-all">
                        {resetResult.tempPassword}
                      </p>
                    </div>
                    <p className="text-xs text-steel leading-relaxed">
                      Use this password to sign in. Afterwards, ask a Super
                      Admin to set a permanent password via the User Management
                      panel.
                    </p>
                    <button
                      onClick={() => {
                        setShowForgot(false);
                        setResetResult(null);
                      }}
                      className="btn-primary w-full py-4"
                    >
                      Back to Sign In
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>

          {/* ── Role info cards ─────────────────────────────────────────── */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-steel mb-2">
              Available Roles
            </p>
            {ALL_ROLES.map((role, i) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-midnight/5 p-5 flex items-start gap-4 hover:border-electric/30 transition-all"
              >
                <span
                  className={`mt-0.5 shrink-0 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${ROLE_COLORS[role].bg} ${ROLE_COLORS[role].text}`}
                >
                  {ROLE_LABELS[role]}
                </span>
                <p className="text-steel text-sm leading-relaxed">
                  {ROLE_DESCRIPTIONS[role]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
