package br.com.tasksync.backend.main.dao.postgres;

import br.com.tasksync.backend.main.domain.EventModel;
import br.com.tasksync.backend.main.port.dao.event.EventDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class EventPostgresDaoImplem implements EventDao {

    private static final Logger logger = Logger.getLogger(EventPostgresDaoImplem.class.getName());
    private final Connection connection;

    public EventPostgresDaoImplem(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(EventModel entity) {

        String sql = "INSERT INTO event(code, name, description, business, date, start_time, end_time) ";
        sql += " VALUES(?, ?, ?, ?, ?, ?, ?);";
        PreparedStatement preparedStatement;
        ResultSet resultSet;
        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, entity.getCode());
            preparedStatement.setString(2, entity.getName());
            preparedStatement.setString(3, entity.getDescription());
            preparedStatement.setString(4, entity.getBusiness());
            preparedStatement.setDate(5, Date.valueOf(entity.getDate()));
            preparedStatement.setTime(6, Time.valueOf(entity.getStart_time()));
            preparedStatement.setTime(7, Time.valueOf(entity.getEnd_time()));
            preparedStatement.execute();
            resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                final int id = resultSet.getInt(1);
                entity.setId(id);
            } else {
                throw new RuntimeException();
            }

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
        final String sql = "DELETE FROM event WHERE id = ?;";
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
    public EventModel readyById(int id) {
        final String sql = "SELECT * FROM event WHERE id = ?;";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                final EventModel event = new EventModel();
                event.setId(resultSet.getInt("id"));
                event.setCode(resultSet.getString("code"));
                event.setName(resultSet.getString("name"));
                event.setDescription(resultSet.getString("description"));
                event.setBusiness(resultSet.getString("business"));
                event.setDate(resultSet.getDate("date").toLocalDate());
                event.setStart_time(resultSet.getTime("start_time").toLocalTime());
                event.setEnd_time(resultSet.getTime("end_time").toLocalTime());
                logger.log(Level.INFO, "Entidade com id " + id + "encontrada com sucesso");
                return event;
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
    public List<EventModel> readAll() {
        final List<EventModel> events = new ArrayList<>();
        final String sql = "SELECT * FROM event;";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                final EventModel event = new EventModel();
                event.setId(resultSet.getInt("id"));
                event.setCode(resultSet.getString("code"));
                event.setName(resultSet.getString("name"));
                event.setBusiness(resultSet.getString("business"));
                event.setDescription(resultSet.getString("description"));
                event.setDate(resultSet.getDate("date").toLocalDate());
                event.setStart_time(resultSet.getTime("start_time").toLocalTime());
                event.setEnd_time(resultSet.getTime("end_time").toLocalTime());
                events.add(event);
            }
            resultSet.close();
            preparedStatement.close();
            return events;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateInformation(int id, EventModel entity) {
        String sql = "UPDATE event SET name = ? WHERE id = ?;";
        try {
            PreparedStatement preparedStatement;
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, entity.getName());
            preparedStatement.setInt(2, entity.getId());
            preparedStatement.execute();
            preparedStatement.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
