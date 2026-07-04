import { describe, it, expect, beforeEach } from 'vitest';
import { isRateLimited, resetRateLimits } from './rateLimit';

describe('rateLimit', () => {
  beforeEach(() => {
    resetRateLimits();
  });

  it('allows requests under the limit', () => {
    expect(isRateLimited('127.0.0.1', 3, 60_000)).toBe(false);
    expect(isRateLimited('127.0.0.1', 3, 60_000)).toBe(false);
    expect(isRateLimited('127.0.0.1', 3, 60_000)).toBe(false);
  });

  it('blocks requests over the limit', () => {
    expect(isRateLimited('127.0.0.1', 2, 60_000)).toBe(false);
    expect(isRateLimited('127.0.0.1', 2, 60_000)).toBe(false);
    expect(isRateLimited('127.0.0.1', 2, 60_000)).toBe(true);
  });
});
