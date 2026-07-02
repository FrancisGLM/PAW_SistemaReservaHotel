package cl.ucm.hotel.reservas_backend.dto.out;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class ReservaDtoOut {
    private Long id;
    private LocalDate fechaCheckIn;
    private LocalDate fechaCheckOut;
    private Double precioTotal;
    private String estado;
    private Long habitacionId;
    private Long huespedId;
    private List<ServicioDtoOut> servicios;
}
