package cl.ucm.hotel.reservas_backend.dto.in;

import lombok.Data;

@Data
public class HuespedDtoIn {
    private String nombreCompleto;
    private String email;
    private String pasaporte;
}
