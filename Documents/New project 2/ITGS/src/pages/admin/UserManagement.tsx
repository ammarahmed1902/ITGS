import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Trash2, Key, X, CheckCircle, Shield } from 'lucide-react';
import { AdminUser, UserRole } from '../../domain/entities/AdminUser';
import { ROLE_LABELS, ROLE_COLORS } from '../../config/rolePermissions';
import {
  createAdminUser,
  deleteAdminUser,
  resetAdminUserPassword,
} from '../../infrastructure/repositories/AdminUserRepository';
import { generateTempPassword } from '../../utils/crypto';

const ALL_ROLES: UserRole[] = ['super_admin', 'blog_editor', 'jobs_manager'];

interface Props {
  users: AdminUser[];
  currentUserId: string;
  onUsersChanged: () => void;
}

interface NewUserForm {
  username: string;
  email: string;
  displayName: string;
  role: UserRole;
  password: string;
}

const defaultForm = (): NewUserForm => ({
  username: '',
  email: '',
  displayName: '',
  role: 'blog_editor',
  password: '',
});

export default function UserManagement({
  users,
  currentUserId,
  onUsersChanged,
}: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [addError, setAddError] = useState('');
  const [form, setForm] = useState<NewUserForm>(defaultForm());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [pwdInfo, setPwdInfo] = useState<{
    username: string;
    email: string;
    tempPassword: string;
  } | null>(null);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    setIsSubmitting(true);
    try {
      await createAdminUser(form);
      onUsersChanged();
      setShowAdd(false);
      setForm(defaultForm());
    } catch (err: any) {
      setAddError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (user: AdminUser) => {
    if (user.id === currentUserId) return;
    if (window.confirm(`Delete user "${user.displayName}"? This cannot be undone.`)) {
      deleteAdminUser(user.id);
      onUsersChanged();
    }
  };

  const handleResetPwd = async (user: AdminUser) => {
    const tempPwd = generateTempPassword();
    await resetAdminUserPassword(user.id, tempPwd);
    setPwdInfo({ username: user.username, email: user.email, tempPassword: tempPwd });
    onUsersChanged();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">User Management</h2>
          <p className="text-steel mt-1">
            Add users, assign roles, and reset passwords.
          </p>
        </div>
        <button
          onClick={() => {
            setShowAdd(true);
            setAddError('');
            setForm(defaultForm());
          }}
          className="btn-primary py-3 px-6 flex items-center gap-2 text-sm"
        >
          <UserPlus size={18} /> Add User
        </button>
      </div>

      {/* User table */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-midnight/5 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-steel">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-steel">
                  Email
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-steel">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-steel">
                  Since
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-steel text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-midnight/5">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={`hover:bg-midnight/2 transition-colors ${user.id === currentUserId ? 'bg-electric/3' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-electric/10 flex items-center justify-center text-electric font-bold text-sm">
                        {user.displayName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-midnight">
                          {user.displayName}
                          {user.id === currentUserId && (
                            <span className="ml-2 text-[10px] font-bold text-electric">
                              (You)
                            </span>
                          )}
                        </p>
                        <p className="text-steel text-xs">@{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-steel">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${ROLE_COLORS[user.role].bg} ${ROLE_COLORS[user.role].text}`}
                    >
                      {ROLE_LABELS[user.role]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-steel text-xs">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleResetPwd(user)}
                        title="Reset password"
                        className="p-2 hover:bg-electric/10 rounded-lg text-electric transition-colors"
                      >
                        <Key size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        disabled={user.id === currentUserId}
                        title={
                          user.id === currentUserId
                            ? 'You cannot delete your own account'
                            : 'Delete user'
                        }
                        className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add User Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative"
            >
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                aria-label="Close add user dialog"
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-midnight/10 flex items-center justify-center hover:border-electric transition-colors"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 bg-electric/10 rounded-xl flex items-center justify-center text-electric">
                  <UserPlus size={20} />
                </div>
                <h3 className="text-xl font-bold">Add New User</h3>
              </div>

              <form onSubmit={handleAddUser} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-steel">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={form.displayName}
                      onChange={(e) =>
                        setForm({ ...form, displayName: e.target.value })
                      }
                      className="w-full bg-starfield border border-midnight/10 rounded-xl px-4 py-3 focus:border-electric outline-none transition-all text-sm"
                      placeholder="Jane Smith"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-steel">
                      Username
                    </label>
                    <input
                      type="text"
                      value={form.username}
                      onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                      }
                      className="w-full bg-starfield border border-midnight/10 rounded-xl px-4 py-3 focus:border-electric outline-none transition-all text-sm"
                      placeholder="janesmith"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-starfield border border-midnight/10 rounded-xl px-4 py-3 focus:border-electric outline-none transition-all text-sm"
                    placeholder="jane@itgs.com"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">
                    Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value as UserRole })
                    }
                    className="w-full bg-starfield border border-midnight/10 rounded-xl px-4 py-3 focus:border-electric outline-none transition-all appearance-none text-sm"
                  >
                    {ALL_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {ROLE_LABELS[r]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-widest text-steel">
                    Initial Password
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full bg-starfield border border-midnight/10 rounded-xl px-4 py-3 focus:border-electric outline-none transition-all text-sm"
                    placeholder="Min. 8 characters"
                    minLength={8}
                    required
                  />
                </div>

                {addError && (
                  <p className="text-red-500 text-sm font-bold">{addError}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="flex-1 py-3 font-bold text-steel hover:text-midnight transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-primary py-3 disabled:opacity-60"
                  >
                    {isSubmitting ? 'Creating…' : 'Create User'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Password Reset Result Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {pwdInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative"
            >
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-5">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-1">Password Reset</h3>
              <p className="text-steel text-sm mb-5">
                New temporary password for{' '}
                <span className="font-bold text-midnight">@{pwdInfo.username}</span>{' '}
                ({pwdInfo.email}):
              </p>
              <div className="bg-midnight/5 rounded-xl p-4 border border-midnight/10 mb-5">
                <p className="text-xs text-steel mb-1 uppercase tracking-widest font-bold">
                  Temporary Password — copy &amp; share securely
                </p>
                <p className="font-mono text-xl font-bold text-midnight select-all break-all">
                  {pwdInfo.tempPassword}
                </p>
              </div>
              <p className="text-xs text-steel mb-5 leading-relaxed">
                The user's password has been updated. Share this securely and
                ask them to change it after signing in.
              </p>
              <button
                onClick={() => setPwdInfo(null)}
                className="btn-primary w-full py-3"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
