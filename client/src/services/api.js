import axios from 'axios';
import config from '../config/env.js';

const instance = axios.create({
  baseURL: config.apiBaseUrl,
});

// Add request interceptor for debugging (optional)
instance.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling (optional)
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('API Error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
