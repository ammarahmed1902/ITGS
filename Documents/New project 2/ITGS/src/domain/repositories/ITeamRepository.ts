import { TeamMember } from '../entities/TeamMember';

export interface ITeamRepository {
  getTeamMembers(): Promise<TeamMember[]>;
  /** Creates or updates a member (upsert by id) and returns the persisted record. */
  saveTeamMember(member: TeamMember): Promise<TeamMember>;
  deleteTeamMember(id: string): Promise<void>;
}
