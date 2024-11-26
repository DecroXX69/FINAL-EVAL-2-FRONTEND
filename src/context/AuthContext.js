import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data and token from localStorage on app load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    // If both user and token are available, check token validity
    if (storedUser && storedToken) {
      const tokenExpiry = JSON.parse(atob(storedToken.split('.')[1])).exp * 1000; // Decode JWT to get expiry
      if (Date.now() < tokenExpiry) {
        setUser(storedUser); // Valid token, set user
      } else {
        logout(); // Expired token, clear user and token
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data
    localStorage.setItem('token', userData.token); // Store token
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const getToken = () => localStorage.getItem('token'); // Helper to get token

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
