package br.com.tasksync.backend.main.dao.postgres;

import br.com.tasksync.backend.main.domain.UserModel;
import br.com.tasksync.backend.main.dto.AuthenticationDto;
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

    private static final Logger logger = Logger.getLogger(UserPostgresDaoImplem.class.getName());
    private final Connection connection;

    public UserPostgresDaoImplem(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(UserModel entity) {
        String sql = "INSERT INTO person(cpf, name, address, phone, image) ";
        sql += " VALUES(?, ?, ?, ?, ?);";
        PreparedStatement preparedStatement;
        ResultSet resultSet;
        try {
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, entity.getCpf());
            preparedStatement.setString(2, entity.getName());
            preparedStatement.setString(3, entity.getAddress());
            preparedStatement.setString(4, entity.getPhone());
            preparedStatement.setString(5, entity.getImage());
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
            preparedStatement.setString(3, entity.getAccess_type());
            preparedStatement.execute();
            resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                final int id = resultSet.getInt(1);
                entity.setUserId(id);

            } else {
                throw new RuntimeException();
            }
            resultSet.close();
            preparedStatement.close();
        } catch (SQLException e) {
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
                user.setImage(resultSet.getString("image"));
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
                user.setImage(resultSet.getString("image"));
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
        String sql = "UPDATE \"user\" SET email = ?, password = ?, access_type = ? WHERE id = ?;";
        try {
            PreparedStatement preparedStatement;
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, entity.getEmail());
            preparedStatement.setString(2, entity.getPassword());
            preparedStatement.setString(3, entity.getAccess_type());
            preparedStatement.setInt(4, entity.getId());
            preparedStatement.execute();
            preparedStatement.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        String sql2 = "UPDATE person p SET cpf = ?, name = ?, address = ?, phone = ?, image = ?  ";
        sql2 += " WHERE p.id = ?;";
        try {
            PreparedStatement preparedStatement;
            preparedStatement = connection.prepareStatement(sql2);
            preparedStatement.setString(1, entity.getCpf());
            preparedStatement.setString(2, entity.getName());
            preparedStatement.setString(3, entity.getAddress());
            preparedStatement.setString(4, entity.getPhone());
            preparedStatement.setString(5, entity.getImage());
            preparedStatement.setInt(6, entity.getId());
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

    @Override
    public UserModel authenticate(AuthenticationDto authenticationDto) {
        final String sql = "SELECT * FROM \"user\" WHERE email = ? AND password = ?;";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, authenticationDto.getEmail());
            preparedStatement.setString(2, authenticationDto.getPassword());
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                final UserModel user = new UserModel();
                user.setId(resultSet.getInt("id"));
                user.setName(resultSet.getString("email"));
                user.setPassword(resultSet.getString("password"));
                user.setAccess_type(resultSet.getString("access_type"));
                logger.log(Level.INFO, "Entidade com email " + authenticationDto.getEmail() + " encontrada com sucesso");
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
    public boolean existsCpf(String cpf) {
        final String sql = "SELECT * FROM \"user\" u " +
                " INNER JOIN person p on u.person_id = p.id " +
                " WHERE p.cpf = ?;";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, cpf);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                return true;
            }
            return false;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public int numAdmin(int adminId) {
        final String sql =  "SELECT count(*) FROM usergroup UG " +
        "inner join \"user\" U on U.id = UG.user_id " +
        "WHERE U.access_type like 'Administrador' and UG.adm_id = ?;";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, adminId);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
            return 0;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public int createUserGroup(int adminId) {
        final String sql = "INSERT INTO groups (user_id) " +
                "VALUES (?);";
        PreparedStatement preparedStatement;
        ResultSet resultSet;
        int groupId = 0;
        try {
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, adminId);
            preparedStatement.execute();
            resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                groupId = resultSet.getInt(1);
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
        return groupId;
    }

    @Override
    public int insertUserUserGroup(int userId, int groupId, int adminId) {
        final String sql = "INSERT INTO usergroup (user_id, group_id, adm_id) " +
                "VALUES (?, ?, ?);";
        PreparedStatement preparedStatement;
        ResultSet resultSet;
        int usergroupId = 0;
        try {
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, userId);
            preparedStatement.setInt(2, groupId);
            preparedStatement.setInt(3, adminId);
            preparedStatement.execute();
            resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                usergroupId = resultSet.getInt(1);
            } else {
                throw new RuntimeException();
            }

            resultSet.close();
            preparedStatement.close();
        } catch (SQLException e) {

            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return usergroupId;
    }

    @Override
    public int getAdminUserGroup(int adminId) {
        final String sql = "Select * FROM usergroup G WHERE G.user_id = ?;";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, adminId);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                return resultSet.getInt("group_id");
            }
            return 0;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<UserModel> findAllByUserId(int userId) {

        final String sql = "SELECT * FROM \"user\" U INNER JOIN person P on P.id = U.person_id \n" +
                "WHERE U.id in (SELECT UG.user_id from usergroup UG WHERE UG.group_id in (SELECT UG.group_id FROM usergroup UG WHERE UG.user_id = ?));";

        final List<UserModel> users = new ArrayList<>();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1,userId);
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
                user.setImage(resultSet.getString("image"));
                users.add(user);
            }
            resultSet.close();
            preparedStatement.close();
            return users;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
