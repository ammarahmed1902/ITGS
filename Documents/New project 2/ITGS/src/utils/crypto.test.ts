import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from './crypto';

describe('crypto', () => {
  it('hashes and verifies passwords with salt', async () => {
    const hash = await hashPassword('SecurePass#123');
    expect(hash).toHaveLength(64);
    expect(await verifyPassword('SecurePass#123', hash)).toBe(true);
    expect(await verifyPassword('wrong-password', hash)).toBe(false);
  });

  it('supports legacy unsalted hashes', async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode('LegacyPass1');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const legacyHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    expect(await verifyPassword('LegacyPass1', legacyHash)).toBe(true);
  });
});
