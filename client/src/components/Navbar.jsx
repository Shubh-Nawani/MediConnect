import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar({ isAuthPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  // Scroll detection (disabled on auth pages)
  useEffect(() => {
    if (isAuthPage) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthPage]);

  // Refresh navbar state on route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Load user data
  useEffect(() => {
    if (isLoggedIn) {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    navigate('/login');
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/tests', label: 'Lab Tests', icon: '🔬' },
    { path: '/book', label: 'Book Test', icon: '📅' },
    { path: '/bookings', label: 'My Bookings', icon: '📋' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
      isScrolled 
        ? 'py-2 mx-4 mt-2 rounded-2xl backdrop-blur-xl bg-slate-900/90 border border-white/10 shadow-2xl' 
        : 'py-3 mx-0 mt-0 rounded-none backdrop-blur-md bg-slate-900/70 border-b border-white/5'
    }`}>
      <div className={`transition-all duration-300 ${
        isScrolled ? 'max-w-5xl mx-auto px-4' : 'max-w-7xl mx-auto px-6'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
            <div className={`${isScrolled ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500`}>
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className={`${isScrolled ? 'text-lg' : 'text-xl'} font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hidden sm:block transition-all duration-500`}>
              MediConnect
            </span>
          </Link>

          {/* Center Navigation */}
          {isLoggedIn && (
            <div className="hidden lg:flex items-center space-x-1 bg-white/5 backdrop-blur-md rounded-2xl p-1 border border-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-blue-600/20 text-blue-400 shadow-lg'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-white/10'
                  }`}
                >
                  <span>{link.icon}</span>
                  <span className="hidden xl:block">{link.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {isLoggedIn && user ? (
              <div className="flex items-center space-x-3">
                {/* Greeting aligned with profile */}
                <div className="hidden lg:flex items-center space-x-3">
                  <div className="text-right flex flex-col justify-center">
                    <p className="text-sm font-medium text-gray-300 leading-tight">
                      {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}! 👋
                    </p>
                    <div className="flex items-center justify-end space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-medium">Online</span>
                    </div>
                  </div>

                  {/* Profile Dropdown */}
                  <div className="relative profile-dropdown">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10"
                    >
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover" />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {getUserInitials()}
                        </div>
                      )}
                      <svg className="w-4 h-4 text-gray-400 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden z-50">
                        <div className="p-4 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border-b border-gray-700/50">
                          <div className="flex items-center space-x-3">
                            {user?.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover" />
                            ) : (
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold">
                                {getUserInitials()}
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-gray-200 text-sm">{user?.name || 'User'}</p>
                              <p className="text-xs text-gray-400">{user?.email || 'user@example.com'}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200"
                          >
                            <span>🚪</span>
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-white/10 transition-all duration-300">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 transition-all duration-300 border border-white/10"
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            <div className="p-3 backdrop-blur-lg bg-slate-900/95 rounded-2xl shadow-xl border border-gray-700/50">
              {/* Navigation Links */}
              {isLoggedIn && (
                <div className="space-y-1 mb-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive(link.path)
                          ? 'bg-blue-600/20 text-blue-400'
                          : 'text-gray-300 hover:text-blue-400 hover:bg-white/10'
                      }`}
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* User Info or Auth Buttons */}
              {isLoggedIn && user ? (
                <div className="pt-3 border-t border-gray-700/50">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl mb-2">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold">
                        {getUserInitials()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}! 👋
                      </p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/20 transition-all duration-200"
                  >
                    <span>🚪</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-white/10 transition-all duration-300 text-center"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 text-white transition-all duration-300 text-center"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
