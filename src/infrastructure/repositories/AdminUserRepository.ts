import { AdminUser, UserRole } from '../../domain/entities/AdminUser';
import { hashPassword } from '../../utils/crypto';

const STORAGE_KEY = 'itgs_admin_users';

// ---------------------------------------------------------------------------
// Seed data — these are hashed on first run and stored in localStorage.
// Change passwords here only before the first launch (or clear localStorage).
// ---------------------------------------------------------------------------
interface SeedUser {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  displayName: string;
}

const SEED_USERS: SeedUser[] = [
  {
    username: 'blogarouthawrite',
    email: 'superadmin@itgs.com',
    // Original credential kept as requested
    password: 'Cn/X#J39q@RKAwz5Z(MBTt<b^SN!+6',
    role: 'super_admin',
    displayName: 'Super Admin',
  },
  {
    username: 'blogeditor',
    email: 'blog@itgs.com',
    password: 'BlogEditor#2026!',
    role: 'blog_editor',
    displayName: 'Blog Editor',
  },
  {
    username: 'jobsmanager',
    email: 'jobs@itgs.com',
    password: 'JobsMgr#2026!',
    role: 'jobs_manager',
    displayName: 'Jobs Manager',
  },
];

/**
 * Seeds default users on first launch (only if localStorage is empty).
 * All passwords are SHA-256 hashed before being stored.
 */
export async function initializeAdminUsers(): Promise<void> {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return;

  const users: AdminUser[] = await Promise.all(
    SEED_USERS.map(async (seed, i) => ({
      id: `user_seed_${i}`,
      username: seed.username,
      email: seed.email,
      passwordHash: await hashPassword(seed.password),
      role: seed.role,
      displayName: seed.displayName,
      createdAt: new Date().toISOString(),
    }))
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/** Returns all admin users from localStorage. */
export function getAdminUsers(): AdminUser[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? (JSON.parse(data) as AdminUser[]) : [];
}

/** Persists the full user list to localStorage. */
function saveAdminUsers(users: AdminUser[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/** Creates a new admin user with a hashed password. */
export async function createAdminUser(data: {
  username: string;
  email: string;
  displayName: string;
  role: UserRole;
  password: string;
}): Promise<AdminUser> {
  const users = getAdminUsers();

  if (users.some((u) => u.username === data.username)) {
    throw new Error('Username already exists.');
  }
  if (users.some((u) => u.email === data.email)) {
    throw new Error('Email already in use.');
  }

  const newUser: AdminUser = {
    id: `user_${Date.now()}`,
    username: data.username,
    email: data.email,
    passwordHash: await hashPassword(data.password),
    role: data.role,
    displayName: data.displayName,
    createdAt: new Date().toISOString(),
  };

  saveAdminUsers([...users, newUser]);
  return newUser;
}

/** Resets a user's password by storing a new SHA-256 hash. */
export async function resetAdminUserPassword(
  userId: string,
  newPassword: string
): Promise<void> {
  const users = getAdminUsers();
  const newHash = await hashPassword(newPassword);
  saveAdminUsers(
    users.map((u) => (u.id === userId ? { ...u, passwordHash: newHash } : u))
  );
}

/** Deletes a user by ID. Callers should prevent self-deletion. */
export function deleteAdminUser(userId: string): void {
  const users = getAdminUsers();
  saveAdminUsers(users.filter((u) => u.id !== userId));
}

/** Updates mutable fields (displayName, email, role) for an existing user. */
export function updateAdminUser(
  userId: string,
  fields: Partial<Pick<AdminUser, 'displayName' | 'email' | 'role'>>
): void {
  const users = getAdminUsers();
  saveAdminUsers(
    users.map((u) => (u.id === userId ? { ...u, ...fields } : u))
  );
}
