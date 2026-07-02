import React from 'react';
import { Link } from 'react-router-dom';

const mockOfertas = [
  {
    id: 1,
    titulo: 'Escapada de Fin de Semana',
    descuento: '30% OFF',
    descripcion: 'Disfruta de un fin de semana inolvidable en nuestros hoteles boutique seleccionados. Reserva 2 noches y obtén un 30% de descuento.',
    codigo: 'FINDES30',
    imagen: 'https://images.unsplash.com/photo-1542314831-c6a4d27a658d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    titulo: 'Especial Larga Estadía',
    descuento: 'Noche Gratis',
    descripcion: 'Alójate por 5 noches o más y te regalamos la última noche. Válido en todos los destinos del Caribe y México.',
    codigo: '5X4CARIBE',
    imagen: 'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    titulo: 'Luna de Miel Premium',
    descuento: 'Paquete VIP',
    descripcion: 'Botella de champagne, desayuno en la cama y masajes para parejas incluidos en tu estadía. El romance al siguiente nivel.',
    codigo: 'ROMANCE24',
    imagen: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    titulo: 'Reserva Anticipada',
    descuento: '20% OFF',
    descripcion: 'Planifica con tiempo. Reserva con al menos 60 días de antelación y asegura la mejor tarifa garantizada del mercado.',
    codigo: 'ANTICIPA20',
    imagen: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=800'
  }
];

const Ofertas = () => {
  return (
    <div className="container py-5 mt-5 min-vh-100 page-enter">
      <div className="mb-5 text-center">
        <h1 className="fw-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>
          Ofertas <span className="text-shine-gold">Exclusivas</span>
        </h1>
        <p className="lead mx-auto" style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
          Aprovecha nuestros descuentos y promociones especiales para hacer de tu viaje una experiencia aún mejor.
        </p>
      </div>

      <div className="row g-4">
        {mockOfertas.map(oferta => (
          <div key={oferta.id} className="col-12 col-lg-6">
            <div className="card border-0 h-100 overflow-hidden hotel-card-hover" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
              <div className="row g-0 h-100">
                <div className="col-md-5 position-relative" style={{ minHeight: '250px' }}>
                  <img 
                    src={oferta.imagen} 
                    className="w-100 h-100 object-fit-cover" 
                    alt={oferta.titulo} 
                  />
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge py-2 px-3 shadow-sm" style={{ backgroundColor: '#e84118', color: '#fff', fontSize: '0.9rem', fontWeight: 'bold' }}>
                      {oferta.descuento}
                    </span>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="card-body p-4 d-flex flex-column h-100">
                    <h4 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>{oferta.titulo}</h4>
                    <p className="mb-4" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      {oferta.descripcion}
                    </p>
                    <div className="mt-auto p-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px dashed var(--border-color)' }}>
                      <p className="small text-uppercase fw-bold mb-1" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Usa este código al pagar:</p>
                      <h4 className="mb-0 fw-bold" style={{ color: 'var(--accent-gold)' }}>{oferta.codigo}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <Link to="/hoteles" className="btn btn-marriott px-5 py-3 fw-bold text-uppercase" style={{ letterSpacing: '1px', borderRadius: '12px' }}>
          Buscar Hoteles Disponibles
        </Link>
      </div>
    </div>
  );
};

export default Ofertas;
