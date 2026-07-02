package cl.ucm.hotel.reservas_backend.controller;

import cl.ucm.hotel.reservas_backend.dto.in.HuespedDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.HuespedDtoOut;
import cl.ucm.hotel.reservas_backend.service.HuespedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/huespedes")
public class HuespedController {

    @Autowired
    private HuespedService huespedService;

    @GetMapping
    public ResponseEntity<List<HuespedDtoOut>> getAll() {
        return ResponseEntity.ok(huespedService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HuespedDtoOut> getById(@PathVariable Long id) {
        return ResponseEntity.ok(huespedService.findById(id));
    }

    @PostMapping
    public ResponseEntity<HuespedDtoOut> create(@RequestBody HuespedDtoIn dto) {
        return new ResponseEntity<>(huespedService.save(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HuespedDtoOut> update(@PathVariable Long id, @RequestBody HuespedDtoIn dto) {
        return ResponseEntity.ok(huespedService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        huespedService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
