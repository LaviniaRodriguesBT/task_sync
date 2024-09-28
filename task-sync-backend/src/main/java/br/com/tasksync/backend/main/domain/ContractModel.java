package br.com.tasksync.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContractModel {
    private int id;
    //private int number;
    private LocalDate signature_date;
    private int user_id;
    private int event_id;


    public ContractModel(LocalDate signature_date, int user_id, int event_id) {
        this.signature_date = signature_date;
        this.user_id = user_id;
        this.event_id = event_id;
    }
}
