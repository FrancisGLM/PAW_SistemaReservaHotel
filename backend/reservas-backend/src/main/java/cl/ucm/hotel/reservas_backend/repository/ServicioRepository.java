package cl.ucm.hotel.reservas_backend.repository;

import cl.ucm.hotel.reservas_backend.entity.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
}
