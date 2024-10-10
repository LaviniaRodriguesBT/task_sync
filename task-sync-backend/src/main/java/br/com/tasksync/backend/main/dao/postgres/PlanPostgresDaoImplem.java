package br.com.tasksync.backend.main.dao.postgres;

import br.com.tasksync.backend.main.domain.PlanModel;
import br.com.tasksync.backend.main.port.dao.plan.PlanDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PlanPostgresDaoImplem implements PlanDao {

    private static final Logger logger = Logger.getLogger(PlanPostgresDaoImplem.class.getName());
    private final Connection connection;

    public PlanPostgresDaoImplem(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(PlanModel entity) {

        String sql = "INSERT INTO plan(name_plan, price, start_time_plan, end_time_plan, num_adm, num_colab) ";
        sql += " VALUES(?, ?, ?, ?, ?, ?);";
        PreparedStatement preparedStatement;
        ResultSet resultSet;
        try {
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, entity.getName_plan());
            preparedStatement.setDouble(2, entity.getPrice());
            preparedStatement.setDate(3, Date.valueOf(entity.getStart_time_plan()));
            preparedStatement.setDate(4, Date.valueOf(entity.getEnd_time_plan()));
            preparedStatement.setInt(5, entity.getNum_adm());
            preparedStatement.setInt(6, entity.getNum_colab());
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
        final String sql = "DELETE FROM plan WHERE id = ?;";
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
    public PlanModel readyById(int id) {
        final String sql = "SELECT * FROM plan WHERE id = ?;";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                final PlanModel planModel = new PlanModel();
                planModel.setId(resultSet.getInt("id"));
                planModel.setName_plan(resultSet.getString("name_plan"));
                planModel.setPrice(resultSet.getDouble("price"));
                planModel.setStart_time_plan(resultSet.getDate("start_time_plan").toLocalDate());
                planModel.setEnd_time_plan(resultSet.getDate("end_time_plan").toLocalDate());
                planModel.setNum_adm(resultSet.getInt("num_adm"));
                planModel.setNum_colab(resultSet.getInt("num_colab"));

                logger.log(Level.INFO, "Entidade com id " + id + "encontrada com sucesso");
                return planModel;

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
    public List<PlanModel> readAll() {
        final List<PlanModel> planModels = new ArrayList<>();
        final String sql = "SELECT * FROM plan;";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                final PlanModel planModel = new PlanModel();
                planModel.setId(resultSet.getInt("id"));
                planModel.setName_plan(resultSet.getString("name_plan"));
                planModel.setPrice(resultSet.getDouble("price"));
                planModel.setStart_time_plan(resultSet.getDate("start_time_plan").toLocalDate());
                planModel.setEnd_time_plan(resultSet.getDate("end_time_plan").toLocalDate());
                planModel.setNum_adm(resultSet.getInt("num_adm"));
                planModel.setNum_colab(resultSet.getInt("num_colab"));

                planModels.add(planModel);
            }
            resultSet.close();
            preparedStatement.close();
            return planModels;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateInformation(int id, PlanModel entity) {
        String sql = "UPDATE plan SET name_plan = ?, price = ?, start_time_plan = ?, end_time_plan = ?, num_adm = ?, num_colab = ?  WHERE id = ?;";
        try {
            PreparedStatement preparedStatement;
            preparedStatement = connection.prepareStatement(sql);


            preparedStatement.setString(1, entity.getName_plan());
            preparedStatement.setDouble(2, entity.getPrice());
            preparedStatement.setDate(3, Date.valueOf(entity.getStart_time_plan()));
            preparedStatement.setDate(4, Date.valueOf(entity.getEnd_time_plan()));
            preparedStatement.setInt(5, entity.getNum_adm());
            preparedStatement.setInt(6, entity.getNum_colab());
            preparedStatement.setInt(7, entity.getId());


            preparedStatement.execute();
            preparedStatement.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
