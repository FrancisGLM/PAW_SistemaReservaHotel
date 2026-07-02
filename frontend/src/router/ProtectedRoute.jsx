import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!token || !user) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
    // Si tiene un rol no permitido, ir a la página principal
    return <Navigate to="/" replace />;
  }

  // Renderizar la ruta hija
  return <Outlet />;
};

export default ProtectedRoute;
