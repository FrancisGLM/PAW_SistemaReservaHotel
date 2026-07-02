package cl.ucm.hotel.reservas_backend.service;

import cl.ucm.hotel.reservas_backend.dto.in.ServicioDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.ServicioDtoOut;

import java.util.List;

public interface ServicioService {
    List<ServicioDtoOut> findAll();
    ServicioDtoOut findById(Long id);
    ServicioDtoOut save(ServicioDtoIn dto);
    ServicioDtoOut update(Long id, ServicioDtoIn dto);
    void delete(Long id);
}
