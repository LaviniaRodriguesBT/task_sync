package br.com.tasksync.backend.main.dao.h2;

import br.com.tasksync.backend.main.domain.EventModel;
import br.com.tasksync.backend.main.port.dao.event.EventDao;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Classe responsavel por realizar a conexao entre o banco de dados
// Responsavel por salvar, editar, excluir, ler informações que estão salvas no banco
public class EventH2DaoImplem implements EventDao {

    private final JdbcTemplate jdbcTemplate;

    public EventH2DaoImplem(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;

        System.out.println("Ganhei uma instancia do EventH2Dao");
    }

    @Override
    public int add(EventModel entity) {
        final SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(jdbcTemplate).withTableName("event").usingGeneratedKeyColumns("id");
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
        final String sql = "DELETE FROM event WHERE id = " + id;
        jdbcTemplate.execute(sql);

    }

    @Override
    public EventModel readyById(int id) {
        final EventModel entity = jdbcTemplate.queryForObject("SELECT * FROM event WHERE id = ", new Object[]{id}, (rs, rowNum) ->
                new EventModel(
                        rs.getInt("id"),
                        rs.getString("code"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getString("business"),
                        rs.getDate("date").toLocalDate(),
                        rs.getDate("start_time").toLocalDate(),
                        rs.getDate("end_time").toLocalDate()

                ));
        return entity;
    }

    @Override
    public List<EventModel> readAll() {
        final List<EventModel> entities = jdbcTemplate.query("SELECT * FROM event", new Object[]{}, (rs, rowNum) ->
                new EventModel(
                        rs.getInt("id"),
                        rs.getString("code"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getString("business"),
                        rs.getDate("date").toLocalDate(),
                        rs.getDate("start_time").toLocalDate(),
                        rs.getDate("end_time").toLocalDate()

                ));

        return entities;
    }

    @Override
    public void updateInformation(int id, EventModel entity) {

    }
}
