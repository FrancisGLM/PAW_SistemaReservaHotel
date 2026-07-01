import React from 'react';

const Footer = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div className="row gy-4 mb-4">
          <div className="col-lg-4 text-center text-lg-start">
            <h3 className="fw-bold mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', letterSpacing: '1px' }}>RESERVA</h3>
            <p className="text-muted mb-0 mx-auto mx-lg-0" style={{ fontSize: '0.9rem', maxWidth: '300px', lineHeight: '1.6' }}>
              Descubre y reserva los mejores hoteles al instante, con la elegancia y el confort que mereces en cada destino.
            </p>
          </div>
          <div className="col-lg-8 d-flex flex-column align-items-center align-items-lg-end justify-content-center">
            <div className="d-flex flex-wrap gap-4 justify-content-center justify-content-lg-end mb-3">
              <a href="/destinos" className="text-decoration-none text-uppercase small fw-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '1px', transition: 'color 0.2s' }}>Destinos</a>
              <a href="/ofertas" className="text-decoration-none text-uppercase small fw-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '1px', transition: 'color 0.2s' }}>Ofertas</a>
              <a href="/nosotros" className="text-decoration-none text-uppercase small fw-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '1px', transition: 'color 0.2s' }}>Nosotros</a>
            </div>
            <div className="d-flex flex-wrap gap-4 justify-content-center justify-content-lg-end">
              <a href="/terminos" className="text-decoration-none small text-muted">Términos y condiciones</a>
              <a href="/privacidad" className="text-decoration-none small text-muted">Política de privacidad</a>
              <a href="/contacto" className="text-decoration-none small text-muted">Contacto</a>
            </div>
          </div>
        </div>
        <div className="border-top pt-4 mt-2 text-center d-lg-flex justify-content-between align-items-center" style={{ borderColor: 'var(--border-color) !important' }}>
          <p className="mb-0 text-muted small order-2 order-lg-1 mt-3 mt-lg-0">
            &copy; {new Date().getFullYear()} Reserva. Todos los derechos reservados.
          </p>
          <div className="d-flex gap-3 justify-content-center order-1 order-lg-2">
            <a href="#" className="text-muted text-decoration-none fs-5 hover-gold" style={{ transition: 'color 0.2s' }}><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-muted text-decoration-none fs-5 hover-gold" style={{ transition: 'color 0.2s' }}><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-muted text-decoration-none fs-5 hover-gold" style={{ transition: 'color 0.2s' }}><i className="bi bi-twitter-x"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
