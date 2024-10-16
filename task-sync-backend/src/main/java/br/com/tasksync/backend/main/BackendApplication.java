package br.com.tasksync.backend.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class BackendApplication {

    public static void main(String[] args) {
        System.out.println("Chamando a aplicacao do backend");
        SpringApplication.run(BackendApplication.class, args);
    }
}
