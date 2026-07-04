import { describe, it, expect } from 'vitest';
import { isJobAcceptingApplications } from './jobUtils';
import { JobPost } from '../domain/entities/JobPost';

const baseJob: JobPost = {
  id: 'j-test',
  title: 'Test Role',
  department: 'Engineering',
  location: 'Remote',
  jobType: 'Full Time',
  experienceRequired: '3+ years',
  description: 'Test',
  responsibilities: [],
  requirements: [],
  benefits: [],
  deadline: 'December 31, 2099',
  status: 'Open',
  image: '',
  slug: 'test-role',
  postedAt: 'Jan 1, 2026',
};

describe('isJobAcceptingApplications', () => {
  it('returns true for open jobs before deadline', () => {
    expect(isJobAcceptingApplications(baseJob)).toBe(true);
  });

  it('returns false for closed jobs', () => {
    expect(
      isJobAcceptingApplications({ ...baseJob, status: 'Closed' })
    ).toBe(false);
  });

  it('returns false after deadline', () => {
    expect(
      isJobAcceptingApplications({
        ...baseJob,
        deadline: 'January 1, 2020',
      })
    ).toBe(false);
  });
});
