package br.com.tasksync.backend.main.port.dao.event;

import br.com.tasksync.backend.main.domain.EventModel;
import br.com.tasksync.backend.main.port.dao.crud.CrudDao;

import java.util.List;

public interface EventDao extends CrudDao<EventModel> {
    public List<EventModel> getEntitiesByUserId(final int id);
    List<EventModel> getEntitiByuserGroup(final int id);
}
