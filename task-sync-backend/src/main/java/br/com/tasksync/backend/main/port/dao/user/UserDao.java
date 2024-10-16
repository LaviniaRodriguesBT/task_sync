package br.com.tasksync.backend.main.port.dao.user;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;
import br.com.tasksync.backend.main.port.dao.crud.CrudDao;

public interface UserDao extends CrudDao<UserModel> {
    UserModel readByEmail(String email);

    boolean updatePassword(int id, String newPassword);

    UserModel authenticate(AuthenticationDto authenticationDto);
}
