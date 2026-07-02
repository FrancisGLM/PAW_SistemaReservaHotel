package cl.ucm.hotel.reservas_backend.dto.in;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class ReservaDtoIn {
    private LocalDate fechaCheckIn;
    private LocalDate fechaCheckOut;
    private String estado;
    private Long habitacionId;
    private Long huespedId;
    private List<Long> servicioIds;
}
