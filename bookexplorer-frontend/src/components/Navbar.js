// src/components/Navbar.js
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';
import { getToken, clearToken } from '../auth';

function Navbar() {
  const location = useLocation();
  const navigate  = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getToken()));
  const [username, setUsername]     = useState('');

  // Re-compute login state whenever our custom 'auth' event fires
  useEffect(() => {
    const onAuth = () => {
      const hasToken = Boolean(getToken());
      setIsLoggedIn(hasToken);
      if (hasToken) {
        // fetch current user
        api.get('api/user/')
          .then(res => setUsername(res.data.username))
          .catch(() => setUsername(''));
      } else {
        setUsername('');
      }
    };

    // run once on mount
    onAuth();

    // subscribe to auth changes
    window.addEventListener('auth', onAuth);
    return () => window.removeEventListener('auth', onAuth);
  }, []);

  const navLinkClass = (path) =>
    `hover:text-blue-300 ${location.pathname === path ? 'text-blue-400 underline' : ''}`;

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
        
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-bold text-blue-400 hover:text-blue-300"
        >
          📚 BookExplorer
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6 ml-10 text-sm font-medium">
          <Link to="/" className={navLinkClass('/')}>Home</Link>
          <Link to="/search" className={navLinkClass('/search')}>Search</Link>

          {isLoggedIn && (
            <>
              <Link to="/add-book" className={navLinkClass('/add-book')}>Add Book</Link>
              <Link to="/my-books" className={navLinkClass('/my-books')}>My Books</Link>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          {isLoggedIn && (
            <span className="text-sm text-gray-300">
              Welcome, <span className="font-medium text-white">{username || '…'}</span>
            </span>
          )}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700 text-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 px-4 py-1.5 rounded hover:bg-green-700 text-sm"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-1.5 rounded hover:bg-red-700 text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
