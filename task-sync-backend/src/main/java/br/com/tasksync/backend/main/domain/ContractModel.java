package br.com.tasksync.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContractModel {
    private int id;
    private int user_id;
    private int event_id;

    public ContractModel(int user_id, int event_id) {
        this.user_id = user_id;
        this.event_id = event_id;
    }
}
