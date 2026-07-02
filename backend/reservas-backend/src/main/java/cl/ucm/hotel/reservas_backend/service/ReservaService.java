package cl.ucm.hotel.reservas_backend.service;

import cl.ucm.hotel.reservas_backend.dto.in.ReservaDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.ReservaDtoOut;

import java.util.List;

public interface ReservaService {
    List<ReservaDtoOut> findAll();
    ReservaDtoOut findById(Long id);
    ReservaDtoOut save(ReservaDtoIn dto);
    ReservaDtoOut update(Long id, ReservaDtoIn dto);
    void delete(Long id);
    
    // Lógica de dominio
    List<ReservaDtoOut> findByHuespedId(Long huespedId);
    ReservaDtoOut updateEstado(Long id, String estado);
}
