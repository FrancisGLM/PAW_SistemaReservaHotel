import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        {/* Logo Izquierda */}
        <a className="navbar-brand fw-bold" href="/" style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', letterSpacing: '2px' }}>
          BUHOTEL
        </a>
        
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarLinks" aria-controls="navbarLinks" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Links Centro */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarLinks">
          <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link className="nav-link text-uppercase fw-semibold" to="/hoteles" style={{ letterSpacing: '1px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>Hoteles</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-uppercase fw-semibold" to="/destinos" style={{ letterSpacing: '1px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>Destinos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-uppercase fw-semibold" to="/ofertas" style={{ letterSpacing: '1px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>Ofertas</Link>
            </li>
          </ul>
          
          {/* Utilidades Responsive */}
          <div className="d-lg-none mt-3 pb-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
            {user ? (
              <div className="d-flex flex-column gap-2 text-center">
                <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                  <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', backgroundColor: 'var(--accent-gold)', color: '#fff' }}>
                    {user.nombre?.charAt(0)}
                  </div>
                  <div className="d-flex flex-column text-start">
                    <span className="fw-bold" style={{ color: 'var(--text-primary)', lineHeight: '1.2' }}>{user.nombre}</span>
                    <span className="small fw-bold" style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{user.rol}</span>
                  </div>
                </div>
                <Link to="/dashboard" className="btn btn-outline-gold btn-sm w-100">Mi Panel</Link>
                <button className="btn btn-marriott btn-sm w-100" onClick={onLogout}>Cerrar Sesión</button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2">
                <Link to="/login" className="btn btn-outline-gold btn-sm w-100">Iniciar Sesión</Link>
                <Link to="/register" className="btn btn-marriott btn-sm w-100">Registrarse</Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Utilidades Derecha (Desktop) */}
        <div className="d-none d-lg-flex align-items-center gap-4">
          {user ? (
            <div className="dropdown position-relative">
              <button 
                className="btn border-0 d-flex align-items-center gap-2 shadow-none" 
                type="button" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ backgroundColor: 'transparent' }}
              >
                <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '36px', height: '36px', backgroundColor: 'var(--accent-gold)', color: '#fff' }}>
                  {user.nombre?.charAt(0)}
                </div>
                <div className="d-flex flex-column text-start ms-1 me-2">
                  <span className="fw-bold" style={{ color: 'var(--text-primary)', lineHeight: '1' }}>{user.nombre?.split(' ')[0]}</span>
                  <span className="fw-bold" style={{ fontSize: '0.7rem', color: 'var(--accent-gold)' }}>{user.rol}</span>
                </div>
                <i className="bi bi-chevron-down" style={{ color: 'var(--text-secondary)' }}></i>
              </button>
              
              {dropdownOpen && (
                <>
                  <div className="position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: 999 }} onClick={() => setDropdownOpen(false)}></div>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg show" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', position: 'absolute', right: 0, top: '100%', zIndex: 1000 }}>
                    <li><Link className="dropdown-item py-2 d-flex align-items-center gap-2" to="/dashboard" onClick={() => setDropdownOpen(false)} style={{ color: 'var(--text-primary)' }}><i className="bi bi-grid-1x2"></i> Mi Panel</Link></li>
                    <li><Link className="dropdown-item py-2 d-flex align-items-center gap-2" to="/perfil" onClick={() => setDropdownOpen(false)} style={{ color: 'var(--text-primary)' }}><i className="bi bi-person"></i> Editar Perfil</Link></li>
                    <li><hr className="dropdown-divider" style={{ borderColor: 'var(--border-color)' }} /></li>
                    <li><button className="dropdown-item py-2 d-flex align-items-center gap-2 text-danger fw-bold" onClick={() => { setDropdownOpen(false); onLogout(); }}><i className="bi bi-box-arrow-right"></i> Cerrar Sesión</button></li>
                  </ul>
                </>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-decoration-none small text-uppercase fw-bold" style={{ color: 'var(--text-primary)', letterSpacing: '1px' }}>Iniciar Sesión</Link>
              <Link to="/register" className="btn btn-marriott btn-sm px-4">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
