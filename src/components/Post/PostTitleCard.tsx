import PostTag from './PostTag';

const PostTitleCard = () => {
  return (
    <>
      <div className='post-title-card'>
        <div className='tags-container'>
          <PostTag />
          <PostTag />
          <PostTag />
          <PostTag />
        </div>

        <div className='title-container'>
          <h2 className='post-title'>
            Really Really Unrealistically Long Title
          </h2>
        </div>
        <div className='author-container'>
          <img
            className='author-image'
            src='/hero-images/generic-dev-image.jpg'
            alt=''
          />
          <div className='author-name'>John Doe</div>
          <div className='date-container'>8/28/20XX</div>
        </div>
      </div>
    </>
  );
};

export default PostTitleCard;
