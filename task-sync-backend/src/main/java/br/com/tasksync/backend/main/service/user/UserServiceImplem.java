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

        boolean responseExist = ifExistsCpf(entity);
        System.out.println("cheguei aqui" + responseExist);
        if (responseExist) {
            System.out.println("nao consegui criar o usuario");
            return 0;
        }

        int admCreated = userDao.numAdmin(9);
        if (admCreated > 1) {
            System.out.println("quantidade de adm maior que o suportado");
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
    public UserModel authenticate(AuthenticationDto authenticationDto) {
        if (authenticationDto.getPassword() == null) {
            return null;
        }
        if (authenticationDto.getPassword().isEmpty()) {
            return null;
        }
        return userDao.authenticate((authenticationDto));
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

        boolean responseExist = ifExistsCpf(userModel);
        System.out.println("cheguei aqui" + responseExist);
        if (responseExist) {
            System.out.println("nao consegui criar o usuario");
            return 0;
        }

      if(entity.getAccess_type().equals("Administrador")){
          int admCreated = userDao.numAdmin(entity.getUserId());
          UserModel adm = userDao.readyById(entity.getUserId());
          if (admCreated > 1 || !Objects.equals(adm.getAccess_type(), "Administrador")) {
              System.out.println("quantidade de adm maior que o suportado");
              return 0;
          }
      }

        int id = userDao.add(userModel);
        System.out.println("Criacao de uma nova pessoa feita com sucesso");
        return id;
    }
}
