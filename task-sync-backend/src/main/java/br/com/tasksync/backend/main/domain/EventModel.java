package br.com.tasksync.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventModel {
    private int id;
    private String code;
    private String name;
    private String description;
    private String business;
    private LocalDate date;
    private LocalTime start_time;
    private LocalTime end_time;
    private String image;
    private int admin_id;
}
