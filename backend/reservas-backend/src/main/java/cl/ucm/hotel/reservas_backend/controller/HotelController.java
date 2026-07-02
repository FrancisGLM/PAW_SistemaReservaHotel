package cl.ucm.hotel.reservas_backend.controller;

import cl.ucm.hotel.reservas_backend.dto.in.HotelDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.HotelDtoOut;
import cl.ucm.hotel.reservas_backend.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hoteles")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping
    public ResponseEntity<List<HotelDtoOut>> getAll() {
        return ResponseEntity.ok(hotelService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelDtoOut> getById(@PathVariable Long id) {
        return ResponseEntity.ok(hotelService.findById(id));
    }

    @PostMapping
    public ResponseEntity<HotelDtoOut> create(@RequestBody HotelDtoIn dto) {
        return new ResponseEntity<>(hotelService.save(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HotelDtoOut> update(@PathVariable Long id, @RequestBody HotelDtoIn dto) {
        return ResponseEntity.ok(hotelService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        hotelService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
