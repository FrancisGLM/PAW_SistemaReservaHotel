import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import HotelCard from './components/HotelCard';

function App() {
  const [hoteles, setHoteles] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/mocks/hoteles.json')
      .then(res => res.json())
      .then(data => setHoteles(data))
      .catch(err => console.error("Error loading mocks", err));
      
    // Optionally load mock auth
    fetch('/mocks/auth.json')
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error("Error loading auth mock", err));
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-grow-1">
        <Hero />
        
        <section className="container py-5 my-4">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
              Destinos Destacados
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Explora nuestra selección de hoteles exclusivos y encuentra el lugar perfecto para tu próxima escapada.
            </p>
          </div>
          
          <div className="row g-4">
            {hoteles.map(hotel => (
              <div key={hotel.id} className="col-md-6 col-lg-4">
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
