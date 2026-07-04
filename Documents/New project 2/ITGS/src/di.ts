import { MockBlogRepository } from './infrastructure/repositories/MockBlogRepository';
import { MockJobRepository } from './infrastructure/repositories/MockJobRepository';
import { MockTeamRepository } from './infrastructure/repositories/MockTeamRepository';
import { BlogService } from './application/services/BlogService';
import { JobService } from './application/services/JobService';
import { TeamService } from './application/services/TeamService';

const blogRepository = new MockBlogRepository();
const jobRepository = new MockJobRepository();
const teamRepository = new MockTeamRepository();

export const blogService = new BlogService(blogRepository);
export const jobService = new JobService(jobRepository);
export const teamService = new TeamService(teamRepository);
