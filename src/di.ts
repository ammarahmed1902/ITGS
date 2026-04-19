import { MockBlogRepository } from './infrastructure/repositories/MockBlogRepository';
import { MockServiceRepository } from './infrastructure/repositories/MockServiceRepository';
import { MockJobRepository } from './infrastructure/repositories/MockJobRepository';
import { BlogService } from './application/services/BlogService';
import { ServiceService } from './application/services/ServiceService';
import { JobService } from './application/services/JobService';

const blogRepository = new MockBlogRepository();
const serviceRepository = new MockServiceRepository();
const jobRepository = new MockJobRepository();

export const blogService = new BlogService(blogRepository);
export const serviceService = new ServiceService(serviceRepository);
export const jobService = new JobService(jobRepository);
