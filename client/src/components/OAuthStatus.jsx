import { useState, useEffect } from 'react';
import axios from '../services/api';

function OAuthStatus({ user }) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOAuthStatus = async () => {
      try {
        // Get available providers
        const providersResponse = await axios.get('/auth/providers');
        setProviders(providersResponse.data.providers);
      } catch (error) {
        console.error('Failed to fetch OAuth status:', error);
        // Fallback to Google only
        setProviders([
          { name: 'google', displayName: 'Google', enabled: true }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOAuthStatus();
  }, [user]);

  const handleLinkAccount = (provider) => {
    // Redirect to OAuth provider for account linking
    window.location.href = `/api/auth/${provider}?link=true`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Accounts</h3>
      
      <div className="space-y-3">
        {providers.map((provider) => {
          const isLinked = user?.provider === provider.name;
          
          return (
            <div key={provider.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  {provider.name === 'google' && (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{provider.displayName}</h4>
                  <p className="text-sm text-gray-500">
                    {isLinked ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              
              <div>
                {isLinked ? (
                  <div className="flex items-center text-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <button
                    onClick={() => handleLinkAccount(provider.name)}
                    className="text-sm text-primary-600 hover:text-primary-500 font-medium"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {user?.provider && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Primary account:</strong> Signed in with {user.provider}
          </p>
        </div>
      )}
    </div>
  );
}

export default OAuthStatus;
