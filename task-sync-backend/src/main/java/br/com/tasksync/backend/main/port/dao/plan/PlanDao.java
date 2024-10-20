package br.com.tasksync.backend.main.port.dao.plan;

import br.com.tasksync.backend.main.domain.PlanModel;
import br.com.tasksync.backend.main.port.dao.crud.CrudDao;
import org.springframework.context.annotation.Bean;

public interface PlanDao extends CrudDao<PlanModel> {
}
