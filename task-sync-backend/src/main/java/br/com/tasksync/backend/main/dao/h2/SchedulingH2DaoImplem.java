package br.com.tasksync.backend.main.dao.h2;

import br.com.tasksync.backend.main.domain.SchedulingModel;
import br.com.tasksync.backend.main.port.dao.scheduling.SchedulingDao;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Classe responsavel por realizar a conexao entre o banco de dados
// Responsavel por salvar, editar, excluir, ler informações que estão salvas no banco
public class SchedulingH2DaoImplem implements SchedulingDao {

    private final JdbcTemplate jdbcTemplate;

    public SchedulingH2DaoImplem(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;

        System.out.println("Ganhei uma instancia do SchedulingH2Dao");
    }

    @Override
    public int add(SchedulingModel entity) {
        final SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(jdbcTemplate).withTableName("scheduling").usingGeneratedKeyColumns("id");
        final Map<String, Object> parameters = new HashMap<>();
        parameters.put("event_id: ", entity.getEvent_id());
        parameters.put("user_id: ", entity.getUser_id());
        parameters.put("task_id: ", entity.getTask_id());
        parameters.put("event: ", entity.getEvent());
        parameters.put("value: ", entity.getValue());
        parameters.put("start_time: ", entity.getStart_time());
        parameters.put("end_time: ", entity.getEnd_time());
        parameters.put("date: ", entity.getDate());
        parameters.put("status: ", entity.getStatus());


        final Number id = simpleJdbcInsert.executeAndReturnKey(parameters);
        return id.intValue();
    }

    @Override
    public void remove(int id) {
        final String sql = "DELETE FROM scheduling WHERE id = " + id;
        jdbcTemplate.execute(sql);

    }

    @Override
    public SchedulingModel readyById(int id) {
        final SchedulingModel entity = jdbcTemplate.queryForObject("SELECT * FROM scheduling WHERE id = ", new Object[]{id}, (rs, rowNum) ->
                new SchedulingModel(
                        rs.getInt("id"),
                        rs.getInt("contract_id"),
                        rs.getInt("activity_id"),
                        rs.getTime("start_time").toLocalTime(),
                        rs.getTime("end_time").toLocalTime(),
                        rs.getDate("date").toLocalDate(),
                        rs.getString("status"),
                        rs.getDouble("value"),
                        rs.getInt("event_id"),
                        rs.getInt("contract_id"),


                ));
        return entity;
        //return new SchedulingModel(1, 2, 3, 1, "casa", 10.10, new Date(), new Date(), new Date(), "em aberto");
    }

    @Override
    public List<SchedulingModel> readAll() {
        final List<SchedulingModel> entities = jdbcTemplate.query("SELECT * FROM scheduling", new Object[]{}, (rs, rowNum) ->
                new SchedulingModel(
                        rs.getInt("id"),
                        rs.getInt("event_id"),
                        rs.getInt("user_id"),
                        rs.getInt("task_id"),
                        rs.getString("event"),
                        rs.getDouble("value"),
                        rs.getTime("start_time").toLocalTime(),
                        rs.getTime("end_time").toLocalTime(),
                        rs.getDate("date").toLocalDate(),
                        rs.getString("status")

                ));

        return entities;
    }

    @Override
    public void updateInformation(int id, SchedulingModel entity) {

    }
}
