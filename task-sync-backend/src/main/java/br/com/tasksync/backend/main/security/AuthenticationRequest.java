package br.com.tasksync.backend.main.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Profile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Profile("sec")
public class AuthenticationRequest {
    private String email;
    private String password;
}
