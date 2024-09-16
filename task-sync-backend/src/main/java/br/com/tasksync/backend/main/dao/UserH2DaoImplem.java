package br.com.tasksync.backend.main.dao;


import br.com.tasksync.backend.main.domain.TaskModel;
import br.com.tasksync.backend.main.domain.UserModel;

import java.util.HashMap;
import java.util.Map;
// Classe responsavel por realizar a conexao entre o banco de dados
// Responsavel por salvar, editar, excluir, ler informações que estão salvas no banco
public class UserH2DaoImplem {

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




        final Number id = simpleJdbcInsert.executeAndReturnKey(parameters);
        return id.intValue();
    }

    @Override
    public void remove(int id) {
        final String sql = "DELETE FROM user_model WHERE id = "+ id;
        jdbcTemplate.execute(sql);

    }

    @Override
    public UserModel readyById(int id) {
        final UserModel entity = jdbcTemplate.queryForObject("SELECT * FROM user_model WHERE id = ", new Object[]{id},(rs,rowNum) ->
                new UserModel(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("cpf"),
                        rs.getString("phone"),
                        rs.getString("address")

                ));
        return entity;
    }

    @Override
    public List<UserModel> readAll() {
        final List<UserModel> entities = jdbcTemplate.query("SELECT * FROM user_model", new Object[]{},(rs,rowNum) ->
                new UserModel(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("cpf"),
                        rs.getString("phone"),
                        rs.getString("address")


                ));

        return entities;
    }
}
