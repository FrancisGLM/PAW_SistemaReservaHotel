import React from 'react';

const Hero = ({ title, subtitle, imageUrl, ctaText, onCtaClick }) => {
  return (
    <section className="position-relative d-flex align-items-center justify-content-center" style={{ minHeight: '85vh', backgroundImage: `url(${imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}></div>
      <div className="container position-relative text-center text-white z-1 px-4 mt-5">
        <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: 'var(--font-serif)', textShadow: '0 4px 12px rgba(0,0,0,0.6)' }}>
          {title || 'Descubre la elegancia en cada destino'}
        </h1>
        <p className="lead mb-5 mx-auto" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)', maxWidth: '700px', fontWeight: '300' }}>
          {subtitle || 'Experiencias inolvidables y confort de clase mundial al alcance de tu mano. Reserva ahora.'}
        </p>
        
        {/* Widget Buscador */}
        <div className="card mx-auto shadow-lg border-0" style={{ maxWidth: '1000px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px' }}>
          <div className="card-body p-4">
            <form className="row g-3 align-items-end">
              <div className="col-lg-4 text-start">
                <label className="form-label small text-uppercase fw-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '1px', fontSize: '0.75rem' }}>Destino</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0"><i className="bi bi-geo-alt" style={{ color: 'var(--accent-gold)' }}></i></span>
                  <input type="text" className="form-control form-control-lg bg-light border-0 shadow-none" placeholder="¿A dónde viajas?" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }} />
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-start">
                <label className="form-label small text-uppercase fw-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '1px', fontSize: '0.75rem' }}>Llegada</label>
                <input type="date" className="form-control form-control-lg bg-light border-0 shadow-none" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }} />
              </div>
              <div className="col-lg-3 col-md-6 text-start">
                <label className="form-label small text-uppercase fw-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '1px', fontSize: '0.75rem' }}>Salida</label>
                <input type="date" className="form-control form-control-lg bg-light border-0 shadow-none" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }} />
              </div>
              <div className="col-lg-2 mt-4 mt-lg-0">
                <button type="button" className="btn btn-marriott btn-lg w-100 h-100 d-flex align-items-center justify-content-center" onClick={onCtaClick} style={{ fontSize: '0.9rem', padding: '12px' }}>
                  {ctaText || 'Buscar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
