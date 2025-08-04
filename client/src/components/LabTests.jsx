import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/api';

function LabTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/tests');
        setTests(res.data);
      } catch (err) {
        setError('Failed to load lab tests. Please try again later.');
        console.error('Error fetching tests:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Available Lab Tests
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose from our comprehensive range of lab tests. Quick, reliable, and affordable healthcare at your fingertips.
        </p>
        
        {!token && (
          <div className="mt-8 p-6 bg-primary-50 rounded-xl border border-primary-200">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Ready to get started?</h3>
            <p className="text-primary-700 mb-4">Create an account to book tests and manage your health records.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="btn-primary">
                Create Account
              </Link>
              <Link to="/login" className="btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Tests Grid */}
      {tests.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tests available</h3>
          <p className="text-gray-600">Lab tests will appear here when they become available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div key={test._id} className="card-hover group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-success-600">₹{test.price}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                {test.name}
              </h3>
              
              {test.description && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {test.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Quick results
                </div>
                
                {token ? (
                  <Link 
                    to="/book" 
                    state={{ testId: test._id, testName: test.name, testPrice: test.price }}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                  >
                    Book Now →
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                  >
                    Login to Book →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Results</h3>
          <p className="text-gray-600">Get your lab results quickly with our efficient testing process.</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
          <p className="text-gray-600">Your health data is protected with enterprise-grade security.</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable Pricing</h3>
          <p className="text-gray-600">Quality healthcare shouldn't break the bank. Fair pricing for everyone.</p>
        </div>
      </div>
    </div>
  );
}

export default LabTests;
