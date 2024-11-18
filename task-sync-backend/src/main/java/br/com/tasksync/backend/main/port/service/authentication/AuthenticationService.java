package br.com.tasksync.backend.main.port.service.authentication;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;

public interface AuthenticationService {
    UserModel authenticate(final AuthenticationDto authenticationDto);
}
