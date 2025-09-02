import PostImage from './PostImage';
import PostTitleCard from './PostTitleCard';

const PostHeader = () => {
  return (
    <>
      <div className='post-header'>
        <PostImage />
        <PostTitleCard />
      </div>
    </>
  );
};

export default PostHeader;
