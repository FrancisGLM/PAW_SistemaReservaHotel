import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5 mt-5 min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Hola, {user?.nombre?.split(' ')[0] || 'Viajero'}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Bienvenido a tu panel de control</p>
        </div>
        <div className="d-none d-md-flex gap-3">
          {user?.rol === 'ADMIN' && (
            <Link to="/admin/dashboard" className="btn btn-marriott px-4 py-2 d-flex align-items-center gap-2">
              <i className="bi bi-shield-lock-fill"></i> Panel de Administración
            </Link>
          )}
          <Link to="/hoteles" className="btn btn-outline-gold px-4 py-2">Explorar Destinos</Link>
        </div>
      </div>

      <div className="row g-4">
        {/* Tarjeta de Perfil */}
        <div className="col-lg-4">
          <div className="card border-0 h-100" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
            <div className="card-body p-4 text-center">
              <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px', backgroundColor: 'var(--accent-gold)', color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>
                {user?.nombre?.charAt(0) || 'U'}
              </div>
              <h5 className="fw-bold" style={{ color: 'var(--text-primary)' }}>{user?.nombre}</h5>
              <p className="small mb-4" style={{ color: 'var(--text-secondary)' }}>{user?.email}</p>
              
              <div className="d-grid gap-2">
                <Link to="/perfil" className="btn btn-marriott">Editar Perfil</Link>
                <Link to="/configuracion" className="btn btn-outline-light" style={{ borderColor: 'var(--border-color)' }}>Configuración</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta de Reservas */}
        <div className="col-lg-8">
          <div className="card border-0 h-100" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
            <div className="card-body p-4 p-xl-5">
              <h4 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Tus próximas reservas</h4>
              
              {/* Contenido Vacío (Mock) */}
              <div className="text-center py-5">
                <div className="d-inline-block p-4 rounded-circle mb-3" style={{ backgroundColor: 'rgba(194, 155, 98, 0.1)' }}>
                  <i className="bi bi-calendar-x fs-1" style={{ color: 'var(--accent-gold)' }}></i>
                </div>
                <h5 className="fw-bold" style={{ color: 'var(--text-primary)' }}>Aún no tienes viajes programados</h5>
                <p style={{ color: 'var(--text-secondary)' }}>¿Qué esperas para planear tu próxima aventura con nosotros?</p>
                <Link to="/" className="btn btn-outline-gold mt-3 px-4">Encontrar un hotel</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
