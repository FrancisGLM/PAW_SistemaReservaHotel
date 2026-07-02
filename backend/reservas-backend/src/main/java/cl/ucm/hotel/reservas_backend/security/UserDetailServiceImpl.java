package cl.ucm.hotel.reservas_backend.security;

import cl.ucm.hotel.reservas_backend.entity.Usuario;
import cl.ucm.hotel.reservas_backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = repository.findById(username).orElseThrow(() -> new UsernameNotFoundException(username + " not found"));
        List<String> roles = usuario.getRoles()
                                    .stream()
                                    .map(r-> r.getName())
                                    .toList();
        return User.builder()
                .username(username)
                .password(usuario.getPassword())
                .disabled(false)
                .accountLocked(false)
                .authorities(grantedAuthorities(roles))
                .build();
    }

    private List<GrantedAuthority> grantedAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>(roles.size());
        for (String role : roles) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
        }
        return authorities;
    }
}
