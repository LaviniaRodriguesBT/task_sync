package br.com.tasksync.backend.main.dao.h2;

import br.com.tasksync.backend.main.domain.SchedulingModel;
import br.com.tasksync.backend.main.port.dao.scheduling.SchedulingDao;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

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
        return 0;
    }

    @Override
    public void remove(int id) {
        final String sql = "DELETE FROM scheduling WHERE id = " + id;
        jdbcTemplate.execute(sql);

    }

    @Override
    public SchedulingModel readyById(int id) {
        return null;
        //return new SchedulingModel(1, 2, 3, 1, "casa", 10.10, new Date(), new Date(), new Date(), "em aberto");
    }

    @Override
    public List<SchedulingModel> readAll() {
        return null;
    }

    @Override
    public void updateInformation(int id, SchedulingModel entity) {

    }

    @Override
    public List<SchedulingModel> readByEventId(int id) {
        return List.of();
    }
}
