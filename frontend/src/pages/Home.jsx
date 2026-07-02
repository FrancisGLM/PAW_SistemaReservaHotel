import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import HotelCard from '../components/HotelCard';

const paises = [
  { name: "Argentina", img: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=150&q=80" },
  { name: "Brasil", img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=150&q=80" },
  { name: "Chile", img: "https://images.unsplash.com/photo-1518182170546-076616fd392b?w=150&q=80" },
  { name: "Perú", img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=150&q=80" },
  { name: "Colombia", img: "https://images.unsplash.com/photo-1590488663807-6a4a7cf528de?w=150&q=80" },
  { name: "México", img: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=150&q=80" },
  { name: "Canadá", img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=150&q=80" },
  { name: "Costa Rica", img: "https://images.unsplash.com/photo-1590216738596-f9e048f8605c?w=150&q=80" },
  { name: "España", img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=150&q=80" },
  { name: "Estados Unidos", img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=150&q=80" },
  { name: "Francia", img: "https://images.unsplash.com/photo-1502602898657-3e907a5ea071?w=150&q=80" },
  { name: "Italia", img: "https://images.unsplash.com/photo-1515542622106-78b28af78158?w=150&q=80" },
  { name: "Grecia", img: "https://images.unsplash.com/photo-1503152394-c571994fd383?w=150&q=80" },
  { name: "Suiza", img: "https://images.unsplash.com/photo-1527668752968-14ce70a6c76a?w=150&q=80" },
  { name: "Japón", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=150&q=80" },
  { name: "Tailandia", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=150&q=80" },
  { name: "Corea del Sur", img: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=150&q=80" },
  { name: "Vietnam", img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=150&q=80" },
  { name: "India", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=150&q=80" }
];

const row1 = [...paises, ...paises];
const row2 = [...paises.slice().reverse(), ...paises.slice().reverse()];
const row3 = [...paises.slice(5), ...paises.slice(0, 5), ...paises.slice(5), ...paises.slice(0, 5)];

const Home = () => {
  const [hoteles, setHoteles] = useState([]);

  useEffect(() => {
    fetch('/mocks/hoteles.json')
      .then(res => res.json())
      .then(data => setHoteles(data))
      .catch(err => console.error("Error loading mocks", err));
  }, []);

  return (
    <main className="flex-grow-1">
      <Hero />
      <section className="container py-5 my-4">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
            Nuestros Destinos <span className="text-shine-gold">Destacados</span>
          </h2>
          <p className="mx-auto" style={{ maxWidth: '600px', color: 'rgba(255, 255, 255, 0.85)' }}>
            Explora nuestra selección de hoteles exclusivos y encuentra el lugar perfecto para tu próxima escapada.
          </p>
        </div>
        
        <div className="row g-4">
          {hoteles && hoteles.length > 0 ? (
            hoteles.map(hotel => (
              <div className="col-12 col-md-6 col-lg-4" key={hotel.id}>
                <HotelCard hotel={hotel} onBook={(id) => console.log('Booking hotel:', id)} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted">
              Cargando destinos destacados...
            </div>
          )}
        </div>
        <div className="text-center mt-5">
          <button className="btn btn-marriott px-5 py-2">
            Ver más destinos
          </button>
        </div>
      </section>

      {/* Sección Marquee: ¿Dónde quieres viajar ahora? */}
      <section className="container-fluid py-5 mt-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold font-urbanist" style={{ color: 'var(--text-primary)' }}>
            ¿Dónde quieres viajar ahora?
          </h2>
        </div>
        <div className="marquee-container py-2">
          <div className="marquee-content">
            {row1.map((pais, index) => (
              <div key={'r1-'+index} className="destino-item">
                <img src={pais.img} alt={pais.name} />
                <span className="destino-hover">{pais.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="marquee-container py-2">
          <div className="marquee-content-right">
            {row2.map((pais, index) => (
              <div key={'r2-'+index} className="destino-item">
                <img src={pais.img} alt={pais.name} />
                <span className="destino-hover">{pais.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="marquee-container py-2">
          <div className="marquee-content" style={{ animationDuration: '70s' }}>
            {row3.map((pais, index) => (
              <div key={'r3-'+index} className="destino-item">
                <img src={pais.img} alt={pais.name} />
                <span className="destino-hover">{pais.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
