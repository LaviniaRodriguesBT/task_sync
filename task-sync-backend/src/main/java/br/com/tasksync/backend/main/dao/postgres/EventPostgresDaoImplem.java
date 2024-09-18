//package br.com.tasksync.backend.main.dao.postgres;
//
//import br.com.tasksync.backend.main.domain.EventModel;
//import br.com.tasksync.backend.main.domain.UserModel;
//import br.com.tasksync.backend.main.port.dao.event.EventDao;
//
//import java.sql.*;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.logging.Level;
//import java.util.logging.Logger;
//
//public class EventPostgresDaoImplem implements EventDao {
//
//
//    private static final Logger logger = Logger.getLogger(EventPostgresDaoImplem.class.getName());
//
//    private final Connection connection;
//
//    public EventPostgresDaoImplem(Connection connection) {
//        this.connection = connection;
//    }
//
//    @Override
//    public int add(EventModel entity) {
//
//        String sql = "INSERT INTO event(code, name, description, business, date, start_time, end_time) ";
//        sql += " VALUES(?, ?, ?, ?, ?, ?, ?);";
//
//        PreparedStatement preparedStatement;
//        ResultSet resultSet;
//
//        try {
//            connection.setAutoCommit(false);
//
//            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
//
//
//            preparedStatement.setString(1, entity.getCode());
//            preparedStatement.setString(2, entity.getName());
//            preparedStatement.setString(3, entity.getDescription());
//            preparedStatement.setString(4, entity.getBusiness());
//            preparedStatement.setTimestamp(5, Timestamp.valueOf(entity.getDate().atStartOfDay()));
//            preparedStatement.setTimestamp(6, Timestamp.valueOf(entity.getStart_time().atStartOfDay()));
//            preparedStatement.setTimestamp(7, Timestamp.valueOf(entity.getEnd_time().atStartOfDay()));
//
//
//            preparedStatement.execute();
//
//            resultSet = preparedStatement.getGeneratedKeys();
//            if (resultSet.next()) {
//                final int id = resultSet.getInt(1);
//                entity.setId(id);
//
//            }
//
//            connection.commit();
//
//            resultSet.close();
//            preparedStatement.close();
//
//        } catch (SQLException e) {
//
//            try {
//                connection.rollback();
//            } catch (SQLException ex) {
//                throw new RuntimeException(ex);
//            }
//
//
//            throw new RuntimeException(e);
//        }
//
//
//        return entity.getId();
//    }
//
//    @Override
//    public void remove(int id) {
//        logger.log(Level.INFO, "Preparadando para remover a entidade com id " + id);
//        final String sql = "DELETE FROM event WHERE id = ?;";
//
//        try {
//            PreparedStatement preparedStatement = connection.prepareStatement(sql);
//            preparedStatement.setInt(1, id);
//            preparedStatement.execute();
//            preparedStatement.close();
//            logger.log(Level.INFO, "Entidade removida com sucesso");
//
//
//        } catch (Exception e) {
//            throw new RuntimeException();
//        }
//
//    }
//
////    @Override
////    public EventModel readyById(int id) {
////        final String sql = "SELECT * FROM user_model WHERE id = ?;";
////
////        PreparedStatement preparedStatement = null;
////        ResultSet resultSet = null;
////
////        try {
////            preparedStatement = connection.prepareStatement(sql);
////            preparedStatement.setInt(1, id);
////            resultSet = preparedStatement.executeQuery();
////            if (resultSet.next()) {
////                final EventModel event = new EventModel();
////                event.setId(resultSet.getInt("id"));
////                event.setName(resultSet.getString("name"));
////                event.setEmail(resultSet.getString("email"));
////                event.setPassword(resultSet.getString("password"));
////                event.setCpf(resultSet.getString("cpf"));
////                event.setPhone(resultSet.getString("phone"));
////                event.setAddress(resultSet.getString("address"));
////                event.setAccess_type(resultSet.getString("access_type"));
////                logger.log(Level.INFO, "Entidade com id " + id + "encontrada com sucesso");
////
////                return user;
////
////            }
////
////
////            return null;
////        } catch (Exception e) {
////            throw new RuntimeException(e);
////        } finally {
////            try {
////                resultSet.close();
////                preparedStatement.close();
////            } catch (SQLException e) {
////                throw new RuntimeException(e);
////            }
////
////        }
////    }
////
////    @Override
////    public List<EventModel> readAll() {
////
////        final List<EventModel> users = new ArrayList<>();
////        final String sql = "SELECT * FROM user_model;";
////
////
////        try {
////            PreparedStatement preparedStatement = connection.prepareStatement(sql);
////            ResultSet resultSet = preparedStatement.executeQuery();
////            while (resultSet.next()) {
////                final EventModel user = new EventModel();
////
////                user.setId(resultSet.getInt("id"));
////                user.setName(resultSet.getString("name"));
////                user.setEmail(resultSet.getString("email"));
////                user.setPassword(resultSet.getString("password"));
////                user.setCpf(resultSet.getString("cpf"));
////                user.setPhone(resultSet.getString("phone"));
////                user.setAddress(resultSet.getString("address"));
////                user.setAccess_type(resultSet.getString("access_type"));
////                users.add(user);
////
////            }
////            resultSet.close();
////            preparedStatement.close();
////            return null;
////        } catch (Exception e) {
////            throw new RuntimeException(e);
////        }
////    }
//
//    @Override
//    public void updateInformation(int id, EventModel entity) {
//        String sql = "UPDATE event SET fullName = ? WHERE id = ?;";
//
//        try {
//            PreparedStatement preparedStatement;
//            preparedStatement = connection.prepareStatement(sql);
//            preparedStatement.setString(1, entity.getName());
//            preparedStatement.setInt(2, entity.getId());
//            preparedStatement.execute();
//            preparedStatement.close();
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//
//    }
//
//    @Override
//    public UserModel readByEmail(String email) {
//        final String sql = "SELECT * FROM event WHERE email = ?;";
//
//        PreparedStatement preparedStatement = null;
//        ResultSet resultSet = null;
//
//        try {
//            preparedStatement = connection.prepareStatement(sql);
//            preparedStatement.setString(1, email);
//            resultSet = preparedStatement.executeQuery();
//            if (resultSet.next()) {
//                final UserModel user = new UserModel();
//                user.setId(resultSet.getInt("id"));
//                user.setName(resultSet.getString("fullName"));
//                user.setPassword(resultSet.getString("password"));
//                logger.log(Level.INFO, "Entidade com email " + email + " encontrada com sucesso");
//
//                return user;
//
//            }
//
//            return null;
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        } finally {
//            try {
//                resultSet.close();
//                preparedStatement.close();
//            } catch (SQLException e) {
//                throw new RuntimeException(e);
//            }
//
//        }
//    }
//
//
//    @Override
//    public boolean updatePassword(int id, String newPassword) {
//        String sql = "UPDATE event SET password = ? WHERE id = ?;";
//
//
//        try {
//            PreparedStatement preparedStatement;
//            preparedStatement = connection.prepareStatement(sql);
//
//            preparedStatement.setString(1, newPassword);
//            preparedStatement.setInt(2, id);
//            preparedStatement.execute();
//            preparedStatement.close();
//            return true;
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//}
