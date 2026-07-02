package cl.ucm.hotel.reservas_backend.dto.in;

import lombok.Data;

@Data
public class HotelDtoIn {
    private String nombre;
    private String direccion;
    private Integer estrellas;
}
