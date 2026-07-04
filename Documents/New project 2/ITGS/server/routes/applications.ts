import { Router } from 'express';
import { isRateLimited } from '../rateLimit.ts';
import { requireAdminKey } from './contact.ts';
import {
  deleteApplication,
  listApplications,
  saveApplication,
  updateApplicationStatus,
} from '../applicationStore.ts';
import { isValidEmail } from '../../src/utils/validation.ts';

export const applicationsRouter = Router();

applicationsRouter.post('/applications', async (req, res) => {
  const clientKey = req.ip || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(`app:${clientKey}`)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid request body.' });
  }
  if (body.honeypot) {
    return res.status(200).json({ ok: true, id: 'spam-blocked' });
  }

  const required = ['jobId', 'jobTitle', 'firstName', 'lastName', 'email', 'phone'] as const;
  for (const key of required) {
    if (typeof body[key] !== 'string' || !body[key].trim()) {
      return res.status(400).json({ error: `${key} is required.` });
    }
  }
  if (!isValidEmail(body.email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const saved = await saveApplication(body);
    return res.status(201).json({ ok: true, id: saved.id });
  } catch (err) {
    console.error('[applications] Save failed:', err);
    return res.status(500).json({ error: 'Unable to submit application. Please try again.' });
  }
});

applicationsRouter.get('/applications', requireAdminKey, async (_req, res) => {
  try {
    const apps = await listApplications();
    return res.json({ applications: apps });
  } catch (err) {
    console.error('[applications] List failed:', err);
    return res.status(500).json({ error: 'Unable to load applications.' });
  }
});

applicationsRouter.patch('/applications/:id/status', requireAdminKey, async (req, res) => {
  const status = req.body?.status;
  if (typeof status !== 'string' || !status.trim()) {
    return res.status(400).json({ error: 'Status is required.' });
  }
  const ok = await updateApplicationStatus(req.params.id, status.trim());
  if (!ok) return res.status(404).json({ error: 'Application not found.' });
  return res.json({ ok: true });
});

applicationsRouter.delete('/applications/:id', requireAdminKey, async (req, res) => {
  const ok = await deleteApplication(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Application not found.' });
  return res.json({ ok: true });
});
