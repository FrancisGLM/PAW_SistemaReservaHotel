package cl.ucm.hotel.reservas_backend.dto.out;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class LoginDtoOut {
    private String token;
}
