import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import PassengerSelector from './PassengerSelector';

registerLocale('es', es);

const CustomSidebarDateInput = React.forwardRef(({ value, onClick, disabled }, ref) => {
  const dates = value ? value.split(' - ') : [];
  const start = dates[0] || '';
  const end = dates[1] || '';
  
  return (
    <div className="d-flex gap-2 w-100" onClick={!disabled ? onClick : undefined} ref={ref}>
      <div className="position-relative flex-fill">
        <span className="position-absolute top-50 start-0 translate-middle-y ms-2 small">
          <i className="bi bi-calendar3" style={{ color: 'var(--text-secondary)' }}></i>
        </span>
        <input 
          type="text" 
          readOnly
          value={start}
          className={`form-control shadow-none border-0 small text-center text-white placeholder-light ${disabled ? 'opacity-50' : ''}`} 
          placeholder="Entrada"
          style={{ height: '48px', borderRadius: '8px', fontSize: '0.85rem', paddingLeft: '1.5rem', backgroundColor: 'var(--bg-primary)', cursor: disabled ? 'not-allowed' : 'pointer' }}
        />
      </div>
      <div className="position-relative flex-fill">
        <span className="position-absolute top-50 start-0 translate-middle-y ms-2 small">
          <i className="bi bi-calendar3" style={{ color: 'var(--text-secondary)' }}></i>
        </span>
        <input 
          type="text" 
          readOnly
          value={end}
          className={`form-control shadow-none border-0 small text-center text-white placeholder-light ${disabled ? 'opacity-50' : ''}`} 
          placeholder="Salida"
          style={{ height: '48px', borderRadius: '8px', fontSize: '0.85rem', paddingLeft: '1.5rem', backgroundColor: 'var(--bg-primary)', cursor: disabled ? 'not-allowed' : 'pointer' }}
        />
      </div>
    </div>
  );
});

