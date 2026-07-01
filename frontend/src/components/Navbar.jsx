import React from 'react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        {/* Logo Izquierda */}
        <a className="navbar-brand fw-bold" href="/" style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', letterSpacing: '2px' }}>
          RESERVA
        </a>
        
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarLinks" aria-controls="navbarLinks" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Links Centro */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarLinks">
          <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <a className="nav-link text-uppercase fw-semibold" href="/hoteles" style={{ letterSpacing: '1px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>Hoteles</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-uppercase fw-semibold" href="/destinos" style={{ letterSpacing: '1px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>Destinos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-uppercase fw-semibold" href="/ofertas" style={{ letterSpacing: '1px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>Ofertas</a>
            </li>
          </ul>
          
          {/* Utilidades Responsive (se muestran en móvil dentro del collapse si la pantalla es pequeña, o a la derecha en pantallas grandes mediante flex) */}
          <div className="d-lg-none mt-3 pb-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
            {user ? (
              <div className="d-flex flex-column gap-2">
                <span className="text-muted small fw-bold">Hola, {user.nombre} ({user.rol})</span>
                {user.rol === 'ADMIN' && <a href="/admin" className="btn btn-outline-secondary btn-sm w-100">Dashboard</a>}
                <button className="btn btn-marriott btn-sm w-100" onClick={onLogout}>Cerrar Sesión</button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2">
                <a href="/login" className="btn btn-outline-secondary btn-sm w-100">Iniciar Sesión</a>
                <a href="/register" className="btn btn-marriott btn-sm w-100">Registrarse</a>
              </div>
            )}
          </div>
        </div>
        
        {/* Utilidades Derecha (Desktop) */}
        <div className="d-none d-lg-flex align-items-center gap-4">
          {user ? (
            <>
              <span className="text-muted small fw-bold" style={{ color: 'var(--text-secondary)' }}>
                {user.nombre} <span className="opacity-75 fw-normal">({user.rol})</span>
              </span>
              {user.rol === 'ADMIN' && (
                <a href="/admin" className="text-uppercase small text-decoration-none fw-bold" style={{ color: 'var(--text-primary)', letterSpacing: '1px' }}>Dashboard</a>
              )}
              <button className="btn btn-marriott btn-sm px-4" onClick={onLogout}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <a href="/login" className="text-decoration-none small text-uppercase fw-bold" style={{ color: 'var(--text-primary)', letterSpacing: '1px' }}>Iniciar Sesión</a>
              <a href="/register" className="btn btn-marriott btn-sm px-4">Registrarse</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
