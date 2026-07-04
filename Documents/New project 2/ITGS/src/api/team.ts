import type { TeamMember } from '../domain/entities/TeamMember';

function getAdminKey(): string | null {
  return import.meta.env.VITE_ADMIN_API_KEY || sessionStorage.getItem('itgs_admin_api_key');
}

async function parseJson(response: Response): Promise<Record<string, unknown>> {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

/** Public endpoint — anyone can read the team roster. */
export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const response = await fetch('/api/team');
  if (!response.ok) {
    throw new Error('Failed to load team members.');
  }
  const payload = await parseJson(response);
  const members = payload.members;
  if (!Array.isArray(members)) return [];
  return members as TeamMember[];
}

/** Admin-only upsert (create or update). */
export async function upsertTeamMemberRemote(member: TeamMember): Promise<{ id: string }> {
  const key = getAdminKey();
  if (!key) throw new Error('Admin API key not configured.');

  const response = await fetch('/api/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
    body: JSON.stringify(member),
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(typeof payload.error === 'string' ? payload.error : 'Failed to save team member.');
  }
  return { id: String(payload.id || member.id) };
}

/** Admin-only delete. */
export async function deleteTeamMemberRemote(id: string): Promise<void> {
  const key = getAdminKey();
  if (!key) throw new Error('Admin API key not configured.');

  const response = await fetch(`/api/team/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-key': key },
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(typeof payload.error === 'string' ? payload.error : 'Failed to delete team member.');
  }
}
