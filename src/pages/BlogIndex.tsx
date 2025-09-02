import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const BlogIndex = () => {
  const blogData = import.meta.glob('../posts/*.mdx');
  const slugs = Object.keys(blogData).map((p) =>
    p.split('/').pop()!.replace('.mdx', '')
  );
  return (
    <>
      <Navbar />
      <h1>Blog Index</h1>
      <ul>
        {slugs.map((slug) => (
          <li key='slug'>
            <Link to={`/post/${slug}`}>{slug.replace(/-/g, ' ')}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogIndex;
