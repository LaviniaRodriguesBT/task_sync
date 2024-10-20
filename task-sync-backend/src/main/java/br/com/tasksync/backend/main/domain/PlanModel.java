package br.com.tasksync.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanModel {
    private int id;
    private String name_plan;
    private double price;
    private LocalDate start_time_plan;
    private LocalDate end_time_plan;
    private int num_adm;
    private int num_colab;


    public PlanModel(double value, String planName, double price, LocalDate startTime, LocalDate endTime, int numAdm, int numColab) {
        this.name_plan = planName;
        this.price = price;
        this.start_time_plan = startTime;
        this.end_time_plan = endTime;
        this.num_adm = numAdm;
        this.num_colab = numColab;
    }
}
