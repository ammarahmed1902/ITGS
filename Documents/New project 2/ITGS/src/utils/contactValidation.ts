export interface ContactFormPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string;
}

export interface ContactValidationResult {
  ok: true;
  data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

export interface ContactValidationError {
  ok: false;
  error: string;
  status: number;
}

import { EMAIL_REGEX } from './validation';
const MAX_NAME_LENGTH = 120;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

export function validateContactPayload(
  body: unknown
): ContactValidationResult | ContactValidationError {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body.', status: 400 };
  }

  const payload = body as ContactFormPayload;

  if (payload.honeypot) {
    return { ok: false, error: 'Spam detected.', status: 400 };
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const subject =
    typeof payload.subject === 'string' ? payload.subject.trim() : '';
  const message =
    typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || !email || !message) {
    return {
      ok: false,
      error: 'Name, email, and message are required.',
      status: 400,
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.', status: 400 };
  }

  if (name.length > MAX_NAME_LENGTH) {
    return { ok: false, error: 'Name is too long.', status: 400 };
  }

  if (subject.length > MAX_SUBJECT_LENGTH) {
    return { ok: false, error: 'Subject is too long.', status: 400 };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: 'Message is too long.', status: 400 };
  }

  return {
    ok: true,
    data: { name, email, subject, message },
  };
}
