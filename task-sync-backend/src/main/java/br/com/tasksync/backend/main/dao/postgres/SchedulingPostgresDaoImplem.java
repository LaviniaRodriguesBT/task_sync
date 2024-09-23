package br.com.tasksync.backend.main.dao.postgres;

import br.com.tasksync.backend.main.domain.SchedulingModel;
import br.com.tasksync.backend.main.port.dao.scheduling.SchedulingDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SchedulingPostgresDaoImplem implements SchedulingDao {

    private static final Logger logger = Logger.getLogger(SchedulingPostgresDaoImplem.class.getName());
    private final Connection connection;

    public SchedulingPostgresDaoImplem(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(SchedulingModel entity) {
        String sql = "INSERT INTO scheduling(start_time, end_time, date, status) ";
        sql += " VALUES(?, ?, ?, ?);";
        PreparedStatement preparedStatement;
        ResultSet resultSet;
        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStatement.setTime(1, Time.valueOf(entity.getStart_time()));
            preparedStatement.setTime(2, Time.valueOf(entity.getEnd_time()));
            preparedStatement.setDate(3, Date.valueOf(entity.getDate()));
            preparedStatement.setString(4, entity.getStatus());
            preparedStatement.execute();
            resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                final int id = resultSet.getInt(1);
                entity.setId(id);
            } else {
                throw new RuntimeException();
            }

            resultSet.close();
            preparedStatement.close();
            connection.commit();
            resultSet.close();
            preparedStatement.close();

        } catch (SQLException e) {
            try {
                connection.rollback();
            } catch (SQLException ex) {
                throw new RuntimeException(ex);
            }
            throw new RuntimeException(e);
        }
        return entity.getId();
    }

    @Override
    public void remove(int id) {
        logger.log(Level.INFO, "Preparadando para remover a entidade com id " + id);
        final String sql = "DELETE FROM scheduling WHERE id = ?;";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);
            preparedStatement.execute();
            preparedStatement.close();
            logger.log(Level.INFO, "Entidade removida com sucesso");
        } catch (Exception e) {
            throw new RuntimeException();
        }

    }

    @Override
    public SchedulingModel readyById(int id) {
        final String sql = "SELECT * FROM scheduling WHERE id = ?;";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                final SchedulingModel scheduling = new SchedulingModel();
                scheduling.setId(resultSet.getInt("id"));
                scheduling.setStart_time(resultSet.getTime("start_time").toLocalTime());
                scheduling.setEnd_time(resultSet.getTime("end_time").toLocalTime());
                scheduling.setDate(resultSet.getDate("date").toLocalDate());
                scheduling.setStatus(resultSet.getString("status"));
                logger.log(Level.INFO, "Entidade com id " + id + "encontrada com sucesso");
                return scheduling;

            }


            return null;
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            try {
                resultSet.close();
                preparedStatement.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }

        }
    }

    @Override
    public List<SchedulingModel> readAll() {

        final List<SchedulingModel> schedulings = new ArrayList<>();
        final String sql = "SELECT e.name as nome_evento, \n" +
                "\tp.name as nome_pessoa, \n" +
                "\tt.name as nome_atividade,\n" +
                "\ts.start_time as horario_inicio,\n" +
                "\ts.end_time as horario_final,\n" +
                "\ts.date as \"data\",\n" +
                "\ts.status\n" +
                "     FROM scheduling s \n" +
                "     INNER JOIN contract c ON c.id = s.contract_id \n" +
                "\t   INNER JOIN person p ON c.user_id = p.id\n" +
                "\t   inner join activity a on a.id = s.activity_id\n" +
                "\t   inner join task t on t.id = a.task_id\n" +
                "     INNER JOIN event e ON e.id = c.event_id;";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                final SchedulingModel scheduling = new SchedulingModel();
                scheduling.setId(resultSet.getInt("id"));
                scheduling.setDate(resultSet.getDate("date").toLocalDate());
                scheduling.setStart_time(resultSet.getTime("start_time").toLocalTime());
                scheduling.setEnd_time(resultSet.getTime("end_time").toLocalTime());
                scheduling.setEvent_id(resultSet.getInt("event_id"));
                scheduling.setEvent(resultSet.getString("name"));
                schedulings.add(scheduling);
            }
            resultSet.close();
            preparedStatement.close();
            return schedulings;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateInformation(int id, SchedulingModel entity) {
        String sql = "UPDATE scheduling SET name = ? WHERE id = ?;";
        try {
            PreparedStatement preparedStatement;
            preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1, entity.getId());
            preparedStatement.execute();
            preparedStatement.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
