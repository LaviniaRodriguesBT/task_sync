package br.com.tasksync.backend.main.service.event;

import br.com.tasksync.backend.main.domain.EventModel;
import br.com.tasksync.backend.main.port.service.event.EventService;

import java.util.List;

public class EventServiceImplem implements EventService {
    @Override
    public int create(EventModel entity) {
        return 0;
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public EventModel findById(int id) {
        return null;
    }

    @Override
    public List<EventModel> findAll() {
        return null;
    }

    @Override
    public void update(int id, EventModel entity) {

    }
}
