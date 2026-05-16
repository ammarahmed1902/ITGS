import { useState, useEffect, useCallback } from 'react';
import { AdminUser } from '../../domain/entities/AdminUser';
import {
  initializeAdminUsers,
  getAdminUsers,
} from '../../infrastructure/repositories/AdminUserRepository';
import { verifyPassword } from '../../utils/crypto';

const SESSION_KEY = 'itgs_admin_session';

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

  // Seed users on first mount and restore any existing session
  useEffect(() => {
    const init = async () => {
      await initializeAdminUsers();

      const sessionId = localStorage.getItem(SESSION_KEY);
      if (sessionId) {
        const users = getAdminUsers();
        const user = users.find((u) => u.id === sessionId) ?? null;
        setCurrentUser(user);
      }

      setIsInitialized(true);
    };
    init();
  }, []);

  /**
   * Tries to log in with the given identifier (username or email) and password.
   * Returns null on success, or an error message string on failure.
   */
  const login = useCallback(
    async (identifier: string, password: string): Promise<string | null> => {
      const trimmed = identifier.trim().toLowerCase();
      const users = getAdminUsers();

      const user = users.find(
        (u) =>
          u.username.toLowerCase() === trimmed ||
          u.email.toLowerCase() === trimmed
      );

      if (!user) {
        return 'No account found with that username or email.';
      }

      const valid = await verifyPassword(password, user.passwordHash);
      if (!valid) {
        return 'Incorrect password. Please try again.';
      }

      setCurrentUser(user);
      localStorage.setItem(SESSION_KEY, user.id);
      return null;
    },
    []
  );

  /** Clears the session and logs out the current user. */
  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_KEY);
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
