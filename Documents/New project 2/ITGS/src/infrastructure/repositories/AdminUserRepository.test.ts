import { describe, it, expect, beforeEach, vi } from 'vitest';

// In-memory localStorage polyfill (jsdom in this project doesn't provide one).
function installLocalStorage() {
  const store = new Map<string, string>();
  const mock = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size;
    },
  };
  vi.stubGlobal('localStorage', mock as unknown as Storage);
  return store;
}

const STORAGE_KEY = 'itgs_admin_users';

describe('AdminUserRepository resilience (admin login root cause)', () => {
  let store: Map<string, string>;

  beforeEach(() => {
    vi.resetModules();
    store = installLocalStorage();
  });

  it('seeds three well-formed users on first run', async () => {
    const { initializeAdminUsers, getAdminUsers } = await import('./AdminUserRepository');
    await initializeAdminUsers();

    const users = getAdminUsers();
    expect(users).toHaveLength(3);
    for (const u of users) {
      expect(typeof u.username).toBe('string');
      expect(typeof u.email).toBe('string');
      expect(typeof u.passwordHash).toBe('string');
    }
  });

  it('self-heals when a stored record is missing username/email', async () => {
    // Simulate corrupt/legacy storage: a record with no username — this is the
    // exact state that made the login lookup throw and surface the generic
    // "Unable to sign in right now" error.
    store.set(
      STORAGE_KEY,
      JSON.stringify([{ id: 'user_seed_0', email: 'superadmin@itgs.com', passwordHash: 'x', role: 'super_admin' }])
    );

    const { initializeAdminUsers, getAdminUsers } = await import('./AdminUserRepository');
    await initializeAdminUsers();

    const users = getAdminUsers();
    expect(users).toHaveLength(3);
    expect(users.every((u) => typeof u.username === 'string' && typeof u.email === 'string')).toBe(true);
  });

  it('filters out malformed records from getAdminUsers (no crash)', async () => {
    store.set(
      STORAGE_KEY,
      JSON.stringify([
        { id: 'good', username: 'ok', email: 'ok@itgs.com', passwordHash: 'h', role: 'blog_editor' },
        { id: 'bad', username: null, email: 'bad@itgs.com', passwordHash: 'h', role: 'blog_editor' },
      ])
    );

    const { getAdminUsers } = await import('./AdminUserRepository');
    const users = getAdminUsers();

    expect(users).toHaveLength(1);
    expect(users[0].username).toBe('ok');
    // The malformed record must not survive — a `.toLowerCase()` on it would crash login.
    expect(() =>
      users.find((u) => u.username.toLowerCase() === 'ok')
    ).not.toThrow();
  });

  it('does not re-seed when all stored users are valid', async () => {
    const { initializeAdminUsers, getAdminUsers } = await import('./AdminUserRepository');
    await initializeAdminUsers();
    const before = JSON.stringify(getAdminUsers());

    await initializeAdminUsers();
    const after = JSON.stringify(getAdminUsers());
    expect(after).toBe(before);
  });
});
