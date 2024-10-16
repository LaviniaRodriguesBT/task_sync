package br.com.tasksync.backend.main.port.service.scheduling;

import br.com.tasksync.backend.main.domain.SchedulingModel;
import br.com.tasksync.backend.main.dto.CreateSchedulingDto;
import br.com.tasksync.backend.main.dto.ResponseSchedulingDto;
import br.com.tasksync.backend.main.port.service.crud.CrudService;

import java.util.List;

public interface SchedulingService extends CrudService<SchedulingModel> {
    int create(final CreateSchedulingDto entity);

    List<ResponseSchedulingDto> findAllScheduling();

    List<ResponseSchedulingDto> findAllSchedulingByEventId(final int id);

    ResponseSchedulingDto findByIdSchedulingUser(final int id);

    void updateScheduling(final int id, final CreateSchedulingDto entity);

    boolean ifExistScheduling(CreateSchedulingDto data);
}
