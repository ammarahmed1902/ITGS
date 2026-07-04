import { useState, useEffect, useCallback } from 'react';
import { TeamMember } from '../../domain/entities/TeamMember';
import { teamService } from '../../di';

export const useTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await teamService.getAllMembers();
      setTeam(data);
      setError(null);
    } catch (err) {
      console.error('[useTeam] Failed to load team:', err);
      setError('Unable to load team members.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const saveMember = useCallback(
    async (member: TeamMember) => {
      await teamService.saveMember(member);
      await fetchMembers();
    },
    [fetchMembers]
  );

  const deleteMember = useCallback(
    async (id: string) => {
      await teamService.deleteMember(id);
      await fetchMembers();
    },
    [fetchMembers]
  );

  return { team, loading, error, saveMember, deleteMember, refresh: fetchMembers };
};
