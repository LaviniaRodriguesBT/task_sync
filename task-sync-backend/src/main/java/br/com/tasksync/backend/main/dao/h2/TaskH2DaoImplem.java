package br.com.tasksync.backend.main.dao.h2;

import br.com.tasksync.backend.main.domain.TaskModel;
import br.com.tasksync.backend.main.port.dao.task.TaskDao;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

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
        return 0;
    }

    @Override
    public void remove(int id) {
        final String sql = "DELETE FROM task WHERE id = " + id;
        jdbcTemplate.execute(sql);

    }

    @Override
    public TaskModel readyById(int id) {
        return null;
    }

    @Override
    public List<TaskModel> readAll() {
        return null;
    }

    @Override
    public void updateInformation(int id, TaskModel entity) {

    }
}
