import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  const token = localStorage.getItem('buhotel_token');

  // Si no hay usuario o no hay token, redirige a login
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Verificar roles
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />; // O a una página de "No autorizado"
  }

  // Si hay usuario (y cumple el rol si se especifica), renderiza el Outlet
  return <Outlet />;
};

export default ProtectedRoute;
