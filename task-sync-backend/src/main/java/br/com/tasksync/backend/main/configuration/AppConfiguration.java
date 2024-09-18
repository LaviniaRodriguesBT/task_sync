package br.com.tasksync.backend.main.configuration;

import br.com.tasksync.backend.main.dao.h2.UserH2DaoImplem;
import br.com.tasksync.backend.main.dao.postgres.EventPostgresDaoImplem;
import br.com.tasksync.backend.main.dao.postgres.SchedulingPostgresDaoImplem;
import br.com.tasksync.backend.main.dao.postgres.TaskPostgresDaoImplem;
import br.com.tasksync.backend.main.dao.postgres.UserPostgresDaoImplem;
import br.com.tasksync.backend.main.port.dao.event.EventDao;
import br.com.tasksync.backend.main.port.dao.scheduling.SchedulingDao;
import br.com.tasksync.backend.main.port.dao.task.TaskDao;
import br.com.tasksync.backend.main.port.dao.user.UserDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Connection;

// Usar os perfis (dev/prod/fake) de acordo com a omplementacao correta
@Configuration
public class AppConfiguration {


    @Bean
    @Profile("dev")
    public UserDao getH2Dao(final JdbcTemplate jdbcTemplate) {
        return new UserH2DaoImplem(jdbcTemplate);
    }

    @Bean
    @Profile("prod")
    public UserDao getUserDao(final Connection connection) {
        return new UserPostgresDaoImplem(connection);
    }

    @Bean
    @Profile("prod")
    public EventDao getEventDao(final Connection connection) {
        return new EventPostgresDaoImplem(connection);
    }

    @Bean
    @Profile("prod")
    public TaskDao getTaskDao(final Connection connection) {
        return new TaskPostgresDaoImplem(connection);
    }

    @Bean
    @Profile("prod")
    public SchedulingDao getSchedulingDao(final Connection connection) {
        return new SchedulingPostgresDaoImplem(connection);
    }
}
