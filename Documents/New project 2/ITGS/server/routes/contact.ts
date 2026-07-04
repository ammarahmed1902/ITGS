import { Router, type Request, type Response, type NextFunction } from 'express';
import { validateContactPayload } from '../../src/utils/contactValidation.ts';
import { saveContactSubmission } from '../contactStore.ts';
import { isRateLimited } from '../rateLimit.ts';

export const contactRouter = Router();

contactRouter.post('/contact', async (req, res) => {
  const clientKey = req.ip || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(clientKey)) {
    return res.status(429).json({
      error: 'Too many contact requests. Please try again later.',
    });
  }

  const validation = validateContactPayload(req.body);
  if (validation.ok === false) {
    if (validation.error === 'Spam detected.') {
      return res.status(200).json({ ok: true, id: 'spam-blocked' });
    }
    return res.status(validation.status).json({ error: validation.error });
  }

  try {
    const submission = await saveContactSubmission(validation.data);
    return res.status(201).json({
      ok: true,
      id: submission.id,
      message: 'Your message has been received. Our team will respond within 24 hours.',
    });
  } catch (err) {
    console.error('[contact] Failed to save submission:', err);
    return res.status(500).json({
      error: 'Unable to save your message right now. Please try again later.',
    });
  }
});

export function requireAdminKey(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    console.warn('[auth] ADMIN_API_KEY not set — admin API routes disabled');
    return res.status(503).json({ error: 'Admin API is not configured.' });
  }
  const provided = req.headers['x-admin-key'];
  if (provided !== expected) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  next();
}
