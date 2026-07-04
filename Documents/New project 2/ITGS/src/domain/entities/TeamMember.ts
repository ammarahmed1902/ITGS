export type TeamMemberStatus = 'Active' | 'Inactive';

export interface TeamMember {
  id: string;
  fullName: string;
  /** Job title / role shown on the public team page */
  role: string;
  email: string;
  phone?: string;
  department?: string;
  bio?: string;
  /** Profile photo as a data URL (uploaded) or a public asset path. */
  photo?: string;
  status: TeamMemberStatus;
  /** ISO timestamp */
  createdAt: string;
  /** Lower numbers appear first on the public team grid. */
  order: number;
}

/** Derives up-to-two-letter initials from a member's full name. */
export function getTeamInitials(fullName: string): string {
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
