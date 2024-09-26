package br.com.tasksync.backend.main.dao.postgres;




import br.com.tasksync.backend.main.domain.ContractModel;
import br.com.tasksync.backend.main.port.dao.contract.ContractDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ContractPostgresDaoImplem implements ContractDao {

    private static final Logger logger = Logger.getLogger(ContractPostgresDaoImplem.class.getName());
    private final Connection connection;

    public ContractPostgresDaoImplem(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(ContractModel entity) {

        String sql = "INSERT INTO contract(number, signature_date, user_id, event_id) ";
        sql += " VALUES(?,?,?,?);";
        PreparedStatement preparedStatement;
        ResultSet resultSet;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, entity.getNumber());
            preparedStatement.setDate(2, Date.valueOf(entity.getSignature_date()));
            preparedStatement.setInt(3, entity.getUser_id());
            preparedStatement.setInt(4, entity.getEvent_id());
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
        final String sql = "DELETE FROM contract WHERE id = ?;";
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
    public ContractModel readyById(int id) {
        final String sql = "SELECT * FROM contract WHERE id = ?;";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                final ContractModel contract = new ContractModel();
                contract.setId(resultSet.getInt("id"));
                contract.setNumber(resultSet.getInt("number"));
                logger.log(Level.INFO, "Entidade com id " + id + "encontrada com sucesso");
                return contract;

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
    public List<ContractModel> readAll() {

        final List<ContractModel> contracts = new ArrayList<>();
        final String sql = "SELECT * FROM contract;";


        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                final ContractModel contract = new ContractModel();

                contract.setId(resultSet.getInt("id"));
                contract.setNumber(resultSet.getInt("number"));

                contracts.add(contract);

            }
            resultSet.close();
            preparedStatement.close();
            return contracts;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateInformation(int id, ContractModel entity) {
        String sql = "UPDATE contract SET name = ? WHERE id = ?;";

        try {
            PreparedStatement preparedStatement;
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, entity.getNumber());
            preparedStatement.setInt(2, entity.getId());
            preparedStatement.execute();
            preparedStatement.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }


}
