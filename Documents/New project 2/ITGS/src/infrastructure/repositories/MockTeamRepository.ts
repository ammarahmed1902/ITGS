import { TeamMember } from '../../domain/entities/TeamMember';
import { ITeamRepository } from '../../domain/repositories/ITeamRepository';
import { DEFAULT_TEAM_MEMBERS } from '../../data/teamMembers';
import {
  deleteTeamMemberRemote,
  fetchTeamMembers,
  upsertTeamMemberRemote,
} from '../../api/team';

const TEAM_STORAGE_KEY = 'itgs_team_members';
const TEAM_TOMBSTONE_KEY = 'itgs_team_deleted';

function readFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable / quota — non-fatal */
  }
}

function loadLocalTeam(): TeamMember[] {
  const stored = readFromStorage<TeamMember[] | null>(TEAM_STORAGE_KEY, null);
  if (stored && stored.length > 0) return stored;
  writeToStorage(TEAM_STORAGE_KEY, DEFAULT_TEAM_MEMBERS);
  return [...DEFAULT_TEAM_MEMBERS];
}

function saveLocalTeam(members: TeamMember[]): void {
  writeToStorage(TEAM_STORAGE_KEY, members);
}

function loadTombstones(): string[] {
  return readFromStorage<string[]>(TEAM_TOMBSTONE_KEY, []);
}

function addTombstone(id: string): void {
  const tombs = loadTombstones();
  if (!tombs.includes(id)) {
    writeToStorage(TEAM_TOMBSTONE_KEY, [...tombs, id]);
  }
}

function sortMembers(members: TeamMember[]): TeamMember[] {
  return [...members].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

/** Remote wins on id conflicts; local-only records are preserved (offline edits). */
function mergeTeam(remote: TeamMember[], local: TeamMember[]): TeamMember[] {
  const map = new Map<string, TeamMember>();
  for (const member of local) map.set(member.id, member);
  for (const member of remote) map.set(member.id, member);
  return Array.from(map.values());
}

function upsertLocal(member: TeamMember): void {
  const local = loadLocalTeam();
  const index = local.findIndex((existing) => existing.id === member.id);
  const next =
    index !== -1
      ? local.map((existing, i) => (i === index ? member : existing))
      : [...local, member];
  saveLocalTeam(next);
}

export class MockTeamRepository implements ITeamRepository {
  async getTeamMembers(): Promise<TeamMember[]> {
    const local = loadLocalTeam();
    const tombstones = new Set(loadTombstones());

    let members = local;
    try {
      const remote = await fetchTeamMembers();
      members = mergeTeam(remote, local);
      // Cache the merged view (minus tombstoned ids) for offline use.
      saveLocalTeam(members.filter((m) => !tombstones.has(m.id)));
    } catch {
      /* server unreachable — fall back to local cache */
    }

    return sortMembers(members.filter((m) => !tombstones.has(m.id)));
  }

  async saveTeamMember(member: TeamMember): Promise<TeamMember> {
    let saved = member;
    try {
      const { id } = await upsertTeamMemberRemote(member);
      saved = { ...member, id: id || member.id };
    } catch (err) {
      console.warn('[team] Server save failed, saving locally:', err);
    }
    upsertLocal(saved);
    return saved;
  }

  async deleteTeamMember(id: string): Promise<void> {
    try {
      await deleteTeamMemberRemote(id);
    } catch (err) {
      console.warn('[team] Server delete failed, removing locally:', err);
    }
    addTombstone(id);
    saveLocalTeam(loadLocalTeam().filter((member) => member.id !== id));
  }
}
