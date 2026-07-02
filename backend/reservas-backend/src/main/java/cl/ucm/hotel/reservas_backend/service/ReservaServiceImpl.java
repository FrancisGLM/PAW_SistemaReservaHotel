package cl.ucm.hotel.reservas_backend.service;

import cl.ucm.hotel.reservas_backend.dto.in.ReservaDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.ReservaDtoOut;
import cl.ucm.hotel.reservas_backend.dto.out.ServicioDtoOut;
import cl.ucm.hotel.reservas_backend.entity.Habitacion;
import cl.ucm.hotel.reservas_backend.entity.Huesped;
import cl.ucm.hotel.reservas_backend.entity.Reserva;
import cl.ucm.hotel.reservas_backend.entity.Servicio;
import cl.ucm.hotel.reservas_backend.repository.HabitacionRepository;
import cl.ucm.hotel.reservas_backend.repository.HuespedRepository;
import cl.ucm.hotel.reservas_backend.repository.ReservaRepository;
import cl.ucm.hotel.reservas_backend.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservaServiceImpl implements ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;
    
    @Autowired
    private HabitacionRepository habitacionRepository;
    
    @Autowired
    private HuespedRepository huespedRepository;
    
    @Autowired
    private ServicioRepository servicioRepository;

    @Override
    public List<ReservaDtoOut> findAll() {
        return reservaRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public ReservaDtoOut findById(Long id) {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada"));
        return mapToDto(reserva);
    }

    @Override
    public ReservaDtoOut save(ReservaDtoIn dto) {
        Habitacion habitacion = habitacionRepository.findById(dto.getHabitacionId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Habitacion no encontrada"));
                
        Huesped huesped = huespedRepository.findById(dto.getHuespedId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Huesped no encontrado"));
                
        List<Long> sIds = dto.getServicioIds() == null ? java.util.Collections.emptyList() : dto.getServicioIds();
        List<Servicio> servicios = servicioRepository.findAllById(sIds);
        
        Reserva reserva = new Reserva();
        reserva.setFechaCheckIn(dto.getFechaCheckIn());
        reserva.setFechaCheckOut(dto.getFechaCheckOut());
        reserva.setEstado(dto.getEstado());
        reserva.setHabitacion(habitacion);
        reserva.setHuesped(huesped);
        reserva.setServicios(servicios);
        
        // Calculate total price
        long days = ChronoUnit.DAYS.between(dto.getFechaCheckIn(), dto.getFechaCheckOut());
        double total = (habitacion.getPrecioPorNoche() * days) + servicios.stream().mapToDouble(Servicio::getPrecio).sum();
        reserva.setPrecioTotal(total);

        return mapToDto(reservaRepository.save(reserva));
    }

    @Override
    public ReservaDtoOut update(Long id, ReservaDtoIn dto) {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada"));
                
        Habitacion habitacion = habitacionRepository.findById(dto.getHabitacionId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Habitacion no encontrada"));
                
        Huesped huesped = huespedRepository.findById(dto.getHuespedId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Huesped no encontrado"));
                
        List<Long> sIds = dto.getServicioIds() == null ? java.util.Collections.emptyList() : dto.getServicioIds();
        List<Servicio> servicios = servicioRepository.findAllById(sIds);
        
        reserva.setFechaCheckIn(dto.getFechaCheckIn());
        reserva.setFechaCheckOut(dto.getFechaCheckOut());
        reserva.setEstado(dto.getEstado());
        reserva.setHabitacion(habitacion);
        reserva.setHuesped(huesped);
        reserva.setServicios(servicios);
        
        long days = ChronoUnit.DAYS.between(dto.getFechaCheckIn(), dto.getFechaCheckOut());
        double total = (habitacion.getPrecioPorNoche() * days) + servicios.stream().mapToDouble(Servicio::getPrecio).sum();
        reserva.setPrecioTotal(total);

        return mapToDto(reservaRepository.save(reserva));
    }

    @Override
    public void delete(Long id) {
        if (!reservaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada");
        }
        reservaRepository.deleteById(id);
    }

    private ReservaDtoOut mapToDto(Reserva reserva) {
        ReservaDtoOut out = new ReservaDtoOut();
        out.setId(reserva.getId());
        out.setFechaCheckIn(reserva.getFechaCheckIn());
        out.setFechaCheckOut(reserva.getFechaCheckOut());
        out.setPrecioTotal(reserva.getPrecioTotal());
        out.setEstado(reserva.getEstado());
        out.setHabitacionId(reserva.getHabitacion().getId());
        out.setHuespedId(reserva.getHuesped().getId());
        
        List<ServicioDtoOut> sDtos = reserva.getServicios().stream().map(s -> {
            ServicioDtoOut sOut = new ServicioDtoOut();
            sOut.setId(s.getId());
            sOut.setNombre(s.getNombre());
            sOut.setDescripcion(s.getDescripcion());
            sOut.setPrecio(s.getPrecio());
            return sOut;
        }).collect(Collectors.toList());
        
        out.setServicios(sDtos);
        
        return out;
    }
}
