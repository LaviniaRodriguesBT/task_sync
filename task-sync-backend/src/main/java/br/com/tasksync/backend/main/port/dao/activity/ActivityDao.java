package br.com.tasksync.backend.main.port.dao.activity;

import br.com.tasksync.backend.main.domain.ActivityModel;
import br.com.tasksync.backend.main.domain.ContractModel;
import br.com.tasksync.backend.main.domain.TaskModel;
import br.com.tasksync.backend.main.port.dao.crud.CrudDao;
import org.springframework.scheduling.config.Task;

public interface ActivityDao extends CrudDao<ActivityModel> {}
