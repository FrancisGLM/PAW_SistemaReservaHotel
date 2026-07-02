import React from 'react';
import { Link } from 'react-router-dom';

const mockDestinos = [
  {
    id: 1,
    nombre: 'París',
    pais: 'Francia',
    hoteles: 124,
    imagen: 'https://images.unsplash.com/photo-1502602898657-3e90760b246e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    nombre: 'Nueva York',
    pais: 'Estados Unidos',
    hoteles: 312,
    imagen: 'https://images.unsplash.com/photo-1496442226666-8d4d0e283186?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    nombre: 'Tokio',
    pais: 'Japón',
    hoteles: 245,
    imagen: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    nombre: 'Roma',
    pais: 'Italia',
    hoteles: 189,
    imagen: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    nombre: 'Cancún',
    pais: 'México',
    hoteles: 156,
    imagen: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    nombre: 'Londres',
    pais: 'Reino Unido',
    hoteles: 278,
    imagen: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800'
  }
];

const Destinos = () => {
  return (
    <div className="container py-5 mt-5 min-vh-100 page-enter">
      <div className="mb-5 text-center">
        <h1 className="fw-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>
          Destinos <span className="text-shine-gold">Populares</span>
        </h1>
        <p className="lead mx-auto" style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
          Encuentra inspiración para tu próximo viaje explorando los lugares más codiciados alrededor del mundo.
        </p>
      </div>

      <div className="row g-4">
        {mockDestinos.map(destino => (
          <div key={destino.id} className="col-12 col-md-6 col-lg-4">
            <Link to={`/hoteles?destino=${destino.nombre}`} className="text-decoration-none">
              <div className="card border-0 h-100 overflow-hidden" style={{ borderRadius: '16px', position: 'relative' }}>
                <div style={{ height: '350px', position: 'relative' }}>
                  <img 
                    src={destino.imagen} 
                    alt={destino.nombre}
                    className="w-100 h-100 object-fit-cover"
                    style={{ transition: 'transform 0.5s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  {/* Overlay gradiente oscuro */}
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)' }}></div>
                  
                  {/* Contenido sobre la imagen */}
                  <div className="position-absolute bottom-0 start-0 p-4 w-100 d-flex justify-content-between align-items-end">
                    <div>
                      <h3 className="fw-bold text-white mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{destino.nombre}</h3>
                      <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                        <i className="bi bi-geo-alt-fill me-1" style={{ color: 'var(--accent-gold)' }}></i>
                        {destino.pais}
                      </p>
                    </div>
                    <div className="text-end">
                      <span className="badge" style={{ backgroundColor: 'rgba(194,155,98,0.9)', color: '#fff', fontSize: '0.8rem' }}>
                        {destino.hoteles} Hoteles
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinos;
