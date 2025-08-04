import { useState, useEffect } from 'react';
import GoogleOAuthButton from './GoogleOAuthButton';
import axios from '../services/api';

function OAuthProviders({ 
  mode = 'login', // 'login' or 'register'
  className = ""
}) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('/auth/providers');
        setProviders(response.data.providers);
      } catch (error) {
        console.error('Failed to fetch OAuth providers:', error);
        // Fallback to default providers
        setProviders([
          { name: 'google', displayName: 'Google', enabled: true }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const enabledProviders = providers.filter(provider => provider.enabled);

  if (enabledProviders.length === 0) {
    return null;
  }

  const getButtonText = (providerName) => {
    const action = mode === 'login' ? 'Sign in' : 'Sign up';
    return `${action} with ${providerName}`;
  };

  return (
    <div className={className}>
      <div className="space-y-3">
        {enabledProviders.map((provider) => {
          if (provider.name === 'google') {
            return (
              <GoogleOAuthButton 
                key={provider.name}
                text={getButtonText(provider.displayName)} 
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default OAuthProviders;
