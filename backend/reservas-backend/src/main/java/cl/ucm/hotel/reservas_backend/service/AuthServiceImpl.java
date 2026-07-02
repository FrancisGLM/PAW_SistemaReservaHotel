package cl.ucm.hotel.reservas_backend.service;

import cl.ucm.hotel.reservas_backend.dto.in.LoginDtoIn;
import cl.ucm.hotel.reservas_backend.dto.in.RegisterDtoIn;
import cl.ucm.hotel.reservas_backend.dto.out.LoginDtoOut;
import cl.ucm.hotel.reservas_backend.dto.out.RegisterDtoOut;
import cl.ucm.hotel.reservas_backend.entity.Rol;
import cl.ucm.hotel.reservas_backend.entity.Usuario;
import cl.ucm.hotel.reservas_backend.repository.RolRepository;
import cl.ucm.hotel.reservas_backend.repository.UsuarioRepository;
import cl.ucm.hotel.reservas_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public RegisterDtoOut register(RegisterDtoIn registerDtoIn) {
        if (usuarioRepository.existsById(registerDtoIn.getUsername())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El usuario ya existe");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(registerDtoIn.getUsername());
        usuario.setPassword(passwordEncoder.encode(registerDtoIn.getPassword()));
        usuario.setEmail(registerDtoIn.getEmail());

        Rol rol = rolRepository.findByName(registerDtoIn.getRol())
                .orElseGet(() -> {
                    Rol newRol = new Rol();
                    newRol.setName(registerDtoIn.getRol());
                    return rolRepository.save(newRol);
                });

        List<Rol> roles = new ArrayList<>();
        roles.add(rol);
        usuario.setRoles(roles);

        usuarioRepository.save(usuario);

        RegisterDtoOut out = new RegisterDtoOut();
        out.setUsername(usuario.getUsername());
        out.setEmail(usuario.getEmail());
        out.setRol(rol.getName());
        return out;
    }

    @Override
    public LoginDtoOut login(LoginDtoIn loginDtoIn) {
        try {
            UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(
                    loginDtoIn.getUsername(), loginDtoIn.getPassword());
            Authentication authentication = authenticationManager.authenticate(login);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales invalidas");
        }

        Usuario usuario = usuarioRepository.findById(loginDtoIn.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
        
        String rol = usuario.getRoles().isEmpty() ? "USER" : usuario.getRoles().get(0).getName();
        String jwt = jwtUtil.create(loginDtoIn.getUsername(), rol);

        return new LoginDtoOut(jwt);
    }
}
