package cl.ucm.hotel.reservas_backend.service;

import cl.ucm.hotel.reservas_backend.dto.in.ServicioDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.ServicioDtoOut;
import cl.ucm.hotel.reservas_backend.entity.Servicio;
import cl.ucm.hotel.reservas_backend.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioServiceImpl implements ServicioService {

    @Autowired
    private ServicioRepository servicioRepository;

    @Override
    public List<ServicioDtoOut> findAll() {
        return servicioRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public ServicioDtoOut findById(Long id) {
        Servicio servicio = servicioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Servicio no encontrado"));
        return mapToDto(servicio);
    }

    @Override
    public ServicioDtoOut save(ServicioDtoIn dto) {
        Servicio servicio = new Servicio();
        servicio.setNombre(dto.getNombre());
        servicio.setDescripcion(dto.getDescripcion());
        servicio.setPrecio(dto.getPrecio());
        return mapToDto(servicioRepository.save(servicio));
    }

    @Override
    public ServicioDtoOut update(Long id, ServicioDtoIn dto) {
        Servicio servicio = servicioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Servicio no encontrado"));
        servicio.setNombre(dto.getNombre());
        servicio.setDescripcion(dto.getDescripcion());
        servicio.setPrecio(dto.getPrecio());
        return mapToDto(servicioRepository.save(servicio));
    }

    @Override
    public void delete(Long id) {
        if (!servicioRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Servicio no encontrado");
        }
        servicioRepository.deleteById(id);
    }

    private ServicioDtoOut mapToDto(Servicio servicio) {
        ServicioDtoOut out = new ServicioDtoOut();
        out.setId(servicio.getId());
        out.setNombre(servicio.getNombre());
        out.setDescripcion(servicio.getDescripcion());
        out.setPrecio(servicio.getPrecio());
        return out;
    }
}
