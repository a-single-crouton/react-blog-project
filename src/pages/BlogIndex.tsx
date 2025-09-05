import { useEffect, useState } from 'react';
import BlogItem from '../components/BlogItem';
import type { PostMeta } from '../utils/postHandler';
import { getAllPostMeta } from '../utils/postHandler';

const BlogIndex = () => {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  useEffect(() => {
    getAllPostMeta()
      .then(setPosts)
      .catch((err) => console.error(err));
  }, []);
  return (
    <main>
      <div className='blog-index-grid'>
        <div className='blog-index-column-one'></div>
        <div className='blog-index-column-two'>
          <div className='blog-list'>
            {posts.map((meta) => (
              <BlogItem key={meta.slug} meta={meta} />
            ))}
          </div>
        </div>
        <div className='blog-index-column-three'></div>
      </div>
    </main>
  );
};

export default BlogIndex;
