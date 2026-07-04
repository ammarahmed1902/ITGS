import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

function getStorePath(): string {
  const dataDir =
    process.env.ITGS_DATA_DIR ??
    process.env.ITGS_CONTACT_DATA_DIR ??
    path.join(process.cwd(), 'data');
  return path.join(dataDir, 'contact-submissions.json');
}

async function readSubmissions(): Promise<ContactSubmission[]> {
  const storePath = getStorePath();
  try {
    const raw = await readFile(storePath, 'utf8');
    const parsed = JSON.parse(raw) as ContactSubmission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('[contact] Failed to read store:', err);
    }
    return [];
  }
}

export async function saveContactSubmission(
  data: Omit<ContactSubmission, 'id' | 'createdAt'>
): Promise<ContactSubmission> {
  const storePath = getStorePath();
  await mkdir(path.dirname(storePath), { recursive: true });

  const submission: ContactSubmission = {
    id: `contact_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    ...data,
  };

  const existing = await readSubmissions();
  const tmpPath = `${storePath}.tmp`;
  await writeFile(tmpPath, JSON.stringify([submission, ...existing], null, 2), 'utf8');
  await rename(tmpPath, storePath);

  return submission;
}
