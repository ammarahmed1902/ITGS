import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export interface StoredApplication extends Record<string, unknown> {
  id: string;
  appliedAt: string;
  status: string;
}

function getDataDir(): string {
  return process.env.ITGS_DATA_DIR || path.join(process.cwd(), 'data');
}

function getFilePath(): string {
  return path.join(getDataDir(), 'job-applications.json');
}

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(getDataDir(), { recursive: true });
}

async function readAll(): Promise<StoredApplication[]> {
  try {
    const raw = await fs.readFile(getFilePath(), 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    console.error('[applications] Failed to read store:', err);
    return [];
  }
}

async function writeAll(applications: StoredApplication[]): Promise<void> {
  await ensureDataDir();
  const tmp = `${getFilePath()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(applications, null, 2), 'utf-8');
  await fs.rename(tmp, getFilePath());
}

export async function saveApplication(
  application: Record<string, unknown>
): Promise<StoredApplication> {
  const applications = await readAll();
  const record: StoredApplication = {
    ...application,
    id: typeof application.id === 'string' ? application.id : randomUUID(),
    appliedAt: typeof application.appliedAt === 'string' ? application.appliedAt : new Date().toISOString(),
    status: typeof application.status === 'string' ? application.status : 'New',
  };
  const index = applications.findIndex((a) => a.id === record.id);
  if (index >= 0) applications[index] = record;
  else applications.unshift(record);
  await writeAll(applications);
  return record;
}

export async function listApplications(): Promise<StoredApplication[]> {
  return readAll();
}

export async function updateApplicationStatus(id: string, status: string): Promise<boolean> {
  const applications = await readAll();
  const index = applications.findIndex((a) => a.id === id);
  if (index < 0) return false;
  applications[index] = { ...applications[index], status };
  await writeAll(applications);
  return true;
}

export async function deleteApplication(id: string): Promise<boolean> {
  const applications = await readAll();
  const next = applications.filter((a) => a.id !== id);
  if (next.length === applications.length) return false;
  await writeAll(next);
  return true;
}
