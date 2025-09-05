import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className='navbar'>
        <div className='nav-namespace'>Max Weekley</div>
        <div className='nav-list'>
          <Link to={'/'} className='nav-item'>
            Home
          </Link>
          <Link to={'/blog'} className='nav-item'>
            Blog
          </Link>
          <Link to={'/about'} className='nav-item'>
            About
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
