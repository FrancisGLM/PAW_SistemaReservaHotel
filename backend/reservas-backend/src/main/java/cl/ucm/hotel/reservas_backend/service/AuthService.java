package cl.ucm.hotel.reservas_backend.service;

import cl.ucm.hotel.reservas_backend.dto.in.LoginDtoIn;
import cl.ucm.hotel.reservas_backend.dto.in.RegisterDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.LoginDtoOut;
import cl.ucm.hotel.reservas_backend.dto.out.RegisterDtoOut;

public interface AuthService {
    RegisterDtoOut register(RegisterDtoIn registerDtoIn);
    LoginDtoOut login(LoginDtoIn loginDtoIn);
}
