package br.com.tasksync.backend.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

//Classe responsavel pela estrutura básica e inicio de todo o processo de execução da aplicação
public class BackendApplication {

    public static void main(String[] args) {
        System.out.println("Chamando a aplicacao do backend");
        SpringApplication.run(BackendApplication.class, args);
    }
}
