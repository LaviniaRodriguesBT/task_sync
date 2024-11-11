package br.com.tasksync.backend.main.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupModel {
    private int id;
    private int adminId;
}
