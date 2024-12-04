import axios from 'axios';


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
  headers: {
    'Content-Type': 'application/json',
  }
});


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


export const authService = {
  register: (userData) => API.post('/users/register', userData),
  login: (userData) => API.post('/users/login', userData),
  getUserProfile: () => API.get('/users/profile'),
  updateProfile: (userData) => API.put('/users/profile', userData),
};


export const handleApiError = (error) => {
  if (error.response) {
   
    console.error('Error Response:', error.response.data);
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    
    console.error('Error Request:', error.request);
    return 'No response received from server';
  } else {
    
    console.error('Error Message:', error.message);
    return 'Error setting up the request';
  }
};

export default API;
