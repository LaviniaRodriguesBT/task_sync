package br.com.tasksync.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class SchedulingModel {
    private int id;
    private int event_id;
    private int user_id;
    private int task_id;
    private String event;
    private double value;
    private java.time.LocalDate start_time;
    private java.time.LocalDate end_time;
    private java.time.LocalDate date;
    private String status;
}
