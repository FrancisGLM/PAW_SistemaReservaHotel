import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminHabitacionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    hotel: '',
    tipo: 'Estandar',
    capacidad: '2',
    precio: '',
    estado: 'Disponible',
    descripcion: ''
  });

  useEffect(() => {
    if (isEditing) {
      setFormData({
        hotel: '1', // ID mock del hotel
        tipo: 'Suite Presidencial',
        capacidad: '4',
        precio: '500',
        estado: 'Disponible',
        descripcion: 'Una suite de lujo con vista al mar y todas las comodidades premium.'
      });
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Habitación ${isEditing ? 'actualizada' : 'creada'} correctamente.`);
    navigate('/admin/habitaciones');
  };

  return (
    <div style={styles.container}>
      <div className="d-flex align-items-center mb-4">
        <button 
          style={styles.backBtn}
          onClick={() => navigate('/admin/habitaciones')}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2 style={{ color: 'var(--text-primary)', margin: 0, marginLeft: '1rem' }}>
          {isEditing ? 'Editar Habitación' : 'Nueva Habitación'}
        </h2>
      </div>

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label style={styles.label}>Hotel Asignado *</label>
              <select 
                name="hotel"
                className="form-select" 
                style={styles.input}
                value={formData.hotel}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un hotel...</option>
                <option value="1">Hotel Marriott Premium</option>
                <option value="2">Resort Hilton Elite</option>
                <option value="3">Boutique Paris</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label style={styles.label}>Tipo de Habitación *</label>
              <input 
                type="text" 
                name="tipo"
                className="form-control" 
                style={styles.input}
                value={formData.tipo}
                onChange={handleChange}
                required 
                minLength="3"
                placeholder="Ej. Suite Presidencial"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label style={styles.label}>Capacidad (Pax) *</label>
              <input 
                type="number" 
                name="capacidad"
                className="form-control" 
                style={styles.input}
                value={formData.capacidad}
                onChange={handleChange}
                required 
                min="1"
                max="10"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label style={styles.label}>Precio por Noche ($) *</label>
              <input 
                type="number" 
                name="precio"
                className="form-control" 
                style={styles.input}
                value={formData.precio}
                onChange={handleChange}
                required 
                min="10"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label style={styles.label}>Estado *</label>
              <select 
                name="estado"
                className="form-select" 
                style={styles.input}
                value={formData.estado}
                onChange={handleChange}
                required
              >
                <option value="Disponible">Disponible</option>
                <option value="Ocupada">Ocupada</option>
                <option value="Mantenimiento">Mantenimiento</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label style={styles.label}>Descripción de Amenidades *</label>
            <textarea 
              name="descripcion"
              className="form-control" 
              style={{ ...styles.input, minHeight: '100px' }}
              value={formData.descripcion}
              onChange={handleChange}
              required 
              minLength="10"
              placeholder="Descripción de lo que incluye la habitación..."
            ></textarea>
          </div>

          <div className="d-flex justify-content-end gap-3">
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/admin/habitaciones')}
              style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-marriott"
              style={{ padding: '0.6rem 2rem' }}
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Habitación'}
            </button>
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

export default function AdminHabitacionFormWithStyles() {
  return (
    <>
      <GlobalStyle />
      <AdminHabitacionForm />
    </>
  );
}
