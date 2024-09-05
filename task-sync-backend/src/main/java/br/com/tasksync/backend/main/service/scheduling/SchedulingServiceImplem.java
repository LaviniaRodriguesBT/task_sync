package br.com.tasksync.backend.main.service.scheduling;

import br.com.tasksync.backend.main.domain.SchedulingModel;
import br.com.tasksync.backend.main.port.dao.scheduling.SchedulingDao;
import br.com.tasksync.backend.main.port.service.scheduling.SchedulingService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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
        if(id < 0){
            return;
        }
        System.out.println("Chamou o remover o cronograma id");
        schedulingDao.remove(id);

    }

    @Override
    public SchedulingModel findById(int id) {
        if(id < 0){
            return null;
        }
        SchedulingModel scheduling = schedulingDao.readyById(id);
        System.out.println("Chamando o cronograma por id");
        return scheduling;
    }

    @Override
    public List<SchedulingModel> findAll() {
        List<SchedulingModel> scheduling = schedulingDao.readAll();
        System.out.println("Chamando todos os cronogramas na tela");
        return scheduling;
    }

    @Override
    public void update(int id, SchedulingModel entity) {

        SchedulingModel schedulingModel = findById(id);
        if(schedulingModel == null){
            return;
        }
        schedulingDao.updateInformation(id, entity);

    }


}