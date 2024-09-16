package br.com.tasksync.backend.main.dao;

import br.com.tasksync.backend.main.domain.EventModel;
import br.com.tasksync.backend.main.domain.TaskModel;

import java.util.HashMap;
import java.util.Map;

public class TaskH2DaoImplem {

    private final JdbcTemplate jdbcTemplate;

    public TaskH2DaoImplem(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;

        System.out.println("Ganhei uma instancia do TaskH2Dao");
    }

    @Override
    public int add(TaskModel entity) {
        final SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(jdbcTemplate).withTableName("task_model").usingGeneratedKeyColumns("id");
        final Map<String, Object> parameters = new HashMap<>();
        parameters.put("userId: ", entity.getUserId());
        parameters.put("name: ", entity.getName());


        final Number id = simpleJdbcInsert.executeAndReturnKey(parameters);
        return id.intValue();
    }

    @Override
    public void remove(int id) {
        final String sql = "DELETE FROM task_model WHERE id = "+ id;
        jdbcTemplate.execute(sql);

    }

    @Override
    public TaskModel readyById(int id) {
        final TaskModel entity = jdbcTemplate.queryForObject("SELECT * FROM task_model WHERE id = ", new Object[]{id},(rs,rowNum) ->
                new TaskModel(
                        rs.getInt("id"),
                        rs.getString("userId"),
                        rs.getString("name")

                ));
        return entity;
    }

    @Override
    public List<TaskModel> readAll() {
        final List<TaskModel> entities = jdbcTemplate.query("SELECT * FROM task_model", new Object[]{},(rs,rowNum) ->
                new TaskModel(
                        rs.getInt("id"),
                        rs.getString("userId"),
                        rs.getString("name")

                ));

        return entities;
    }

}
