package cl.ucm.hotel.reservas_backend.controller;

import cl.ucm.hotel.reservas_backend.dto.in.HabitacionDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.HabitacionDtoOut;
import cl.ucm.hotel.reservas_backend.service.HabitacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habitaciones")
public class HabitacionController {

    @Autowired
    private HabitacionService habitacionService;

    @GetMapping
    public ResponseEntity<List<HabitacionDtoOut>> getAll() {
        return ResponseEntity.ok(habitacionService.findAll());
    }

    // Endpoint Lógica de Dominio: Consultar disponibilidad
    @GetMapping("/disponibles")
    public ResponseEntity<List<HabitacionDtoOut>> getDisponibles(
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate checkIn,
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate checkOut) {
        return ResponseEntity.ok(habitacionService.findDisponibles(checkIn, checkOut));
    }

    @GetMapping("/{id}")
    public ResponseEntity<HabitacionDtoOut> getById(@PathVariable Long id) {
        return ResponseEntity.ok(habitacionService.findById(id));
    }

    @PostMapping
    public ResponseEntity<HabitacionDtoOut> create(@RequestBody HabitacionDtoIn dto) {
        return new ResponseEntity<>(habitacionService.save(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HabitacionDtoOut> update(@PathVariable Long id, @RequestBody HabitacionDtoIn dto) {
        return ResponseEntity.ok(habitacionService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        habitacionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
