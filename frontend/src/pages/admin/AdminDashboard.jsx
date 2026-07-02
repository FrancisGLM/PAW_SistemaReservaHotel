import React from 'react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Hoteles', value: '12', icon: 'bi-buildings', color: '#c29b62' },
    { title: 'Habitaciones', value: '345', icon: 'bi-door-open', color: '#4caf50' },
    { title: 'Reservas Activas', value: '89', icon: 'bi-calendar-check', color: '#2196f3' },
    { title: 'Ingresos Mensuales', value: '$45,200', icon: 'bi-cash-coin', color: '#9c27b0' },
  ];

  return (
    <div>
      <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Dashboard General</h2>
      
      <div className="row g-4 mb-5">
        {stats.map((stat, idx) => (
          <div className="col-md-6 col-lg-3" key={idx}>
            <div style={styles.card}>
              <div style={styles.cardIcon(stat.color)}>
                <i className={`bi ${stat.icon}`}></i>
              </div>
              <div style={styles.cardInfo}>
                <h6 style={styles.cardTitle}>{stat.title}</h6>
                <h3 style={styles.cardValue}>{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mocked chart area */}
      <div style={styles.chartArea}>
        <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Resumen de Actividad</h4>
        <div style={styles.mockChart}>
          <p style={{ color: 'var(--text-secondary)' }}>Gráfico en desarrollo...</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'var(--shadow-subtle)',
    transition: 'transform 0.3s ease',
  },
  cardIcon: (color) => ({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: `${color}20`,
    color: color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.8rem',
    marginRight: '1rem',
  }),
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    margin: 0,
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    fontWeight: 'normal',
  },
  cardValue: {
    margin: '0.5rem 0 0',
    color: 'var(--text-primary)',
    fontWeight: 'bold',
  },
  chartArea: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '2rem',
  },
  mockChart: {
    height: '300px',
    backgroundColor: 'var(--bg-primary)',
    borderRadius: '8px',
    border: '1px dashed var(--border-color)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default AdminDashboard;
