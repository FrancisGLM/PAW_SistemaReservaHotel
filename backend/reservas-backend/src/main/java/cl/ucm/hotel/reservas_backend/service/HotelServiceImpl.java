package cl.ucm.hotel.reservas_backend.service;

import cl.ucm.hotel.reservas_backend.dto.in.HotelDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.HotelDtoOut;
import cl.ucm.hotel.reservas_backend.entity.Hotel;
import cl.ucm.hotel.reservas_backend.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelServiceImpl implements HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public List<HotelDtoOut> findAll() {
        return hotelRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public HotelDtoOut findById(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel no encontrado"));
        return mapToDto(hotel);
    }

    @Override
    public HotelDtoOut save(HotelDtoIn dto) {
        Hotel hotel = new Hotel();
        hotel.setNombre(dto.getNombre());
        hotel.setDireccion(dto.getDireccion());
        hotel.setEstrellas(dto.getEstrellas());
        return mapToDto(hotelRepository.save(hotel));
    }

    @Override
    public HotelDtoOut update(Long id, HotelDtoIn dto) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel no encontrado"));
        hotel.setNombre(dto.getNombre());
        hotel.setDireccion(dto.getDireccion());
        hotel.setEstrellas(dto.getEstrellas());
        return mapToDto(hotelRepository.save(hotel));
    }

    @Override
    public void delete(Long id) {
        if (!hotelRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel no encontrado");
        }
        hotelRepository.deleteById(id);
    }

    private HotelDtoOut mapToDto(Hotel hotel) {
        HotelDtoOut out = new HotelDtoOut();
        out.setId(hotel.getId());
        out.setNombre(hotel.getNombre());
        out.setDireccion(hotel.getDireccion());
        out.setEstrellas(hotel.getEstrellas());
        return out;
    }
}
