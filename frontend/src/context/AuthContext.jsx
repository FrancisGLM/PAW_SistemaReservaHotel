import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

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
      // ESTE ES EL REQUISITO TÉCNICO: POST /auth/login
      // Fallará porque no hay backend real, así que lo atraparemos en el catch
      const response = await api.post('/auth/login', { email, password });
      
      // Si existiera backend, haríamos esto:
      // const data = response.data;
      // setUser(data.user);
      // localStorage.setItem('buhotel_user', JSON.stringify(data.user));
      // localStorage.setItem('buhotel_token', data.token);
      // return { success: true };
      
    } catch (error) {
      console.warn("La llamada real POST /auth/login falló (esperado sin backend). Fallback a simulación local.");
      
      try {
        // --- INICIO MOCK FALLBACK ---
        // Simulación temporal con 2 usuarios hardcodeados para poder probar
        const mockUsers = [
          {
            id: 1,
            email: 'admin@buhotel.com',
            password: 'admin',
            nombre: 'Ana Administradora',
            rol: 'ADMIN'
          },
          {
            id: 2,
            email: 'user@buhotel.com',
            password: 'user',
            nombre: 'Carlos Viajero',
            rol: 'USER'
          }
        ];

        const foundUser = mockUsers.find(u => u.email === email && u.password === password);

        if (foundUser) {
          // Quitamos el password del objeto antes de guardarlo
          const { password: _, ...userWithoutPass } = foundUser;
          
          setUser(userWithoutPass);
          localStorage.setItem('buhotel_user', JSON.stringify(userWithoutPass));
          localStorage.setItem('buhotel_token', 'mock-jwt-token-123456');
          return { success: true };
        } else {
          return { success: false, error: 'Correo o contraseña incorrectos.' };
        }
        // --- FIN MOCK FALLBACK ---
      } catch(e) {
        return { success: false, error: 'Error de conexión simulada.' };
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('buhotel_user');
    localStorage.removeItem('buhotel_token');
    navigate('/login'); // Requisito: redirigir al login
  };

  const register = async (userData) => {
    // Simulating registration
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
