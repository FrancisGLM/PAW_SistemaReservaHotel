package cl.ucm.hotel.reservas_backend.error;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorInfo {
    private int codigo;
    private String mensaje;
    private LocalDateTime fecha;
}
