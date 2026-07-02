package cl.ucm.hotel.reservas_backend.service;

import cl.ucm.hotel.reservas_backend.dto.in.HuespedDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.HuespedDtoOut;
import cl.ucm.hotel.reservas_backend.entity.Huesped;
import cl.ucm.hotel.reservas_backend.repository.HuespedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HuespedServiceImpl implements HuespedService {

    @Autowired
    private HuespedRepository huespedRepository;

    @Override
    public List<HuespedDtoOut> findAll() {
        return huespedRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public HuespedDtoOut findById(Long id) {
        Huesped huesped = huespedRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Huesped no encontrado"));
        return mapToDto(huesped);
    }

    @Override
    public HuespedDtoOut save(HuespedDtoIn dto) {
        Huesped huesped = new Huesped();
        huesped.setNombreCompleto(dto.getNombreCompleto());
        huesped.setEmail(dto.getEmail());
        huesped.setPasaporte(dto.getPasaporte());
        return mapToDto(huespedRepository.save(huesped));
    }

    @Override
    public HuespedDtoOut update(Long id, HuespedDtoIn dto) {
        Huesped huesped = huespedRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Huesped no encontrado"));
        huesped.setNombreCompleto(dto.getNombreCompleto());
        huesped.setEmail(dto.getEmail());
        huesped.setPasaporte(dto.getPasaporte());
        return mapToDto(huespedRepository.save(huesped));
    }

    @Override
    public void delete(Long id) {
        if (!huespedRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Huesped no encontrado");
        }
        huespedRepository.deleteById(id);
    }

    private HuespedDtoOut mapToDto(Huesped huesped) {
        HuespedDtoOut out = new HuespedDtoOut();
        out.setId(huesped.getId());
        out.setNombreCompleto(huesped.getNombreCompleto());
        out.setEmail(huesped.getEmail());
        out.setPasaporte(huesped.getPasaporte());
        return out;
    }
}
