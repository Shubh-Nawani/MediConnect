import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../services/api';

function BookTest() {
  const [form, setForm] = useState({ testId: '', date: '' });
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Pre-fill form if test is passed from LabTests component
  useEffect(() => {
    if (location.state?.testId) {
      setForm(prev => ({ ...prev, testId: location.state.testId }));
    }
  }, [location.state]);

  // Fetch available tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get('/tests');
        setTests(res.data);
      } catch (err) {
        console.error('Error fetching tests:', err);
      }
    };
    fetchTests();
  }, []);

  const selectedTest = tests.find(test => test._id === form.testId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.testId || !form.date) {
      setError('Please select a test and date');
      return;
    }

    const selectedDate = new Date(form.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('Please select a future date');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.post('/bookings', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setSuccess('Test booked successfully!');
      setForm({ testId: '', date: '' });
      
      // Redirect to bookings after 2 seconds
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Book a Lab Test</h1>
        <p className="mt-2 text-gray-600">
          Schedule your lab test at your convenience
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          {error && (
            <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-error-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-error-700 text-sm">{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-success-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-success-700 text-sm">{success}</span>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Test Selection */}
            <div>
              <label htmlFor="testId" className="block text-sm font-medium text-gray-700 mb-2">
                Select Lab Test
              </label>
              <select
                id="testId"
                name="testId"
                value={form.testId}
                onChange={(e) => setForm({ ...form, testId: e.target.value })}
                className="input-field"
                required
              >
                <option value="">Choose a test...</option>
                {tests.map((test) => (
                  <option key={test._id} value={test._id}>
                    {test.name} - ₹{test.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Test Details Preview */}
            {selectedTest && (
              <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <h3 className="font-semibold text-primary-900 mb-2">Test Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-700">Test Name:</span>
                    <span className="font-medium text-primary-900">{selectedTest.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-700">Price:</span>
                    <span className="font-medium text-primary-900">₹{selectedTest.price}</span>
                  </div>
                  {selectedTest.description && (
                    <div>
                      <span className="text-primary-700">Description:</span>
                      <p className="text-primary-800 text-sm mt-1">{selectedTest.description}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Date Selection */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={minDate}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="input-field pl-10"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Select a date from tomorrow onwards
              </p>
            </div>

            {/* Important Information */}
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-warning-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-warning-900 font-medium text-sm">Important Instructions</h4>
                  <ul className="text-warning-800 text-xs mt-1 space-y-1">
                    <li>• Please arrive 15 minutes before your scheduled time</li>
                    <li>• Bring a valid photo ID for verification</li>
                    <li>• Follow any specific fasting requirements if applicable</li>
                    <li>• You can reschedule up to 24 hours before the appointment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 btn-secondary"
            >
              Back to Tests
            </button>
            <button
              type="submit"
              disabled={loading || !form.testId || !form.date}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </>
              ) : (
                'Book Test'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BookTest;
