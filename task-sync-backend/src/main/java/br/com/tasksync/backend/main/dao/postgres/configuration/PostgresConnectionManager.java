package br.com.tasksync.backend.main.dao.postgres.configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("prod")
public class PostgresConnectionManager {
}
