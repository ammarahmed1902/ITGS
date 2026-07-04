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

/** Reads a localStorage key without throwing (storage may be blocked). */
function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Writes a localStorage key without throwing. Returns whether it succeeded. */
function safeSet(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates a single stored record has every field login depends on, as the
 * right type. A record missing `username`/`email` (e.g. from a legacy schema or
 * a partially-written entry) would otherwise make the login lookup call
 * `.toLowerCase()` on `undefined` and crash the whole sign-in flow.
 */
function isValidStoredUser(value: unknown): value is AdminUser {
  if (!value || typeof value !== 'object') return false;
  const u = value as Record<string, unknown>;
  return (
    typeof u.id === 'string' &&
    typeof u.username === 'string' &&
    typeof u.email === 'string' &&
    typeof u.passwordHash === 'string' &&
    typeof u.role === 'string'
  );
}

/**
 * Returns true only when the stored value is a non-empty array in which EVERY
 * record is well-formed. A single malformed record causes a re-seed so corrupt
 * storage can never permanently break login.
 */
function hasValidStoredUsers(): boolean {
  const data = safeGet(STORAGE_KEY);
  if (!data) return false;
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 && parsed.every(isValidStoredUser);
  } catch {
    return false;
  }
}

/**
 * Seeds default users on first launch. Re-seeds if the stored value is
 * missing OR corrupt (e.g. invalid/partial JSON from an interrupted write),
 * so a damaged localStorage entry can never permanently break login.
 * All passwords are SHA-256 hashed before being stored.
 */
export async function initializeAdminUsers(): Promise<void> {
  if (hasValidStoredUsers()) return;

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

  safeSet(STORAGE_KEY, JSON.stringify(users));
}

/**
 * Returns all well-formed admin users from localStorage. Never throws —
 * corrupt data is cleared and malformed records are filtered out so callers
 * (e.g. the login lookup) can never crash on bad data.
 */
export function getAdminUsers(): AdminUser[] {
  const data = safeGet(STORAGE_KEY);
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidStoredUser);
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    return [];
  }
}

/** Persists the full user list to localStorage. */
function saveAdminUsers(users: AdminUser[]): void {
  safeSet(STORAGE_KEY, JSON.stringify(users));
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
