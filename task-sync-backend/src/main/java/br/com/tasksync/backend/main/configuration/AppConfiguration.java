package br.com.tasksync.backend.main.configuration;


import br.com.tasksync.backend.main.dao.postgres.*;
import br.com.tasksync.backend.main.port.dao.activity.ActivityDao;
import br.com.tasksync.backend.main.port.dao.contract.ContractDao;
import br.com.tasksync.backend.main.port.dao.event.EventDao;
import br.com.tasksync.backend.main.port.dao.plan.PlanDao;
import br.com.tasksync.backend.main.port.dao.scheduling.SchedulingDao;
import br.com.tasksync.backend.main.port.dao.task.TaskDao;
import br.com.tasksync.backend.main.port.dao.user.UserDao;
import br.com.tasksync.backend.main.port.service.authentication.AuthenticationService;
import br.com.tasksync.backend.main.port.service.user.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.sql.Connection;

@Configuration
public class AppConfiguration {


    @Bean
    @Profile("{prod, sec}")
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

    @Bean
    @Profile("prod")
    public ContractDao getContractDao(final Connection connection) {
        return new ContractPostgresDaoImplem(connection);
    }

    @Bean
    @Profile("prod")
    public ActivityDao getActivityDao(final Connection connection) {
        return new ActivityPostgresDaoImplem(connection);
    }

    @Bean
    @Profile("prod")
        public PlanDao getPlanDao(final Connection connection){
        return new PlanPostgresDaoImplem(connection);
    }


    @Bean
    @Profile("sec")
    public AuthenticationService JwtAuthenticationService(final UserService userService) {
        return new BasicAuthenticationServiceImpl(userService, passwordEncoder());
    }

    @Bean
    @Profile("sec")
    public JwtService jwtService() {
        return new JwtServiceImpl();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
