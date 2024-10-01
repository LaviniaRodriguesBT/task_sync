package br.com.tasksync.backend.main.port.dao.scheduling;

import br.com.tasksync.backend.main.domain.SchedulingModel;
import br.com.tasksync.backend.main.port.dao.crud.CrudDao;

import java.util.List;

public interface SchedulingDao extends CrudDao<SchedulingModel> {
    List<SchedulingModel> readByEventId(final int id);

}
