import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import PassengerSelector from './PassengerSelector';

registerLocale('es', es);

const words = [
  'elegancia', 'felicidad', 'tranquilidad', 'aventura', 'magia', 'exclusividad', 'paz',
  'belleza', 'esencia', 'emoción', 'maravilla', 'comodidad', 'calma', 'armonía',
  'diversión', 'cultura', 'historia', 'naturaleza', 'gastronomía'
];

const AnimatedWord = () => {
  const [index, setIndex] = useState(0);
  const [widths, setWidths] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="palabras-contenedor" 
      style={{ 
        width: widths[index] ? `${widths[index]}px` : '200px',
        transition: 'width 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}
    >
      {/* Invisible layer to measure exact word widths */}
      <div style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
        {words.map((w, i) => (
          <span 
            key={i} 
            ref={el => { if (el && !widths[i]) setWidths(prev => ({...prev, [i]: el.offsetWidth })) }}
          >
            {w}
          </span>
        ))}
      </div>

      {/* Vertical sliding column */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          transform: `translateY(calc(-${index} * 1.2em))`,
          transition: 'transform 0.6s cubic-bezier(0.68, -0.1, 0.265, 1.15)',
          width: '100%',
          alignItems: 'center'
        }}
      >
        {words.map((w, i) => (
          <span key={i} style={{ color: 'var(--accent-gold)', height: '1.2em', lineHeight: '1.2em', whiteSpace: 'nowrap' }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

const CustomDateInput = React.forwardRef(({ value, onClick, disabled }, ref) => {
  const dates = value ? value.split(' - ') : [];
  const start = dates[0] || '';
  const end = dates[1] || '';
  
  return (
    <div 
      className={`form-control p-0 d-flex align-items-center border-0 ${disabled ? 'input-disabled-state' : 'bg-white'}`} 
      style={{ borderRadius: '0 8px 8px 0', cursor: disabled ? 'not-allowed' : 'pointer', height: '54px' }} 
      onClick={!disabled ? onClick : undefined} 
      ref={ref}
    >
      <input type="text" readOnly placeholder="Entrada" value={start} className={`form-control border-0 shadow-none w-100 hero-search-input h-100 font-urbanist text-center ${disabled ? 'input-disabled-state' : 'bg-white'}`} style={{ pointerEvents: 'none', height: '100%' }} />
      <div style={{ height: '30px', width: '1px', backgroundColor: '#dee2e6' }}></div>
      <input type="text" readOnly placeholder="Salida" value={end} className={`form-control border-0 shadow-none w-100 hero-search-input h-100 font-urbanist text-center ${disabled ? 'input-disabled-state' : 'bg-white'}`} style={{ pointerEvents: 'none', height: '100%' }} />
    </div>
  );
});

const Hero = ({ title, subtitle, imageUrl, ctaText, onCtaClick }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datesDefined, setDatesDefined] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [destinoStr, setDestinoStr] = useState('');

  const btnRef = useRef(null);

  const handleSearchClick = () => {
    setIsSearching(true);
    if (onCtaClick) onCtaClick();
    
    // Redirect a /resultados
    setTimeout(() => {
      window.location.href = `/resultados${destinoStr ? `?destino=${encodeURIComponent(destinoStr)}` : ''}`;
    }, 800);
  };

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btnRef.current.style.setProperty('--mouse-x', `${x}px`);
    btnRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="position-relative d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
      {/* Contenedor de fondo animado para evitar overflow */}
      <div className="position-absolute w-100 h-100 overflow-hidden" style={{ top: 0, left: 0, zIndex: 0 }}>
        {/* Capa de fondo animada */}
        <div 
          className="position-absolute w-100 h-100 hero-bg-zoom" 
          style={{ 
            backgroundImage: `url(${imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            top: 0, left: 0
          }} 
        ></div>
        {/* Overlay oscuro estático */}
        <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, left: 0 }}></div>
      </div>
      
      <div className="container position-relative text-center text-white z-2 px-4 mt-5" style={{ zIndex: 2 }}>
        <h1 className="display-4 fw-bold mb-3 font-urbanist frase-text" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.6)' }}>
          {title ? title : (
            <>
              <span>Descubre la</span>
              <AnimatedWord />
              <span>en cada destino</span>
            </>
          )}
        </h1>
        <p className="lead mb-5 mx-auto font-urbanist text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)', maxWidth: '700px', fontWeight: '400' }}>
          {subtitle || 'Experiencias inolvidables y confort de clase mundial al alcance de tu mano. Reserva ahora.'}
        </p>
        
        {/* Widget Buscador */}
        <div className="card mx-auto shadow-lg border-0" style={{ maxWidth: '1200px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px' }}>
          <div className="card-body p-4">
            <form className="row g-3 align-items-end pb-4">
              <div className="col-lg-4 text-start">
                <label className="form-label small text-uppercase fw-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '1px', fontSize: '0.75rem' }}>Destino</label>
                <div className="input-group hero-search-group">
                  <span className="input-group-text bg-white border-0" style={{ height: '54px', borderRadius: '8px 0 0 8px' }}><i className="bi bi-geo-alt" style={{ color: 'var(--accent-gold)' }}></i></span>
                  <input 
                    type="text" 
                    className="form-control bg-white border-0 shadow-none hero-search-input m-0" 
                    placeholder="¿A dónde viajas?" 
                    value={destinoStr}
                    onChange={(e) => setDestinoStr(e.target.value)}
                    style={{ height: '54px', borderRadius: '0 8px 8px 0' }} 
                  />
                </div>
              </div>
              <div className="col-lg-4 text-start position-relative">
                <label className="form-label small text-uppercase fw-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '1px', fontSize: '0.75rem' }}>Fechas</label>
                <div className="input-group hero-search-group">
                  <span className={`input-group-text border-0 ${!datesDefined ? 'input-disabled-state' : 'bg-white'}`} style={{ height: '54px', borderRadius: '8px 0 0 8px' }}><i className="bi bi-calendar3" style={{ color: 'var(--accent-gold)' }}></i></span>
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
                    monthsShown={2}
                    popperPlacement="bottom-start"
                    disabled={!datesDefined}
                    dateFormat="dd/MM/yyyy"
                    locale="es"
                    customInput={<CustomDateInput disabled={!datesDefined} />}
                    wrapperClassName="form-control p-0 border-0 h-100 d-flex align-items-center"
                  />
                </div>
                <div className="form-check form-switch position-absolute" style={{ top: '100%', left: '15px', marginTop: '8px', zIndex: 10 }}>
                  <input 
                    className="form-check-input shadow-none" 
                    type="checkbox" 
                    role="switch" 
                    id="switchFechas" 
                    checked={!datesDefined} 
                    onChange={() => setDatesDefined(!datesDefined)} 
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: !datesDefined ? 'var(--accent-gold)' : 'rgba(255,255,255,0.2)',
                      borderColor: !datesDefined ? 'var(--accent-gold)' : 'rgba(255,255,255,0.4)'
                    }} 
                  />
                  <label className="form-check-label small fw-semibold ms-2" htmlFor="switchFechas" style={{ color: 'var(--text-primary)', cursor: 'pointer' }}>Aún no definí la fecha</label>
                </div>
              </div>
              <div className="col-lg-2 text-start">
                <label className="form-label small text-uppercase fw-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '1px', fontSize: '0.75rem' }}>Pasajeros</label>
                <div className="input-group hero-search-group d-flex align-items-center" style={{ height: '54px' }}>
                  <PassengerSelector disabled={!datesDefined} />
                </div>
              </div>
              <div className="col-lg-2 mt-4 mt-lg-0 d-flex justify-content-center">
                <button ref={btnRef} onMouseMove={handleMouseMove} type="button" className={`btn btn-marriott no-slide-hover d-flex align-items-center justify-content-center font-urbanist overflow-hidden transition-all ${isSearching ? 'btn-searching' : 'w-100'}`} onClick={handleSearchClick} style={{ fontSize: '1rem', height: '54px', borderRadius: '8px' }}>
                  <i className="gooey-effect"></i>
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
