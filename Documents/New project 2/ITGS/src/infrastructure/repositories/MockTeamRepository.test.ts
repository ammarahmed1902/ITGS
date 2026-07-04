import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { TeamMember } from '../../domain/entities/TeamMember';

// In-memory localStorage polyfill (jsdom in this project doesn't provide one).
function installLocalStorage() {
  const store = new Map<string, string>();
  const mock = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size;
    },
  };
  vi.stubGlobal('localStorage', mock as unknown as Storage);
  return store;
}

// Controllable mock of the network layer.
const remote = {
  fetch: vi.fn<() => Promise<TeamMember[]>>(),
  upsert: vi.fn<(member: TeamMember) => Promise<{ id: string }>>(),
  remove: vi.fn<(id: string) => Promise<void>>(),
};

vi.mock('../../api/team', () => ({
  fetchTeamMembers: () => remote.fetch(),
  upsertTeamMemberRemote: (m: TeamMember) => remote.upsert(m),
  deleteTeamMemberRemote: (id: string) => remote.remove(id),
}));

function makeMember(overrides: Partial<TeamMember> = {}): TeamMember {
  return {
    id: overrides.id ?? `tm_${Math.random().toString(36).slice(2, 8)}`,
    fullName: overrides.fullName ?? 'New Person',
    role: overrides.role ?? 'Engineer',
    email: overrides.email ?? 'new@itgs.com',
    status: overrides.status ?? 'Active',
    createdAt: overrides.createdAt ?? new Date().toISOString(),
    order: overrides.order ?? 99,
    ...overrides,
  };
}

describe('MockTeamRepository', () => {
  beforeEach(() => {
    vi.resetModules();
    installLocalStorage();
    remote.fetch.mockReset();
    remote.upsert.mockReset();
    remote.remove.mockReset();
  });

  it('seeds default members when storage is empty and server is unreachable', async () => {
    remote.fetch.mockRejectedValue(new Error('offline'));
    const { MockTeamRepository } = await import('./MockTeamRepository');
    const repo = new MockTeamRepository();

    const members = await repo.getTeamMembers();
    expect(members.length).toBeGreaterThanOrEqual(4);
    expect(members.map((m) => m.fullName)).toContain('Muhammad Daniyal Altaf');
  });

  it('prefers the server roster when reachable', async () => {
    remote.fetch.mockResolvedValue([
      makeMember({ id: 'srv-1', fullName: 'Server Person', order: 0 }),
    ]);
    const { MockTeamRepository } = await import('./MockTeamRepository');
    const repo = new MockTeamRepository();

    const members = await repo.getTeamMembers();
    expect(members.some((m) => m.id === 'srv-1')).toBe(true);
  });

  it('persists a new member locally when the server save fails (offline fallback)', async () => {
    remote.fetch.mockResolvedValue([]);
    remote.upsert.mockRejectedValue(new Error('no admin key'));
    const { MockTeamRepository } = await import('./MockTeamRepository');
    const repo = new MockTeamRepository();

    const created = await repo.saveTeamMember(makeMember({ id: 'local-1', fullName: 'Offline Add' }));
    expect(created.id).toBe('local-1');

    const members = await repo.getTeamMembers();
    expect(members.some((m) => m.id === 'local-1')).toBe(true);
  });

  it('keeps a locally-added member even when the server roster omits it', async () => {
    // Server only ever knows about the seeds; our local add must survive merges.
    remote.fetch.mockResolvedValue([makeMember({ id: 'seed', fullName: 'Seed', order: 0 })]);
    remote.upsert.mockRejectedValue(new Error('no admin key'));
    const { MockTeamRepository } = await import('./MockTeamRepository');
    const repo = new MockTeamRepository();

    await repo.saveTeamMember(makeMember({ id: 'local-1', fullName: 'Local Only' }));
    const members = await repo.getTeamMembers();

    expect(members.some((m) => m.id === 'local-1')).toBe(true);
    expect(members.some((m) => m.id === 'seed')).toBe(true);
  });

  it('reflects edits to an existing member', async () => {
    remote.fetch.mockResolvedValue([]);
    remote.upsert.mockRejectedValue(new Error('no admin key'));
    const { MockTeamRepository } = await import('./MockTeamRepository');
    const repo = new MockTeamRepository();

    await repo.saveTeamMember(makeMember({ id: 'm1', role: 'Engineer' }));
    await repo.saveTeamMember(makeMember({ id: 'm1', role: 'Principal Engineer' }));

    const members = await repo.getTeamMembers();
    const m1 = members.find((m) => m.id === 'm1');
    expect(m1?.role).toBe('Principal Engineer');
    // No duplicate created on update.
    expect(members.filter((m) => m.id === 'm1')).toHaveLength(1);
  });

  it('does not resurrect a deleted member even if the server still returns it (tombstone)', async () => {
    // Server keeps returning the seed; deleting it locally must stick.
    remote.fetch.mockResolvedValue([makeMember({ id: 'ghost', fullName: 'Ghost', order: 0 })]);
    remote.remove.mockRejectedValue(new Error('no admin key'));
    const { MockTeamRepository } = await import('./MockTeamRepository');
    const repo = new MockTeamRepository();

    // Ensure it is present first.
    let members = await repo.getTeamMembers();
    expect(members.some((m) => m.id === 'ghost')).toBe(true);

    await repo.deleteTeamMember('ghost');

    members = await repo.getTeamMembers();
    expect(members.some((m) => m.id === 'ghost')).toBe(false);
  });
});

describe('TeamService.getActiveMembers', () => {
  beforeEach(() => {
    vi.resetModules();
    installLocalStorage();
    remote.fetch.mockReset();
    remote.upsert.mockReset();
    remote.remove.mockReset();
  });

  it('returns only Active members', async () => {
    remote.fetch.mockResolvedValue([
      makeMember({ id: 'a', status: 'Active', order: 0 }),
      makeMember({ id: 'b', status: 'Inactive', order: 1 }),
    ]);
    const { MockTeamRepository } = await import('./MockTeamRepository');
    const { TeamService } = await import('../../application/services/TeamService');
    const service = new TeamService(new MockTeamRepository());

    const active = await service.getActiveMembers();
    expect(active.some((m) => m.id === 'a')).toBe(true);
    expect(active.some((m) => m.id === 'b')).toBe(false);
  });
});
