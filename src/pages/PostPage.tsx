/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostHeader from '../components/Post/PostHeader';

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [Content, setContent] = useState<React.ComponentType | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const modules = import.meta.glob('../posts/*.mdx') as Record<
      string,
      () => Promise<any>
    >;
    const path = `../posts/${slug}.mdx`;
    const loader = modules[path];

    if (!loader) {
      setNotFound(true);
      return;
    }

    setNotFound(false);
    loader().then((mod) => {
      setContent(() => mod.default);
    });
  }, [slug]);

  if (notFound)
    return (
      <>
        <div className='post-container'>
          <div className='post'>
            <PostHeader />
            <div className='post-body'>Post not found.</div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className='post-container'>
        <div className='post'>
          <PostHeader />
          <div className='post-body'>
            {Content ? <Content /> : <p>Loading...</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
