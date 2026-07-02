package cl.ucm.hotel.reservas_backend.repository;

import cl.ucm.hotel.reservas_backend.entity.Habitacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitacionRepository extends JpaRepository<Habitacion, Long> {
}
