package br.com.tasksync.backend.main.service.task;

import br.com.tasksync.backend.main.domain.TaskModel;
import br.com.tasksync.backend.main.port.dao.task.TaskDao;
import br.com.tasksync.backend.main.port.service.task.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImplem implements TaskService {

    private final TaskDao taskDao;

    public TaskServiceImplem(TaskDao taskDao) {
        this.taskDao = taskDao;
    }


    @Override
    public int create(TaskModel entity) {
        if (entity == null) {
            return 0;
        }
        if (entity.getName().isEmpty()) {
            return 0;
        }

        int id = taskDao.add(entity);
        System.out.println("Criacao de uma nova atividade feita com sucesso");
        return id;
    }

    @Override
    public void delete(int id) {
        if (id < 0) {
            return;
        }
        System.out.println("Chamou o remover atividade por id");
        taskDao.remove(id);

    }

    @Override
    public TaskModel findById(int id) {
        if (id < 0) {
            return null;
        }
        TaskModel task = taskDao.readyById(id);
        System.out.println("Chamando a atividade por id");
        return task;
    }

    @Override
    public List<TaskModel> findAll() {
        List<TaskModel> task = taskDao.readAll();
        System.out.println("Chamando todos as atividade na tela");
        return task;
    }

    @Override
    public void update(int id, TaskModel entity) {
        TaskModel taskModel = findById(id);
        if (taskModel == null) {
            return;
        }
        taskDao.updateInformation(id, entity);

    }
}