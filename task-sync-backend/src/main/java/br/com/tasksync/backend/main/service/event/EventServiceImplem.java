package br.com.tasksync.backend.main.service.event;

import br.com.tasksync.backend.main.domain.EventModel;
import br.com.tasksync.backend.main.port.dao.event.EventDao;
import br.com.tasksync.backend.main.port.service.event.EventService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class EventServiceImplem implements EventService {


    private final EventDao eventDao;

    public EventServiceImplem(EventDao eventDao) {
        this.eventDao = eventDao;
    }


    @Override
    public int create(EventModel entity) {
        if(entity == null){
            return 0;
        }
        if(entity.getId() <= 0 ||
                entity.getName().isEmpty() ||
                entity.getCode().isEmpty() ||
                entity.getDescription().isEmpty() ||
                entity.getBusiness().isEmpty()
//                entity.getDate().isEmpty()
        ){
            return 0;
        }

        int id = eventDao.add(entity);
        System.out.println("Criacao de um novo evento feito com sucesso");
        return id;
    }

    @Override
    public void delete(int id) {
        if(id < 0){
            return;
        }
        System.out.println("Chamou o remover um evento por id");
        eventDao.remove(id);

    }

    @Override
    public EventModel findById(int id) {
        if(id < 0){
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
        if(eventModel == null){
            return;
        }
        eventDao.updateInformation(id, entity);

    }
}
