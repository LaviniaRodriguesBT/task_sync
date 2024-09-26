package br.com.tasksync.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class SchedulingModel {
    private int id;
    private int contract_id;
    private int activity_id;
     private LocalTime start_time;
    private LocalTime end_time;
    private LocalDate date;
    private String status;

}
