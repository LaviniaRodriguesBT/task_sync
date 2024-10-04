package br.com.tasksync.backend.main.dao.postgres;


import br.com.tasksync.backend.main.domain.ActivityModel;
import br.com.tasksync.backend.main.port.dao.activity.ActivityDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ActivityPostgresDaoImplem implements ActivityDao {

    private static final Logger logger = Logger.getLogger(ActivityPostgresDaoImplem.class.getName());
    private final Connection connection;

    public ActivityPostgresDaoImplem(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(ActivityModel entity) {

        String sql = "INSERT INTO activity(value, event_id, task_id) ";
        sql += " VALUES(?,?,?);";
        PreparedStatement preparedStatement;
        ResultSet resultSet;

        try {
            //connection.setAutoCommit(false);deixado automatico, pois estava dando prolema apos a criacao
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStatement.setDouble(1, entity.getValue());
            preparedStatement.setInt(2, entity.getEvent_id());
            preparedStatement.setInt(3, entity.getTask_id());
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
            //connection.commit();deixado automatico, pois estava dando prolema apos a criacao
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
        final String sql = "DELETE FROM activity WHERE id = ?;";
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
    public ActivityModel readyById(int id) {
        final String sql = "SELECT * FROM activity WHERE id = ?;";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                final ActivityModel activity = new ActivityModel();
                activity.setId(resultSet.getInt("id"));
                activity.setValue(resultSet.getDouble("value"));
                activity.setEvent_id(resultSet.getInt("event_id"));
                activity.setTask_id(resultSet.getInt("task_id"));
                logger.log(Level.INFO, "Entidade com id " + id + "encontrada com sucesso");
                return activity;

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
    public List<ActivityModel> readAll() {

        final List<ActivityModel> activitys = new ArrayList<>();
        final String sql = "SELECT * FROM activity;";


        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                final ActivityModel activity = new ActivityModel();

                activity.setId(resultSet.getInt("id"));
                activity.setValue(resultSet.getDouble("value"));

                activitys.add(activity);

            }
            resultSet.close();
            preparedStatement.close();
            return activitys;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateInformation(int id, ActivityModel entity) {
        String sql = "UPDATE activity SET value = ? WHERE id = ?;";

        try {
            PreparedStatement preparedStatement;
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setDouble(1, entity.getValue());
            preparedStatement.setInt(2, entity.getId());
            preparedStatement.execute();
            preparedStatement.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }


}
