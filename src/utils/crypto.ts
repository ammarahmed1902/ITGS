/**
 * Password hashing utilities using the browser's built-in Web Crypto API (SHA-256).
 * NOTE: SHA-256 is a fast hash. For production apps with a real backend,
 * migrate to bcrypt or Argon2 via a secure server-side auth provider.
 */

/**
 * Hashes a plain-text password using SHA-256 and returns a hex string.
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Compares a plain-text password against a stored SHA-256 hash.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashed = await hashPassword(password);
  return hashed === hash;
}

/**
 * Generates a cryptographically random temporary password of the given length.
 */
export function generateTempPassword(length = 14): string {
  const chars =
    'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%&';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes)
    .map((b) => chars[b % chars.length])
    .join('');
}
