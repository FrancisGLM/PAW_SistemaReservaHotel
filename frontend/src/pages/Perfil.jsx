import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Perfil = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: '+56 9 1234 5678',
    nacionalidad: 'Chilena'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Simular guardado
    setIsEditing(false);
    alert('¡Perfil actualizado con éxito! (Simulación)');
  };

  return (
    <div className="container py-5 mt-5 min-vh-100 page-enter">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Mi Perfil</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Gestiona tu información personal y preferencias.</p>
        </div>
        <Link to="/dashboard" className="btn btn-outline-light d-flex align-items-center gap-2" style={{ borderColor: 'var(--border-color)' }}>
          <i className="bi bi-arrow-left"></i> Volver al Panel
        </Link>
      </div>

      <div className="row g-5">
        {/* Columna Izquierda - Avatar */}
        <div className="col-lg-4">
          <div className="card border-0 text-center p-5" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', boxShadow: 'var(--shadow-subtle)' }}>
            <div className="position-relative d-inline-block mx-auto mb-4">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px', backgroundColor: 'var(--accent-gold)', color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>
                {user?.nombre?.charAt(0) || 'U'}
              </div>
              <button className="btn btn-light position-absolute bottom-0 end-0 rounded-circle shadow-sm" style={{ width: '40px', height: '40px', padding: 0 }}>
                <i className="bi bi-camera-fill text-dark"></i>
              </button>
            </div>
            <h4 className="fw-bold" style={{ color: 'var(--text-primary)' }}>{user?.nombre}</h4>
            <p className="mb-2" style={{ color: 'var(--accent-gold)', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>{user?.rol}</p>
            <p className="small" style={{ color: 'var(--text-secondary)' }}>Miembro desde Enero 2024</p>
          </div>
        </div>

        {/* Columna Derecha - Formulario */}
        <div className="col-lg-8">
          <div className="card border-0" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', boxShadow: 'var(--shadow-subtle)' }}>
            <div className="card-body p-4 p-xl-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0" style={{ color: 'var(--text-primary)' }}>Información Personal</h4>
                <button 
                  className={`btn ${isEditing ? 'btn-outline-danger' : 'btn-outline-gold'} btn-sm px-3`}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancelar' : 'Editar Información'}
                </button>
              </div>

              <form onSubmit={handleSave}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Nombre Completo</label>
                    <input 
                      type="text" 
                      className={`form-control shadow-none px-4 ${isEditing ? 'auth-input' : ''}`}
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      disabled={!isEditing}
                      style={{ 
                        height: '50px', 
                        borderRadius: '12px',
                        backgroundColor: isEditing ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.2)',
                        color: isEditing ? '#fff' : 'var(--text-secondary)',
                        border: isEditing ? '1px solid var(--border-color)' : 'none'
                      }}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Correo Electrónico</label>
                    <input 
                      type="email" 
                      className="form-control shadow-none px-4"
                      name="email"
                      value={formData.email}
                      disabled
                      style={{ 
                        height: '50px', 
                        borderRadius: '12px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        color: 'var(--text-secondary)',
                        border: 'none',
                        cursor: 'not-allowed'
                      }}
                    />
                    <div className="form-text" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>El correo no puede ser modificado.</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Teléfono</label>
                    <input 
                      type="text" 
                      className={`form-control shadow-none px-4 ${isEditing ? 'auth-input' : ''}`}
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      disabled={!isEditing}
                      style={{ 
                        height: '50px', 
                        borderRadius: '12px',
                        backgroundColor: isEditing ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.2)',
                        color: isEditing ? '#fff' : 'var(--text-secondary)',
                        border: isEditing ? '1px solid var(--border-color)' : 'none'
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Nacionalidad</label>
                    <input 
                      type="text" 
                      className={`form-control shadow-none px-4 ${isEditing ? 'auth-input' : ''}`}
                      name="nacionalidad"
                      value={formData.nacionalidad}
                      onChange={handleChange}
                      disabled={!isEditing}
                      style={{ 
                        height: '50px', 
                        borderRadius: '12px',
                        backgroundColor: isEditing ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.2)',
                        color: isEditing ? '#fff' : 'var(--text-secondary)',
                        border: isEditing ? '1px solid var(--border-color)' : 'none'
                      }}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-5 text-end border-top pt-4" style={{ borderColor: 'var(--border-color) !important' }}>
                    <button type="submit" className="btn btn-marriott px-5 py-2 fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
                      Guardar Cambios
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
