import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { DEFAULT_TEAM_MEMBERS } from '../src/data/teamMembers.ts';
import type { TeamMember } from '../src/domain/entities/TeamMember.ts';

function getDataDir(): string {
  return process.env.ITGS_DATA_DIR || path.join(process.cwd(), 'data');
}

function getFilePath(): string {
  return path.join(getDataDir(), 'team-members.json');
}

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(getDataDir(), { recursive: true });
}

async function writeAll(members: TeamMember[]): Promise<void> {
  await ensureDataDir();
  const tmp = `${getFilePath()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(members, null, 2), 'utf-8');
  await fs.rename(tmp, getFilePath());
}

async function readAll(): Promise<TeamMember[]> {
  try {
    const raw = await fs.readFile(getFilePath(), 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as TeamMember[]) : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      // First run — seed the store so the public Team page has content.
      await writeAll(DEFAULT_TEAM_MEMBERS);
      return [...DEFAULT_TEAM_MEMBERS];
    }
    console.error('[team] Failed to read store:', err);
    return [];
  }
}

export async function listTeamMembers(): Promise<TeamMember[]> {
  return readAll();
}

export async function saveTeamMember(
  member: Record<string, unknown>
): Promise<TeamMember> {
  const members = await readAll();
  const record: TeamMember = {
    id: typeof member.id === 'string' && member.id ? member.id : randomUUID(),
    fullName: String(member.fullName ?? ''),
    role: String(member.role ?? ''),
    email: String(member.email ?? ''),
    phone: typeof member.phone === 'string' ? member.phone : undefined,
    department: typeof member.department === 'string' ? member.department : undefined,
    bio: typeof member.bio === 'string' ? member.bio : undefined,
    photo: typeof member.photo === 'string' ? member.photo : undefined,
    status: member.status === 'Inactive' ? 'Inactive' : 'Active',
    createdAt:
      typeof member.createdAt === 'string' ? member.createdAt : new Date().toISOString(),
    order:
      typeof member.order === 'number' ? member.order : members.length,
  };

  const index = members.findIndex((m) => m.id === record.id);
  if (index >= 0) members[index] = record;
  else members.push(record);
  await writeAll(members);
  return record;
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const members = await readAll();
  const next = members.filter((m) => m.id !== id);
  if (next.length === members.length) return false;
  await writeAll(next);
  return true;
}
