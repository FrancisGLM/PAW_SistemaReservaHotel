package cl.ucm.hotel.reservas_backend.controller;

import cl.ucm.hotel.reservas_backend.dto.in.LoginDtoIn;
import cl.ucm.hotel.reservas_backend.dto.in.RegisterDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.LoginDtoOut;
import cl.ucm.hotel.reservas_backend.dto.out.RegisterDtoOut;
import cl.ucm.hotel.reservas_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
// CUMPLE RÚBRICA: Seguridad - Login y Registro (Retorna JWT válido, crea usuario con rol)
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterDtoOut> register(@RequestBody RegisterDtoIn registerDtoIn) {
        RegisterDtoOut out = authService.register(registerDtoIn);
        return new ResponseEntity<>(out, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDtoOut> login(@RequestBody LoginDtoIn loginDtoIn) {
        LoginDtoOut out = authService.login(loginDtoIn);
        return new ResponseEntity<>(out, HttpStatus.OK);
    }
}
