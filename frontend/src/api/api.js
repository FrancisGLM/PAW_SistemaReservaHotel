import axios from 'axios';

// Create Axios instance with base URL (adjust to match actual backend URL when ready)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor: Inject JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('buhotel_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token from storage
      localStorage.removeItem('buhotel_token');
      
      // Dispatch custom event to notify React context (AuthContext)
      window.dispatchEvent(new Event('auth:unauthorized'));
      
      // Optional fallback if not using Context listener:
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
