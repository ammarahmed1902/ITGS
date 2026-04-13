export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  status: 'Published' | 'Draft';
  content: string;
  image: string;
  metaTitle?: string;
  metaDescription?: string;
  views: number;
  readTime: string;
}
