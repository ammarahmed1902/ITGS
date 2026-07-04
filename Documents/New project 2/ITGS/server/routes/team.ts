import { Router } from 'express';
import { isRateLimited } from '../rateLimit.ts';
import { requireAdminKey } from './contact.ts';
import {
  deleteTeamMember,
  listTeamMembers,
  saveTeamMember,
} from '../teamStore.ts';
import { isValidEmail } from '../../src/utils/validation.ts';

export const teamRouter = Router();

/** Public — the Team page reads this without authentication. */
teamRouter.get('/team', async (_req, res) => {
  try {
    const members = await listTeamMembers();
    return res.json({ members });
  } catch (err) {
    console.error('[team] List failed:', err);
    return res.status(500).json({ error: 'Unable to load team members.' });
  }
});

/** Admin-only upsert (create or update). */
teamRouter.post('/team', requireAdminKey, async (req, res) => {
  const clientKey = req.ip || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(`team:${clientKey}`, 60)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  const required = ['fullName', 'role', 'email'] as const;
  for (const key of required) {
    if (typeof body[key] !== 'string' || !body[key].trim()) {
      return res.status(400).json({ error: `${key} is required.` });
    }
  }
  if (!isValidEmail(body.email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (body.photo !== undefined && typeof body.photo !== 'string') {
    return res.status(400).json({ error: 'Invalid photo payload.' });
  }

  try {
    const saved = await saveTeamMember(body);
    return res.status(201).json({ ok: true, id: saved.id, member: saved });
  } catch (err) {
    console.error('[team] Save failed:', err);
    return res.status(500).json({ error: 'Unable to save team member. Please try again.' });
  }
});

/** Admin-only delete. */
teamRouter.delete('/team/:id', requireAdminKey, async (req, res) => {
  try {
    const ok = await deleteTeamMember(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Team member not found.' });
    return res.json({ ok: true });
  } catch (err) {
    console.error('[team] Delete failed:', err);
    return res.status(500).json({ error: 'Unable to delete team member.' });
  }
});
