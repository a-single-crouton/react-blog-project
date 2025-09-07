import Navbar from '../Navbar';
import PostBody from './PostBody';
import PostHeader from './PostHeader';

const Post = () => {
  return (
    <>
      <Navbar />
      <div className='post-container'>
        <div className='post'>
          <PostHeader />
          <PostBody />
          <div className='post-footer'></div>
        </div>
      </div>
    </>
  );
};

export default Post;
