package br.com.tasksync.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchedulingModel {
    private int id;
    private int event_id;
    private int user_id;
    private int task_id;
    private String event;
    private double value;
    private LocalTime start_time;
    private LocalTime end_time;
    private java.time.LocalDate date;
    private String status;
}
