import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/api';

function LabTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Sample lab tests data
    const sampleTests = [
      {
        _id: '1',
        name: 'Complete Blood Count (CBC)',
        description: 'Comprehensive blood analysis including white blood cells, red blood cells, and platelets',
        price: 45,
        category: 'Blood Test',
        duration: '2-4 hours',
        fastingRequired: false
      },
      {
        _id: '2',
        name: 'Basic Metabolic Panel',
        description: 'Tests blood sugar, electrolytes, and kidney function markers',
        price: 65,
        category: 'Blood Test',
        duration: '3-6 hours',
        fastingRequired: true
      },
      {
        _id: '3',
        name: 'Lipid Profile',
        description: 'Cholesterol and triglycerides levels assessment for cardiovascular health',
        price: 55,
        category: 'Blood Test',
        duration: '4-6 hours',
        fastingRequired: true
      },
      {
        _id: '4',
        name: 'Thyroid Function Test (TSH)',
        description: 'Measures thyroid-stimulating hormone to assess thyroid function',
        price: 75,
        category: 'Hormone Test',
        duration: '6-8 hours',
        fastingRequired: false
      },
      {
        _id: '5',
        name: 'Liver Function Panel',
        description: 'Comprehensive assessment of liver enzymes and function markers',
        price: 85,
        category: 'Blood Test',
        duration: '4-6 hours',
        fastingRequired: true
      },
      {
        _id: '6',
        name: 'Urinalysis',
        description: 'Complete urine analysis for kidney function and urinary tract health',
        price: 35,
        category: 'Urine Test',
        duration: '2-3 hours',
        fastingRequired: false
      },
      {
        _id: '7',
        name: 'Vitamin D Test',
        description: 'Measures 25-hydroxyvitamin D levels for bone health assessment',
        price: 95,
        category: 'Vitamin Test',
        duration: '24-48 hours',
        fastingRequired: false
      },
      {
        _id: '8',
        name: 'HbA1c (Diabetes Test)',
        description: 'Long-term blood sugar control assessment for diabetes management',
        price: 125,
        category: 'Diabetes Test',
        duration: '6-12 hours',
        fastingRequired: false
      }
    ];

    const fetchTests = async () => {
      try {
        setLoading(true);
        // Try to fetch from API first
        const res = await axios.get('/tests');
        setTests(res.data.length > 0 ? res.data : sampleTests);
      } catch {
        // If API fails, use sample data
        console.log('Using sample data for lab tests');
        setTests(sampleTests);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-100 mb-4">
          Available Lab Tests
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Choose from our comprehensive range of lab tests. Quick, reliable, and affordable healthcare at your fingertips.
        </p>
        
        {!token && (
          <div className="mt-8 p-6 bg-blue-900/20 rounded-xl border border-blue-700/50">
            <h3 className="text-lg font-semibold text-blue-100 mb-2">Ready to get started?</h3>
            <p className="text-blue-200 mb-4">Create an account to book tests and manage your health records.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
                Create Account
              </Link>
              <Link to="/login" className="px-6 py-3 bg-white/10 text-gray-200 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Tests Grid */}
      {tests.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-200 mb-2">No tests available</h3>
          <p className="text-gray-400">Lab tests will appear here when they become available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div key={test._id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 group hover:bg-slate-800/70">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-400">₹{test.price}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors duration-200">
                {test.name}
              </h3>
              
              {test.description && (
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {test.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center text-sm text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Quick results
                </div>
                
                {token ? (
                  <Link 
                    to="/book" 
                    state={{ testId: test._id, testName: test.name, testPrice: test.price }}
                    className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors duration-200"
                  >
                    Book Now →
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors duration-200"
                  >
                    Login to Book →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LabTests;
