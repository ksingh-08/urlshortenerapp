import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, loadUser } from '../store/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && localStorage.getItem('token')) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-white font-bold text-xl">
              URL Shortener
            </Link>
            <div className="hidden md:block ml-10 space-x-4">
              <Link to="/dashboard" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
              <Link to="/analytics" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                Analytics
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-white text-indigo-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="flex md:hidden">
            <button className="text-white hover:bg-indigo-700 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
              {/* Hamburger Menu Icon */}
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (hidden for now) */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/dashboard" className="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium">
            Dashboard
          </Link>
          <Link to="/create" className="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium">
            Create URL
          </Link>
          <Link to="/analytics" className="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium">
            Analytics
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-indigo-700">
          {isAuthenticated && user ? (
            <div className="px-2 space-y-1">
              <span className="block text-white px-3 py-2">{user.email}</span>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="px-2 space-y-1">
              <Link to="/login" className="block text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>
              <Link to="/register" className="block text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
