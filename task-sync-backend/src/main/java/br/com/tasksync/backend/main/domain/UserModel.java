package br.com.tasksync.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {
    private int id;
    private int userId;
    private String name;
    private String email;
    private String password;
    private String cpf;
    private String phone;
    private String address;
    private String access_type;
    private String image;
    private UserRole role;

    public enum UserRole{
        ADMINISTRADOR,
        COLABORADOR,
        MASTER
    }

}
