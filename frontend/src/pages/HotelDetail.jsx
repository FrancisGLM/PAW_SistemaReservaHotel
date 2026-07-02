import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
import PassengerSelector from '../components/PassengerSelector';

registerLocale('es', es);

const HotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [similares, setSimilares] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    fetch('/mocks/hoteles.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(h => h.id === parseInt(id));
        setHotel(found);
        setSimilares(data.filter(h => h.id !== parseInt(id)).slice(0, 3));
      })
      .catch(err => console.error("Error loading hotel details", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" style={{ color: 'var(--accent-gold)' }} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="container py-5 mt-5 text-center min-vh-100">
        <h2 className="display-6 fw-bold" style={{ color: 'var(--text-primary)' }}>Hotel no encontrado</h2>
        <Link to="/" className="btn btn-marriott mt-3">Volver al inicio</Link>
      </div>
    );
  }

  // Fallback images if the hotel doesn't have multiple images
  const mainImage = hotel.imagen || "https://images.unsplash.com/photo-1542314831-c53cd6b7608b?w=1920&q=80";
  const secImage1 = "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80";
  const secImage2 = "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=800&q=80";

  const amenidades = ["WiFi de Alta Velocidad", "Piscina Infinity", "Spa & Wellness", "Gimnasio 24/7", "Restaurante Gourmet", "Servicio a la habitación"];

  return (
    <div className="hotel-detail-page pb-5" style={{ animation: 'fadeInApp 0.8s ease-out' }}>
      {/* Hero / Galería Inmersiva */}
      <div className="container-fluid p-0 mb-5 position-relative">
        <div className="row g-1">
          <div className="col-12 col-lg-8 overflow-hidden">
            <img src={mainImage} alt="Principal" className="w-100 object-fit-cover hover-scale" style={{ height: '650px', transition: 'transform 0.5s ease' }} />
          </div>
          <div className="col-none col-lg-4 d-none d-lg-flex flex-column gap-1 overflow-hidden">
            <div className="overflow-hidden h-50">
              <img src={secImage1} alt="Secundaria 1" className="w-100 h-100 object-fit-cover hover-scale" style={{ transition: 'transform 0.5s ease' }} />
            </div>
            <div className="overflow-hidden h-50">
              <img src={secImage2} alt="Secundaria 2" className="w-100 h-100 object-fit-cover hover-scale" style={{ transition: 'transform 0.5s ease' }} />
            </div>
          </div>
        </div>
        {/* Sutil gradiente para integrar con el fondo oscuro */}
        <div className="position-absolute bottom-0 w-100" style={{ height: '200px', background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)', pointerEvents: 'none' }}></div>
      </div>

      <div className="container position-relative z-1" style={{ marginTop: '-80px' }}>
        <div className="row gy-5">
          {/* Información Descriptiva (Izquierda) */}
          <div className="col-lg-8 pe-lg-5">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h1 className="fw-bold mb-0 display-5" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>{hotel.nombre}</h1>
            </div>
            
            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="fs-5" style={{ color: 'var(--accent-gold)' }}>
                {'★'.repeat(hotel.estrellas)}<span className="text-muted">{'☆'.repeat(5 - hotel.estrellas)}</span>
              </span>
              <span className="small fw-bold d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                <i className="bi bi-geo-alt-fill text-danger"></i> {hotel.ubicacion}
              </span>
            </div>

            <hr className="my-5" style={{ borderColor: 'var(--border-color)' }} />

            <h4 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Acerca de este hotel</h4>
            <p className="lead" style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', fontWeight: '300' }}>
              {hotel.descripcion}
            </p>
            <p className="lead mt-3" style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', fontWeight: '300' }}>
              Disfruta de instalaciones de primer nivel, un servicio excepcional y todas las comodidades que necesitas para una estadía inolvidable. Nuestro hotel está diseñado pensando en tu máximo confort.
            </p>

            <div className="mt-5">
              <h4 className="fw-bold mb-4 text-center text-lg-start" style={{ color: 'var(--text-primary)' }}>Servicios más populares</h4>
              {/* Popular Amenities Simple */}
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-4 mb-4">
                {hotel.serviciosDetallados && hotel.serviciosDetallados.map((servicio, idx) => (
                  <div key={`pop-${idx}`} className="d-flex align-items-center gap-2 amenity-item">
                    <i className={`bi ${servicio.icono} fs-5 amenity-icon`}></i>
                    <span className="fw-medium amenity-text">{servicio.categoria}</span>
                  </div>
                ))}
              </div>

              {/* Detailed Amenities Grid */}
              <div className="row justify-content-center justify-content-lg-start g-4 mt-2">
                {hotel.serviciosDetallados && hotel.serviciosDetallados.map((servicio, idx) => (
                  <div className="col-12 col-md-6 col-lg-4 amenity-detailed-item" key={idx}>
                    <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-2">
                      <i className={`bi ${servicio.icono} fs-5 amenity-icon-muted`}></i>
                      <h6 className="fw-bold mb-0 amenity-title">{servicio.categoria}</h6>
                    </div>
                    <ul className="list-unstyled mb-0 ms-0 ms-lg-4">
                      {servicio.items.map((item, iIdx) => (
                        <li key={iIdx} className="mb-1 text-muted d-flex align-items-start justify-content-center justify-content-lg-start gap-2 small">
                          <i className="bi bi-check amenity-check-icon"></i> <span className="amenity-list-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-5" style={{ borderColor: 'var(--border-color)' }} />

            {/* Reviews Section */}
            <div className="mt-4">
              <h4 className="fw-bold mb-4 text-center text-lg-start" style={{ color: 'var(--text-primary)' }}>Lo que más gustó a otros clientes:</h4>
              <div className="row justify-content-center g-3">
                {hotel.resenas && hotel.resenas.map((resena, idx) => (
                  <div className="col-12 col-md-4" key={`res-${idx}`}>
                    <div className="card h-100 border-0 review-card">
                      <div className="card-body p-4 text-center text-lg-start">
                        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-start gap-2 mb-3">
                          <div className="review-avatar">
                            {resena.nombre.charAt(0)}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold review-name">{resena.nombre}</h6>
                            <small className="review-country">{resena.bandera} {resena.pais}</small>
                          </div>
                        </div>
                        <p className="small mb-2 review-positive">
                          <i className="bi bi-emoji-smile me-2 fs-5 align-middle"></i>
                          {resena.positivo}
                        </p>
                        {resena.negativo && (
                          <p className="small mb-0 review-negative">
                            <i className="bi bi-emoji-frown me-2 fs-5 align-middle"></i>
                            {resena.negativo}
                          </p>
                        )}
                        <Link to="#" className="small d-block mt-3 review-more-link">Más info <i className="bi bi-arrow-right ms-1"></i></Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center text-lg-start">
                <button className="btn btn-outline-gold mt-4 px-4 py-2 fw-medium">Leer todos los comentarios</button>
              </div>
            </div>

            <hr className="my-5" style={{ borderColor: 'var(--border-color)' }} />

            {/* Condiciones del alojamiento */}
            <div className="mt-4">
              <h4 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Condiciones del alojamiento</h4>
              <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Horarios</h6>
              
              <div className="d-flex flex-column gap-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-box-arrow-in-right fs-5"></i>
                  <span>Horario de Check in: <strong>{hotel.condiciones?.checkIn}</strong></span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-box-arrow-left fs-5"></i>
                  <span>Horario de Check out: <strong>{hotel.condiciones?.checkOut}</strong></span>
                </div>
              </div>

              {hotel.condiciones?.advertencias && hotel.condiciones.advertencias.map((adv, idx) => (
                <div key={`adv-${idx}`} className="alert mb-3 border-0 d-flex gap-3 condition-alert-warning">
                  <i className="bi bi-exclamation-triangle-fill fs-4 condition-icon"></i>
                  <div>
                    <h6 className="fw-bold mb-1">Para tener en cuenta</h6>
                    <ul className="mb-0 ps-3 small">
                      <li>{adv}</li>
                    </ul>
                  </div>
                </div>
              ))}

              {hotel.condiciones?.recomendaciones && hotel.condiciones.recomendaciones.map((rec, idx) => (
                <div key={`rec-${idx}`} className="alert mb-3 d-flex gap-3 condition-alert-info">
                  <i className="bi bi-info-circle-fill fs-4 condition-icon"></i>
                  <div>
                    <h6 className="fw-bold mb-1">Es bueno saber</h6>
                    <ul className="mb-0 ps-3 small">
                      <li>{rec}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Widget Lateral Sticky (Derecha) */}
          <div className="col-lg-4">
            <div className="card border-0 sticky-top" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', top: '120px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
              <div className="card-body p-4 p-xl-5">
                <h3 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                  ${hotel.precioMinimo} <span className="fs-6 fw-normal" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>/ noche</span>
                </h3>
                <p className="small mb-4 pb-3 border-bottom" style={{ color: 'var(--accent-gold)' }}><i className="bi bi-shield-check me-1"></i> Mejor precio garantizado</p>

                <form>
                  <div className="mb-4 position-relative">
                    <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Estadía</label>
                    <div className="input-group d-flex align-items-center">
                      <span className="input-group-text border-0" style={{ backgroundColor: 'var(--bg-primary)', height: '54px', borderRadius: '8px 0 0 8px' }}>
                        <i className="bi bi-calendar-range" style={{ color: 'var(--accent-gold)' }}></i>
                      </span>
                      <div className="flex-grow-1 d-flex">
                        <DatePicker 
                          selectsRange={true}
                          startDate={startDate}
                          endDate={endDate}
                          onChange={(update) => setDateRange(update)}
                          minDate={new Date()}
                          locale="es"
                          dateFormat="dd/MM/yyyy"
                          className="form-control border-0 shadow-none w-100" 
                          placeholderText="Seleccionar fechas"
                          style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', height: '54px', borderRadius: '0 8px 8px 0', fontSize: '0.95rem' }}
                          wrapperClassName="flex-grow-1 w-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>Habitaciones y Huéspedes</label>
                    <div className="input-group d-flex align-items-center" style={{ backgroundColor: 'var(--bg-primary)', borderRadius: '8px' }}>
                      <PassengerSelector disabled={false} theme="dark" />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: 'var(--text-secondary)' }}>${hotel.precioMinimo} x 1 noche</span>
                    <span className="fw-medium" style={{ color: 'var(--text-primary)' }}>${hotel.precioMinimo}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4 pb-3 border-bottom" style={{ borderColor: 'var(--border-color) !important' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Impuestos y cargos</span>
                    <span className="fw-medium" style={{ color: 'var(--text-primary)' }}>$45</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-4 mt-2">
                    <span className="fw-bold fs-5" style={{ color: 'var(--text-primary)' }}>Total</span>
                    <span className="fw-bold fs-4" style={{ color: 'var(--accent-gold)' }}>${hotel.precioMinimo + 45}</span>
                  </div>

                  <button type="button" className="btn btn-marriott w-100 d-flex justify-content-center align-items-center fw-bold text-uppercase" style={{ height: '56px', letterSpacing: '1px' }}>
                    Reservar Ahora
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Hoteles Similares (Fuera del row principal, ancho completo o container) */}
        {similares.length > 0 && (
          <div className="mt-5 pt-5 border-top" style={{ borderColor: 'var(--border-color) !important' }}>
            <h4 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Alojamientos similares a {hotel.nombre}</h4>
            <div className="row g-4">
              {similares.map((sim) => (
                <div className="col-md-4" key={`sim-${sim.id}`}>
                  <Link to={`/hotel/${sim.id}`} className="text-decoration-none">
                    <div className="card h-100 border-0 hotel-card-hover similar-hotel-card">
                      <div className="similar-hotel-img-wrapper">
                        <img src={sim.imagen} alt={sim.nombre} className="card-img-top object-fit-cover" />
                        <div className="similar-hotel-badge">Alojamiento</div>
                      </div>
                      <div className="card-body p-4 d-flex flex-column">
                        <h5 className="fw-bold mb-2 similar-hotel-title">{sim.nombre}</h5>
                        <p className="small mb-3 similar-hotel-location"><i className="bi bi-geo-alt"></i> {sim.ubicacion}</p>
                        
                        <div className="d-flex align-items-center gap-2 mb-4">
                          <span className="badge bg-success fw-bold fs-6">{sim.estrellas}.0</span>
                          <span className="text-warning small similar-hotel-stars">
                            {'★'.repeat(sim.estrellas)}
                          </span>
                        </div>

                        <div className="mt-auto pt-3 border-top-custom">
                          <small className="d-block mb-1 similar-hotel-subtext">1 noche, 2 personas desde</small>
                          <div className="d-flex justify-content-between align-items-end">
                            <span className="fw-bold fs-4 similar-hotel-price">${sim.precioMinimo}</span>
                            <span className="badge similar-hotel-action">Reserva ahora</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetail;
