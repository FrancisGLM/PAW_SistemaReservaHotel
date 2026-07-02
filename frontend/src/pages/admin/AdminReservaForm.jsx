import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminReservaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    estado: 'Confirmada'
  });

  // Datos mock de la reserva (solo lectura para el admin)
  const reservaInfo = {
    huesped: 'Ana Martínez',
    email: 'ana@example.com',
    hotel: 'Hotel Marriott Premium',
    checkIn: '2025-08-10',
    checkOut: '2025-08-15',
    habitacion: 'Suite Presidencial (Pax: 4)',
    total: '2500'
  };

  useEffect(() => {
    // Aquí cargaríamos el estado actual de la reserva
    setFormData({ estado: 'Confirmada' });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Estado de la reserva actualizado a: ${formData.estado}`);
    navigate('/admin/reservas');
  };

  return (
    <div style={styles.container}>
      <div className="d-flex align-items-center mb-4">
        <button 
          style={styles.backBtn}
          onClick={() => navigate('/admin/reservas')}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2 style={{ color: 'var(--text-primary)', margin: 0, marginLeft: '1rem' }}>
          Gestionar Reserva #{id}
        </h2>
      </div>

      <div style={styles.formCard}>
        <div className="row mb-4">
          <div className="col-md-6">
            <h5 style={{ color: 'var(--accent-gold)' }}>Datos del Huésped</h5>
            <p style={{ color: 'var(--text-primary)', margin: 0 }}><strong>Nombre:</strong> {reservaInfo.huesped}</p>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}><strong>Email:</strong> {reservaInfo.email}</p>
          </div>
          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <h5 style={{ color: 'var(--accent-gold)' }}>Detalles del Alojamiento</h5>
            <p style={{ color: 'var(--text-primary)', margin: 0 }}><strong>Hotel:</strong> {reservaInfo.hotel}</p>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}><strong>Habitación:</strong> {reservaInfo.habitacion}</p>
          </div>
        </div>

        <div className="row mb-4 pb-4 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
          <div className="col-md-6">
            <p style={{ color: 'var(--text-primary)', margin: 0 }}>
              <i className="bi bi-calendar-event me-2" style={{ color: 'var(--accent-gold)' }}></i>
              <strong>Check-in:</strong> {reservaInfo.checkIn}
            </p>
            <p style={{ color: 'var(--text-primary)', margin: 0 }}>
              <i className="bi bi-calendar-check me-2" style={{ color: 'var(--accent-gold)' }}></i>
              <strong>Check-out:</strong> {reservaInfo.checkOut}
            </p>
          </div>
          <div className="col-md-6 text-md-end d-flex align-items-end justify-content-md-end mt-3 mt-md-0">
            <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>Total: <span style={{ color: '#4caf50' }}>${reservaInfo.total}</span></h4>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row align-items-end">
            <div className="col-md-8 mb-3">
              <label style={styles.label}>Modificar Estado de la Reserva *</label>
              <select 
                name="estado"
                className="form-select" 
                style={styles.input}
                value={formData.estado}
                onChange={handleChange}
                required
              >
                <option value="Pendiente">Pendiente (Pago en espera)</option>
                <option value="Confirmada">Confirmada (Pago realizado)</option>
                <option value="Completada">Completada (Check-out exitoso)</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
            
            <div className="col-md-4 mb-3 d-flex justify-content-end gap-3">
              <button 
                type="button" 
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate('/admin/reservas')}
                style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
              >
                Volver
              </button>
              <button 
                type="submit" 
                className="btn-marriott w-100"
              >
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  backBtn: {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  formCard: {
    backgroundColor: 'var(--bg-secondary)',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-subtle)',
  },
  label: {
    color: 'var(--text-secondary)',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  }
};

const GlobalStyle = () => (
  <style>{`
    .form-control:focus, .form-select:focus {
      background-color: var(--bg-primary);
      border-color: var(--accent-gold);
      color: var(--text-primary);
      box-shadow: 0 0 0 0.25rem rgba(194, 155, 98, 0.25);
    }
  `}</style>
);

export default function AdminReservaFormWithStyles() {
  return (
    <>
      <GlobalStyle />
      <AdminReservaForm />
    </>
  );
}
