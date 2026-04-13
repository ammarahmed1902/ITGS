import { MockBlogRepository } from './infrastructure/repositories/MockBlogRepository';
import { MockServiceRepository } from './infrastructure/repositories/MockServiceRepository';
import { BlogService } from './application/services/BlogService';
import { ServiceService } from './application/services/ServiceService';

const blogRepository = new MockBlogRepository();
const serviceRepository = new MockServiceRepository();

export const blogService = new BlogService(blogRepository);
export const serviceService = new ServiceService(serviceRepository);
