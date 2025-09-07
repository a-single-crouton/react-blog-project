import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import type { PostMeta } from '../utils/postHandler';

type Props = {
  meta: PostMeta;
};

const BlogItem = ({ meta }: Props): JSX.Element => {
  const { slug, title, excerpt, tags, image } = meta;

  return (
    <>
      <Link className='blog-link' to={`/blog/${slug}`}>
        <div className='blog-item-container' aria-labelledby={`blog-${slug}`}>
          <div className='blog-item-img-container'>
            <img className='blog-item-image' src={image} />
          </div>
          <div className='blog-item-text-container'>
            <div className='blog-item-title'>{title ?? slug}</div>
            {tags?.length ? (
              <div className='blog-tags-container'>
                {tags.map((t) => (
                  <span key={t} className='blog-tag'>
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <div className='blog-item-excerpt'>
              {excerpt ?? 'no excerpt available'}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogItem;
