package br.com.tasksync.backend.main.service.event;

import br.com.tasksync.backend.main.domain.EventModel;
import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.port.dao.event.EventDao;
import br.com.tasksync.backend.main.port.dao.user.UserDao;
import br.com.tasksync.backend.main.port.service.event.EventService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImplem implements EventService {


    private final EventDao eventDao;
    private final UserDao userDao;

    public EventServiceImplem(EventDao eventDao, UserDao userDao) {
        this.eventDao = eventDao;
        this.userDao = userDao;
    }

    @Override
    public int create(EventModel entity) {
        if (entity == null) {
            return 0;
        }
        if (entity.getName().isEmpty() || entity.getCode().isEmpty() || entity.getDescription().isEmpty() || entity.getBusiness().isEmpty()
        ) {
            return 0;
        }
        int id = eventDao.add(entity);
        System.out.println("Criacao de um novo evento feito com sucesso");
        return id;
    }

    @Override
    public void delete(int id) {
        if (id < 0) {
            return;
        }
        System.out.println("Chamou o remover um evento por id");
        eventDao.remove(id);
    }

    @Override
    public EventModel findById(int id) {
        if (id < 0) {
            return null;
        }
        EventModel event = eventDao.readyById(id);
        System.out.println("Chamando o evento por id");
        return event;
    }

    @Override
    public List<EventModel> findAll() {
        List<EventModel> event = eventDao.readAll();
        System.out.println("Chamando todas os eventos na tela");
        return event;
    }

    @Override
    public void update(int id, EventModel entity) {
        EventModel eventModel = findById(id);
        if (eventModel == null) {
            return;
        }
        eventDao.updateInformation(id, entity);
    }

    @Override
    public List<EventModel> getEntitiesByUserId(int id) {
        UserModel userModel = userDao.readyById(id);
        if (userModel == null) {
            return findAll();
        }
        if (userModel.getAccess_type().equals("Administrador")) {
            return findAll();
        }
        return eventDao.getEntitiesByUserId(userModel.getId());

    }
}
