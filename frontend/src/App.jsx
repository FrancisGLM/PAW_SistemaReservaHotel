import React from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Componente para proveer el layout con acceso al contexto de autenticación
const MainLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isAdminPage = location.pathname.startsWith('/admin');
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleUnauthorized = () => {
      logout(); // Asegura limpiar estado de React
      navigate('/login');
    };

    window.addEventListener('auth_unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth_unauthorized', handleUnauthorized);
    };
  }, [logout, navigate]);

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {!isAuthPage && <Navbar user={user} onLogout={logout} />}
      
      <div className="flex-grow-1 d-flex flex-column">
        <AppRouter />
      </div>

      {!isAuthPage && !isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
