package br.com.tasksync.backend.main.service.user;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;
import br.com.tasksync.backend.main.dto.CreateUserDto;
import br.com.tasksync.backend.main.port.dao.user.UserDao;
import br.com.tasksync.backend.main.port.service.user.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImplem implements UserService {

    private final UserDao userDao;

    public UserServiceImplem(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public int create(UserModel entity) {
        if (entity == null) {
            return 0;
        }
        if (
                entity.getName().isEmpty() ||
                        entity.getEmail().isEmpty() ||
                        entity.getPassword().isEmpty() ||
                        entity.getCpf().isEmpty() ||
                        entity.getPhone().isEmpty() ||
                        entity.getAddress().isEmpty()
        ) {
            return 0;
        }

        UserModel admin = userDao.readyById(entity.getUserId());

        boolean responseExist = ifExistsCpf(entity);
        System.out.println("cheguei aqui" + responseExist);
        if (responseExist) {
            System.out.println("nao consegui criar o usuario");
            return 0;
        }

        if (admin.getAccess_type().equals("ADMINSTRADOR")){
            int admCreated = userDao.numAdmin(admin.getId());
            if (admCreated > 1) {
                System.out.println("quantidade de adm maior que o suportado");
                return 0;
            }
        }else if (admin.getAccess_type().equals("COlABORADOR")){
            System.out.println("Ação não é permitida por esse tipo de usuario");
            return 0;
        }


        int id = userDao.add(entity);
        System.out.println("Criacao de uma nova pessoa feita com sucesso");
        return id;
    }

    @Override
    public void delete(int id) {
        if (id < 0) {
            return;
        }
        System.out.println("Chamou o remover uma pessoa por id");
        userDao.remove(id);
    }

    @Override
    public UserModel findById(int id) {
        if (id < 0) {
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
        if (userModel == null) {
            return;
        }
        userDao.updateInformation(id, entity);
    }


    @Override
    public boolean ifExistsCpf(UserModel data) {
        return userDao.existsCpf(data.getCpf());
    }

    @Override
    public int create(CreateUserDto entity) {
        if (entity == null) {
            return 0;
        }
        if (
                entity.getName().isEmpty() ||
                        entity.getEmail().isEmpty() ||
                        entity.getPassword().isEmpty() ||
                        entity.getCpf().isEmpty() ||
                        entity.getPhone().isEmpty() ||
                        entity.getAddress().isEmpty()
        ) {
            return 0;
        }
        UserModel userModel = new UserModel();
        userModel.setCpf(entity.getCpf());
        userModel.setPassword(entity.getPassword());
        userModel.setEmail(entity.getEmail());
        userModel.setPhone(entity.getPhone());
        userModel.setAddress(entity.getAddress());
        userModel.setName(entity.getName());
        userModel.setAccess_type(entity.getAccess_type());
        userModel.setImage(entity.getImage());

        UserModel admin = userDao.readyById(entity.getUserId());

        boolean responseExist = ifExistsCpf(userModel);
        System.out.println("cheguei aqui" + responseExist);
        if (responseExist) {
            System.out.println("nao consegui criar o usuario");
            return 0;
        }

        int groupId = userDao.getAdminUserGroup(admin.getId());


      if(entity.getAccess_type().equals("ADMINSTRADOR")){
          int admCreated = userDao.numAdmin(entity.getUserId());
          if (admCreated > 1 || !Objects.equals(admin.getAccess_type(), "ADMINSTRADOR")) {
              System.out.println("quantidade de adm maior que o suportado");
              return 0;
          }
      }

        int id = userDao.add(userModel);
        if(entity.getAccess_type().equals("MASTER")){
            groupId = userDao.createUserGroup(entity.getUserId());
        }
        userDao.insertUserUserGroup(id, groupId, entity.getUserId());
        System.out.println("Criacao de uma nova pessoa feita com sucesso");
        return id;
    }

    @Override
    public List<UserModel> findAllByUserId(int userId) {

        UserModel userModel = userDao.readyById(userId);
        if (userModel.getAccess_type().equals("MASTER")) {
            return findAll();
        }

        return userDao.findAllByUserId(userId);
    }

    @Override
    public UserModel findByEmail(String email) {
        if (email.isEmpty()) {
            return null;
        }
        return  userDao.readByEmail(email);
    }
}
