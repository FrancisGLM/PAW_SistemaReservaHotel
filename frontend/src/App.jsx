import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
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
