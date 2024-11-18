package br.com.tasksync.backend.main.controller;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;
import br.com.tasksync.backend.main.dto.JwtTokenDto;
import br.com.tasksync.backend.main.port.service.authentication.AuthenticationService;
import br.com.tasksync.backend.main.port.service.authentication.JwtService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Profile("sec")
@RestController()
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final JwtService jwtService;

    private final UserDetailsService userDetailsService;

    public AuthenticationController(final AuthenticationService authenticationService, JwtService jwtService, UserDetailsService userDetailsService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JwtTokenDto> authenticate(@RequestBody final AuthenticationDto authenticationRequest) {
        final String email = authenticationRequest.getEmail();
        final String password = authenticationRequest.getPassword();

        final UserModel authenticatedUser = authenticationService.authenticate(authenticationRequest);

        if (authenticatedUser == null) {
            throw new BadCredentialsException("Invalid email or password");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        if (userDetails == null) {
            throw new UsernameNotFoundException("Email nao encontrado");
        }

        final String jwtToken = jwtService.generateToken(
                userDetails,
                authenticatedUser.getRole(),
                authenticatedUser.getEmail());

        if (jwtToken == null || jwtToken.isEmpty()) {
            throw new InternalError("Jwt invalido");
        }
        System.out.println("Jwt criado:" + jwtToken);
        final JwtTokenDto tokenDto = new JwtTokenDto(jwtToken);

        return ResponseEntity.ok(tokenDto);
    }

}