package br.com.tasksync.backend.main.port.service.event;

import br.com.tasksync.backend.main.domain.EventModel;
import br.com.tasksync.backend.main.port.service.crud.CrudService;

import java.util.List;

public interface EventService extends CrudService<EventModel> {
    List<EventModel> getEntitiesByUserId(final int id);
}
