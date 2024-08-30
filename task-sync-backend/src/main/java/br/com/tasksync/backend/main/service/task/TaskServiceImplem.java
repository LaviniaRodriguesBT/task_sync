package br.com.tasksync.backend.main.service.task;

import br.com.tasksync.backend.main.domain.TaskModel;
import br.com.tasksync.backend.main.port.service.task.TaskService;

import java.util.List;

public class TaskServiceImplem implements TaskService {
    @Override
    public int create(TaskModel entity) {
        return 0;
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public TaskModel findById(int id) {
        return null;
    }

    @Override
    public List<TaskModel> findAll() {
        return null;
    }

    @Override
    public void update(int id, TaskModel entity) {

    }
}
