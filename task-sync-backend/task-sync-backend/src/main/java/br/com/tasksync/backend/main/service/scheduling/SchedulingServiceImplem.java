package br.com.tasksync.backend.main.service.scheduling;

import br.com.tasksync.backend.main.domain.SchedulingModel;
import br.com.tasksync.backend.main.port.dao.scheduling.SchedulingDao;
import br.com.tasksync.backend.main.port.service.scheduling.SchedulingService;

import java.util.List;

public class SchedulingServiceImplem implements SchedulingService {


    private final SchedulingDao schedulingDao;

    public SchedulingServiceImplem(SchedulingDao schedulingDao) {
        this.schedulingDao = schedulingDao;
    }

    @Override
    public int create(SchedulingModel entity) {
        if(entity == null){
            return 0;
        }
        if(entity.getEvent_id() <= 0 ||
                entity.getUser_id() <= 0 ||
                entity.getTask_id() <= 0 ||
                entity.getEvent().isEmpty() ||
                entity.getValue() <= 0 ||
                entity.getEnd_time().isBefore(entity.getStart_time()) ||
                entity.getStatus().isEmpty()){
            return 0;
        }

        int id = schedulingDao.add(entity);
        System.out.println("Criacao de um novo cronograma feito com sucesso");
        return id;
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public SchedulingModel findById(int id) {
        return null;
    }

    @Override
    public List<SchedulingModel> findAll() {
        return null;
    }

    @Override
    public void update(int id, SchedulingModel entity) {

    }
}
