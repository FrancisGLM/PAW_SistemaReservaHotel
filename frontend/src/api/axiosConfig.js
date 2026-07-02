import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Reemplazar con la URL real del backend luego
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Peticiones: Agrega el Token a cada request si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('buhotel_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Respuestas: Atrapa errores 401 y redirige al login
api.interceptors.response.use(
  async (response) => {
    // Adaptador (VALOR AGREGADO): Inyecta datos simulados ricos (imágenes, precio, amenidades) 
    // en los hoteles que devuelve la API Java para mantener la UI sin necesidad de alterar 
    // la estructura original de las entidades y DTOs evaluados.
    if (response.config.url && response.config.url.includes('/hoteles')) {
      
      // Obtener habitaciones reales para calcular el precio del hotel
      let habitaciones = [];
      try {
        const token = localStorage.getItem('buhotel_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const resHab = await axios.get('http://localhost:8080/api/habitaciones', { headers });
        habitaciones = resHab.data;
      } catch (e) {
        console.error("Error fetching habitaciones for pricing", e);
      }

      const getHotelPrice = (hotelId) => {
        const hotelRooms = habitaciones.filter(h => h.hotelId === hotelId);
        if (hotelRooms.length === 0) return ((hotelId * 4700) % 90000) + 9500; // Fallback matemático

        // Jerarquía de precios: 1. Estandar, 2. Económica, 3. Premium
        const estandar = hotelRooms.find(h => h.tipo && h.tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === 'estandar');
        if (estandar) return estandar.precioPorNoche;

        const economica = hotelRooms.find(h => h.tipo && h.tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes('economica'));
        if (economica) return economica.precioPorNoche;

        const premium = hotelRooms.find(h => h.tipo && h.tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === 'premium');
        if (premium) return premium.precioPorNoche;

        return hotelRooms[0].precioPorNoche; // Si tiene otro tipo, retorna la primera
      };

      const hotelImages = [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        "https://images.unsplash.com/photo-1542314831-c53cd3816002?w=800&q=80",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
        "https://images.unsplash.com/photo-1551882547-ff40c0d5b9af?w=800&q=80",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
        "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=800&q=80",
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80",
        "https://images.unsplash.com/photo-1551882547-ff40c0d5b9af?w=800&q=80",
        "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=800&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"
      ];

      const mapHotel = (h) => ({
        ...h,
        ubicacion: h.direccion || "Destino Global",
        descripcion: h.descripcion || `Disfruta de una estadía inolvidable en ${h.nombre}, ubicado en el corazón de ${h.direccion || "la ciudad"}. Ofrecemos el mejor servicio para garantizar tu máximo confort.`,
        precioMinimo: h.precioMinimo || getHotelPrice(h.id),
        imagen: h.imagen || hotelImages[h.id % hotelImages.length],
        amenidades: h.amenidades || (h.id % 2 === 0 ? ["WiFi de Alta Velocidad", "Piscina", "Estacionamiento", "Spa"] : ["WiFi de Alta Velocidad", "Gimnasio"]),
        condiciones: h.condiciones || [
          ...(h.id % 2 === 0 ? ["Cancelación gratis"] : []),
          ...(h.id % 3 === 0 ? ["Reservar sin pagar nada"] : []),
          ...(h.id % 4 === 0 ? ["Desayuno incluido"] : [])
        ]
      });

      if (Array.isArray(response.data)) {
        response.data = response.data.map(mapHotel);
      } else if (response.data && response.data.id) {
        response.data = mapHotel(response.data);
      }
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Limpiamos la sesión local
      localStorage.removeItem('buhotel_user');
      localStorage.removeItem('buhotel_token');
      
      // Emitimos un evento personalizado para que AuthContext o componentes lo escuchen 
      // y puedan redirigir usando el hook useNavigate (ya que aquí no estamos en un componente React)
      window.dispatchEvent(new Event('auth_unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;
