import type {BlogPost} from '../../domain/entities/BlogPost';
import type {IBlogRepository} from '../../domain/repositories/IBlogRepository';
// Fixtures are supplied only to controlled QA builds, never as a production fallback.
export class MockBlogRepository implements IBlogRepository {
 async getPosts():Promise<BlogPost[]>{return [];}
 async savePost():Promise<void>{throw new Error('Read-only repository.');}
 async deletePost():Promise<void>{throw new Error('Read-only repository.');}
}
