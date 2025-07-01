// AuthContext.js (React Web)
import React, { createContext, useState, useEffect } from 'react';
import { loginService } from '../services/auth'; // Ensure this service exists

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('authToken') || null;
  });

  const login = async (credentials) => {
    try {
      const token = await loginService(credentials);
      setAuthToken(token);
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  // Optional: auto-refresh or validate token on load
  useEffect(() => {
    // add token validation logic here if needed
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
