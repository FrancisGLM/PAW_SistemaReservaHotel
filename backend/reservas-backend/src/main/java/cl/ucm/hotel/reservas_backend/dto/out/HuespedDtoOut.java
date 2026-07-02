package cl.ucm.hotel.reservas_backend.dto.out;

import lombok.Data;

@Data
public class HuespedDtoOut {
    private Long id;
    private String nombreCompleto;
    private String email;
    private String pasaporte;
}
