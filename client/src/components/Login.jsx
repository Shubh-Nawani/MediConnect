import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import axios from '../services/api';
import OAuthProviders from './OAuthProviders';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useTheme(); // For theme context

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setError(decodeURIComponent(error).replace(/_/g, ' '));
    }
  }, [searchParams]);

  useEffect(() => {
    // Add no-scroll class to body
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/patients/login', credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.patient));
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      }}
    >
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* High Blur Gradient Overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-400/30 to-yellow-400/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse delay-500"></div>
      
      {/* Quick Sign In - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <div className="glass-effect rounded-xl p-4 w-72">
          <div className="text-center mb-3">
            <h3 className="text-sm font-medium text-gray-100">
              Quick Sign In
            </h3>
            <p className="text-xs mt-1 text-gray-300">
              Use your existing account
            </p>
          </div>
          <OAuthProviders mode="login" />
        </div>
      </div>
      
      {/* Main Login Card - Centered */}
      <div className="flex items-center justify-center min-h-screen p-4 z-10">
        <div className="w-full max-w-sm">
          <div className="glass-effect rounded-2xl p-6 shadow-2xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <img 
                    src="/favicon.ico" 
                    alt="MediConnect" 
                    className="w-5 h-5"
                  />
                </div>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                MediConnect
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Welcome back! Please sign in to your account.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 shadow-sm">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-group">
              <label htmlFor="email" className="form-label text-xs font-medium mb-1 block">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="form-input text-sm py-2.5"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label text-xs font-medium mb-1 block">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="form-input text-sm py-2.5"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-2.5 text-sm font-medium shadow-lg mt-5"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-5">
            <p className="text-xs text-gray-300">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Create a new account
              </Link>
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
