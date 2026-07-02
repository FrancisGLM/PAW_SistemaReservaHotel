import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoteles = async () => {
      try {
        const res = await fetch('/mocks/hoteles.json');
        const data = await res.json();
        setHoteles(data);
      } catch (error) {
        console.error("Error cargando hoteles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHoteles();
  }, []);

  return (
    <div className="container py-5 mt-5 min-vh-100 page-enter">
      <div className="mb-5 text-center">
        <h1 className="fw-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>
          Todos Nuestros <span className="text-shine-gold">Hoteles</span>
        </h1>
        <p className="lead mx-auto" style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
          Explora nuestra colección completa de propiedades exclusivas y encuentra el lugar perfecto para tu próxima estadía.
        </p>
      </div>

      {loading ? (
        <div className="text-center p-5">
          <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando hoteles...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {hoteles.map((hotel) => (
            <div key={hotel.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 hotel-card-hover" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img 
                    src={hotel.imagen} 
                    className="card-img-top w-100 h-100" 
                    alt={hotel.nombre} 
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge rounded-pill" style={{ backgroundColor: 'var(--accent-gold)', color: '#fff', fontSize: '0.85rem', padding: '0.5em 1em' }}>
                      <i className="bi bi-star-fill me-1"></i> {hotel.estrellas}
                    </span>
                  </div>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold m-0" style={{ color: 'var(--text-primary)' }}>{hotel.nombre}</h5>
                  </div>
                  <p className="small mb-3" style={{ color: 'var(--text-secondary)' }}>
                    <i className="bi bi-geo-alt-fill me-1" style={{ color: 'var(--accent-gold)' }}></i> 
                    {hotel.ubicacion}
                  </p>
                  <p className="card-text mb-4" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flexGrow: 1 }}>
                    {hotel.descripcion.substring(0, 100)}...
                  </p>
                  
                  {hotel.amenidades && (
                    <div className="d-flex gap-2 mb-4 flex-wrap">
                      {hotel.amenidades.slice(0, 3).map((am, i) => (
                        <span key={i} className="badge" style={{ backgroundColor: 'rgba(194,155,98,0.1)', color: 'var(--accent-gold)', border: '1px solid rgba(194,155,98,0.3)' }}>
                          {am}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center mt-auto border-top pt-3" style={{ borderColor: 'var(--border-color) !important' }}>
                    <div>
                      <span className="small d-block" style={{ color: 'var(--text-secondary)' }}>Desde</span>
                      <span className="fs-5 fw-bold" style={{ color: 'var(--accent-gold)' }}>${hotel.precioMinimo?.toLocaleString()}</span>
                    </div>
                    <Link to={`/hotel/${hotel.id}`} className="btn btn-outline-gold px-4 py-2" style={{ borderRadius: '8px' }}>
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hoteles;
