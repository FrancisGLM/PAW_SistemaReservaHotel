import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

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
  const [hoteles, setHoteles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isEditing) {
      const fetchHabitacion = async () => {
        try {
          const res = await api.get(`/habitaciones/${id}`);
          setFormData({
            hotel: res.data.hotelId || '',
            tipo: res.data.tipo || 'Estandar',
            capacidad: res.data.capacidad || '2',
            precio: res.data.precioPorNoche || '',
            estado: 'Disponible',
            descripcion: res.data.descripcion || '' // assuming there is descripcion
          });
        } catch (error) {
          console.error(error);
          setErrorMsg("No se pudo cargar la habitación.");
        }
      };
      fetchHabitacion();
    }
  }, [id, isEditing]);

  useEffect(() => {
    const fetchHoteles = async () => {
      try {
        const res = await api.get('/hoteles');
        setHoteles(res.data);
      } catch (error) {
        console.error("Error al cargar la lista de hoteles", error);
      }
    };
    fetchHoteles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const payload = {
        hotelId: parseInt(formData.hotel),
        numero: Math.floor(Math.random() * 900 + 100).toString(), // Genera un numero aleatorio (ej. 304)
        tipo: formData.tipo,
        precioPorNoche: parseFloat(formData.precio),
        capacidad: parseInt(formData.capacidad),
      };

      if (isEditing) {
        await api.put(`/habitaciones/${id}`, payload);
      } else {
        await api.post('/habitaciones', payload);
      }
      navigate('/admin/habitaciones');
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.mensaje || "Error al procesar la solicitud.");
    }
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
                {hoteles.map(h => (
                  <option key={h.id} value={h.id}>{h.nombre}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label style={styles.label}>Tipo de Habitación *</label>
              <select 
                name="tipo"
                className="form-select" 
                style={styles.input}
                value={formData.tipo}
                onChange={handleChange}
                required 
              >
                <option value="Económica">Económica</option>
                <option value="Estandar">Estandar</option>
                <option value="Premium">Premium</option>
              </select>
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
                <option value="En Mantenimiento">En Mantenimiento</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label style={styles.label}>Descripción de Amenidades</label>
            <textarea 
              name="descripcion"
              className="form-control" 
              style={{ ...styles.input, minHeight: '100px' }}
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción de lo que incluye la habitación (opcional)..."
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
