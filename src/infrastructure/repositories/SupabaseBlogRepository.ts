import type {IBlogRepository} from '../../domain/repositories/IBlogRepository';
import {parsePublishedPosts} from '../../lib/cms';
export class SupabaseBlogRepository implements IBlogRepository {
 constructor(private url:string,private anonKey:string){}
 async getPosts(){const response=await fetch(`${this.url}/rest/v1/blog_posts?select=*&status=eq.Published&approved=eq.true&published_at=lte.${encodeURIComponent(new Date().toISOString())}`,{headers:{apikey:this.anonKey,Authorization:`Bearer ${this.anonKey}`},signal:AbortSignal.timeout(15000)});if(!response.ok)throw new Error(`CMS_READ_FAILED_${response.status}`);const result=parsePublishedPosts(await response.json());if(result.rejected)throw new Error('CMS_INVALID_RECORD');return result.posts;}
 async savePost():Promise<void>{throw new Error('Use the authenticated CMS dashboard.');}
 async deletePost():Promise<void>{throw new Error('Use the authenticated CMS dashboard.');}
}
