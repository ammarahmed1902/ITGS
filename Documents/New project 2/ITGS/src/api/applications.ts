import type { JobApplication } from '../domain/entities/JobApplication';

export type SubmitApplicationInput = Omit<JobApplication, 'id' | 'status' | 'appliedAt'> & {
  honeypot?: string;
  id?: string;
};

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

export async function submitJobApplication(input: SubmitApplicationInput): Promise<{ id: string }> {
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(typeof payload.error === 'string' ? payload.error : 'Failed to submit application.');
  }
  return { id: String(payload.id || 'submitted') };
}

export async function fetchJobApplications(): Promise<JobApplication[]> {
  const key = getAdminKey();
  if (!key) return [];

  const response = await fetch('/api/applications', {
    headers: { 'x-admin-key': key },
  });
  if (!response.ok) return [];

  const payload = await parseJson(response);
  const apps = payload.applications;
  if (!Array.isArray(apps)) return [];

  return apps as JobApplication[];
}

export async function updateJobApplicationStatus(
  id: string,
  status: JobApplication['status']
): Promise<void> {
  const key = getAdminKey();
  if (!key) throw new Error('Admin API key not configured.');

  const response = await fetch(`/api/applications/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
    body: JSON.stringify({ status }),
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(typeof payload.error === 'string' ? payload.error : 'Failed to update status.');
  }
}

export async function deleteJobApplicationRemote(id: string): Promise<void> {
  const key = getAdminKey();
  if (!key) throw new Error('Admin API key not configured.');

  const response = await fetch(`/api/applications/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-key': key },
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(typeof payload.error === 'string' ? payload.error : 'Failed to delete application.');
  }
}
