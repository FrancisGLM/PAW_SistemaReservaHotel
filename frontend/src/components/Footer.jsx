import React from 'react';

const Footer = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: '#050505', borderTop: '2px solid var(--accent-gold)' }}>
      <div className="container">
        <div className="row gy-4 mb-4">
          <div className="col-lg-4 text-center text-lg-start">
            <h3 className="fw-bold mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', letterSpacing: '2px' }}>BUHOTEL</h3>
            <p className="mb-0 mx-auto mx-lg-0" style={{ color: '#e0d8c8', fontSize: '0.9rem', maxWidth: '300px', lineHeight: '1.6' }}>
              Descubre y reserva los mejores hoteles al instante, con la elegancia y el confort que mereces en cada destino.
            </p>
          </div>
          <div className="col-lg-8 d-flex flex-column align-items-center align-items-lg-end justify-content-center">
            <div className="d-flex flex-wrap gap-4 justify-content-center justify-content-lg-end mb-3">
              <a href="/destinos" className="text-decoration-none text-uppercase small fw-bold hover-gold" style={{ color: '#e0d8c8', letterSpacing: '1px' }}>Destinos</a>
              <a href="/ofertas" className="text-decoration-none text-uppercase small fw-bold hover-gold" style={{ color: '#e0d8c8', letterSpacing: '1px' }}>Ofertas</a>
              <a href="/nosotros" className="text-decoration-none text-uppercase small fw-bold hover-gold" style={{ color: '#e0d8c8', letterSpacing: '1px' }}>Nosotros</a>
            </div>
            <div className="d-flex flex-wrap gap-4 justify-content-center justify-content-lg-end">
              <a href="/terminos" className="text-decoration-none small hover-gold" style={{ color: '#b3a89a' }}>Términos y condiciones</a>
              <a href="/privacidad" className="text-decoration-none small hover-gold" style={{ color: '#b3a89a' }}>Política de privacidad</a>
              <a href="/contacto" className="text-decoration-none small hover-gold" style={{ color: '#b3a89a' }}>Contacto</a>
            </div>
          </div>
        </div>
        <div className="border-top pt-4 mt-2 text-center d-lg-flex justify-content-between align-items-center" style={{ borderColor: 'rgba(194, 155, 98, 0.3) !important' }}>
          <p className="mb-0 small order-2 order-lg-1 mt-3 mt-lg-0" style={{ color: '#b3a89a' }}>
            &copy; {new Date().getFullYear()} Buhotel. Todos los derechos reservados.
          </p>
          <div className="d-flex gap-3 justify-content-center order-1 order-lg-2">
            <a href="#" className="text-decoration-none fs-5 hover-gold" style={{ color: 'var(--accent-gold)' }}><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-decoration-none fs-5 hover-gold" style={{ color: 'var(--accent-gold)' }}><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-decoration-none fs-5 hover-gold" style={{ color: 'var(--accent-gold)' }}><i className="bi bi-twitter-x"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
