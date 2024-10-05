package br.com.tasksync.backend.main.dao.h2;


import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;
import br.com.tasksync.backend.main.port.dao.user.UserDao;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Classe responsavel por realizar a conexao entre o banco de dados
// Responsavel por salvar, editar, excluir, ler informações que estão salvas no banco
public class UserH2DaoImplem implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    public UserH2DaoImplem(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;

        System.out.println("Ganhei uma instancia do UserH2Dao");
    }

    @Override
    public int add(UserModel entity) {
        final SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(jdbcTemplate).withTableName("user_model").usingGeneratedKeyColumns("id");
        final Map<String, Object> parameters = new HashMap<>();
        parameters.put("userId: ", entity.getId());
        parameters.put("name: ", entity.getName());
        parameters.put("email: ", entity.getEmail());
        parameters.put("password: ", entity.getPassword());
        parameters.put("cpf: ", entity.getCpf());
        parameters.put("phone: ", entity.getPhone());
        parameters.put("address: ", entity.getAddress());
        parameters.put("access_type: ", entity.getAccess_type());


        final Number id = simpleJdbcInsert.executeAndReturnKey(parameters);
        return id.intValue();
    }

    @Override
    public void remove(int id) {
        final String sql = "DELETE FROM user WHERE id = " + id;
        jdbcTemplate.execute(sql);

    }

    @Override
    public UserModel readyById(int id) {
//        final UserModel entity = jdbcTemplate.queryForObject("SELECT * FROM user WHERE id = ", new Object[]{id}, (rs, rowNum) ->
//                new UserModel(
//                        rs.getInt("id"),
//                        rs.getString("name"),
//                        rs.getString("email"),
//                        rs.getString("password"),
//                        rs.getString("cpf"),
//                        rs.getString("phone"),
//                        rs.getString("address"),
//                        rs.getString("access_type")
//
//                ));
//        return entity;
        return null;

    }


    @Override
    public List<UserModel> readAll() {
//        final List<UserModel> entities = jdbcTemplate.query("SELECT * FROM user_model", new Object[]{}, (rs, rowNum) ->
//                new UserModel(
//                        rs.getInt("id"),
//                        rs.getString("name"),
//                        rs.getString("email"),
//                        rs.getString("password"),
//                        rs.getString("cpf"),
//                        rs.getString("phone"),
//                        rs.getString("address"),
//                        rs.getString("access_type")
//
//                ));
////
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
}
