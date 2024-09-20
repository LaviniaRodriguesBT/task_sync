package br.com.tasksync.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventModel {
    private int id;
    private String code;
    private String name;
    private String description;
    private String business;
    private java.time.LocalDate date;
    private Time start_time;
    private Time end_time;
}
