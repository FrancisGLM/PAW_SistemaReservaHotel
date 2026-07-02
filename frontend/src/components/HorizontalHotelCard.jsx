import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalHotelCard = ({ hotel }) => {
  return (
    <div className="card mb-4 border-0 hotel-card-hover" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', overflow: 'hidden' }}>
      <div className="row g-0">
        {/* Lado Izquierdo: Imagen */}
        <div className="col-md-4 position-relative" style={{ minHeight: '220px' }}>
          <img 
            src={hotel.imagen} 
            className="w-100 h-100 object-fit-cover" 
            alt={hotel.nombre} 
          />
          {/* Badge Recomendado opcional */}
          {hotel.estrellas >= 4 && (
            <div className="position-absolute top-0 start-0 m-2">
              <span className="badge" style={{ backgroundColor: '#ff6b6b', color: '#fff', fontSize: '0.75rem', padding: '0.4rem 0.6rem' }}>
                ¡Muy Recomendado!
              </span>
            </div>
          )}
          <button className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '35px', height: '35px', padding: 0 }}>
            <i className="bi bi-heart" style={{ color: 'var(--text-primary)' }}></i>
          </button>
        </div>

        {/* Lado Derecho: Contenido */}
        <div className="col-md-8">
          <div className="card-body p-4 d-flex flex-column h-100">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h5 className="card-title fw-bold mb-1" style={{ color: 'var(--text-primary)', fontSize: '1.25rem' }}>
                  {hotel.nombre}
                </h5>
                <div className="d-flex align-items-center mb-2">
                  <div className="me-2 text-warning">
                    {[...Array(hotel.estrellas)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill small"></i>
                    ))}
                  </div>
                  <span className="small" style={{ color: 'var(--text-secondary)' }}>
                    <i className="bi bi-geo-alt-fill me-1" style={{ color: 'var(--accent-gold)' }}></i>
                    {hotel.ubicacion} <a href="#" className="text-decoration-none ms-1" style={{ color: '#4a90e2' }}>Ver en mapa</a>
                  </span>
                </div>
              </div>
              
              {/* Badge de Puntuación Ficticio */}
              <div className="d-flex align-items-center bg-dark rounded p-1 shadow-sm">
                <span className="d-flex align-items-center justify-content-center rounded" style={{ backgroundColor: '#2e6fd4', color: '#fff', width: '32px', height: '32px', fontWeight: 'bold' }}>
                  {(hotel.estrellas * 1.8 + 0.5).toFixed(1)}
                </span>
                <span className="ms-2 me-1 small fw-bold" style={{ color: 'var(--text-primary)' }}>Excelente</span>
              </div>
            </div>

            <p className="card-text mb-3" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flexGrow: 1 }}>
              {hotel.descripcion.substring(0, 120)}...
            </p>

            <div className="row align-items-end mt-auto">
              <div className="col-md-7">
                {hotel.condiciones && hotel.condiciones.length > 0 && (
                  <div className="d-flex flex-column gap-1 mb-3 mb-md-0">
                    {hotel.condiciones.map((cond, i) => (
                      <span key={i} className="small text-success fw-bold"><i className="bi bi-check-lg me-1"></i> {cond}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-md-5 text-md-end text-start border-start-md" style={{ borderColor: 'var(--border-color)' }}>
                <div className="small mb-1" style={{ color: 'var(--text-secondary)' }}>Precio por noche</div>
                <h3 className="fw-bold mb-0" style={{ color: 'var(--accent-gold)' }}>
                  ${hotel.precioMinimo?.toLocaleString()}
                </h3>
                <div className="small mb-3" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>No incluye impuestos</div>
                
                <Link to={`/hotel/${hotel.id}`} className="btn btn-marriott w-100 py-2 rounded-3 fw-bold">
                  Ver detalle
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalHotelCard;
