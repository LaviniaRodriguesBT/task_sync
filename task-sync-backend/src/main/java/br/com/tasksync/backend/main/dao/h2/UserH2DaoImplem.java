package br.com.tasksync.backend.main.dao.h2;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;
import br.com.tasksync.backend.main.port.dao.user.UserDao;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class UserH2DaoImplem implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    public UserH2DaoImplem(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        System.out.println("Ganhei uma instancia do UserH2Dao");
    }

    @Override
    public int add(UserModel entity) {
        return 0;
    }

    @Override
    public void remove(int id) {
        final String sql = "DELETE FROM user WHERE id = " + id;
        jdbcTemplate.execute(sql);
    }

    @Override
    public UserModel readyById(int id) {
        return null;
    }


    @Override
    public List<UserModel> readAll() {
        return null;
    }

    @Override
    public void updateInformation(int id, UserModel entity) {

    }

    @Override
    public UserModel readByEmail(String email) {
        return null;
    }

    @Override
    public boolean updatePassword(int id, String newPassword) {
        return false;
    }

    @Override
    public UserModel authenticate(AuthenticationDto authenticationDto) {
        return null;
    }

    @Override
    public boolean existsCpf(String cpf) {
        return false;
    }

    @Override
    public boolean existsEmail(String email) {
        return false;
    }
}
