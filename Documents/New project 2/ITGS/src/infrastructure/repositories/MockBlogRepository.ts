import { BlogPost } from '../../domain/entities/BlogPost';
import { IBlogRepository } from '../../domain/repositories/IBlogRepository';

const BLOG_STORAGE_KEY = 'itgs_blog_posts';

const DEFAULT_POSTS: BlogPost[] = [
  { 
    id: "1",
    title: "The Psychology of Trust in SaaS", 
    date: "Oct 12, 2026", 
    category: "UI/UX Design", 
    status: 'Published',
    content: "Trust is the foundation of any successful SaaS product...",
    image: "https://picsum.photos/seed/blog-1/600/400",
    views: 1240,
    readTime: "5m"
  },
  { 
    id: "2",
    title: "Scaling Infrastructure for 2027", 
    date: "Oct 10, 2026", 
    category: "Web Development", 
    status: 'Published',
    content: "As we approach 2027, the demands on web infrastructure are evolving...",
    image: "https://picsum.photos/seed/blog-2/600/400",
    views: 850,
    readTime: "8m"
  },
  { 
    id: "3",
    title: "AI Ethics in Global Enterprise", 
    date: "Oct 05, 2026", 
    category: "Digital Marketing", 
    status: 'Draft',
    content: "The integration of AI into enterprise workflows brings significant ethical considerations...",
    image: "https://picsum.photos/seed/blog-3/600/400",
    views: 0,
    readTime: "6m"
  },
  { 
    id: "4",
    title: "Maximizing ROI with Technical SEO", 
    date: "Sep 28, 2026", 
    category: "Search Engine Optimization", 
    status: 'Published',
    content: "Technical SEO remains a critical pillar of digital marketing success...",
    image: "https://picsum.photos/seed/blog-4/600/400",
    views: 2100,
    readTime: "10m"
  },
  { 
    id: "5",
    title: "The Future of Mobile User Experience", 
    date: "Sep 22, 2026", 
    category: "Mobile App Development", 
    status: 'Published',
    content: "Mobile UX is shifting towards more immersive and personalized experiences...",
    image: "https://picsum.photos/seed/blog-5/600/400",
    views: 1560,
    readTime: "4m"
  },
  { 
    id: "6",
    title: "B2B Lead Gen: Beyond the Basics", 
    date: "Sep 15, 2026", 
    category: "Lead Generation", 
    status: 'Published',
    content: "Effective B2B lead generation requires a deep understanding of the buyer's journey...",
    image: "https://picsum.photos/seed/blog-6/600/400",
    views: 920,
    readTime: "7m"
  },
  { 
    id: "7",
    title: "E-commerce Trends for Global Markets", 
    date: "Sep 08, 2026", 
    category: "E-commerce Solutions", 
    status: 'Published',
    content: "Global e-commerce is being reshaped by cross-border trade and social commerce...",
    image: "https://picsum.photos/seed/blog-7/600/400",
    views: 1800,
    readTime: "6m"
  },
  { 
    id: "8",
    title: "Visual Identity in the Age of AI", 
    date: "Sep 01, 2026", 
    category: "Graphic Design", 
    status: 'Published',
    content: "AI is both a tool and a challenge for modern graphic designers...",
    image: "https://picsum.photos/seed/blog-8/600/400",
    views: 1100,
    readTime: "5m"
  },
  { 
    id: "9",
    title: "Operational Excellence with Virtual Partners", 
    date: "Aug 25, 2026", 
    category: "Virtual Assistance", 
    status: 'Published',
    content: "Virtual assistants are becoming integral to executive productivity...",
    image: "https://picsum.photos/seed/blog-9/600/400",
    views: 740,
    readTime: "4m"
  },
];

function loadPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(BLOG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as BlogPost[];
      if (parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fall through to defaults
  }
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
  return [...DEFAULT_POSTS];
}

function savePosts(posts: BlogPost[]): void {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
}

export class MockBlogRepository implements IBlogRepository {
  async getPosts(): Promise<BlogPost[]> {
    return loadPosts();
  }

  async savePost(post: BlogPost): Promise<void> {
    const posts = loadPosts();
    const index = posts.findIndex((p) => p.id === post.id);
    const next =
      index !== -1
        ? posts.map((existing, i) => (i === index ? post : existing))
        : [post, ...posts];
    savePosts(next);
  }

  async deletePost(id: string): Promise<void> {
    savePosts(loadPosts().filter((p) => p.id !== id));
  }
}
