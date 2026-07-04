import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import { mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { contactRouter } from './routes/contact.ts';
import { resetRateLimits } from './rateLimit.ts';

describe('POST /api/contact', () => {
  let app: express.Express;
  let tempDir: string;

  beforeEach(async () => {
    resetRateLimits();
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'itgs-contact-'));
    process.env.ITGS_DATA_DIR = tempDir;

    app = express();
    app.use(express.json());
    app.use('/api', contactRouter);
  });

  afterEach(async () => {
    delete process.env.ITGS_DATA_DIR;
    await rm(tempDir, { recursive: true, force: true });
  });

  it('creates a contact submission', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Alex Rivera',
        email: 'alex@example.com',
        subject: 'Support',
        message: 'Need help with onboarding.',
      })
      .expect(201);

    expect(response.body.ok).toBe(true);
    expect(response.body.id).toMatch(/^contact_/);
  });

  it('returns validation errors for invalid payloads', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({ name: 'Alex', email: 'bad-email', message: 'Hello' })
      .expect(400);

    expect(response.body.error).toBeTruthy();
  });
});
