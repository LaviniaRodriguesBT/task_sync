package br.com.tasksync.backend.main.configuration;

import br.com.tasksync.backend.main.port.dao.user.UserDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

// Usar os perfis (dev/prod/fake) de acordo com a omplementacao correta
public class AppConfiguration {
    @Bean
    @Profile("fake")
    public UserDao getUserFakeDao() {
        return new UserFakeDaoImpl();
    }

    @Bean
    @Profile("dev")
    public UserDao getH2Dao(final JdbcTemplate jdbcTemplate) {
        return new UserH2DaoImpl(jdbcTemplate);
    }

    @Bean
    @Profile("prod")
    public UserDao getUserDao(final Connection connection) {
        return new UserPostgresDaoImpl(connection);
    }


}
