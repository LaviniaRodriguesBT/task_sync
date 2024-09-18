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
            preparedStatement.setDate(1, Date.valueOf(entity.getStart_time()));
            preparedStatement.setDate(2, Date.valueOf(entity.getEnd_time()));
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
                scheduling.setStart_time(resultSet.getDate("start_time").toLocalDate());
                scheduling.setEnd_time(resultSet.getDate("end_time").toLocalDate());
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
        final String sql = "SELECT s.*, e.name, e.id as event_id, c.user_id " +
                "FROM scheduling s " +
                "INNER JOIN contract c ON c.id = s.contract_id " +
                "INNER JOIN \"event\" e ON e.id = c.event_id;";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                final SchedulingModel scheduling = new SchedulingModel();
                scheduling.setId(resultSet.getInt("id"));
                scheduling.setDate(resultSet.getDate("date").toLocalDate());
                scheduling.setStart_time(resultSet.getDate("start_time").toLocalDate());
                scheduling.setEnd_time(resultSet.getDate("end_time").toLocalDate());
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
