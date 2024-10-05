package br.com.tasksync.backend.main.port.service.user;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;
import br.com.tasksync.backend.main.port.service.crud.CrudService;

//Classe de serviço responsavel por chamar todos os CRUDs
public interface UserService extends CrudService<UserModel> {
    UserModel authenticate (final AuthenticationDto authenticationDto);
}
