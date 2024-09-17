package br.com.tasksync.backend.main.configuration;

import br.com.tasksync.backend.main.dao.h2.UserH2DaoImplem;
import br.com.tasksync.backend.main.port.dao.user.UserDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;

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


}
