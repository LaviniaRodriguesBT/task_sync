package br.com.tasksync.backend.main.dao.h2;

import br.com.tasksync.backend.main.domain.TaskModel;
import br.com.tasksync.backend.main.port.dao.task.TaskDao;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Classe responsavel por realizar a conexao entre o banco de dados
// Responsavel por salvar, editar, excluir, ler informações que estão salvas no banco
public class TaskH2DaoImplem implements TaskDao {

    private final JdbcTemplate jdbcTemplate;

    public TaskH2DaoImplem(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;

        System.out.println("Ganhei uma instancia do TaskH2Dao");
    }

    @Override
    public int add(TaskModel entity) {
        final SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(jdbcTemplate).withTableName("task").usingGeneratedKeyColumns("id");
        final Map<String, Object> parameters = new HashMap<>();
        parameters.put("name: ", entity.getName());


        final Number id = simpleJdbcInsert.executeAndReturnKey(parameters);
        return id.intValue();
    }

    @Override
    public void remove(int id) {
        final String sql = "DELETE FROM task WHERE id = " + id;
        jdbcTemplate.execute(sql);

    }

    @Override
    public TaskModel readyById(int id) {
        final TaskModel entity = jdbcTemplate.queryForObject("SELECT * FROM task WHERE id = ", new Object[]{id}, (rs, rowNum) ->
                new TaskModel(
                        rs.getInt("id"),
                        rs.getString("name")

                ));
        return entity;
    }

    @Override
    public List<TaskModel> readAll() {
        final List<TaskModel> entities = jdbcTemplate.query("SELECT * FROM task", new Object[]{}, (rs, rowNum) ->
                new TaskModel(
                        rs.getInt("id"),
                        rs.getString("name")

                ));

        return entities;
    }

    @Override
    public void updateInformation(int id, TaskModel entity) {

    }
}
