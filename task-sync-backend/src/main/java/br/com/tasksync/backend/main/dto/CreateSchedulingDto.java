package br.com.tasksync.backend.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateSchedulingDto {
    private int event_id;
    private int user_id;
    private int task_id;
    private LocalTime start_time;
    private LocalTime end_time;
    private LocalDate date;
    private String status;
    private double value;

}
