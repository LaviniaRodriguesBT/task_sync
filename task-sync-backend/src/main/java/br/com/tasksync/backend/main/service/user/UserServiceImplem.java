package br.com.tasksync.backend.main.service.user;

import br.com.tasksync.backend.main.domain.TaskModel;
import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.port.dao.task.TaskDao;
import br.com.tasksync.backend.main.port.dao.user.UserDao;
import br.com.tasksync.backend.main.port.service.user.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplem implements UserService {

    private final UserDao userDao;

    public UserServiceImplem(UserDao userDao) {
        this.userDao = userDao;
    }



    @Override
    public int create(UserModel entity) {
        if(entity == null){
            return 0;
        }
        if(
                entity.getName().isEmpty() ||
                entity.getEmail().isEmpty() ||
                entity.getPassword().isEmpty() ||
                entity.getCpf().isEmpty() ||
                entity.getPhone().isEmpty() ||
                entity.getAddress().isEmpty()
        ){
            return 0;
        }

        int id = userDao.add(entity);
        System.out.println("Criacao de uma nova pessoa feita com sucesso");
        return id;
    }

    @Override
    public void delete(int id) {
        if(id < 0){
            return;
        }
        System.out.println("Chamou o remover uma pessoa por id");
        userDao.remove(id);

    }

    @Override
    public UserModel findById(int id) {
        if(id < 0){
            return null;
        }
        UserModel user = userDao.readyById(id);
        System.out.println("Chamando a pessoa por id");
        return user;

    }

    @Override
    public List<UserModel> findAll() {
        List<UserModel> user = userDao.readAll();
        System.out.println("Chamando todas as pessoas na tela");
        return user;
    }

    @Override
    public void update(int id, UserModel entity) {
        UserModel userModel = findById(id);
        if(userModel == null){
            return;
        }
        userDao.updateInformation(id, entity);

    }
}
