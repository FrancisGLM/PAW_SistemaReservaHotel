package cl.ucm.hotel.reservas_backend.dto.out;

import lombok.Data;

@Data
public class ServicioDtoOut {
    private Long id;
    private String nombre;
    private String descripcion;
    private Double precio;
}
