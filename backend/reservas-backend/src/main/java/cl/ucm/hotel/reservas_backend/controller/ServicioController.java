package cl.ucm.hotel.reservas_backend.controller;

import cl.ucm.hotel.reservas_backend.dto.in.ServicioDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.ServicioDtoOut;
import cl.ucm.hotel.reservas_backend.service.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
public class ServicioController {

    @Autowired
    private ServicioService servicioService;

    @GetMapping
    public ResponseEntity<List<ServicioDtoOut>> getAll() {
        return ResponseEntity.ok(servicioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServicioDtoOut> getById(@PathVariable Long id) {
        return ResponseEntity.ok(servicioService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ServicioDtoOut> create(@RequestBody ServicioDtoIn dto) {
        return new ResponseEntity<>(servicioService.save(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServicioDtoOut> update(@PathVariable Long id, @RequestBody ServicioDtoIn dto) {
        return ResponseEntity.ok(servicioService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        servicioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
