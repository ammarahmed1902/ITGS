import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import { mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { applicationsRouter } from './routes/applications.ts';
import { resetRateLimits } from './rateLimit.ts';

describe('POST /api/applications', () => {
  let app: express.Express;
  let tempDir: string;

  beforeEach(async () => {
    resetRateLimits();
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'itgs-apps-'));
    process.env.ITGS_DATA_DIR = tempDir;
    process.env.ADMIN_API_KEY = 'test-admin-key';

    app = express();
    app.use(express.json());
    app.use('/api', applicationsRouter);
  });

  afterEach(async () => {
    delete process.env.ITGS_DATA_DIR;
    delete process.env.ADMIN_API_KEY;
    await rm(tempDir, { recursive: true, force: true });
  });

  it('creates a job application submission', async () => {
    const response = await request(app)
      .post('/api/applications')
      .send({
        jobId: 'j1',
        jobTitle: 'Senior Engineer',
        firstName: 'Alex',
        lastName: 'Rivera',
        email: 'alex@example.com',
        phone: '+15551234567',
      })
      .expect(201);

    expect(response.body.ok).toBe(true);
    expect(response.body.id).toBeTruthy();
  });

  it('rejects invalid email', async () => {
    const response = await request(app)
      .post('/api/applications')
      .send({
        jobId: 'j1',
        jobTitle: 'Senior Engineer',
        firstName: 'Alex',
        lastName: 'Rivera',
        email: 'not-an-email',
        phone: '+15551234567',
      })
      .expect(400);

    expect(response.body.error).toBeTruthy();
  });

  it('lists applications with admin key', async () => {
    await request(app)
      .post('/api/applications')
      .send({
        jobId: 'j1',
        jobTitle: 'Senior Engineer',
        firstName: 'Alex',
        lastName: 'Rivera',
        email: 'alex@example.com',
        phone: '+15551234567',
      });

    const response = await request(app)
      .get('/api/applications')
      .set('x-admin-key', 'test-admin-key')
      .expect(200);

    expect(Array.isArray(response.body.applications)).toBe(true);
    expect(response.body.applications.length).toBeGreaterThan(0);
  });

  it('denies list without admin key', async () => {
    await request(app).get('/api/applications').expect(401);
  });
});
