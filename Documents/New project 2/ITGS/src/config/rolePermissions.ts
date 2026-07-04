import { UserRole } from '../domain/entities/AdminUser';

export type AdminSection = 'Blog' | 'Jobs' | 'Applications' | 'Team' | 'User Management';

/** Which sections each role can access */
export const ROLE_PERMISSIONS: Record<UserRole, AdminSection[]> = {
  super_admin: ['Blog', 'Jobs', 'Applications', 'Team', 'User Management'],
  blog_editor: ['Blog'],
  jobs_manager: ['Jobs', 'Applications'],
};

/** Human-readable role labels */
export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  blog_editor: 'Blog Editor',
  jobs_manager: 'Jobs Manager',
};

/** Tailwind colour classes for each role badge */
export const ROLE_COLORS: Record<UserRole, { bg: string; text: string }> = {
  super_admin: { bg: 'bg-purple-100', text: 'text-purple-700' },
  blog_editor: { bg: 'bg-blue-100', text: 'text-blue-700' },
  jobs_manager: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
};

/** Short description shown on the login screen */
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  super_admin: 'Full access: Blog, Jobs, Applications, Team & User Management.',
  blog_editor: 'Can create, edit, and publish blog posts only.',
  jobs_manager: 'Can post jobs and review applicant tracking.',
};
