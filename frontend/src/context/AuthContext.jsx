import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/axiosConfig';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Escuchar el evento de sesión expirada emitido por el interceptor de Axios
  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      navigate('/login');
    };

    window.addEventListener('auth_unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth_unauthorized', handleUnauthorized);
  }, [navigate]);

  useEffect(() => {
    // Verificar si hay usuario y token en localStorage al cargar la app
    const storedUser = localStorage.getItem('buhotel_user');
    const storedToken = localStorage.getItem('buhotel_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // El backend espera 'username' (que en nuestro caso es el email) y 'password'
      // Usamos axios puro para evitar el prefijo /api de axiosConfig
      const response = await axios.post('http://localhost:8080/auth/login', { username: email, password });
      
      const token = response.data.token;
      if (!token) throw new Error("No se recibió token");

      // Decodificamos el JWT para extraer el rol, email y nombre
      const decoded = jwtDecode(token);
      
      const userData = {
        email: decoded.sub, // En JWT 'sub' es el subject, que guardamos como el username/email
        nombre: decoded.nombre || decoded.sub.split('@')[0], // Usar nombre real del JWT
        rol: decoded.roles || 'USER'
      };

      setUser(userData);
      localStorage.setItem('buhotel_user', JSON.stringify(userData));
      localStorage.setItem('buhotel_token', token);
      
      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
      const msg = error.response?.data?.message || 'Correo o contraseña incorrectos.';
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('buhotel_user');
    localStorage.removeItem('buhotel_token');
    navigate('/login');
  };

  const updateUser = (newUserData) => {
    const updated = { ...user, ...newUserData };
    setUser(updated);
    localStorage.setItem('buhotel_user', JSON.stringify(updated));
  };

  const register = async (userData) => {
    try {
      // El backend espera: username (email), email, password, nombre y rol
      const payload = {
        username: userData.email,
        email: userData.email,
        nombre: userData.nombre, // Ahora enviamos el nombre real
        password: userData.password,
        rol: "USER" // Por defecto, todos los registros públicos son USER
      };
      
      // Usamos axios puro para evitar el prefijo /api de axiosConfig
      await axios.post('http://localhost:8080/auth/register', payload);
      
      // Tras registrar exitosamente, hacemos login automático
      return await login(userData.email, userData.password);
    } catch (error) {
      console.error("Error en registro:", error);
      const msg = error.response?.data?.message || 'Error al registrar usuario.';
      return { success: false, error: msg };
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
