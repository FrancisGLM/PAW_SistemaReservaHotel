import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const AdminHotelForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nombre: '',
    ciudad: '',
    precio: '',
    estrellas: '5',
    descripcion: '',
    imagen: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isEditing) {
      const fetchHotel = async () => {
        try {
          const res = await api.get(`/hoteles/${id}`);
          setFormData({
            nombre: res.data.nombre || '',
            ciudad: res.data.direccion || '',
            precio: res.data.precioMinimo || '',
            estrellas: res.data.estrellas || '5',
            descripcion: res.data.descripcion || '',
            imagen: res.data.imagen || ''
          });
        } catch (error) {
          console.error("Error al cargar el hotel:", error);
          setErrorMsg("No se pudo cargar la información del hotel.");
        }
      };
      fetchHotel();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const payload = {
        nombre: formData.nombre,
        direccion: formData.ciudad,
        estrellas: parseInt(formData.estrellas),
        descripcion: formData.descripcion
      };
      
      if (isEditing) {
        await api.put(`/hoteles/${id}`, payload);
      } else {
        await api.post('/hoteles', payload);
      }
      navigate('/admin/hoteles');
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.mensaje || "Error al guardar el hotel. Revisa los datos e intenta de nuevo.");
    }
  };

  return (
    <div style={styles.container}>
      <div className="d-flex align-items-center mb-4">
        <button 
          style={styles.backBtn}
          onClick={() => navigate('/admin/hoteles')}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2 style={{ color: 'var(--text-primary)', margin: 0, marginLeft: '1rem' }}>
          {isEditing ? 'Editar Hotel' : 'Nuevo Hotel'}
        </h2>
      </div>

      {errorMsg && (
        <div className="alert alert-danger" style={{ backgroundColor: 'rgba(232, 65, 24, 0.1)', color: '#e84118', border: 'none', borderRadius: '8px' }}>
          <i className="bi bi-exclamation-circle-fill me-2"></i>
          {errorMsg}
        </div>
      )}

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label style={styles.label}>Nombre del Hotel *</label>
              <input 
                type="text" 
                name="nombre"
                className="form-control" 
                style={styles.input}
                value={formData.nombre}
                onChange={handleChange}
                required 
                minLength="3"
                maxLength="100"
                placeholder="Ej. Grand Hotel"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label style={styles.label}>Ciudad *</label>
              <input 
                type="text" 
                name="ciudad"
                className="form-control" 
                style={styles.input}
                value={formData.ciudad}
                onChange={handleChange}
                required 
                minLength="2"
                placeholder="Ej. Madrid"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label style={styles.label}>Precio Base ($) *</label>
              <input 
                type="number" 
                name="precio"
                className="form-control" 
                style={styles.input}
                value={formData.precio}
                onChange={handleChange}
                required 
                min="10"
                placeholder="0.00"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label style={styles.label}>Estrellas *</label>
              <select 
                name="estrellas"
                className="form-select" 
                style={styles.input}
                value={formData.estrellas}
                onChange={handleChange}
                required
              >
                <option value="1">1 Estrella</option>
                <option value="2">2 Estrellas</option>
                <option value="3">3 Estrellas</option>
                <option value="4">4 Estrellas</option>
                <option value="5">5 Estrellas</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label style={styles.label}>URL de la Imagen (Opcional)</label>
            <input 
              type="url" 
              name="imagen"
              className="form-control" 
              style={styles.input}
              value={formData.imagen}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="mb-4">
            <label style={styles.label}>Descripción *</label>
            <textarea 
              name="descripcion"
              className="form-control" 
              style={{ ...styles.input, minHeight: '120px' }}
              value={formData.descripcion}
              onChange={handleChange}
              required 
              minLength="10"
              maxLength="1000"
              placeholder="Descripción detallada del hotel..."
            ></textarea>
          </div>

          <div className="d-flex justify-content-end gap-3">
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/admin/hoteles')}
              style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-marriott"
              style={{ padding: '0.6rem 2rem' }}
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Hotel'}
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

// CSS global temporal para enfocar inputs
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

export default function AdminHotelFormWithStyles() {
  return (
    <>
      <GlobalStyle />
      <AdminHotelForm />
    </>
  );
}
