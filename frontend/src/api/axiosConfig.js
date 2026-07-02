import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Reemplazar con la URL real del backend luego
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Peticiones: Agrega el Token a cada request si existe
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

// Interceptor de Respuestas: Atrapa errores 401 y redirige al login
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Limpiamos la sesión local
      localStorage.removeItem('buhotel_user');
      localStorage.removeItem('buhotel_token');
      
      // Emitimos un evento personalizado para que AuthContext o componentes lo escuchen 
      // y puedan redirigir usando el hook useNavigate (ya que aquí no estamos en un componente React)
      window.dispatchEvent(new Event('auth_unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;
