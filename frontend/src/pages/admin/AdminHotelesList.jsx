import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHotelesList = () => {
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoteles = async () => {
      try {
        const res = await fetch('/mocks/hoteles.json');
        const data = await res.json();
        setHoteles(data);
      } catch (error) {
        console.error("Error cargando hoteles mock:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHoteles();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/hoteles/editar/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este hotel?')) {
      setHoteles(hoteles.filter(h => h.id !== id));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Gestión de Hoteles</h2>
        <button 
          className="btn-marriott" 
          onClick={() => navigate('/admin/hoteles/nuevo')}
          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
          <i className="bi bi-plus-lg me-2"></i> Nuevo Hotel
        </button>
      </div>

      <div style={styles.tableContainer}>
        {loading ? (
          <div className="text-center p-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <table className="table table-dark table-hover mb-0" style={{ backgroundColor: 'transparent' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Ciudad</th>
                <th>Precio Base</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {hoteles.map(hotel => (
                <tr key={hotel.id}>
                  <td>{hotel.id}</td>
                  <td><strong>{hotel.nombre}</strong></td>
                  <td>{hotel.ubicacion}</td>
                  <td>${hotel.precioMinimo}/noche</td>
                  <td>
                    <span style={{
                      ...styles.badge, 
                      backgroundColor: 'rgba(76, 175, 80, 0.2)',
                      color: '#4caf50'
                    }}>
                      Activo
                    </span>
                  </td>
                  <td className="text-end">
                    <button 
                      style={styles.actionBtn} 
                      onClick={() => handleEdit(hotel.id)}
                      title="Editar"
                    >
                      <i className="bi bi-pencil-square text-warning"></i>
                    </button>
                    <button 
                      style={styles.actionBtn} 
                      onClick={() => handleDelete(hotel.id)}
                      title="Eliminar"
                    >
                      <i className="bi bi-trash text-danger"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {hoteles.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-muted">
                    No hay hoteles registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  tableContainer: {
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-subtle)',
  },
  badge: {
    padding: '0.25rem 0.6rem',
    borderRadius: '50px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    padding: '0.4rem',
    cursor: 'pointer',
    marginLeft: '0.5rem',
    borderRadius: '4px',
    transition: 'background 0.2s',
  }
};

// Necesitamos añadir una pequeña regla CSS para el hover de las filas en modo oscuro
// ya que Bootstrap por defecto puede no encajar perfectamente con nuestro var(--bg-secondary)
const GlobalStyle = () => (
  <style>{`
    .table-dark {
      --bs-table-bg: transparent;
      --bs-table-striped-bg: rgba(255, 255, 255, 0.05);
      --bs-table-hover-bg: rgba(255, 255, 255, 0.05);
      color: var(--text-primary);
      border-color: var(--border-color);
    }
    .table-dark th {
      color: var(--text-secondary);
      font-weight: 600;
      border-bottom: 2px solid var(--border-color);
      padding: 1rem;
    }
    .table-dark td {
      padding: 1rem;
      vertical-align: middle;
      border-bottom: 1px solid var(--border-color);
    }
  `}</style>
);

export default function AdminHotelesListWithStyles() {
  return (
    <>
      <GlobalStyle />
      <AdminHotelesList />
    </>
  );
}
