package cl.ucm.hotel.reservas_backend.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorInfo> handleResponseStatusException(ResponseStatusException ex) {
        ErrorInfo error = new ErrorInfo(
                ex.getStatusCode().value(),
                ex.getReason(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(error, ex.getStatusCode());
    }

    // Valor Añadido: Manejo de error cuando se intenta borrar un registro que está siendo usado por otro (Ej: Hotel con Habitaciones)
    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<ErrorInfo> handleDataIntegrityException(org.springframework.dao.DataIntegrityViolationException ex) {
        ErrorInfo error = new ErrorInfo(
                HttpStatus.CONFLICT.value(),
                "Conflicto de datos: No se puede eliminar o modificar el registro porque está siendo referenciado por otra entidad.",
                LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorInfo> handleGeneralException(Exception ex) {
        ErrorInfo error = new ErrorInfo(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Error interno del servidor",
                LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
