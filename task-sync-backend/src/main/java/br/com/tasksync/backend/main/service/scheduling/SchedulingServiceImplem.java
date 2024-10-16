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

import java.util.ArrayList;
import java.util.List;

@Service
public class SchedulingServiceImplem implements SchedulingService {

    private final SchedulingDao schedulingDao;
    private final ContractDao contractDao;
    private final ActivityDao activityDao;
    private final EventDao eventDao;
    private final UserDao userDao;
    private final TaskDao taskDao;

    public SchedulingServiceImplem(SchedulingDao schedulingDao, ContractDao contractDao, ActivityDao activityDao, EventDao eventDao, UserDao userDao, TaskDao taskDao) {
        this.schedulingDao = schedulingDao;
        this.contractDao = contractDao;
        this.activityDao = activityDao;
        this.eventDao = eventDao;
        this.userDao = userDao;
        this.taskDao = taskDao;
    }

    @Override
    public int create(SchedulingModel entity) {
        if (entity == null) {
            return 0;
        }
        if (entity.getStatus().isEmpty()) {
            return 0;
        }
        return 0;
    }

    @Override
    public boolean ifExistScheduling(CreateSchedulingDto data) {
        return schedulingDao.existsByEventIdAndUserIdAndTaskIdAndStartTimeAndEndTime(
                data.getUser_id(),
                data.getStart_time(),
                data.getEnd_time(),
                data.getDate()
        );
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
        boolean responseExist = ifExistScheduling(entity);
        if (responseExist) {
            System.out.println("nao consegui criar o cronograma");
            return 0;
        }
        int activityId = activityDao.add(new ActivityModel(entity.getValue(), entity.getTask_id(), entity.getEvent_id()));
        int cotractId = contractDao.add(new ContractModel(entity.getUser_id(), entity.getEvent_id()));
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
        for (SchedulingModel item : scheduling) {
            ContractModel contractModel = contractDao.readyById(item.getContract_id());
            ActivityModel activityModel = activityDao.readyById(item.getActivity_id());
            responseSchedulingDtos.add(new ResponseSchedulingDto(
                    item.getId(),
                    eventDao.readyById(contractModel.getEvent_id()),
                    userDao.readyById(contractModel.getUser_id()),
                    taskDao.readyById(activityModel.getTask_id()),
                    activityModel.getValue(),
                    item.getStart_time(),
                    item.getEnd_time(),
                    item.getDate(),
                    item.getStatus()));
        }
        System.out.println("Chamando todos os cronogramas na tela");
        return responseSchedulingDtos;
    }

    @Override
    public List<ResponseSchedulingDto> findAllSchedulingByEventId(int id) {
        List<ResponseSchedulingDto> responseSchedulingDtos = new ArrayList<>();
        List<SchedulingModel> scheduling = schedulingDao.readByEventId(id);
        for (SchedulingModel item : scheduling) {
            ContractModel contractModel = contractDao.readyById(item.getContract_id());
            ActivityModel activityModel = activityDao.readyById(item.getActivity_id());
            responseSchedulingDtos.add(new ResponseSchedulingDto(
                    item.getId(),
                    eventDao.readyById(contractModel.getEvent_id()),
                    userDao.readyById(contractModel.getUser_id()),
                    taskDao.readyById(activityModel.getTask_id()),
                    activityModel.getValue(),
                    item.getStart_time(),
                    item.getEnd_time(),
                    item.getDate(),
                    item.getStatus()));
        }
        System.out.println("Chamando todos os cronogramas na tela");
        return responseSchedulingDtos;
    }

    @Override
    public ResponseSchedulingDto findByIdSchedulingUser(int id) {
        SchedulingModel scheduling = schedulingDao.readyById(id);
        ContractModel contractModel = contractDao.readyById(scheduling.getContract_id());
        ActivityModel activityModel = activityDao.readyById(scheduling.getActivity_id());
        return new ResponseSchedulingDto(
                scheduling.getId(),
                eventDao.readyById(contractModel.getEvent_id()),
                userDao.readyById(contractModel.getUser_id()),
                taskDao.readyById(activityModel.getTask_id()),
                activityModel.getValue(),
                scheduling.getStart_time(),
                scheduling.getEnd_time(),
                scheduling.getDate(),
                scheduling.getStatus());
    }

    @Override
    public void updateScheduling(int id, CreateSchedulingDto entity) {
        SchedulingModel schedulingModel = findById(id);
        if (schedulingModel == null) {
            return;
        }
        ActivityModel activityModel = activityDao.readyById(schedulingModel.getActivity_id());
        activityModel.setValue(entity.getValue());
        activityModel.setTask_id(entity.getTask_id());
        activityModel.setEvent_id(entity.getEvent_id());
        activityDao.updateInformation(schedulingModel.getActivity_id(), activityModel);
        ContractModel contractModel = contractDao.readyById(schedulingModel.getContract_id());
        contractModel.setUser_id(entity.getUser_id());
        contractModel.setEvent_id(entity.getEvent_id());
        contractDao.updateInformation(schedulingModel.getContract_id(), contractModel);
        schedulingModel.setStatus(entity.getStatus());
        schedulingModel.setStart_time(entity.getStart_time());
        schedulingModel.setEnd_time(entity.getEnd_time());
        schedulingModel.setDate(entity.getDate());
        schedulingDao.updateInformation(id, schedulingModel);
    }
}