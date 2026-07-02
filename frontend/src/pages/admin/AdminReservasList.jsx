import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const AdminReservasList = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [filteredReservas, setFilteredReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todas');
  const [sortOrder, setSortOrder] = useState('recientes');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch('/mocks/reservas.json');
        const data = await res.json();
        setReservas(data);
        setFilteredReservas(data);
      } catch (error) {
        console.error("Error cargando reservas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservas();
  }, []);

  useEffect(() => {
    let result = [...reservas];

    // Filtro por texto (Nombre o ID)
    if (searchTerm) {
      result = result.filter(r => 
        r.huesped.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.hotel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por Estado
    if (statusFilter !== 'Todas') {
      result = result.filter(r => r.estado === statusFilter);
    }

    // Ordenamiento
    if (sortOrder === 'recientes') {
      result.sort((a, b) => new Date(b.fechaReserva) - new Date(a.fechaReserva));
    } else if (sortOrder === 'antiguas') {
      result.sort((a, b) => new Date(a.fechaReserva) - new Date(b.fechaReserva));
    } else if (sortOrder === 'mayor_precio') {
      result.sort((a, b) => b.total - a.total);
    }

    setFilteredReservas(result);
  }, [searchTerm, statusFilter, sortOrder, reservas]);

  const getStatusBadgeStyle = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return { backgroundColor: 'rgba(76, 175, 80, 0.2)', color: '#4caf50' };
      case 'Pendiente':
        return { backgroundColor: 'rgba(255, 152, 0, 0.2)', color: '#ff9800' };
      case 'Cancelada':
        return { backgroundColor: 'rgba(244, 67, 54, 0.2)', color: '#f44336' };
      default:
        return { backgroundColor: 'rgba(158, 158, 158, 0.2)', color: '#9e9e9e' };
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Gestión de Reservas</h2>
        <button className="btn-marriott" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          <i className="bi bi-download me-2"></i> Exportar
        </button>
      </div>

      {/* Barra de Filtros */}
      <div className="card border-0 mb-4" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '12px' }}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text border-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                  <i className="bi bi-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control border-0 shadow-none text-white" 
                  placeholder="Buscar por ID, Huésped u Hotel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select border-0 shadow-none text-white" 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <option value="Todas">Todos los estados</option>
                <option value="Confirmada">Confirmadas</option>
                <option value="Pendiente">Pendientes</option>
                <option value="Cancelada">Canceladas</option>
              </select>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select border-0 shadow-none text-white" 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <option value="recientes">Más recientes primero</option>
                <option value="antiguas">Más antiguas primero</option>
                <option value="mayor_precio">Mayor precio</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div style={styles.tableContainer}>
        {loading ? (
          <div className="text-center p-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0" style={{ backgroundColor: 'transparent' }}>
              <thead>
                <tr>
                  <th>ID Reserva</th>
                  <th>Huésped</th>
                  <th>Hotel</th>
                  <th>Fechas</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservas.map(reserva => (
                  <tr key={reserva.id}>
                    <td><span style={{ color: 'var(--text-secondary)' }}>{reserva.id}</span></td>
                    <td>
                      <strong style={{ color: 'var(--text-primary)' }}>{reserva.huesped}</strong><br />
                      <small style={{ color: 'var(--text-secondary)' }}>{reserva.email}</small>
                    </td>
                    <td>{reserva.hotel}</td>
                    <td>
                      <i className="bi bi-calendar-event me-2 text-muted"></i>
                      In: {reserva.checkIn}<br />
                      <i className="bi bi-calendar-check me-2 text-muted"></i>
                      Out: {reserva.checkOut}
                    </td>
                    <td><strong>${reserva.total}</strong></td>
                    <td>
                      <span style={{
                        ...styles.badge, 
                        backgroundColor: 
                          reserva.estado === 'Completada' ? 'rgba(76, 175, 80, 0.2)' : 
                          reserva.estado === 'Confirmada' ? 'rgba(33, 150, 243, 0.2)' : 
                          'rgba(244, 67, 54, 0.2)',
                        color: 
                          reserva.estado === 'Completada' ? '#4caf50' : 
                          reserva.estado === 'Confirmada' ? '#2196f3' : 
                          '#f44336'
                      }}>
                        {reserva.estado}
                      </span>
                    </td>
                    <td className="text-end">
                      <button 
                        style={styles.actionBtn} 
                        title="Gestionar Estado"
                        onClick={() => navigate(`/admin/reservas/editar/${reserva.id}`)}
                      >
                        <i className="bi bi-gear-fill text-warning"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredReservas.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-5" style={{ color: 'var(--text-secondary)' }}>
                      No se encontraron reservas con los filtros actuales.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
      white-space: nowrap;
    }
    .table-dark td {
      padding: 1rem;
      vertical-align: middle;
      border-bottom: 1px solid var(--border-color);
    }
  `}</style>
);

export default function AdminReservasListWithStyles() {
  return (
    <>
      <GlobalStyle />
      <AdminReservasList />
    </>
  );
}
