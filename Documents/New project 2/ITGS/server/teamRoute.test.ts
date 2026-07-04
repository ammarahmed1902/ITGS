import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import { mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { teamRouter } from './routes/team.ts';
import { resetRateLimits } from './rateLimit.ts';

const validMember = {
  fullName: 'Jane Smith',
  role: 'Lead Engineer',
  email: 'jane@example.com',
  department: 'Engineering',
  status: 'Active',
};

describe('Team API', () => {
  let app: express.Express;
  let tempDir: string;

  beforeEach(async () => {
    resetRateLimits();
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'itgs-team-'));
    process.env.ITGS_DATA_DIR = tempDir;
    process.env.ADMIN_API_KEY = 'test-admin-key';

    app = express();
    app.use(express.json({ limit: '2mb' }));
    app.use('/api', teamRouter);
  });

  afterEach(async () => {
    delete process.env.ITGS_DATA_DIR;
    delete process.env.ADMIN_API_KEY;
    await rm(tempDir, { recursive: true, force: true });
  });

  it('exposes seed members publicly without a key', async () => {
    const response = await request(app).get('/api/team').expect(200);
    expect(Array.isArray(response.body.members)).toBe(true);
    expect(response.body.members.length).toBeGreaterThan(0);
  });

  it('creates a member with a valid admin key', async () => {
    const response = await request(app)
      .post('/api/team')
      .set('x-admin-key', 'test-admin-key')
      .send(validMember)
      .expect(201);

    expect(response.body.ok).toBe(true);
    expect(response.body.id).toBeTruthy();
    expect(response.body.member.fullName).toBe('Jane Smith');
  });

  it('denies create without an admin key', async () => {
    await request(app).post('/api/team').send(validMember).expect(401);
  });

  it('rejects an invalid email', async () => {
    const response = await request(app)
      .post('/api/team')
      .set('x-admin-key', 'test-admin-key')
      .send({ ...validMember, email: 'not-an-email' })
      .expect(400);
    expect(response.body.error).toBeTruthy();
  });

  it('rejects missing required fields', async () => {
    const response = await request(app)
      .post('/api/team')
      .set('x-admin-key', 'test-admin-key')
      .send({ email: 'jane@example.com' })
      .expect(400);
    expect(response.body.error).toBeTruthy();
  });

  it('updates an existing member (upsert by id)', async () => {
    const created = await request(app)
      .post('/api/team')
      .set('x-admin-key', 'test-admin-key')
      .send(validMember);

    const id = created.body.id;
    await request(app)
      .post('/api/team')
      .set('x-admin-key', 'test-admin-key')
      .send({ ...validMember, id, role: 'Principal Engineer', status: 'Inactive' })
      .expect(201);

    const list = await request(app).get('/api/team');
    const updated = list.body.members.find((m: { id: string }) => m.id === id);
    expect(updated.role).toBe('Principal Engineer');
    expect(updated.status).toBe('Inactive');
  });

  it('deletes a member with an admin key', async () => {
    const created = await request(app)
      .post('/api/team')
      .set('x-admin-key', 'test-admin-key')
      .send(validMember);

    await request(app)
      .delete(`/api/team/${created.body.id}`)
      .set('x-admin-key', 'test-admin-key')
      .expect(200);

    const list = await request(app).get('/api/team');
    expect(list.body.members.find((m: { id: string }) => m.id === created.body.id)).toBeUndefined();
  });

  it('returns 404 when deleting an unknown member', async () => {
    await request(app)
      .delete('/api/team/does-not-exist')
      .set('x-admin-key', 'test-admin-key')
      .expect(404);
  });

  it('denies delete without an admin key', async () => {
    await request(app).delete('/api/team/anything').expect(401);
  });
});
