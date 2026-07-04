import { ITeamRepository } from '../../domain/repositories/ITeamRepository';
import { TeamMember } from '../../domain/entities/TeamMember';

export class TeamService {
  constructor(private teamRepository: ITeamRepository) {}

  async getAllMembers(): Promise<TeamMember[]> {
    return this.teamRepository.getTeamMembers();
  }

  /** Only Active members are shown on the public Team page. */
  async getActiveMembers(): Promise<TeamMember[]> {
    const members = await this.teamRepository.getTeamMembers();
    return members.filter((m) => m.status === 'Active');
  }

  async saveMember(member: TeamMember): Promise<TeamMember> {
    return this.teamRepository.saveTeamMember(member);
  }

  async deleteMember(id: string): Promise<void> {
    return this.teamRepository.deleteTeamMember(id);
  }
}
