package br.com.tasksync.backend.main.port.service.user;

import br.com.tasksync.backend.main.domain.UserModel;

public interface ReadByEmailService {
    UserModel findByEmail(final String email);
}
