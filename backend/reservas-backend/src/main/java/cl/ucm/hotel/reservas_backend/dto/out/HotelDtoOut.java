package cl.ucm.hotel.reservas_backend.dto.out;

import lombok.Data;

@Data
public class HotelDtoOut {
    private Long id;
    private String nombre;
    private String direccion;
    private Integer estrellas;
}
