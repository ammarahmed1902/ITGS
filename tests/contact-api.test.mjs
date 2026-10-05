import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.js';

function responseRecorder() {
  return {
    statusCode: 200, headers: {}, body: '',
    status(code) { this.statusCode = code; return this; },
    setHeader(name, value) { this.headers[name] = value; },
    end(body = '') { this.body = body; },
  };
}

test('contact API validates input and privately forwards a valid enquiry', async () => {
  const invalidResponse = responseRecorder();
  await handler({ method: 'POST', body: { name: 'A' } }, invalidResponse);
  assert.equal(invalidResponse.statusCode, 400);

  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_ANON_KEY;
  let forwarded;
  try {
    process.env.SUPABASE_URL = 'https://project.supabase.co';
    process.env.SUPABASE_ANON_KEY = 'test-anon-key';
    globalThis.fetch = async (url, options) => {
      forwarded = { url, options };
      return new Response(null, { status: 201 });
    };
    const validResponse = responseRecorder();
    await handler({ method: 'POST', body: {
      name: 'Test Person', email: 'person@example.com', company: 'Example',
      service: 'Web development', message: 'We need a clearer customer portal for our team.',
      consent: true, sourcePath: '/contact/', website: '',
    } }, validResponse);
    assert.equal(validResponse.statusCode, 200);
    assert.equal(forwarded.url, 'https://project.supabase.co/rest/v1/contact_submissions');
    assert.equal(JSON.parse(forwarded.options.body).email, 'person@example.com');
    assert.equal(forwarded.options.headers.Prefer, 'return=minimal');
  } finally {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.SUPABASE_URL; else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_ANON_KEY; else process.env.SUPABASE_ANON_KEY = originalKey;
  }
});
