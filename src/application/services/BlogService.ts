import { IBlogRepository } from '../../domain/repositories/IBlogRepository';
import { BlogPost } from '../../domain/entities/BlogPost';

export class BlogService {
  constructor(private blogRepository: IBlogRepository) {}

  async getAllPosts(): Promise<BlogPost[]> {
    return this.blogRepository.getPosts();
  }

  async savePost(post: BlogPost): Promise<void> {
    return this.blogRepository.savePost(post);
  }

  async deletePost(id: string): Promise<void> {
    return this.blogRepository.deletePost(id);
  }
}
