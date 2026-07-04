import { useState, useEffect, useCallback } from 'react';
import { AdminUser } from '../../domain/entities/AdminUser';
import {
  initializeAdminUsers,
  getAdminUsers,
  resetAdminUserPassword,
} from '../../infrastructure/repositories/AdminUserRepository';
import { verifyPassword, hashPassword } from '../../utils/crypto';

const SESSION_KEY = 'itgs_admin_session';
const SESSION_EXPIRY_KEY = 'itgs_admin_session_exp';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

/**
 * Safe localStorage helpers. Browser storage can throw (SecurityError when
 * storage is blocked/partitioned, QuotaExceededError when full). These wrappers
 * never throw so a storage hiccup can never crash the login flow.
 */
const safeStorage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore — non-persistent session is acceptable */
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

const safeSession = {
  set(key: string, value: string): void {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
  remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

interface UseAdminAuthReturn {
  currentUser: AdminUser | null;
  isInitialized: boolean;
  login: (identifier: string, password: string) => Promise<string | null>;
  logout: () => void;
  refreshCurrentUser: () => void;
}

/**
 * Handles admin authentication — initialises seed users, restores sessions
 * from localStorage, and exposes login/logout helpers.
 *
 * Login accepts either username OR email as the identifier.
 */
export function useAdminAuth(): UseAdminAuthReturn {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Seed users on first mount and restore any existing session.
  // Wrapped so a failure never leaves the admin UI stuck on the loading spinner.
  useEffect(() => {
    const init = async () => {
      try {
        await initializeAdminUsers();

        const sessionId = safeStorage.get(SESSION_KEY);
        const sessionExp = safeStorage.get(SESSION_EXPIRY_KEY);
        const isExpired = sessionExp ? Date.now() > Number(sessionExp) : false;

        if (sessionId && !isExpired) {
          const users = getAdminUsers();
          const user = users.find((u) => u.id === sessionId) ?? null;
          if (user) {
            setCurrentUser(user);
            if (import.meta.env.VITE_ADMIN_API_KEY) {
              safeSession.set('itgs_admin_api_key', import.meta.env.VITE_ADMIN_API_KEY);
            }
          } else {
            safeStorage.remove(SESSION_KEY);
            safeStorage.remove(SESSION_EXPIRY_KEY);
          }
        } else if (sessionId) {
          safeStorage.remove(SESSION_KEY);
          safeStorage.remove(SESSION_EXPIRY_KEY);
        }
      } catch (err) {
        console.error('[admin] Initialization failed:', err);
      } finally {
        setIsInitialized(true);
      }
    };
    init();
  }, []);

  /**
   * Tries to log in with the given identifier (username or email) and password.
   * Returns null on success, or an error message string on failure.
   */
  const login = useCallback(
    async (identifier: string, password: string): Promise<string | null> => {
      try {
        const lockUntil = Number(safeStorage.get('itgs_login_lock') || 0);
        if (lockUntil > Date.now()) {
          return 'Too many failed attempts. Please try again later.';
        }

        const trimmed = identifier.trim().toLowerCase();
        if (!trimmed || !password) {
          return 'Please enter your username/email and password.';
        }

        const users = getAdminUsers();
        const user = users.find(
          (u) =>
            (typeof u.username === 'string' && u.username.toLowerCase() === trimmed) ||
            (typeof u.email === 'string' && u.email.toLowerCase() === trimmed)
        );

        if (!user) {
          return 'Invalid credentials. Please check your username/email and password.';
        }

        const valid = await verifyPassword(password, user.passwordHash);
        if (!valid) {
          const attempts = Number(safeStorage.get('itgs_login_attempts') || 0) + 1;
          safeStorage.set('itgs_login_attempts', String(attempts));
          if (attempts >= MAX_LOGIN_ATTEMPTS) {
            safeStorage.set('itgs_login_lock', String(Date.now() + LOCKOUT_MS));
            safeStorage.remove('itgs_login_attempts');
          }
          return 'Invalid credentials. Please check your username/email and password.';
        }

        safeStorage.remove('itgs_login_attempts');
        safeStorage.remove('itgs_login_lock');

        // Best-effort hash upgrade — must never block or fail the login itself.
        try {
          const upgradedHash = await hashPassword(password);
          if (upgradedHash !== user.passwordHash) {
            await resetAdminUserPassword(user.id, password);
          }
        } catch (upgradeErr) {
          console.warn('[admin] Password hash upgrade skipped:', upgradeErr);
        }

        setCurrentUser(user);
        safeStorage.set(SESSION_KEY, user.id);
        safeStorage.set(SESSION_EXPIRY_KEY, String(Date.now() + SESSION_TTL_MS));
        if (import.meta.env.VITE_ADMIN_API_KEY) {
          safeSession.set('itgs_admin_api_key', import.meta.env.VITE_ADMIN_API_KEY);
        }
        return null;
      } catch (err) {
        // Any unexpected failure resolves to a user-visible message instead
        // of rejecting, so the sign-in spinner can never hang.
        console.error('[admin] Login error:', err);
        return 'Unable to sign in right now. Please try again.';
      }
    },
    []
  );

  /** Clears the session and logs out the current user. */
  const logout = useCallback(() => {
    setCurrentUser(null);
    safeStorage.remove(SESSION_KEY);
    safeStorage.remove(SESSION_EXPIRY_KEY);
    safeSession.remove('itgs_admin_api_key');
  }, []);

  /**
   * Re-reads the current user from localStorage (e.g. after a profile update
   * or password reset applied by a super_admin).
   */
  const refreshCurrentUser = useCallback(() => {
    if (!currentUser) return;
    const users = getAdminUsers();
    const updated = users.find((u) => u.id === currentUser.id) ?? null;
    setCurrentUser(updated);
  }, [currentUser]);

  return { currentUser, isInitialized, login, logout, refreshCurrentUser };
}
