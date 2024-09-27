package br.com.tasksync.backend.main.service.scheduling;

import br.com.tasksync.backend.main.domain.ActivityModel;
import br.com.tasksync.backend.main.domain.ContractModel;
import br.com.tasksync.backend.main.domain.SchedulingModel;
import br.com.tasksync.backend.main.dto.CreateSchedulingDto;
import br.com.tasksync.backend.main.dto.ResponseSchedulingDto;
import br.com.tasksync.backend.main.port.dao.activity.ActivityDao;
import br.com.tasksync.backend.main.port.dao.contract.ContractDao;
import br.com.tasksync.backend.main.port.dao.event.EventDao;
import br.com.tasksync.backend.main.port.dao.scheduling.SchedulingDao;
import br.com.tasksync.backend.main.port.dao.task.TaskDao;
import br.com.tasksync.backend.main.port.dao.user.UserDao;
import br.com.tasksync.backend.main.port.service.scheduling.SchedulingService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class SchedulingServiceImplem implements SchedulingService {


    private final SchedulingDao schedulingDao;
    private final ContractDao contractDao;
    private final ActivityDao activityDao;
    private final EventDao eventDao;
    private final UserDao userDao;
    private final TaskDao getTaskDao;

    public SchedulingServiceImplem(SchedulingDao schedulingDao, ContractDao contractDao, ActivityDao activityDao, EventDao eventDao, UserDao userDao, TaskDao getTaskDao) {
        this.schedulingDao = schedulingDao;
        this.contractDao = contractDao;
        this.activityDao = activityDao;
        this.eventDao = eventDao;
        this.userDao = userDao;
        this.getTaskDao = getTaskDao;
    }

    @Override
    public int create(SchedulingModel entity) {
        if (entity == null) {
            return 0;
        }
        if (

                entity.getStatus().isEmpty()) {
            return 0;
        }

        return 0;
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


    @Override
    public int create(CreateSchedulingDto entity) {
        if (entity == null) {
            return 0;
        }
        if (entity.getEvent_id() <= 0 ||
                entity.getUser_id() <= 0 ||
                entity.getTask_id() <= 0 ||

               entity.getValue() <= 0 ||
                entity.getStatus().isEmpty()) {
            return 0;
        }

        int activityId = activityDao.add(new ActivityModel(entity.getValue(), entity.getTask_id(), entity.getEvent_id()));

        int cotractId = contractDao.add(new ContractModel(LocalDate.now() , entity.getUser_id(), entity.getEvent_id()));

        SchedulingModel schedulingModel = new SchedulingModel();

        schedulingModel.setStart_time(entity.getStart_time());
        schedulingModel.setEnd_time(entity.getEnd_time());

        schedulingModel.setDate(entity.getDate());
        schedulingModel.setStatus(entity.getStatus());



        schedulingModel.setContract_id(cotractId);
        schedulingModel.setActivity_id(activityId);
        int id = schedulingDao.add(schedulingModel);
        System.out.println("Criacao de um novo cronograma feito com sucesso");
        return id;

    }

    @Override
    public List<ResponseSchedulingDto> findAllScheduling() {
        List<ResponseSchedulingDto> responseSchedulingDtos = new ArrayList<>();


        List<SchedulingModel> scheduling = schedulingDao.readAll();
        for (SchedulingModel item : scheduling){
            ContractModel contractModel = contractDao.readyById(item.getContract_id());
            ActivityModel activityModel = activityDao.readyById(item.getActivity_id());
            boolean add = responseSchedulingDtos.add(new ResponseSchedulingDto(
                    eventDao.readyById(contractModel.getEvent_id()),
                    userDao.readyById(contractModel.getUser_id()),
                    activityDao.readyById(activityModel.getTask_id()).getTask(),
                    activityModel.getValue(),
                    item.getStart_time(),
                    item.getEnd_time(),
                    item.getDate(),
                    item.getStatus()));
        }
        System.out.println("Chamando todos os cronogramas na tela");
        return responseSchedulingDtos;

    }
}