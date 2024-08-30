package br.com.tasksync.backend.main.service.user;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.port.service.user.UserService;

import java.util.List;

public class UserServiceImplem implements UserService {
    @Override
    public int create(UserModel entity) {
        return 0;
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public UserModel findById(int id) {
        return null;
    }

    @Override
    public List<UserModel> findAll() {
        return null;
    }

    @Override
    public void update(int id, UserModel entity) {

    }
}
