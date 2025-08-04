import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const user = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      navigate('/login?error=' + error);
      return;
    }

    if (token && user) {
      try {
        // Store token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        
        // Parse user data
        const userData = JSON.parse(decodeURIComponent(user));
        
        // Redirect to dashboard or home
        navigate('/', { 
          state: { 
            message: `Welcome back, ${userData.name}!`,
            type: 'success'
          }
        });
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
        navigate('/login?error=callback_processing_failed');
      }
    } else {
      navigate('/login?error=missing_credentials');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Completing sign in...</h2>
        <p className="text-gray-500 mt-2">Please wait while we process your authentication.</p>
      </div>
    </div>
  );
}

export default AuthCallback;
