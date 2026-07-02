import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h3 style={styles.logoText}>
            <i className="bi bi-shield-lock-fill me-2" style={{ color: 'var(--accent-gold)' }}></i>
            Admin Panel
          </h3>
          <p style={styles.userInfo}>Hola, {user?.nombre || 'Administrador'}</p>
        </div>

        <nav style={styles.nav}>
          <NavLink 
            to="/admin/dashboard" 
            style={({ isActive }) => isActive ? { ...styles.navItem, ...styles.navItemActive } : styles.navItem}
          >
            <i className="bi bi-speedometer2 me-3"></i> Dashboard
          </NavLink>
          <NavLink 
            to="/admin/hoteles" 
            style={({ isActive }) => isActive ? { ...styles.navItem, ...styles.navItemActive } : styles.navItem}
          >
            <i className="bi bi-buildings me-3"></i> Hoteles
          </NavLink>
          <NavLink 
            to="/admin/habitaciones" 
            style={({ isActive }) => isActive ? { ...styles.navItem, ...styles.navItemActive } : styles.navItem}
          >
            <i className="bi bi-door-open me-3"></i> Habitaciones
          </NavLink>
          <NavLink 
            to="/admin/reservas" 
            style={({ isActive }) => isActive ? { ...styles.navItem, ...styles.navItemActive } : styles.navItem}
          >
            <i className="bi bi-calendar-check me-3"></i> Reservas
          </NavLink>
        </nav>

        <div style={styles.sidebarFooter}>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            <i className="bi bi-box-arrow-left me-2"></i> Salir al sitio
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.topbar}>
          <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Panel de Administración</h4>
        </div>
        <div style={styles.contentArea}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
    fontFamily: 'var(--font-sans)',
  },
  sidebar: {
    width: '260px',
    backgroundColor: 'var(--bg-secondary)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  sidebarHeader: {
    padding: '2rem 1.5rem 1rem',
    borderBottom: '1px solid var(--border-color)',
  },
  logoText: {
    margin: 0,
    color: 'var(--text-primary)',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  userInfo: {
    margin: '0.5rem 0 0',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem 0',
    flex: 1,
  },
  navItem: {
    padding: '0.8rem 1.5rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    borderLeft: '4px solid transparent',
  },
  navItemActive: {
    backgroundColor: 'rgba(194, 155, 98, 0.1)',
    color: 'var(--accent-gold)',
    borderLeftColor: 'var(--accent-gold)',
  },
  sidebarFooter: {
    padding: '1.5rem',
    borderTop: '1px solid var(--border-color)',
  },
  logoutBtn: {
    width: '100%',
    padding: '0.6rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    marginLeft: '260px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  topbar: {
    height: '70px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 2rem',
    backgroundColor: 'var(--bg-secondary)',
  },
  contentArea: {
    padding: '2rem',
    flex: 1,
    overflowY: 'auto',
  }
};

export default AdminLayout;
