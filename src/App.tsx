import './App.css';
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/blog'>Blog</Link>
      </nav>

      <Outlet />
    </>
  );
}

export default App;
