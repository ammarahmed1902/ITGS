import { describe, it, expect } from 'vitest';
import { validateContactPayload } from './contactValidation';

describe('validateContactPayload', () => {
  it('accepts valid contact data', () => {
    const result = validateContactPayload({
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Partnership',
      message: 'Hello team',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe('Jane Doe');
      expect(result.data.email).toBe('jane@example.com');
    }
  });

  it('rejects missing required fields', () => {
    const result = validateContactPayload({
      name: 'Jane',
      email: '',
      message: '',
    });

    expect(result.ok).toBe(false);
    if (result.ok === false) {
      expect(result.status).toBe(400);
    }
  });

  it('rejects invalid email', () => {
    const result = validateContactPayload({
      name: 'Jane',
      email: 'not-an-email',
      message: 'Hello',
    });

    expect(result.ok).toBe(false);
  });

  it('flags honeypot spam', () => {
    const result = validateContactPayload({
      name: 'Bot',
      email: 'bot@spam.com',
      message: 'spam',
      honeypot: 'filled',
    });

    expect(result.ok).toBe(false);
    if (result.ok === false) {
      expect(result.error).toBe('Spam detected.');
    }
  });
});
