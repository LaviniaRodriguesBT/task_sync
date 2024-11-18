package br.com.tasksync.backend.main.service.authentication;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;
import br.com.tasksync.backend.main.port.service.authentication.AuthenticationService;
import br.com.tasksync.backend.main.port.service.user.UserService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class JwtAuthenticationServiceImplem implements AuthenticationService {

    private final UserService userService;
    private final PasswordEnconder passwordEnconder;

    public JwtAuthenticationServiceImplem(UserService userService, PasswordEnconder passwordEnconder) {
        this.userService = userService;
        this.passwordEnconder = passwordEnconder;
    }


    @Override
    public UserModel authenticate(AuthenticationDto authenticationDto) {
        final UserModel userModel = userService.findByEmail(authenticationDto.getEmail());
        if (userModel == null) {
            throw new UsernameNotFoundException("Credenciais invalidas");
        }

        if (!passwordEncoder.matches(userModel.getPassword(), userModel.getPassword())) {
            throw new BadCredentialsException("Credenciais invalidas");
        }

        return userModel;
    }
}