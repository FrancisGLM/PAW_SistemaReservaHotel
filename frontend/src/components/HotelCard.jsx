import React from 'react';

const HotelCard = ({ hotel, onBook }) => {
  return (
    <article className="card h-100 shadow-sm border-0 hotel-card-hover" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
      <div className="position-relative">
        <img src={hotel.imagen || 'https://images.unsplash.com/photo-1542314831-c53cd6b7608b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} alt={`Imagen de ${hotel.nombre}`} className="card-img-top" style={{ height: '240px', objectFit: 'cover' }} />
        <span className="position-absolute top-0 end-0 bg-dark text-white px-3 py-1 m-3 rounded-pill small fw-bold" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
          <span style={{ color: 'var(--accent-gold)' }}>{'★'.repeat(hotel.estrellas)}</span>
          <span className="text-secondary">{'☆'.repeat(5 - hotel.estrellas)}</span>
        </span>
      </div>
      <div className="card-body d-flex flex-column p-4">
        <h3 className="card-title h5 fw-bold mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
          {hotel.nombre}
        </h3>
        <p className="text-muted small mb-3 fw-medium d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
          <i className="bi bi-geo-alt-fill text-danger"></i> {hotel.ubicacion}
        </p>
        <p className="card-text mb-4" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', flexGrow: 1 }}>
          {hotel.descripcion}
        </p>
        <div className="d-flex justify-content-between align-items-end mt-auto border-top pt-3" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <span className="text-uppercase small fw-bold d-block mb-1" style={{ color: 'var(--text-secondary)', letterSpacing: '1px', fontSize: '0.7rem' }}>Precio desde</span>
            <span className="fw-bold fs-4" style={{ color: 'var(--text-primary)' }}>${hotel.precioMinimo}</span>
            <span className="small fw-medium" style={{ color: 'var(--text-secondary)' }}> / noche</span>
          </div>
          <button className="btn btn-marriott btn-sm px-4 py-2" onClick={() => onBook && onBook(hotel.id)}>
            Ver Detalles
          </button>
        </div>
      </div>
    </article>
  );
};

export default HotelCard;
