interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitEntry>();

export function isRateLimited(
  key: string,
  maxRequests = 5,
  windowMs = 60 * 60 * 1000
): boolean {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now >= entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= maxRequests) {
    return true;
  }

  entry.count += 1;
  return false;
}

/** Clears in-memory buckets — for tests only. */
export function resetRateLimits(): void {
  buckets.clear();
}
