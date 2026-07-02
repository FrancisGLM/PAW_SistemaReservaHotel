package cl.ucm.hotel.reservas_backend.service;

import cl.ucm.hotel.reservas_backend.dto.in.HuespedDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.HuespedDtoOut;

import java.util.List;

public interface HuespedService {
    List<HuespedDtoOut> findAll();
    HuespedDtoOut findById(Long id);
    HuespedDtoOut save(HuespedDtoIn dto);
    HuespedDtoOut update(Long id, HuespedDtoIn dto);
    void delete(Long id);
}
