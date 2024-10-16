package br.com.tasksync.backend.main.port.dao.scheduling;

import br.com.tasksync.backend.main.domain.SchedulingModel;
import br.com.tasksync.backend.main.port.dao.crud.CrudDao;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface SchedulingDao extends CrudDao<SchedulingModel> {
    List<SchedulingModel> readByEventId(final int id);

    boolean existsByEventIdAndUserIdAndTaskIdAndStartTimeAndEndTime(final int userId, final LocalTime startTime, final LocalTime endTime, final LocalDate date);

}
