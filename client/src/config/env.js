// Environment configuration utility
export const config = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  
  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || 'MediConnect',
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
  
  // Helper methods
  isDevelopment: () => import.meta.env.DEV,
  isProduction: () => import.meta.env.PROD,
  
  // Get all environment variables (for debugging)
  getAllEnvVars: () => {
    console.log('Environment Variables:', {
      apiBaseUrl: config.apiBaseUrl,
      appName: config.appName,
      appEnv: config.appEnv,
      isDev: config.isDevelopment(),
      isProd: config.isProduction(),
    });
  }
};

export default config;
