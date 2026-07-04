import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UserPlus,
  Trash2,
  Pencil,
  X,
  Search,
  Power,
  Upload,
  Users,
  Loader2,
} from 'lucide-react';
import { TeamMember, TeamMemberStatus, getTeamInitials } from '../../domain/entities/TeamMember';
import { isValidEmail } from '../../utils/validation';
import {
  fileToCompressedDataUrl,
  validateImageFile,
} from '../../utils/imageUpload';
import StatusMessage from '../../components/StatusMessage';

interface Props {
  team: TeamMember[];
  loading: boolean;
  onSave: (member: TeamMember) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

interface MemberForm {
  fullName: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  bio: string;
  photo?: string;
  status: TeamMemberStatus;
}

const emptyForm = (): MemberForm => ({
  fullName: '',
  role: '',
  email: '',
  phone: '',
  department: '',
  bio: '',
  photo: undefined,
  status: 'Active',
});

const inputClass =
  'w-full bg-starfield border border-midnight/10 rounded-xl px-4 py-3 focus:border-electric outline-none transition-all text-sm';
const labelClass =
  'block text-xs font-bold uppercase tracking-widest text-steel mb-1';

function Avatar({ member, size = 'sm' }: { member: { photo?: string; fullName: string }; size?: 'sm' | 'lg' }) {
  const dim = size === 'lg' ? 'w-20 h-20 text-2xl' : 'w-11 h-11 text-sm';
  if (member.photo) {
    return (
      <img
        src={member.photo}
        alt={member.fullName}
        className={`${dim} rounded-xl object-cover border border-midnight/10`}
      />
    );
  }
  return (
    <div
      className={`${dim} rounded-xl bg-gradient-to-br from-deep-blue to-midnight flex items-center justify-center font-bold text-white/90`}
    >
      {getTeamInitials(member.fullName)}
    </div>
  );
}

export default function TeamManagement({ team, loading, onSave, onDelete }: Props) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | TeamMemberStatus>('All');

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<MemberForm>(emptyForm());
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ variant: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(timer);
  }, [notice]);

  const roles = useMemo(() => {
    const set = new Set(team.map((m) => m.role.trim()).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [team]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return [...team]
      .sort((a, b) => a.order - b.order)
      .filter((m) => {
        const matchesRole = roleFilter === 'All' || m.role === roleFilter;
        const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
        const haystack = `${m.fullName} ${m.role} ${m.email} ${m.department ?? ''}`.toLowerCase();
        const matchesSearch = !q || haystack.includes(q);
        return matchesRole && matchesStatus && matchesSearch;
      });
  }, [team, search, roleFilter, statusFilter]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm());
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditing(member);
    setForm({
      fullName: member.fullName,
      role: member.role,
      email: member.email,
      phone: member.phone ?? '',
      department: member.department ?? '',
      bio: member.bio ?? '',
      photo: member.photo,
      status: member.status,
    });
    setFormError('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm());
    setFormError('');
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError('');
    setIsProcessingImage(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      setForm((prev) => ({ ...prev, photo: dataUrl }));
    } catch {
      setFormError('Could not process that image. Please try another file.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const fullName = form.fullName.trim();
    const role = form.role.trim();
    const email = form.email.trim();

    if (!fullName || !role || !email) {
      setFormError('Full name, job title, and email are required.');
      return;
    }
    if (!isValidEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    const member: TeamMember = {
      id: editing?.id ?? `tm_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      fullName,
      role,
      email,
      phone: form.phone.trim() || undefined,
      department: form.department.trim() || undefined,
      bio: form.bio.trim() || undefined,
      photo: form.photo,
      status: form.status,
      createdAt: editing?.createdAt ?? new Date().toISOString(),
      order: editing?.order ?? team.length,
    };

    setIsSubmitting(true);
    try {
      await onSave(member);
      setNotice({
        variant: 'success',
        message: editing ? 'Team member updated.' : 'Team member added.',
      });
      closeForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save team member.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (member: TeamMember) => {
    setBusyId(member.id);
    try {
      await onSave({
        ...member,
        status: member.status === 'Active' ? 'Inactive' : 'Active',
      });
      setNotice({
        variant: 'success',
        message: `${member.fullName} is now ${member.status === 'Active' ? 'Inactive' : 'Active'}.`,
      });
    } catch {
      setNotice({ variant: 'error', message: 'Could not update status.' });
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (member: TeamMember) => {
    if (!window.confirm(`Delete ${member.fullName}? This cannot be undone.`)) return;
    setBusyId(member.id);
    try {
      await onDelete(member.id);
      setNotice({ variant: 'success', message: `${member.fullName} removed.` });
    } catch {
      setNotice({ variant: 'error', message: 'Could not delete team member.' });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Team Management</h2>
          <p className="text-steel mt-1">
            Add, edit, and organize the members shown on your public Team page.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary py-3 px-6 flex items-center gap-2 text-sm self-start">
          <UserPlus size={18} /> Add Member
        </button>
      </div>

      {notice && <StatusMessage variant={notice.variant} message={notice.message} />}

      {/* Filters */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-steel/60" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, email…"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-starfield border border-midnight/10 focus:border-electric outline-none transition-all text-sm"
            aria-label="Search team members"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className={inputClass}
          aria-label="Filter by role"
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r === 'All' ? 'All Roles' : r}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'All' | TeamMemberStatus)}
          className={inputClass}
          aria-label="Filter by status"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          ['Total', team.length],
          ['Active', team.filter((m) => m.status === 'Active').length],
          ['Inactive', team.filter((m) => m.status === 'Inactive').length],
        ].map(([label, value]) => (
          <div key={label as string} className="card-premium py-5 text-center">
            <p className="text-3xl font-extrabold text-midnight">{value}</p>
            <p className="text-xs uppercase tracking-widest text-steel font-bold mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3 text-steel">
          <Loader2 size={28} className="animate-spin text-electric" />
          <p>Loading team members…</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((member) => (
            <motion.article
              key={member.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-premium p-6 flex flex-col gap-4 border border-midnight/5 hover:border-electric/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <Avatar member={member} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-lg text-midnight truncate">{member.fullName}</h3>
                  <p className="text-electric text-sm font-semibold truncate">{member.role}</p>
                  <p className="text-steel text-xs truncate mt-0.5">{member.email}</p>
                </div>
                <span
                  className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                    member.status === 'Active'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-midnight/10 text-steel'
                  }`}
                >
                  {member.status}
                </span>
              </div>

              {(member.department || member.phone) && (
                <div className="text-xs text-steel space-y-0.5">
                  {member.department && <p>{member.department}</p>}
                  {member.phone && <p>{member.phone}</p>}
                </div>
              )}

              <div className="flex items-center gap-2 pt-2 mt-auto border-t border-midnight/5">
                <button
                  onClick={() => openEdit(member)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-electric/10 text-electric font-bold text-xs hover:bg-electric/20 transition-colors"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => handleToggleStatus(member)}
                  disabled={busyId === member.id}
                  title={member.status === 'Active' ? 'Deactivate' : 'Activate'}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-midnight/5 text-steel font-bold text-xs hover:bg-midnight/10 transition-colors disabled:opacity-50"
                >
                  <Power size={14} /> {member.status === 'Active' ? 'Disable' : 'Enable'}
                </button>
                <button
                  onClick={() => handleDelete(member)}
                  disabled={busyId === member.id}
                  title="Delete member"
                  className="flex items-center justify-center py-2 px-3 rounded-xl bg-red-50 text-red-500 hover:text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center card-premium border-dashed">
          <Users size={32} className="mx-auto text-steel/40 mb-3" />
          <p className="text-steel font-semibold">
            {team.length === 0 ? 'No team members yet.' : 'No members match your filters.'}
          </p>
          {team.length === 0 && (
            <button onClick={openAdd} className="btn-primary py-2.5 px-6 mt-5 inline-flex items-center gap-2 text-sm">
              <UserPlus size={16} /> Add your first member
            </button>
          )}
        </div>
      )}

      {/* ── Add / Edit Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/40 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative my-8"
            >
              <button
                type="button"
                onClick={closeForm}
                aria-label="Close dialog"
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-midnight/10 flex items-center justify-center hover:border-electric transition-colors"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 bg-electric/10 rounded-xl flex items-center justify-center text-electric">
                  <UserPlus size={20} />
                </div>
                <h3 className="text-xl font-bold">{editing ? 'Edit Team Member' : 'Add Team Member'}</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Photo */}
                <div className="flex items-center gap-5">
                  <Avatar member={{ photo: form.photo, fullName: form.fullName || '?' }} size="lg" />
                  <div className="space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessingImage}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-midnight/5 text-midnight font-bold text-sm hover:bg-midnight/10 transition-colors disabled:opacity-60"
                    >
                      {isProcessingImage ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
                      {form.photo ? 'Change Photo' : 'Upload Photo'}
                    </button>
                    {form.photo && (
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, photo: undefined }))}
                        className="block text-xs font-bold text-red-500 hover:text-red-600"
                      >
                        Remove photo
                      </button>
                    )}
                    <p className="text-[11px] text-steel">JPG, PNG, WEBP or GIF · up to 5MB</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className={inputClass}
                      placeholder="Jane Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Job Title / Role *</label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className={inputClass}
                      placeholder="Lead Engineer"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      placeholder="jane@itgs.com"
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                      placeholder="+1 555 123 4567"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Department</label>
                    <input
                      type="text"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className={inputClass}
                      placeholder="Engineering"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value as TeamMemberStatus })}
                      className={inputClass}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Short Bio</label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    className={`${inputClass} resize-none`}
                    rows={3}
                    placeholder="A short professional summary…"
                  />
                </div>

                {formError && <StatusMessage variant="error" message={formError} />}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="flex-1 py-3 font-bold text-steel hover:text-midnight transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || isProcessingImage}
                    className="flex-1 btn-primary py-3 disabled:opacity-60"
                  >
                    {isSubmitting ? 'Saving…' : editing ? 'Save Changes' : 'Add Member'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
