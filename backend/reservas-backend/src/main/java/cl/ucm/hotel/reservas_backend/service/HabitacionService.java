package cl.ucm.hotel.reservas_backend.service;

import cl.ucm.hotel.reservas_backend.dto.in.HabitacionDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.HabitacionDtoOut;

import java.util.List;

public interface HabitacionService {
    List<HabitacionDtoOut> findAll();
    HabitacionDtoOut findById(Long id);
    HabitacionDtoOut save(HabitacionDtoIn dto);
    HabitacionDtoOut update(Long id, HabitacionDtoIn dto);
    void delete(Long id);
}
