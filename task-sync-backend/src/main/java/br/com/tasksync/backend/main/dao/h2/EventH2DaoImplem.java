package br.com.tasksync.backend.main.dao.h2;

import br.com.tasksync.backend.main.domain.EventModel;
import br.com.tasksync.backend.main.port.dao.event.EventDao;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

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
        return 0;
    }

    @Override
    public void remove(int id) {
        final String sql = "DELETE FROM event WHERE id = " + id;
        jdbcTemplate.execute(sql);

    }

    @Override
    public EventModel readyById(int id) {

        return new EventModel();
    }

    @Override
    public List<EventModel> readAll() {
        return null;
    }

    @Override
    public void updateInformation(int id, EventModel entity) {

    }

    @Override
    public List<EventModel> getEntitiesByUserId(int id) {
        return List.of();
    }
}
