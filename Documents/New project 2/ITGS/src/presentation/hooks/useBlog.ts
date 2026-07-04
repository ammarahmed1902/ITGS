import { useState, useEffect, useCallback } from 'react';
import { BlogPost } from '../../domain/entities/BlogPost';
import { blogService } from '../../di';

export const useBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const data = await blogService.getAllPosts();
    setPosts(data);
    setLoading(false);
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

  return { posts, loading, savePost, deletePost };
};
