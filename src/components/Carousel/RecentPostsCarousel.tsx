import { useEffect, useState } from 'react';
import Carousel from './Carousel';
import type { PostMeta } from '../../utils/postHandler';
import { getRecentPostMeta } from '../../utils/postHandler';
import './embla-styles.css';

export default function RecentPostsCarousel() {
  const [posts, setPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    getRecentPostMeta(6, true)
      .then(setPosts)
      .catch((err) => console.error('Failed to load recent posts:', err));
  }, []);

  const slides = posts.map((p) => ({
    slug: p.slug,
    title: p.title ?? p.slug,
    image: p.image,
  }));

  return <Carousel posts={slides} options={{ loop: true }} />;
}
