const allowedServices = new Set([
  'Web development', 'Mobile app development', 'UI/UX design', 'Digital marketing',
  'Search engine optimization', 'Lead generation', 'E-commerce solutions',
  'Virtual assistance', 'Not sure yet', 'Something else',
]);

function text(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function reply(response, status, payload) {
  response.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return reply(response, 405, { message: 'Method not allowed.' });
  }
  let body;
  try { body = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : (request.body || {}); }
  catch { return reply(response, 400, { message: 'Invalid request.' }); }
  if (text(body.website, 200)) return reply(response, 200, { ok: true });

  const name = text(body.name, 100);
  const email = text(body.email, 254).toLowerCase();
  const company = text(body.company, 120);
  const service = text(body.service, 80);
  const message = text(body.message, 3000);
  const sourcePath = text(body.sourcePath, 200) || '/contact/';
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !allowedServices.has(service) || message.length < 20 || body.consent !== true) {
    return reply(response, 400, { message: 'Please complete every required field with valid information.' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return reply(response, 503, { message: 'The contact service is temporarily unavailable. Please try again later.' });

  try {
    const result = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ full_name: name, email, company: company || null, service_interest: service, message, source_path: sourcePath }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok) throw new Error(`CONTACT_STORAGE_${result.status}`);
    return reply(response, 200, { ok: true });
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'CONTACT_STORAGE_FAILED');
    return reply(response, 503, { message: 'Your enquiry could not be sent right now. Please try again later.' });
  }
}
