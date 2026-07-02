import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axiosConfig';
import SearchSidebar from '../components/SearchSidebar';
import HorizontalHotelCard from '../components/HorizontalHotelCard';

const ResultadosBusqueda = () => {
  const [hoteles, setHoteles] = useState([]);
  const [filteredHoteles, setFilteredHoteles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState(null);
  const [sortOption, setSortOption] = useState('recomendados');
  const location = useLocation();

  // Obtener destino de la URL si existe
  const searchParams = new URLSearchParams(location.search);
  const destinoQuery = searchParams.get('destino') || '';

  useEffect(() => {
    const fetchHoteles = async () => {
      try {
        const res = await api.get('/hoteles');
        const data = res.data;
        setHoteles(data);
        
        // Filtro inicial por destino
        if (destinoQuery) {
          const inicial = data.filter(h => 
            (h.direccion && h.direccion.toLowerCase().includes(destinoQuery.toLowerCase())) || 
            (h.nombre && h.nombre.toLowerCase().includes(destinoQuery.toLowerCase()))
          );
          setFilteredHoteles(inicial);
        } else {
          setFilteredHoteles(data);
        }
      } catch (error) {
        console.error("Error cargando hoteles:", error);
      } finally {
        setTimeout(() => setLoading(false), 800); // Fake delay para realismo
      }
    };
    fetchHoteles();
  }, [destinoQuery]);

  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
  };

  useEffect(() => {
    let result = [...hoteles];

    if (destinoQuery) {
      result = result.filter(h => 
        (h.direccion && h.direccion.toLowerCase().includes(destinoQuery.toLowerCase())) || 
        (h.nombre && h.nombre.toLowerCase().includes(destinoQuery.toLowerCase()))
      );
    }

    if (currentFilters) {
      result = result.filter(h => h.precioMinimo >= currentFilters.priceMin && h.precioMinimo <= currentFilters.priceMax);

      if (currentFilters.stars.length > 0) {
        result = result.filter(h => currentFilters.stars.includes(h.estrellas));
      }

      if (currentFilters.amenities.length > 0) {
        result = result.filter(h => 
          currentFilters.amenities.every(am => 
            (h.amenidades && h.amenidades.includes(am)) || 
            (h.condiciones && h.condiciones.includes(am))
          )
        );
      }
    }

    if (sortOption === 'precio_asc') {
      result.sort((a, b) => a.precioMinimo - b.precioMinimo);
    } else if (sortOption === 'precio_desc') {
      result.sort((a, b) => b.precioMinimo - a.precioMinimo);
    } else if (sortOption === 'estrellas_desc') {
      result.sort((a, b) => b.estrellas - a.estrellas);
    }

    setFilteredHoteles(result);
  }, [hoteles, destinoQuery, currentFilters, sortOption]);

  return (
    <div className="container-fluid px-lg-5 py-4 mt-5 min-vh-100 page-enter" style={{ backgroundColor: 'var(--bg-primary)' }}>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Alojamientos {destinoQuery && `en ${destinoQuery}`}
          </h2>
          <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
            Mostrando {filteredHoteles.length} propiedades
          </p>
        </div>
        <div>
          <select 
            className="form-select shadow-none text-white" 
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="recomendados">Más relevantes</option>
            <option value="precio_asc">Precio: menor a mayor</option>
            <option value="precio_desc">Precio: mayor a menor</option>
            <option value="estrellas_desc">Estrellas: mayor a menor</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 mb-4 mb-lg-0">
          <SearchSidebar 
            onFilterChange={handleFilterChange} 
            hoteles={hoteles.filter(h => !destinoQuery || (h.direccion && h.direccion.toLowerCase().includes(destinoQuery.toLowerCase())) || (h.nombre && h.nombre.toLowerCase().includes(destinoQuery.toLowerCase())))} 
          />
        </div>

        {/* Resultados */}
        <div className="col-lg-9">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Buscando los mejores precios...</span>
              </div>
              <h5 className="mt-3 text-white">Buscando los mejores precios...</h5>
            </div>
          ) : filteredHoteles.length > 0 ? (
            filteredHoteles.map(hotel => (
              <HorizontalHotelCard key={hotel.id} hotel={hotel} />
            ))
          ) : (
            <div className="card border-0 text-center py-5" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
              <div className="card-body">
                <i className="bi bi-search fs-1 mb-3 d-block" style={{ color: 'var(--text-secondary)' }}></i>
                <h4 className="fw-bold text-white">No encontramos resultados exactos</h4>
                <p style={{ color: 'var(--text-secondary)' }}>Intenta ajustar tus filtros o buscar un destino diferente.</p>
                <button className="btn btn-outline-gold mt-2" onClick={() => window.location.href = '/resultados'}>
                  Ver todos los hoteles
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultadosBusqueda;
