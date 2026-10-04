import { MockBlogRepository } from './infrastructure/repositories/MockBlogRepository';
import { SupabaseBlogRepository } from './infrastructure/repositories/SupabaseBlogRepository';
import { MockServiceRepository } from './infrastructure/repositories/MockServiceRepository';
import { BlogService } from './application/services/BlogService';
import { ServiceService } from './application/services/ServiceService';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const blogRepository = supabaseUrl && supabaseAnonKey
  ? new SupabaseBlogRepository(supabaseUrl, supabaseAnonKey)
  : new MockBlogRepository();
const serviceRepository = new MockServiceRepository();

export const blogService = new BlogService(blogRepository);
export const serviceService = new ServiceService(serviceRepository);
