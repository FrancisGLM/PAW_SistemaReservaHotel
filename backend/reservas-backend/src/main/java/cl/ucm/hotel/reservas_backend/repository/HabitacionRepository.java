package cl.ucm.hotel.reservas_backend.repository;

import cl.ucm.hotel.reservas_backend.entity.Habitacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HabitacionRepository extends JpaRepository<Habitacion, Long> {
    @Query("SELECT h FROM Habitacion h WHERE h.id NOT IN " +
           "(SELECT r.habitacion.id FROM Reserva r WHERE " +
           "(r.fechaCheckIn < :checkOut AND r.fechaCheckOut > :checkIn) AND r.estado != 'cancelada')")
    List<Habitacion> findDisponibles(@Param("checkIn") LocalDate checkIn, @Param("checkOut") LocalDate checkOut);
}
