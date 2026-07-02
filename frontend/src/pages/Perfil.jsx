import React from 'react';
import { useAuth } from '../context/AuthContext';

const Perfil = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5 mt-5">
      <h2>Mi Perfil</h2>
      <p>Nombre: {user?.nombre}</p>
      <p>Email: {user?.email}</p>
      <p>Rol: {user?.rol}</p>
    </div>
  );
};

export default Perfil;
