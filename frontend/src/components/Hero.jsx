import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Hero = ({ title, subtitle, imageUrl, ctaText, onCtaClick }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <section className="position-relative d-flex align-items-center justify-content-center overflow-hidden" style={{ minHeight: '85vh' }}>
      {/* Capa de fondo animada */}
      <div 
        className="position-absolute w-100 h-100 hero-bg-zoom" 
        style={{ 
          backgroundImage: `url(${imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          top: 0, left: 0, zIndex: 0 
        }} 
      ></div>
      {/* Overlay oscuro estático */}
      <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, left: 0, zIndex: 1 }}></div>
      
      <div className="container position-relative text-center text-white z-2 px-4 mt-5" style={{ zIndex: 2 }}>
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
                <div className="input-group hero-search-group">
                  <span className="input-group-text bg-light border-0" style={{ height: '54px', borderRadius: '8px 0 0 8px' }}><i className="bi bi-geo-alt" style={{ color: 'var(--accent-gold)' }}></i></span>
                  <input type="text" className="form-control bg-light border-0 shadow-none hero-search-input" placeholder="¿A dónde viajas?" style={{ height: '54px', borderRadius: '0 8px 8px 0' }} />
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-start position-relative">
                <label className="form-label small text-uppercase fw-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '1px', fontSize: '0.75rem' }}>Llegada</label>
                <div className="input-group hero-search-group">
                  <span className="input-group-text bg-light border-0" style={{ height: '54px', borderRadius: '8px 0 0 8px' }}><i className="bi bi-calendar-event" style={{ color: 'var(--accent-gold)' }}></i></span>
                  <DatePicker 
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)} 
                    selectsStart 
                    startDate={startDate} 
                    endDate={endDate} 
                    minDate={new Date()}
                    className="form-control bg-light border-0 shadow-none w-100 hero-search-input h-100" 
                    placeholderText="Seleccionar"
                    style={{ borderRadius: '0 8px 8px 0' }}
                    wrapperClassName="form-control p-0 border-0 bg-transparent flex-grow-1 d-flex"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-start position-relative">
                <label className="form-label small text-uppercase fw-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '1px', fontSize: '0.75rem' }}>Salida</label>
                <div className="input-group hero-search-group">
                  <span className="input-group-text bg-light border-0" style={{ height: '54px', borderRadius: '8px 0 0 8px' }}><i className="bi bi-calendar-check" style={{ color: 'var(--accent-gold)' }}></i></span>
                  <DatePicker 
                    selected={endDate} 
                    onChange={(date) => setEndDate(date)} 
                    selectsEnd 
                    startDate={startDate} 
                    endDate={endDate} 
                    minDate={startDate || new Date()}
                    className="form-control bg-light border-0 shadow-none w-100 hero-search-input h-100" 
                    placeholderText="Seleccionar"
                    style={{ borderRadius: '0 8px 8px 0' }}
                    wrapperClassName="form-control p-0 border-0 bg-transparent flex-grow-1 d-flex"
                  />
                </div>
              </div>
              <div className="col-lg-2 mt-4 mt-lg-0">
                <button type="button" className="btn btn-marriott w-100 d-flex align-items-center justify-content-center" onClick={onCtaClick} style={{ fontSize: '0.9rem', height: '54px', borderRadius: '8px' }}>
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
