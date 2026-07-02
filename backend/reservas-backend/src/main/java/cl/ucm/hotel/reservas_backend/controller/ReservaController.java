package cl.ucm.hotel.reservas_backend.controller;

import cl.ucm.hotel.reservas_backend.dto.in.ReservaDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.ReservaDtoOut;
import cl.ucm.hotel.reservas_backend.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public ResponseEntity<List<ReservaDtoOut>> getAll() {
        return ResponseEntity.ok(reservaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaDtoOut> getById(@PathVariable Long id) {
        return ResponseEntity.ok(reservaService.findById(id));
    }

    // Lógica de Dominio: Ver estado de reservas del huésped
    @GetMapping("/huesped/{huespedId}")
    public ResponseEntity<List<ReservaDtoOut>> getByHuesped(@PathVariable Long huespedId) {
        return ResponseEntity.ok(reservaService.findByHuespedId(huespedId));
    }

    @PostMapping
    public ResponseEntity<ReservaDtoOut> create(@RequestBody ReservaDtoIn dto) {
        return new ResponseEntity<>(reservaService.save(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservaDtoOut> update(@PathVariable Long id, @RequestBody ReservaDtoIn dto) {
        return ResponseEntity.ok(reservaService.update(id, dto));
    }

    // Lógica de Dominio: Gestionar estado rápido (confirmar, cancelar, completar)
    @PatchMapping("/{id}/estado")
    public ResponseEntity<ReservaDtoOut> updateEstado(@PathVariable Long id, @RequestParam String nuevoEstado) {
        return ResponseEntity.ok(reservaService.updateEstado(id, nuevoEstado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reservaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
