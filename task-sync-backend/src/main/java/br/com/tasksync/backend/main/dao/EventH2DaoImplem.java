package br.com.tasksync.backend.main.dao;

import br.com.tasksync.backend.main.domain.EventModel;

import java.util.HashMap;
import java.util.Map;

public class EventH2DaoImplem {

    private final JdbcTemplate jdbcTemplate;

    public EventH2DaoImplem(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;

        System.out.println("Ganhei uma instancia do EventH2Dao");
    }

    @Override
    public int add(EventModel entity) {
        final SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(jdbcTemplate).withTableName("event_model").usingGeneratedKeyColumns("id");
        final Map<String, Object> parameters = new HashMap<>();
        parameters.put("code: ", entity.getCode());
        parameters.put("name: ", entity.getName());
        parameters.put("description: ", entity.getDescription());
        parameters.put("business: ", entity.getBusiness());


        final Number id = simpleJdbcInsert.executeAndReturnKey(parameters);
        return id.intValue();
    }

    @Override
    public void remove(int id) {
        final String sql = "DELETE FROM event_model WHERE id = "+ id;
        jdbcTemplate.execute(sql);

    }

    @Override
    public EventModel readyById(int id) {
        final EventModel entity = jdbcTemplate.queryForObject("SELECT * FROM event_model WHERE id = ", new Object[]{id},(rs,rowNum) ->
                new EventModel(
                        rs.getInt("id"),
                        rs.getString("code"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getString("business")

                ));
        return entity;
    }

    @Override
    public List<EventModel> readAll() {
        final List<EventModel> entities = jdbcTemplate.query("SELECT * FROM event_model", new Object[]{},(rs,rowNum) ->
                new EventModel(
                        rs.getInt("id"),
                        rs.getString("code"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getString("business")

                ));

        return entities;
    }

}