const SearchSidebar = ({ onFilterChange, hoteles = [] }) => {
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 1000000,
    stars: [],
    amenities: []
  });

  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem('buhotel_startDate');
    return saved ? new Date(saved) : null;
  });
  const [endDate, setEndDate] = useState(() => {
    const saved = localStorage.getItem('buhotel_endDate');
    return saved ? new Date(saved) : null;
  });
  const [datesDefined, setDatesDefined] = useState(() => {
    const saved = localStorage.getItem('buhotel_datesDefined');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    if (startDate) localStorage.setItem('buhotel_startDate', startDate.toISOString());
    else localStorage.removeItem('buhotel_startDate');
  }, [startDate]);

  useEffect(() => {
    if (endDate) localStorage.setItem('buhotel_endDate', endDate.toISOString());
    else localStorage.removeItem('buhotel_endDate');
  }, [endDate]);

  useEffect(() => {
    localStorage.setItem('buhotel_datesDefined', JSON.stringify(datesDefined));
  }, [datesDefined]);

  const handleStarChange = (star) => {
    const newStars = filters.stars.includes(star)
      ? filters.stars.filter(s => s !== star)
      : [...filters.stars, star];
    const newFilters = { ...filters, stars: newStars };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmenityChange = (amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    const newFilters = { ...filters, amenities: newAmenities };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e, type) => {
    const val = parseInt(e.target.value) || 0;
    const newFilters = { ...filters, [type]: val };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="d-flex flex-column gap-3">
      {/* Bloque de Búsqueda Integrado */}
      <div className="card border-0 mb-3" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color) !important' }}>
        <div className="card-body p-4">
          <h5 className="fw-bold text-white mb-3">Alojamientos</h5>
          
          <div className="mb-3 position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ms-3">
              <i className="bi bi-geo-alt" style={{ color: 'var(--text-secondary)' }}></i>
            </span>
            <input 
              type="text" 
              className="form-control shadow-none border-0 text-white placeholder-light" 
              placeholder="Destino"
              defaultValue={new URLSearchParams(window.location.search).get('destino') || ''}
              style={{ paddingLeft: '2.5rem', height: '48px', borderRadius: '8px', backgroundColor: 'var(--bg-primary)' }}
            />
          </div>

          <div className="mb-3">
            <DatePicker 
              selected={startDate}
              onChange={(update) => {
                setStartDate(update[0]);
                setEndDate(update[1]);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              minDate={new Date()}
              monthsShown={1}
              disabled={!datesDefined}
              dateFormat="dd/MM/yyyy"
              locale="es"
              popperPlacement="bottom-start"
              customInput={<CustomSidebarDateInput disabled={!datesDefined} />}
              wrapperClassName="w-100"
            />
          </div>

          <div className="form-check form-switch mb-3">
            <input className="form-check-input shadow-none" type="checkbox" role="switch" id="noDateSwitch" checked={!datesDefined} onChange={() => setDatesDefined(!datesDefined)} style={{ backgroundColor: !datesDefined ? 'var(--accent-gold)' : 'rgba(255,255,255,0.2)', borderColor: !datesDefined ? 'var(--accent-gold)' : 'transparent', cursor: 'pointer' }} />
            <label className="form-check-label text-white small ms-2" htmlFor="noDateSwitch" style={{ cursor: 'pointer' }}>Aún no definí la fecha</label>
          </div>

          <div className="mb-3">
            <PassengerSelector disabled={!datesDefined} theme="dark" />
          </div>

          <button className="btn btn-marriott w-100 fw-bold d-flex justify-content-center align-items-center gap-2" style={{ height: '48px', borderRadius: '8px' }}>
            <i className="bi bi-search"></i> Buscar
          </button>
        </div>
      </div>

      {/* Bloque de Filtros (Card Existente) */}
      <div className="card border-0" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
      {/* Mapa Pequeño Ficticio */}
      <div className="position-relative overflow-hidden" style={{ height: '120px', borderRadius: '16px 16px 0 0', cursor: 'pointer' }}>
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" 
          className="w-100 h-100 object-fit-cover opacity-75"
          alt="Mapa"
        />
        <div className="position-absolute w-100 h-100 top-0 start-0 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <button className="btn btn-light btn-sm fw-bold rounded-pill shadow">
            <i className="bi bi-geo-alt-fill text-danger me-1"></i> Explorar mapa
          </button>
        </div>
      </div>

      <div className="card-body p-4">
        {/* Rango de Precio */}
        <div className="mb-4">
          <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Precio total por noche</h6>
          <div className="d-flex align-items-center mb-3">
            <input 
              type="number" 
              className="form-control form-control-sm text-center shadow-none me-2 text-white" 
              value={filters.priceMin}
              onChange={(e) => handlePriceChange(e, 'priceMin')}
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'var(--border-color)' }}
            />
            <span style={{ color: 'var(--text-secondary)' }}>-</span>
            <input 
              type="number" 
              className="form-control form-control-sm text-center shadow-none ms-2 text-white" 
              value={filters.priceMax}
              onChange={(e) => handlePriceChange(e, 'priceMax')}
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'var(--border-color)' }}
            />
          </div>
          <input 
            type="range" 
            className="form-range" 
            min="0" 
            max="100000" 
            step="5000"
            value={filters.priceMax}
            onChange={(e) => handlePriceChange(e, 'priceMax')}
          />
        </div>

        <hr style={{ borderColor: 'var(--border-color)' }} />

        {/* Categoría (Estrellas) */}
        <div className="mb-4">
          <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Categoría</h6>
          {[5, 4, 3, 2, 1].map(star => {
            const starCount = hoteles.filter(h => h.estrellas === star).length;
            return (
              <div key={star} className="form-check mb-2">
                <input 
                  className="form-check-input shadow-none cursor-pointer" 
                  type="checkbox" 
                  id={`star-${star}`}
                  checked={filters.stars.includes(star)}
                  onChange={() => handleStarChange(star)}
                  style={{ backgroundColor: filters.stars.includes(star) ? 'var(--accent-gold)' : 'transparent', borderColor: 'var(--border-color)' }}
                />
                <label className="form-check-label d-flex align-items-center cursor-pointer w-100" htmlFor={`star-${star}`}>
                  <div className="text-warning me-2" style={{ letterSpacing: '2px' }}>
                    {[...Array(star)].map((_, i) => <i key={i} className="bi bi-star-fill"></i>)}
                  </div>
                  <span className="ms-auto small" style={{ color: 'var(--text-secondary)' }}>
                    {starCount}
                  </span>
                </label>
              </div>
            );
          })}
        </div>

        <hr style={{ borderColor: 'var(--border-color)' }} />

        {/* Condiciones de tu reserva */}
        <div className="mb-4">
          <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Condiciones de reserva</h6>
          <div className="form-check form-switch mb-2">
            <input className="form-check-input shadow-none cursor-pointer" type="checkbox" role="switch" id="cancelation" onChange={() => handleAmenityChange('Cancelación gratis')} style={{ backgroundColor: filters.amenities.includes('Cancelación gratis') ? 'var(--accent-gold)' : 'var(--bg-primary)', borderColor: 'var(--border-color)' }} />
            <label className="form-check-label small w-100 d-flex justify-content-between cursor-pointer" htmlFor="cancelation" style={{ color: 'var(--text-secondary)' }}>
              <span>Cancelación gratis</span>
            </label>
          </div>
          <div className="form-check form-switch mb-2">
            <input className="form-check-input shadow-none cursor-pointer" type="checkbox" role="switch" id="noprepay" onChange={() => handleAmenityChange('Reservar sin pagar nada')} style={{ backgroundColor: filters.amenities.includes('Reservar sin pagar nada') ? 'var(--accent-gold)' : 'var(--bg-primary)', borderColor: 'var(--border-color)' }} />
            <label className="form-check-label small w-100 d-flex justify-content-between cursor-pointer" htmlFor="noprepay" style={{ color: 'var(--text-secondary)' }}>
              <span>Reservar sin pagar nada</span>
            </label>
          </div>
          <div className="form-check form-switch mb-2">
            <input className="form-check-input shadow-none cursor-pointer" type="checkbox" role="switch" id="desayuno" onChange={() => handleAmenityChange('Desayuno incluido')} style={{ backgroundColor: filters.amenities.includes('Desayuno incluido') ? 'var(--accent-gold)' : 'var(--bg-primary)', borderColor: 'var(--border-color)' }} />
            <label className="form-check-label small w-100 d-flex justify-content-between cursor-pointer" htmlFor="desayuno" style={{ color: 'var(--text-secondary)' }}>
              <span>Desayuno incluido</span>
            </label>
          </div>
        </div>

        <hr style={{ borderColor: 'var(--border-color)' }} />

        {/* Amenidades */}
        <div className="mb-4">
          <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Servicios Populares</h6>
          {['Piscina', 'Spa', 'WiFi de Alta Velocidad', 'Gimnasio', 'Estacionamiento'].map((am) => (
            <div key={am} className="form-check mb-2">
              <input 
                className="form-check-input shadow-none cursor-pointer" 
                type="checkbox" 
                id={`am-${am}`}
                checked={filters.amenities.includes(am)}
                onChange={() => handleAmenityChange(am)}
                style={{ backgroundColor: filters.amenities.includes(am) ? 'var(--accent-gold)' : 'transparent', borderColor: 'var(--border-color)' }}
              />
              <label className="form-check-label small cursor-pointer" htmlFor={`am-${am}`} style={{ color: 'var(--text-secondary)' }}>
                {am}
              </label>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;
