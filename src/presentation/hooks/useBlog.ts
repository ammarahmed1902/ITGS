import { useState, useEffect, useCallback } from 'react';
import { BlogPost } from '../../domain/entities/BlogPost';
import { blogService } from '../../di';

export const useBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      setError(null);
      const data = await blogService.getAllPosts();
      setPosts(data);
    } catch {
      setError('Insights are temporarily unavailable. Please try again shortly.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const savePost = async (post: BlogPost) => {
    await blogService.savePost(post);
    await fetchPosts();
  };

  const deletePost = async (id: string) => {
    await blogService.deletePost(id);
    await fetchPosts();
  };

  return { posts, loading, error, savePost, deletePost, refresh: fetchPosts };
};
