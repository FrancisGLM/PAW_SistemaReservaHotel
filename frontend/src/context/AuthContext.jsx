import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('buhotel_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulating API call
    try {
      const response = await fetch('/mocks/auth.json');
      const data = await response.json();
      
      // We will pretend the login is always successful for the mock user
      if (data.user) {
        setUser(data.user);
        localStorage.setItem('buhotel_user', JSON.stringify(data.user));
        localStorage.setItem('buhotel_token', data.token);
        return { success: true };
      }
    } catch (error) {
      console.error("Login error", error);
      return { success: false, error: 'Error de conexión.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('buhotel_user');
    localStorage.removeItem('buhotel_token');
  };

  const register = async (userData) => {
    // Simulating registration (returning a mock user based on input)
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      nombre: userData.nombre,
      email: userData.email,
      rol: 'USER'
    };
    setUser(newUser);
    localStorage.setItem('buhotel_user', JSON.stringify(newUser));
    localStorage.setItem('buhotel_token', 'mock-jwt-token-register');
    return { success: true };
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
