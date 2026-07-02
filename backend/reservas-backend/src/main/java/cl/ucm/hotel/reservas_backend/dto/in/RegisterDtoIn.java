package cl.ucm.hotel.reservas_backend.dto.in;

import lombok.Data;

@Data
public class RegisterDtoIn {
    private String username;
    private String password;
    private String email;
    // VALOR AGREGADO: Campo nombre
    private String nombre;
    private String rol;
}
