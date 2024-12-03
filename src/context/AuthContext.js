import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    
    if (storedUser && storedToken) {
      const tokenExpiry = JSON.parse(atob(storedToken.split('.')[1])).exp * 1000; 
      if (Date.now() < tokenExpiry) {
        setUser(storedUser); 
      } else {
        logout(); 
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); 
    localStorage.setItem('token', userData.token); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const getToken = () => localStorage.getItem('token'); 

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};