package cl.ucm.hotel.reservas_backend.dto.out;

import lombok.Data;

@Data
public class HabitacionDtoOut {
    private Long id;
    private String numero;
    private String tipo;
    private Double precioPorNoche;
    private Integer capacidad;
    private Long hotelId;
}
