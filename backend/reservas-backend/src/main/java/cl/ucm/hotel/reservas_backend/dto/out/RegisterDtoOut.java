package cl.ucm.hotel.reservas_backend.dto.out;

import lombok.Data;

@Data
public class RegisterDtoOut {
    private String username;
    private String email;
    private String rol;
}
