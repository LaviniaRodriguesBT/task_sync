package br.com.tasksync.backend.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanDto {
    int id;
    String name_plan;
    double price;
    LocalDate start_time_plan;
    LocalDate end_time_plan;
    int num_adm;
    int num_colab;
}
