package br.com.tasksync.backend.main.dao.postgres;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.port.dao.user.UserDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class UserPostgresDaoImplem implements UserDao {

    // Adicionar a linha 14 em todas as classes, substitui o SOUT
    private static final Logger logger = Logger.getLogger(UserPostgresDaoImplem.class.getName());

    // Quem faz a connection é o spring
    private final Connection connection;

    public UserPostgresDaoImplem(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(UserModel entity) {

        String sql = "INSERT INTO person(cpf, name, address, phone) ";
        sql += " VALUES(?, ?, ?, ?);";

        PreparedStatement preparedStatement;
        ResultSet resultSet;

        try {
            connection.setAutoCommit(false);

            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setString(1, entity.getCpf());
            preparedStatement.setString(2, entity.getName());
            preparedStatement.setString(3, entity.getAddress());
            preparedStatement.setString(4, entity.getPhone());

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


            sql = "INSERT INTO \"user\"(email, password, access_type, person_id) ";
            sql += " VALUES(?, ?, ?, ?);";

            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setString(1, entity.getEmail());
            preparedStatement.setString(2, entity.getPassword());
            preparedStatement.setString(3, entity.getAccess_type());
            preparedStatement.setInt(4, entity.getId());

            preparedStatement.execute();
            resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                final int id = resultSet.getInt(1);
                entity.setUserId(id);

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

        String sql = "DELETE FROM person WHERE id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);
            preparedStatement.execute();
            preparedStatement.close();
            logger.log(Level.INFO, "Entidade removida com sucesso");


        } catch (Exception e) {
            throw new RuntimeException();
        }

        sql = "DELETE FROM \"user\" WHERE id = ?;";

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
    public UserModel readyById(int id) {
        final String sql = "SELECT * FROM \"user\" u" +
                " INNER JOIN person p on u.person_id = p.id" +
                " WHERE p.id = ?;";

        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                final UserModel user = new UserModel();
                user.setId(resultSet.getInt("id"));
                user.setName(resultSet.getString("name"));
                user.setEmail(resultSet.getString("email"));
                user.setPassword(resultSet.getString("password"));
                user.setCpf(resultSet.getString("cpf"));
                user.setPhone(resultSet.getString("phone"));
                user.setAddress(resultSet.getString("address"));
                user.setAccess_type(resultSet.getString("access_type"));
                logger.log(Level.INFO, "Entidade com id " + id + "encontrada com sucesso");

                return user;

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
    public List<UserModel> readAll() {

        final List<UserModel> users = new ArrayList<>();
        final String sql = "SELECT * FROM \"user\" u INNER JOIN person p ON p.id = u.person_id ;";


        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                final UserModel user = new UserModel();

                user.setId(resultSet.getInt("id"));
                user.setName(resultSet.getString("name"));
                user.setEmail(resultSet.getString("email"));
                user.setCpf(resultSet.getString("cpf"));
                user.setPassword(resultSet.getString("password"));
                user.setPhone(resultSet.getString("phone"));
                user.setAddress(resultSet.getString("address"));
                user.setAccess_type(resultSet.getString("access_type"));

                users.add(user);

            }
            resultSet.close();
            preparedStatement.close();
            return users;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateInformation(int id, UserModel entity) {
        String sql = "UPDATE person SET name = ? WHERE id = ?;";

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

    @Override
    public UserModel readByEmail(String email) {
        final String sql = "SELECT * FROM user_model WHERE email = ?;";

        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, email);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                final UserModel user = new UserModel();
                user.setId(resultSet.getInt("id"));
                user.setName(resultSet.getString("name"));
                user.setPassword(resultSet.getString("password"));
                logger.log(Level.INFO, "Entidade com email " + email + " encontrada com sucesso");

                return user;

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
    public boolean updatePassword(int id, String newPassword) {
        String sql = "UPDATE user_model SET password = ? WHERE id = ?;";


        try {
            PreparedStatement preparedStatement;
            preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setString(1, newPassword);
            preparedStatement.setInt(2, id);
            preparedStatement.execute();
            preparedStatement.close();
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
