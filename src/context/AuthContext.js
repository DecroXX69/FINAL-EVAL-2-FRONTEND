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

  const login = (userData, navigate) => {  // Accept navigate as parameter
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    
    // Handle redirect after successful login
    const redirectUrl = localStorage.getItem('redirectAfterAuth');
    if (redirectUrl) {
      localStorage.removeItem('redirectAfterAuth');
      
      const pendingSharedCart = localStorage.getItem('pendingSharedCart');
      if (pendingSharedCart) {
        const sharedCartData = localStorage.getItem(`shared-cart-${pendingSharedCart}`);
        if (sharedCartData) {
          localStorage.setItem('cart', sharedCartData);
          localStorage.removeItem('pendingSharedCart');
        }
      }
      
      navigate(redirectUrl);
    } else {
      navigate('/');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('redirectAfterAuth');
    localStorage.removeItem('pendingSharedCart');
  };

  const getToken = () => localStorage.getItem('token');

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};