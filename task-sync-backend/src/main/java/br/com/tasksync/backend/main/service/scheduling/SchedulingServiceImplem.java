package br.com.tasksync.backend.main.service.scheduling;

import br.com.tasksync.backend.main.domain.ActivityModel;
import br.com.tasksync.backend.main.domain.ContractModel;
import br.com.tasksync.backend.main.domain.SchedulingModel;
import br.com.tasksync.backend.main.port.dao.activity.ActivityDao;
import br.com.tasksync.backend.main.port.dao.contract.ContractDao;
import br.com.tasksync.backend.main.port.dao.scheduling.SchedulingDao;
import br.com.tasksync.backend.main.port.service.scheduling.SchedulingService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class SchedulingServiceImplem implements SchedulingService {


    private final SchedulingDao schedulingDao;
    private final ContractDao contractDao;
    private final ActivityDao activityDao;

    public SchedulingServiceImplem(SchedulingDao schedulingDao, ContractDao contractDao, ActivityDao activityDao) {
        this.schedulingDao = schedulingDao;
        this.contractDao = contractDao;
        this.activityDao = activityDao;
    }

    @Override
    public int create(SchedulingModel entity) {
        if (entity == null) {
            return 0;
        }
        if (entity.getEvent_id() <= 0 ||
                entity.getUser_id() <= 0 ||
                entity.getTask_id() <= 0 ||

                entity.getEvent().isEmpty() ||
                entity.getValue() <= 0 ||
                entity.getStatus().isEmpty()) {
            return 0;
        }
        int activityId = activityDao.add(new ActivityModel(entity.getValue(), entity.getTask_id(), entity.getEvent_id()));
        int cotractId = contractDao.add(new ContractModel(LocalDate.now() , entity.getUser_id(), entity.getEvent_id()));
        entity.setContract_id(cotractId);
        entity.setActivity_id(activityId);
        int id = schedulingDao.add(entity);
        System.out.println("Criacao de um novo cronograma feito com sucesso");
        return id;
    }

    @Override
    public void delete(int id) {
        if (id < 0) {
            return;
        }
        System.out.println("Chamou o remover o cronograma id");
        schedulingDao.remove(id);

    }

    @Override
    public SchedulingModel findById(int id) {
        if (id < 0) {
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
        if (schedulingModel == null) {
            return;
        }
        schedulingDao.updateInformation(id, entity);

    }


}