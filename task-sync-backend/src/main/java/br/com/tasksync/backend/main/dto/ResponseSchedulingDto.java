package br.com.tasksync.backend.main.dto;

import br.com.tasksync.backend.main.domain.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseSchedulingDto {
    private EventModel event;
    private UserModel user;
    private TaskModel task;
    private double value;
    private LocalTime start_time;
    private LocalTime end_time;
    private LocalDate date;
    private String status;


    public ResponseSchedulingDto(EventModel eventModel, UserModel userModel, ActivityModel activityModel, LocalTime startTime, LocalTime endTime, LocalDate date, String status) {
    }
}
