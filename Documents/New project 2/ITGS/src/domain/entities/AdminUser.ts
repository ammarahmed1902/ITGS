export type UserRole = 'super_admin' | 'blog_editor' | 'jobs_manager';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  displayName: string;
  createdAt: string;
}
