package cl.ucm.hotel.reservas_backend.dto.in;

import lombok.Data;

@Data
public class HabitacionDtoIn {
    private String numero;
    private String tipo;
    private Double precioPorNoche;
    private Integer capacidad;
    private Long hotelId;
}
