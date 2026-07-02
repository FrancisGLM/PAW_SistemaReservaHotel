package cl.ucm.hotel.reservas_backend.dto.in;

import lombok.Data;

@Data
public class ServicioDtoIn {
    private String nombre;
    private String descripcion;
    private Double precio;
}
