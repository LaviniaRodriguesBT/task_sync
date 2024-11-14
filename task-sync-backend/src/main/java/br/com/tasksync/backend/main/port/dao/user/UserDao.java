package br.com.tasksync.backend.main.port.dao.user;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;
import br.com.tasksync.backend.main.port.dao.crud.CrudDao;

import java.util.List;

public interface UserDao extends CrudDao<UserModel> {
    UserModel readByEmail(String email);

    boolean updatePassword(int id, String newPassword);

    UserModel authenticate(AuthenticationDto authenticationDto);

    boolean existsCpf(String cpf);

    int numAdmin(int adminId);

    int createUserGroup(int adminId);

    int insertUserUserGroup(int userId, int groupId, int adminId);

    int getAdminUserGroup(int adminId);

    List<UserModel> findAllByUserId(int userId);
}
