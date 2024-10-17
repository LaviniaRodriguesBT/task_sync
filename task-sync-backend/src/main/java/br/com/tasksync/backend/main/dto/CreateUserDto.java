package br.com.tasksync.backend.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDto {
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
}
