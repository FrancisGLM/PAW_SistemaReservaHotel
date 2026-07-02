package cl.ucm.hotel.reservas_backend.service;

import cl.ucm.hotel.reservas_backend.dto.in.HabitacionDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.HabitacionDtoOut;
import cl.ucm.hotel.reservas_backend.entity.Habitacion;
import cl.ucm.hotel.reservas_backend.entity.Hotel;
import cl.ucm.hotel.reservas_backend.repository.HabitacionRepository;
import cl.ucm.hotel.reservas_backend.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HabitacionServiceImpl implements HabitacionService {

    @Autowired
    private HabitacionRepository habitacionRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public List<HabitacionDtoOut> findAll() {
        return habitacionRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public HabitacionDtoOut findById(Long id) {
        Habitacion habitacion = habitacionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Habitacion no encontrada"));
        return mapToDto(habitacion);
    }

    @Override
    public HabitacionDtoOut save(HabitacionDtoIn dto) {
        Hotel hotel = hotelRepository.findById(dto.getHotelId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel no encontrado"));

        Habitacion habitacion = new Habitacion();
        habitacion.setNumero(dto.getNumero());
        habitacion.setTipo(dto.getTipo());
        habitacion.setPrecioPorNoche(dto.getPrecioPorNoche());
        habitacion.setCapacidad(dto.getCapacidad());
        habitacion.setHotel(hotel);

        return mapToDto(habitacionRepository.save(habitacion));
    }

    @Override
    public HabitacionDtoOut update(Long id, HabitacionDtoIn dto) {
        Habitacion habitacion = habitacionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Habitacion no encontrada"));

        Hotel hotel = hotelRepository.findById(dto.getHotelId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel no encontrado"));

        habitacion.setNumero(dto.getNumero());
        habitacion.setTipo(dto.getTipo());
        habitacion.setPrecioPorNoche(dto.getPrecioPorNoche());
        habitacion.setCapacidad(dto.getCapacidad());
        habitacion.setHotel(hotel);

        return mapToDto(habitacionRepository.save(habitacion));
    }

    @Override
    public void delete(Long id) {
        if (!habitacionRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Habitacion no encontrada");
        }
        habitacionRepository.deleteById(id);
    }

    @Override
    public List<HabitacionDtoOut> findDisponibles(java.time.LocalDate checkIn, java.time.LocalDate checkOut) {
        return habitacionRepository.findDisponibles(checkIn, checkOut).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private HabitacionDtoOut mapToDto(Habitacion habitacion) {
        HabitacionDtoOut out = new HabitacionDtoOut();
        out.setId(habitacion.getId());
        out.setNumero(habitacion.getNumero());
        out.setTipo(habitacion.getTipo());
        out.setPrecioPorNoche(habitacion.getPrecioPorNoche());
        out.setCapacidad(habitacion.getCapacidad());
        out.setHotelId(habitacion.getHotel().getId());
        return out;
    }
}
