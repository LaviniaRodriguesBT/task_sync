package br.com.tasksync.backend.main.port.service.task;

import br.com.tasksync.backend.main.domain.TaskModel;
import br.com.tasksync.backend.main.port.service.crud.CrudService;

//Classe de serviço responsavel por chamar todos os CRUDs
public interface TaskService extends CrudService<TaskModel> {
}
