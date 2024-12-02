import axios from 'axios';

// Create axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to include token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication Services
export const authService = {
  register: (userData) => API.post('/users/register', userData),
  login: (userData) => API.post('/users/login', userData),
  getUserProfile: () => API.get('/users/profile'),
  updateProfile: (userData) => API.put('/users/profile', userData),
};

// Error Handling Utility
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('Error Response:', error.response.data);
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Error Request:', error.request);
    return 'No response received from server';
  } else {
    // Something happened in setting up the request
    console.error('Error Message:', error.message);
    return 'Error setting up the request';
  }
};

export default API;