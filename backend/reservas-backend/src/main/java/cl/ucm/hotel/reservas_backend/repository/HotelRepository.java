package cl.ucm.hotel.reservas_backend.repository;

import cl.ucm.hotel.reservas_backend.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
}
