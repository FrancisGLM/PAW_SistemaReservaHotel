package cl.ucm.hotel.reservas_backend.service;

import cl.ucm.hotel.reservas_backend.dto.in.HotelDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.HotelDtoOut;

import java.util.List;

public interface HotelService {
    List<HotelDtoOut> findAll();
    HotelDtoOut findById(Long id);
    HotelDtoOut save(HotelDtoIn dto);
    HotelDtoOut update(Long id, HotelDtoIn dto);
    void delete(Long id);
}
