package br.com.tasksync.backend.main.dao.postgres;

import br.com.tasksync.backend.main.domain.TaskModel;
import br.com.tasksync.backend.main.port.dao.task.TaskDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class TaskPostgresDaoImplem implements TaskDao {


    private static final Logger logger = Logger.getLogger(TaskPostgresDaoImplem.class.getName());

    private final Connection connection;

    public TaskPostgresDaoImplem(Connection connection) {
        this.connection = connection;
    }


    @Override
    public int add(TaskModel entity) {

        String sql = "INSERT INTO task(name) ";
        sql += " VALUES(?);";

        PreparedStatement preparedStatement;
        ResultSet resultSet;

        try {
            connection.setAutoCommit(false);

            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setString(1, entity.getName());


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
        final String sql = "DELETE FROM task WHERE id = ?;";

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
    public TaskModel readyById(int id) {
        final String sql = "SELECT * FROM task WHERE id = ?;";

        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                final TaskModel task = new TaskModel();
                task.setId(resultSet.getInt("id"));
                task.setName(resultSet.getString("name"));


                logger.log(Level.INFO, "Entidade com id " + id + "encontrada com sucesso");

                return task;

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
    public List<TaskModel> readAll() {

        final List<TaskModel> tasks = new ArrayList<>();
        final String sql = "SELECT * FROM task;";


        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                final TaskModel task = new TaskModel();

                task.setId(resultSet.getInt("id"));
                task.setName(resultSet.getString("name"));

                tasks.add(task);

            }
            resultSet.close();
            preparedStatement.close();
            return tasks;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateInformation(int id, TaskModel entity) {
        String sql = "UPDATE task SET name = ? WHERE id = ?;";

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
