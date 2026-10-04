export interface BlogPost {
  slug: string;
  author: string;
  approved: boolean;
  publishedAt: string;
  updatedAt?: string;
  shareImage?: string;
  imageAlt?: string;
  id: string;
  title: string;
  date: string;
  category: string;
  status: 'Published' | 'Draft';
  content: string;
  excerpt?: string;
  image: string;
  metaTitle?: string;
  metaDescription?: string;
  views: number;
  readTime: string;
}
