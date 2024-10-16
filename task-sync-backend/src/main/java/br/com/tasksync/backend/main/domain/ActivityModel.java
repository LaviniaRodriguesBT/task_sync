package br.com.tasksync.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityModel {
    private int id;
    private double value;
    private int task_id;
    private int event_id;

    public ActivityModel(double value, int task_id, int event_id) {
        this.value = value;
        this.task_id = task_id;
        this.event_id = event_id;
    }
}
