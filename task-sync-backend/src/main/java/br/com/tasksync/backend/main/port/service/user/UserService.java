package br.com.tasksync.backend.main.port.service.user;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;
import br.com.tasksync.backend.main.dto.CreateUserDto;
import br.com.tasksync.backend.main.port.service.crud.CrudService;

import java.util.List;

public interface UserService extends CrudService<UserModel> {

    boolean ifExistsCpf(UserModel data);

    int create(CreateUserDto data);

    List<UserModel> findAllByUserId (int userId);
}
