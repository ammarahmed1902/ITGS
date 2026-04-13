import { BlogPost } from '../entities/BlogPost';

export interface IBlogRepository {
  getPosts(): Promise<BlogPost[]>;
  savePost(post: BlogPost): Promise<void>;
  deletePost(id: string): Promise<void>;
}
