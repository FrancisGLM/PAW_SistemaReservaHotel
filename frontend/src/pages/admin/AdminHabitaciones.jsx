import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const AdminHabitaciones = () => {
  const navigate = useNavigate();
  const [habitaciones, setHabitaciones] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [resHab, resHot] = await Promise.all([
          api.get('/habitaciones'),
          api.get('/hoteles')
        ]);
        
        const hotelesMap = resHot.data.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {});

        const mappedHabitaciones = resHab.data.map(hab => ({
          ...hab,
          hotel: hotelesMap[hab.hotelId] || null,
          estado: 'Disponible' // Mock de estado ya que no existe en Java
        }));

        setHabitaciones(mappedHabitaciones);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/habitaciones/editar/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/habitaciones/${id}`);
      setHabitaciones(habitaciones.filter(h => h.id !== id));
    } catch (error) {
      console.error("Error al eliminar habitación:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Gestión de Habitaciones</h2>
        <button 
          className="btn-marriott" 
          onClick={() => navigate('/admin/habitaciones/nuevo')}
          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
          <i className="bi bi-plus-lg me-2"></i> Nueva Habitación
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table className="table table-dark table-hover mb-0" style={{ backgroundColor: 'transparent' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Hotel</th>
              <th>Tipo</th>
              <th>Capacidad</th>
              <th>Precio</th>
              <th>Estado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map(hab => (
              <tr key={hab.id}>
                <td>#{hab.id}</td>
                <td>{hab.hotel?.nombre || 'Sin Hotel'}</td>
                <td><strong>{hab.tipo}</strong></td>
                <td><i className="bi bi-people-fill me-2"></i>{hab.capacidad} pax</td>
                <td>${hab.precioPorNoche}</td>
                <td>
                  <span style={{
                    ...styles.badge, 
                    backgroundColor: 
                      hab.estado === 'Disponible' ? 'rgba(76, 175, 80, 0.2)' : 
                      hab.estado === 'Ocupada' ? 'rgba(33, 150, 243, 0.2)' : 
                      'rgba(255, 152, 0, 0.2)',
                    color: 
                      hab.estado === 'Disponible' ? '#4caf50' : 
                      hab.estado === 'Ocupada' ? '#2196f3' : 
                      '#ff9800'
                  }}>
                    {hab.estado}
                  </span>
                </td>
                <td className="text-end">
                  <button style={styles.actionBtn} title="Editar" onClick={() => handleEdit(hab.id)}>
                    <i className="bi bi-pencil-square text-warning"></i>
                  </button>
                  <button style={styles.actionBtn} title="Eliminar" onClick={() => handleDelete(hab.id)}>
                    <i className="bi bi-trash text-danger"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default function AdminHabitacionesWithStyles() {
  return (
    <>
      <GlobalStyle />
      <AdminHabitaciones />
    </>
  );
}
